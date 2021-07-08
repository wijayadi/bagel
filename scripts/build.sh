#!/bin/bash

set -xe

export NODE_SUB_ENV=ci
export GID=`id -g`
export DOCKER_GID=`getent group docker | awk -F: '{printf "%d", $3}'`

ENV_VERSION=`md5sum ./Dockerfile | awk '{ print $1 }'`

export ENV_VERSION=$ENV_VERSION

if [ -z $(docker images -q bagel_env:$ENV_VERSION) ]
then
  docker-compose down

  if [ $(docker images -q bagel_env) ]
  then
     docker rmi $(docker images 'bagel_env' -a -q)
  fi

  docker-compose build --build-arg UID=$UID --build-arg GID=$GID --build-arg DOCKER_GID=$DOCKER_GID bagel_env
fi

docker-compose up -d

#docker exec -u jenkins bagel_env ./bootstrap.sh
