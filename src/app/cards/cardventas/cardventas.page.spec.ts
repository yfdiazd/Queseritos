import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardventasPage } from './cardventas.page';

describe('CardventasPage', () => {
  let component: CardventasPage;
  let fixture: ComponentFixture<CardventasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardventasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardventasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
