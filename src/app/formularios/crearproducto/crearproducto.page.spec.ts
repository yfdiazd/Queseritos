import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearproductoPage } from './crearproducto.page';

describe('CrearproductoPage', () => {
  let component: CrearproductoPage;
  let fixture: ComponentFixture<CrearproductoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearproductoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearproductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
