import { from, BehaviorSubject } from 'rxjs';

import { Component, OnInit, Input, HostBinding } from '@angular/core';

import { Stream } from '@bt/stream';
import { Request, RequestStatus } from '@bt/request';
import { ResponseSet } from '@bt/response-set';
import { DataService } from '@bt/data.service';

@Component({
  selector: 'bt-stream-row',
  template: `
    <mat-expansion-panel [disabled]="!stream.enabled">
      <mat-expansion-panel-header>
        <mat-panel-title>{{ stream.name }}</mat-panel-title>
        <mat-panel-description>
          <span class="percentage"
            *ngIf="insureeTrackingShare != null"
            matTooltip="{{ this.stream.insureesTracking }} of your {{ this.totalCustomerCount }} insurees are currently tracking this data"
            >{{ insureeTrackingShare }}% coverage</span>
        </mat-panel-description>
      </mat-expansion-panel-header>

      <mat-tab-group [selectedIndex]="selectedTab">
        <mat-tab label="Requests">
          <p *ngIf="!stream.newDataAvailable && (requests | async)?.length < 1 && (responseSets | async)?.length < 1">No data is available yet!</p>

          <mat-list>
            <mat-list-item
                *ngIf="stream.newDataAvailable">
              <div class="full-width" mat-line>
                <span class="notice"
                  *ngIf="stream.newDataAvailable && (requests | async)?.length < 1">Data available</span>
                <span class="notice"
                  *ngIf="(requests | async)?.length > 0">New data!</span>
                <button
                  mat-stroked-button
                  color="primary"
                  (click)="request.emit({ confirmed: true })">
                  Ask to buy
                </button>
              </div>
            </mat-list-item>

            <mat-list-item
                *ngFor="let request of requests | async; last as isLast">
              <div class="full-width" mat-line>
                <span class="notice">Asked {{ request.targetSampleSize }}</span>
                <button
                  mat-stroked-button
                  [disabled]="true"
                  color="primary">
                  Pending
                </button>
              </div>
              <div class="full-width" mat-line>
                <span>{{ request.timestamp }}</span>
              </div>
            </mat-list-item>
          </mat-list>
        </mat-tab>

        <mat-tab label="Response sets" [disabled]="(responseSets | async)?.length < 1">
          <mat-list>
            <mat-list-item
              *ngFor="let responseSet of responseSets | async; last as isLast">
              <div class="full-width" mat-line>
                {{ responseSet.responderCount }} provided data
                <button
                  mat-stroked-button
                  color="primary">
                  View
                </button>
              </div>
              <div class="full-width" mat-line>
                {{ responseSet.timestamp }}
              </div>
            </mat-list-item>
          </mat-list>
        </mat-tab>
      </mat-tab-group>

    </mat-expansion-panel>
  `,
  styles: [`
    mat-tab {
      padding-top: 1em;
    }
    .full-width.mat-line {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
    }
    .notice {
      margin-right: 1em;
    }
    .status {
      margin-right: 1em;
    }
  `]
})
export class StreamRowComponent implements OnInit {
  @Input() stream: Stream;
  @HostBinding('class.enabled') enabled: boolean = false;

  requestStatus = RequestStatus;

  selectedTab = 0;
  totalCustomerCount: number | null = null;
  insureeTrackingShare: number | null = null;
  responseSets = new BehaviorSubject<ResponseSet[]>([]);
  requests = new BehaviorSubject<Request[]>([]);

  constructor(private data: DataService) {}

  async ngOnInit() {
    this.enabled = this.stream.enabled;

    if (this.stream.newDataAvailable) {
      this.selectedTab = 0;
    } else if (this.requests.value.length > 0) {
      this.selectedTab = 1;
    } else {
      this.selectedTab = 0;
    }

    this.insureeTrackingShare = await this.getPercentage();

    this.responseSets.next(await this.data.getResponseSetsForStreamName(this.stream.name).toPromise());
    this.requests.next(await this.data.getRequestsForStreamName(this.stream.name).toPromise());
  }

  private async getPercentage(): Promise<number> {
    this.totalCustomerCount = await this.data.getTotalCustomerCount().toPromise();
    return 100 / this.totalCustomerCount * this.stream.insureesTracking;
  }
}
