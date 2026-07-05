---
title: CI/CD with GitHub Actions
tier: advanced
platform: java
position: 10
---

# CI/CD with GitHub Actions

[Hub](https://alibaihaqi.github.io/learning-docs/) › Java › Advanced › CI/CD with GitHub Actions

**Goal**

Add a GitHub Actions workflow that builds, tests (with Testcontainers), packages, and pushes a Docker image to GitHub Container Registry.

**Prerequisites**

- [Actuator and health](./09-actuator-health.md)
- GitHub repo with the Java project pushed

## The workflow

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest
    timeout-minutes: 15

    steps:
      - uses: actions/checkout@v4

      - name: Set up JDK 21
        uses: actions/setup-java@v4
        with:
          java-version: "21"
          distribution: "temurin"
          cache: maven

      - name: Build and test (with Testcontainers)
        run: ./mvnw verify -B
        env:
          DOCKER_HOST: unix:///var/run/docker.sock
          TESTCONTAINERS_RYUK_DISABLED: "true"

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: test-results
          path: target/surefire-reports/

  docker:
    if: github.ref == 'refs/heads/main'
    needs: build
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - uses: actions/checkout@v4

      - name: Log in to GHCR
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push
        uses: docker/build-push-action@v6
        with:
          push: true
          tags: ghcr.io/${{ github.repository }}:${{ github.sha }}
```

### Key points

- `TESTCONTAINERS_RYUK_DISABLED=true` — Testcontainers on GitHub Actions doesn't need Ryuk (the cleanup daemon) since the runner is ephemeral.
- `DOCKER_HOST` — Testcontainers needs access to Docker to start PostgreSQL containers.
- Maven caching via `actions/setup-java` — speeds up subsequent builds.

## Maven wrapper

Ensure your project has the Maven Wrapper (it should if created via Spring Initializr):

```bash
# If not present, add it:
mvn wrapper:wrapper -Dmaven=3.9.9
```

The wrapper (`mvnw`) ensures the correct Maven version is used in CI without pre-installing it.

## Maven settings for CI

Create `.mvn/jvm.config`:

```
--add-opens java.base/java.lang=ALL-UNNAMED
--add-opens java.base/java.util=ALL-UNNAMED
```

(Required by Testcontainers on newer JDK versions for reflection access.)

## Checkpoint

```bash
git push origin main
# Open https://github.com/<user>/<repo>/actions
# Workflow runs:
#   1. Maven build with tests (Testcontainers spins up Postgres)
#   2. Docker build and push to GHCR (main only)
```

**You've completed the Java Advanced tier.** The intermediate H2 CRUD API is now a production-ready Spring Boot app with PostgreSQL, Flyway migrations, Spring Security JWT auth, Docker deployment, Testcontainers integration tests, OpenAPI docs, Redis caching, Actuator health checks, and CI/CD.
