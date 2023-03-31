import * as path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HeaderResolver, I18nJsonLoader, I18nModule } from 'nestjs-i18n';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { TokensModule } from './tokens/tokens.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'ru',
      loader: I18nJsonLoader,
      loaderOptions: {
        path: path.join(__dirname, '../i18n/'),
        watch: true,
      },
      resolvers: [new HeaderResolver(['lang'])],
    }),
    DatabaseModule,
    UsersModule,
    TokensModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
