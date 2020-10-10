import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeestadoquesoPage } from './homeestadoqueso.page';

describe('HomeestadoquesoPage', () => {
  let component: HomeestadoquesoPage;
  let fixture: ComponentFixture<HomeestadoquesoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeestadoquesoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeestadoquesoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
