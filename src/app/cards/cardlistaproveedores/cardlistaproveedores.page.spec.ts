import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardlistaproveedoresPage } from './cardlistaproveedores.page';

describe('CardlistaproveedoresPage', () => {
  let component: CardlistaproveedoresPage;
  let fixture: ComponentFixture<CardlistaproveedoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardlistaproveedoresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardlistaproveedoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
