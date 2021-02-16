const express = require('express');
const router = express.Router();

// logic for module
router.get('/', (req, res) => {
    res.render('index',{title: 'My Express App', message: 'Hello World'});
});

//export this route
module.exports = router;