import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './token.entity';
import { TokensService } from './tokens.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Token]), JwtModule.register({})],
  exports: [TokensService, JwtModule],
  providers: [TokensService],
})
export class TokensModule {}
