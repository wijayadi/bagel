#!/bin/bash

set -xe

LERNA_HASH=$(find -L './' -maxdepth 3 -type d -path './node_modules' -prune -o \( -name 'package.json' -o -name 'package-lock.json' \) -type f -exec cat {} \; | md5sum | cut -d' ' -f1)
[ -f ./lerna.hash ] && OLD_LERNA_HASH=$(cat ./lerna.hash) || OLD_LERNA_HASH=NONE

if [ $LERNA_HASH != $OLD_LERNA_HASH ]
then
 lerna clean -y
 lerna bootstrap --hoist --nohoist=*react-native* --nohoist=expo*/* --nohoist=metro* -- --unsafe-perms --ci --prefer-offline
 echo $LERNA_HASH > ./lerna.hash
else
 echo 'skip lerna bootstrap'
fi

#lerna run build-all --stream --concurrency 1 --no-bail

#$LERNA clean $LERNA_PARAM
#$LERNA build $LERNA_PARAM
#$LERNA webpack $LERNA_PARAM
#$LERNA lint $LERNA_PARAM
#$LERNA release $LERNA_PARAM

#./release_all.sh
