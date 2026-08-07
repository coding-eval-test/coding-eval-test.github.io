---
id: inventory-api
title: Order & Inventory API
summary: >-
  Join a team maintaining a small internal order and inventory API. Deliver three
  user stories and fix two reported defects without breaking what already works.
difficulty: intermediate
estimatedMinutes: 150
stack:
  - .NET 10
  - ASP.NET Core
  - EF Core 10
  - SQLite
  - xUnit
objectives:
  - Read an unfamiliar, well-structured codebase and follow its conventions
  - Translate written user stories into working endpoints
  - Reproduce and fix defects from a bug report, not a stack trace
  - Extend a system without regressing existing behaviour
prerequisites:
  - Working C# and basic ASP.NET Core
  - Familiarity with an ORM; EF Core specifically is helpful but not required
  - A GitHub account
templateRepoUrl: https://github.com/coding-eval-test/scenario-inventory-api
workItems:
  - id: S1
    type: story
    title: Reserve stock when an order is placed
    points: 20
  - id: S2
    type: story
    title: Cancel an order
    points: 15
  - id: S3
    type: story
    title: Low-stock report
    points: 15
  - id: B1
    type: bug
    title: Order totals are too low on discounted multi-unit lines
    points: 15
  - id: B2
    type: bug
    title: Product search skips results and misses lowercase names
    points: 15
regressionPoints: 20
published: true
order: 2
---

## The situation

You have joined a team that maintains an internal API for order placement,
inventory, and fulfilment. The codebase is healthy: thin controllers over an
application service layer, explicit DTOs at the boundary, validation on writes,
and a passing test suite. Nobody is asking you to rewrite it.

You are asked to do what a team member does in their first fortnight — pick up
three stories from the backlog, clear two tickets from support, and leave the
existing behaviour intact.

## What you get

A repository with the API, a deterministic SQLite database that seeds itself on
first run, Swagger for exploring the surface, and a test suite that ships red for
every work item and green for everything that already worked. Turning the red
tests green without turning a green one red is the assignment.

## How you are assessed

Automated tests score correctness for each work item, and the existing-behaviour
suite carries real weight — breaking working code costs more than leaving a story
unfinished. Beyond the tests, a reviewer checks whether your work fits the
codebase it lives in: business logic in the service layer, DTOs at the boundary,
validation on new endpoints, tests of your own, and a clean diff.
