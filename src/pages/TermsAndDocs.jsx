import React, { useEffect, useState } from "react";
import { storage, firestore, auth } from "../config/firebase";
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  serverTimestamp,
  deleteDoc 
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import Sidebar from './Sidebartenant'; 
import styles from "./TermsAndDocs.module.css";
import TenantSidebar from "./TenantSidebar";

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
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

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
              navigate("/");
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
          ? query(collection(firestore, "documents"), where("userId", "==", userId))
          : query(
              collection(firestore, "documents"),
              where("documentType", "==", selectedDoc),
              where("userId", "==", userId)
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
            userId,
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
    return null;
  }

  return (

    <div className={styles.dashboardContainer}>
      <button 
        className={styles.sidebarToggle} 
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>
      
      <Sidebar className={sidebarOpen ? styles.sidebarOpen : ''} />
      
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1>TERMS AND DOCUMENTS</h1>

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
                <div className={styles.buttonGroup}>
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
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsAndDocs;