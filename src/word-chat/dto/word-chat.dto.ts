import { IsArray, IsIn, IsString } from "class-validator";

export class WordChatMessageDto {
    @IsIn(['user', 'assistant'])
    role: 'user' | 'assistant';

    @IsString()
    content: string;
}

export class WordChatDto {

    message: WordChatMessageDto

}