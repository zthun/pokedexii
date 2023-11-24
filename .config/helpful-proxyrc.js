module.exports = {
  domains: [
    {
      name: 'pokedexii.local.zthunworks.com',
      paths: {
        '/': 'pokedex-services-web:5173',
        '/api': 'pokedex-services-api:3000/api'
      }
    },
    {
      name: 'database.pokedexii.local.zthunworks.com',
      paths: {
        '/': 'pokedex-mongo-express:8081'
      }
    }
  ]
};
