FROM node:current

RUN npm install --global locize-cli && npm cache clean --force

RUN mkdir /home/node/.ssh
COPY ./compose/local/frontend/keys/dockerfrontendpromptly /home/node/.ssh/id_rsa
RUN chmod 600 /home/node/.ssh/*
RUN ssh-keyscan gitlab.com >> home/node/.ssh/known_hosts

COPY --chown=node:node ./frontend /home/node/frontend
COPY --chown=node:node ./compose/frontend_build/start /home/node/start
RUN chmod 775 /home/node/start

RUN chown -R node:node /home/node/

VOLUME [ "/home/node/build" ]

USER node
WORKDIR /home/node/frontend
ENV NODE_ENV development
ENV HOME=/home/node

RUN yarn install --frozen-lockfile && yarn cache clean
ENV PATH=$PATH:/home/node/frontend/node_modules/.bin

EXPOSE 3000
ENTRYPOINT ["/bin/bash", "/home/node/start"]
CMD ["start"]
