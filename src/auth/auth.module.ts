import { HttpModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
// import { JwtConfigService } from '../config/jwt.config.service';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'SECRET',
      signOptions: { expiresIn: '60s' },
    }),
    ConfigModule.forRoot(),
    PassportModule,
    UsersModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}