const { User, Login} = require('../models');

// const userChecker = async (req,res,next) => {
//     const result = await Profile.findOne({where:{email:req.query.email}});
//     result
//         ? removeUser(req,res,next)
//         : next();
// }

// const removeUser = async (req,res,next) => {
//     await User.destroy({where:{id:req.params.userId}});
//     res.json({"msg": "the user with the email already exit"});
// }

const comparePassword = (req,res,next) => {
    const confirmPassword = req.body.confirmPassword;
    const password = req.body.password;

    confirmPassword === password
        ? next()
        : res.json({"msg": "your password and confirm password does not match"})
} 

// const compareRandomDigit = async (req,res,next) =>{

//     const result = await Forget.findOne({
//         where : {email:req.user.email},
//         attribute : ['digit']
//     });

//     result ? 
//         result.length == 0 ?
//             res.json({'msg':'invalid starting endpoint'})
//             :result.digit == req.body.digit ?
//                 next()
//                 :res.json({'msg':'incorrect digits'})

//         :res.json({'msg':'invalid starting endpoint'})

// }


const emailChecker = async (req,res,next) => {
    const result = await User.findOne({where:{email:req.body.email}});
    result
        ? res.json({"msg": "this email is in use by another user"})
        : next();
}

const confirmEmail = async (req,res,next) => {
    const result = await User.findOne({where:{email:req.body.email}});
    result
        ? next()
        : res.json({"msg": "this email is not registered"});
}

// const checkLogout = async (req,res, next)=>{
//     const result = await Logout.findOne({where:{userId:req.user.id}});
//     result ? res.json('Unauthorized') : next()
// }

// const clearLogout = async (req,res,next)=>{
//     const data = req.body;
//     const result = await Logout.findOne({where:{email: data.email}});
//     if(!result) return next();
//     Logout.destroy({where:{email: data.email}});
//     return next();
// }


// const isAdmin = async (req,res,next) => {
//     const result = await User.findOne(
//         {where: {id: req.user.id}},
//         {
//             attribute: ['isAdmin']
//         }
//         )
        
//     result.isAdmin
//         ? next() 
//         : res.json("unathorized")   
// }

// const isAuthor = async (req,res,next) => {
//     const result = await User.findOne(
//         {where: {id: req.user.id}},
//         {
//             attribute: ['isAuthor']
//         }
//         )
        
//     result.isAuthor
//         ? next() 
//         : res.json({msg: 'you are not an author'})   
// }

const checkLogin = async (req,res, next)=>{
    console.log(req.params.id)
    req.query ? next() : res.json('unauthorize')
}

module.exports = {
    // userChecker,
    comparePassword,
    emailChecker,
    checkLogin,
    // checkLogout,
    // clearLogout,
    confirmEmail,
    // compareRandomDigit,
    // isAdmin,
    // isAuthor
}