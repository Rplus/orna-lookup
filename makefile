deploy-all: build build-monster copy-assets copy-monster
	sh deploy.sh

deploy: copy-assets build
	sh deploy.sh

build: sync-data
	npm run build;

dev: copy-assets sync-data
	npm run dev

copy-assets:
	mkdir -p public; \
	cp ./public/index.html ./public/404.html

build-monster: sync-data
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

getNewData:
	wget -q --no-check-certificate --no-cache --no-cookies --show-progress 'https://opensheet.elk.sh/1JZM_9U7hYtq39T0BeZHaUrJVKSWWNfxLxcZnrJPiHBQ/monster.json' -O './public/data/monster.json'; \
	wget -q --no-check-certificate --no-cache --no-cookies --show-progress 'https://opensheet.elk.sh/1JZM_9U7hYtq39T0BeZHaUrJVKSWWNfxLxcZnrJPiHBQ/item.json' -O './public/data/item.json'; \
	wget -q --no-check-certificate --no-cache --no-cookies --show-progress 'https://opensheet.elk.sh/1JZM_9U7hYtq39T0BeZHaUrJVKSWWNfxLxcZnrJPiHBQ/skill.json' -O './public/data/skill.json'

sync-data:
	cp -R ./public/data/* ./public/monster/; \
	cp -R ./public/data/* ./Monster/public/
