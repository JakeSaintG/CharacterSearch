# PeopleSearch
## _An Angular Project_
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.3.
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

## Dependencies
- Node and NPM are need to run and build the Angular application.
- Angular Command Line Interface

## Build
 Make sure that you have @angular-devkit/build-angular installed.
- If the application fails to build, run the below command:
```sh
npm install --save-dev @angular-devkit/build-angular
```
Run the below command to build the project. The build artifacts will be stored in the `dist/` directory.
```sh
ng build
```

## To Run
- Navigate to your terminal of choice (PowerShell, Git Bash, and Visual Studio were all tested)
- Enter the below line:
```sh
npm start
```
- The PeopleSearch application is now hosted on "http://localhost:4200/"
- Use "CTRL+C" to quit
- Run the below line to execute the unit tests via [Karma](https://karma-runner.github.io):
```sh
ng test
```


## Examples using the search feature
- "paul"
-- Will pull and display information on Paul McCartney and Paul Revere
- "mccartney"
-- Will pull and display information on just Paul McCartney
- Leaving the form blank will pull information on all people stored in the PeopleAPI
- If you entered a person, you should be able to retrieve information on that person by entering their name.

## Examples using the "Add a person" form
- Fill in the form that appears when "Add User" is clicked.
- Submit the form to POST to PeopleAPI 
- You should then be able to retrieve the information by seraching for the person that you added!

## Special Thanks
- Health Catalyst for the chance to learn so much from this challening coding assessment!
- Peter McClanahan for answering my many questions!

## Known Issues
- Unable to POST an image currently.
-- Error received from API.

## Areas of Improvement
- Changing many of the uses of "people" to "user" throught the application.
- Utilizing Angular's ReactiveFormsModule to create the form for adding a person.
- Deliving deeper in the features of Angular and refactoring.