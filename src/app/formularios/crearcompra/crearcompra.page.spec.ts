import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearcompraPage } from './crearcompra.page';

describe('CrearcompraPage', () => {
  let component: CrearcompraPage;
  let fixture: ComponentFixture<CrearcompraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearcompraPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearcompraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
