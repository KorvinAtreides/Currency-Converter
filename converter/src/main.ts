import createPromiseArray from './api/currency-request';
import handleResponse from './api/handle-response';
import Form from './components/form';
import createSpinner from './components/spinner';
import { NUMBER_OF_SIGNIFICANT_DIGITS } from './constants';
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
      this.currencyData = handleResponse(response);
      spinner.remove();
      document.body.append(this.form.HTMLForm);
      this.form.HTMLForm.addEventListener('change', () => this.recalculationTargetValue());
      this.form.sourceInput.addEventListener('input', () => this.recalculationTargetValue());
    });
  }

  recalculationTargetValue() {
    const sourceValue = this.form.sourceInput.value ? Number(this.form.sourceInput.value) : 0;
    const sourceCurrency = this.form.selectSourceCurrency.value;
    const sourceTarget = this.form.selectTargetCurrency.value;
    if (sourceCurrency === sourceTarget) {
      this.form.targetInput.value = String(sourceValue);
      return;
    }
    const [calcRecord] = this.currencyData.filter(
      (record) => record.currSrc === sourceCurrency && record.currTrg === sourceTarget
          || record.currSrc === sourceTarget && record.currTrg === sourceCurrency
    )
    const unroundedNumber = calcRecord.currSrc === sourceCurrency
        ? sourceValue * calcRecord.convRate
        : sourceValue * calcRecord.revertRate;
    const roundedValue = Math.round(unroundedNumber * 10 ** NUMBER_OF_SIGNIFICANT_DIGITS) / 10 ** NUMBER_OF_SIGNIFICANT_DIGITS;
    this.form.targetInput.value = String(roundedValue);
  }
}
