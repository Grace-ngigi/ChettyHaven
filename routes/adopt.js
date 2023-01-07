const express = require('express');
const router = express.Router();
const Adopt = require('../models/adopt');
const catchAsync = require('../utilities/catchAsync');
const flatten = require('../utilities/flatten')


//Admin views available to adopt
router.get('/', catchAsync(async (req, res) => {
    const adopt = await Adopt.find({});
    res.send(adopt);
}));

router.get('/petType', catchAsync(async (req, res) => {
    const queryCats = [
        {$match:{"petType":"cat"}},
        {$count: "cats"},
    ]
    const cats = await Adopt.aggregate(queryCats);
    const queryDogs = [
        {$match:{"petType":"dog"}},
        {$count: "dogs"}
    ]
    const dogs = await Adopt.aggregate(queryDogs);
    const petTypes = []
    petTypes.push(cats, dogs)
    const petsArray = flatten(petTypes)
    var adoptTypes = {};
    petsArray.map(k => Object.keys(k).forEach(a => adoptTypes[a] = k[a]))
    res.send(adoptTypes);
}));

router.get('/count', catchAsync(async(req, res) => {
    const query = [
        {$count: "sum"}
    ]
    const totalPets = await Adopt.aggregate(query);
    res.send(totalPets)
}));

// //Admin new adopt form
// router.get('/new', (req, res) => {
//     res.render('admin/adoptNew')
// });

// router.post('/',  upload.array('images'), isLoggedIn, isAdmin, validateAdopt, catchAsync(async (req, res) => {
//     const adopt = new Adopt(req.body.adopt);
//     adopt.images = req.files.map(f=> ({url: f.path, filename: f.filename}));
//     await adopt.save();
//     //notify Admin
//     req.flash('success', 'New pet added successfully')
//     res.redirect(`/adopt/admin/adopt`);
// }));

//confirm details to adopt
// router.get('/confirm/:id', isLoggedIn, catchAsync(async (req, res) => {
//     const adopt = await Adopt.findById(req.params.id)
//     console.log(adopt);
//     if (!adopt) {
//         req.flash('error', 'Cannot find that pet!');
//         return res.redirect('/adopt/admin/adopt');
//     }
//     res.render('user/adoptAttempt', { adopt });
// }));

// router.get('/adopt/good', (req, res) => {
//     req.flash('success', 'Thank you wait for our call to deliver')
//     res.redirect(`/adopt`);
// })

// admin edit form
router.get('/edit',  (req, res) => {
    res.render('admin/adoptEdit');
});

//prefilling edit form
router.get('/:id/edit', catchAsync(async (req, res) => {
    const adopt = await Adopt.findById(req.params.id);
    res.render('admin/adoptEdit', { adopt });
}));

//submitting edit form
router.put('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const adopt = await Adopt.findByIdAndUpdate(id, { ...req.body.adopt });
    res.redirect(`/adopt/admin/adopt`);
}));

//deleting
router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Adopt.findByIdAndDelete(id);
    res.redirect('/adopt/admin/adopt');
}));
module.exports = router;