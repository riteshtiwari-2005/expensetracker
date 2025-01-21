const express = require("express");
const app = express();
const port = 3000;
const cors=require("cors")
const connectDB = require("./connect");  
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const path=require("path")
app.use(express.json());  // Parsing JSON data
app.use(express.urlencoded({ extended: true }));  // Parsing URL-encoded data
app.use(cors());  // Enable Cross-Origin Resource Sharing (CORS) if needed
app.use('/upload', express.static(path.join(__dirname, 'upload')));

connectDB();


app.use("/user", require('./routes/user')); 
app.use("/note", require('./routes/note')); 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`); 
});
