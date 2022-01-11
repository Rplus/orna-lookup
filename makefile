deploy: build
	sh deploy.sh

build: copy-assets copy-monster
	npm run build;

dev: copy-assets copy-monster
	npm run dev

copy-assets:
	mkdir -p public; \
	cp ./public/index.html ./public/404.html

# build-monster:
# 	cd Monster; \
# 	npm run build;

copy-monster:
	rm -rf public/monster; \
	cp -R Monster/public public/monster/

# dev-monster:
# 	cd Monster; \
# 	npm run dev;

# deploy-monster: build-monster copy-monster
# 	sh deploy.sh

getNewData:
	mkdir -p public/data/raw; \
	npm run pulldata
# sync-data:
# 	cp -R ./public/data/* ./public/monster/; \
# 	cp -R ./public/data/* ./Monster/public/
