import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SportCardModule } from './sport-card/sport-card.module';
import { PuppeteerService } from './puppeteer-service/puppeteer-service.service';

@Module({
  imports: [SportCardModule],
  controllers: [AppController],
  providers: [AppService, PuppeteerService],
})
export class AppModule {}
