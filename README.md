```bash
rustup target add x86_64-unknown-linux-musl
brew install filosottile/musl-cross/musl-cross
mkdir .cargo
echo '[target.x86_64-unknown-linux-musl]\nlinker = "x86_64-linux-musl-gcc"' > .cargo/config
cargo build --release --target x86_64-unknown-linux-musl && (cd target/x86_64-unknown-linux-musl/release && cp my_lambda_func bootstrap && zip my_lambda_func bootstrap && rm bootstrap)

(cd infrastructure && npm ci)
(cd infrastructure && npx cdk bootstrap)
(cd infrastructure && npx cdk deploy)
```