const express = require('express');
const router = express.Router();
const Petcare = require('../models/petcare');
const catchAsync = require('../utilities/catchAsync');
const ExpressError = require('../utilities/ExpressError');
const petcare = require('../models/petcare');
const flatten = require('../utilities/flatten')

//Admin views all
// router.get('/admin/petcare', catchAsync(async (req, res) => {
//     const petcare = await Petcare.find({});
//     res.render('admin/petcare', { petcare });
// }));

//fetch all pets in petcare
router.get('/', catchAsync(async (req, res,) => {
    const types= await Petcare.find({})
    res.send(types)
}));

router.get('/recent', catchAsync(async (req, res,) => {
    const types= await Petcare.find({}).limit(3)
    res.send(types)
}));

router.get('/petType', catchAsync(async (req, res) => {
    const queryCats = [
        {$match:{"petType":"cat"}},
        {$count: "cats"},
    ]
    const cats = await Petcare.aggregate(queryCats);
    const queryDogs = [
        {$match:{"petType":"dog"}},
        {$count: "dogs"}
    ]
    const dogs = await Petcare.aggregate(queryDogs);
    const petTypes = []
    petTypes.push(cats, dogs)
    const petsArray = flatten(petTypes)
    var petcareTypes = {};
    petsArray.map(k => Object.keys(k).forEach(a => petcareTypes[a] = k[a]))
    res.send(petcareTypes);
}));


router.get('/count', catchAsync(async(req, res) => {
    const query = [
        {$count: "sum"}
    ]
    const totalPets = await Petcare.aggregate(query);
    res.send(totalPets)
}));
//admin filters
//type
// admin edit Petcare form
router.get('/edit', (req, res) => {
    res.render('admin/petcareUpdate');
});
//prefilling the edit form
router.get('/:id/edit', catchAsync(async (req, res) => {
    const petcare = await Petcare.findById(req.params.id);
    res.render('admin/petcareUpdate', { petcare });
}));
//submitting petcare edit form
router.put('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Petcare.findByIdAndUpdate(id, { ...req.body.petcare });
    res.redirect(`/petcare/admin/petcare`);
}));
// admin delete by id...
router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Petcare.findByIdAndDelete(id);
    res.redirect('/petcare/admin/petcare');
}));

module.exports = router;