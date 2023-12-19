### docker

### 1. 基本概念

1. 镜像和容器

当我们利用 Docker 安装应用时，Docker 会自哦那个搜索并下载映应用**镜像(image)**。镜像不仅包括应用本身，还包含应用所需要的环境、配置、系统函数库。Docker 会在运行镜像时创建一个隔离环境，称为**容器(container)**。

### 2. 基本命令

```shell
docker run -d --name mysql -p 3306:3306 -e TZ=Asia/Shanghai -e MYSQL_ROOT_PASSWORD=123 mysql
```

- docker run：创建并运行一个容器，-d 让容器在后台运行
- --name mysql：给容器起名字，必须唯一
- -p 3306：3306：设置端口映射
- -e：环境变量
- 镜像名称结构：Repository:Tag

```shell
docker images # 查看镜像
docker rmi # 删除镜像
docker pull # 从镜像仓库拉取镜像
docker push # 推送镜像到镜像仓库
docker build # 通过dockerfile构建镜像
docker save # 讲镜像保存成压缩包
docker load # 将压缩包加载成本地镜像

docker stop # 停止容器运行
docker start # 运行容器
docker ps # 查看当前容器的运行状态
docker rm # 删除容器
docker logs # 查看日志
docker exec # 进入容器执行命令
```

### 3. 数据卷

数据卷(volume)是一个虚拟目录，是容器内目录与宿主机目录之间映射的桥梁。方便操作容器内文件，或者方便迁移容器产生的数据

```shell
docker volume create # 创建数据卷
docker volume ls # 查看所有数据卷
docker volume rm # 删除指定数据卷
docker volume inspect # 查看某个数据卷的详情
docker volume prune # 清除数据卷
```

执行 docker run 命令时，使用 `-v 数据卷:容器内目录`可以完成数据卷挂载，当创建容器时，如果挂载了数据卷且数据卷不存在，会自动创建数据卷。

### 4. DockerFile

1. 自定义镜像：镜像就是包含了应用程序，程序运行的系统函数库、运行配置等文件的文件包。构建镜像的过程其实就是把上述文件打包的过程。
2. 镜像结构：

- 入口(Entrypoint)：镜像运行入口，一般是程序启动的脚本和参数
- 层(Layer)：添加安装包、依赖、配置等，每次操作都形成新的一层
- 基础镜像(BasImage)：应用依赖的系统函数库、环境、配置、文件等

3. Dockerfile 就是一个文本文件，其中包含一个个的指令(Instruction)，用指令来说明要执行说明操作来构建镜像。讲来 Docker 可以根据 Dockerfile 帮我们构建镜像。

```shell
FROM # 指定基础镜像 # FROM centos:6
ENV # 设置环境变量 # ENV key value
COPY # 拷贝本地文件到镜像的指定目录 # COPY ./jre11.tar.gz /tmp
RUN # 执行linux的shell命令，一般是安装过程的命令 # RUN tar -zxvf /tmp/jre11.tar.gz && EXPORTS path=/tmp/jre11:$path
EXPOSE # 指定容器运行时监听的端口，是给镜像使用者看的 # EXPOSE 8080
ENTRYPOINT # 镜像中应用的启动命令，容器运行时调用 # ENTRYPOINT java -jar xx.jar
```

### 5. 网络

加入自定义网络的容器才可以通过容器名互相访问

```shell
docker network create # 创建一个网络
docker network ls # 查看所有网络
docker network rm # 删除指定网络
docker network prune # 清除未使用网络
docker network connect # 使指定容器连接加入某网络
docker network disconnect # 使指定容器连接离开某网络
docker network inspect # 查看网络详情信息
```

### 6. DockerCompose

Docker Compose 通过一个单独的 **docker-compose.yml** 模版文件(YAML 格式)来定义一组相关的应用容器，帮助我们实现**多个相互关联的 Docker 容器的快速部署**。

```shell
docker compose [OPTIONS] [COMMAND]
```

Options:

```shell
-f # 指定compose文件的路径和名称
-p # 指定project名称
```

Commands

```shell
up # 创建并启动所有service容器
down # 停止并移除所有容器、网络
ps # 列出所有启动的容器
logs # 查看置顶容器的日志
stop # 停止容器
start # 启动容器
restart # 重启容器
top # 查看运行的进程
exec # 在指定的运行中容器中执行命令
```

case:

```shell
docker run -d \
  --name mysql \
  -p 3306:3306 \
  -e TZ=Asia/Shanghai \
  -v ./mysql/data:/var/lib/mysql \
  -v ./mysql/conf:/etc/mysql/conf.d \
  -v ./mysql/init:/docker-entrypoint-initdb.d \
  --network nName
  mysql
```

same as:

```shell
version: "0.1"
services:
  mysql:
    images: mysql
    container_name: mysql
    ports:
      - "3306:3306"
    environment:
      TZ: Asia/Shanghai
      MYSQL_ROOT_PASSWORD: 123
    volumes:
      - "./mysql/conf:/etc/mysql/conf.d"
      - "./mysql/data:/var/lib/mysql"
      - "./mysql/init:/docker-entrypoint-initdb.d"
    networks:
     - nName
```
