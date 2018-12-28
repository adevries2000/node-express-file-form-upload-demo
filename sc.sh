#!/bin/bash
apt-get update
apt-get install -y default-jdk
export NODE_HOME="/home/ubuntu/node-express-file-form-upload-demo/node-v10.13.0-linux-x64"
export PATH="$PATH:$NODE_HOME/bin"
apt-get install -y npm
npm install
npm install http-server -g
http-server -p 80 &
node App.js
