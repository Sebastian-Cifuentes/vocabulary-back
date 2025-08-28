import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {

    constructor(
        private readonly userService: UsersService
    ) {}

    @Post('create')
    create(@Body() registerUserDto: RegisterUserDto) {
        return this.userService.create(registerUserDto);
    }

}
