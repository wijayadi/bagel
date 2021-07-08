FROM node:14.17.3-buster

ARG UID
ARG GID
ARG DOCKER_GID

COPY CA.crt /usr/local/share/ca-certificates/
RUN update-ca-certificates

RUN set -xe \ 
    && DEBIAN_FRONTEND=noninteractive apt-get update -y -o Acquire::Check-Valid-Until=false \
    && DEBIAN_FRONTEND=noninteractive apt-get install -yyq --allow-unauthenticated --no-install-recommends --no-upgrade \
    ca-certificates \
    libappindicator1 libasound2 libatk1.0-0 \ 
    libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 \
    libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 \
    libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 \
    libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 \
    libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 \
    libxss1 libxtst6 gconf-service lsb-release xdg-utils \
    fonts-liberation iputils-ping \
    wget htop nano \
    #&& git config --global http.proxy $https_proxy \
    #&& git config --global https.proxy $https_proxy \
    #&& git config --global http.sslVerify false \
    #&& git config --global url."https://".insteadOf git:// \
    #&& git config --global url."https://github.com/".insteadOf git@github.com: \
    && apt-get clean

RUN userdel -f node && groupadd -g $GID jenkins \
    && groupadd -g $DOCKER_GID docker \
    && useradd -m -u $UID -g $GID -s /bin/bash jenkins \
    && usermod -a -G $DOCKER_GID jenkins

ENV NODE_EXTRA_CA_CERTS /usr/local/share/ca-certificates/CA.crt

RUN npm install -g lerna@v4.0.0 syncpack@5.7.11 rimraf@3.0.2 --unsafe-perm --prefer-offline --loglevel=error \
    && npm cache clean --force --loglevel=error && npm cache verify

#RUN echo 'kernel.unprivileged_userns_clone=1' > /etc/sysctl.d/userns.conf

#COPY --chown=jenkins:jenkins ./.npmrc /home/jenkins/.npmrc

USER jenkins
WORKDIR /home/jenkins/bagel
