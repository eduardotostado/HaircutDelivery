const   express = require("express"),
        User = require("../../models/User"),
        Reservation = require("../../models/Reservation")
        router = express.Router(),
        bcrypt = require("bcryptjs"),
        jwt = require("jsonwebtoken"),
        isAuthenticated = require('../../policies/isAuthenticated');


function jwtSignUser (user){
    const ONE_DAY = 60 * 60 * 24;
    return jwt.sign(user, 'secret-text', {
        expiresIn: ONE_DAY
    })
}

// All of the user routes are defined below:
// ------------------------------------------------------
// Get all of the users:
router.get('/user', async (req, res) => {
        try{
            const users = await User.find({});
            res.send(users);
        } catch (error) {
            res.status(500).send(error);
        }
});
    
// Create a user:
router.post('/user',  async (req, res) => {
    const user = new User(req.body);

    // Hashing password
    await bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            try{
                 user.save()
                res.status(201).send();
            } catch (error) {
                res.status(400).send(error);
            }
        });
    });

   
    
});

// Get a user by id:
router.get('/user/:id', async (req, res) => {
    const _id = req.params.id;
    try{
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send();
        } else {
            res.status(200).send({
                user: user.toJSON()
            });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a user by id:
router.patch('/user/update/:id', async (req, res) => {
    const updateProperties = Object.keys(req.body);
    const allowedToUpdate = ["name", "email", "address", "phone", "isStylist"];
    const checked = updateProperties.every((property) => {
        return allowedToUpdate.includes(property);
    });
    if(!checked){
        return res.status(400).send();
    }
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
        });
        if(!user){
            return res.status(404).send();
        }
            res.status(200).send();
        } catch (error) {
            res.status(500).send(error);
        }
    });

router.delete('/user/:id', async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).send();
        }
        res.status(200).send();
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get all stylists: 
router.get('/stylists', async (req, res) => {
    try{
        const users = await User.find({
            isStylist: true
        });
        res.status(200).send({
            users: users
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// User routes end here.
// ---------------------------------------------------------

// Authentication Routes:
// ------------------------------------------------------
router.post('/login', async (req, res) => {
    const   email = req.body.email,
            password = req.body.password;
    try{
       const user = await User.findOne({email: email})
     
       if (!user) {
           res.status(403).send({
               error: 'The login information was incorrect'
           })
       }
        
        bcrypt.compare(password, user.password, function(err, valid) {
            if(valid){
                res.status(200).send({
                user: user.toJSON(),
                token: jwtSignUser(user.toJSON())
                });
            } else {
                res.status(403).send({
                    error: "The login information was incorrect"
                })
            }
        })
    } catch (error) {
        res.status(500).send(error);
    }
});

// Authentication routes end here.
// ---------------------------------------------------------

// Reservation Routes:
// ------------------------------------------------------

// Create a Reservation:
router.post('/reservation',  async (req, res) => {
    const reservation = new Reservation(req.body);

    try{
        reservation.save()
        res.status(201).send();
    } catch (error) {
        res.status(400).send(error);
    }
});

// Update a Reservation by ID:
router.patch('/reservation/update/:id', async (req, res) => {
    const updateProperties = Object.keys(req.body);
    const allowedToUpdate = ["date", "time"];
    const checked = updateProperties.every((property) => {
        return allowedToUpdate.includes(property);
    });
    if(!checked){
        return res.status(400).send();
    }
    try{
        const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
        });
        if(!reservation){
            return res.status(404).send();
        }
            res.status(200).send();
        } catch (error) {
            res.status(500).send(error);
        }
    });

// Get Reservation by ID:
router.get('/reservation/:id', async (req, res) => {
    const _id = req.params.id;
    try{
        const reservation = await Reservation.findById(_id);
        if (!reservation) {
            return res.status(404).send();
        } else {
            res.status(200).send(reservation);
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get all Reservations
router.post('/reservations', async (req, res) => {
    try{
       
        const reservations = await Reservation.find({
            "stylist._id": req.body._id
        });

        const tempReservations = await Reservation.find({
            "user._id": req.body._id
        });


        for(var item in tempReservations){
        reservations.push(tempReservations[item]);
        }
            res.status(200).send(reservations);
        
        } catch (error) {
            res.status(500).send(error);
        }
});

// Delete reservation
router.delete('/reservation/:id', async (req, res) => {
    try{
        await Reservation.findByIdAndDelete(req.params.id);
        
        res.status(200).send();
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;