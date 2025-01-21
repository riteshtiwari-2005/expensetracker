const express = require("express");
const router = express.Router();
const Note = require("../models/note");
const {middleware}=require("../middleware/jwt")
const KEY='1952';
const mongoose=require("mongoose")
router.get("/fetch",middleware, async (req, res) => {
  const { userId } = req;
  console.log(userId)
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    const note = await Note.find({ userId });

    if (!note) {
      return res.status(404).json({ message: "Note not found for the user" });
    }

    res.status(200).json({ message: "Note fetched successfully", note });
  } catch (error) {
    console.error("Error fetching note:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});
router.post('/add',middleware,async(req,res)=>{
const {title,amount,category,description}=req.body;
const{userId}=req;
console.log(title)
if (!userId) {
  return res.status(400).json({ message: "User ID is required" });
}
try{
const newnote=new Note({
  title:title,
  amount:amount,
  category:category,
  description:description,
  userId:userId
})
await newnote.save();
res.status(200).json({
  message:"note saved successfull",
  user:{
    title:title,
    amount:amount,
    category:category,
    description:description,
    userId:userId
  }
})
}
catch(error)
{
  res.status(501).json({
    message:"501 server error",
    error
  })
}
})
router.delete('/del/:id',middleware, async (req,res)=>{
  const { id } = req.params;
  const {userId}=req;
  console.log(userId)
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try{
let count= await Note.countDocuments({userId})
if(count==0)
{
  return res.status(404).json({
    message:"Data Note Found to delete"
  })
}
await Note.findOneAndDelete({ _id: id, userId:userId }); 
res.status(201).json({
  message:"user data deleted successfull"
})

  }
  catch(error)
  {
    res.status(501).json({
      message:"error to delete Note",
      error:error
    })
  }

})

module.exports = router;
