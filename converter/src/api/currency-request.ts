async function currencyRequest() {
  const corsUrl = 'https://cors-ignorer.herokuapp.com';
  const baseUrl = 'https://belapb.by/CashConvRatesDaily.php';
  const date = getDate();
  const response = await fetch(`${corsUrl}/${baseUrl}?ondate=${date}`);
  return response.json();
}

function getDate() {
  const today = new Date();
  return `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
}

export default currencyRequest;
