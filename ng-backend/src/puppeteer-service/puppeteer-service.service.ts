import puppeteer, { Browser, PDFOptions } from 'puppeteer';
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class PuppeteerService implements OnModuleInit, OnModuleDestroy {
  private browser!: Browser;

  async onModuleInit(): Promise<void> {
    this.browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  }

  async onModuleDestroy(): Promise<void> {
    await this.browser.close();
  }

  async generatePdf(html: string, options: PDFOptions): Promise<Buffer> {
    const page = await this.browser.newPage();
    try {
      //await page.setContent(html, { waitUntil: 'networkidle0' });
      await page.setContent(html, { waitUntil: 'domcontentloaded' });
      const pdf = await page.pdf(options);
      return Buffer.from(pdf);
    } finally {
      await page.close();
    }
  }
}
