import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WordsService } from './words.service';
import { WordDto } from './dto/word.dto';
import { Auth } from 'src/users/decorators/auth.decorator';

@ApiTags('words')
@Controller('words')
export class WordsController {

    constructor(private wordService: WordsService) {}

    @Get()
    @Auth()
    getAll() {
        return this.wordService.getAll();
    }
    
    @Get(':id')
    @Auth()
    getById(
        @Param('id') id: string
    ) {
        return this.wordService.getById(id);
    }

    @Post()
    @Auth()
    create(@Body() word: WordDto) {
        return this.wordService.create(word);
    }


    @Delete(':id')
    @Auth()
    delete(
        @Param('id') id: string
    ) {
        return this.wordService.delete(id);
    }

    @Put(':id')
    @Auth()
    update(
        @Param('id') id: string,
        @Body() word: WordDto
    ) {
        return this.wordService.update(word, id);
    }

}
