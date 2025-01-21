import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa"; // Import user icon
import styles from "./Navbar.module.css";

const Navbar = () => {
  let token = localStorage.getItem("authtoken");
  let [istoken, setistoken] = useState(false);

  useEffect(() => {
    if (token) {
      setistoken(true);
    } else {
      setistoken(false);
    }
  }, [token]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>ExpenseTracker</div>
      <ul className={styles.navLinks}>
        <li className={styles.navItem}>
          <Link to="/tracker" className={styles.navLink}>
            Home
          </Link>
        </li>
        {!istoken ? (
          <>
            <li className={styles.navItem}>
              <Link to="/login" className={styles.navLink}>
                Login
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/register" className={styles.navLink}>
                Register
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className={styles.navItem}>
              <Link to="/user-profile" className={styles.navLink}>
                <FaUser style={{ marginRight: "5px" }} /> User Profile
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                className={styles.navLink}
                onClick={() => {
                  localStorage.removeItem("authtoken");
                  window.location.href = "/login";
                }}
              >
                Logout
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
