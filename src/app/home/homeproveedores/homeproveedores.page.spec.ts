import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeproveedoresPage } from './homeproveedores.page';

describe('HomeproveedoresPage', () => {
  let component: HomeproveedoresPage;
  let fixture: ComponentFixture<HomeproveedoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeproveedoresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeproveedoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
