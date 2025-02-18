const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
    try{
        //extract token
        const token = req.body.token || req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");


        //if token missing, then return response
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'Token is missing',
            });
        }

        //verify the token
        try{
            const decode =  jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(err) {
            //verification - issue
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    }
    catch(error) {  
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
        });
    }
}
exports.isProfessional = (req, res, next) => {
    try {
        if (req.user.role !== "professional") {  // Corrected Role
            return res.status(401).json({
                success: false,
                message: "This is a protected route for professionals",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User Role is not Matching",
        });
    }
}

exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {  // Corrected Role
            return res.status(401).json({
                success: false,
                message: "This is a protected route for admins",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User Role is not matching",
        });
    }
}
