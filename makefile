deploy: copy-assets build
	sh deploy.sh

build:
	npm run build;

dev: copy-assets
	npm run dev

copy-assets:
	mkdir -p public; \
	cp ./public/index.html ./public/404.html
