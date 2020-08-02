const express = require('express')
const bodyParser = require('body-parser')
const { User, Blog, Tag } = require('./sequelize')

const app = express()
app.use(bodyParser.json())

// API ENDPOINTS

const port = 3000
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})


app.post('/api/users', (req, res) => {
    User.create(req.body)
        .then(user => res.json(user))
})


app.post('/api/blogs', async(req, res) => {
    Blog.create(req.body)
    .then(blog => res.json(blog))
})


app.get('/api/blogs/:userId?', (req, res) => {
    let query;
    if(req.params.userId) {
        query = Blog.findAll({ include: [
            { model: User, where: { id: req.params.userId } },
            { model: Tag }
        ]})
    } else {
        query = Blog.findAll({ include: [Tag, User]})
    }
    return query.then(blogs => res.json(blogs))
})


// get all users
app.get('/api/users', (req, res) => {
    User.findAll().then(users => res.json(users))
})