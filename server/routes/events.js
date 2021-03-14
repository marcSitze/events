const express = require('express');
const router = express();
const events = require('../controllers/events');
const auth = require('../middlewares/auth');

router.use(auth);
router.get('/', events.getEvents);
router.get('/:eventId', events.getEventById);
router.post('/', events.createEvent);
router.put('/:eventId', events.updateEvent)

module.exports = router;