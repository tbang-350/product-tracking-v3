import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorReportComponent } from './contractor-report.component';

describe('ContractorReportComponent', () => {
  let component: ContractorReportComponent;
  let fixture: ComponentFixture<ContractorReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractorReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
