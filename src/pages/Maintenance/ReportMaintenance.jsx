import React, { useState } from "react";
import emailjs from "emailjs-com";
import { Navigate, useLocation } from "react-router-dom";

const ReportMaintenance = () => {

  const location = useLocation();
  // Check if the user navigated from /Dashboard
  const referrer = location.state?.from;
  if (referrer !== "/Tenant Dashboard") {
    // Redirect to Dashboard if the referrer is not correct
    return <Navigate to="/Dashboard" replace />;
  }


  const [selectedIssues, setSelectedIssues] = useState([]);
  const [otherIssue, setOtherIssue] = useState("");
  const [tenantName, setTenantName] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  const issues = ["Plumbing", "Electrical", "Locksmith", "Other"];

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedIssues((prev) => [...prev, value]);
    } else {
      setSelectedIssues((prev) => prev.filter((issue) => issue !== value));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Combine selected issues with the "Other" issue if applicable
    const issuesToSend = otherIssue
      ? [...selectedIssues, `Other: ${otherIssue}`]
      : selectedIssues;

    const templateParams = {
      to_email: "tenantease24@gmail.com", // Replace with your target email
      tenant_name: tenantName,
      apartment_number: apartmentNumber,
      issues: issuesToSend.join(", "),
    };

    emailjs
      .send(
        "service_p2qlcyf", // Replace with your EmailJS service ID
        "template_nk1fb0t", // Replace with your EmailJS template ID
        templateParams,
        "Dh4Ug8jsugp-UA63S" // Replace with your EmailJS public key
      )
      .then(
        () => {
          setMessageSent(true);
          setSelectedIssues([]);
          setOtherIssue("");
          setTenantName("");
          setApartmentNumber("");
        },
        (error) => {
          console.error("Failed to send email:", error);
        }
      );
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Report Maintenance Issue</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={tenantName}
              onChange={(e) => setTenantName(e.target.value)}
              placeholder="Enter your name"
              required
              style={{ width: "100%", marginBottom: "10px" }}
            />
          </label>
        </div>
        <div>
          <label>
            Apartment Number:
            <input
              type="text"
              value={apartmentNumber}
              onChange={(e) => setApartmentNumber(e.target.value)}
              placeholder="Enter your apartment number"
              required
              style={{ width: "100%", marginBottom: "10px" }}
            />
          </label>
        </div>
        {issues.map((issue) => (
          <div key={issue}>
            <label>
              <input
                type="checkbox"
                value={issue}
                onChange={handleCheckboxChange}
              />
              {issue}
            </label>
          </div>
        ))}
        {selectedIssues.includes("Other") && (
          <textarea
            placeholder="Please describe your issue"
            value={otherIssue}
            onChange={(e) => setOtherIssue(e.target.value)}
            style={{ width: "100%", marginTop: "10px" }}
          />
        )}
        <button type="submit" style={{ marginTop: "10px" }}>
          Send
        </button>
      </form>
      {messageSent && <p style={{ color: "green" }}>Message sent successfully!</p>}
    </div>
  );
};

export default ReportMaintenance;
