const rootDir = process.env.ORM_ROOT_DIR

const extra = process.env.NODE_ENV !== 'development' && {
  extra: {
    ssl: {
      rejectUnauthorized: false
    }
  }
}

module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: [rootDir + '/domain/entity/**/*.{js,ts}'],
  migrations: [rootDir + '/domain/migration/*.{js,ts}'],
  seeds: [rootDir + '/domain/seeds/**/*.{js,ts}'],
  cli: {
    entitiesDir: 'src/domain/entity',
    migrationsDir: 'src/domain/migration'
  },
  ...extra
}
