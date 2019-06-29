# 准备操作系统

## 用户

用户
    USER=gsp
    adduser -d /home/$USER -m $USER
    passwd $USER

    visudo

## Docker

安装依赖的包

    sudo yum install -y yum-utils \
      device-mapper-persistent-data \
      lvm2
      
创建stable仓库

    sudo yum-config-manager \
        --add-repo \
        https://download.docker.com/linux/centos/docker-ce.repo
        
修改为阿里云仓库

    sudo yum-config-manager \
        --add-repo \
        http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
        
安装社区版

    sudo yum install docker-ce docker-ce-cli containerd.io

启动Docker

    sudo systemctl start docker
    
Hello world!

    sudo docker run hello-world

## git@docker

    docker run -ti --rm -v ${HOME}:/root -v $(pwd):/git alpine/git clone https://github.com/alpine-docker/git.git

## node@docker

    docker run -ti --rm node node -v

## redis

	# 启动Redis
    mkdir -p ~/data/redis
    docker run --rm -p 6379:6379 -v $PWD/data/redis:/data -d --name redis redis:latest redis-server --appendonly yes

    # Redis Cli
    docker exec -it redis redis-cli
	docker run --rm -it --link redis:redis-server redis redis-cli -h redis-server