# Prompt 1 - NotebookLM Research Prompt

Read every uploaded source.

Generate a source-grounded summary including
-  Main concepts
-  Important techniques
-  Practical examples
-  Things beginners misunderstand
-  Best practices

Do not invent information.
Mention disagreements between sources.

---

# Prompt 2 - ChatGPT Processing Prompt

You are an AI Engineering mentor.

Convert these research notes into clean study notes.

Include

1. Executive Summary

2. Key Concepts

3. Definitions

4. Practical Examples

5. Interview Questions

6. Common Mistakes

7. Revision Cheatsheet

Use markdown.
Keep everything grounded in the supplied research.

---

# Prompt 3 - Review Prompt

Review the generated study notes.

Find

- Missing ideas
- Weak explanations
- Repeated information
- Poor formatting

Improve the document while keeping all information grounded in the provided research.

Return the final polished version.

---