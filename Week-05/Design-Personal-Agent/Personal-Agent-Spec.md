# AI Career Copilot – Personal Agent Specification

---

# 1. Executive Summary

AI Career Copilot is a personal AI agent designed to help me become a production-ready AI Engineer by acting as a career mentor, study coach, project assistant, and productivity partner.

Instead of functioning as a general-purpose chatbot, the agent focuses on one clearly defined objective:

> **Help me consistently learn, build, document, and prepare for AI Engineering internships and full-time roles.**

The agent assists throughout the complete engineering workflow—from planning study sessions and organizing projects to reviewing resumes, generating interview questions, summarizing research papers, and tracking internship applications.

The scope is intentionally limited so the MVP can be implemented within approximately **10 build hours**, while leaving room for future expansion.

---

# 2. Job To Be Done

### Primary Job

Help me become a better AI Engineer by organizing learning, projects, interview preparation, and career development.

### Problems Being Solved

As an aspiring AI Engineer, I work across multiple resources:

- Learning roadmaps
- GitHub projects
- Research papers
- Internship applications
- Resume updates
- Portfolio improvements
- Interview preparation

Managing all these manually is time-consuming.

AI Career Copilot centralizes these activities into one intelligent assistant.

---

# 3. Target User

### Primary User

**Raihan Basha**

- B.Tech Computer Science Engineering Student
- Aspiring AI Engineer
- Preparing for AI/ML internships
- Building production-ready AI projects
- Regular participant in hackathons
- Uses GitHub for portfolio development

### Secondary Users (Future)

The system can later support:

- Students
- Developers
- Software Engineers
- AI Researchers
- Job Seekers

---

# 4. Usage Frequency

The agent is expected to be used daily.

| Time | Usage |
|--------|---------|
| Morning | Plan today's work |
| Afternoon | Ask technical questions |
| Evening | Review progress |
| Weekly | Learning summary |
| Monthly | Resume review & portfolio review |

Estimated usage:

- 10–20 interactions/day

---

# 5. Goals

The agent should help me:

- Stay consistent
- Learn faster
- Build better projects
- Improve interview performance
- Keep documentation updated
- Track internship progress
- Reduce repetitive planning work

---

# 6. Inputs

The agent accepts:

- Natural language prompts
- Resume
- GitHub repositories
- Portfolio URL
- Research papers (PDF)
- Notes (Markdown)
- Job descriptions
- Learning roadmap
- Project documentation

Example prompts:

> Review my resume.

> Plan my study schedule for this week.

> Explain Retrieval-Augmented Generation.

> Summarize this research paper.

> Improve this GitHub README.

---

# 7. Outputs

The agent can generate:

- Daily study plans
- Weekly roadmap
- Resume feedback
- Portfolio improvements
- GitHub README suggestions
- Research paper summaries
- Interview questions
- Coding practice recommendations
- Learning reports
- Internship tracking suggestions

---

# 8. Functional Requirements

The MVP should support the following capabilities.

## Learning Assistant

- Create study plans
- Explain AI concepts
- Recommend learning resources

---

## Resume Reviewer

- Analyze resume
- Identify weaknesses
- Suggest improvements

---

## Portfolio Reviewer

- Review portfolio website
- Suggest missing sections
- Improve project descriptions

---

## GitHub Assistant

- Review repositories
- Suggest README improvements
- Recommend documentation updates

---

## Interview Coach

- Generate interview questions
- Evaluate answers
- Provide explanations

---

## Research Assistant

- Summarize AI papers
- Extract key ideas
- Explain technical concepts

---

## Project Mentor

Help organize:

- milestones
- architecture
- timelines
- documentation
- deployment checklist

---

# 9. Non-Functional Requirements

The agent should:

- Respond clearly
- Produce structured outputs
- Explain reasoning
- Avoid hallucinations
- Prefer concise answers
- Be reliable
- Be easy to extend

---

# 10. Required Tools

| Tool | Purpose |
|--------|-----------|
| ChatGPT | Core reasoning |
| GitHub | Repository review |
| Web Browser | Research |
| Google Drive | Read documents |
| PDF Reader | Research papers |
| Markdown | Documentation |
| Calendar | Planning |
| File Upload | Resume & notes |

---

# 11. Data Sources

The agent uses:

- Personal Resume
- GitHub repositories
- Portfolio website
- Research papers
- Learning notes
- Project documentation
- Job descriptions
- AI engineering roadmap

