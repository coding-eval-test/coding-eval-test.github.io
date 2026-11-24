---
id: python-oop-drills
title: Python OOP & Exceptions
summary: >-
  Five short, independent problems on classes, inheritance, the data model,
  runtime object manipulation and custom exceptions. Each hands you a small
  piece of working code and a list of requirements, the way a timed coding
  evaluation does.
difficulty: foundational
track: python
format: problem-set
estimatedMinutes: 75
stack:
  - Python 3.11
  - pytest
objectives:
  - Read a short problem statement and build exactly what it asks for
  - Design exception hierarchies that callers can catch and inspect
  - Share behaviour through base classes instead of copying it
  - Make your own classes behave like built-in values and containers
  - Change live objects and classes safely at runtime
prerequisites:
  - Python classes, methods and exceptions at an introductory level
  - A GitHub account
templateRepoUrl: https://github.com/coding-eval-test/scenario-python-oop-drills
workItems:
  - id: P1
    type: problem
    title: Custom exception hierarchy
    points: 20
  - id: P2
    type: problem
    title: Inheritance and abstract bases
    points: 20
  - id: P3
    type: problem
    title: Data-model methods
    points: 20
  - id: P4
    type: problem
    title: Runtime object manipulation
    points: 20
  - id: P5
    type: problem
    title: Properties and validation
    points: 20
published: false
order: 1
---

## What this is

Not a scenario. There is no backlog and no single codebase to learn — there are
five separate problems, each about fifteen minutes long, each in its own folder
with its own statement, starter code and tests. It rehearses the kind of
evaluation that hands you a small project and a short list of requirements and
scores how many test cases you get through.

## What you get

For every problem: a few dozen lines of code that already work, a statement
listing what to build against them, and two test files — one for the
requirements, one for the behaviour that must keep working. Do the problems in
any order.

## How you are assessed

Every push runs the grading workflow and writes a scorecard. Each problem is
worth 20 points and earns partial credit: pass eight of a problem's nine tests
and you earn most of its points, rounded down. Breaking behaviour that already
worked halves what that one problem earns — it never touches the others. The
tests are counted, so removing, adding or skipping one scores that problem
zero. There is no rubric: the score is the tests.
