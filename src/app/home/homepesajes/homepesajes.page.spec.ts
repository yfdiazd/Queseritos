import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomepesajesPage } from './homepesajes.page';

describe('HomepesajesPage', () => {
  let component: HomepesajesPage;
  let fixture: ComponentFixture<HomepesajesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepesajesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomepesajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
