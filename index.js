// Require Express and Path
const express = require('express');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');
// Parse url for data
app.use(express.urlencoded({ extended: true }));
//Parse JSON data
app.use(express.json());
//Let use access views through absolute path
app.set('views', path.join(__dirname, 'views'));
//Use EJS
app.set('view engine', 'ejs');
//Use method override
app.use(methodOverride('_method'));

// This is a fake database for this example
let comments = [
    {
        id: uuid(), 
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuid(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
]

//View all comments index route
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
})

// This is the get route to render the form for a new comments
app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})

//This is the route for getting the form data when it is submitted so we can create a new comment 
app.post('/comments', (req, res) => {
    const { username, comment} = req.body;
    comments.push({ username, comment, id: uuid() });
    res.redirect('/comments');
})

//This is a show rout to get one particular comment
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment });
})

// Below is the code to edit/update an existing comment 
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment });
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments');
})

// Below is the code to delete a comment 

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})


app.listen(3000, () => {
    console.log('Server started on port 3000');
})

// Comments mini example below

// GET /comments - list all comments -- Index route
// POST /comments - create a new comment -- Create route
// GET /comments/:id - get one particular comment -- Show route
// PATCH /comment/:id - update one particluar comment -- Update route
// DELETE /comment/:id - delete one particluar comment -- Destroy route

// app.get('/tacos', (req, res) => {
    //     res.send('Get /tacos response!')
    // })
    
    // app.post('/tacos', (req, res) => {
    //     const { meat, qty } = req.body;
    //     res.send(`Here are the ${qty} ${meat} tacos you requested!`)
    // })


