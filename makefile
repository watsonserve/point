#! /bin/make

wiki-fe: /tmp/wiki-fe.tar.gz
	scp -P 1022 -i ~/.ssh/watson.pem $^ server@watsonserve.com:/tmp/
	ssh -p 1022 -i ~/.ssh/watson.pem server@watsonserve.com 'rm -rf ~/res/wiki/* && tar -xzf /tmp/wiki-fe.tar.gz -C ~/res/wiki/'
	ssh -p 1022 -i ~/.ssh/watson.pem server@watsonserve.com 'mv ~/res/wiki/index.html ~/wiki-fe/ && rm ~/res/wiki/favicon.ico'

/tmp/wiki-fe.tar.gz: src
	yarn run build
	tar -czf $@ -C dist .

clean:
	rm -rf /tmp/wiki-fe.tar.gz
