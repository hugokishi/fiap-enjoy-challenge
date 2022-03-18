import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateInitialDatabase1647568647490 implements MigrationInterface {
  name = 'CreateInitialDatabase1647568647490'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "order_beer_beer" ("orderId" integer NOT NULL, "beerId" integer NOT NULL, CONSTRAINT "PK_ba8a38bd5ebff416b91ee43348e" PRIMARY KEY ("orderId", "beerId"))'
    )
    await queryRunner.query(
      'CREATE INDEX "IDX_952ac017a75e2753616c70c5d7" ON "order_beer_beer" ("orderId") '
    )
    await queryRunner.query(
      'CREATE INDEX "IDX_26611bd1d0b0083797f9e34d75" ON "order_beer_beer" ("beerId") '
    )
    await queryRunner.query(
      'ALTER TABLE "order_beer_beer" ADD CONSTRAINT "FK_952ac017a75e2753616c70c5d7e" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE'
    )
    await queryRunner.query(
      'ALTER TABLE "order_beer_beer" ADD CONSTRAINT "FK_26611bd1d0b0083797f9e34d753" FOREIGN KEY ("beerId") REFERENCES "beer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "order_beer_beer" DROP CONSTRAINT "FK_26611bd1d0b0083797f9e34d753"'
    )
    await queryRunner.query(
      'ALTER TABLE "order_beer_beer" DROP CONSTRAINT "FK_952ac017a75e2753616c70c5d7e"'
    )
    await queryRunner.query('DROP INDEX "IDX_26611bd1d0b0083797f9e34d75"')
    await queryRunner.query('DROP INDEX "IDX_952ac017a75e2753616c70c5d7"')
    await queryRunner.query('DROP TABLE "order_beer_beer"')
  }
}
