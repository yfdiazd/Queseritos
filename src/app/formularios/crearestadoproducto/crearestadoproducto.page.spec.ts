import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearestadoproductoPage } from './crearestadoproducto.page';

describe('CrearestadoproductoPage', () => {
  let component: CrearestadoproductoPage;
  let fixture: ComponentFixture<CrearestadoproductoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearestadoproductoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearestadoproductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
