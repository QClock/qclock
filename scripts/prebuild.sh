#!/bin/bash

# todo: the "@qclock/client-aurora" should come from package.json
mkdir -p build/web
cp -Rf node_modules/@qclock/client-aurora/build/* build/web