import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HometipotruequePage } from './hometipotrueque.page';

describe('HometipotruequePage', () => {
  let component: HometipotruequePage;
  let fixture: ComponentFixture<HometipotruequePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HometipotruequePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HometipotruequePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
