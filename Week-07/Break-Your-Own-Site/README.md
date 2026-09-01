## Overview

This project documents the hardening and quality review of my personal portfolio website as part of Week 7 of the AI Fluency Internship.

Instead of testing only the happy path, I deliberately tested edge cases, invalid inputs, navigation flows, responsiveness, external links, SEO, and performance to identify where the site could fail.

## Live Portfolio

[View Live Portfolio](https://raihan-ai-portfolio-v2.netlify.app)

## Objectives

- Test the website beyond the happy path
- Identify usability and functional issues
- Test edge cases and invalid inputs
- Verify navigation and external links
- Check responsiveness across devices and browsers
- Add and verify basic SEO and social metadata
- Evaluate website performance
- Categorize findings into Fix Now and Known Limitations
- Fix critical issues and verify the fixes

## Testing Summary

| Area | Status |
|---|---|
| Edge-case testing | Completed |
| Navigation and links | Completed |
| Responsive testing | Completed |
| SEO and metadata | Completed |
| Performance testing | Completed |
| Fix-now issues | Addressed |
| Hardening review | Completed |

## Key Findings

The complete list of findings, their severity, classification, and resolution is available in:

- [Where It Breaks](./where-it-breaks.md)
- [Hardening Review](./hardening-review.md)

## Evidence

Supporting evidence is organized in the `evidence/` directory:

- `testing-screenshots/` — Edge-case, browser, responsive, and functional testing
- `seo-meta/` — SEO and social metadata verification
- `speed-test/` — Performance testing results

## Engineering Takeaway

This exercise reinforced that launching a website is not the same as finishing it. A professional product should be tested for failure modes, edge cases, usability issues, and limitations—not just demonstrated under ideal conditions.

The goal was not to make the portfolio appear perfect, but to understand where it breaks, fix what matters, and document what remains honestly.