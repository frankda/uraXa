const express = require('express'); 
const router = express.Router();
const _ = require('lodash');

const sessionService = require('../services/sessionService');

// routs
router.post('/signup', async (req, res) => {
    const user = req.body;

    try {
        const isFound = await sessionService.findUser(user.email);
                  
        if(isFound) {
            res.status(409).send({ error: "User with this email already exist. Please Login." });
        } else {
            const userRecord = await sessionService.signup(user);
                        
            res.status(201).json(userRecord);                 
        }
    } catch(err) {
        res.status(500).send({ error: err.message })
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
   
    try {
        const userRecord = await sessionService.login(email, password);
        console.log(userRecord);

        if(!_.isEmpty(userRecord.user)) {
            res.status(200).json(userRecord);
        } else {
            res.status(404).send({ error: "Email/Password are not correct." })
        }
        
    } catch(err) {
        res.status(500).send({ error: err.message })
    }
       

    // let user

    // User.findByEmail(email)
    //     .then(userRecord => {
    //         if(userRecord.rows.length > 0) {
    //             console.log(userRecord);
                
    //             user = userRecord.rows[0];                 
    //             return sessionUtils.checkPassword(password, user.password_digest);
    //         } else {
    //             return res.status(404).send({error: "User with this email does not exist."})
    //         }
    //     })
    //     .then(res => {
    //         if(res) {
    //             return sessionUtils.createToken();
    //         } else {
    //             return res.status(404).send({error: "Password is not correct."})   
    //         }
    //     })
    //     .then(token => User.updateUserToken(user.email, token))
    //     .then(updatedUserRecord => {
    //         delete user.password_digest;
    //         return res.status(200).json({ user: updatedUserRecord.rows[0] });
    //     })
    //     .catch(err => res.status(500).send({ error: err.message }));
});



module.exports = router;