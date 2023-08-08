import { OnInit, AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Model } from 'survey-core';
import { VisualizationPanel } from 'survey-analytics';
import { SurveyJSService } from './survey-js.service';

// const surveyJson = {
//   elements: [{
//     name: "satisfaction-score",
//     title: "How would you describe your experience with our produc?",
//     type: "radiogroup",
//     choices: [
//       { value: 5, text: "Fully satisfying" },
//       { value: 4, text: "Generally satisfying" },
//       { value: 3, text: "Neutral" },
//       { value: 2, text: "Rather unsatisfying" },
//       { value: 1, text: "Not satisfying at all" }
//     ],
//     isRequired: true
//   }, {
//     name: "nps-score",
//     title: "On a scale of zero to ten, how likely are you to recommend our product to a friend or colleague?",
//     type: "rating",
//     rateMin: 0,
//     rateMax: 10,
//   }],
//   showQuestionNumbers: "true",
//   completedHtml: "Thank you for your feedback!",
// };

// const surveyResults = [{
//   "satisfaction-score": 5,
//   "nps-score": 10
// }, {
//   "satisfaction-score": 5,
//   "nps-score": 9
// }, {
//   "satisfaction-score": 3,
//   "nps-score": 6
// }, {
//   "satisfaction-score": 3,
//   "nps-score": 6
// }, {
//   "satisfaction-score": 2,
//   "nps-score": 70
// }, {
//   "satisfaction-score": 4,
//   "nps-score": 70
// }];

// const surveyJson = {
//   "title": "Analytics test",
//   "pages": [
//    {
//     "name": "page1",
//     "elements": [
//      {
//       "type": "rating",
//       "name": "star",
//       "title": "Rating Star Test?",
//       "rateType": "stars"
//      },
//      {
//       "type": "checkbox",
//       "name": "checkbox",
//       "title": "Checkbox Test?",
//       "choices": [
//        {
//         "value": "1",
//         "text": "item 1"
//        },
//        {
//         "value": "2",
//         "text": "item 2"
//        },
//        {
//         "value": "3",
//         "text": "item 3"
//        }
//       ]
//      },
//      {
//       "type": "radiogroup",
//       "name": "radioGroup",
//       "title": "Radio button group test?",
//       "choices": [
//        "Item 1",
//        "Item 2",
//        "Item 3"
//       ]
//      },
//      {
//       "type": "boolean",
//       "name": "bool",
//       "title": "Boolean?"
//      },
//      {
//       "type": "ranking",
//       "name": "ranking",
//       "title": "Ranking test?",
//       "choices": [
//        {
//         "value": "1",
//         "text": "Item 1"
//        },
//        {
//         "value": "2",
//         "text": "Item 2"
//        },
//        {
//         "value": "3",
//         "text": "Item 3"
//        }
//       ],
//       "choicesFromQuestionMode": "unselected"
//      },
//      {
//       "type": "matrix",
//       "name": "singleMatrix",
//       "title": "Single Select Matrix test?",
//       "columns": [
//        "Column 1",
//        "Column 2",
//        "Column 3"
//       ],
//       "rows": [
//        {
//         "value": "Row 1",
//         "text": "Q1"
//        },
//        {
//         "value": "Row 2",
//         "text": "Q2"
//        }
//       ]
//      }
//     ]
//    },
//    {
//     "name": "page2",
//     "elements": [
//      {
//       "type": "dropdown",
//       "name": "dropdown",
//       "choices": [
//        {
//         "value": "1",
//         "text": "Item dropdown 1"
//        },
//        {
//         "value": "2",
//         "text": "Item dropdown 2"
//        },
//        {
//         "value": "3",
//         "text": "Item dropdown 3"
//        }
//       ],
//       "showOtherItem": true
//      }
//     ]
//    }
//   ]
//  };

// const surveyResults = [{
//   "star": 4,
//   "checkbox": [
//     "2",
//     "3"
//   ],
//   "radioGroup": "Item 1",
//   "bool": false,
//   "singleMatrix": {
//     "Row 1": "Column 2",
//     "Row 2": "Column 3"
//   },
//   "dropdown": "1"
// },
// {
//   "star": 1,
//   "checkbox": [
//     "3"
//   ],
//   "radioGroup": "Item 3",
//   "bool": true,
//   "ranking": [
//     "2",
//     "1",
//     "3"
//   ],
//   "singleMatrix": {
//     "Row 1": "Column 1",
//     "Row 2": "Column 1"
//   },
//   "dropdown": "other",
//   "dropdown-Comment": "Test other describe"
// },
// {
//   "star": 5,
//   "checkbox": [
//     "2"
//   ],
//   "radioGroup": "Item 2",
//   "bool": true,
//   "ranking": [
//     "3",
//     "1",
//     "2"
//   ],
//   "singleMatrix": {
//     "Row 1": "Column 3",
//     "Row 2": "Column 3"
//   },
//   "dropdown": "3"
// }, {
//   "star": 4,
//   "checkbox": [
//     "2",
//     "3"
//   ],
//   "radioGroup": "Item 1",
//   "bool": true,
//   "singleMatrix": {
//     "Row 1": "Column 2",
//     "Row 2": "Column 3"
//   },
//   "dropdown": "1"
// }];

const vizPanelOptions = {
  allowHideQuestions: false
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'SurveyJS Analytics for Angular';
  surveyModel!: Model;
  @ViewChild("surveyVizPanel") elem: ElementRef | undefined;

  surveyJson: any;
  surveyResults: any;

  constructor(private surveyJSService: SurveyJSService) { }

  ngOnInit(): void {
    this.getSurveyJson();
  }

  ngAfterViewInit(): void {
    // const survey = new Model(this.surveyJson);
    // const vizPanel = new VisualizationPanel(
    //   survey.getAllQuestions(),
    //   this.surveyResults,
    //   vizPanelOptions
    // );
    // vizPanel.showHeader = true;
    // vizPanel.render(this.elem?.nativeElement);
  }

  getSurveyJson() {
    this.surveyJSService.getSurveyJson().subscribe((resp: any) => {
      console.log(JSON.stringify(resp));
      this.surveyJson = resp;
      const today: Date = new Date();
      const todayDateString: string = today.toISOString().split('T')[0];
      for (let page of resp.pages) {
        const objListFound = page.elements.filter(p => p.name.startsWith("today"));
        if (objListFound) {
          objListFound.forEach(i => i.max = todayDateString)
        }
      }
      const survey = new Model(resp);

      this.surveyModel = survey;
    }, (err) => {

    }, () => {
      this.getSurveyResult();
    });
  }

  getSurveyResult() {
    this.surveyJSService.getSurveyResult().subscribe((resp: any) => {
      console.log(JSON.stringify(resp));
      this.surveyResults = resp;
    }, (err) => {

    }, () => {
      this.renderPanel();
    })
  }

  renderPanel() {
    const survey = new Model(this.surveyJson);
    const vizPanel = new VisualizationPanel(
      survey.getAllQuestions(),
      this.surveyResults,
      vizPanelOptions
    );
    vizPanel.showHeader = true;
    vizPanel.render(this.elem?.nativeElement);
  }
}
