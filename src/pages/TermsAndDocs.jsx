import React, { useEffect, useState } from "react";
import { storage, firestore, auth } from "../config/firebase"; // Ensure auth is imported
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  serverTimestamp 
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { SidebarItem } from './components/SideBarItem';
import profileIcon from './Images/profile.png';
import termsIcon from './Images/terms.png';
import messagesIcon from './Images/messages.png';
import maintenanceIcon from './Images/maintenance.png';
import paymentsIcon from './Images/payments.png';
import settingsIcon from './Images/settings.png';
import logoutIcon from './Images/logout.png';
import styles from "./TermsAndDocs.module.css";

const sidebarItems = [
  { icon: profileIcon, label: 'PROFILE', link: '/DashboardTenant' },
  { icon: termsIcon, label: 'TERMS AND DOCS', link: '/TermsAndDocs' },
  { icon: messagesIcon, label: 'MESSAGES', link: '/MessageTenant' },
  { icon: maintenanceIcon, label: 'MAINT . & REPAIRS', link: '/Report Issue' },
  { icon: paymentsIcon, label: 'PAYMENTS', link: '/PaymentTenant' },
  { icon: settingsIcon, label: 'SETTINGS', link: '/Settings' },
  { icon: logoutIcon, label: 'LOGOUT', link: '/LogoutPage' },
];

const DOCUMENT_TYPES = [
  "All Documents",
  "Government Photo ID",
  "Lease Agreement",
  "Renter Insurance",
  "Property Image",
  "Other",
];

const TermsAndDocs = () => {
  const [selectedDoc, setSelectedDoc] = useState("All Documents");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [userId, setUserId] = useState(null); // Store the userId
  const [role, setRole] = useState(null); // Store the user role
  const navigate = useNavigate(); // For redirection

  useEffect(() => {
    const checkUserRole = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUserId(currentUser.uid);
        try {
          const userDoc = await getDoc(doc(firestore, "users", currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setRole(userData.role);
            if (userData.role !== "tenant") {
              alert("Access denied. Tenants only.");
              navigate("/"); // Redirect to login or tenant dashboard
            }
          } else {
            alert("User not found.");
            navigate("/Login"); 
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          navigate("/");
        }
      } else {
        navigate("/");
      }
    };
    checkUserRole();
  }, [navigate]);

  useEffect(() => {
    if (userId) {
      fetchUploadedFiles();
    }
  }, [selectedDoc, userId]);

  const fetchUploadedFiles = async () => {
    if (!userId) return;

    try {
      const q =
        selectedDoc === "All Documents"
          ? query(
              collection(firestore, "documents"),
              where("userId", "==", userId) // Filter by userId
            )
          : query(
              collection(firestore, "documents"),
              where("documentType", "==", selectedDoc),
              where("userId", "==", userId) // Filter by userId and document type
            );

      const querySnapshot = await getDocs(q);
      const files = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUploadedFiles(files);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleDropdownChange = (e) => {
    setSelectedDoc(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || selectedDoc === "All Documents") {
      setMessage("Please select a document type and upload a file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage("File size exceeds the 5MB limit.");
      return;
    }

    if (!userId) {
      setMessage("User not authenticated.");
      return;
    }

    setUploading(true);
    setMessage("");

    const uniqueFileName = `${new Date().toISOString()}_${file.name}`;
    const storageRef = ref(storage, `documents/${selectedDoc}/${uniqueFileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressPercentage = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercentage);
      },
      (error) => {
        setUploading(false);
        setMessage(`Upload failed: ${error.message}`);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        try {
          await addDoc(collection(firestore, "documents"), {
            documentType: selectedDoc,
            fileName: file.name,
            downloadURL,
            uploadedAt: serverTimestamp(),
            userId, // Save the userId with the document
          });
          setMessage("File uploaded successfully!");
          fetchUploadedFiles();
        } catch (error) {
          setMessage(`Error saving metadata: ${error.message}`);
        } finally {
          setUploading(false);
          setFile(null);
          setProgress(0);
        }
      }
    );
  };

  const handleDelete = async (fileId, filePath) => {
    try {
      await deleteDoc(doc(firestore, "documents", fileId));
      const fileRef = ref(storage, filePath);
      await deleteObject(fileRef);

      setUploadedFiles((prevFiles) =>
        prevFiles.filter((file) => file.id !== fileId)
      );
      setMessage("File deleted successfully.");
    } catch (error) {
      setMessage("Error deleting file.");
    }
  };

  if (role !== "tenant") {
    return;
  }

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h1 className={styles.sidebarTitle}>DASHBOARD</h1>
        <nav>
          {sidebarItems.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              label={item.label}
              link={item.link}
            />
          ))}
        </nav>
      </aside>

      <div className={styles.mainContent}>
        <header className={styles.headermessage}>
          <img
            loading="lazy"
            src={termsIcon}
            alt="Terms Icon"
            className={styles.headermessageIcon}
          />
          <h2 className={styles.headermessageTitle}>TERMS AND DOCUMENTS</h2>
        </header>

        <div className={styles.documentSection}>
          <div className={styles.dropdownContainer}>
            <label htmlFor="documentDropdown" className={styles.dropdownLabel}>
              Document Type
            </label>
            <select
              id="documentDropdown"
              value={selectedDoc}
              onChange={handleDropdownChange}
              className={styles.dropdown}
            >
              {DOCUMENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.uploadSection}>
            <input
              type="file"
              onChange={handleFileChange}
              className={styles.fileInput}
              disabled={uploading}
            />
            <button
              onClick={handleUpload}
              disabled={uploading}
              className={styles.uploadButton}
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>

          {uploading && (
            <div className={styles.progressBar}>
              <div
                className={styles.progress}
                style={{ width: `${progress}%` }}
              >
                {progress}%
              </div>
            </div>
          )}

          {message && <p className={styles.message}>{message}</p>}
        </div>

        <div className={styles.uploadedFiles}>
          <h3>Uploaded Files</h3>
          <div className={styles.fileGrid}>
            {uploadedFiles.map((file) => (
              <div key={file.id} className={styles.fileCard}>
                <img
                  src={file.downloadURL}
                  alt={file.fileName}
                  className={styles.fileThumbnail}
                  loading="lazy"
                />
                <p className={styles.fileName}>{file.fileName}</p>
                <a
                  href={file.downloadURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.viewButton}
                >
                  View
                </a>
                <button
                  onClick={() =>
                    handleDelete(file.id, `documents/${file.documentType}/${file.fileName}`)
                  }
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndDocs;
