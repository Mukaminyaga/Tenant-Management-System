import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../config/firebase"; // Firebase auth
import { db } from "../../config/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore"; // Firestore functions

// Action types
const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";

// Helper functions for dispatching actions
const loginUser = (payload) => ({
  type: SIGN_IN,
  payload,
});

const logoutUser = () => ({
  type: SIGN_OUT,
});

// Action creator for signing in
export const signInUser = (email, password, setSuccess) => {
  return async (dispatch) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user details from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        dispatch(
          loginUser({
            uid: user.uid,
            email: user.email,
            displayName: userData.name || "User", // Fetch the name from Firestore
          })
        );
      } else {
        throw new Error("User data not found in Firestore.");
      }

      setSuccess(true);
    } catch (error) {
      alert("Login failed: " + error.message);
      setSuccess(false);
    }
  };
};

// Action creator for signing up
export const signUpUser = (name, email, password, setSuccess) => {
  return async (dispatch) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user details to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        uid: user.uid,
      });

      dispatch(
        loginUser({
          uid: user.uid,
          displayName: name,
          email,
        })
      );

      setSuccess(true);
    } catch (error) {
      alert("Sign up failed: " + error.message);
      setSuccess(false);
    }
  };
};

// Action creator for checking if the user is logged in
export const checkIsLoggedIn = () => (dispatch) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        // Fetch user details from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          dispatch(
            loginUser({
              uid: user.uid,
              email: user.email,
              displayName: userData.name || "User",
            })
          );
        } else {
          dispatch(logoutUser());
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        dispatch(logoutUser());
      }
    } else {
      dispatch(logoutUser());
    }
  });
};

// Action creator for signing out
export const signOutUser = () => (dispatch) => {
  auth.signOut()
    .then(() => {
      dispatch(logoutUser());
    })
    .catch((error) => {
      alert("Sign out failed: " + error.message);
    });
};
