import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../config/firebase"; // Import firebase auth

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
      dispatch(
        loginUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "User",
        })
      );
      setSuccess(true); // Notify success
    } catch (error) {
      alert("Login failed: " + error.message); // Show error message
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
      await updateProfile(user, { displayName: name });
      dispatch(
        loginUser({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
        })
      );
      setSuccess(true);
    } catch (error) {
      alert("Sign up failed: " + error.message); // Show error message
      setSuccess(false);
    }
  };
};

export const signOutUser = () => (dispatch) => {
  auth.signOut()
    .then(() => {
      dispatch(logoutUser());
    })
    .catch((error) => {
      alert("Sign out failed: " + error.message); // Handle sign-out errors
    });
};

// Action creator for checking if the user is logged in
export const checkIsLoggedIn = () => (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(
        loginUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "User",
        })
      );
    } else {
      dispatch(logoutUser());
    }
  });
};
