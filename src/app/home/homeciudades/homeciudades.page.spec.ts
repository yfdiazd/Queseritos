import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeciudadesPage } from './homeciudades.page';

describe('HomeciudadesPage', () => {
  let component: HomeciudadesPage;
  let fixture: ComponentFixture<HomeciudadesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeciudadesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeciudadesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
