import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1729012212299 implements MigrationInterface {
    name = 'Initial1729012212299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "car_model" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "brandName" text, CONSTRAINT "PK_525071eea12c671d67e35a5cbc8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "car_brand" ("name" text NOT NULL, CONSTRAINT "PK_fd0cc605fc786e24e1b24f6d10f" PRIMARY KEY ("name"))`);
        await queryRunner.query(`CREATE TYPE "public"."location_country_enum" AS ENUM('Ukraine')`);
        await queryRunner.query(`CREATE TYPE "public"."location_iso2_enum" AS ENUM('UA')`);
        await queryRunner.query(`CREATE TYPE "public"."location_capital_enum" AS ENUM('primary', 'admin', 'minor', '')`);
        await queryRunner.query(`CREATE TABLE "location" ("city" text NOT NULL, "lat" numeric(6,4) NOT NULL, "lng" numeric(6,4) NOT NULL, "country" "public"."location_country_enum" NOT NULL DEFAULT 'Ukraine', "iso2" "public"."location_iso2_enum" NOT NULL DEFAULT 'UA', "region" text NOT NULL, "capital" "public"."location_capital_enum" NOT NULL DEFAULT '', CONSTRAINT "PK_ae9cc28fa716b66a5288c86a941" PRIMARY KEY ("city"))`);
        await queryRunner.query(`CREATE TABLE "rate" ("marker" text NOT NULL DEFAULT 'marker', "buy_eur" double precision NOT NULL, "sale_eur" double precision NOT NULL, "buy_usd" double precision NOT NULL, "sale_usd" double precision NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0dab49c15ab98f50a4be6766f78" PRIMARY KEY ("marker"))`);
        await queryRunner.query(`CREATE TABLE "show_chosen" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "car_id" uuid NOT NULL, CONSTRAINT "UQ_2dba8741835458de5105daf51b7" UNIQUE ("car_id"), CONSTRAINT "PK_2909abb49c46fadc2aeebc17350" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "show_list" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "car_id" uuid NOT NULL, CONSTRAINT "PK_da79a3ab2db10d0073af4836c02" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."car_currency_enum" AS ENUM('USD', 'EUR', 'UAH')`);
        await queryRunner.query(`CREATE TABLE "car" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "mileage" integer NOT NULL, "build" integer NOT NULL, "price" integer NOT NULL, "currency" "public"."car_currency_enum" NOT NULL DEFAULT 'UAH', "description" text, "active" boolean NOT NULL DEFAULT false, "version" integer NOT NULL, "image" text array NOT NULL DEFAULT '{}', "userId" uuid, "brandName" text, "modelId" uuid, "rateMarker" text, "locationCity" text, CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "refresh" text NOT NULL, "device" text NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8a2b400963b49f4af558e787c6" ON "refresh_tokens" ("device") `);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('user', 'manager', 'admin')`);
        await queryRunner.query(`CREATE TYPE "public"."user_plan_enum" AS ENUM('base', 'premium')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "first_name" text NOT NULL, "last_name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "phone" text, "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', "plan" "public"."user_plan_enum" NOT NULL DEFAULT 'base', "verify" boolean NOT NULL DEFAULT false, "ban" boolean NOT NULL DEFAULT false, "avatar_image" text, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "car_model" ADD CONSTRAINT "FK_0bd33d530591e10c1cce36d1ded" FOREIGN KEY ("brandName") REFERENCES "car_brand"("name") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "show_chosen" ADD CONSTRAINT "FK_2dba8741835458de5105daf51b7" FOREIGN KEY ("car_id") REFERENCES "car"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "show_list" ADD CONSTRAINT "FK_6d4d58a48071f90f10db7b37b0c" FOREIGN KEY ("car_id") REFERENCES "car"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_a4f3cb1b950608959ba75e8df36" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_41729effcf57d4195b919710f50" FOREIGN KEY ("brandName") REFERENCES "car_brand"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_c40870af5230c4d117729c8299f" FOREIGN KEY ("modelId") REFERENCES "car_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_e23a1d653db610bac05c216baea" FOREIGN KEY ("rateMarker") REFERENCES "rate"("marker") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_f8ae8bec94f9f115758bf6534ad" FOREIGN KEY ("locationCity") REFERENCES "location"("city") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4"`);
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_f8ae8bec94f9f115758bf6534ad"`);
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_e23a1d653db610bac05c216baea"`);
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_c40870af5230c4d117729c8299f"`);
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_41729effcf57d4195b919710f50"`);
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_a4f3cb1b950608959ba75e8df36"`);
        await queryRunner.query(`ALTER TABLE "show_list" DROP CONSTRAINT "FK_6d4d58a48071f90f10db7b37b0c"`);
        await queryRunner.query(`ALTER TABLE "show_chosen" DROP CONSTRAINT "FK_2dba8741835458de5105daf51b7"`);
        await queryRunner.query(`ALTER TABLE "car_model" DROP CONSTRAINT "FK_0bd33d530591e10c1cce36d1ded"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_plan_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8a2b400963b49f4af558e787c6"`);
        await queryRunner.query(`DROP TABLE "refresh_tokens"`);
        await queryRunner.query(`DROP TABLE "car"`);
        await queryRunner.query(`DROP TYPE "public"."car_currency_enum"`);
        await queryRunner.query(`DROP TABLE "show_list"`);
        await queryRunner.query(`DROP TABLE "show_chosen"`);
        await queryRunner.query(`DROP TABLE "rate"`);
        await queryRunner.query(`DROP TABLE "location"`);
        await queryRunner.query(`DROP TYPE "public"."location_capital_enum"`);
        await queryRunner.query(`DROP TYPE "public"."location_iso2_enum"`);
        await queryRunner.query(`DROP TYPE "public"."location_country_enum"`);
        await queryRunner.query(`DROP TABLE "car_brand"`);
        await queryRunner.query(`DROP TABLE "car_model"`);
    }

}
