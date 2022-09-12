import currencyRequest from './api/currency-request';
import convertFromXmlToArray from './api/handle-response';
import Form from './components/form';
import createSpinner from './components/spinner';
import { ConvertRecord } from './interfaces';

export default class Main {

  currencyData: Array<ConvertRecord>;

  form: Form;

  async startApp() {
    const spinner = createSpinner();
    document.body.append(spinner);
    this.form = new Form();
    this.form.createFormComponents();
    const currencyPromise = currencyRequest();
    currencyPromise.then((response) => {
      spinner.remove();
      this.currencyData = convertFromXmlToArray(response.data);
      document.body.append(this.form.HTMLForm);
      console.log(this.currencyData);
    })
  }
}
