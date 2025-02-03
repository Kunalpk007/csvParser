import { Request, response, Response } from 'express';

import { User } from '../models/User';
// import database  from '/database';
import database  from "../config/database";
import { UserDataService } from '../services/UserDataService';
import { Controller, Get, JsonController, Post, Req, Res } from 'routing-controllers';
import { Service } from 'typedi';

@Controller('/csvparser')
@Service()
export class UserController{

constructor(
     private readonly userDataService: UserDataService
) {}
    
@Post('/')
public async createUser(@Req() req: Request,@Res() res: Response): Promise<any>  {
    try{

        const result =await this.userDataService.parseCsvData();
        return res.status(201).send({message:`User Data created for ${result.length} Users`});
    }catch(error: any){
        console.log('Error occured :', error)
        return res.status(400).json({ message: error.message });
    }
}

@Get('/test')
public async test(@Req() req: Request,@Res() res: Response): Promise<any> {
    return this.userDataService.test();
// return res.status(200).send("This is test");
}


@Get('/')
public async getAllUsers(@Req() req: Request,@Res() res: Response): Promise<any> {
    try {
        const userRepo = database.getRepository(User);
        const users = await userRepo.find();
        return res.status(200).send(users);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
}
}

function Inject(): (target: typeof UserController, propertyKey: undefined, parameterIndex: 0) => void {
    throw new Error('Function not implemented.');
}
