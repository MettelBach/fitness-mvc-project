const Training = require('../models/training');

exports.training_list = async (req, res) => {
    try {
        let searchOptions = {};
        if (req.query.name != null && req.query.name !== '') {
            searchOptions.name = new RegExp(req.query.name, 'i');
        }
        const trainings = await Training.find(searchOptions);
        res.render('trainings/index', {
            trainings: trainings,
            searchOptions: req.query
        });
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
};

exports.training_create_get = (req, res) => {
    res.render('trainings/new', { training: new Training() });
};

exports.training_create_post = async (req, res) => {
    const training = new Training({
        name: req.body.name,
        type: req.body.type,
        duration: req.body.duration,
        repetitions: req.body.repetitions
    });
    try {
        await training.save();
        res.redirect('/trainings');
    } catch (err) {
        console.error(err);
        res.render('trainings/new', {
            training: training,
            errorMessage: 'Error creating Training'
        });
    }
};

exports.training_update_get = async (req, res) => {
    try {
        const training = await Training.findById(req.params.id);
        res.render('trainings/edit', { training: training });
    } catch (err) {
        console.error(err);
        res.redirect('/trainings');
    }
};

exports.training_update_put = async (req, res) => {
    try {
        await Training.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            type: req.body.type,
            duration: req.body.duration,
            repetitions: req.body.repetitions
        });
        res.redirect('/trainings');
    } catch (err) {
        console.error(err);
        res.redirect('/trainings');
    }
};

exports.training_delete = async (req, res) => {
    try {
        await Training.findByIdAndRemove(req.params.id);
        res.redirect('/trainings');
    } catch (err) {
        console.error(err);
        res.redirect('/trainings');
    }
};
