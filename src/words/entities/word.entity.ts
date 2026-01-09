import { User } from "src/users/entities/user.entity";
import { WordChat } from "src/word-chat/entities/word-chat.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Word {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @ManyToOne(() => User, user => user.words)
    user: User;

    @OneToOne(() => WordChat, wordchat => wordchat.word)
    wordchat: WordChat;
}