### Midburn Theme Camps
## Installation

## create a virtualenv using virtualenv and virtualenv wrapper

## install pip packages

## create the DB
We are using Postgres, which can be installed here: http://www.postgresql.org/download/
- log in to the Postgres console for the first time as root user:
  $ sudo - postgres

- Create the db and user:
  $ create role midburn with createdb login password '123';
  $ CREATE DATABASE midburn;
  $ ALTER DATABASE midburn OWNER TO midburn;
