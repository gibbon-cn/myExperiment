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

## git

    docker run -ti --rm -v ${HOME}:/root -v $(pwd):/git alpine/git clone https://github.com/alpine-docker/git.git

