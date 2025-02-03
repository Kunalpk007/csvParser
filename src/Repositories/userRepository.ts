import { Service } from "typedi";
import database from "../config/database";
import { Person } from "../interfaces/Users.interface";
import { User } from "../models/User";

@Service()
export class UserRepository{
    async storeCsvUserData(userData: any[]): Promise<any>{
        const batchSize = 5000;
        try{

            for (let i = 0; i < userData.length; i += batchSize) {
                console.log("Inserting",i);
                const batch = userData.slice(i, Math.min(i + batchSize, userData.length));
        
                // Method 1: Using Repository.insert (most efficient for bulk inserts)
                const userRepo =  database.getRepository(User);
                const newUser = new User();
                newUser.jsonData = userData[i];
                await userRepo.insert(batch);
            }        
            console.log(`Successfully inserted ${userData.length} records.`);
            // Set other properties if needed (name, email, etc.)
            return true;
        }
        catch(error:any){
            throw new Error(error)
        }
    }
}