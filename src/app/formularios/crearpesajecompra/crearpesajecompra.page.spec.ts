import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {
  FormBuilder,
  FormsModule, 
  ReactiveFormsModule, 
  FormControl, 
  FormGroup, 
  Validators, 
  FormArray} from '@angular/forms';
import { CrearpesajecompraPage } from './crearpesajecompra.page';

describe('CrearpesajecompraPage', () => {
  let component: CrearpesajecompraPage;
  let fixture: ComponentFixture<CrearpesajecompraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearpesajecompraPage ],
      imports:      
       [IonicModule.forRoot()],
       
    }).compileComponents();

    fixture = TestBed.createComponent(CrearpesajecompraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
