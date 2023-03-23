import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableTokens1679518526354 implements MigrationInterface {
  name = 'CreateTableTokens1679518526354';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tokens" ("userId" integer NOT NULL, "refreshToken" character varying NOT NULL, CONSTRAINT "PK_d417e5d35f2434afc4bd48cb4d2" PRIMARY KEY ("userId"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tokens"`);
  }
}
