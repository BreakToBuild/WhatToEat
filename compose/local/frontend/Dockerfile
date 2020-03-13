FROM node:10

RUN useradd --user-group --create-home --shell /bin/false app &&\
  npm install --global npm@latest && npm install --global yarn@latest &&\
  npm install --global locize-cli

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin

RUN npm --version && yarn --version

RUN mkdir /home/app/.ssh
COPY ./compose/local/frontend/keys/dockerfrontendpromptly /home/app/.ssh/id_rsa
RUN chmod 600 /home/app/.ssh/*
RUN ssh-keyscan gitlab.com >> home/app/.ssh/known_hosts

RUN mkdir /home/app/src
WORKDIR /home/app/src

COPY ./frontend/package*.json ./frontend/yarn.lock ./
COPY ./frontend/internals/ ./internals/
COPY ./compose/local/frontend/start /home/app/start
RUN chmod 775 /home/app/start

RUN chown -R app:app /home/app

USER app
ENV NODE_ENV developement
ENV HOME=/home/app

RUN yarn install --frozen-lockfile

EXPOSE 3000
ENTRYPOINT ["/bin/bash", "/home/app/start"]
CMD ["start"]
