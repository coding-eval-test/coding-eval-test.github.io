---
id: hr-reports-basics
title: HR Reports I — Filters & Joins
summary: >-
  Join a people-analytics team that runs on SQL reports over the HR database.
  Write the two reports HR is waiting on, and find out why the quarter-close
  headcount lists almost nobody.
difficulty: foundational
track: sql
estimatedMinutes: 60
stack:
  - MySQL 8.4
  - SQL
objectives:
  - Read an unfamiliar schema and find where each fact lives
  - Filter and sort rows to an exact output contract
  - Combine tables without losing the rows that have nothing to match
  - Reproduce and fix a wrong-result defect from a bug report, not an error message
prerequisites:
  - Basic SELECT, WHERE and ORDER BY
  - A first look at joins
  - A GitHub account
templateRepoUrl: https://github.com/coding-eval-test/scenario-hr-reports-basics
workItems:
  - id: S1
    type: story
    title: New hires of 2025
    points: 25
  - id: S2
    type: story
    title: Employee roster
    points: 25
  - id: B1
    type: bug
    title: Headcount at Q1 close is nearly empty
    points: 20
regressionPoints: 30
published: false
order: 1
---

## The situation

A mid-sized employer runs its HR and finance reporting off a folder of SQL queries.
Some of them work and are tested. Two that HR asked for were never written — and the
headcount report everyone relies on at quarter close has started listing two people
out of a couple of dozen.

## What you get

A MySQL database that is already running, with realistic sample data to explore, a
documented schema, and a test suite that ships red for every work item and green for
every report that already works. Each report is one query in its own file. The tests
are there to run, not to write — you work in SQL.

## How you are assessed

Every push runs the grading workflow and writes a scorecard. Each work item scores
its points only when all of its tests pass. Existing reports are worth 30 points on
their own — breaking a working report costs more than leaving a story unfinished. A
rubric in the repository covers what tests cannot see.

This is the first of three HR Reports scenarios; the next two build up to grouped
reports and subqueries over the same database.
