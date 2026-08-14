# Explain It Like You Built It

## Project

**FinPilot AI** – An AI-powered financial operating system built with React, Tailwind CSS, and React Router.

---

## Selected Topic

**How navigation works in my React application using React Router.**

---

## Why I Chose This

While building FinPilot AI, I created multiple pages such as the Landing Page, Features page, and Dashboard. Navigation worked correctly, but I wanted to understand what actually happens when a user clicks a navigation button instead of simply accepting that it works.

---

## My Explanation

One thing I learned is that my website does **not** reload every time I move to another page.

For example, when a user clicks the **Explore FinPilot** button, React Router changes the browser URL from:

```
/
```

to

```
/dashboard
```

Instead of requesting a completely new webpage from the server, React Router checks the new URL and finds the matching page component. It then displays only that component while keeping the rest of the application running.

Because of this, the navigation feels much faster than a traditional website. The browser doesn't refresh, and only the content inside the page changes.

I think of it like changing TV channels. The television stays on, but the program changes instantly. React works in a similar way—it keeps the application running while switching only the page the user wants to see.

---

## What I Learned

Before this assignment, I knew how to create navigation links, but I didn't fully understand what happened behind the scenes.

Now I understand that React Router is responsible for matching the current URL to the correct page component, allowing users to move between pages without reloading the entire application. This is one of the reasons modern React websites feel smooth and responsive.

---

## Key Takeaway

Building with AI is helpful, but understanding how the code works is what makes me confident in explaining and maintaining my own project. Learning how React Router handles navigation helped me better understand the structure of my FinPilot AI application.