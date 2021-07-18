const {User, Login, Post, Comment} = require('../models');
const filesMiddleware = require('../middlewares/files.middleware');
const jwt =require('jsonwebtoken');
const multer = require('multer');
const bcrypt = require('bcrypt');



const register = async(req,res,next) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);

    req.body.password = hash;
    req.body.photo = " no profile yet";

    await User.create(req.body);
    return res.json({'msg':'account created successfully'});  
}

const login = async function(req, res){
    
    const data = {
        email: req.body.email,
        password: req.body.password
    }
    let payLoad = {}
    
    const user = await User.findOne({
        where:{
            email : data.email
        }
               
    });

    // return res.json(user);
    !user
        ? res.json({"msg": "this email is not registered as a member"})
        : '';
    
    const checkPassword = bcrypt.compareSync(data.password, user.password); 
    
    !checkPassword
        ? res.json({"msg": "Password is incorrect please inter a correct password"})
        : payLoad.id = user.id
        1
            ? Login.create({id: user.id, email: user.email})
            : ''

    const token = jwt.sign(payLoad, 'myVerySecret');
    res.json({
        'token' : token,
        "msg" : "login successful",
        "user" : user,
        "status" : 200
    });
    
}


const logout = async (req,res,next) =>{
    await Login.destroy({where: {id: req.query.id}});
    res.json({msg: "logout successfull"});
}

const editProfile = async (req,res,next) => {
    const data = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        phone : req.body.phone,
        address : req.body.address
    }

    const result = await User.update(data, {where:{id: req.query.id}});
    
    result
        ? res.json({'msg': 'profile updated successfully'})
        : res.json({'msg': 'fail to update profile'})
}

const uploadPhoto = async (req,res, next) => {

    filesMiddleware.singleUpload(req, res, async function(err) {
        if (err instanceof multer.MulterError) {
        return res.json(err.message);
        }
        else if (err) {
          return res.json(err);
        }
        else if (!req.file) {
          return res.json({"image": req.file, "msg":'Please select an image to upload'});
        }
        if(req.file){

            await User.update({
                photo: req.file.path,
            }, {where:{id: req.query.id}});
            return  res.json({
             'msg': 'photo uploaded successfull',
                       },
            
        );
        }
        });    
}

const findAll = async (req,res,next) => {
    const result = await User.findAll();
    result.length > 0
        ? res.json(result)
        : res.json({"msg":"no register user yet"});
}

const findOne = async (req,res,next) => {
    const result = await User.findOne({where: {id: req.query.id}});
    result
        ? res.json(result)
        : res.json({"msg":"no register user yet"});
}

const makePost = async (req,res,next) => {

    await Post.create(req.body)
    res.json({msg:"post created"});
}

const getAllPost = async (req,res,next) => {
    const result = await Post.findAll({
        include:[{model: User}]
    })
    res.json({success: true, result});
}

const getSinglePost = async (req,res,next) => {
    const result = await Post.findOne({
        where: {id: req.query.id},
        include:[{model: User},{model: Comment}]
    })
    res.json({success: true, result});
}

const makeComment = async (req,res,next) => {

    await Comment.create(req.body)
    const result = await Comment.findAll({where: {postId: req.body.postId}})
    res.json({success: true, result});
}

module.exports = {
    register,
    uploadPhoto,
    editProfile,
    findAll,
    login,
    findOne,
    logout,
    makeComment,
    makePost,
    getAllPost,
    getSinglePost
}