FROM debian:bullseye as builder

ARG NODE_VERSION=16.18.1
ARG YARN_VERSION=3.3.1
ARG NODE_ENV=production
ARG DOPPLER_TOKEN

# Fly.io
RUN apt-get update; apt install -y curl wget systemctl sudo
RUN curl https://get.volta.sh | bash
ENV VOLTA_HOME /root/.volta
ENV PATH /root/.volta/bin:$PATH
RUN volta install node@${NODE_VERSION} yarn@${YARN_VERSION}

ENV NODE_ENV ${NODE_ENV}
RUN mkdir /app
WORKDIR /app

COPY . .

RUN yarn config set nodeLinker node-modules
RUN yarn config set compressionLevel 0
RUN yarn config set nmMode hardlinks-local
RUN yarn config set enableGlobalCache true

RUN yarn install

#######################################################################

FROM debian:bullseye
LABEL fly_launch_runtime="nodejs"

COPY --from=builder /root/.volta /root/.volta
COPY --from=builder /app /app

WORKDIR /app
ENV NODE_ENV ${NODE_ENV}
ENV PATH /root/.volta/bin:$PATH
ENV DOPPLER_TOKEN ${DOPPLER_TOKEN}

# Install Doppler CLI
RUN apt-get update && apt-get install -y apt-transport-https ca-certificates curl gnupg && \
  curl -sLf --retry 3 --tlsv1.2 --proto "=https" 'https://packages.doppler.com/public/cli/gpg.DE2A7741A397C129.key' | apt-key add - && \
  echo "deb https://packages.doppler.com/public/cli/deb/debian any-version main" | tee /etc/apt/sources.list.d/doppler-cli.list && \
  apt-get update && \
  apt-get -y install doppler

RUN yarn build

EXPOSE 2200

ENTRYPOINT ["doppler", "run", "--"]
CMD [ "yarn", "start"]
