const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @router GET api/users
// @desc   Register user
// @access Public

router.post('/',[

    check('name','Name is required').not().isEmpty(),
    check('email', 'please include a valid email').isEmail(),
    check('password','Please enter a password with 6 or more character').isLength({min: 6})
], 
async (req, res)=> {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    const {name, email, password}  = req.body;

    try {

        // see if user exists we dont want users to be repeated

        let user = await User.findOne({ email});

        if(user){
            res.status(400).json({ error: [ {msg: 'User already exists'}]});
        }
        // get users garvatar

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        user = new User({
            name,
            email,
            avatar,
            password
        });
        // encrypt passwordd

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();



        // return json web token

        const webtoken;



    res.send('User Registered');

    }catch(err){

        console.error(err.message);
        re.status(500).send('Server Error');

    }

    
    
    
}
);


module.exports = router;