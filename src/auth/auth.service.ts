import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './dto/loginUserDto';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  
  async register(createUserDto:CreateUserDto){
    const user = await this.userService.findOneByEmail(createUserDto.email); 
    if(user) {
      throw new BadRequestException('User already exists');
    }
    
    return await this.userService.create({...createUserDto, password: await bcryptjs.hashSync(createUserDto.password, 10)});
    
  }
  
  async login(loginUserDto:LoginUserDto){
    const user : CreateUserDto | undefined = await this.userService.findOneByEmail(loginUserDto.email); 
    if(!user) {
      throw new NotFoundException('User does not exists');
    }
    const passwordIsValid = await bcryptjs.compareSync(loginUserDto.password, user.password);
    if(!passwordIsValid){
      throw new BadRequestException('Invalid password');
    }
    const payload = { email: user.email };
    const token = await this.jwtService.signAsync(payload);
    return { token, email: user.email};
  }
}
