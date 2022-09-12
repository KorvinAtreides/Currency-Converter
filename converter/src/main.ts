import createPromiseArray from './api/currency-request';
import handleResponse from './api/handle-response';
import Form from './components/form';
import createSpinner from './components/spinner';
import { ConvertRecord } from './interfaces';

export default class Main {

  currencyData: Array<ConvertRecord>;

  form: Form;

  startApp() {
    const spinner = createSpinner();
    document.body.append(spinner);
    this.form = new Form();
    this.form.createFormComponents();
    Promise.all(createPromiseArray()).then((response) => {
      spinner.remove();
      console.log(response);
      console.log(handleResponse(response));
      document.body.append(this.form.HTMLForm);
      console.log(this.currencyData);
      this.form.HTMLForm.addEventListener('change', this.recalculationTargetValue);
      this.form.sourceInput.addEventListener('input', this.recalculationTargetValue);
    });
  }

  recalculationTargetValue() {
    console.log('recalc')
  }
}
