check:
	cargo check

build-for-lambda:
	docker run --rm \
	  --user "$(id -u)":"$(id -g)" \
	  -v "${PWD}":/usr/src/myapp \
	  -w /usr/src/myapp \
	  rust:1.51 \
	  cargo build --release --target x86_64-unknown-linux-gnu
	# For a custom runtime, AWS Lambda looks for an executable called bootstrap in the deployment package zip.
	# Rename the generated basic executable to bootstrap and add it to a zip archive.
	cd target/x86_64-unknown-linux-gnu/release && \
	zip bootstrap bootstrap && \

cdk-deploy:
	cd infrastructure && npm ci && npx cdk deploy

deploy: build-for-lambda cdk-deploy
