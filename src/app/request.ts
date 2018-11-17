export enum RequestStatus {
  Pending = "PENDING",
  Fulfilled = "FULFILLED",
}

export class Request {
  streamName: string;
  id: string;
  status: RequestStatus;
  timestamp: string;
  targetSampleSize: number;
  spendTokens: number;

  public static fromResp(data: any): Request {
    let obj = new Request();

    obj.streamName = data.streamName;
    obj.id = data.id;
    obj.status = <RequestStatus>data.status;
    console.debug(obj.status);
    obj.timestamp = data.timestamp;
    obj.targetSampleSize = data.targetSampleSize;
    obj.spendTokens = data.spendTokens;

    return obj;
  }
}
