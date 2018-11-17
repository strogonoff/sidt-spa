import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamResultsetComponent } from './stream-resultset.component';

describe('StreamResultsetComponent', () => {
  let component: StreamResultsetComponent;
  let fixture: ComponentFixture<StreamResultsetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamResultsetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamResultsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
