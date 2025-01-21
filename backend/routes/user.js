// const express = require("express");
// const router = express.Router();
// const User = require("../models/user");
// const bcrypt = require("bcrypt");
// const jwttoken=require("jsonwebtoken")
// const KEY='1952';
// const multer=require("multer")
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './upload')
//   },
//   filename: function (req, file, cb) {
//     cb(null, ` ${Date.now()}-${file.originalname}`)
//    }
// })

// const upload = multer({ storage: storage })
// router.post("/create",upload.single("file"), async (req, res) => {
//   const { firstname, lastname, email, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists." });
//     }
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new User({
//       firstname,
//       lastname,
//       email,
//       password: hashedPassword, // Store the hashed password
//       file:req.file.filename,
//       filepath:`/uploads/${req.file.filename}`
//     });
//     await newUser.save();

//     res
//       .status(201)
//       .json({ message: "User created successfully.", user: newUser });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).json({ message: "Server error. Please try again later." });
//   }
// });
// router.post("/login", async(req,res) => {
// const {email,password}=req.body;
// try{
// let finduser=await User.findOne({email});
// if(!finduser)
// {
//     return res.status(401).json({
//         message:"user not found"  
//     })
// }
// const isMatch = await bcrypt.compare(password, finduser.password);
// if (!isMatch) {
//     return res.status(400).json({
//       message: "Invalid email or password",
//     });
//   }
//   const token=jwttoken.sign({user_id:finduser._id},KEY,{expiresIn:'1h'})
//   res.status(201).json({
//     message:"login success",
//     finduser,
//     token
//   })
  
// }
// catch(error){
//     console.error("Error during login:", error);
//     res.status(500).json({
//         message: "Server error. Please try again later.",
//     });
// }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwttoken = require("jsonwebtoken");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const user = require("../models/user");
const {middleware}=require("../middleware/jwt")
const KEY = '1952';

// Ensure the upload directory exists
const uploadDir = path.join(__dirname, "../upload");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage: storage, 
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    if (mimeType) {
      return cb(null, true);
    }
    cb(new Error("Only image files are allowed"), false);
  }
});


router.post("/create", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "File is required" });
  }

  const { firstname, lastname, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword, // Store the hashed password
      file: req.file.filename,
      filepath: `/upload/${req.file.filename}`,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully.", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  try {
    let finduser = await User.findOne({ email });
    if (!finduser) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, finduser.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwttoken.sign({ user_id: finduser._id, firstname:finduser.firstname,lastname:finduser.lastname,email:finduser.email }, KEY, { expiresIn: '1h' });

    res.status(201).json({
      message: "Login success",
      finduser,
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      message: "Server error. Please try again later.",
    });
  }
});
  
router.get('/files/:id',middleware,async (req, res) => {
  try {
    const file = await user.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    const filePath = path.join(__dirname,'../', file.filepath);
    console.log("success")
    res.sendFile(filePath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve file' });
  }
});
module.exports = router; 
