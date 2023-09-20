const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require('./models/Users')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://varun1452:qvClcGqSkmxBpWG4@cluster0.wzehqby.mongodb.net/crud_home')

app.post('/createUser', async (req, res) => {
    try {
        const users = await UserModel.create(req.body);
        res.json(users);
    } catch {
        res.json(err);
    }
});

app.get('/',(req,res) => {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get('/getUser/:id', (req,res) => {
    const id = req.params.id;
    UserModel.findById(id)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

    app.put('/updateUser/:id', (req,res) => {
        const id = req.params.id;
        UserModel.findByIdAndUpdate({_id: id},{
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        })
        .then(users => res.json(users))
        .catch(err => res.json(err))
    })

app.listen(3003, () => {
    console.log('server is running on port 3003')
})