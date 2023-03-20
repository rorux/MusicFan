import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../users/user.entity';
import { CreateTableUsers1679342186052 } from '../../db/migrations/1679342186052-CreateTableUsers';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<'aurora-postgres'>('POSTGRES_CONNECTION'),
        username: config.get<string>('POSTGRES_USERNAME'),
        password: config.get<string>('POSTGRES_PASSWORD'),
        database: config.get<string>('POSTGRES_DATABASE'),
        host: config.get<string>('POSTGRES_HOST'),
        port: Number(config.get<number>('POSTGRES_PORT')),
        entities: [User],
        migrations: [CreateTableUsers1679342186052],
        migrationsRun: true,
        migrationsTableName: 'migrations',
        synchronize: false,
        logging: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
