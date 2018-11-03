#!/bin/bash
apt-get update
apt-get install -y apache2
mkdir /var/www/html/uploads
git clone -b node https://github.com/abhishekparekh1/node-express-file-form-upload-demo.git
cd node-express-file-form-upload-demo
apt-get install -y npm
npm install
node-v10.13.0-linux-x64/bin/node App.js &
