import { TestBed } from '@angular/core/testing';

import { NutritionAPIService} from 'src/app/services/NutritionAPIService'

describe('RecipeAPIService', () => {
  let service: NutritionAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NutritionAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
