---
id: retail-sales-etl
title: Retail Sales ETL
summary: >-
  Join a data engineering team that owns a nightly retail sales pipeline.
  Build the summary tables the business is waiting on, and fix a
  de-duplication defect that doubled a day's revenue.
difficulty: foundational
track: data-engineering
estimatedMinutes: 90
stack:
  - Python 3.11
  - PySpark 3.5
  - pytest
objectives:
  - Read an unfamiliar, well-structured PySpark codebase and follow its conventions
  - Build aggregations and dimension joins to an exact output contract
  - Handle messy real-world feed data without breaking what already works
  - Reproduce and fix a data defect from a bug report, not a stack trace
prerequisites:
  - Working Python and DataFrame-style thinking (PySpark or similar)
  - SQL-style aggregation and join concepts
  - A GitHub account
templateRepoUrl: https://github.com/coding-eval-test/scenario-retail-sales-etl
workItems:
  - id: S1
    type: story
    title: Daily store sales summary
    points: 25
  - id: S2
    type: story
    title: Product enrichment
    points: 25
  - id: B1
    type: bug
    title: Doubled revenue after a feed resend
    points: 20
regressionPoints: 30
published: true
order: 1
---

## The situation

A retail chain's nightly sales pipeline turns raw store feeds into the tables the
business runs on. The extract and cleaning stages are done and tested. The summary
tables the merchandising and category teams asked for were never finished — and
finance just flagged a day whose revenue came in doubled after a feed was re-sent.

## What you get

A pipeline that runs on the first try over committed sample feeds, explicit schemas
for every table, and a test suite that ships red for every work item and green for
everything that already works. Written stories and a bug report describe what is
wanted; how to get there is your call — DataFrame API or Spark SQL, both are fine.

## How you are assessed

Every push runs the grading workflow and writes a scorecard. Each work item scores
its points only when all of its tests pass. Existing behaviour is worth 30 points on
its own — breaking working code costs more than leaving a story unfinished. A rubric
in the repository covers what tests cannot see.
