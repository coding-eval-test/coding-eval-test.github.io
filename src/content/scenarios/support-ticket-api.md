---
id: support-ticket-api
title: Support Ticket API
summary: >-
  Join a team maintaining a small internal support desk API. Deliver two user
  stories and fix one reported defect without breaking what already works.
difficulty: foundational
estimatedMinutes: 90
stack:
  - .NET 10
  - ASP.NET Core
  - EF Core 10
  - SQLite
  - xUnit
objectives:
  - Read an unfamiliar, well-structured codebase and follow its conventions
  - Add an endpoint with real validation rules, not just a happy path
  - Keep internal data out of a response that outsiders can see
  - Reproduce and fix a defect from a bug report, not a stack trace
prerequisites:
  - Working C# and basic ASP.NET Core
  - Familiarity with an ORM; EF Core specifically is helpful but not required
  - A GitHub account
templateRepoUrl: https://github.com/coding-eval-test/scenario-support-ticket-api
workItems:
  - id: S1
    type: story
    title: Assign a ticket to an agent
    points: 30
  - id: S2
    type: story
    title: Ticket comment thread with internal notes
    points: 30
  - id: B1
    type: bug
    title: High-priority tickets are buried at the bottom of the queue
    points: 20
regressionPoints: 20
published: true
order: 1
---

## The situation

A small support desk runs on this API. Requesters raise tickets, agents work
them, and a queue page shows what to pick up next. The codebase is healthy and
conventional — three entities, thin controllers, a service layer, and a test
suite that already passes.

Two things are missing and one is wrong. There is no way to assign a ticket to an
agent. The comment table has an internal-note flag that nothing reads or writes.
And the queue sorts in an order nobody intended.

## What you get

A repository that builds and runs on the first try, a seeded database, a Swagger
page, and a test suite that ships red for every work item and green for
everything that already worked. Written stories and a bug report describe what is
wanted; how to get there is your call.

## How you are assessed

Every push runs the grading workflow and writes a scorecard. Each work item
scores its points only when all of its tests pass. Existing behaviour is worth 20
points on its own — breaking working code costs more than leaving a story
unfinished. A rubric in the repository covers what tests cannot see.
