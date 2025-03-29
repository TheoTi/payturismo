import * as yaml from "yaml";
import { createDocument } from "zod-openapi";
import { AuthenticateUserSchema } from "../validators/authenticateUserZodSchema";
import { z } from "zod";
import { UserSchema } from "../validators/createUserZodSchema";
import { AgencySchema } from "../validators/createAgencyZodSchema";
import { UpdateAgencySchema } from "../validators/updateAgencyZodSchema";

const document = createDocument({
  openapi: "3.0.3",
  info: {
    title: "Payturismo API",
    description: "An API for managing turism agencies",
    version: "1.0.0",
  },
  security: [{}],
  tags: [
    {
      name: "Agency",
    },
    {
      name: "User",
    },
  ],
  servers: [
    {
      url: "http://localhost:3333",
      description: "The development server.",
    },
  ],
  paths: {
    "/login/:": {
      post: {
        tags: ["User"],
        description: "Authenticate user",
        requestBody: {
          content: {
            "application/json": { schema: AuthenticateUserSchema },
          },
        },
        responses: {
          200: {
            description: "200 OK",
            content: {
              "application/json": {
                schema: z.object({
                  data: z.object({
                    token: z.string(),
                    user: z.object({
                      id: z.string(),
                      email: z.string(),
                      role: z.string(),
                    }),
                  }),
                }),
              },
            },
          },
        },
      },
    },

    "/register/:": {
      post: {
        tags: ["User"],
        description: "Register user",
        requestBody: {
          content: {
            "application/json": { schema: UserSchema },
          },
        },
        responses: {
          200: {
            description: "201 Created",
            content: {
              "application/json": {
                schema: z.object({
                  data: z.object({
                    id: z.string(),
                    email: z.string(),
                    passwordHash: z.string(),
                    role: z.string(),
                    createdAt: z.string(),
                    updatedAt: z.string(),
                  }),
                }),
              },
            },
          },
        },
      },
    },

    "/agency/:": {
      post: {
        tags: ["Agency"],
        description: "Create an agency",
        requestParams: {
          header: z.object({
            Authorization: z.string(),
          }),
        },
        requestBody: {
          content: {
            "application/json": {
              schema: AgencySchema,
            },
          },
        },
        responses: {
          "201": {
            description: "201 Created",
            content: {
              "application/json": {
                schema: z.object({
                  data: z.array(AgencySchema),
                }),
              },
            },
          },
        },
      },

      get: {
        tags: ["Agency"],
        description: "List all agencies",
        requestParams: {
          header: z.object({
            Authorization: z.string(),
          }),
        },
        responses: {
          "200": {
            description: "200 OK",
            content: {
              "application/json": {
                schema: z.object({
                  data: z.array(AgencySchema),
                }),
              },
            },
          },
        },
      },
    },

    "/agency/{id}/:": {
      get: {
        tags: ["Agency"],
        description: "Find agency by id",
        requestParams: {
          path: z.object({ id: z.string() }),
          header: z.object({ Authorization: z.string() }),
        },
        responses: {
          "200": {
            description: "200 OK",
            content: {
              "application/json": {
                schema: z.object({
                  data: AgencySchema,
                }),
              },
            },
          },
        },
      },

      delete: {
        tags: ["Agency"],
        description: "Delete an agency",
        requestParams: {
          path: z.object({ id: z.string() }),
          header: z.object({ Authorization: z.string() }),
        },
        responses: {
          204: {
            description: "204 No content",
          },
        },
      },

      put: {
        tags: ["Agency"],
        description: "Update an agency",
        requestParams: {
          path: z.object({ id: z.string() }),
          header: z.object({ Authorization: z.string() }),
        },
        requestBody: {
          content: {
            "application/json": {
              schema: UpdateAgencySchema,
            },
          },
        },
        responses: {
          200: {
            description: "200 OK",
            content: {
              "application/json": {
                schema: z.object({
                  data: AgencySchema,
                }),
              },
            },
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
});

console.log(yaml.stringify(document));
