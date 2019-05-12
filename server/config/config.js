const env = process.env.NODE_ENV;

const development = {
  server: {
    port: 8000,
  },
  db: {
    host: '192.168.2.50',
    port: 27017,
    name: 'REAL_SHEGGY',
  },
};

const production = {
  server: {
    port: 8000
  },
  db: {
    host: 'localhost',
    port: 27017,
    name: 'prod',
  },
};

const config = {
  development,
  production,
};

module.exports = config[env];
