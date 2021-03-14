// const { io, server } = require('../server'); 
// const { io } = require('../server');
const User = require('../models/User');
const Event = require('../models/Event');
const jwt = require('jsonwebtoken');
const config = require('../config/default');
const io = require('socket.io')();


module.exports = {
    getEvents: async (req, res) => {

        const events = await Event.find({user: {$ne: req.user.id }}).populate('user');
        res.status(200).json({ events });
    },
    getEventById: async (req, res) => {
        const eventId = req.params.eventId;
        const event = await Event.findById(eventId).populate('participants.participant').exec();
        if(!event) {
            return res.status(400).json({ "msg": "Event not found" });
        }

        res.status(200).json({ event });
    },
    createEvent: async (req, res) => {
        const { name, description, adress, date } = req.body;
        const userId = req.user.id;
        console.log(userId);
        const errors = [];

        if(!name){
            errors.push({"msg": "please enter the event name"});
        }
        if(!description){
            errors.push({"msg": "please enter event description"});
        }
        if(!adress){
            errors.push({"msg": "please enter event adress"});
        }

        if(errors.length > 0) {
            return res.status(400).json({
                errors
            });
        }
        const event = new Event({
            participants: {participant: userId, motivation: 'my event'},
            name,
            description,
            adress,
            user: userId,
            date
        });
        if(!event.date) {
            event.date = new Date();
            console.log(event.date);
        }
        
        try {
            const newEvent = await event.save();
            // update events created by this user
            const user = await User.findById(userId);
            const update = {
                event: [...user.event, newEvent.id]
            };
            await User.findByIdAndUpdate(userId, update);
            console.log("event created...");

            console.log(event);
            res.status(201).json({event: newEvent });
        } catch (err) {
            console.error(err);
            res.status(500).json({ "msg": "Server error" });
        }
    },
    updateEvent: async (req, res) => {
        let event = await Event.findById(req.params.eventId).populate('participants.participant').exec();
        const user = req.user.id;
        const motivation = req.body.motivation;
        
       const participant = event.participants.find(participant => participant.participant._id == user);

       if(participant) {
           return res.status(400).json({ "msg": "participant already registered to this event" });
       }
        try {
            const update = {
                participants: [...event.participants, { 
                    participant: user,
                    motivation: motivation
                }]
            };
            const eventUpdate = await Event.findByIdAndUpdate(event.id, update);
            event = await Event.findById(req.params.eventId).populate('participants.participant').exec();
            res.status(200).json({ event, "msg": "Event updated" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ "msg": "Server error", error });
        }
       
    }
};