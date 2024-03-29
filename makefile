deploy: build
	sh deploy.sh

build: copy-assets copy-monster copy-skill
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

copy-skill: build-skill
	rm -rf public/skill; \
	cp -R codex-skill/dist public/skill/

build-skill:
	cd codex-skill; \
	npm run build;

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

parse-orna:
	node ./task/playorna-parser.mjs parse=${parse} type=${type};


# skills:
parse-orna-skills:
	node ./task/skill-parser-in-playerorna.mjs;

merge-skill: pull-skill
	node ./task/merge-skill.mjs;

pull-skill:
	npm run pulldata type=skill;

merge-item:
	node ./task/pullData.mjs; \
	node ./task/playorna-parser.mjs parse=1 type=items; \
	node ./task/playorna-parser.mjs type=items; \
	node ./task/merge-item.mjs;
