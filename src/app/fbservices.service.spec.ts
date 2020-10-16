import { from } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { FBservicesService } from './fbServices.service';
import { Camera } from '@ionic-native/camera'


providers:[
   Camera
]

describe('FBservicesService', () => {
     beforeEach(()=> TestBed.configureTestingModule({}));

     it('should be created', ()=>{
        const service: FBservicesService = TestBed.get(FBservicesService);
        expect(service).toBeTruthy();
     });
} )