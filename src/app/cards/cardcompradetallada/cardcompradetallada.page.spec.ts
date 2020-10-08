import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardcompradetalladaPage } from './cardcompradetallada.page';

describe('CardcompradetalladaPage', () => {
  let component: CardcompradetalladaPage;
  let fixture: ComponentFixture<CardcompradetalladaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardcompradetalladaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardcompradetalladaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
