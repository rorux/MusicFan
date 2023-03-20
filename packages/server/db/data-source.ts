import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from '../src/users/user.entity';
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` }); // eslint-disable-line

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  username: process.env.POSTGRES_USERNAME,
  password: String(process.env.POSTGRES_PASSWORD),
  database: process.env.POSTGRES_DATABASE,
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  entities: [User],
  migrations: [],
  synchronize: false,
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
