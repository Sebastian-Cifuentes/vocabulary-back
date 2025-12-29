import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Word } from './entities/word.entity';
import { Repository } from 'typeorm';
import { WordDto } from './dto/word.dto';

@Injectable()
export class WordsService {

    private readonly BASE_DICTIONARY_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

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
            throw error;
        }
    }

    async getAll() {
        try {
            const words = await this.repository.find();
            return {
                words
            }
        } catch (error) {
            throw error;
        }
    }

    async create(word: WordDto) {
        try {
            word.name = word.name.trim().toLowerCase();
            const res = await fetch(`${this.BASE_DICTIONARY_URL}/${word.name}`);
            const data = await res.json();

            if (!res.ok) {
                throw new BadRequestException({
                    message: 'This word does not exist',
                    suggestions: data?.suggestion ?? []
                });
            }

            const exists = await this.repository.findOne({where: { name: word.name }})
            if (exists) throw new ConflictException('This word already existed');

            const newWord = this.repository.create({
                ...word
            })

            await this.repository.save(newWord);

            return {
                word: newWord,
                message: 'Word created succesfully'
            }

        } catch (error) {
            throw error;
        }
    }

    async delete(id: string) {
        try {
            await this.repository.delete(id)
        } catch (error) {
            throw error;
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
            throw error;
        }
    }

}
