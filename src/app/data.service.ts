import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Stream } from '@bt/stream';
import { Request, RequestStatus } from '@bt/request';
import { ResponseSet } from '@bt/response-set';


const ENDPOINT = '';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getStreams(): Observable<Stream[]> {
    return of([
      Stream.fromResp({
        name: "Steps",
        insureesTracking: 4000,
        enabled: true,
        newDataAvailable: true,
      }),
      Stream.fromResp({
        name: "Smoking",
        insureesTracking: 2000,
        enabled: false,
        newDataAvailable: false,
      }),
    ]).pipe(delay(100));

    // return this.http.get(`${ENDPOINT}/streams`).pipe(map((resp: any) => {
    //   console.debug("Getting streams");
    //   return resp.streams.map(item => {
    //     return Stream.fromResp(item);
    //   });
    // }));
  }

  getTotalCustomerCount(): Observable<number> {
    return of(5000).pipe(delay(1000));
  }

  getRequestsForStreamName(streamName: string): Observable<Request[]> {
    return of([
      Request.fromResp({
        id: 'abc',
        status: RequestStatus.Fulfilled,
        streamName: 'Steps',
        timestamp: 'Today',
        targetSampleSize: 2000,
      }),
    ]).pipe(delay(300));
  }

  getResponseSetsForStreamName(streamName: string): Observable<ResponseSet[]> {
    return of([
      ResponseSet.fromResp({
        requestId: 'abc',
        responderCount: 1663,
        timestamp: '1 week ago',
        csvPath: 'https://www.google.com/',
      }),
    ]).pipe(delay(200));
  }
}
