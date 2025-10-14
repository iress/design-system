#!/bin/bash -eu

# Test script for MCP server development
echo "Testing MCP server in development mode..."

# Build the project first
echo "Building MCP server..."
yarn build

# Test basic functionality
echo "Testing basic MCP server functionality..."
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | node dist/index.js

echo "MCP server test completed successfully!"
