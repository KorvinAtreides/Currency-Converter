import currencyRequest from "./api/currency-request";

export default class Main {
  async startApp() {
    const my = await currencyRequest();
    console.log(my.data)
  }
}
