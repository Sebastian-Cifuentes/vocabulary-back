import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class LoginDto {
    @ApiProperty({
        example: 'test@test.com / username',
        description: 'User mail or username',
        nullable: false
    })
    user: string;

    @ApiProperty({
        example: '123456',
        description: 'User password',
        nullable: false
    })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;
}