# Tracker API

This project it's an backend API for fleet traking. It was built in NodeJS 12.8, and it comes with Hapi.js, TDD and unit test, pm2 monitoring, and the all infra-structure already dockerized.

## Pre-requirements

> - **Docker** version 19.03 or above
> - **Docker-machine** version 0.16.0, or above
> - **Docker-compose** version 1.26.0, or above
> - **Node** version 12.8, or above - [Node Donwload](https://nodejs.org/pt-br/download/)
> - **NPM** version 6.14.4, or above- [Npm Donwload](https://www.npmjs.com/package/download)

## Installing

> Clone this project in your machine using the command below:
> ```
> 	git clone https://github.com/andersonRocha091/tracker_api.git
> ```
> Go to the project folder at your terminal:
> ```
> 	cd tracker_api
> ```
> if not already exists create a .env (Settings for local mysql running at container and API) file with the following params for your environment:
> ```
>ROOT_PASSWORD=<your-desired-root-password> //root password for local mysql running at container
>MYSQL_DATABASE=fleetwise_prd //default local mysql database created on build
>PMA_HOST=mysql2 //host for phpmyadmin mysql admin (mysql container)
>PMA_PORT=3306 //deafault mysql port
>UPLOAD_LIMIT=300000000
>NODE_ENV=<'prod|dev'> //environment app excution
> ```
> Inside the aplication folder src/config, change the params:
> ```
> in .env.dev
>```
>PORT=5000 //default port
>MYSQL_HOST=localhost //running locally by default
>MYSQL_USER=root //default local mysql instance running at container
>PASSWORD=<'your-root-database-password'>
>DATABASE=fleetwise_prd //default database
>```
>in .env.prod - (make sure you whitelisted all ips using 0.0.0.0/0 at your mysql host).
>```
>PORT=5000
>MYSQL_HOST=<database-host-url>
>MYSQL_USER=<your-dabase-username>
>PASSWORD=<your-dabase-password>
>DATABASE=<dabase-name>
> ```


## Execution

> After setting up the .env's files you can run the api in production or in development mode. 
> In terminal, inside tracker_api start all containers:
> ```
> docker-compose up -d --build
>
> ```
> The app will run at NODE_ENV mode assigned at .env file. If you change it, you need to run the previous command again. 
>
> you would be able to access the aplication endpoints by accessing localhost:5000/route
>
> OBS: There's also a phpmyadmin available for local mysql management by default set in localhost:81. (Feel free to use adminer, or anything else which better suit for you)

## Endpoints

### Speed rank by tracker

* [Show the speeed rank by tracker](rank/get.md) : `GET tracker/rank`

### Events by tracker uid

* [Show the events by tracker uid](event/get.md) : `GET tracker/event`

### Tracker information related

* [Show All tracking information](tracker/get.md) : `GET /tracker/`
* [Insert a new tracker log](tracker/post.md) : `POST /tracker/`
* [Update a track log](tacker/patch.md) : `PATCH /tracker/:uid/`
* [Delete a track log](tracker/id/delete.md) : `DELETE tracker/:id/`


## Testing

The API was build using TDD and it is almost fully covered by unit tests. In order to run the TDD tests, just use the following command:
>```
> npm run test
>```
OBS: I recommend you run it locally because this comand start another api instace, and the container one will be using the same port in the enviroment you choose at .envs file. This 
can be solved by running the command locally and changing in .env.{prod|dev} port to another
one different from the default 5000.
## Author

> - **Anderson Souza Rocha** - Full-stack developer - [Github](https://github.com/andersonRocha091) 

> - Got an issue? just let me know: andersonecomp091@gmail.com


## License 

> MIT License (MIT)

---
Author ❤ Anderson Souza Rocha
