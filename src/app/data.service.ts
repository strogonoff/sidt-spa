import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

import { Stream } from '@bt/stream';
import { Request, RequestStatus } from '@bt/request';
import { ResponseSet } from '@bt/response-set';


const STORAGE_KEY = 'sidt-local';
const ENDPOINT = '';
const CSV_PATH = 'http://sidt.dev.anton.strogonoff.name/assets/dataset-steps.json';


@Injectable({
  providedIn: 'root',
})
export class DataService {
  public mock: boolean = false;

  constructor(private http: HttpClient, @Inject(SESSION_STORAGE) private storage: StorageService) {
    this.mock = false;
  }

  setUseMock(really: boolean) {
    this.mock = really;

    if (really) {
      this.storage.set('streams', [
        {
          name: "Steps",
          insureesTracking: 4000,
          enabled: true,
          newDataAvailable: true,
        },
        {
          name: "Smoking",
          insureesTracking: 2000,
          enabled: false,
          newDataAvailable: false,
        },
      ]);
    } else {
      this.storage.set('streams', null);
      this.storage.set('requests-for-Steps', null);
      this.storage.set('responsesets-for-Steps', null);
    }
  }

  requestData(
      streamName: string,
      targetSampleSize: number,
      spendTokens: number): Observable<{ ok: boolean }> {
    if (this.mock) {
      let requests = this.storage.get(`requests-for-${streamName}`) || [];
      let request = {
        id: Math.random().toString(36).substring(7),
        status: RequestStatus.Pending,
        streamName: streamName,
        timestamp: `${new Date().toLocaleDateString('en-US')} ${new Date().toLocaleTimeString('en-US')}`,
        targetSampleSize: targetSampleSize,
        spendTokens: spendTokens,
      };
      requests.push(request),

      this.storage.set(`requests-for-${streamName}`, requests);

      window.setTimeout(() => {
        let requests = this.storage.get(`requests-for-${streamName}`) || [];
        let ourRequest = requests.find((req) => { return req.id == request.id });
        let idx = requests.indexOf(ourRequest);
        requests[idx].status = RequestStatus.Fulfilled;

        this.storage.set(`requests-for-${streamName}`, requests);

        let responsesets = this.storage.get(`responsesets-for-${streamName}`) || [];
        let responseset = {
          requestId: request.id,
          responderCount: Math.floor(Math.random() * 1000),
          timestamp: `${new Date().toLocaleDateString('en-US')} ${new Date().toLocaleTimeString('en-US')}`,
          csvPath: CSV_PATH,
        };
        responsesets.push(responseset);

        this.storage.set(`responsesets-for-${streamName}`, responsesets);

        let streams = this.storage.get('streams') || [];
        let ourStream = streams.find((stream) => { stream.name == streamName });
        if (ourStream) {
          ourStream.newDataAvailable = true;
        }
      }, 1500);
    }
    return of({ ok: true }).pipe(delay(100));
  }

  getStreams(): Observable<Stream[]> {
    if (this.mock) {
      const streams = this.storage.get('streams') || [];
      return of(streams.map(obj => Stream.fromResp(obj))).pipe(delay(100));
    }

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
    if (this.mock) {
      const requests = this.storage.get(`requests-for-${streamName}`) || [];
      return of(requests.map(obj => Request.fromResp(obj))).pipe(delay(300));
    }
  }

  getResponseSetsForStreamName(streamName: string): Observable<ResponseSet[]> {
    if (this.mock) {
      const responses = this.storage.get(`responsesets-for-${streamName}`) || [];
      return of(responses.map(obj => ResponseSet.fromResp(obj))).pipe(delay(600));
    }
  }

  getRequestCost(streamName: string, targetSampleSize: number): Observable<{ cost: number }> {
    return of({ cost: 40 }).pipe(delay(1000));
  }
}
