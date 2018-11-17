export class Stream {
  name: string;
  enabled: boolean;  // Requestable
  insureesTracking: number;  // Portion of customers who provide the data now
  newDataAvailable: boolean;  // Whether there is any data collected from tracking insurees

  public static fromResp(data: any): Stream {
    let obj = new Stream();

    obj.name = data.name;
    obj.enabled = data.enabled;
    obj.insureesTracking = data.insureesTracking;
    obj.newDataAvailable = data.newDataAvailable;

    return obj;
  }
}
