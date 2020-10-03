import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearclientesPage } from './crearclientes.page';

describe('CrearclientesPage', () => {
  let component: CrearclientesPage;
  let fixture: ComponentFixture<CrearclientesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearclientesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearclientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
