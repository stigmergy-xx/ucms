UCMS Core [![Build Status](https://travis-ci.org/ucms/ucms-core.svg?branch=master)](https://travis-ci.org/ucms/ucms-core)
===========

基于Koa、React搭建的CMS系统，拥有良好的性能、可插件化、以及对React Native友好的API。

本模块为UCMS的入口模块。

## 环境变量

### NODE_ENV

如果为`production`，则ucms会默认运行在生产模式，这会禁用大部分调试信息和面向开发者的警告，提高性能并减少干扰信息。

## 配置文件

在本模块根目录下可配置config.json模块，其内部存放一个object，key为插件的名字，value为插件的配置（通常为一个对象）。

## 使用说明

```bash
ucms [command] [options]
```

### development

强制运行在开发模式下，不论是否存在NODE_ENV

### production

强制运行在生产模式下，不论是否存在NODE_ENV

### --host hostname

设置监听的主机名。默认为localhost。

### --port port

设置监听的端口号。默认为8901。

