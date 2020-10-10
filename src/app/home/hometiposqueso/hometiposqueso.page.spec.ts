import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HometiposquesoPage } from './hometiposqueso.page';

describe('HometiposquesoPage', () => {
  let component: HometiposquesoPage;
  let fixture: ComponentFixture<HometiposquesoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HometiposquesoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HometiposquesoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
