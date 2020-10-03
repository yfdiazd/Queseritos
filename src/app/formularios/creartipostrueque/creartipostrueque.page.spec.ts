import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreartipostruequePage } from './creartipostrueque.page';

describe('CreartipostruequePage', () => {
  let component: CreartipostruequePage;
  let fixture: ComponentFixture<CreartipostruequePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreartipostruequePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreartipostruequePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
