const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");
const ExpressError = require("./ExpressError.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main().then(() => {
    console.log("connection successfull!");
}).catch(err => {
    console.log(err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
}

// Index Route
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    console.log(chats);
    res.render("index.ejs", { chats });
});

// New Route
app.get("/chats/new", (req, res) => {
    // throw new ExpressError(404, "page not found!");ss
    res.render("new.ejs");
});

// Create Route
app.post("/chats", async (req, res) => {
    try{
        let { from, to, msg } = req.body;
        let newChat = new Chat({
            from: from,
            to: to,
            msg: msg,
            created_at: new Date(),
            updated_at: new Date(),
        });

        await newChat.save();
        res.redirect("/chats");
    } catch(err) {
        next(err);
    }
});

function asyncwrap(fn) {
    return function(req, res, next) {
        fn(req, res, next).catch(err => {
            next(err);
        });
    };
};

// NEW - Show Route - Async Error Handling
app.get("/chats/:id", asyncwrap (async (req, res, next) => {
        let { id } = req.params;
        let chat = await Chat.findById(id);
        if(!chat) {
            next(new ExpressError(404, "Chat Not Found!"));
        }
        res.render("edit.ejs", { chat });
}));

// Edit Route
app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat });
});

// Update Route
app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let {msg: newMsg} = req.body;
    console.log(newMsg);
    let updatedChat = await Chat.findByIdAndUpdate(id, {msg: newMsg}, {runValidators: true, new:true});

    console.log(updatedChat);
    res.redirect("/chats");
});

// Delete Route
app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);

    console.log(deletedChat);
    res.redirect("/chats");
})

app.get("/", (req, res) => {
    res.send("root is working!");
});

// creating a function to handle cast-error
const handleCastErr = (err) => {
    console.log("This was a Cast Error!, Please follow the rules.");
    console.log(err.message);
    return err;
}

// middleware to print the name of the error
app.use((err, req, res, next) => {
    console.log("ERROR: ", err.name);
    if(err.name === "CastError") {
        err = handleCastErr();
    }
    next(err);
})

// Error Handling Middleware
app.use( (err, req, res, next) => {
    const {status=500, message="some error occured"} = err;
    res.status(status).send(message);
});

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});

