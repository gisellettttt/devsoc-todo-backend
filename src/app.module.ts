import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './app.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // For actual projects this is not safe, instead use db migrations
      synchronize: true,   // Since this is an example project so keeping this true is fine
      
      ssl: {
        rejectUnauthorized: false,  // Required for Neon DB
      },
    }),
    TypeOrmModule.forFeature([Todo]),   // Register Todo entity
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
