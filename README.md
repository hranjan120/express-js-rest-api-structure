# Express Rest API App
> ### Example App (Express + Mongoose + Jest + SuperTest + CloudWatch Logs) containing real world folder structure. The application uses EsLint with popular Airbnb Design Pattern 

# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies and Dev dependencies
- Get a mongodb atlas Database ([SignUp](https://www.mongodb.com/cloud/atlas/register)) and update db connection string in .env files
- Get a AWS access key and Secret and update in .env files
- `npm run dev` to start the local server
- `npm start` to start the production server
- `npm run test` to Run the Test Cases

## Application Structure

- `server.js` - The entry point to our application. This file uses the express app created in `app.js` file and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `app.js` - It requires the routes we'll be using in the application.
- `__test__/` - This folder contains all the test Cases.
- `config/` - This folder contains configuration as per the node environment.
- `log/` - This folder contains logger file responsible for logs on Cloudwatch.
- `src/controller/` - This folder contains the controller.
- `src/model/` - This folder contains the schema definitions for our Mongoose models.
- `src/routes/` - This folder contains api routes which calls the controller methods.
- `src/services/` - This folder contains the database queries for Mongoose models.


## Error Handling

In `app.js`, we define a error-handling middleware for handling the errors throws by all the controller. This middleware will respond with a 500 status code and format the response with error message and also create logs on AWS Cloudwatch.

In `server.js`, we define a uncaughtException handler and unhandledRejection handler that also create logs on AWS Cloudwatch.

