import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';

import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
        private readonly jwt: JwtService
    ) {}

    async create(registerUser: RegisterUserDto) {
        try {
            
            const { password, ...userData } = registerUser;

            const user = this.repository.create({
                ...userData,
                password: bcrypt.hashSync(password, 10)
            });

            await this.repository.save(user);
            delete user.password;

            return {
                ...user,
                token: this.getJwtToken({id: user.id})
            }

        } catch (error) {
            console.error(error)
            // this.handleError(err);
        }
    }

    async login(loginDto: LoginDto) {

        try {
            let { user } = loginDto;
            const { password } = loginDto;
    
            user = user.toLowerCase().trim();
    
            const newUser = await this.repository.findOne({
                where: [{username: user}, {email: user}],
                select: {email: true, username: true, password: true, id: true}
            });
    
            if (!user)
                throw new UnauthorizedException('Not valid credentials (email)');
                
            if (!bcrypt.compareSync(password, newUser.password))
                throw new UnauthorizedException('Not valid credentials (password)');

            delete newUser.password;

            return {
                ...newUser,
                token: this.getJwtToken({id: newUser.id})
            };
        } catch (error) {
            console.error(error)
        }
    }


    private getJwtToken( payload: JwtPayload ) {
        const token = this.jwt.sign(payload);
        return token;
    }

}
