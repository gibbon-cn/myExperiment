初始

	mkdir -p /home/gsp && cd /home/gsp

	git clone https://github.com/gibbon-cn/myExperiment.git
	# 或
	docker run -ti --rm -v ${HOME}:/root -v $(pwd):/git alpine/git clone https://github.com/gibbon-cn/myExperiment.git
	
集成

	cd myExperiment/GuidRegistry

	npm install
	# 或
	docker

运行
    
	node --require ts-node/register src/main.ts
	# 或
	docker run -ti --link redis:redis-server --rm -v $PWD:/project node  cd /project && npm install

