export default {
  servers: [
    {
      type: "http",
      handle: "redirect",
    },
    {
      type: "https",
      security: {
        domain: "local.zthunworks.com",
      },
      domains: {
        "pokedexii.local.zthunworks.com": {
          "/": "http://pokedex-services-web:5173",
          "/api": "http://pokedex-services-api:3000",
        },
        "database.local.zthunworks.com": {
          "/": "http://pokedex-mongo-express:8081",
        },
      },
    },
  ],
};
