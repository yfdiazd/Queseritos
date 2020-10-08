import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeclientesPage } from './homeclientes.page';

describe('HomeclientesPage', () => {
  let component: HomeclientesPage;
  let fixture: ComponentFixture<HomeclientesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeclientesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeclientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
