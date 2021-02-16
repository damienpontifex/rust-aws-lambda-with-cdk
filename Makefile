check:
	cargo check

build-for-lambda:
	#TODO: $(command -v x86_64-linux-musl-gcc) check to make sure musl is installed on macOS
	#TODO: brew install filosottile/musl-cross/musl-cross
	cargo build --release --target x86_64-unknown-linux-musl

package-lambda-build:
	# For a custom runtime, AWS Lambda looks for an executable called bootstrap in the deployment package zip.
	# Rename the generated basic executable to bootstrap and add it to a zip archive.
	cd target/x86_64-unknown-linux-musl/release && \
	cp my_lambda_func bootstrap && \
	zip my_lambda_func bootstrap && \
	rm bootstrap

cdk-deploy:
	cd infrastructure && npx cdk deploy

deploy: build-for-lambda package-lambda-build cdk-deploy