import mongoose from "mongoose";

mongoose.set('strictQuery', false)
//agr extra parameter pass kiya to error na de to 
//matlab agar info exist na ho to 

const connectionToDB = async () => {
    try {
        const { connection } = await mongoose.connect(
            process.env.MONGO_URL
        );
        if (connection) {
            console.log("connected To DataBase")
        }
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

export default connectionToDB