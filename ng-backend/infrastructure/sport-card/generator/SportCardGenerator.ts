import SportCard from '@model/sportcard/SportCard';
import { PDFOptions } from 'puppeteer';
import { PuppeteerService } from 'src/puppeteer-service/puppeteer-service.service';

export abstract class SportCardGenerator {
  protected data!: SportCard;

  async generate(
    data: SportCard,
    puppeteerService?: PuppeteerService,
  ): Promise<Buffer> {
    this.data = data;
    const html = this.buildHtml();
    const options = this.getPuppeteerOptions();
    return await puppeteerService!.generatePdf(html, options);
  }

  protected abstract buildHtml(): string;
  protected abstract getPuppeteerOptions(): PDFOptions;
}
