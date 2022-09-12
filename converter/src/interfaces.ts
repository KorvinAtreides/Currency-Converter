interface ConvertRecord {
  currSrc: string;
  currTrg: string;
  convRate: number;
  revertRate: number;
}

interface ResponseRecord {
  date: string;
  historical: boolean;
  info: {rate: number};
  motd: {msg: string};
  query: {from: string, to: string, amount: number};
  result: number
  success: boolean
}

export { ConvertRecord, ResponseRecord}