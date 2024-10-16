import { MigrationInterface, QueryRunner } from "typeorm";

export class ShowEntityesCorrection1729109927792 implements MigrationInterface {
    name = 'ShowEntityesCorrection1729109927792'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "show_chosen" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "car_id" uuid NOT NULL, CONSTRAINT "UQ_2dba8741835458de5105daf51b7" UNIQUE ("car_id"), CONSTRAINT "PK_2909abb49c46fadc2aeebc17350" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "show_list" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "car_id" uuid NOT NULL, CONSTRAINT "PK_da79a3ab2db10d0073af4836c02" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "show_chosen" ADD CONSTRAINT "FK_2dba8741835458de5105daf51b7" FOREIGN KEY ("car_id") REFERENCES "car"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "show_list" ADD CONSTRAINT "FK_6d4d58a48071f90f10db7b37b0c" FOREIGN KEY ("car_id") REFERENCES "car"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "show_list" DROP CONSTRAINT "FK_6d4d58a48071f90f10db7b37b0c"`);
        await queryRunner.query(`ALTER TABLE "show_chosen" DROP CONSTRAINT "FK_2dba8741835458de5105daf51b7"`);
        await queryRunner.query(`DROP TABLE "show_list"`);
        await queryRunner.query(`DROP TABLE "show_chosen"`);
    }

}
