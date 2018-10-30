#!/bin/bash
apt-get update
cd node-express-file-form-upload-demo/
apt-get install -y apache2
mkdir /var/www/html/uploads
apt-get install -y npm
npm install
wget https://nodejs.org/dist/v10.13.0/node-v10.13.0-linux-x64.tar.xz
tar xvf node-v10.13.0-linux-x64.tar.xz 
/home/ubuntu/node-express-file-form-upload-demo/node-v10.13.0-linux-x64/bin/node App.js &
