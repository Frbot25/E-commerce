const bcrypt = require('bcrypt');
const User = require("../models/Users");
const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const userController = {
    signUp: async (request, response) => {
        let saltRounds = await bcrypt.genSalt(10);
        let HashedPassword = await bcrypt.hash(request?.body?.password, saltRounds);
        try {
            const user = await User.create({
                firstname: request.body.firstname,
                lastname: request.body.lastname,
                email: request.body.email,
                password: HashedPassword
            });
            response.status(200).json("user created !")
        }catch(err) {
            response.status(500).json(err.message);
            console.log("!!! Voici l'erreur dans le catch du controller: ",err.message);
        }
    },
    login : async (request, response) => {
            const { email, password} = request.body;
            console.log(email,password)
        try{
            
            const findUserByEmail = await User.findOne({ email } );
            if(findUserByEmail) {
                console.log("password de finUser",findUserByEmail.password)
            const isValid = await bcrypt.compare(password, findUserByEmail.password);
            if(isValid) {
                const token = jwt.sign(
                    { _id: findUserByEmail._id, role: findUserByEmail.userRoleId },
                    process.env.JWT_SECRET
                  );
                  const encode = jwt.verify(token, process.env.JWT_SECRET);
                 const userSecure = {
                    id: findUserByEmail._id,
                    firstname: findUserByEmail.firstname,
                    email: findUserByEmail.email,
                    islogged: true
                 }
                response.status(200).json({userSecure, token})
            }
            
            }else{
                response.status(500).json("User Not Found!")
            }
            
        }catch(err){
            response.status(500).json(err.message);
            console.log("!!! Voici l'erreur dans le catch du controller login: ",err.message);
        }
    },
    updateUserById: async (request, response) => {
        const id = request.params.id;
        const body = await request.body;
        const userdetails = request.userDetails._id;
        console.log("id:", id, "id de requestDetailUser", userdetails);
        let password;
        let dataModified;
        try{
            if(id !== userdetails) {
                throw new Error('Not Authorized!');
            }
            let HashedPassword;
            if(request?.body?.password) {
                let saltRounds = await bcrypt.genSalt(10);
                password = await bcrypt.hash(request?.body?.password, saltRounds);
                dataModified = {...body, password};
            }else {
                dataModified = body
            }
            const updateUser = await User.updateOne(dataModified)
            response.status(200).json('update success!')
        }catch(err){
            response.status(500).json(err.message);
            console.log("!!! Voici l'erreur dans le catch du controller update: ",err.message);
        }
    },
    deleteUserById: async (request, response) => {
        try{
            const id = request.params.id
            const userId = request.userDetails._id;
            console.log("id:", id, "id de requestDetailUser", userId);
            if(id !== userId) {
                throw new Error('Not access!')
            }
            const deleteUser = await User.deleteOne({'_id': id})
            response.status(200).json('ok')
        }catch(err){
            response.status(500).json(err.message);
            console.log("!!! Voici l'erreur dans le catch du controller delete: ",err.message);
        }
    }
};

module.exports = userController;