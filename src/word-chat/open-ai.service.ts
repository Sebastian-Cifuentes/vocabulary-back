import { Injectable } from '@nestjs/common';
import { WordChatMessageDto } from './dto/word-chat.dto';
import { WordChat } from './entities/word-chat.entity';
import OpenAI from 'openai';
import { WordChatMessage } from './entities/word-chat-message.entity';

@Injectable()
export class OpenAiService {

    private chatgpt = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });

    private systemPromp = `
        Your rol is focus on how the person uses a word that the system will pass you as a parameter.
        To init:
        - Give to the person a few topics to choose considering the word that the system will send you
        - Start the conversation according to the topic chosen.

        Focus on:
        - If the word apply correctly in the sentence
        - If the word has the right meaning
        - If the word is conjugated correctly

        With this focus, please return this:
        - A percentage for each message according the above rules
        - Your message as a assistant who is chatting with a person.
    `;

    async chat(messages: WordChatMessage[]) {
        
        const completion = await this.chatgpt.chat.completions.create({
            model: 'gpt-4.1-nano',
            temperature: 0.2,
            messages: [
                {
                    role: 'system',
                    content: this.systemPromp
                },
                ...messages.map(msg => ({ role: msg.role, content: msg.content }))
            ]
        });

        return completion.choices[0].message;
    }
}
