import React, { useEffect, useState } from "react";
import styles from "./UserProfile.module.css";
import { jwtDecode } from "jwt-decode";

const UserProfile = () => {
  const [userData, setUserData] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [img, setImg] = useState('');
  const token = localStorage.getItem("authtoken");

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUserData(decoded.user_id);
      setFirstname(decoded.firstname);
      setLastname(decoded.lastname);
      setEmail(decoded.email);
    }
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      if (userData) {
        try {
          const response = await fetch(`http://127.0.0.1:3000/user/files/${userData}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (response.ok) {
            const blob = await response.blob(); 
            const imgUrl = URL.createObjectURL(blob); 
            setImg(imgUrl); 
            console.log("Image fetched successfully:", imgUrl);
          } else {
            console.error("Failed to fetch the image:", response.status, response.statusText);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
  
    fetchData();
  }, [userData, token]);
  

 

  return (
    <div className={styles.profileContainer}>
      {token?(<>
        <div className={styles.profileCard}>
        <div className={styles.imagePreview}>
          <img
            src={img}
            className={styles.previewImage}
          />
        </div>
        <div className={styles.infoSection}>
          <div className={styles.infoRow}>
            <label className={styles.label}>First Name:</label>
            <span className={styles.info}>{firstname}</span>
          </div>
          <div className={styles.infoRow}>
            <label className={styles.label}>Last Name:</label>
            <span className={styles.info}>{lastname}</span>
          </div>
          <div className={styles.infoRow}>
            <label className={styles.label}>Email:</label>
            <span className={styles.info}>{email}</span>
          </div>
        </div>
      </div>
      </>):(<>
        <h1 style={{ color: "red" }}>First Login And View</h1>
        </>)
    }
    </div>
  );
};

export default UserProfile;