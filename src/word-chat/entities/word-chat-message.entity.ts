import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { WordChat } from "./word-chat.entity";

@Entity()
export class WordChatMessage {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    role: 'user' | 'assistant';

    @Column('text')
    content: string;

    @ManyToOne(() => WordChat, wordchat => wordchat.messages)
    chat: WordChat;

    @CreateDateColumn()
    createdAt: Date;
}