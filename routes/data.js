const express = require('express');
const model = require('../models/data');

let router = express.Router();

router.get('/', (request, response) =>
{
    response.render('index',
        {
            unlockOthers: true,
            phones: model.getPhones()
        });
});

router.get('/add', (request, response) =>
{
    response.render('add',
        {
            unlockOthers: false,
            phones: model.getPhones(),
            helpers: {goBack: () => 'window.location.href = \'/\''}
        });
});

router.get('/update', (request, response) =>
{
    response.render('update',
        {
            unlockOthers: false,
            phones: model.getPhones(),
            targetPhone: model.getPhoneById(request.query.id),
            helpers: {goBack: () => 'window.location.href = \'/\''}
        });
});

router.post('/add', (request, response) =>
{
    response.json(model.addPhone(request.body));
});

router.post('/update', (request, response) =>
{
    response.json(model.updatePhone(request.body));
});

router.post('/delete', (request, response) =>
{
    response.json(model.deletePhone(request.body));
});

module.exports = router;
