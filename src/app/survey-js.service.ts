import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SurveyJSService {

  constructor(
    private http: HttpClient
  ) { }

  getSurveyJson(): any {
    // return this.http.get('http://apscredity02dev.icc.crifnet.com:8085/surveyJson');
    // return this.http.get('http://localhost:8085/surveyJson');
    return this.http.get('https://crifsurvey.free.beeceptor.com/surveyJson');
  }

  getSurveyResult(): any {
    return this.http.get('https://crifsurvey.free.beeceptor.com/surveyResult');
  }
}
