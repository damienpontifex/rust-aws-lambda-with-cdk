use lambda_runtime::{handler_fn, Context, Error};
use aws_lambda_events::event::cloudwatch_events::CloudWatchEvent;

#[tokio::main]
async fn main() -> Result<(), Error> {
    lambda_runtime::run(handler_fn(my_handler)).await?;
    Ok(())
}

async fn my_handler(event: CloudWatchEvent, ctx: Context) -> Result<(), Error> {
    println!("Context: {:?}", ctx);
    println!("Event: {:?}", event);
    Ok(())
}
