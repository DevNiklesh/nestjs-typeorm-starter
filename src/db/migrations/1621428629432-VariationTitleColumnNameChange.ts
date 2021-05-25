import {MigrationInterface, QueryRunner} from "typeorm";

export class VariationTitleColumnNameChange1621428629432 implements MigrationInterface {
    name = 'VariationTitleColumnNameChange1621428629432'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Variations" RENAME COLUMN "name" TO "title"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Variations" RENAME COLUMN "title" TO "name"`);
    }

}
