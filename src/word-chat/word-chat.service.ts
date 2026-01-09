import { Injectable, NotFoundException } from '@nestjs/common';
import { WordChatMessageDto } from './dto/word-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WordChat } from './entities/word-chat.entity';
import { WordChatMessageService } from './word-chat-message.service';
import { OpenAiService } from './open-ai.service';
import { WordChatMessage } from './entities/word-chat-message.entity';

@Injectable()
export class WordChatService {

    constructor(
        @InjectRepository(WordChat)
        private readonly wordChatRepository: Repository<WordChat>,
        private messageService: WordChatMessageService,
        private openAiService: OpenAiService
    ) {}

    async sendMessage(message: WordChatMessageDto, chat_id: string) {

        try {
            const chat = await this.wordChatRepository.findOneBy({ id: chat_id });
            if (!chat) throw new NotFoundException('Chat not found');
            await this.messageService.saveMessage(message, chat);
            const messages: WordChatMessage[] = await this.messageService.getMessagesByChat(chat_id);
    
            const assistantMessage = await this.openAiService.chat(messages);
            await this.messageService.saveMessage(assistantMessage, chat);

            return assistantMessage;
        } catch (error) {
            throw error;
        }
    }

}
