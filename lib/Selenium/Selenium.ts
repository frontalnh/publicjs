import { WebDriver } from "selenium-webdriver";

export default class Selenium {
  constructor(public driver: WebDriver) {}

  // maxWaitUntilRenderMS: maximum wait time until the page renders after crawling default: 1000ms
  public async scrollToBottomMost(params: { maxWaitUntilRenderMS: number }) {
    const { maxWaitUntilRenderMS } = params;
    const lastHeight = await this.driver.executeScript("return document.body.scrollHeight");
    await this.driver.executeScript("window.scrollTo(0, document.body.scrollHeight)");
    await this.driver.sleep(maxWaitUntilRenderMS || 1000);
    const newHeight = await this.driver.executeScript("return document.body.scrollHeight");

    if (newHeight > lastHeight) {
      await this.scrollToBottomMost(params);
    }
  }
}
