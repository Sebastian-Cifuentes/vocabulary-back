import { Word } from "src/words/entities/word.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column('text', {unique: true})
    username: string;

    @Column('text', {unique: true})
    email: string;

    @Column('text', {select: false})
    password: string;

    @Column('bool', {
        default: true
    })
    isActive: boolean;

    @OneToMany(() => Word, word => word.user)
    words: Word[]

}