# jobs-scheduler

## Description

**Jobs Scheduler** is  our solution for queued and scheduled jobs.

## Table of Contents

- [Jobs Scheduler](#jobs)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Setup](#setup)
    - [Dependencies](#dependencies)
    - [Getting Started](#getting-started)
    - [More about environmental variables](#more-about-environmental-variables)
  - [Usage](#usage)
  - [Testing](#testing)

## Setup

### Dependencies

- [NodeJS](https://github.com/nodejs/node) - A JavaScript runtime environment
- [Express](https://github.com/expressjs/express) - A web application framework for NodeJS
- [Redis](https://redis.io/) - An in-memory data structure store
- [Bull](https://github.com/OptimalBits/bull) - A Redis-based queue for Node

### Getting Started

Follow these steps to set up the project in development mode

- Install [Nodejs](https://nodejs.org/en/download/)
- Clone the repository by running the command

  ```[bash]
  git clone https://github.com/Nyakaru/jobs-scheduler.git
  ```

- Run `cd jobs-scheduler` to enter the application's directory
- Install the application's dependencies by running the command
  ```
  yarn install
  ```
- Create the `.env` or `.env.development` file by running `cp .env.sample .env` or `cp .env .env.development`
- Populate the env file created above by obtaining valid values for the environment variables. (Consult your teammates).
- Start the application by running
  ```
  yarn run start:dev
  ```
  The application should now be running at `http://127.0.0.1:8000`


### More about environmental variables

After setting up your `.env` from the template provided in the `env/.env.sample` file;
to use these environment variables anywhere in the app, simply:

```[js]
process.env.MY_ENV_VARIABLE
```

## Usage
### The Scheduler allows adding of 3 types of jobs
- Single Jobs(Jobs that will be run once)
- Repeatable Jobs(Jobs that will always run at the specified time)
- Sequential Jobs(This are repeatable Jobs that will always run after a given period has elapsed)

### Creating a Job in the Scheduler
#### Register your client in the scheduler.

Still working on this

### Add a job to the scheduler
To add a job you need to provide your job data in body of the endpoint in step 4 above. The data depends on the type of job

### Single job data
```typescript
{
	'isRecurring': false, // Boolean value, it has to be false
	'time': '11-09 16:01', // The time the job should be run, the format is 'DD-MM HH:mm'
	'timeZone': 'Africa/Nairobi', // The time zone that job should be run on'
	'payload': { // The object that holds job details.
		'queueName': 'routesQueue', // The queue to add the job
		'callbackUrl':'http://localhost:5000/api/v2/handler', // The client endpoint to be invoked by the job
		'data': { // Data specific to your client endpoint
			'key': 'ROUTE_TAKE_OFF_ALERT', // The name registered for a specific broadcast event
			'args': { // Data specific to your registered broadcast event
				"batchId": 3  
			}
		}
	}
}
This job will be run once on 11th of september at 1601hrs
```

### Repeatable Job Data

```typescript
{
    'isRecurring': true, // Boolean value, it has to be true
    'cron': { //Rules for a repeatable job
         'isSequential':, false // Boolean value, it has to be false
         'repeatTime': '23-03 12:12' // Time the job will be repeated, can take the format 'DD-MM HH:mm' , 'DD HH:mm' or 'HH:mm'
    }
    'timeZone': 'Africa/Nairobi', // The time zone that job should be run on
	'payload': { // The object that holds job details.
		'queueName': 'routesQueue', // The queue to add the job
		'callbackUrl':'http://localhost:5000/api/v2/handler', // The client endpoint to be invoked by the job
		'data': { // Data specific to your client endpoint
			'key': 'ROUTE_TAKE_OFF_ALERT', // The name registered for a specific broadcast event
			'args': { // Data specific to your registered broadcast event
				"batchId": 3  
			}
		}
	}
}
This job will be run every 23rd of march at 1212hrs
```


### Sequential job data
```typescript
{
    'isRecurring': true, // Boolean value, it has to be true
    'cron': { //Rules for a repeatable job
         'isSequential':, true // Boolean value, it has to be true
         'repeatSequence': '0 12:12' // Time to elapse before the job is repeated,  takes the format 'days hours-minutes'
    }
    'timeZone': 'Africa/Nairobi', // The time zone that job should be run on
	'payload': { // The object that holds job details.
		'queueName': 'routesQueue', // The queue to add the job
		'callbackUrl':'http://localhost:5000/api/v2/handler', // The client endpoint to be invoked by the job
		'data': { // Data specific to your client endpoint
			'key': 'ROUTE_TAKE_OFF_ALERT', // The name registered for a specific broadcast event
			'args': { // Data specific to your registered broadcast event
				"batchId": 3  
			}
		}
	}
}
This job will be run after every 12 hours and 12 minutes
```


## Testing

[Jest](https://jestjs.io) is used as the testing framework for both the unit tests and integration tests.
To execute all tests, run the command

```
  yarn test
```
