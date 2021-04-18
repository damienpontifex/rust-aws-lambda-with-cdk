import * as path from 'path';
import { 
  App, Stack, StackProps, CfnOutput,
  aws_lambda, aws_logs, aws_events, aws_events_targets,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class RustLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const fn = new aws_lambda.Function(this, 'rust_lambda', {
      runtime: aws_lambda.Runtime.PROVIDED_AL2,
      handler: 'main',
      code: aws_lambda.Code.fromAsset(path.join(__dirname, '../target/x86_64-unknown-linux-gnu/release/bootstrap.zip')),
      logRetention: aws_logs.RetentionDays.TWO_WEEKS,
    });

    const rule = new aws_events.Rule(this, 'scheduleRule', {
      schedule: aws_events.Schedule.expression('rate(1 minute)'),
    });

    rule.addTarget(new aws_events_targets.LambdaFunction(fn));

    new CfnOutput(this, 'LambdaName', { value: fn.functionName });
  }
}

const app = new App();
new RustLambdaStack(app, 'RustLambda', {
  env: {
    region: 'ap-southeast-2'
  }
});
