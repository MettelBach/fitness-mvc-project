// routes/trainings.js
const express = require('express')
const router = express.Router()
const Training = require('../models/training')

router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const trainings = await Training.find(searchOptions)
        res.render('trainings/index', {
            trainings: trainings,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})

router.get('/new', (req, res) => {
    res.render('trainings/new', { training: new Training() })
})

router.post('/', async (req, res) => {
    const training = new Training({
        name: req.body.name,
        type: req.body.type,
        duration: req.body.duration,
        repetitions: req.body.repetitions
    })
    try {
        const newTraining = await training.save()
        res.redirect('/trainings')
    } catch {
        res.render('trainings/new', {
            training: training,
            errorMessage: 'Error creating Training'
        })
    }
})

router.get('/:id/edit', async (req, res) => {
    try {
        const training = await Training.findById(req.params.id)
        res.render('trainings/edit', { training: training })
    } catch {
        res.redirect('/trainings')
    }
})

router.put('/:id', async (req, res) => {
    let training
    try {
        training = await Training.findById(req.params.id)
        training.name = req.body.name
        training.type = req.body.type
        training.duration = req.body.duration
        training.repetitions = req.body.repetitions
        await training.save()
        res.redirect(`/trainings/${training.id}`)
    } catch {
        if (training == null) {
            res.redirect('/trainings')
        } else {
            res.render('trainings/edit', {
                training: training,
                errorMessage: 'Error updating Training'
            })
        }
    }
})

router.delete('/:id', async (req, res) => {
    let training
    try {
        training = await Training.findById(req.params.id)
        await training.remove()
        res.redirect('/trainings')
    } catch {
        if (training == null) {
            res.redirect('/trainings')
        } else {
            res.redirect(`/trainings/${training.id}`)
        }
    }
})

module.exports = router