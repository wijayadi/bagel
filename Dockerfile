FROM node:12.20.1-buster

ARG UID
ARG GID
ARG DOCKER_GID

# RUN apt-get update && 
RUN apt-get install -yyq --allow-unauthenticated \
    ca-certificates \
    libappindicator1 libasound2 libatk1.0-0 \ 
    libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 \
    libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 \
    libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 \
    libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 \
    libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 \
    libxss1 libxtst6 \
    gconf-service lsb-release wget \
    xdg-utils \
    fonts-liberation \
    mysql-client nano \
    && apt-get clean

RUN userdel -f node && groupadd -g $GID jenkins \
    && groupadd -g $DOCKER_GID docker \
    && useradd -m -u $UID -g $GID -s /bin/bash jenkins \
    && usermod -a -G $DOCKER_GID jenkins

#RUN npm install -g npm@6.12.0 gulp@4.0.2 lerna@v3.20.2 rimraf@3.0.1 typescript@3.7.5 --prefer-offline --loglevel=error \
#    && npm cache clean --force --loglevel=error && npm cache verify

#RUN echo 'kernel.unprivileged_userns_clone=1' > /etc/sysctl.d/userns.conf

#COPY --chown=jenkins:jenkins ./.npmrc /home/jenkins/.npmrc

USER jenkins
WORKDIR /home/jenkins/bagel
