## Midburn Theme Camps

### Installation - Docker Environment

* Create the virtualenv (Only once): ```$ docker-compose run app virtualenv .venv```
* Bring the database up: ```$ docker-compose up -d db```
* Install requirements: ````$ docker-compose run app .venv/bin/pip install -r requirements.txt````
* Apply migrations: ```docker-compose run app .venv/bin/python ./manage.py migrate```
* Run the app: ```docker-compose up -d```

### Installation - Local Dev Env

* create a virtualenv using virtualenv and virtualenv wrapper
* install pip packages
* create the DB:
    >We are using Postgres, which can be installed here
http://www.postgresql.org/download/

    * log in to the Postgres console for the first time as root user:

    ```cosole
    $ sudo - postgres
    ```

    * Create the db and user:

    ```postgresql
    $ CREATE ROLE midburn WITH createdb login
     password '123';
    $ CREATE DATABASE midburn;
    $ ALTER DATABASE midburn OWNER TO midburn;
    ```
