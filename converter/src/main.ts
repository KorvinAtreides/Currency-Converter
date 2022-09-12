import currencyRequest from './api/currency-request';
import convertFromXmlToArray from './api/handle-response';
import createSpinner from './components/spinner';
import { ConvertRecord } from './interfaces';

export default class Main {

  currencyData: Array<ConvertRecord>;

  async startApp() {
    const spinner = createSpinner();
    document.body.append(spinner);

    const currencyPromise = currencyRequest();
    currencyPromise.then((response) => {
      spinner.remove();
      this.currencyData = convertFromXmlToArray(response.data)
      console.log(this.currencyData);
    })
  }
}
