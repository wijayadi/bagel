#!/bin/bash

set -xe

export GID=`id -g`
export DOCKER_GID=`getent group docker | awk -F: '{printf "%d", $3}'`
export ENV_VERSION=`md5sum ./Dockerfile | awk '{ print $1 }'`

docker-compose build --build-arg UID=$UID --build-arg GID=$GID --build-arg DOCKER_GID=$DOCKER_GID bagel_env
docker-compose up -d

docker exec -u jenkins bagel_env ./bootstrap.sh
