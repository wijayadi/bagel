#!/bin/bash

set -xe

export GID=`id -g`
export DOCKER_GID=`getent group docker | awk -F: '{printf "%d", $3}'`
export ENV_VERSION=`md5sum ./Dockerfile | awk '{ print $1 }'`

PROXIES=()
HOSTNAME=`hostname`

if [ "$HOSTNAME" = "t450" ];
then
  PROXIES=(--build-arg http_proxy=http://192.168.100.11:3128 --build-arg https_proxy=http://192.168.100.11:4128)
elif [[ "$HOSTNAME" = onecloud* ]];
then
  PROXIES=(--build-arg http_proxy=http://192.168.1.114:3128 --build-arg https_proxy=http://192.168.1.114:4128)
fi

docker-compose --log-level ERROR build "${PROXIES[@]}" --compress --build-arg UID=$UID --build-arg GID=$GID --build-arg DOCKER_GID=$DOCKER_GID bagel_env
docker-compose up -d

docker exec -u jenkins bagel_env ./bootstrap.sh
