import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetallelotePage } from './detallelote.page';

describe('DetallelotePage', () => {
  let component: DetallelotePage;
  let fixture: ComponentFixture<DetallelotePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallelotePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetallelotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
