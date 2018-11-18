import { from, BehaviorSubject } from 'rxjs';

import { Inject, Component, OnInit, Input, HostBinding, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
                  (click)="onPlaceRequest()">
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
                  *ngIf="request.status == requestStatus.Pending"
                  color="primary">
                  Pending
                </button>
                <button
                  mat-stroked-button
                  (click)="selectedTab = 1"
                  *ngIf="request.status == requestStatus.Fulfilled"
                  color="primary">
                  Fulfilled
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
                <a
                  href="{{ responseSet.csvPath }}"
                  target="_blank"
                  mat-stroked-button
                  color="primary">
                  View
                </a>
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
  @Output() request = new EventEmitter<boolean>(true);

  private newRequest = new Request();

  requestStatus = RequestStatus;

  selectedTab = 0;
  totalCustomerCount: number | null = null;
  insureeTrackingShare: number | null = null;
  responseSets = new BehaviorSubject<ResponseSet[]>([]);
  requests = new BehaviorSubject<Request[]>([]);

  constructor(private data: DataService, private matDialog: MatDialog) {}

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
    await this.updateStreamData();
  }

  async updateStreamData() {
    this.responseSets.next(await this.data.getResponseSetsForStreamName(this.stream.name).toPromise());
    this.requests.next(await this.data.getRequestsForStreamName(this.stream.name).toPromise());
  }

  private async getPercentage(): Promise<number> {
    this.totalCustomerCount = await this.data.getTotalCustomerCount().toPromise();
    return 100 / this.totalCustomerCount * this.stream.insureesTracking;
  }


  /* Placing new request shit */

  onPlaceRequest(): void {
    this.newRequest.streamName = this.stream.name;
    this.newRequest.spendTokens = 0;
    this.newRequest.targetSampleSize = 0;

    const dialogRef = this.matDialog.open(DataRequestDialog, {
      minWidth: '70vw',
      data: { requestDraft: this.newRequest },
    });

    dialogRef.afterClosed().subscribe((request: Request) => {
      if (request) {
        this.data.requestData(this.stream.name, request.targetSampleSize, request.spendTokens).
        subscribe(async (data) => {
          // Reset proof draft
          this.newRequest = new Request();
          this.newRequest.streamName = this.stream.name;
          this.newRequest.spendTokens = 0;
          this.newRequest.targetSampleSize = 0;

          setTimeout(async () => {
            await this.updateStreamData();
          }, 300);
          setTimeout(async () => {
            await this.updateStreamData();
          }, 5000);
        });
      }
    });
  }
}




@Component({
  template: `
    <h1 mat-dialog-title>
      Offer to purchase data: {{ data.requestDraft.streamName }}
    </h1>
    <mat-dialog-content>
      <mat-form-field>
        <input matInput
          type="number"
          required
          (ngModelChange)="targetSampleSizeChanged($event)"
          [(ngModel)]="data.requestDraft.targetSampleSize"
          placeholder="Target sample size">
        <mat-hint>Cost: {{ data.requestDraft.spendTokens }} tokens</mat-hint>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button
        mat-button
        (click)="onNoClick()">Close</button>
      <button
        mat-raised-button
        color="primary"
        [mat-dialog-close]="data.requestDraft"
        [disabled]="data.requestDraft.targetSampleSize == 0"
        cdkFocusInitial>Request data purchase</button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-content {
      display: flex;
      flex-flow: column nowrap;
    }
  `],
})
export class DataRequestDialog {
  constructor(
    private dataSvc: DataService,
    private dialogRef: MatDialogRef<DataRequestDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { requestDraft: Request }) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  targetSampleSizeChanged($event): void {
    console.debug(`Checking cost for ${event}`);
    this.dataSvc.getRequestCost(this.data.requestDraft.streamName, $event).subscribe(({ cost }) => {
      this.data.requestDraft.spendTokens = cost;
    });
  }

}
