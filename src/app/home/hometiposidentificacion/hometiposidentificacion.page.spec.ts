import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HometiposidentificacionPage } from './hometiposidentificacion.page';

describe('HometiposidentificacionPage', () => {
  let component: HometiposidentificacionPage;
  let fixture: ComponentFixture<HometiposidentificacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HometiposidentificacionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HometiposidentificacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
