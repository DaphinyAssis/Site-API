import {MigrationInterface, QueryRunner} from "typeorm";

export class stock1698751909730 implements MigrationInterface {
    name = 'stock1698751909730'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profiles" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profiles" DROP COLUMN "password"`);
    }

}
