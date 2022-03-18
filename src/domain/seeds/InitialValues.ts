import Beer from '@domain/entity/Beer'
import BeerStyle from '@domain/entity/BeerStyle'
import { User } from '@repository/User'
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
        { beerName: 'Skol', price: 1.0, style: { id: 1 } },
        { beerName: 'Brahma', price: 2.0, style: { id: 2 } },
        { beerName: 'Original', price: 3.0, style: { id: 3 } },
        { beerName: 'Heineken', price: 4.0, style: { id: 4 } },
        { beerName: 'Hoegaarden', price: 5.0, style: { id: 5 } }
      ])
      .execute()

    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        { name: 'User 1', cpf: '12345678910', phone: '11900000000' },
        { name: 'User 2', cpf: '12542368271', phone: '11911111111' },
        { name: 'User 3', cpf: '12342678942', phone: '11922222222' },
        { name: 'User 4', cpf: '13146898923', phone: '11933333333' },
        { name: 'User 5', cpf: '13345648934', phone: '11944444444' }
      ])
      .execute()
  }
}
