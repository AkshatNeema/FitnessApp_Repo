const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/FitnessApp',{});

const userSchema = new mongoose.Schema({
    userName: String,
    password: String,
    email:String,
    contact: Number
});

const User = mongoose.model('UserDB', userSchema);

app.post('/signup',async(req,res)=>{

    const { userName, password, email, userContact } = req.body;

    try {

        const existingUser = await User.findOne({ userName: userName });
        console.log("In try",existingUser);
        if (existingUser['userName'] == userName) {
            return res.status(400).json({ message: 'User already registered' });
        }

        const newUser = new User({
            userName:userName,
            password:password,
            email : email,
            contact :userContact
        });

        await newUser.save();
        res.status(200).json({ message: 'User saved successfully' });
        

    }catch (error) {
        res.status(500).json({ message: 'Error in saving user' });
        }

});

app.post('/login',async (req,res) => {
    const {userName,password}=req.body;
    
    try{
        const user = await User.findOne({userName:userName, password: password});
        if(user){
            res.status(200).json({message:"User logged successfully ",user:user})
        }
        else{
            res.status(401).json({message:"Invalid UserName or password"})
        }
    }
    catch(error){
        res.status(500).json({message:"Error in logging in user"})
    }
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });