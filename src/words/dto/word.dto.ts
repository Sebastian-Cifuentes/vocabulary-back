import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength } from "class-validator";

export class WordDto {

    @ApiProperty({
        example: 'word',
        description: 'Word to create examples',
        nullable: false
    })
    @IsString()
    @MaxLength(20)
    name: string;

}