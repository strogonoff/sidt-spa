import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Stream } from '@bt/stream';

@Component({
  selector: 'bt-stream-detail',
  template: `
    <p>
      <span class="name">{{ stream.name }}</span>
      <span class="subscription">{{ stream.subscribed }}</span>
    </p>
  `,
  styles: []
})
export class StreamDetailComponent implements OnInit {
  @Input() stream: Stream;
  @Output() request = new EventEmitter<{ confirmed: boolean }>();
  noDataToPurchase: number;

  constructor() {}
  ngOnInit() {
  }
}
