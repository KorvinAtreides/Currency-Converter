import { CURRENCIES_LIST } from "../constants";

const FORM_STYLE = 'form';
const FORM_TITLE_TEXT = 'Currency Converter';
const FORM_TITLE_STYLE = 'form--title';
const FORM_CONTENT_WRAPPER_STYLE = 'form--content-wrapper';
const FORM_INPUT_STYLE = 'form--input';
const FORM_INPUT_PLACEHOLDER_TEXT = 'Enter Amount';
const FORM_CURRENCY_OPTIONS_STYLE = 'form--currency-options';
const MAX_DIGITS = 8;

function validateInput(input: HTMLInputElement) {
  if(Number(input.value) >= Number(input.max)) input.value = input.max;
  if(Number(input.value) <= 0) input.value = '0';
  input.value = String(Number(input.value));
}

export default class Form {
  HTMLForm: HTMLFormElement;

  sourceInput: HTMLInputElement;

  selectSourceCurrency: HTMLSelectElement;

  selectTargetCurrency: HTMLSelectElement;

  targetInput: HTMLInputElement;

  constructor() {
    this.HTMLForm = document.createElement('form');
    this.HTMLForm.classList.add(FORM_STYLE);
  }

  switchLocale() {
    const lng = (navigator.languages && navigator.languages[0]) || navigator.language;
    switch (lng) {
      case 'be':
      case 'be-BY':
        this.selectSourceCurrency.value = 'BYN';
        break;
      case 'ru':
      case 'ru-BY':
      case 'ru-KG ':
      case 'ru-KZ':
      case 'ru-MD ':
      case 'ru-RU':
        this.selectSourceCurrency.value = 'RUB';
        break;
      case 'en-GB':
        this.selectSourceCurrency.value = 'GBP';
        break;
      case 'br-FR':
      case 'ca-ES':
      case 'cs-CZ':
      case 'da-DK':
      case 'de':
      case 'de-DE':
      case 'el-GR':
      case 'en-150':
      case 'es-ES':
      case 'fi-FI':
      case 'fr-BE':
      case 'fr-CH':
      case 'fr-FR':
      case 'hu-HU':
      case 'it-IT':
        this.selectSourceCurrency.value = 'EUR';
        break;
      default:
        this.selectSourceCurrency.value = 'USD';
        break;
    }
  }

  createFormComponents() {
    const title = document.createElement('h3');
    title.classList.add(FORM_TITLE_STYLE);
    title.textContent = FORM_TITLE_TEXT;

    const sourceWrapper = document.createElement('div');
    sourceWrapper.classList.add(FORM_CONTENT_WRAPPER_STYLE);
    this.sourceInput = document.createElement('input');
    this.sourceInput.classList.add(FORM_INPUT_STYLE);
    this.sourceInput.placeholder = FORM_INPUT_PLACEHOLDER_TEXT;
    this.sourceInput.type = 'number';
    this.sourceInput.min = '0';
    this.sourceInput.max = String(Math.floor(10 ** MAX_DIGITS - 1));
    this.sourceInput.addEventListener('input', () => {
      validateInput(this.sourceInput);
    });
    this.selectSourceCurrency = Form.createSelect();
    sourceWrapper.append(this.sourceInput, this.selectSourceCurrency);

    const targetWrapper = document.createElement('div');
    targetWrapper.classList.add(FORM_CONTENT_WRAPPER_STYLE);
    this.targetInput = document.createElement('input');
    this.targetInput.classList.add(FORM_INPUT_STYLE);
    this.targetInput.readOnly = true;
    this.targetInput.style.cursor = 'not-allowed';
    this.selectTargetCurrency = Form.createSelect();
    targetWrapper.append(this.targetInput, this.selectTargetCurrency);

    this.switchLocale();
    this.selectTargetCurrency.value = this.selectSourceCurrency.value === 'USD' ? 'EUR' : 'USD';
    this.HTMLForm.append(title, sourceWrapper, targetWrapper);
  }

  static createSelect() {
    const select = document.createElement('select');
    select.classList.add(FORM_CURRENCY_OPTIONS_STYLE);
    CURRENCIES_LIST.forEach((currency) => {
      const option = document.createElement('option');
      option.textContent = currency;
      select.append(option);
    });
    return select;
  }
}
