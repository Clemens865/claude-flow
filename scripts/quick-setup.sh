#!/bin/bash

# Claude-Flow Quick Setup Script
# Automated installation and configuration

set -e

echo "🌊 Claude-Flow Quick Setup v1.0"
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check prerequisites
check_prerequisites() {
    print_info "Checking prerequisites..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js not found. Please install Node.js v20+ first."
        echo "Visit: https://nodejs.org/"
        exit 1
    fi
    
    NODE_VERSION=$(node -v | sed 's/v//')
    REQUIRED_VERSION="20.0.0"
    if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
        print_error "Node.js v20+ required. Current: v$NODE_VERSION"
        exit 1
    fi
    print_status "Node.js v$NODE_VERSION"
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        print_error "npm not found"
        exit 1
    fi
    print_status "npm $(npm -v)"
}

# Install Claude Code CLI
install_claude_code() {
    print_info "Installing Claude Code CLI..."
    
    if command -v claude &> /dev/null; then
        print_status "Claude Code already installed"
    else
        npm install -g @anthropic-ai/claude-code
        print_status "Claude Code CLI installed"
    fi
}

# Setup Claude authentication
setup_claude_auth() {
    print_info "Setting up Claude authentication..."
    print_warning "You'll need to authenticate with Claude API"
    print_info "Run: claude auth"
    print_info "Follow the authentication prompts"
}

# Initialize Claude Flow
initialize_claude_flow() {
    print_info "Initializing Claude Flow..."
    
    # Create project directory if it doesn't exist
    if [ ! -d "claude-flow-project" ]; then
        mkdir claude-flow-project
        cd claude-flow-project
        print_status "Created project directory"
    else
        cd claude-flow-project
        print_status "Using existing project directory"
    fi
    
    # Initialize Claude Flow
    npx --y claude-flow@alpha init --force
    print_status "Claude Flow initialized"
    
    # Test installation
    print_info "Testing installation..."
    npx --y claude-flow@alpha --help > /dev/null 2>&1
    print_status "Installation verified"
}

# Setup example workflows
setup_examples() {
    print_info "Setting up example workflows..."
    
    # Create examples directory
    mkdir -p examples
    
    # Basic research workflow
    cat > examples/research-workflow.sh << 'EOF'
#!/bin/bash
# Research Workflow Example
echo "🔍 Starting research workflow..."
npx claude-flow@alpha swarm "Research modern web frameworks" --strategy research --mode distributed --parallel --monitor
EOF
    
    # Development workflow
    cat > examples/dev-workflow.sh << 'EOF'
#!/bin/bash
# Development Workflow Example
echo "💻 Starting development workflow..."
npx claude-flow@alpha start --ui --port 3000 &
sleep 5
npx claude-flow@alpha sparc tdd "User authentication system with JWT tokens"
EOF
    
    # Analysis workflow
    cat > examples/analysis-workflow.sh << 'EOF'
#!/bin/bash
# Analysis Workflow Example
echo "📊 Starting analysis workflow..."
npx claude-flow@alpha sparc run analyzer "Identify performance bottlenecks in current codebase"
EOF
    
    chmod +x examples/*.sh
    print_status "Example workflows created"
}

# Create quick start guide
create_quick_start_guide() {
    cat > QUICK_START.md << 'EOF'
# Claude-Flow Quick Start Guide

## 🚀 Getting Started

### 1. Authentication
```bash
claude auth
```

### 2. Start Claude Flow
```bash
# Start with UI
npx claude-flow@alpha start --ui --port 3000

# Or start hive mind
npx claude-flow@alpha hive-mind spawn "your objective here"
```

### 3. Example Workflows

**Research:**
```bash
./examples/research-workflow.sh
```

**Development:**
```bash
./examples/dev-workflow.sh
```

**Analysis:**
```bash
./examples/analysis-workflow.sh
```

### 4. Common Commands

```bash
# System status
npx claude-flow@alpha status

# Create agents
npx claude-flow@alpha agent spawn researcher
npx claude-flow@alpha agent spawn coder

# Memory management
npx claude-flow@alpha memory store "key" "value"
npx claude-flow@alpha memory list

# SPARC modes
npx claude-flow@alpha sparc run researcher "task"
npx claude-flow@alpha sparc tdd "feature description"
```

### 5. Advanced Features

```bash
# Swarm coordination
npx claude-flow@alpha swarm "build REST API" --strategy development --mode hierarchical --max-agents 8

# Batch operations
npx claude-flow@alpha batch create workflow.json
```

## 🐛 Troubleshooting

**Common Issues:**
- If hive-mind wizard times out, use direct commands instead
- Check Claude authentication: `claude auth`
- Verify Node.js version: `node -v` (requires v20+)

**Get Help:**
```bash
npx claude-flow@alpha help
npx claude-flow@alpha <command> --help
```

## 📚 Next Steps

1. Explore `.claude/commands/` for detailed documentation
2. Check examples in `examples/` directory
3. Visit: https://github.com/ruvnet/claude-flow
EOF
    
    print_status "Quick start guide created"
}

# Main installation process
main() {
    echo
    print_info "Starting Claude-Flow installation..."
    echo
    
    check_prerequisites
    install_claude_code
    setup_claude_auth
    initialize_claude_flow
    setup_examples
    create_quick_start_guide
    
    echo
    print_status "🎉 Claude-Flow setup complete!"
    echo
    print_info "Next steps:"
    echo "1. Run: claude auth (if not done already)"
    echo "2. Read: QUICK_START.md"
    echo "3. Try: npx claude-flow@alpha start --ui"
    echo
    print_info "Project location: $(pwd)"
    echo
}

# Run main function
main "$@"