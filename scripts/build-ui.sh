#!/bin/bash

echo "Set up web UI"

mkdir -p web
cd web

if [ -d qclk ]; then
    cd qclk
    git pull
else
    git clone https://github.com/qclock/qclk.git
    cd qclk
fi

npm i
npm run build
