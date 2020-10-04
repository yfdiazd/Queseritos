import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearanticiposPage } from './crearanticipos.page';

describe('CrearanticiposPage', () => {
  let component: CrearanticiposPage;
  let fixture: ComponentFixture<CrearanticiposPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearanticiposPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearanticiposPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
