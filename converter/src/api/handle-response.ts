import { NUMBER_OF_SIGNIFICANT_DIGITS } from "../constants";
import { ConvertRecord, ResponseRecord } from "../interfaces";

function handleResponse(currencyData: Array<ResponseRecord>) {
  const currencyDataArray:  Array<ConvertRecord>= [];
  currencyData.forEach((record) => {
    const convertedRecord: ConvertRecord = {
      currSrc: record.query.from,
      currTrg: record.query.to,
      convRate: record.result,
      revertRate: Math.round(10 ** NUMBER_OF_SIGNIFICANT_DIGITS / record.result) / 10 ** NUMBER_OF_SIGNIFICANT_DIGITS,
    }
    currencyDataArray.push(convertedRecord);
  });

  return currencyDataArray;
}

export default handleResponse;