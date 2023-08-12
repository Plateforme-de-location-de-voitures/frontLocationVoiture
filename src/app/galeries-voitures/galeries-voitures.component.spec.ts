import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriesVoituresComponent } from './galeries-voitures.component';

describe('GaleriesVoituresComponent', () => {
  let component: GaleriesVoituresComponent;
  let fixture: ComponentFixture<GaleriesVoituresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaleriesVoituresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GaleriesVoituresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
