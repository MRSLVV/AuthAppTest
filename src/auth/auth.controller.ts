import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';

import { CreateUserDto, LoginDto, RegisterUserDto } from './dto/index';
@Controller('auth')
export class AuthController {
 
 
  constructor(private readonly authService: AuthService) {}

 @Post()
 create(@Body() createUserDto: CreateUserDto) {
  console.log(createUserDto);
  return this.authService.create(createUserDto);
 }


 @Post('/login')
 login(@Body() loginDto: LoginDto){ 

 }


 @Post('/register')
 Register(@Body() loginDto: LoginDto){ 

 }


  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
