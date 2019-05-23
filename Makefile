all: build

deps:
	npm install
	make redis

test: deps
	npm run test
	rm -f dump.rdb
	rm -f orbitdb.json
	
build: test
	npm run build
	@echo "Build success!"
	@echo "Output: 'dist/'"

clean:
	rm -rf orbitdb/
	rm -rf customDir/
	rm -rf node_modules/
	rm -rf redis-stable/

redis:
	wget http://download.redis.io/redis-stable.tar.gz
	tar xvzf redis-stable.tar.gz
	cd redis-stable && make
	cp redis-stable/src/redis-server node_modules/.bin
	rm -rf redis-stable*

clean-dependencies: clean
	rm -f package-lock.json;

rebuild: | clean-dependencies build

.PHONY: test build
