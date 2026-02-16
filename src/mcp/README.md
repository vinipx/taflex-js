# Taflex MCP Server

This module implements a Model Context Protocol (MCP) server for the Taflex JS framework. It allows AI agents and assistants to interact with your testing framework directly.

## Features

### Tools
- `list_specs`: List all available test specification files.
- `list_locators`: List all available locator files for a specific mode (web/mobile).
- `get_locator`: Retrieve the contents of a specific locator JSON file.
- `run_test`: Execute a specific test file using Playwright.

### Resources
- `taflex://config/current`: Access the current framework configuration (secrets are masked).
- `taflex://reports/latest`: Access the latest test execution report summary.

## Configuration

To use this server with Claude Desktop, add the following to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "taflex": {
      "command": "node",
      "args": ["/absolute/path/to/taflex-js/src/mcp/server.js"],
      "env": {
        "NODE_ENV": "development"
      }
    }
  }
}
```

Replace `/absolute/path/to/taflex-js` with the actual path to your project.

## Development

To start the server manually for testing:

```bash
npm run mcp
```

The server uses standard input/output (stdio) for communication.
