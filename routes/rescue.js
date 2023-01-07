const express = require('express');
const router = express.Router();
const Rescue = require('../models/rescue');
const catchAsync = require('../utilities/catchAsync');
const ExpressError = require('../utilities/ExpressError');
const flatten = require('../utilities/flatten');

// Admin views all
router.get('/', catchAsync(async (req, res) => {
    const rescue = await Rescue.find({});
    res.send(rescue);
}));

// admin edit Rescue form
router.get('/edit', (req, res) => {
    res.render('admin/rescueUpdate');
});

router.get('/petType', catchAsync(async (req, res) => {
    const queryCats = [
        {$match:{"petType":"cat"}},
        {$count: "cats"},
    ]
    const cats = await Rescue.aggregate(queryCats);
    const queryDogs = [
        {$match:{"petType":"dog"}},
        {$count: "dogs"}
    ]
    const dogs = await Rescue.aggregate(queryDogs);
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
    const totalPets = await Rescue.aggregate(query);
    res.send(totalPets)
}));

//prefilling the edit form
router.get('/:id/edit', catchAsync(async (req, res) => {
    const rescue = await Rescue.findById(req.params.id);
    res.render('admin/rescueUpdate', { rescue });
}));
//submitting rescue edit form
router.put('/:id' , catchAsync(async (req, res) => {
    const { id } = req.params;
    const rescue = await Rescue.findByIdAndUpdate(id, { ...req.body.rescue });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    rescue.images.push(...imgs);
    await rescue.save();
    req.flash('success', 'Successfully updated rescue!');
    res.redirect(`/rescue/admin/rescue`);
}));
// admin delete by id...
router.delete('/:id',catchAsync(async (req, res) => {
    const { id } = req.params;
    await Rescue.findByIdAndDelete(id);
    res.redirect('/rescue/admin/rescue');
}));
module.exports = router;
