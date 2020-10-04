import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearciudadPage } from './crearciudad.page';

describe('CrearciudadPage', () => {
  let component: CrearciudadPage;
  let fixture: ComponentFixture<CrearciudadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearciudadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearciudadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
