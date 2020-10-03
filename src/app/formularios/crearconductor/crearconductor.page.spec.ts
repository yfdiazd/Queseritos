import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearconductorPage } from './crearconductor.page';

describe('CrearconductorPage', () => {
  let component: CrearconductorPage;
  let fixture: ComponentFixture<CrearconductorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearconductorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearconductorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
