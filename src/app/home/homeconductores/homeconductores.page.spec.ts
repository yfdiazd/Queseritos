import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeconductoresPage } from './homeconductores.page';

describe('HomeconductoresPage', () => {
  let component: HomeconductoresPage;
  let fixture: ComponentFixture<HomeconductoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeconductoresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeconductoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
