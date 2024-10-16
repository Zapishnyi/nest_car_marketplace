import { MigrationInterface, QueryRunner } from "typeorm";

export class ShowEntityesCorrection21729110116318 implements MigrationInterface {
    name = 'ShowEntityesCorrection21729110116318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "show_chosen" ADD "created" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "show_list" ADD "created" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "show_list" DROP COLUMN "created"`);
        await queryRunner.query(`ALTER TABLE "show_chosen" DROP COLUMN "created"`);
    }

}
