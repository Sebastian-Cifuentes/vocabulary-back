import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WordChatMessage } from './entities/word-chat-message.entity';
import { Repository } from 'typeorm';
import { WordChatMessageDto } from './dto/word-chat.dto';
import { WordChat } from './entities/word-chat.entity';

@Injectable()
export class WordChatMessageService {
    constructor(
        @InjectRepository(WordChatMessage)
        private readonly messageRepository: Repository<WordChatMessage>,
    ) {}

    async saveMessage(message: WordChatMessageDto, chat: WordChat) {
        const newMessage = this.messageRepository.create({ ...message, chat  });
        await this.messageRepository.save(newMessage);
    }

    async getMessagesByChat(chat_id: string): Promise<WordChatMessage[]> {
        const messages = await this.messageRepository.find({
            where: { chat: { id: chat_id } },
            order: { createdAt: 'ASC' }
        });

        return messages;
    }
}
