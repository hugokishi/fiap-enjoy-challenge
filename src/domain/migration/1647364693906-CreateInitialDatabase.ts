import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateInitialDatabase1647364693906 implements MigrationInterface {
  name = 'CreateInitialDatabase1647364693906'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "beer_style" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_2374cf7f1b8e049653f89e40e22" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      'CREATE TABLE "beer" ("id" SERIAL NOT NULL, "beerName" character varying NOT NULL, "price" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "styleId" integer, CONSTRAINT "PK_68ce81153952014a6e8b20df5c1" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      'CREATE TABLE "user" ("id" SERIAL NOT NULL, "phone" character varying NOT NULL, "name" character varying, "cpf" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      'CREATE TABLE "order" ("id" SERIAL NOT NULL, "order" character varying array NOT NULL, "total" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      'ALTER TABLE "beer" ADD CONSTRAINT "FK_45d8127af596f1f57d63e15dc8b" FOREIGN KEY ("styleId") REFERENCES "beer_style"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    )
    await queryRunner.query(
      'ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"'
    )
    await queryRunner.query(
      'ALTER TABLE "beer" DROP CONSTRAINT "FK_45d8127af596f1f57d63e15dc8b"'
    )
    await queryRunner.query('DROP TABLE "order"')
    await queryRunner.query('DROP TABLE "user"')
    await queryRunner.query('DROP TABLE "beer"')
    await queryRunner.query('DROP TABLE "beer_style"')
  }
}
