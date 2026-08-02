# Prompt Engineering Study Notes

> **Topic:** Prompt Engineering Concepts and Best Practices\
> **Source Scope:** These notes are based solely on the supplied
> research.

## Executive Summary

Prompt engineering is an **engineering discipline** rather than a
one-time writing task. Effective prompts are created through an
**empirical process** of testing, measuring, and iterating based on
model performance.

The research also emphasizes that **prompting is model-specific**.
Techniques that work well for one model may not produce the same results
on another. In particular, Claude is trained to respond well to **clear,
direct, detailed instructions** and **structured prompts using XML
tags**.

Successful prompts share several characteristics:

-   Clearly separate instructions, context, examples, and user data.
-   Ground responses in provided information to reduce hallucinations.
-   Demonstrate desired behavior with examples instead of vague
    descriptions.
-   Use positive, explicit instructions.
-   Continuously refine prompts through experimentation.

## Key Concepts

### 1. Empirical Approach

Prompt engineering should be approached like software engineering or
machine learning experimentation.

Instead of assuming a prompt is effective:

1.  Create a prompt.
2.  Test it on realistic inputs.
3.  Measure the quality and consistency of outputs.
4.  Refine the prompt.
5.  Repeat until performance improves.

The emphasis is on evidence-driven improvement rather than intuition.

### 2. Model-Specific Tailoring

Prompting techniques are not universally applicable.

The research specifically notes that:

-   Claude is trained to follow **clear, direct, and detailed
    instructions**.
-   Techniques that work well for GPT models may not be equally
    effective for Claude.

Prompt design should therefore be adapted to the capabilities and
training of the target model.

### 3. Structural Separation

Complex prompts become more reliable when each component is clearly
separated.

Typical sections include:

-   Instructions
-   Context
-   Examples
-   User input
-   Output requirements

Keeping these sections distinct reduces ambiguity and improves
consistency.

### 4. Factual Grounding

Grounding reduces the likelihood of hallucinations.

Recommended approaches include:

-   Supplying relevant reference material.
-   Instructing the model to use only the provided documents.
-   Explicitly allowing the model to respond with **"I don't know"**
    when the required information is unavailable.

## Core Prompting Techniques

### XML Tags

XML tags organize complex prompts into clearly defined sections.

``` xml
<instructions>
...
</instructions>

<context>
...
</context>

<examples>
...
</examples>

<output_format>
...
</output_format>
```

According to the research:

-   XML tags are considered the single most effective way to structure
    Claude prompts.
-   They may improve response consistency by **20--40%**.
-   They are most valuable for prompts containing multiple distinct
    sections.

### Few-Shot Prompting

Few-shot prompting teaches the model through examples instead of
descriptions.

Best practices:

-   Provide **3--5** input-output examples.
-   Include diverse examples.
-   Cover edge cases.
-   Vary length and writing style.

Examples help models learn tone, structure, and expected outputs more
effectively than adjectives alone.

### Thinking (Chain of Thought)

Example instruction:

> Think step-by-step before giving the final answer.

Improves performance on:

-   Logical reasoning
-   Mathematical problems
-   Complex multi-step tasks

### Role Assignment

Example:

> You are a Senior Data Analyst.

Helps the model adopt:

-   Appropriate terminology
-   Suitable communication style
-   Relevant analytical perspective

### Long Context Management

For prompts exceeding approximately **20,000 tokens**, place the primary
instruction or question at the **end** of the prompt. The research notes
this can improve response quality by up to **30%**.

## Practical Examples

### Data Extraction

Extract structured JSON from customer emails while:

-   Producing valid JSON.
-   Handling missing information gracefully.
-   Preserving available information without inventing missing values.

### Code Review

Use XML tags to define:

-   Review instructions
-   Severity levels
-   Expected output format

The model should identify bugs, assign severity, and suggest precise
code fixes.

### Content Creation

Instead of saying:

> Write professionally.

Provide examples of **good** and **bad** headlines to demonstrate the
desired style.

### Sentiment Classification

Provide labeled examples showing percentage breakdowns for:

-   Positive
-   Neutral
-   Negative

## Common Beginner Misunderstandings

-   **Using adjectives instead of examples** --- demonstrate style
    rather than describing it.
-   **Using negative constraints** --- prefer affirmative instructions.
-   **Overusing XML tags** --- reserve them for complex prompts.
-   **Hiding the main task** --- keep the primary instruction separate
    from background context.

## Best Practices

-   Treat prompt engineering as an iterative engineering process.
-   Be direct and explicit.
-   Separate instructions, context, examples, user data, and output
    requirements.
-   Use XML tags for complex Claude prompts.
-   Prefer examples over adjectives.
-   Provide 3--5 diverse few-shot examples.
-   Cover edge cases.
-   Ground responses using supplied documents.
-   Allow **"I don't know"** when information is unavailable.
-   Extract supporting quotes before analyzing long documents.
-   Place the primary task at the end for prompts over \~20k tokens.

## Evolution of Prompting Guidance

### Prefilled Responses

-   **Older:** Prefilling helped control formatting.
-   **Current:** Latest Claude models no longer support prefilling.

### Thinking Modes

-   **Older:** Fixed token budgets.
-   **Current:** Adaptive Thinking adjusts reasoning effort dynamically.

### Anti-Laziness Prompting

-   **Older:** Aggressive instructions like `CRITICAL: You MUST...`
-   **Current:** More natural instructions are recommended.

### Cross-Model Compatibility

-   XML tags are strongly recommended for Claude.
-   Markdown headings may work better for ChatGPT and Gemini.

## Interview Questions

### Fundamental

1.  Why is prompt engineering considered an empirical process?
2.  What does model-specific tailoring mean?
3.  What is factual grounding?
4.  What are XML tags used for?
5.  What is few-shot prompting?

### Intermediate

1.  Why are examples generally more effective than adjectives?
2.  How does role assignment influence model behavior?
3.  Why are affirmative instructions preferred?
4.  How does chain-of-thought improve reasoning?
5.  Why separate instructions from context?

### Advanced

1.  When should XML tags be used?
2.  How can prompt design reduce hallucinations?
3.  Why place the main instruction at the end of long prompts?
4.  How has guidance on prefilled responses changed?
5.  Why can the same prompt behave differently across Claude, ChatGPT,
    and Gemini?

## Revision Cheatsheet

  -----------------------------------------------------------------------
  Topic                           Remember
  ------------------------------- ---------------------------------------
  Empirical Approach              Test → Measure → Improve → Repeat

  Model-Specific Tailoring        Optimize prompts for the target model

  Structural Separation           Separate instructions, context,
                                  examples, user data, and output
                                  requirements

  XML Tags                        Best for complex Claude prompts

  Few-Shot Prompting              Teach with 3--5 diverse examples

  Chain of Thought                Ask the model to think step-by-step

  Role Assignment                 Assign a professional persona

  Long Context                    Put the main instruction at the end
                                  (\>20k tokens)

  Factual Grounding               Use supplied documents and allow "I
                                  don't know"

  Positive Instructions           Tell the model what to do

  Examples Over Adjectives        Demonstrate instead of describe

  Quote Before Analysis           Extract quotes before analysis

  Common Mistakes                 Vague adjectives, negative constraints,
                                  over-tagging XML, burying the main task

  Prompt Evolution                Prefilling deprecated, Adaptive
                                  Thinking preferred, model-specific
                                  formatting
  -----------------------------------------------------------------------
