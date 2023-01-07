// const express = require('express');
// const router = express.Router();
// const Feedback = require('../models/feedback');
// const catchAsync = require('../utilities/catchAsync');
// const ExpressError = require('../utilities/ExpressError');
// const { isLoggedIn, validateFeedback, isAdmin } = require('../middleware');

// //Admin views feedback
// router.get('/admin/feedback', isLoggedIn, isAdmin, catchAsync(async (req, res) => {
//     const feedback = await Feedback.find({});
//     res.render('admin/feedback', { feedback });
// }));

// module.exports = router;