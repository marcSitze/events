const User = require('../models/User');
const Event = require('../models/Event');
const jwt = require('jsonwebtoken');
const config = require('../config/default');

module.exports = {
    getIndex: (req, res) => {
        res.send('Hello world from events');
    }, 
    registerUser: async (req, res) => {
        const { name, email, password, age } = req.body;
        const errors = [];
        let user;

        user = await User.findOne({ email });
        if(user) {
            errors.push({ "msg": "user already exists" });
            return res.status(400).json({ data: errors })
        }

        if(!name){
            errors.push({"msg": "please enter your name"});
        }
        if(!email){
            errors.push({"msg": "please enter your email"});
        }
        if(!password){
            errors.push({"msg": "please enter your password"});
        }
        if(!age){
            errors.push({"msg": "please enter your age"});
        }
        
        if(errors.length > 0) {
            return res.status(400).json({
                data: errors
            });
        }
        user = new User({
            name,
            email,
            password,
            age
        });

        try {
            const newUser = await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            }

            const token = await jwt.sign(payload, config.jwtSecret, { expiresIn: '30d' });
            console.log('User created...');
            res.status(201).json({
                user: newUser,
                token
            });
        } catch (err) {
            res.status(500).json({ "msg": "Server error"});
        }
    },
    loginUser: async (req, res) => {
        const { email, password } = req.body;
        const errors = [];
        try {
        let user = await User.findOne({ email });
        console.log(user);
        if(!user) {
            errors.push({ "msg": "Invalid credidentials" });
            return res.status(400).json({ data: errors });
        }
        if(!email){
            errors.push({"msg": "please enter your email"});
        }
        if(!password){
            errors.push({"msg": "please enter your password"});
        }
        if(errors.length > 0) {
            return res.status(400).json({
                data: errors
            });
        }

        if(user.password !== password) {
            errors.push({ "msg": "Invalid credidentials" });
            return res.status(400).json({ data: errors });
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        
            const token = await jwt.sign(payload, config.jwtSecret, { expiresIn: '30d' });
            console.log('User logged in...');
            res.status(200).json({
                user,
                token
            });
            
        } catch (err) {
            console.error(err);
            res.status(500).json({ "msg": "Server error" });
        }
    },
    getDashboard: async (req, res) => {
        
        const user = await User.findById(req.user.id);
        const events = await Event.find({ user: user.id }).populate('participants.participant').exec();

        res.status(200).json({ events, user, "msg": "Welcome to your dashboard" });
    },
    getEvents: async (req, res) => {
    const user = await User.findById(req.user.id);
      try {
        const events = await Event.find({ user: user.id });
        res.status(200).json({ events });
      } catch (err) {
          res.status(500).json({ "msg": "Server error" });
      }
        
    },
    deleteAnEvent: async (req, res) => {
        const eventId = req.params.eventId;

        console.log(eventId);
        try {
            await Event.findByIdAndRemove({ _id: eventId });
            const events = await Event.find({ user: req.user.id });
            console.log('Event deleted...');
            const otherEvents = await Event.find({user: {$ne: req.user.id }});
            res.status(200).json({ "msg": "Event deleted", events, newEvents: otherEvents });
        } catch (err) {
            console.log(err)
            res.status(500).json({"msg": "Server error"})
        }
        
    },
    logout: (req, res) => {
        req.user = null;
        console.log(req.user);
        console.log("User logged out...");
        res.send({"msg": "User logged out..."})
    }
};