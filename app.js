const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render("index");
})

app.get('/read', async (req, res) => {
    let allusers = await userModel.find();

    // sending all users to the read.ejs page
    res.render("read", {users: allusers});
})

app.post("/create", async (req, res) => {
    const {name, email, dp} = req.body;

    let user = await userModel.create({
        name,
        email,
        dp
    })
    res.redirect('/read');
    // res.send(user);
})

app.get("/delete/:id", async (req, res) => {
    let deluser = await userModel.findOneAndDelete({_id: req.params.id});
    res.redirect('/read');

    // res.send(req.params.id);
})

app.get('/edit/:id', async (req, res) => {

    let finduser = await userModel.findOne({_id: req.params.id});
    // res.send(finduser);

    res.render("edit", {user: finduser});
})

app.post('/edit/:id', async (req, res) => {
    let {newname, newemail, newdp} = req.body;

    let updateduser = await userModel.findOneAndUpdate({_id: req.params.id},{
        name: newname,
        email: newemail,
        dp: newdp
    },{
        new: true
    });

    res.redirect('/read');
})
app.listen(3000);