var Userdb = require('../model/model');
const { use } = require('../routes/router');

// create and save new user
exports.create = (req, res) => {
    // validate the request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty"
        })
        return;
    }

    // new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status,
    })

    // save user in db
    user.save(user).then(data => {
        // res.send(data);
        res.redirect('/add-user');
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occured while creating user!'
        })
    })
}

// reqtrive and reqturn all users / retireve and return a single user
exports.find = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;
        console.log(id);
        Userdb.findById(id).then(data => {
            if (!data) {
                res.status(404).send({
                    message: `NOt found user with ${id}`
                })
            } else {
                res.send(data);
            }
        }).catch(err => {
            res.status(500).send({
                message: `Error retrieving user with ${id}`
            })
        })
    } else {
        Userdb.find().then(user => {
            res.send(user)
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error occured while retriveing user info!"
            })
        })
    }
}

// Update a new identified user by id
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        })
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update user with ${id}, may be user not found!`
                })
            } else {
                res.send(data);
            }
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error occured in updating user information!"
            })
        })
}

// Delete a user with specified user id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Can not delete with ${id}, may be id nod found!`
            })
        } else {
            res.send({
                message: "User is deleted successfully!"
            })
        }
    }).catch(err => {
        res.status(500), send({
            message: `Could not delete the user with id: ${id}`
        })
    })
}