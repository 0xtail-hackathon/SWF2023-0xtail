import { MigrationInterface, QueryRunner } from "typeorm";

export class GenerateDatabase1690801256633 implements MigrationInterface {
    name = 'GenerateDatabase1690801256633'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`user_name\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`private_key\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_6065b7bb0f27536a6f932bb1a8\` (\`user_name\`, \`address\`), UNIQUE INDEX \`IDX_3122b4b8709577da50e89b6898\` (\`address\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_3122b4b8709577da50e89b6898\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_6065b7bb0f27536a6f932bb1a8\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
