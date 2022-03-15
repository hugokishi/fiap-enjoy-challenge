import Beer from '@domain/entity/Beer'
import BeerStyle from '@domain/entity/BeerStyle'
import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'

export default class CreateInitialValues implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(BeerStyle)
      .values([
        { name: 'Pilsen' },
        { name: 'Munich Helles' },
        { name: 'Vienna Lager' },
        { name: 'Oktoberfest (Märzen)' },
        { name: 'Bock' },
        { name: 'Kölsch' },
        { name: 'Altbier' },
        { name: 'English Pale Ale' },
        { name: 'English Brown Ale' },
        { name: 'India Pale Ale' },
        { name: 'English IPA' },
        { name: 'American IPA' },
        { name: 'Imperial IPA' },
        { name: 'New England IPA' },
        { name: 'Porter' },
        { name: 'Stout' },
        { name: 'Weizenbier' },
        { name: 'Witbier' },
        { name: 'Belgian Pale Ale' },
        { name: 'Saison' },
        { name: 'Sour' },
        { name: 'Lambic' },
        { name: 'Belgian Dubbel' },
        { name: 'Belgian Tripel' },
        { name: 'Belgian Blond Ale' },
        { name: 'Belgian Golden Strong Ale' },
        { name: ' Belgian Dark Strong Ale' },
        { name: 'English Barley Wine' },
        { name: 'Rauchbier' },
        { name: 'Fruit Beer' }
      ])
      .execute()

    await connection
      .createQueryBuilder()
      .insert()
      .into(Beer)
      .values([
        { beerName: 'Skol', price: 1.0, style: 1 },
        { beerName: 'Brahma', price: 2.0, style: 2 },
        { beerName: 'Original', price: 3.0, style: 3 },
        { beerName: 'Heineken', price: 4.0, style: 4 },
        { beerName: 'Hoegaarden', price: 5.0, style: 5 }
      ])
      .execute()
  }
}
