# Storefront backend

A StoreFront backend RESTful API.

API endpoints information can be found in the [requirements doc](REQUIREMENTS.md).

## Libraries/Packages used

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Jasmine](https://jasmine.github.io/)
- [Supertest](https://www.npmjs.com/package/supertest)
- [Express-validator](https://express-validator.github.io/)
- [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [http-status-codes](https://www.npmjs.com/package/http-status-code)
- [db-migrate](https://www.npmjs.com/package/db-migrate)
- [morgan](https://www.npmjs.com/package/morgan)
- [helmet](https://www.npmjs.com/package/helmet)
- [pg](https://www.npmjs.com/package/pg)
- [dotenv](https://www.npmjs.com/package/dotenv)

## Installation Instructions

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Leeefo/store-front-backend.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

### Scripts

- Starting the development environment
  ```sh
  npm run dev
  ```
- For Building the production enviroment
  ```sh
  npm run start
  ```
- For formatting the project with Prettier and ESlint
  ```sh
  npm run format
  ```
- Testing the project with jasmine
  ```sh
  npm run test
  ```
- For running the up migrations
  ```sh
  npm run migration:run
  ```

### Ports

The application runs on port `5000` with database on `5432`.

### Environment variables

add a .env file in the root directory and set the missing ### environment parameters

```
PORT=5000
NODE_ENV=dev

# Database Vars
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=###
POSTGRES_PASSWORD=###
POSTGRES_DB=store_dev
POSTGRES_DB_TEST=store_test

# JWT
JWT_SECRET=###

SALT=10
```

## database.json

- add a `database.json` file in the root directory

```json
{
  "defaultEnv": { "ENV": "NODE_ENV" },
  "dev": {
    "driver": "pg",
    "host": { "ENV": "POSTGRES_HOST" },
    "port": { "ENV": "POSTGRES_PORT" },
    "database": { "ENV": "POSTGRES_DB" },
    "user": { "ENV": "POSTGRES_USER" },
    "password": { "ENV": "POSTGRES_PASSWORD" }
  },
  "test": {
    "driver": "pg",
    "host": { "ENV": "POSTGRES_HOST" },
    "port": { "ENV": "POSTGRES_PORT" },
    "database": { "ENV": "POSTGRES_DB_TEST" },
    "user": { "ENV": "POSTGRES_USER" },
    "password": { "ENV": "POSTGRES_PASSWORD" }
  }
}
```

### Health Check at [products](http://localhost:5000/api/products)
