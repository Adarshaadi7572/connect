const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    try{
        // extract jwt token
        console.log("cookie", req.cookies.token);
        console.log("body", req.body.token);

        console.log("header", req.header("Authorization"));

        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer", "");
        if(!token){
            return res.status(401).json({
                success:false,
                message:'Token missing',
            });

        }
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:'Token is invalid',
            });
        }
        next();
    }catch(error){
        return res.status(401).json({
            success:false,
            message:'Something went wrong, while verifying the token',
        });
    }
}
exports.isProfessional = (req, res, next) => {
    try{
        if(req.user.role != "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protechted route for admin",
            });
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:'User Role is not Matching',
        });
    }
}
exports.isAdmin = async (req, res, next) => {
    try{
        if(req.user.role != "Proffessional"){
            return res.status(401).json({
                success:false,
                message:"This is a Protechted route for admin",
            });
        }
    }catch(error){
        return res.status(500).json({
            success:false,
            message:'User Role is not matching',
        })
    }
}