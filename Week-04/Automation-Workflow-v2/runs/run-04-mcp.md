Model Context Protocol (MCP) --- Comprehensive Study Notes

Topic: Model Context Protocol (MCP) Source Scope: These notes are based
only on the supplied research.

Executive Summary

The Model Context Protocol (MCP) is a standardized protocol that enables
AI applications to securely and consistently connect with external
tools, data sources, and services. It provides a common communication
layer between AI applications and external systems, making integrations
reusable and interoperable.

MCP is built around a three-part architecture consisting of Hosts,
Clients, and Servers. Servers expose capabilities through three core
primitives: Tools, Resources, and Prompts.

The protocol has evolved significantly. The latest specification
(2026-07-28) replaces the earlier stateful, bidirectional communication
model with a stateless request/response architecture, improving
reliability and scalability for distributed deployments.

The research also emphasizes that production-ready MCP implementations
should prioritize least-privilege access, proper authentication, strict
token validation, schema simplicity, and input sanitization rather than
relying solely on user approval or session state.

Key Concepts 1. Three-Part Architecture

MCP communication is organized into three cooperating components.

Host

The Host is the AI application that users interact with.

Examples mentioned in the research include:

Claude Desktop Cursor Claude Code

Responsibilities:

Provides the user interface. Contains one or more MCP clients.
Coordinates communication between users and MCP servers. Client

The Client is a connector running inside the host.

Responsibilities include:

Connecting to MCP servers. Sending protocol requests. Receiving
responses. Passing results back to the host.

The client acts as the communication bridge between the AI application
and external capabilities.

Server

The Server exposes capabilities that AI applications can use.

Each server provides one or more of the following primitives:

Tools Resources Prompts

Servers may run locally or remotely depending on the deployment model.

2.  Core Primitives

Every MCP server exposes capabilities through one or more standardized
primitives.

Tools

Executable functions that the AI model can invoke.

Examples include:

Calling APIs Querying databases Updating records Controlling hardware
Resources

Information or context made available to either:

the AI model the user

Resources provide data rather than executable actions.

Prompts

Reusable workflow templates that standardize recurring tasks or
interactions.

3.  Deployment Modes Local MCP Servers

Run on the user's machine.

Characteristics:

Access local files. Interact with installed software. Can communicate
with operating system resources. Remote MCP Servers

Hosted on cloud infrastructure.

Characteristics:

Serve multiple users. Connect to remote APIs and enterprise systems.
Suitable for centralized deployments. 4. Stateless Architecture

The latest MCP specification (2026-07-28) changes the protocol's
communication model.

Earlier Model Stateful communication Bidirectional streams Mandatory
initialization handshake Current Model Stateless request/response Each
request is independent Improved reliability Better scalability for
global deployments

This architectural change simplifies distributed systems by removing
protocol-level session dependency.

Definitions OpenAPI Transformation

A process for converting existing REST APIs into MCP-compatible tools.

The transformation includes:

Combining path parameters Combining query parameters Combining request
body parameters Producing a single JSON schema Dereferencing \$ref
pointers to create self-contained tool definitions Multi Round-Trip
Requests (MRTR)

A technique that allows a stateless server to pause execution when
additional information is required.

Typical situations include:

Missing parameters User approval Confirmation before sensitive
operations

The client retries the request after supplying the requested
information.

Header-Based Routing

Network infrastructure can inspect HTTP headers instead of parsing the
JSON request body.

Headers mentioned in the research:

Mcp-Method Mcp-Name

Benefits:

Faster routing Simpler gateway implementation Easier rate limiting
Entity Abstraction

Rather than exposing raw database schemas directly, an abstraction
layer:

Maps friendly entity names to database columns. Applies Role-Based
Access Control (RBAC). Hides underlying database implementation details.

This creates a safer and more maintainable interface for AI agents.

Practical Examples 1. Enterprise Productivity

A Fortune 500 company connected:

Cursor Claude Code

to internal resources including:

A 160-petabyte BigQuery instance 6,000 GitHub repositories

Reported outcome:

Significantly increased code completion acceptance rates. 2. Safe
Database CRUD

Microsoft's SQL MCP Server enables AI agents to:

Query databases Update records

for databases such as:

MSSQL MySQL

The interaction occurs through a controlled MCP contract rather than
exposing the database port directly.

3.  Tool Aggregator Servers

Aggregator servers expose hundreds of specialized tools through a single
MCP endpoint.

Example tool categories:

Weather APIs Case law Cryptocurrency intelligence

This reduces integration complexity for clients.

4.  Physical Device Control

MCP can also connect AI agents to embedded systems.

Research examples include controlling:

Kiln 3D printers Obsbot robotic camera gimbals CNC machines

through dedicated MCP servers.

Best Practices Progressive Least Privilege

Agents should begin with minimal permissions.

Only request elevated scopes when an operation requires them.

Example progression:

Discovery permissions db:write when write access is actually needed

