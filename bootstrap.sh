#!/bin/bash
sudo su <<EOF
git clone -b no-apache https://github.com/abhishekparekh1/node-express-file-form-upload-demo.git
bash node-express-file-form-upload-demo/sc.sh
EOF
