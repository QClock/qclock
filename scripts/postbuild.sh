#!/bin/bash

cp .tesselinclude build/
cp .npmrc build/
cp package.json build/

if [ $NODE_ENV == "production" ];
then
    cp scripts/.env-prod build/.env
elif [ $NODE_ENV == "docker" ];
then
    cp scripts/.env-docker build/.env
else
    cp scripts/.env-dev build/.env
fi
