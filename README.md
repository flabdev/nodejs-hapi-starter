# A starter project for Hapi.js application

###  Run Locally on your machine
* Clone the repo to your local machine.
* Create .env file with the required values. 
* Run the following commands in terminal:
```
# install the dependencies
npm install

# run the server
npm start
```

- Once you create the file, you can start the application using `npm start`

#### API Documentation

- Swagger documentation can be accessed at `http://localhost:3000/documentation`

#### Add `.env` in `.gitignore` file

#### ES-LINT configuration

This project uses ESLint with Airbnb JS style-guide. 

- To check the errors/warnings using ES-LINT:  **npx eslint .**
- To fix the issues for all files (auto-correct options):    **npx eslint --fix .**

#### SonarQube configuration

- SonarQube configuration added with ES-LINT.
- SonarJS rules for ESLint to detect bugs and suspicious patterns in your code. i.e., Bug Detection , Code Smell Detection.

