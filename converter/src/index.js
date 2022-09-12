import currencyRequest from "./api/currency-request";

console.log('working');

async function test() {
  const my = await currencyRequest();
  console.log(my.data)
}

test()