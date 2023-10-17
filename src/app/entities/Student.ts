import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('student')
class Student {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string;

    @Column({ type: 'int', nullable: false })
    age: number;

    @Column({ type: 'float', nullable: false })
    firstScore: number;

    @Column({ type: 'float', nullable: false })
    secondScore: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    teacher: string;

    @Column({ type: 'int', nullable: false })
    studentClass: number;
}

export default Student;
