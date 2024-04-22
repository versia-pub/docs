FROM oven/bun:alpine as base

# Install dependencies into temp directory
# This will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# Install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

FROM base AS builder

COPY . /app
RUN cd /app && bun install
RUN cd /app && bun docs:build

FROM base AS final

COPY --from=builder /app/.vitepress/dist/ /app

LABEL org.opencontainers.image.authors "Gaspard Wierzbinski (https://cpluspatch.com)"
LABEL org.opencontainers.image.source "https://github.com/lysand-org/docs"
LABEL org.opencontainers.image.vendor "Lysand.org"
LABEL org.opencontainers.image.licenses "MIT"
LABEL org.opencontainers.image.title "Lysand Docs"
LABEL org.opencontainers.image.description "Documentation for Lysand"

WORKDIR /app
CMD ["bun", "docs:serve"]