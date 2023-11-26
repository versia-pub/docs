FROM oven/bun:alpine

COPY . /app

RUN cd ./app && bun install
RUN cd ./app && bun docs:build

FROM oven/bun:alpine

COPY --from=builder /app/.vitepress/dist/ /app

LABEL org.opencontainers.image.authors "Gaspard Wierzbinski (https://cpluspatch.com)"
LABEL org.opencontainers.image.source "https://github.com/lysand-org/docs"
LABEL org.opencontainers.image.vendor "Lysand.org"
LABEL org.opencontainers.image.licenses "MIT"
LABEL org.opencontainers.image.title "Lysand Docs"
LABEL org.opencontainers.image.description "Documentation for Lysand"