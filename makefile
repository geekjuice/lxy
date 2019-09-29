MAKEFLAGS = -j1

JS = "**/*.js"
INDEX = "index.js"

DONE = echo [lxy] ✓ $@ done

.PHONY: default \
	clean \
	wipe \
	install \
	outdated \
	lint \
	format \
	test \
	debug \
	start \
	next \
	latest

default:
	echo "Please enter a command..."
	$(DONE)

$(verbose).SILENT:

clean:
	rm -rf npm-debug.log
	$(DONE)

wipe: clean
	rm -rf node_modules
	$(DONE)

install: wipe
	npm install
	$(DONE)

outdated:
	npm outdated
	$(DONE)

lint:
	npm run eslint -- $(JS)
	$(DONE)

format:
	npm run prettier -- --write $(JS)
	$(DONE)

test:
	npm run jest
	$(DONE)

start:
	node $(INDEX)
	$(DONE)

next:
	npm publish --tag=next
	$(DONE)

latest:
	npm publish --tag=latest
	$(DONE)
