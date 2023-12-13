import type { AWS } from '@serverless/typescript';

import createMetric from '@functions/metrics/create';
import listMetrics from '@functions/metrics/list';

const serverlessConfiguration: AWS = {
  service: 'backend',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild','serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: { createMetric, listMetrics },
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
      httpPort: 3000,
    },
  },
};

module.exports = serverlessConfiguration;
