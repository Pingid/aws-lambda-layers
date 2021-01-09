#!/bin/bash
rm -rf layer || true
[ ! -d "/chrome-aws-lambda" ] && git clone git@github.com:alixaxel/chrome-aws-lambda.git
cd chrome-aws-lambda
npm install
make chrome_aws_lambda.zip
unzip chrome_aws_lambda.zip
mv ./nodejs ../layer

