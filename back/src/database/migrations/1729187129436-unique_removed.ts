import { MigrationInterface, QueryRunner } from "typeorm";

export class UniqueRemoved1729187129436 implements MigrationInterface {
    name = 'UniqueRemoved1729187129436'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "view-item" DROP CONSTRAINT "FK_ab6371d240cbe277798666c734b"`);
        await queryRunner.query(`ALTER TABLE "view-item" DROP CONSTRAINT "UQ_ab6371d240cbe277798666c734b"`);
        await queryRunner.query(`ALTER TABLE "view-item" ADD CONSTRAINT "FK_ab6371d240cbe277798666c734b" FOREIGN KEY ("car_id") REFERENCES "car"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "view-item" DROP CONSTRAINT "FK_ab6371d240cbe277798666c734b"`);
        await queryRunner.query(`ALTER TABLE "view-item" ADD CONSTRAINT "UQ_ab6371d240cbe277798666c734b" UNIQUE ("car_id")`);
        await queryRunner.query(`ALTER TABLE "view-item" ADD CONSTRAINT "FK_ab6371d240cbe277798666c734b" FOREIGN KEY ("car_id") REFERENCES "car"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
