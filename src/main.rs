use aws_lambda_events::event::cloudwatch_events::CloudWatchEvent;

pub type Error = Box<dyn std::error::Error + Send + Sync + 'static>;

#[tokio::main]
async fn main() -> Result<(), Error> {
    let func = lambda::handler_fn(my_handler);
    lambda::run(func).await?;
    Ok(())
}

async fn my_handler(event: CloudWatchEvent, ctx: lambda::Context) -> Result<(), Error> {
    println!("Context: {:?}", ctx);
    println!("Event: {:?}", event);
    Ok(())
}