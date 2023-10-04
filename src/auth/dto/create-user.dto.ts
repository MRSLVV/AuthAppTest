import { IsEmail,MinLength, IsString} from "class-validator";

export class CreateUserDto{
     
    @IsEmail()
    email: string;

    @IsString()
    name: string;
    
    @IsString()
    role: string;

    @MinLength(6)
    password: string; 
}