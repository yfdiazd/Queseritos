import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreartiposanticipoPage } from './creartiposanticipo.page';

describe('CreartiposanticipoPage', () => {
  let component: CreartiposanticipoPage;
  let fixture: ComponentFixture<CreartiposanticipoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreartiposanticipoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreartiposanticipoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
