import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Account1598064221816 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'accounts',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    }, {
                        name: 'full_name',
                        type: 'varchar',
                    }, {
                        name: 'register_cpf',
                        type: 'varchar',
                    }, {
                        name: 'balance',
                        type: 'decimal',
                        precision: 10,
                        scale: 2,
                        default: 0.00,
                    }, {
                        name: 'created_At',
                        type: 'timestamp',
                        default: 'datetime(\'now\')',
                    }, {
                        name: 'updated_At',
                        type: 'timestamp',
                        default: 'datetime(\'now\')',
                        onUpdate: 'datetime(\'now\')'
                    }
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('accounts');
    }

}
