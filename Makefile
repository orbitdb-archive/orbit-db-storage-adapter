all: build

deps:
	npm install
	make redis

test: deps
	npm run test
	
build: test
	mkdir -p examples/browser/lib/
	npm run build
	cp dist/orbitdb.min.js examples/browser/lib/orbitdb.min.js
	cp node_modules/ipfs/dist/index.min.js examples/browser/lib/ipfs.min.js
	cp dist/orbitdb.js examples/browser/lib/orbitdb.js
	cp dist/orbitdb.js.map examples/browser/lib/orbitdb.js.map
	cp node_modules/ipfs/dist/index.js examples/browser/lib/ipfs.js
	@echo "Build success!"
	@echo "Output: 'dist/', 'examples/browser/'"

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
