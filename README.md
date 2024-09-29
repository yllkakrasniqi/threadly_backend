# threadly_backend

A **Node.js** based project that provides a GraphQL API. This project uses **Express** as the web server and **Apollo Server** as the GraphQL server.

## Description

This project demonstrates how to implement a GraphQL API using Node.js. It allows clients to query, mutate, and subscribe to data via a GraphQL endpoint. The server is built with **Apollo Server** and uses **Express** for routing and middleware handling. MongoDB is used as the database, and **Mongoose** is used to interact with the MongoDB database.

### Features

- GraphQL schema design with types, queries, mutations, and subscriptions.
- Apollo Server integration with Express.
- MongoDB as the data source using Mongoose.
- Error handling and input validation.
- Modular and scalable project structure.

## Technology Stack

- **Node.js**: Backend JavaScript runtime environment.
- **Express**: Lightweight web framework for handling HTTP requests.
- **Fastify**
- **Apollo Server Fastify**
- **GraphQL**: Query language for APIs and runtime for executing those queries.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: MongoDB object modeling for Node.js.

## Choosing Apollo Server

We are using **apollo-server-fastify** in this project for better performance and flexibility. Here’s a breakdown of when you would choose **apollo-server** vs. **apollo-server-fastify**:

### Use `apollo-server` if:
- You want a simple and straightforward setup without worrying about the underlying web framework.
- You are starting with Apollo Server and don't need advanced performance features.

### Use `apollo-server-fastify` if:
- You are already using Fastify for your application and want to integrate Apollo Server into it.
- You need the performance benefits and low overhead that Fastify provides.
- You prefer the advanced features and plugin system of Fastify.

In this project, **apollo-server-fastify** is chosen because of its advanced performance capabilities, and it integrates seamlessly with Fastify for handling HTTP requests efficiently.


## Dependencies

This project relies on several key dependencies to manage authentication, security, and configuration. Below are the main dependencies and their purposes:

- **jsonwebtoken**: Responsible for creating and verifying JSON Web Tokens (JWTs). This is essential for handling user authentication and ensuring the validity of tokens.
- **argon2**: Used for hashing and comparing passwords securely. Argon2 is a modern hashing algorithm designed to be highly secure against brute-force attacks.
- **graphql-middleware**: Allows us to add additional functionality such as logging, error handling, or authentication checks to our GraphQL resolvers efficiently.
- **graphql-shield**: Provides an intuitive way to define roles and permissions within the API, ensuring that users can only access the data and perform actions they are authorized for.
- **dotenv**: Loads environment variables from a `.env` file into `process.env`, making it easy to manage configuration and credentials without hardcoding them into the application.


## GraphQL Schema

The project uses a modular GraphQL schema structure. Below are some key types, queries, and mutations available in this project.

### Example GraphQL Queries

1. **Query for fetching all products:**

    ```graphql
    query Products {
      products {
        _id
        gender
        name
      }
    }
    ```

2. **Query for fetching a product by product ID:**

    ```graphql
    query Product($productId: ID!) {
      product(id: $productId) {
        _id
        name
        gender
      }
    }
    ```

### Example GraphQL Mutations

1. **Create a new product:**

    ```graphql
    mutation CreateProduct($input: createProductInput) {
      createProduct(input: $input) {
        _id
        name
        gender
      }
    }
    ```

2. **Update an existing product:**

    ```graphql
    
    mutation {
      updateProduct(id: "PRODUCT_ID", input: { name: "Updated Item", gender: "Updated gender" }) {
        id
        name
        gender
      }
    }
    ```

3. **Delete a product:**

    ```graphql
    mutation {
      deleteProduct(id: "PRODUCT_ID") {
        id
      }
    }
    ```

## API Endpoints

This project exposes a single GraphQL endpoint:

- `http://localhost:4000/graphql`

## Installation

Follow these steps to install and run the project locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/yllkakrasniqi/threadly_backend.git
    ```

2. Navigate to the project directory:
    ```bash
    cd threadly_backend
    ```

3. Install the required dependencies:
    ```bash
    npm install
    ```

4. Set up environment variables by creating a `.env` file in the root of the project:
    ```bash
      PORT=3005
      CORS_ORIGIN=http://localhost:3000 or your deployed server
      DB_HOST='mongodb_host'
      DB_PORT=mongodb_port
      DB_NAME='database_name'
      JWT_SECRET=your_jwt_secret
    ```

5. Running the app:
    ```bash
    npm run start
    ```

## Usage

You can interact with the API using GraphQL clients such as [Apollo Studio Explorer](https://studio.apollographql.com/), [GraphiQL](https://github.com/graphql/graphiql), or any other API clients like [Postman](https://www.postman.com/).

