const path = require('node:path');

const parse = require('pg-connection-string').parse;

const isGitpod = Boolean(process.env.GITPOD_INSTANCE_ID);
const {database, host, password, port, user} = parse(process.env.DATABASE_URL || '');

module.exports = ({env}) => {
  const sqlite = {
    client: 'sqlite',
    connection: {
      filename: path.join(
        __dirname,
        '..',
        '..',
        env('DATABASE_FILENAME', '.tmp/data.db')
      ),
    },
    useNullAsDefault: true,
  };

  // To run mysql, use DB=mysql yarn develop
  const mysql = {
    client: 'mysql',
    connection: {
      host,
      port,
      database,
      user,
      password,
      ssl: env.bool('DATABASE_SSL', true),
      // ssl: {
      //   rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false), // For self-signed certificates
      // },
    },
    debug: false,
  };

  const postgres = {
    client: 'postgres',
    connection: {
      host,
      port,
      database,
      user,
      password,
      ssl: env.bool('DATABASE_SSL', true),
    },
    debug: false,
  };

  const db = {
    sqlite,
    mysql,
    postgres,
  };

  // Only use Sqlite on Gitpod; no GCP connection, no PSQL running locally yet
  if (isGitpod) {
    return {connection: db.sqlite};
  }

  return {
    connection: process.env.DB ? db[process.env.DB] : db.sqlite,
  };
};
