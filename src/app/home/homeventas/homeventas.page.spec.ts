import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeventasPage } from './homeventas.page';

describe('HomeventasPage', () => {
  let component: HomeventasPage;
  let fixture: ComponentFixture<HomeventasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeventasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeventasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
