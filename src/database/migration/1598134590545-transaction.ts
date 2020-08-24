import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class transaction1598134590545 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'transactions',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    }, {
                        name: 'amount_request',
                        type: 'decimal',
                        precision: 10,
                        scale: 2,
                        default: 0.00,
                    }, {
                        name: 'account_id',
                        type: 'integer',
                        isNullable: true,
                    }, {
                        name: 'to_account_id',
                        type: 'integer',
                        isNullable: true,
                    }, {
                        name: 'rate_amount',
                        type: 'decimal',
                        precision: 10,
                        scale: 2,
                        default: 0.00,
                    }, {
                        name: 'bonus_amount',
                        type: 'decimal',
                        precision: 10,
                        scale: 2,
                        default: 0.00,
                    }, {
                        name: 'total',
                        type: 'decimal',
                        precision: 10,
                        scale: 2,
                        default: 0.00,
                    }, {
                        name: 'type',
                        type: 'enum',
                        enum: ['deposit', 'withdraw', 'transfer'],
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

        await queryRunner.createForeignKey(
            'transactions',
            new TableForeignKey({
                columnNames: ['account_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'accounts',
                onDelete: 'CASCADE',
            })
        );

        await queryRunner.createForeignKey(
            'transactions',
            new TableForeignKey({
                columnNames: ['to_account_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'accounts',
                onDelete: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('transactions');
    }

}
