# tiny-url

A url shortener pet-project for learning full-stack stuff.

App consists of expressjs backend part, mysql database and react frontend part.

## Requirements

.env variables:

**CLIENT_ID** - client id for google auth  
**CLIENT_SECRET** - client id for google auth  
**BE_ORIGIN** - backend address  
**FE_ORIGIN** - frontend address  
**REDIRECT_URI** - redirect uri for google auth  
**ACCESS_TOKEN_TTL** - access token life time  
**REFRESH_TOKEN_TTL** - refresh token life time  
**PUBLIC_KEY** - public key needed for jwt tokens  
**PRIVATE_KEY** - private key needed for jwt tokens  
**DATABASE_HOST** - database uri  
**DATABASE_USERNAME** - mysql username  
**DATABASE_PASSWORD** - mysql password  
**DATABASE_NAME** - mysql database name  
**DATABASE_ROOT_PASSWORD** - mysql root password  

## Running locally

You can run entire app with ```docker compose up```

