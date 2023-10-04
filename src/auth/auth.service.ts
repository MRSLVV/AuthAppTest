import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { UnauthorizedException} from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload';
import { LoginResponse } from './interfaces/login-response';
import { RegisterUserDto } from './dto';


@Injectable()
export class AuthService {
  
  constructor(
    @InjectModel(User.name) 
    private userModel: Model<User>,
    private jwtService: JwtService
  ){

  }
  async create(createUserDto: CreateUserDto): Promise<User> {
 
   try { 

    const { password, ...userData}  = createUserDto;
      const newUser = new this.userModel( {
        password: bcryptjs.hashSync(password, 10),
        ...userData
      });
     
      await  newUser.save();
      const{ password: _, ...user} = newUser.toJSON();
    return 
   
  
  } catch(error){
    console.log(error.code)
   }
  }
  

  async register( registerUserDto : RegisterUserDto ) : Promise<LoginResponse>{
     const user = await this.create( registerUserDto ); 
     return {
      user: user, 
      token: ''
     }
  }

  async login(loginDto: LoginDto ) : Promise<LoginResponse>{

    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email })
    if(!user) {
      throw new UnauthorizedException('Not Valid credentials - email');

    }
    if(!bcryptjs.compareSync(password, user.password)) {
      throw new UnauthorizedException('Not Valid credentials - password');

    }

    const {password:_, ...rest }= user.toJSON();

    return{
      user: rest,
      token: this.getJWToken({ id: user.id }),
    }

    
  }


  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }


  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  getJWToken(payload: JwtPayload)
  {

    const token = this.jwtService.sign(payload);
    return token;

  }

}
