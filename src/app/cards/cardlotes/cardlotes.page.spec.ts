import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardlotesPage } from './cardlotes.page';

describe('CardlotesPage', () => {
  let component: CardlotesPage;
  let fixture: ComponentFixture<CardlotesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardlotesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardlotesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
