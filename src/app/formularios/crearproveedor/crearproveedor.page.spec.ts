import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearproveedorPage } from './crearproveedor.page';

describe('CrearproveedorPage', () => {
  let component: CrearproveedorPage;
  let fixture: ComponentFixture<CrearproveedorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearproveedorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearproveedorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
