初始

	mkdir -p /home/gsp && cd /home/gsp

	git clone https://github.com/gibbon-cn/myExperiment.git
	# 或
	docker run -ti --rm -v ${HOME}:/root -v $(pwd):/git git clone https://github.com/gibbon-cn/myExperiment.git
	
集成

	cd myExperiment/GuidRegistry

	npm install
	# 或
	docker

部署

	# 启动Redis
    mkdir -p ~/data/redis
    docker run -p 6379:6379 -v $PWD/data/redis:/data -d redis:latest redis-server --appendonly yes

    # Redis Cli
    docker exec -it 43f7a65ec7f8 redis-cli
    
	node --require ts-node/register src/main.ts
	# 或
	docker	

镜像列表

