import { MigrationInterface, QueryRunner } from "typeorm";

export class GenerateDatabase1690851871280 implements MigrationInterface {
    name = 'GenerateDatabase1690851871280'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`artifact\` DROP COLUMN \`size\``);
        await queryRunner.query(`ALTER TABLE \`artifact\` ADD \`size\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`artifact\` DROP COLUMN \`size\``);
        await queryRunner.query(`ALTER TABLE \`artifact\` ADD \`size\` double(22) NOT NULL`);
    }

}
