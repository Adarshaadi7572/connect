const bcrypt = require("bcrypt");
const User = require("../modals/user_profile");
const jwt  = require("jsonwebtoken");
const OTP = require("../modals/otp");
const otpGenerator = require("otp-generator");

const otpMailTemp = require("../mailTemplate/accountverification");
const welcomeMailTemp = require("../mailTemplate/welcomeMailTemp");
const sendMail = require("../utills/sendMail");

require("dotenv").config();

exports.signup = async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        phone,
        gender,
        role,
        otp,
      } = req.body;
  
      console.log("User email is", email);
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }
  
      // Validate OTP
      const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
      console.log("OTP response:", response);
  
      if (!response.length || otp !== response[0].otp.toString()) {
        return res.status(400).json({
          success: false,
          message: "The OTP is not valid",
        });
      }
  
      // Hash the password
      let hashedPassword;
      try {
        hashedPassword = await bcrypt.hash(password, 10);
        console.log("Password hashed successfully:", hashedPassword);
      } catch (err) {
        return res.status(500).json({
          success: false,
          message: "Error in hashing password",
        });
      }
  
      // Assign default role
      const userRole = "professional";
  
      // Create the user
      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword, // Use correct field name
        phone,
        gender,
        role: userRole,
      });
      console.log("User created:", user);
      const payLoad  = {
        email:user.email,
        id:user._id,
        role:user.role
      }
      let token = jwt.sign(payLoad, process.env.JWT_SECRET, {
        expiresIn:"2h",
      });
      const option = {
        expires:new Date(Date.now() + 3*24*60*60*1000),
        httpOnly:true,
      }
      
      // Send welcome email
      try {
        const title = "Welcome to Connect";
        const welcomeMail = await sendMail(email, title, welcomeMailTemp(firstName));
        console.log("Welcome email sent successfully:", welcomeMail);
      } catch (error) {
        console.log("Error in sending welcome email:", error);
        return res.status(500).json({
          success: false,
          message: "Error in sending welcome email",
          error: error.message,
        });
      }
      return res.cookie("token", token, option).status(200).json({ //cookie(#name , #data , #option)
        success:true,
        token,
        user,
        message:"User registred successfully",     
        });
    
  
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "User can't be registered, please try again later",
      });
    }
  };
  
exports.login = async (req, res) => {
    try{
        const {role, email, password} = req.body;
        
        if(!email || !password) {
            return res.status(400).json({
                success:false,
                messsage:"please fill all details carefully",
            });

        }
        //check for registered user 
        let user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not Registered",
            });
        }
        if(role != user.role){
            return res.status(400).json({
                success:false,
                message:"Invalid authorization",
                
            });
        }
        const payLoad = {
            email:user.email,
            id:user._id,
            role:user.role,
        };
        //verify password & genrate a jwt token
        if(await bcrypt.compare(password, user.password)){
            //password match 
            let token = jwt.sign(payLoad, process.env.JWT_SECRET, {
                expiresIn:"2h",
            });
            user = user.toObject();
            user.token = token;
            user.password = undefined;
            const option = {
                expires:new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }
            
            return res.cookie("token", token, option).status(200).json({ //cookie(#name , #data , #option)
                success:true,
                token,user,
                message:"User Logged in successfully",
                
            });


        }else{
            return res.status(403).json({
                success:false,
                message:"Password Incorrect"
            });
        }
    }catch(err){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login failure",
        });
    }
};

exports.otpsend = async (req, res) => {
    try{
        const { email} = req.body;
        const checkUserPresent = await User.findOne({email});
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:`User is Already Registered`,
            })
        }
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        const result = await OTP.findOne({otp:otp});
        console.log("otp", otp);
        console.log("result", result);
        while(result){
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets:false,
            });
        }
        const otpbody = await OTP.create({email, otp});
        console.log("OTP Body", otpbody);

        // //send notification 
        // try{
        //     const title = `Email verification OTP`
        //     const sendEmail = await sendMail(email, title ,   otpMailTemp(firstName, otp));
        //     console.log("Email Send Successfully", sendEmail.response);
        // }
        // catch(error){
        //      console.log("Error in sending email", error);
        //      return res.status(500).json({
        //         success:false,
        //         message:"Error in sending mail",
        //         error:error.message
        //      });
        // }
        res.status(200).json({
            success:true,
            message:"Otp has been send to your mail",
        })
    }catch(error){
        console.log(error.message);
        return res.status(500).json({success:false, error:error.message});
    }
};
exports.userDetails = async (req, res) => {
    try{
       const {position, orgnization, city, state, zip } = req.body;
       const userId = req.user._id;
       const currstatus = await Status.create({
            user:userId
       })

    }
}