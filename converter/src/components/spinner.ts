const SPINNER_IMAGE_SOURCE = './img/spinner.png';
const SPINNER_IMAGE_STYLE = 'spinIcon';

export default function createSpinner() {
  const spinner = document.createElement('img');
  spinner.src = SPINNER_IMAGE_SOURCE;
  spinner.classList.add(SPINNER_IMAGE_STYLE);
  return spinner;
}