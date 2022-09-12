import currencyRequest from "./api/currency-request";

export default class Main {
  async startApp() {
    const spinner = document.createElement('img');
    spinner.src = './img/spinner.png';
    spinner.classList.add('spinIcon');
    document.body.append(spinner);
    
    const my = await currencyRequest();
    console.log(my.data)
  }
}