---

# 12. Access Plan

| Data Source | Access Method |
|---------------|----------------|
| Resume | Manual upload |
| GitHub | Public repository |
| Portfolio | Public URL |
| Research Papers | PDF upload |
| Notes | Markdown files |
| Calendar | User permission |
| Documents | Manual upload |

No private data is accessed automatically.

---

# 13. Platform Choice

## Selected Platform

**OpenAI Custom GPT**

### Why

OpenAI Custom GPT provides:

- Easy setup
- Custom Instructions
- Knowledge uploads
- File support
- Web browsing
- Reusable conversations
- No infrastructure management

This allows rapid prototyping within the assignment time.

---

## Alternative Considered

### n8n AI Agent

Advantages

- Excellent automation
- API integrations
- Workflow orchestration

Disadvantages

- More setup
- Higher complexity
- Less conversational
- Requires hosting

---

## Decision

OpenAI Custom GPT is better suited for an interactive personal assistant focused on reasoning and coaching, while n8n is more appropriate for automation-heavy workflows.

---

# 14. Draft System Instructions

The agent should always:

- Prioritize AI Engineering goals.
- Prefer production-ready engineering practices.
- Explain concepts clearly.
- Ask clarifying questions when needed.
- Recommend industry best practices.
- Encourage learning by building.
- Suggest scalable solutions.
- Be honest about uncertainty.

The agent should never:

- Fabricate information.
- Invent references.
- Misrepresent technical facts.
- Encourage plagiarism.
- Reveal personal information.
- Submit applications automatically.

---

# 15. Evaluation Cases

## Evaluation 1

### Input

Review my resume.

### Expected Output

Detailed feedback including:

- formatting
- skills
- projects
- ATS compatibility
- improvement suggestions

---

## Evaluation 2

### Input

Summarize this research paper.

### Expected Output

- concise summary
- key contributions
- limitations
- practical applications

---

## Evaluation 3

### Input

Generate interview questions for an AI Engineering internship.

### Expected Output

- technical questions
- behavioral questions
- follow-up questions
- suggested answers

---

## Evaluation 4

### Input

Review my GitHub repository.

### Expected Output

Suggestions for:

- README
- documentation
- project structure
- deployment
- portfolio quality

---

## Evaluation 5

### Input

Plan my study schedule for this week.

### Expected Output

A balanced roadmap including:

- AI
- Python
- DSA
- Projects
- Revision

---

## Evaluation 6

### Input

Explain Retrieval-Augmented Generation to a beginner.

### Expected Output

Simple explanation

Examples

Architecture

Use cases

---

# 16. Risks

Potential risks include:

- Hallucinated information
- Incorrect technical explanations
- Outdated resources
- Inaccurate job advice
- Privacy concerns
- Misinterpreted prompts

---

# 17. Guardrails

The agent must:

- Ask before performing irreversible actions.
- Clearly distinguish facts from assumptions.
- Never submit job applications automatically.
- Never send emails without user approval.
- Never modify repositories automatically.
- Never delete files.
- Respect user privacy.
- Cite sources whenever possible.
- Recommend verifying important information.

---

# 18. Limitations

The MVP cannot:

- Automatically apply for jobs
- Access private GitHub repositories
- Read emails
- Modify documents directly
- Replace human judgment

The agent serves as a decision-support assistant rather than an autonomous system.

---

# 19. Future Improvements

Potential future enhancements include:

- GitHub API integration
- LinkedIn profile analysis
- Resume ATS scoring
- Company-specific interview preparation
- Voice interface
- Calendar synchronization
- Internship application tracker
- MCP tool integrations
- Research paper knowledge base
- Multi-agent collaboration

---

# 20. Success Metrics

The project will be considered successful if it:

- Saves planning time
- Improves learning consistency
- Produces actionable recommendations
- Helps prepare for interviews
- Improves portfolio quality
- Supports internship readiness

---

# Conclusion

AI Career Copilot is a focused personal AI agent that supports my journey toward becoming a professional AI Engineer. By concentrating on one well-defined objective—career growth—it avoids unnecessary complexity while delivering meaningful daily value.

The proposed MVP is achievable within the expected development time, uses realistic tools and data sources, includes clearly defined evaluation cases, and incorporates guardrails to ensure safe and responsible operation. This design also provides a strong foundation for future enhancements such as workflow automation, external integrations, and multi-agent collaboration.