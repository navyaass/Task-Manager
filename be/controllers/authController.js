import bcrypt from 'bcrypt';
import User from '../models/User.model.js'; // Make sure this is imported!
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'

dotenv.config()

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();
    return res.status(201).json({ msg: "User registered successfully" });

  } catch (err) {
    console.error("Error occurred while registering user:", err);
    return res.status(500).json({ msg: "Server error" });
  }
};
/////////////////////////////loginUser function//////////////////////////////////

export const loginUser = async (req,res) =>{

  const {email, password } = req.body;
  if(!email || !password){
    return res.status(400).json({msg:"please fill the required fields"});
  }
  try{
    const user= await User.findOne({email});
    if(!user)
      return res.status(400).json({msg:"User not found"});
     const isMatch = await bcrypt.compare(password,user.password)
     if(!isMatch){
      return res.status(400).json({msg:"Invalid credentials"});
     }
     
     let token = jwt.sign({
      id:user.id,
      email:user.email,
     },
    process.env.JWT_SECRET,
    {
    expiresIn:process.env.JWT_EXPIRES_IN})
    
  return res.status(200).json({msg:"login successfull",token,user})
  }
   
  catch(error){
    console.log("error occured while logging in")
    return res.status(404).json({msg:"not found"})

  }
}