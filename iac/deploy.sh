#!/bin/bash

set -e

if [ -f .env ]; then
    source .env
else
    echo ".env file not found"
    exit 1
fi

export AWS_REGION=eu-west-1

STAGE="${STAGE:=dev}"

# Step 1: Deploy the Database
echo "Deploying RDS Database..."
aws cloudformation deploy --template-file ./iac/rds.yml --stack-name codetest-db --parameter-overrides DBUsername=$DB_USERNAME DBPassword=$DB_PASSWORD --capabilities CAPABILITY_NAMED_IAM

# Retrieve the DB endpoint
echo "Retrieving DB endpoint..."
DB_INSTANCE_IDENTIFIER="codetest-rds"
DB_ENDPOINT=$(aws rds describe-db-instances --db-instance-identifier $DB_INSTANCE_IDENTIFIER --query 'DBInstances[0].Endpoint.Address' --output text)
if [ -z "$DB_ENDPOINT" ]; then
    echo "Failed to retrieve DB endpoint"
    exit 1
fi

# Step 2: Deploy the Backend
echo "Deploying Backend..."
cd backend
rm -rf .serverless
npm install
export DB_ENDPOINT=$DB_ENDPOINT
npm run deploy -- --stage $STAGE
cd ..

# Retrieve API Gateway ID
echo "Retrieving API Gateway ID..."
API_NAME="codetest-backend-$STAGE" 
API_GW_ID=$(aws apigateway get-rest-apis --query "items[?name=='$API_NAME'].id" --output text)
if [ -z "$API_GW_ID" ]; then
    echo "Failed to retrieve API Gateway ID"
    exit 1
fi

# Step 3: Deploy the Frontend
echo "Deploying Frontend..."
cd frontend
aws cloudformation deploy --template-file ../iac/frontend-stack.yml --stack-name codetest-frontend --parameter-overrides ApiGatewayID=${API_GW_ID} StageName=${STAGE} --capabilities CAPABILITY_NAMED_IAM

# Get the CloudFront distribution URL
CLOUDFRONT_URL=$(aws cloudformation describe-stacks --stack-name codetest-frontend --query "Stacks[0].Outputs[?OutputKey=='CloudFrontURL'].OutputValue" --output text)

# Update the constants/index.ts file
sed -i '' -e "s|host: .*|host: 'http://$CLOUDFRONT_URL',|" ./src/constants/index.ts

npm install
rm -rf build
npm run build
aws s3 sync build/ s3://codetest-frontend-s3-$STAGE
cd ..

echo "Deployment completed."
