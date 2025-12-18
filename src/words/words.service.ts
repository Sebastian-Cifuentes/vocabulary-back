import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Word } from './entities/word.entity';
import { Repository } from 'typeorm';
import { WordDto } from './dto/word.dto';

@Injectable()
export class WordsService {

    constructor(
        @InjectRepository(Word)
        private readonly repository: Repository<Word>,
    ) {}

    async getById(id: string) {
        try {
            const word = await this.repository.findOneBy({id});
            if (!word) throw new NotFoundException("The word doesn't exist");
            return {
                word
            }
        } catch (error) {
            return error;
        }
    }

    async getAll() {
        try {
            const words = await this.repository.find();
            return {
                words
            }
        } catch (error) {
            return error;
        }
    }

    async create(word: WordDto) {
        try {
            const exists = await this.repository.findOne({where: { name: word.name }})
            if (exists) throw new BadRequestException('This word already existed');

            const newWord = this.repository.create({
                ...word
            })

            await this.repository.save(newWord);

            return {
                word: newWord,
                message: 'Word created succesfully'
            }

        } catch (error) {
            return error;
        }
    }

    async delete(id: string) {
        try {
            await this.repository.delete(id)
        } catch (error) {
            return error;
        }
    }

    async update(wordDto: WordDto, id: string) {
        try {
            const word = await this.repository.findOneBy({ id });

            if (!word) throw new NotFoundException("The word doesn't exist");

            const updatedWord = Object.assign(word, wordDto);

            await this.repository.save(updatedWord);

            return {
                word: updatedWord,
                message: 'Word was updated succesfully'
            }

        } catch (error) {
            return error;
        }
    }

}
