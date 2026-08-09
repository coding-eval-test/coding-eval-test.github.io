---
id: library-api
title: Library Loans API
summary: >-
  Join a team maintaining a small lending-library API. Finish the loans
  feature — checkout rules and returns — and fix a due-date defect members
  keep reporting.
difficulty: foundational
track: java-backend
estimatedMinutes: 90
stack:
  - Java 21
  - Spring Boot 4
  - Spring Data JPA
  - H2
  - Flyway
  - JUnit 5
objectives:
  - Read an unfamiliar, well-structured codebase and follow its conventions
  - Enforce a real business rule, not just a happy path
  - Extend an API without breaking what already works
  - Reproduce and fix a defect from a bug report, not a stack trace
prerequisites:
  - Working Java and basic Spring Boot
  - Familiarity with an ORM; Spring Data JPA specifically is helpful but not required
  - A GitHub account
templateRepoUrl: https://github.com/coding-eval-test/scenario-library-api
workItems:
  - id: S1
    type: story
    title: Check out a book
    points: 25
  - id: S2
    type: story
    title: Return a book
    points: 25
  - id: B1
    type: bug
    title: Books come due a day early
    points: 20
regressionPoints: 30
published: false
order: 1
---

## The situation

A small lending library runs on this API. The catalog and membership features
are done and tested. The loans feature is half-built: checkout exists but hands
out books the library doesn't have, there is no way to return a book, and the
front desk keeps hearing that due dates land a day early.

## What you get

A repository that builds and runs on the first try, a seeded database, an H2
console, and a test suite that ships red for every work item and green for
everything that already worked. Written stories and a bug report describe what
is wanted; how to get there is your call.

## How you are assessed

Every push runs the grading workflow and writes a scorecard. Each work item
scores its points only when all of its tests pass. Existing behaviour is worth
30 points on its own — breaking working code costs more than leaving a story
unfinished. A rubric in the repository covers what tests cannot see.
