export const env = {
  mysqlDatabase: process.env.MYSQL_DATABASE!,
  mysqlRootPassword: process.env.MYSQL_ROOT_PASSWORD!,

  jwtSecret: process.env.JWT_SECRET!,
  serverPort: process.env.SERVER_PORT!,
};
