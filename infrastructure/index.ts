import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as targets from '@aws-cdk/aws-events-targets';
import * as events from '@aws-cdk/aws-events';
import * as logs from '@aws-cdk/aws-logs';
import * as path from 'path';

export class RustLambdaStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const fn = new lambda.Function(this, 'rust_lambda', {
      runtime: lambda.Runtime.PROVIDED_AL2,
      handler: 'main',
      code: lambda.Code.fromAsset(path.join(__dirname, '../target/x86_64-unknown-linux-musl/release/my_lambda_func.zip')),
      logRetention: logs.RetentionDays.TWO_WEEKS,
    });

    const rule = new events.Rule(this, 'scheduleRule', {
      schedule: events.Schedule.expression('rate(1 minute)'),
    });

    rule.addTarget(new targets.LambdaFunction(fn));

    new cdk.CfnOutput(this, 'LambdaName', { value: fn.functionName });
  }
}

const app = new cdk.App();
new RustLambdaStack(app, 'RustLambda', {
  env: {
    region: 'ap-southeast-2'
  }
});
