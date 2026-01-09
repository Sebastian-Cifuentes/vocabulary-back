import { Word } from "src/words/entities/word.entity";
import { CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { WordChatMessage } from "./word-chat-message.entity";

@Entity()
export class WordChat {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => Word, word => word.wordchat, {
        onDelete: 'CASCADE'
    })
    @JoinColumn()
    word: Word;

    @OneToMany(() => WordChatMessage, message  => message.chat)
    messages: WordChatMessage[]

    @CreateDateColumn()
    createdAt: Date;
}