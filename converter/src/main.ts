import currencyRequest from './api/currency-request';
import convertFromXmlToArray from './api/handle-response';
import { ConvertRecord } from './interfaces';

export default class Main {

  currencyData: Array<ConvertRecord>;

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
      spinner.remove();
      this.currencyData = convertFromXmlToArray(response.data)
      console.log(this.currencyData);
    })
  }
}
