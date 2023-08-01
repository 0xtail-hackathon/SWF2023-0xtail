import { MigrationInterface, QueryRunner } from "typeorm";

export class GenerateDatabase1690917057106 implements MigrationInterface {
    name = 'GenerateDatabase1690917057106'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`crowd_sale\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`crowd_sale\` ADD \`description\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`artifact\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`artifact\` ADD \`description\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`artifact\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`artifact\` ADD \`description\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`crowd_sale\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`crowd_sale\` ADD \`description\` varchar(255) NOT NULL`);
    }

}
