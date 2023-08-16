FROM node:lts-bullseye as setup
WORKDIR /usr/dev
COPY . .
RUN yarn install

FROM setup as analyze
RUN yarn lint

FROM setup as test
RUN yarn test

FROM setup as build
RUN yarn build

FROM build as release
USER root
RUN git config --global credential.helper store && \
    git config --global user.name "Circle CI" && \
    git config --global user.email "circle-ci@zthunworks.com" && \
    git remote set-url origin https://github.com/zthun/pokedexii && \
    git remote -v && \
    git checkout latest
RUN --mount=type=secret,id=GIT_CREDENTIALS,dst=/root/.git-credentials npx lerna version --conventional-commits --yes --no-push -m "chore: version [skip ci]" && \
    yarn install && \
    git add . && \
    git commit --allow-empty -m "chore: update yarn lockfile [skip ci]" && \
    git push && \
    git push --tags
RUN --mount=type=secret,id=NPM_CREDENTIALS,dst=/root/.npmrc npx lerna publish from-package --yes

FROM node:lts-alpine as pokedex-web-install
RUN npm install -g @zthun/pokedex-web

FROM nginx:stable-alpine as pokedex-web
COPY --from=pokedex-web-install /usr/local/lib/node_modules/@zthun/pokedex-web/dist/. /usr/share/nginx/html/

FROM node:lts-bullseye-slim as pokedex-api
RUN npm install -g @zthun/pokedex-api
EXPOSE 3000
CMD ["pokedex-api"]
