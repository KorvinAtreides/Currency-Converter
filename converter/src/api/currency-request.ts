import { CURRENCIES_LIST } from "../constants";
import { ResponseRecord } from "../interfaces";

const BASE_URL = 'https://api.exchangerate.host/convert';

function createPromiseArray() {
  const promiseArray: Array<Promise<ResponseRecord>> = [];
  for (let i = 0; i < CURRENCIES_LIST.length; i++) {
    for (let j = i + 1; j < CURRENCIES_LIST.length; j++) {
      const promise: Promise<ResponseRecord> = new Promise((res) => {
        let result;
        const requestURL = `${BASE_URL}?from=${CURRENCIES_LIST[i]}&to=${CURRENCIES_LIST[j]}`;
        var request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();
        request.onload = function() {
          var response: ResponseRecord = request.response;
          result = response;
          res(result);
        }
      });
      promiseArray.push(promise);
    }
  }
  return promiseArray;
}

export default createPromiseArray;
