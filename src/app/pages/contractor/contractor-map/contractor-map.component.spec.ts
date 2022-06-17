import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorMapComponent } from './contractor-map.component';

describe('ContractorMapComponent', () => {
  let component: ContractorMapComponent;
  let fixture: ComponentFixture<ContractorMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractorMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
