export class ResponseSet {
  requestId: string;
  responderCount: number;
  csvPath: string;
  timestamp: string;

  public static fromResp(data: any): ResponseSet {
    let obj = new ResponseSet();

    obj.requestId = data.requestId;
    obj.responderCount = data.responderCount;
    obj.csvPath = data.csvPath;
    obj.timestamp = data.timestamp;

    return obj;
  }
}
