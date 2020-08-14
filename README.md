# Link api challenge

This project it's an backend API for an Pipedrive and Bling integration. It was built in NodeJS 12.8, and it comes with Hapi.js, base unit test, pm2 monitoring, and the all infra-structure already dockerized.

## Pre-requirements

> - **Docker** version 19.03 or above
> - **Docker-machine** version 0.16.0, or above
> - **Docker-compose** version 1.26.0, or above
> - **Node** version 12.8, or above - [Node Donwload](https://nodejs.org/pt-br/download/)
> - **NPM** version 6.14.4, or above- [Npm Donwload](https://www.npmjs.com/package/download)

## Installing

> Clone this project in you machine using the command below:
> ```
> 	git clone https://github.com/andersonRocha091/likapichallenge.git
> ```
> Go to the project folder at your terminal:
> ```
> 	cd linkapichallenge
> ```
> if not already exists create a .env (Settings for mongoDB and mongocliente) file with the following params for your environment:
> ```
>MONGO_HOST=localhost
>MONGO_PORT=27017
>MONGO_INITDB_DATABASE=revenues
>MONGO_INITDB_ROOT_USERNAME=<your_root_user>
>MONGO_INITDB_ROOT_PASSWORD=<your_root_user_password>
>DATABASE_USER=<mongo_database_user>
>DATABASE_PASSWORD=<mongo_database_password>
> ```
> Inside the aplication folder src/config, change the params:
> ```
> in .env.dev
>PORT=5000
>MONGODB_URL=mongodb://<DATABASE_USER>:<DATABASE_PASSWORD>@mongo:27017/revenues
>PIPEDRIVE_TOKEN=<you_pipedrive_token>
>PIPEDRIVE_API_URL=https://api.pipedrive.com/v1/deals
>BLING_API_TOKEN=<your_bling_api_key>
>BLING_API_URL=https://bling.com.br/Api/v2/pedido/json/
>
>in .env.prod - (make sure you whitelisted all ips using 0.0.0.0/0 in network access on your
> atlasDb account, and you also have already an revenues database created before running the app).
>
>PORT=5000
>MONGODB_URL=mongodb+srv://<DATABASE_USER>:<DATABASE_PASSWORD>@<your_cluster_address>/revenues?retryWrites=true&w=majority
>PIPEDRIVE_TOKEN=<you_pipedrive_token>
>PIPEDRIVE_API_URL=https://api.pipedrive.com/v1/deals
>BLING_API_TOKEN=<your_bling_api_key>
>BLING_API_URL=https://bling.com.br/Api/v2/pedido/json/

> ```


## Execution

> After setting up the .env's files you can run the api in production or in development mode. 
> In terminal, inside likapichallenge start the local infrastructure:
> ```
> docker-compose up -d --build
>
> ```
> By default the app will run at dev mode, if you want it to be running in prod, just change
> the docker-compose.yml file enviroment node_env to dev, and run the previous command again. 
>```
>services:
>   api:
>       (...)
>       environment:
>            - "node_env=dev"
>```
> you would be able to access the aplication endpoints by accessing localhost:5000/route
>
> OBS: There's also a mongoClient available for local mongodb management by default set in localhost:3000. (Feel free to use compass, or anything else which better suit for you)

## Endpoints

### Deals related

* [Transfer deals from pipedrive to bling](deal/get.md) : `POST /deals/`

### Revenues related

* [Show All Revenues](revenues/get.md) : `GET /revenues/`
* [Create a Revenue](revenues/post.md) : `POST /revenues/`
* [Update a Revenue](revenues/patch.md) : `PATCH /revenues/:id/`
* [Delete a Revenue](revenues/id/delete.md) : `DELETE /api/accounts/:pk/`
* [Consolidate Total](revenues/sum.md) :`GET revenues/sum`


## Testing

The API was build using TDD and it is fully covered by unit tests. In order to run the TDD tests, just use the following command:
>```
> npm run test
>```

## Author

> - **Anderson Souza Rocha** - Full-stack developer - [Github](https://github.com/andersonRocha091) 

> - Got an issue? just let me know: andersonecomp091@gmail.com


## License 

> MIT License (MIT)

---
Author ❤ Anderson Souza Rocha
