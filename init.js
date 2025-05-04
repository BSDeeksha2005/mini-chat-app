const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main().then(() => {
    console.log("connection successfull!");
}).catch(err => {
    console.log(err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
}

let allChats = [
    {
        from: "user1",
        to: "friend1",
        msg: "Hey, can you send me the details for exam 1?",
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        from: "user2",
        to: "friend2",
        msg: "Hey, can you send me the details for exam 2?",
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        from: "user3",
        to: "friend3",
        msg: "Hey, can you send me the details for exam 3?",
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        from: "user4",
        to: "friend4",
        msg: "Hey, can you send me the details for exam 4?",
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        from: "user5",
        to: "friend5",
        msg: "Hey, can you send me the details for exam 5?",
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        from: "user6",
        to: "friend6",
        msg: "Hey, can you send me the details for exam 6?",
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        from: "user7",
        to: "friend7",
        msg: "Hey, can you send me the details for exam 7?",
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        from: "user8",
        to: "friend8",
        msg: "Hey, can you send me the details for exam 8?",
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        from: "user9",
        to: "friend9",
        msg: "Hey, can you send me the details for exam 9?",
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        from: "user10",
        to: "friend10",
        msg: "Hey, can you send me the details for exam 10?",
        created_at: new Date(),
        updated_at: new Date()
    }
];


Chat.insertMany(allChats);