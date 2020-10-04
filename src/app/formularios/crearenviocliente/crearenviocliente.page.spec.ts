import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearenvioclientePage } from './crearenviocliente.page';

describe('CrearenvioclientePage', () => {
  let component: CrearenvioclientePage;
  let fixture: ComponentFixture<CrearenvioclientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearenvioclientePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearenvioclientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
