import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateInitialDatabase1647605179819 implements MigrationInterface {
  name = 'CreateInitialDatabase1647605179819'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "beer_style" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_2374cf7f1b8e049653f89e40e22" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      'CREATE TABLE "user" ("id" SERIAL NOT NULL, "phone" character varying NOT NULL, "name" character varying, "cpf" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      'CREATE TABLE "order" ("id" SERIAL NOT NULL, "total" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      'CREATE TABLE "beer" ("id" SERIAL NOT NULL, "beerName" character varying NOT NULL, "price" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "styleId" integer, CONSTRAINT "PK_68ce81153952014a6e8b20df5c1" PRIMARY KEY ("id"))'
    )
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
      'ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    )
    await queryRunner.query(
      'ALTER TABLE "beer" ADD CONSTRAINT "FK_45d8127af596f1f57d63e15dc8b" FOREIGN KEY ("styleId") REFERENCES "beer_style"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
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
    await queryRunner.query(
      'ALTER TABLE "beer" DROP CONSTRAINT "FK_45d8127af596f1f57d63e15dc8b"'
    )
    await queryRunner.query(
      'ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"'
    )
    await queryRunner.query('DROP INDEX "IDX_26611bd1d0b0083797f9e34d75"')
    await queryRunner.query('DROP INDEX "IDX_952ac017a75e2753616c70c5d7"')
    await queryRunner.query('DROP TABLE "order_beer_beer"')
    await queryRunner.query('DROP TABLE "beer"')
    await queryRunner.query('DROP TABLE "order"')
    await queryRunner.query('DROP TABLE "user"')
    await queryRunner.query('DROP TABLE "beer_style"')
  }
}
