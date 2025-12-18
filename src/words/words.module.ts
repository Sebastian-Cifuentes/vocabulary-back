import { Module } from '@nestjs/common';
import { WordsController } from './words.controller';
import { WordsService } from './words.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from './entities/word.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [WordsController],
  providers: [WordsService],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([ Word ]),
    PassportModule.register({defaultStrategy: 'jwt'}),
  ],
  exports: [TypeOrmModule, PassportModule]
})
export class WordsModule {}
