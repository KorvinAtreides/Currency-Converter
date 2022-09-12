import currencyRequest from './api/currency-request';

export default class Main {

  currencyData: string;

  createSpinner() {
    const spinner = document.createElement('img');
    spinner.src = './img/spinner.png';
    spinner.classList.add('spinIcon');
    return spinner;
  }

  async startApp() {
    const spinner = this.createSpinner();
    document.body.append(spinner);
    const currencyPromise = currencyRequest();
    currencyPromise.then((response) => {
      this.currencyData = response.data;
      console.log(this.currencyData);
      spinner.remove();
    })
  }
}
