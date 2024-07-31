# threadly_backend
backend for threadly project


jsonwebtoken - this dependency will be responsible for creating the json web tokens, as well as checking their readability
argon2 - this dependency will hash and compare the passwords
graphql-middleware - this dependency will allow us to add additional functionality to various resolvers efficiently
graphql-shield - this dependency makes it possible to establish roles and permissions in our api in an easy and intuitive way
dotenv - this dependency loads environment variables from a .env file into process.env

(We are choosing apollo-server-fastify)
Use apollo-server if:
You want a simple and straightforward setup without worrying about the underlying web framework.
You are starting with Apollo Server and don't need advanced performance features.
Use apollo-server-fastify if:
You are already using Fastify for your application and want to integrate Apollo Server into it.
You need the performance benefits and low overhead that Fastify provides.
You prefer the advanced features and plugin system of Fastify.

