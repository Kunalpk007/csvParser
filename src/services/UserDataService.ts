import { Person } from "../interfaces/Users.interface";
import fs from 'fs/promises';
import { UserRepository } from "../Repositories/userRepository";
import { Inject, Service } from "typedi";
import { User } from "../models/User";
import database from "../config/database";

@Service()
export class UserDataService {

    constructor(private readonly userRepository: UserRepository) {}

    test(): string[] {
        return ["Alice", "Bob", "Charlie"];
      }
    public async parseCsvData() : Promise<any>{
        try{
           
            // console.log('creating user');
            console.log('Fetching user Data');
            const csvFilePath = './userData/Users.csv';
            const data = await fs.readFile(csvFilePath, { encoding: 'utf8' });
            console.log('csvFilePath',data);
            const lines = data.split('\n');
            const headers = lines[0].split(',');
            // console.log('headers',headers);
          
        // const results: Person[] = [];

        const headerMap: { [key: string]: (row: Person, value: string) => void } = {
            'name.firstName': (row, value) => row.name.firstName = value,
            'name.lastName': (row, value) => row.name.lastName = value,
            'age': (row, value) => row.age = Number(value),
            'address.line1': (row, value) => row.address.line1 = value,
            'address.line2': (row, value) => row.address.line2 = value,
            'address.city': (row, value) => row.address.city = value,
            'address.state': (row, value) => row.address.state = value,
            'gender': (row, value) => row.gender = value,
        };
        const results: Person[] = lines.slice(1).reduce((acc: Person[], line) => {
            if (line.trim() === "") return acc; // Skip empty lines
            const values = line.split(',');
            // console.log('values', values);

            let row: Person = {
                name: {
                    firstName: '',
                    lastName: ''
                },
                age: 0,
                address: {
                    line1: '',
                    line2: '',
                    city: '',
                    state: ''
                },
                gender: ''
            };
            headers.forEach((header, index) => {
                const trimmedHeader = header.trim(); // Remove leading/trailing spaces
                const value = values[index] ? values[index].trim() : ""; // Handle missing values
                // console.log('header:', trimmedHeader, '-===== value:', value);

                if (headerMap[trimmedHeader]) {
                    headerMap[trimmedHeader](row, value);
                }
            });

            acc.push(row);
            return acc;
        }, []);
        // for (let i = 1; i < lines.length; i++) { // Start from the second line (data)
        //   const line = lines[i];
        //   if (line.trim() === "") continue; // Skip empty lines
        //   const values = line.split(',');
        //   console.log('values',values);
        //   let row: Person = {
        //       name: {
        //           firstName: '',
        //           lastName: ''
        //       },
        //       age: 0,
        //       address: {
        //           line1: '',
        //           line2: '',
        //           city: '',
        //           state: ''
        //       },
        //       gender: ''
        //   };
    
        //   for (let j = 0; j < headers.length; j++) {
        //     // const header : number = Number(headers[j].trim()); // Remove leading/trailing spaces
        //     // const value = values[j] ? values[j].trim() : ""; // Handle missing values
        //     // row[header] = value;
        //     const header = headers[j].trim(); // Remove leading/trailing spaces
            
        //     // console.log('header',header);
        //     const value = values[j] ? values[j].trim() : ""; // Handle missing values
        //     console.log('header:',header,'-===== value:',value);
    
        //     if (headerMap[header]) {
        //         headerMap[header](row, value);
        //     }   
    
        //   }
        //   results.push(row);
        // }
        // console.log('results',results);
    
            // const userRepo = database.getRepository(User);
            // // const user = new User();
            // const newUser = new User();
            // newUser.jsonData = req.body;
    
            // const savedUser = await userRepo.save(newUser);
            // await this.userRepository.storeCsvUserData(results);
            const batchSize = 5000;

            for (let i = 0; i < results.length; i += batchSize) {
                console.log("Inserting",i);
                const batch = results.slice(i, Math.min(i + batchSize, results.length));
        
                // Method 1: Using Repository.insert (most efficient for bulk inserts)
                const userRepo =  database.getRepository(User);
                // const newUser = new User();
                // newUser.jsonData = results[i];
                const userBatch = batch.map(data => {
                    const newUser = new User();
                    Object.assign(newUser, data);
                    return newUser;
                });
            
                await userRepo.insert(userBatch);
            }        
            console.log(`Successfully inserted ${results.length} records.`);
            return results;
        } catch (error: any) {
            console.log('error',error);
            throw new Error(error)
            }
        
    }
}