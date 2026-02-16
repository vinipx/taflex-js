# AI-Agent Integration (MCP)

TAFLEX JS supports the **Model Context Protocol (MCP)**, an open standard that enables AI agents (like Claude Desktop, IDE assistants, and autonomous agents) to interact directly with the testing framework.

By exposing the framework as an MCP server, you transform your test suite from a passive set of files into an active service that AI can explore, execute, and debug.

---

## 🚀 Key Benefits

- **Autonomous Debugging**: AI agents can read test failures, inspect the relevant source code and locators, and attempt to fix the issue by running specific tests to verify the fix.
- **Natural Language Discovery**: Ask your AI assistant "Which tests cover the login flow?" or "Show me the locators for the dashboard," and get immediate, accurate answers.
- **Zero Context Switching**: Run tests and view reports directly within your AI-powered IDE or chat interface without leaving your workflow.
- **Agent-Ready Architecture**: Future-proof your testing strategy by providing a standardized interface for the next generation of AI developers.

---

## 🛠️ Capabilities

The MCP server exposes the following **Tools** and **Resources** to connected AI agents:

### Tools (Actions)
- **`list_specs`**: Scans the project and returns all available `.spec.js` and `.feature` files.
- **`list_locators`**: Lists available locator JSON files by mode (web/mobile).
- **`get_locator`**: Retrieves the content of a specific locator file for inspection.
- **`run_test`**: Triggers a Playwright execution for a specific file and returns the full STDOUT/STDERR.

### Resources (Data)
- **`taflex://config/current`**: The resolved framework configuration (with secrets like API keys automatically masked).
- **`taflex://reports/latest`**: A machine-readable JSON summary of the most recent test execution.

---

## ⚖️ Pros and Cons

### Pros
- **Efficiency**: Drastically reduces the time spent copy-pasting logs and file contents into LLMs.
- **Precision**: Agents get the exact state of the framework and locators, reducing "hallucinations."
- **Standardization**: Uses the industry-standard Model Context Protocol.

### Cons
- **Security**: Since the server can execute shell commands (`npx playwright test`), it should only be used in trusted local environments or with strict permission controls.
- **Statefulness**: Tests may depend on environmental state (databases, clean browser sessions) which the agent must be aware of.

---

## 📖 Use Cases

### 1. The "Fix-It" Loop
When a test fails in CI, a developer can point an AI agent to the failure. The agent uses `taflex://reports/latest` to see the error, `get_locator` to check if a selector changed, and `run_test` to verify a potential fix.

### 2. Test Coverage Audit
Ask an agent: *"Compare our login spec with the locators in login.json. Are we missing any elements in our tests?"* The agent can fetch both resources and provide a gap analysis.

### 3. Onboarding
A new engineer can ask the IDE agent: *"How do I run the API tests for the user service?"* The agent can list the specs, show the configuration, and even run a sample test for them.

---

## ⚙️ Setup & Configuration

For detailed technical setup instructions, including how to connect TAFLEX JS to Claude Desktop or other MCP clients, see the [MCP README](https://github.com/vinipx/taflex-js/blob/main/src/mcp/README.md) in the source code.
