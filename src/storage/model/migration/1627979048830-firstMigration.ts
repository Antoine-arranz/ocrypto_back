import {MigrationInterface, QueryRunner} from "typeorm";

export class firstMigration1627979048830 implements MigrationInterface {
    name = 'firstMigration1627979048830'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Platforms" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_3cc6e414e7c2d548cbeba6631d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Events" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "quantity" integer NOT NULL, "unit_price" integer NOT NULL, "fees" double precision, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_efc6f7ffffa26a4d4fe5f383a0b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Currencies" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "amount" double precision NOT NULL, CONSTRAINT "PK_161926657054051e70c1d10818f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "EventHasCurrencies" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "Currency_Id" integer NOT NULL, "Event_Id" integer NOT NULL, CONSTRAINT "PK_4f179157923941b212fcfbd4c63" PRIMARY KEY ("Currency_Id", "Event_Id"))`);
        await queryRunner.query(`CREATE TABLE "EventHasPlatforms" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "Platform_Id" integer NOT NULL, "Event_Id" integer NOT NULL, CONSTRAINT "PK_6ce4496ee31eee01fa8c2639187" PRIMARY KEY ("Platform_Id", "Event_Id"))`);
        await queryRunner.query(`CREATE TABLE "Wallets" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "User_Id" integer, CONSTRAINT "PK_22643866c3dcd5442c341d43b67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "lastName" character varying NOT NULL, "firstName" character varying NOT NULL, "country" character varying(2) NOT NULL, "verified" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "EventHasCurrencies" ADD CONSTRAINT "FK_512c21cd0740b0e15de9f81af24" FOREIGN KEY ("Currency_Id") REFERENCES "Currencies"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "EventHasCurrencies" ADD CONSTRAINT "FK_fdcb4bdf4c8a20b2d8096b046a7" FOREIGN KEY ("Event_Id") REFERENCES "Events"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "EventHasPlatforms" ADD CONSTRAINT "FK_4e2c9fca6d1a159f08760f0bcab" FOREIGN KEY ("Platform_Id") REFERENCES "Platforms"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "EventHasPlatforms" ADD CONSTRAINT "FK_21bf1a5abf5b92b4c559fa6d0ed" FOREIGN KEY ("Event_Id") REFERENCES "Events"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Wallets" ADD CONSTRAINT "FK_5abe97de657ff228ec0f7c6bf6f" FOREIGN KEY ("User_Id") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Wallets" DROP CONSTRAINT "FK_5abe97de657ff228ec0f7c6bf6f"`);
        await queryRunner.query(`ALTER TABLE "EventHasPlatforms" DROP CONSTRAINT "FK_21bf1a5abf5b92b4c559fa6d0ed"`);
        await queryRunner.query(`ALTER TABLE "EventHasPlatforms" DROP CONSTRAINT "FK_4e2c9fca6d1a159f08760f0bcab"`);
        await queryRunner.query(`ALTER TABLE "EventHasCurrencies" DROP CONSTRAINT "FK_fdcb4bdf4c8a20b2d8096b046a7"`);
        await queryRunner.query(`ALTER TABLE "EventHasCurrencies" DROP CONSTRAINT "FK_512c21cd0740b0e15de9f81af24"`);
        await queryRunner.query(`DROP TABLE "Users"`);
        await queryRunner.query(`DROP TABLE "Wallets"`);
        await queryRunner.query(`DROP TABLE "EventHasPlatforms"`);
        await queryRunner.query(`DROP TABLE "EventHasCurrencies"`);
        await queryRunner.query(`DROP TABLE "Currencies"`);
        await queryRunner.query(`DROP TABLE "Events"`);
        await queryRunner.query(`DROP TABLE "Platforms"`);
    }

}
