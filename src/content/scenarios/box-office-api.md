---
id: box-office-api
title: Box Office API
summary: >-
  Bookings that collide, charges that happen twice, writes that land halfway,
  and a sale that opened at the wrong hour for half the world. The hardest
  scenario in the catalog — finish another one first.
difficulty: advanced
track: dotnet-backend
estimatedMinutes: 240
stack:
  - .NET 10
  - ASP.NET Core
  - EF Core 10
  - SQLite
  - xUnit
objectives:
  - Make a booking flow safe when two buyers go for the same seat at once
  - Keep a multi-row confirmation all-or-nothing when a dependency fails mid-request
  - Design an endpoint that survives client retries without double effects
  - Reason about instants and time zones instead of trusting the server clock
prerequisites:
  - Complete inventory-api (or an equivalent scenario) first — treat this one as growth, not as the bar
  - Comfortable C# and ASP.NET Core; real EF Core familiarity
  - A GitHub account
templateRepoUrl: https://github.com/coding-eval-test/scenario-box-office-api
workItems:
  - id: S1
    type: story
    title: Idempotent booking
    points: 20
  - id: S2
    type: story
    title: Atomic confirmation
    points: 15
  - id: S3
    type: story
    title: Seat hold with expiry
    points: 15
  - id: B1
    type: bug
    title: Double-booking under contention
    points: 15
  - id: B2
    type: bug
    title: Sale opens at the wrong moment
    points: 15
regressionPoints: 20
published: true
order: 3
---

## The situation

**This is a stretch scenario** — the hardest in the catalog, and deliberately
harder than what a typical coding interview will ask of you. Finish one of the
other scenarios first, and treat this one as growth, not as the bar.

A small box office sells reserved seats. The API browses events, shows seat
maps, and books seats — and the happy path genuinely works. What you are
picking up is the other backlog: twice this month two customers were charged
for the same seat; finance found bookings with no payment record after a
deploy; support keeps refunding buyers whose flaky connections retried a
booking; and the Winter Gala went on sale hours early for some regions and
hours late for others.

None of these appear when you click through the app. All of them are the kind
of failure enterprise systems actually have.

## What you get

A repository that builds and runs on the first try, a seeded database, a
Swagger page, and a test suite that ships red for every work item and green for
everything that already worked. The temporal and payment seams are already
injectable, which is what makes every failing test deterministic — no sleeps,
no flakes, no luck.

## How you are assessed

Every push runs the grading workflow and writes a scorecard. Each work item
scores its points only when all of its tests pass. Existing behaviour is worth
20 points on its own — breaking working code costs more than leaving a story
unfinished. A rubric in the repository covers what tests cannot see.
