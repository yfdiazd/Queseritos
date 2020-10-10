import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardcomprasPage } from './cardcompras.page';

describe('CardcomprasPage', () => {
  let component: CardcomprasPage;
  let fixture: ComponentFixture<CardcomprasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardcomprasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardcomprasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
