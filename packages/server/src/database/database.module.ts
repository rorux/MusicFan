import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../users/user.entity';
import { Token } from '../tokens/token.entity';
import { CreateTableUsers1679342186052 } from '../../db/migrations/1679342186052-CreateTableUsers';
import { CreateTableTokens1679518526354 } from '../../db/migrations/1679518526354-CreateTableTokens';

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
        entities: [User, Token],
        migrations: [CreateTableUsers1679342186052, CreateTableTokens1679518526354],
        migrationsRun: true,
        migrationsTableName: 'migrations',
        synchronize: false,
        logging: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
