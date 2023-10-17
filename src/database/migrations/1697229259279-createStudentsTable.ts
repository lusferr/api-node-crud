import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateStudentsTable1697229259279 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "student",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: '100',
                        isNullable: false
                    },
                    {
                        name: "age",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "firstScore",
                        type: "float",
                        isNullable: false
                    },
                    {
                        name: "secondScore",
                        type: "float",
                        isNullable: false
                    },
                    {
                        name: "teacher",
                        type: "varchar",
                        length: '100',
                        isNullable: false
                    },
                    {
                        name: "studentClass",
                        type: "int",
                        isNullable: false
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('student')
    }

}
