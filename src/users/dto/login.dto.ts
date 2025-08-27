import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({
        example: 'test@test.com / username',
        description: 'User mail or username',
        nullable: false
    })
    user: string;
}