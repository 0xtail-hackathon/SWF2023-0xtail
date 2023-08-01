import { MigrationInterface, QueryRunner } from "typeorm";

export class GenerateDatabase1690890449712 implements MigrationInterface {
    name = 'GenerateDatabase1690890449712'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`crowd_sale\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`value\` bigint NOT NULL, \`strt_date\` varchar(255) NOT NULL, \`exp_date\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_38f5c8796c3cca41c033233e73\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`artifact\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`exc_loc\` varchar(255) NOT NULL, \`cur_loc\` varchar(255) NOT NULL, \`era\` varchar(255) NOT NULL, \`category\` varchar(255) NOT NULL, \`size\` varchar(255) NOT NULL, \`coll_num\` varchar(255) NOT NULL, \`img_url\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_b5567c51d2b49291baba57cd97\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`fund\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`usr_nm\` varchar(255) NOT NULL, \`art_nm\` varchar(255) NOT NULL, \`amount\` int NOT NULL DEFAULT '1000000', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), INDEX \`IDX_b8d9356f380cce172d8cc3c809\` (\`art_nm\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`private_key\` varchar(255) NOT NULL, \`krw\` int NOT NULL DEFAULT '1000000', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_065d4d8f3b5adb4a08841eae3c\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_065d4d8f3b5adb4a08841eae3c\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_b8d9356f380cce172d8cc3c809\` ON \`fund\``);
        await queryRunner.query(`DROP TABLE \`fund\``);
        await queryRunner.query(`DROP INDEX \`IDX_b5567c51d2b49291baba57cd97\` ON \`artifact\``);
        await queryRunner.query(`DROP TABLE \`artifact\``);
        await queryRunner.query(`DROP INDEX \`IDX_38f5c8796c3cca41c033233e73\` ON \`crowd_sale\``);
        await queryRunner.query(`DROP TABLE \`crowd_sale\``);
    }

}
