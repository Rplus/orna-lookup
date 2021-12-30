deploy-all: build build-monster copy-assets copy-monster
	sh deploy.sh

deploy: copy-assets build
	sh deploy.sh

build:
	npm run build;

dev: copy-assets
	npm run dev

copy-assets:
	mkdir -p public; \
	cp ./public/index.html ./public/404.html

build-monster:
	cd Monster; \
	npm run build;

copy-monster:
	rm -rf public/monster; \
	cp -R Monster/public public/monster/

dev-monster:
	cd Monster; \
	npm run dev;

deploy-monster: build-monster copy-monster
	sh deploy.sh
