from midburn.settings import *

DEBUG = True

DATABASES['default'] = dj_database_url.config()