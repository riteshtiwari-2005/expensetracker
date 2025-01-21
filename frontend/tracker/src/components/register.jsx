import React, { useState } from "react";
import styles from "./Register.module.css";

const Register = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);

  let submit = async (e) => {
    e.preventDefault();  // Prevent form from reloading the page

    // Create FormData object to send form data, including file
    const formData = new FormData();
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('file', profilePhoto);

    try {
      // Send the form data to the server
      let response = await fetch('http://localhost:3000/user/create', {
        method: 'POST',
        body: formData,  // Send the FormData
      });

      let data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Register</h2>
        <form className={styles.form} onSubmit={submit} encType="multipart/form-data">
          <div className={styles.formGroup}>
            <label htmlFor="firstname" className={styles.label}>
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              className={styles.input}
              placeholder="Enter your first name"
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="lastname" className={styles.label}>
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              className={styles.input}
              placeholder="Enter your last name"
              onChange={(e) => setlastname(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.input}
              placeholder="Enter your email"
              onChange={(e) => setemail(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.input}
              placeholder="Enter your password"
              onChange={(e) => setpassword(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="profilePhoto" className={styles.label}>
              Profile Photo
            </label>
            <input
              type="file"
              id="file"
              name="file"
              className={styles.input}
              onChange={(e) => setProfilePhoto(e.target.files[0])}
            />
          </div>

          <button type="submit" className={styles.button}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
