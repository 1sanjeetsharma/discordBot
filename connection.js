import mongoose from 'mongoose';
import 'dotenv/config';
const MONGO_URL=process.env.MONGO_URL;
export async function connectToDatabase(){
    if(!MONGO_URL){
        console.error("MONGO_URL is not defined in environment variables");
     
        return;
    }
    console.log("Connecting to MongoDB...", MONGO_URL);
  
      return mongoose.connect(MONGO_URL).then(() => {
          console.log("Connected to MongoDB");
      }
        ).catch((error) => {
            console.error("Error connecting to MongoDB:", error);
        });

   
}
export default connectToDatabase;