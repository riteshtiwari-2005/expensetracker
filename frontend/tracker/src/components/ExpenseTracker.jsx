import React, { useEffect, useState } from "react";
import styles from "./ExpenseTracker.module.css";
import {useNavigate} from "react-router-dom"

const ExpenseTracker = () => {
  const navigate = useNavigate();
 let token = localStorage.getItem("authtoken");
 let [Data, setData] = useState([]);
 let [title, settitle] = useState("");
 let [amount, setamount] = useState(0);
 const [category, setCategory] = useState("");
 const [description, setdescription] = useState("");
 const convertToIST = (isoDate) => {
  const date = new Date(isoDate);

  const options = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  // Format the date in IST
  const istDate = date.toLocaleString("en-IN", options);
  return istDate;
};

  async function button(e) {
    e.preventDefault();  

    const expense = {
      title,
      amount,
      category,
      description,
    };
    console.log(expense);
    const response = await fetch("http://localhost:3000/note/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(expense),
    });
    const data = await response.json();
    console.log(data);
    if (data.user && data.user) {
      setData(prevData => [...prevData, data.user]);  // Append object to array
      console.log(Data)
    } else {
      console.error(`Invalid :`, data);
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/note/fetch", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setData(data.note);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

async function handleDelete(_id)
{
const response=await fetch(`http://localhost:3000/note/del/${_id}`,{
  method:'DELETE',
  headers:{
   "Content-Type": "application/json", 
    Authorization: `Bearer ${token}`,
  }
})
const data= await response.json();
console.log(data)
if(response.ok)
{
  setData(prevData => prevData.filter(item => item._id !== _id));

}
}


  function handleCategoryChange(e) {
    setCategory(e.target.value); // update state when category changes
    console.log(e.target.value);
  }
  return (

    <div className={styles.container}>
  {token ? (
    <>
      {/* Header Section */}
      <header className={styles.header}>
        <h1 className={styles.title}>Expense Tracker</h1>
      </header>

      {/* Add Expense Section */}
      <div className={styles.addExpense}>
        <h2 className={styles.sectionTitle}>Add Expense</h2>
        <form
          className={styles.form}
        
        >
          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>
              Title
            </label>
            <input
              type="text"
              id="title"
              className={styles.input}
              placeholder="Enter expense title"
              aria-label="Expense title"
              onChange={(e) => settitle(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="amount" className={styles.label}>
              Amount
            </label>
            <input
              type="number"
              id="amount"
              className={styles.input}
              placeholder="Enter amount"
              aria-label="Expense amount"
              onChange={(e) => setamount(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="category" className={styles.label}>
              Category
            </label>
            <select
              id="category"
              className={styles.input}
              aria-label="Expense category"
              onChange={handleCategoryChange}
              required
            >
              <option value="food">Food</option>
              <option value="transport">Transport</option>
              <option value="entertainment">Entertainment</option>
              <option value="bills">Bills</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="date" className={styles.label}>
              Date
            </label>
            <input
              type="date"
              id="date"
              className={styles.input}
              aria-label="Expense date"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.label}>
              Description (Optional)
            </label>
            <textarea
              id="description"
              className={styles.input}
              placeholder="Enter a brief description"
              aria-label="Expense description"
              onChange={(e) => setdescription(e.target.value)}
            />
          </div>
          <button type="submit" className={styles.button} onClick={button}>
            Add Expense
          </button>
        </form>
      </div>

      {/* Expense List Section */}
      <div className={styles.expenseList}>
        <h2 className={styles.sectionTitle}>Expense List</h2>
        <div className={styles.cardContainer}>
          {(Data || []).length === 0 ? (
            <div className={styles.noData}>No expenses added yet.</div>
          ) : (
            Data.map((i,index) => (
              <div key={index} className={styles.card}>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{i.title}</h3>
                  <p className={styles.cardAmount}>₹{i.amount}</p>
                  <p className={styles.cardCategory}>{i.category}</p>
                  <p className={styles.cardDate}>{convertToIST(i.date)}</p>
                  {i.description && (
                    <p className={styles.cardDescription}>{i.description} </p>
                  )}
                </div>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(i._id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Summary Section */}
      <div className={styles.summary}>
        <h2 className={styles.sectionTitle}>Summary</h2>
        <div className={styles.summaryCard}>
          <p className={styles.summaryText}>Total Expense:</p>
          <p className={styles.summaryAmount}>
            ₹
            {(Data || []).reduce(
              (total, item) => total + parseFloat(item.amount || 0),
              0
            )}
          </p>
        </div>
      </div>
    </>
  ) : (
    <div className={styles.notEligible}>
      <h1 className={styles.accessDeniedTitle}>
        You are not eligible to view this content.
      </h1>
      <p className={styles.accessDeniedText}>
        Please log in to access the Expense Tracker.
      </p>
    </div>
  )}
</div>


  );
};

export default ExpenseTracker;
