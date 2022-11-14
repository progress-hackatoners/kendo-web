import puppeteer from 'puppeteer';
import { log } from "util";
export async function ssr (url) {
  const browserOptions = {
    headless: true
  };
try {
    const browser = await puppeteer.launch(browserOptions);
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle0" });
    await page.waitForSelector('#app');
    await page.$eval('#app', ({ dataset }) => {
      dataset.fetched = true;
    });
    const serializedHtml = await page.content();
    await browser.close();
    return serializedHtml;
  } catch (error) {
    log('SSR Error', error);
    return 'Problem rendering on the server.';
  }
}