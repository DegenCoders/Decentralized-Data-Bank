export default {
  swaggerDefinition: {
    openapi: '0.0.1',
    info: {
      title: 'Backend for DegenDB',
      version: '0.0.1',
      description: 'The API documentation of a DegenDB.',
    },
    basePath: '/api',
    servers: [
      {
        url: 'http://localhost:3000/api/',
      },
    ],
  },
  tags: [
  ],
  apis: [
    "src/models/*.js",
    "src/utils/helpers/*.js",
    "src/api/controllers/user/*.js",
    "src/api/controllers/user/edit/*.js",
    "src/api/controllers/user/auth/*.js"
  ]
};