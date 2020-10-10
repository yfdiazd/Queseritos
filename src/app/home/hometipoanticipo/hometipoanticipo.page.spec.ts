import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HometipoanticipoPage } from './hometipoanticipo.page';

describe('HometipoanticipoPage', () => {
  let component: HometipoanticipoPage;
  let fixture: ComponentFixture<HometipoanticipoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HometipoanticipoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HometipoanticipoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
