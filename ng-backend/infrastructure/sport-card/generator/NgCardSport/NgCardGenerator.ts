import { PDFDocument } from 'pdf-lib';
import { SportCardGenerator } from '../SportCardGenerator';
import SportCard from '@model/sportcard/SportCard';
import { PDFOptions } from 'puppeteer';
import { PuppeteerService } from 'src/puppeteer-service/puppeteer-service.service';
import { NgFrontCard } from './html/NgFrontCard';
import { NgBackCard } from './html/NgBackCard';

export class NgCardGenerator extends SportCardGenerator {
  private readonly ngFrontCard = new NgFrontCard();
  private readonly ngBackCard = new NgBackCard();

  async generate(
    data: SportCard,
    puppeteerService: PuppeteerService,
  ): Promise<Buffer> {
    this.data = data;

    const page1Buffer = await puppeteerService.generatePdf(
      this.ngFrontCard.getHtmlTemplate(data),
      this.getPuppeteerOptions(),
    );
    const page2Buffer = await puppeteerService.generatePdf(
      this.ngBackCard.getHtmlTemplate(data),
      this.getPuppeteerOptions(),
    );
    return this.mergePages([page1Buffer, page2Buffer]);
  }

  private async mergePages(buffers: Buffer[]): Promise<Buffer> {
    const merged = await PDFDocument.create();
    for (const buf of buffers) {
      const doc = await PDFDocument.load(buf);
      const pages = await merged.copyPages(doc, doc.getPageIndices());
      pages.forEach((p) => merged.addPage(p));
    }
    return Buffer.from(await merged.save());
  }

  protected getPuppeteerOptions(): PDFOptions {
    return {
      format: 'A4',
      landscape: false,
      printBackground: true,
      margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' },
    };
  }

  protected buildHtml(): string {
    return '';
  }
}
