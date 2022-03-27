# CharacterSearch
## _An Angular Project_
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.3.
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

## Dependencies
- Node and NPM are need to run and build the Angular application.
- Angular Command Line Interface

## Build
Run the below command to build the project.
```sh
ng build
```

## To Run
- Navigate to your terminal of choice (PowerShell, Git Bash, and Visual Studio were all tested)
- Enter the below line:
```sh
npm start
```
- The CharacterSearch application is now hosted on "http://localhost:4200/"
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
- Leaving the form blank will pull information on all characters stored in the CharacterAPI
- If you entered a person, you should be able to retrieve information on that person by entering their name.

## Examples using the "Add a person" form
- Fill in the form that appears when "Add Character" is clicked.
- Submit the form to POST to CharacterAPI 
- You should then be able to retrieve the information by seraching for the person that you added!

## Special Thanks
- Health Catalyst for the chance to learn so much from this challening coding assessment!
- Peter McClanahan and Robyn Cute for answering my questions!

## Known Issues
- Sending images works but sends 200 back from the API as an error code

## Areas of Improvement
- Showing a success notification if the person data was uploaded successfully.
- Utilizing Angular's ReactiveFormsModule to create the form for adding a person.
- Deliving deeper in the features of Angular and refactoring.