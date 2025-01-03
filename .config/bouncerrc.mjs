export default {
  domains: [
    {
      host: "pokedexii.local.zthunworks.com",
      paths: {
        "/": "pokedex-services-web:5173",
        "/api": "pokedex-services-api:3000/api",
      },
    },
    {
      host: "database.local.zthunworks.com",
      paths: {
        "/": "pokedex-mongo-express:8081",
      },
    },
  ],
};