This limits unnecessary access.

Avoid Token Passthrough

Servers should not trust tokens forwarded by clients without validation.

Instead, validate that the token's audience claim matches the MCP server
itself.

Purpose:

Prevent credential misuse Reduce data exfiltration risk Keep Schemas
Small

Large APIs should not be exposed as one massive MCP server.

Instead:

Start with a subset of endpoints. Prefer multiple specialized MCP
servers.

Reason:

Avoid client-side schema size limitations. Validate Inputs

Clients should validate authorization URLs before use.

Dangerous schemes such as:

javascript: file:

should be rejected to reduce the risk of:

Cross-Site Scripting (XSS) Remote Code Execution (RCE) Common Mistakes
Mistake 1: Confusing MCP with AI Frameworks

Incorrect assumption:

MCP competes with LangChain.

Correct understanding:

LangChain manages application logic ("the kitchen"). MCP standardizes
connectivity ("the plumbing").

These technologies solve different problems.

Mistake 2: Assuming Natural Language Should Always Generate SQL

Many community MCP database servers translate natural language directly
into SQL.

However, Microsoft's SQL MCP guidance considers this approach:

non-deterministic fragile error-prone

Instead, production systems should favor deterministic entity-based
models.

Mistake 3: Assuming Human Approval Equals Security

A human approval step does not replace authentication.

The protocol warns that possession of a state handle (such as a session
ID) should never be treated as proof of identity.

Mistake 4: Confusing Local and Remote Servers

Local servers interact with software running on the user's own machine.

Remote servers interact with cloud-hosted APIs and services.

Evolution of the Protocol Stateful → Stateless Communication Earlier
Specifications

Included:

initialize initialized Stateful sessions Bidirectional communication
Latest Specification (July 2026)

Introduces:

Stateless request/response Independent requests Retirement of the
mandatory initialization handshake Client Registration Evolution Earlier
Approach

Dynamic Client Registration (DCR)

Current Recommendation

Client ID Metadata Documents (CIMD)

The latest standard recommends CIMD to better align with modern web
security practices.

Differences Between Sources NL2SQL Community Perspective

Many community MCP database servers generate SQL directly from natural
language.

Microsoft's Perspective

Microsoft describes direct NL2SQL as:

short-sighted fragile

Instead, agents should interact through deterministic entity-based
abstractions rather than raw SQL generation.

Handshakes and Sessions Earlier Documentation

Requires:

initialize initialized Stateful communication Latest Documentation

Uses:

Stateless request/response Independent requests No mandatory protocol
handshake Client Registration Earlier Implementations

Dynamic Client Registration (DCR)

Latest Standard

Client ID Metadata Documents (CIMD)

Interview Questions Beginner What problem does Model Context Protocol
solve? Describe the three-part MCP architecture. What are the three core
primitives exposed by MCP servers? What is the difference between local
and remote MCP servers? Why was MCP redesigned as a stateless protocol?
Intermediate Explain OpenAPI Transformation. How do Multi Round-Trip
Requests (MRTR) work in a stateless architecture? Why does MCP use
header-based routing? What problem does entity abstraction solve? Why
are multiple specialized MCP servers often preferred over one large
server? Advanced Explain the principle of progressive least privilege in
MCP. Why should servers validate the audience claim of client tokens?
Why does Microsoft's SQL MCP guidance discourage direct NL2SQL? Why must
clients reject javascript: and file: authorization URLs? Compare earlier
MCP specifications with the latest specification regarding communication
and client registration. Revision Cheatsheet Topic Remember Purpose
Standard protocol connecting AI applications with external tools, data,
and services Architecture Host → Client → Server Core Primitives Tools,
Resources, Prompts Deployment Modes Local or Remote Latest Architecture
Stateless request/response OpenAPI Transformation Merge REST parameters
into one JSON schema and dereference \$ref pointers MRTR Server requests
additional information; client retries with the answer Header-Based
Routing Uses Mcp-Method and Mcp-Name headers for routing and rate
limiting Entity Abstraction Friendly entities + RBAC instead of exposing
raw database schemas Enterprise Example Cursor + Claude Code connected
to a 160 PB BigQuery instance and 6,000 GitHub repositories Database
Example Microsoft SQL MCP Server enables controlled CRUD without
exposing the database port Tool Aggregators One MCP endpoint exposing
hundreds of specialized tools Hardware Example AI agents controlling
Kiln 3D printers, Obsbot gimbals, and CNC machines Framework
vs. Protocol LangChain = application logic; MCP = connectivity protocol
NL2SQL Debate Community often uses NL2SQL; Microsoft recommends
deterministic entity-based models Security Least privilege, audience
validation, schema simplicity, input sanitization Local vs. Remote Local
interacts with OS/software; Remote interacts with cloud services
Protocol Evolution Stateful handshake retired in favor of stateless
communication Client Registration DCR deprecated; CIMD preferred
