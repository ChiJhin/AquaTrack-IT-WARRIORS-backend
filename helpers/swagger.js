import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for DrinkWater App",
    version: "0.0.1",
  },
  tags: [        // by default: empty Array
    {
      name: 'User API',
      description: 'Routes Related to User Operations',
    },
    {
        name: 'Water API',
        description: 'Water Consumption Routes'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "Authorization",
        example: "Bearer abcde12345"
      }
    }
  }  
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);
