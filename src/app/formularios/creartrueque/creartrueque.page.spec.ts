import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreartruequePage } from './creartrueque.page';

describe('CreartruequePage', () => {
  let component: CreartruequePage;
  let fixture: ComponentFixture<CreartruequePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreartruequePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreartruequePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
