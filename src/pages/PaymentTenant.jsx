import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { auth } from "../config/firebaseConfig"; // Import auth from the config file
import './PaymentTenant.css'
import TenantSidebar from "./TenantSidebar";

const PaymentTenant = () => {
  const [tenant, setTenant] = useState(null);
  const [userId, setUserId] = useState(null); // State to store the user ID
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // Set the userId when the user is authenticated
      } else {
        console.log("No user logged in");
      }
    });

    return () => unsubscribe(); // Clean up the listener when component unmounts
  }, []);

  useEffect(() => {
    const fetchTenant = async () => {
      if (userId) {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTenant(docSnap.data());
        } else {
          console.error("No tenant data found!");
        }
      }
    };

    fetchTenant();
  }, [userId, db]); // Dependency array ensures fetch runs when userId changes

  const downloadReceipt = (month) => {
    if (!tenant) return;

      const receiptContent = `
    ======================================
                  RECEIPT
    ======================================

    Tenant Name:      ${tenant.name}
    Apartment:        ${tenant.apartmentNumber}
    Month:            ${month}
    Status:           Paid

    ======================================
            Thank you for your payment!
    ======================================
  `;

    const blob = new Blob([receiptContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `RentReceipt_${month}.txt`;
    link.click();
  };

  if (!tenant) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mainContent">
      <TenantSidebar />
      <div className="PaymentTenant">
        <h1>Rent Processing</h1>
        <h2>Welcome, {tenant.name}</h2>
        <p>Apartment: {tenant.apartmentNumber}</p>
        <table border="1">
          <thead>
            <tr>
              <th>Month</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(tenant.rentPaid).map(([month, paid]) => (
              <tr key={month}>
                <td>{month}</td>
                <td>{paid ? "Paid" : "Not Paid"}</td>
                <td>
                  {paid ? (
                    <button onClick={() => downloadReceipt(month)}>Download Receipt</button>
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentTenant;
