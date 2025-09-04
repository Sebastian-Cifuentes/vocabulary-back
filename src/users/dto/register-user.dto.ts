import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({
    example: 'John cruy',
    description: 'User name',
    nullable: false,
  })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({
    example: 'jhoncruy123',
    description: 'Username',
    nullable: false,
  })
  @IsString()
  @MinLength(1)
  username: string;

  @ApiProperty({
    example: 'john@cruy.com',
    description: 'User mail',
    nullable: false,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'User password',
    nullable: false,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;
}
