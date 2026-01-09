import { Body, Controller, Post } from '@nestjs/common';
import { WordChatDto } from './dto/word-chat.dto';
import { WordChatService } from './word-chat.service';
import { Auth } from 'src/users/decorators/auth.decorator';

@Controller('word-chat')
export class WordChatController {

    constructor( private readonly wordChatService: WordChatService ) {}

    @Post()
    @Auth()
    async sendMessage(@Body() body: WordChatDto, id: string) {
        return this.wordChatService.sendMessage(body.message, id);
    }

}
