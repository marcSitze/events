const express = require('express');
const router = express();
const index = require('../controllers/index');
const auth = require('../middlewares/auth');

router.get('/', index.getIndex);
router.post('/auth/register', index.registerUser);
router.post('/auth/login', index.loginUser);
router.get('/dashboard', auth, index.getDashboard);
router.get('/dashboard/events', auth, index.getEvents);
router.delete('/dashboard/events/:eventId', auth, index.deleteAnEvent);
router.get('/logout', auth, index.logout);

module.exports = router;