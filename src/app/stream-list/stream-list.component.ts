import { BehaviorSubject, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Stream } from '@bt/stream';
import { DataService } from '@bt/data.service';

@Component({
  selector: 'bt-stream-list',
  template: `
    <h1 class="mat-headline">Data streams</h1>

    <mat-accordion class="list">
      <bt-stream-row
        *ngFor="let stream of streamsObservable | async as streams; index as i; first as isFirst"
        (click)="selectedStream = stream"
        (request)="requestStream(stream, $event.confirmed)"
        [stream]="stream"></bt-stream-row>
    </mat-accordion>
  `,
  styles: []
})
export class StreamListComponent implements OnInit {
  streamsObservable = new BehaviorSubject<Stream[]>([]);
  selectedStream: null | Stream;

  constructor(private data: DataService) {}

  ngOnInit() {
    this.data.getStreams().subscribe(streams => {
      this.streamsObservable.next(streams);
    });
  }

  requestStream(stream, confirmed) {
    console.debug(stream, confirmed);
  }

}
