import type { AWS } from '@serverless/typescript';
import * as dotenv from 'dotenv';

import createMetric from '@functions/metrics/create';
import listMetrics from '@functions/metrics/list';
import masterMetrics from '@functions/metrics/master';

dotenv.config();

const serverlessConfiguration: AWS = {
  service: 'codetest-backend',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild','serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      DB_USERNAME: process.env.DB_USERNAME,
      DB_PASSWORD: process.env.DB_PASSWORD,
      DB_ENDPOINT: process.env.DB_ENDPOINT,
      DB_NAME: process.env.DB_NAME,
    },
    deploymentBucket: {
      name: process.env.FUNCTIONS_DEPLOYMENT_BUCKET_NAME,
    },
  },
  // import the function via paths
  functions: { createMetric, listMetrics , masterMetrics },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    'serverless-offline': {
      httpPort: 3001,
    },
  },
};

module.exports = serverlessConfiguration;
