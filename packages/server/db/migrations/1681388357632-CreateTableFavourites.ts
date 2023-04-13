import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableFavourites1681388357632 implements MigrationInterface {
  name = 'CreateTableFavourites1681388357632';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "favourites" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "albumId" integer NOT NULL, "title" character varying NOT NULL, "year" character varying, "country" character varying, "style" json NOT NULL, "format" json NOT NULL, "coverImage" character varying NOT NULL, "tracklist" json NOT NULL, CONSTRAINT "PK_173e5d5cc35490bf1de2d2d3739" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "favourites"`);
  }
}
