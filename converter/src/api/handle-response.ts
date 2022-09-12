import { ConvertRecord } from "../interfaces";

const RECORD_TAG = '<Currency>';
const END_RECORD_TAG = '</Currency>';
const CURRENCY_SOURCE_TAG = '<CurrSrc>';
const END_CURRENCY_SOURCE_TAG = '</CurrSrc>';
const CURRENCY_TARGET_TAG = '<CurrTrg>';
const END_CURRENCY_TARGET_TAG = '</CurrTrg>';
const CONVERSION_RATE_TAG = '<ConvRate>';
const END_CONVERSION_RATE_TAG = '</ConvRate>';

function filterRepeatRecords (currencyDataArray: Array<ConvertRecord>) {
  const filteredArray: Array<ConvertRecord> = [];
  currencyDataArray.forEach((record) => {
    if (!filteredArray.some(
      (filteredRecord) => filteredRecord.currSrc === record.currSrc 
      && filteredRecord.currTrg === record.currTrg)
    ) {
      filteredArray.push(record);
    }
  });
  return filteredArray;
}

function convertFromXmlToArray(currencyData: string) {
  let copyCurrencyData = currencyData;
  const currencyDataArray = [];
  while(copyCurrencyData.includes(RECORD_TAG)) {
    const startPos = copyCurrencyData.indexOf(RECORD_TAG) + RECORD_TAG.length;
    const endPos = copyCurrencyData.indexOf(END_RECORD_TAG);
    const record = copyCurrencyData.slice(startPos, endPos);

    const startPosSource = record.indexOf(CURRENCY_SOURCE_TAG) + CURRENCY_SOURCE_TAG.length;
    const endPosSource = record.indexOf(END_CURRENCY_SOURCE_TAG);
    const startPosTarget = record.indexOf(CURRENCY_TARGET_TAG) + CURRENCY_TARGET_TAG.length;
    const endPosTarget = record.indexOf(END_CURRENCY_TARGET_TAG);
    const startPosRate = record.indexOf(CONVERSION_RATE_TAG) + CONVERSION_RATE_TAG.length;
    const endPosRate = record.indexOf(END_CONVERSION_RATE_TAG);

    const converseRecord: ConvertRecord = {
      currSrc: record.slice(startPosSource, endPosSource),
      currTrg: record.slice(startPosTarget, endPosTarget),
      convRate: record.slice(startPosRate, endPosRate),
    };

    currencyDataArray.push(converseRecord);
    copyCurrencyData = copyCurrencyData.slice(endPos + END_RECORD_TAG.length);
  }
  return filterRepeatRecords(currencyDataArray);
}

export default convertFromXmlToArray;