# Learning Notes

## What I Learned

### Traditional Website

Every click requests a completely new page from the server.

Browser refreshes.

Entire page reloads.

---

### React Website

The browser stays on the same application.

React Router watches the URL.

The matching component is rendered.

Only the content changes.

No full refresh occurs.

---

## Example

Landing Page

↓

/

↓

Click "Explore FinPilot"

↓

/dashboard

↓

Dashboard Component

---

## Main Concepts

- React Components
- Routes
- Browser URL
- React Router
- Single Page Applications (SPA)

---

## Simple Analogy

A React application is like a TV.

The TV stays on.

Changing channels only changes the program.

React keeps the application running while changing the visible page.

---

## What Changed in My Understanding

Before this assignment I knew navigation worked.

Now I understand that React Router controls which component is rendered based on the URL without reloading the application.