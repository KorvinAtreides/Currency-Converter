const FORM_STYLE = 'form';
const FORM_TITLE_TEXT = 'Currency Converter';
const FORM_TITLE_STYLE = 'form--title';
const FORM_CONTENT_WRAPPER_STYLE = 'form--content-wrapper';
const FORM_INPUT_STYLE = 'form--input';
const FORM_INPUT_PLACEHOLDER_TEXT = 'Enter Amount';
const FORM_CURRENCY_OPTIONS_STYLE = 'form--currency-options';
const CURRENCIES_LIST = ['RUS', 'BYN', 'USD', 'EUR'];
const MAX_DIGITS = 8;

function createSelect() {
  const select = document.createElement('select');
  select.classList.add(FORM_CURRENCY_OPTIONS_STYLE);
  CURRENCIES_LIST.forEach((currency) => {
    const option = document.createElement('option');
    option.textContent = currency;
    select.append(option);
  });
  return select;
}

function validateInput(input: HTMLInputElement) {
  if(Number(input.value) >= Number(input.max)) input.value = input.max;
  if(Number(input.value) <= 0) input.value = '0';
  input.value = String(Number(input.value));
}


export default function createForm() {
  const form = document.createElement('form');
  form.classList.add(FORM_STYLE);
  const title = document.createElement('h3');
  title.classList.add(FORM_TITLE_STYLE);
  title.textContent = FORM_TITLE_TEXT;

  const sourceWrapper = document.createElement('div');
  sourceWrapper.classList.add(FORM_CONTENT_WRAPPER_STYLE);
  const sourceInput = document.createElement('input');
  sourceInput.classList.add(FORM_INPUT_STYLE);
  sourceInput.placeholder = FORM_INPUT_PLACEHOLDER_TEXT;
  sourceInput.type = 'number';
  sourceInput.min = '0';
  sourceInput.max = String(Math.floor(10 ** MAX_DIGITS - 1));
  sourceInput.addEventListener('input', () => {
    validateInput(sourceInput);
  });
  const sourceCurrency = createSelect();
  sourceWrapper.append(sourceInput, sourceCurrency);

  const targetWrapper = document.createElement('div');
  targetWrapper.classList.add(FORM_CONTENT_WRAPPER_STYLE);
  const targetInput = document.createElement('input');
  targetInput.classList.add(FORM_INPUT_STYLE);
  targetInput.readOnly = true;
  const targetCurrency = createSelect();
  targetWrapper.append(targetInput, targetCurrency);

  form.append(title, sourceWrapper, targetWrapper);
  return form;
}