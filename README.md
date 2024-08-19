## Built With
* [Node.js][Nodejs-url]
* [ExpressJs][Express-url]
* [ExpressJs Generator][Express-generator-url]
* [PostreSQL][Postgresql-url]
* [KnexJs][Knex-url]


## Getting Started


### Installation


1. Clone the repo
   ```sh
   git clone https://github.com/NawiOne/anantarupa-game-shop.git
   ```
2. Switch to the repo folder
   ```sh
   cd anantarupa-game-shop
   ```
3. Install NPM packages
   ```sh
   npm install
   npm install nodemon
   ```
4. Enter your Key in `.env`
   ```js
    DB_URL=
    DB_HOST=
    DB_NAME=
    DB_USERNAME=
    DB_PASSWORD=
   ```
5. Migrate Database<br>
   you can migrate database using 
   ```sh
    npx knex migrate:latest
    npx knex seed:run
    ```

5. Run the application<br>
   ```sh
    nodemon
    ```
    <br>

## Endpoint List
**BASE URL -> http://localhost:3000**

***Purchase Item***

 * POST -> /api/v1/purchase<br>
 ``payload``
   ```sh
         {
            "userId": 2,
            "itemId": 4,
            "qty": 2
         }
   ```


[Nodejs-url]:https://nodejs.org/en
[Express-url]: https://expressjs.com/
[Express-generator-url]: https://expressjs.com/en/starter/generator.html
[Postgresql-url]: https://www.postgresql.org/
[Knex-url]: https://knexjs.org/
 
