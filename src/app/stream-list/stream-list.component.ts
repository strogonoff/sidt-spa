import { filter } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';

import { Stream } from '@bt/stream';
import { DataService } from '@bt/data.service';


@Component({
  selector: 'bt-stream-list',
  template: `
    <h1 class="mat-headline">Wellness</h1>

    <mat-accordion class="list">
      <bt-stream-row
        *ngFor="let stream of streamsObservable | async as streams; index as i; first as isFirst"
        (click)="selectedStream = stream"
        (request)="requestData(stream)"
        [stream]="stream"></bt-stream-row>
    </mat-accordion>
  `,
  styles: [`
    :host {
      padding-bottom: 2em;
    }
  `]
})
export class StreamListComponent implements OnInit {
  streamsObservable = new BehaviorSubject<Stream[]>([]);
  selectedStream: null | Stream;

  constructor(private data: DataService, private router: Router) {}

  ngOnInit() {
    this.router.events.
      pipe(filter(event => event instanceof ActivationEnd && event.snapshot.children.length == 0) ).
      subscribe((event: ActivationEnd) => {
        let data = event.snapshot.data;
        if (data.useMockStorage) {
          this.data.setUseMock(true);
        } else {
          this.data.setUseMock(false);
        }

        this.data.getStreams().subscribe(streams => {
          this.streamsObservable.next(streams);
        });
      });
  }

  requestData(stream, confirmed) {
    console.debug(stream, confirmed);
  }

}
