const express = require('express') ; 
const { sendEmail } = require('../controllers/mail');
const router = new express.Router() ;

router.post('/sendEmail' ,sendEmail) ; 

module.exports = router ; 