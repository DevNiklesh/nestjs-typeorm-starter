import {MigrationInterface, QueryRunner} from "typeorm";

export class VariationMigration1621428222526 implements MigrationInterface {
    name = 'VariationMigration1621428222526'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Variations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" character varying NOT NULL, "price" double precision NOT NULL, "productId" uuid, CONSTRAINT "PK_4df348e7448aa36e5d355f55fdb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Variations" ADD CONSTRAINT "FK_b2722593407f53bef9f7b033415" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Variations" DROP CONSTRAINT "FK_b2722593407f53bef9f7b033415"`);
        await queryRunner.query(`DROP TABLE "Variations"`);
    }

}
