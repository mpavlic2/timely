import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelyprojectlistComponent } from './timelyprojectlist.component';

describe('TimelyprojectlistComponent', () => {
  let component: TimelyprojectlistComponent;
  let fixture: ComponentFixture<TimelyprojectlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelyprojectlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelyprojectlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
