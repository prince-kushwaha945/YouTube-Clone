import express from "express"
import cors from 'cors'
import mongoose from "mongoose"




const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/vclogin&signUp");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    verifytoken: {
        type: String,
    }
})

const User = new mongoose.model("User", userSchema)



app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Check if a user with the same email already exists
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                if (password === user.password) {
                    res.send({ message: "Login Successful", user: user });
                } else {
                    res.send({ message: "Password didn't match" });
                }
            } else {
                res.send({ message: "User not registered" });
            }
        })
        .catch(err => {
            // Handle any errors that may occur during the query
            res.status(500).send({ message: "An error occurred" });
        });
});


app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            res.send({ message: "User already registerd" })
        } else {
            // Create a new user instance
            const newUser = new User({
                name,
                email,
                password
            });

            // Save the new user to the database
            await newUser.save();

            res.status(201).json({ message: "Successfully registered. Please login now." });
        }
    } catch (error) {
        res.status(500).json({ message: "Registration failed", error: error.message });
    }
});

app.listen(9002, () => {
    console.log("BE started at port 9002")
})




