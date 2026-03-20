import { PDFOptions } from 'puppeteer';

export const defaultPuppeteerOptions: PDFOptions = {
  format: 'A4',
  landscape: false,
  margin: {
    top: '10mm',
    bottom: '10mm',
    left: '10mm',
    right: '10mm',
  },
  printBackground: true,
};
