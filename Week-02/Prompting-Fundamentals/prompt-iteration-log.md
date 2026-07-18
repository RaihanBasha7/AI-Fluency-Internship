# FL-02 – Prompt Iteration Log

## Assignment Information

- **Assignment:** FL-02 – Prompting Fundamentals on Real Tasks v2
- **Track:** General AI Fluency
- **Week:** 2
- **Author:** Shaik Raihan Basha

---

# Real Task

## Selected Task

Understand a Machine Learning concept and convert it into structured study notes that are easy to revise, use in assignments, and explain during technical interviews.

This task was selected from my FL-01 AI Workflow Audit because I frequently use AI to learn topics such as Decision Trees, LangChain, Precision@K, and other Machine Learning concepts.

---

# Prompt Iteration 0 – Naive Prompt

## Technique

None (Baseline)

### Prompt

```text
Explain Decision Trees.
```

### Output Summary

The response provided a basic definition and a short explanation with minimal examples. While technically correct, it lacked organization and practical guidance.

### Observation

The output was generic and did not match my learning goals. It would not be sufficient for interview preparation or structured revision.

---

# Prompt Iteration 1 – Role Assignment

## Technique

Role Assignment

### Prompt

```text
You are an experienced Machine Learning professor teaching second-year Computer Science students.

Explain Decision Trees in a simple way.
```

### Output Summary

The explanation became more educational, with simpler language and clearer analogies.

### Observation

Giving the AI a role noticeably improved the teaching style. The response felt more like a classroom explanation than a dictionary definition.

---

# Prompt Iteration 2 – Context and Motivation

## Technique

Context and Motivation

### Prompt

```text
You are an experienced Machine Learning professor.

I am preparing for an AI internship and technical interviews.

Explain Decision Trees so I understand the intuition, can solve assignments, and confidently explain the concept during interviews.

Avoid unnecessary mathematics.
```

### Output Summary

The response focused on interview preparation, intuition, and practical understanding instead of unnecessary theory.

### Observation

Providing context helped the model prioritize the information that was most useful for my actual objective.

---

# Prompt Iteration 3 – Few-shot Examples

## Technique

Few-shot Prompting

### Prompt

```text
You are an experienced Machine Learning professor.

When explaining concepts, use this format.

Concept: Linear Regression

Definition:
Predicts continuous values.

Analogy:
Like drawing the best-fit line through scattered points.

Example:
Predicting house prices.

Now explain Decision Trees using the same style.
```

### Output Summary

The explanation followed the demonstrated format and included a consistent structure, analogy, and practical example.

### Observation

Providing an example significantly improved consistency and made the explanation easier to understand.

---

# Prompt Iteration 4 – Output Structure

## Technique

Structured Output

### Prompt

```text
Explain Decision Trees.

Return the answer using exactly this structure.

1. Simple explanation
2. Real-world analogy
3. Example
4. Advantages
5. Limitations
6. Interview questions
7. Python example
8. Summary table
```

### Output Summary

The answer became well organized, easier to read, and suitable for revision notes.

### Observation

Specifying the output structure reduced randomness and produced information that could be reused directly in my study notes.

---

# Prompt Iteration 5 – Step Decomposition

## Technique

Step Decomposition

### Prompt

```text
Explain Decision Trees.

Work through these steps.

Step 1: Explain the intuition.

Step 2: Show how a tree is built.

Step 3: Explain entropy and information gain.

Step 4: Solve a simple example.

Step 5: Show a Python implementation.

Step 6: Mention common mistakes.

Step 7: Give interview questions.

Step 8: Finish with a revision summary.
```

### Output Summary

The explanation became significantly more detailed and followed a logical progression from intuition to implementation.

### Observation

Breaking the task into smaller reasoning steps encouraged the model to produce a more complete and educational response.

---

# Claude vs ChatGPT Comparison

| Category | Claude | ChatGPT |
|----------|---------|----------|
| Tone | More educational and detailed | More conversational and practical |
| Accuracy | Strong conceptual explanations | Strong practical explanations |
| Structure | Very organized | Clear but slightly shorter |
| Examples | Rich analogies | Better coding examples |
| Weakness | Sometimes verbose | Occasionally simplifies advanced ideas |

## Overall Findings

Claude performed better when learning the underlying concepts and building intuition. ChatGPT performed better for implementation examples, interview preparation, and practical coding guidance.

Both models answered accurately, but their strengths were different depending on the objective.

---

# Final Reusable Prompt Template

```text
You are an experienced instructor teaching [TOPIC] to [AUDIENCE].

My goal is to [GOAL].

Explain the topic using the following structure:

1. Simple explanation
2. Real-world analogy
3. Practical example
4. Step-by-step breakdown
5. Common mistakes
6. Advantages and limitations
7. Code example (if applicable)
8. Interview questions
9. Summary table

Use clear language, avoid unnecessary jargon, and focus on helping me deeply understand the concept rather than memorizing it.
```

---

# Key Learnings

- Assigning a role improved the teaching style.
- Adding context made the response more relevant to my objective.
- Few-shot prompting increased consistency.
- Structured output made responses easier to revise.
- Step decomposition produced the most complete and logical explanation.
- Prompt engineering is an iterative process where small improvements lead to significantly better AI outputs.