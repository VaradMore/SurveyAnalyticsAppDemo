import { TestBed } from '@angular/core/testing';

import { SurveyJSService } from './survey-js.service';

describe('SurveyJSService', () => {
  let service: SurveyJSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyJSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
