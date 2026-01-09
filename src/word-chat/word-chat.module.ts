import { Module } from '@nestjs/common';
import { WordChatController } from './word-chat.controller';
import { WordChatService } from './word-chat.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { WordChat } from './entities/word-chat.entity';
import { WordChatMessage } from './entities/word-chat-message.entity';

@Module({
  controllers: [WordChatController],
  providers: [WordChatService],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([ WordChat, WordChatMessage ]),
    PassportModule.register({defaultStrategy: 'jwt'}),
  ],
  exports: [TypeOrmModule, PassportModule]
})
export class WordChatModule {}
