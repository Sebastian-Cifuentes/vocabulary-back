import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
        // private readonly jwt: JwtService
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
                // token: this.getJwtToken({id: user.id})
            }

        } catch (error) {
            // this.handleError(err);
        }
    }

}
