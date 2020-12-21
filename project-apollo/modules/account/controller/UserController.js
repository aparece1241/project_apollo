const sequelize = require('../../../services/Database');

const {DataTypes} = require('sequelize');

const User = require('../models/account')(sequelize, DataTypes);

const userSchema = require('../validator/userSchema');

const RequestBodyParser = require('../../../services/RequestBodyParser');

const jwt = require('jsonwebtoken');

const crypt = require('../services/crypt');
module.exports = {
    //create user
    addUser: async (req, res) => {
        const {error, value} = userSchema.validate(req.body, {abortEarly: false});
        if(error) return res.status(400).json({message: error});
        value["password"] = crypt.en(value["password"]);
        console.log(value);
        try {
            const userToAdd = await User.create(value);
            const user = await userToAdd.save();
            if(!user) return res.status(400).json({message: "Something went wrong"});
            res.json({user: user});
        } catch (error) {
            res.status(500).json({message: error});
        }
    },
    
    //get all users
    getAllUsers: async (req, res)=> {
        try {
            const users = await User.findAll({
                attributes: {exclude: ["password"]}
            });
            if(!users) return res.status(400).json({message: "Something went wrong!"});
            res.json({users: users});
        } catch (error) {
            res.status(500).json({message: error});
        }
    },

    //get user by Id
    getUserById: async (req, res)=> {
        const id = req.params.id;
        try {
            const user = await User.findByPk(id);
            if(!user) return res.status(400).json({message: "Something went Wrong!"});
            res.json({user: user});
        } catch (error) {
            res.status(500).json({message: error});
        }
    },

    //delete a user
    deteleUserById: async (req, res) => {
        const id = req.params.id;
        try {
            const user = await User.destroy({
                where: {
                    id: id
                }
            });

            if(!user) return res.status(400).json({message: "Something went wrong!"})
            res.json({user: user});
        } catch (error) {
            res.status(500).json({message: error});
        }
    },

    //update user by id
    updateUserById: async (req, res)=> {
        const id = req.params.id;
        const updates = RequestBodyParser(req.body);
        
        //if password exists
        if(updates["password"]){
            updates["password"] = crypt.en(updates["password"]);
        }

        try {
            const user = await User.update(updates, {where: {
                id: id
            }})
            if(!user) return res.status(400).json({message: "Something went wrong!"});
            res.json({user: user});
        } catch (error) {
            res.status(500).json({message: error});
        }
    },

    //user login
    userLogin: async (req, res)=> {
        const username = req.body.username;
        const password = req.body.password;
        
        try {
            const userData = await User.findOne({where: {username: username}});
            
            if(!userData) return res.status(400).json({message: "User name does'nt exist!"})
            
            let user = userData.get();
            

            let decryptedPassword = crypt.de(user.password);
            
            if(password !== decryptedPassword) return res.status(400).json({message: "Incorrect password!"});
            
            //generate token
            let access_token = jwt.sign({id: user.id, username: user.username, lastname: user.lastname},process.env.SECRET_KEY_TOKEN, {expiresIn: '8h'});
           
            res.json({user: user, token: access_token});
        } catch (error) {
            console.log(error);
            res.status(500).json({message: error});
        }
    }

};