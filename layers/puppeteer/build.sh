#!/bin/bash
rm -rf layer || true
mkdir layer
[ ! -d "/chrome-aws-lambda" ] && git clone git@github.com:alixaxel/chrome-aws-lambda.git
cd chrome-aws-lambda
rm chrome_aws_lambda.zip
make
unzip chrome_aws_lambda.zip
mv ./nodejs ../layer/nodejs
# mkdir -p layer/nodejs
# cd layer/nodejs
# npm init -y 
# npm install chrome-aws-lambda debug puppeteer-core
# rm -rf package.json