# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.
It is the source of truth for AI-assisted development conventions on this project.

## Project Context

FlightMock is a React Native (Expo) flight search app built as a coaching reference
for XP practices — TDD, BDD, SOLID principles, trunk-based development, and full
SDLC automation. Every decision in this codebase is intentional and teachable.

**Target audience:** Dojo coaching for airline mobile development teams.
**Stack:** React Native + Expo + TypeScript (strict) + Jest + Maestro + GitHub Actions + EAS

---

## Commands

```bash
# Start Expo dev server
npx expo start

# Run on iOS simulator (full native rebuild — only when native layer changes)
npx expo run:ios

# Run all tests (single run, no watch)
npx jest --watchAll=false

# Run a single test file
npx jest src/domain/__tests__/FlightSearchService.test.ts --watchAll=false

# Run tests matching a name pattern
npx jest -t "should return flights sorted by price" --watchAll=false

# Lint entire project
npx eslint .

# Run Maestro E2E flow (requires simulator running + Metro running)
maestro test .maestro/flight-search.yaml
```

---

## Architecture

Clean Architecture with Dependency Inversion throughout:

```code
src/
types/        — shared domain contracts (Flight, SearchQuery, ApiResponse)
domain/       — pure business logic (FlightSearchService, ValidationError)
NO React Native imports allowed here — ever
repositories/ — FlightRepository interface + implementations
mocks/ — test/dev implementations only
screens/      — React Native screen components
components/   — reusable UI components
services/     — external integrations (analytics, crash reporting)
```

**Dependency Rule:** Inner layers never import from outer layers.
`domain/` must never import from `screens/`, `components/`, or `services/`.

**Data flow:**
`Screen` → `FlightSearchService(repository)` → `FlightRepository` interface
↓
`MockFlightRepository` (dev/test)
`AmadeusFlightRepository` (production, future)

**DIP in practice:** `FlightSearchService` constructor takes `FlightRepository`
interface — never instantiate a concrete repository inside the service.

---

## TDD Rules — Follow These Exactly

This project follows strict TDD. Claude must respect the sequence:

1. **RED first** — write a failing test before any implementation
2. **GREEN minimum** — write the least code needed to pass the test
3. **REFACTOR** — improve design without changing behaviour

**Claude must never:**

- Write implementation code before a failing test exists
- Write more implementation than the current failing test requires
- Skip the refactor consideration step
- Write tests after the fact to match existing implementation

**Two-loop BDD/TDD cycle:**

- Outer loop: Maestro flow (stays red until full feature is built)
- Inner loop: Jest unit tests (red→green→refactor per behaviour)

---

## SOLID Principles — Applied Here

| Principle | How it applies in this project                                                                                           |
| --------- | ------------------------------------------------------------------------------------------------------------------------ |
| **SRP**   | Each class has one reason to change. `FlightSearchService` orchestrates only. `ValidationError` carries error data only. |
| **OCP**   | Add new repository implementations without modifying `FlightSearchService`.                                              |
| **LSP**   | Any `FlightRepository` implementation must be substitutable without breaking callers.                                    |
| **ISP**   | Keep interfaces small. `FlightRepository` has one method: `search`.                                                      |
| **DIP**   | `FlightSearchService` depends on `FlightRepository` interface, never concrete classes.                                   |

---

## TypeScript Rules

- `strict: true` — non-negotiable, never disable
- `@typescript-eslint/no-explicit-any` is an **error** — all types must be explicit
- Use `interface` for contracts (things other code implements or extends)
- Use `type` for unions, aliases, and utility transformations
- Prefer `readonly` for properties that should not change after construction
- Use `_paramName` prefix for intentionally unused parameters

---

## Testing Conventions

- Tests live in `__tests__/` adjacent to the code they test
- Mock implementations live in `__mocks__/` adjacent to the interface they implement
- Use `jest.fn().mockResolvedValue()` for async mock functions
- Use `toEqual` for arrays and objects, `toBe` for primitives
- Use `rejects.toThrow(ErrorClass)` for testing thrown errors
- `baseQuery` pattern — define a complete valid object, spread-override per test
- Never mutate shared test fixtures — always spread: `{ ...baseQuery, origin: '' }`
- Mutation test new implementations — temporarily break code to verify tests catch it

---

## Code Style

- Conventional Commits: `feat:` `fix:` `chore:` `test:` `docs:` `refactor:`
- Prettier enforces formatting on save — never manually format
- ESLint v9 flat config — `eslint.config.js` not `.eslintrc.js`
- `npx expo install` not `npm install` — version compatibility checking

---

## What Claude Must Never Do

- Add `any` types — ever
- Import React Native in `domain/` or `repositories/`
- Write tests after implementation (always test-first)
- Skip error handling in async functions
- Hardcode values that belong in configuration
- Create files outside the established folder structure without discussion
- Commit secrets, API keys, or credentials
- Use `npm audit fix --force` on transitive dependencies

---

## Token Discipline (Team Guidance)

- Use `/clear` between unrelated tasks to reset context
- Scope requests precisely — name the file and behaviour, not the whole feature
- Review every suggestion before accepting — understand before approving
- Use chat mode for day-to-day; reserve agentic mode for complex multi-file refactors
- If you cannot explain every line Claude wrote, do not merge it

---

## Current Status

**Sprint 1 in progress — FM-001 Search Flights**

- ✅ Domain layer complete (FlightSearchService, FlightRepository, MockFlightRepository)
- ✅ 9 Jest tests passing
- ✅ Maestro FM-001 flow exists but failing (outer loop red — expected)
- ⬜ Search screen UI (next)
- ⬜ Results screen UI
- ⬜ GitHub Actions CI
- ⬜ EAS CD pipeline

### Known Architecture Improvement

App.tsx currently acts as composition root — wiring repository
and service directly. Next refactor:

- Extract to src/composition/ServiceLocator.ts
- Or introduce React Context for service injection
- Coaching talking point: where does dependency wiring belong?
