import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardlistaclientesPage } from './cardlistaclientes.page';

describe('CardlistaclientesPage', () => {
  let component: CardlistaclientesPage;
  let fixture: ComponentFixture<CardlistaclientesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardlistaclientesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardlistaclientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
