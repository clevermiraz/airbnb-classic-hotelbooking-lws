import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        default: "Anonymous",
        min: 2,
        max: 100,
    },
    email: {
        type: String,
        unique: true, // Ensures email is unique
        required: true, // Makes email required
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
        min: 2,
        max: 100,
    },
    password: {
        type: String,
        min: 6,
        max: 100,
    },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
