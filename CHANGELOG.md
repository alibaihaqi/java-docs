# Changelog

All notable changes to the Java learning-docs site. Newest first.
Format loosely follows [Keep a Changelog](https://keepachangelog.com/).

## 2026-07-04 — Intermediate tier + CI

### Added
- **Intermediate tier** (`src/intermediate/`, 7 pages): extends the beginner
  Spring `GET /items` endpoint into a Spring Data JPA (in-memory H2) CRUD API —
  entity + `JpaRepository`, service layer, `GET`/`GET {id}`/`POST` with bean
  validation, `@RestControllerAdvice` error handling, and `@DataJpaTest` +
  `@WebMvcTest`/MockMvc tests. Wired into the sidebar, nav, and home feature card.
- **`CLAUDE.md`** — public-safe repo conventions (tier/ladder pattern,
  frontmatter schema, add-a-page/tier steps, build commands, no-secrets rule).

### Changed
- **CI:** pinned Node to `26.4.0` (`.node-version` + `deploy` workflow).

## 2026-06 — Beginner tier + refresh

### Added
- **Beginner tier**: numbered ladder building one Spring Boot `GET /items`
  endpoint returning fixed JSON on :8080.
- Hub back-link on the home page.

### Changed
- Bumped VitePress to 1.6.4; bumped deprecated GitHub Actions.

## 2023 — Initial documentation

### Added
- Initial Java docs site (VitePress): Spring Boot setup, first REST API, Maven
  build/jar, profiles, actuator, embedded Tomcat, and the `spring-boot` MVC-app
  section; deploy workflow to GitHub Pages; migrated package manager to pnpm.
