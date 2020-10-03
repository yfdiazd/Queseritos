import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreartiposidentificacionPage } from './creartiposidentificacion.page';

describe('CreartiposidentificacionPage', () => {
  let component: CreartiposidentificacionPage;
  let fixture: ComponentFixture<CreartiposidentificacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreartiposidentificacionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreartiposidentificacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
