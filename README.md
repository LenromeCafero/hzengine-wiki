# HZ-Engine Wiki

目前尚未选好文档域名，暂时使用如下 Demo 链接预览文档

https://oascu82.demo.xiaomaitx.com/

## 贡献指南

### 认识项目结构

| 文件/目录              | 描述                                         |
|-----------------------|--------------------------------------------|
| `.github`             | 存放 GitHub 相关文件，如工作流和问题模板。    |
| `.gitignore`          | 列出 Git 应该忽略的文件和目录。               |
| `.vitepress`          | 用于 VitePress 的配置和文档内容。             |
| `docker-compose.yaml` | Docker Compose 配置文件，用于定义和运行多容器应用。 |
| `Dockerfile`          | Docker 镜像的构建文件，定义了如何构建应用镜像。 |
| `index.md`           | 项目的主页或入口文档，通常用于展示项目概述。   |
| `package.json`       | Node.js 项目的配置文件，包含项目依赖和脚本等信息。 |
| `pnpm-lock.yaml`     | pnpm 的锁定文件，确保依赖的版本一致。          |
| `project_structure.txt` | 项目结构的文本说明文件，描述项目的组成部分。    |
| `public`             | 存放静态文件（如图片、字体等）的目录，通常在构建时会被引用。 |
| `README.md`          | 项目的自述文件，提供项目的基本信息和使用说明。   |
| `wiki`               | 项目相关的文档和知识库，通常用于存放更详细的说明。 |


### 规范贡献流程

## 部署指南

### Docker

```bash
docker run -d --name hzengine-wiki -p 3001:3000 -e NODE_ENV=development xiaomaitx/hzengine-wiki
```

服务将会启动在`http://localhost:3001`

### Docker Compose

```bash
git clone https://github.com/LenromeCafero/hzengine-wiki.gi

# 运行
docker compose up

# 后台运行
docker compose up -d
```

服务将会启动在`http://localhost:3001`

或者手动复制文件内容到`docker-compose.yaml`

```yaml
version: "3"
services:
    vitepress:
        image: xiaomaitx/hzengine-wiki
        container_name: hzengine-wiki
        ports:
            - "3001:3000"
        environment:
            - NODE_ENV=development

```

## 开发

### 安装开发环境

```bash
pnpm add -D vitepress
pnpm install
```

### 启动并运行

```bash
pnpm run docs:dev
```