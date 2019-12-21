import {urlValidation} from './formHandler.js'

describe("URL Validation function checking valid URLs", () => {
    test("checking if the function detects valid and invalid URLs", () => {
        const validInput = ['http://www.bbc.com/sport/football/25912393',
        'https://www.bbc.com/sport/football/25912393'
        ];
        validInput.forEach(input => {
            expect(urlValidation(input)).toEqual(true);
        })
      })
    
})
describe("URL Validation function checking invalid URLs", () => {
    test("checking if the function detects valid and invalid URLs", () => {
        const validInput = ['http: //www.bbc.com/sport/football/25912393',
        'https: //www.bbc',
        'kjkl'
        ];
        validInput.forEach(input => {
            expect(urlValidation(input)).toEqual(false);
        })
      })
    
})