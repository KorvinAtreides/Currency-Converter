import currencyRequest from './api/currency-request';
import convertFromXmlToArray from './api/handle-response';
import createForm from './components/form';
import createSpinner from './components/spinner';
import { ConvertRecord } from './interfaces';

export default class Main {

  currencyData: Array<ConvertRecord>;

  async startApp() {
    const spinner = createSpinner();
    document.body.append(spinner);
    const form = createForm();
    const currencyPromise = currencyRequest();
    currencyPromise.then((response) => {
      spinner.remove();
      this.currencyData = convertFromXmlToArray(response.data);
      document.body.append(form);
      console.log(this.currencyData);
    })
  }
}
