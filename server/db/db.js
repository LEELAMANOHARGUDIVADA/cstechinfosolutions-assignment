import mongoose from "mongoose"

const connectDB = (uri) => {
    mongoose.connect(uri).then(() => {
        console.log("MONGODB CONNECTED");
    }).catch(error => {
        console.log("Error Connecting MONGODB: ",error);
    }) 
}

export default connectDB;