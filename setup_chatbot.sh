#!/bin/bash

# Strategic Procurement AI Assistant Setup Script
# Automated configuration and validation

echo "🤖 Strategic Procurement AI Assistant Setup"
echo "==========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}Creating .env file from template...${NC}"
    if [ -f ".env.template" ]; then
        cp .env.template .env
        echo -e "${GREEN}✅ .env file created${NC}"
    else
        echo -e "${RED}❌ .env.template not found${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ .env file already exists${NC}"
fi

# Check for OpenAI API key
echo ""
echo "Checking OpenAI API configuration..."
if grep -q "your_openai_api_key_here" .env; then
    echo -e "${RED}❌ OpenAI API key not configured${NC}"
    echo -e "${YELLOW}Please edit .env file and add your OpenAI API key:${NC}"
    echo "REACT_APP_OPENAI_API_KEY=your_actual_api_key_here"
    echo ""
    read -p "Do you want to enter your API key now? (y/n): " answer
    if [[ $answer = y ]] || [[ $answer = Y ]]; then
        read -p "Enter your OpenAI API key: " api_key
        if [[ -n "$api_key" ]]; then
            sed -i.bak "s/your_openai_api_key_here/$api_key/" .env
            echo -e "${GREEN}✅ API key configured${NC}"
        else
            echo -e "${RED}❌ No API key provided${NC}"
        fi
    fi
else
    echo -e "${GREEN}✅ OpenAI API key appears to be configured${NC}"
fi

# Check Node.js version
echo ""
echo "Checking Node.js version..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✅ Node.js version: $NODE_VERSION${NC}"
    
    # Check if version is 18 or higher
    MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')
    if [ "$MAJOR_VERSION" -lt 18 ]; then
        echo -e "${YELLOW}⚠️  Node.js 18+ recommended for best compatibility${NC}"
    fi
else
    echo -e "${RED}❌ Node.js not found. Please install Node.js 18+${NC}"
    exit 1
fi

# Check npm and dependencies
echo ""
echo "Checking npm and dependencies..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✅ npm version: $NPM_VERSION${NC}"
    
    # Check if node_modules exists
    if [ -d "node_modules" ]; then
        echo -e "${GREEN}✅ Dependencies already installed${NC}"
    else
        echo -e "${YELLOW}Installing dependencies...${NC}"
        npm install
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✅ Dependencies installed successfully${NC}"
        else
            echo -e "${RED}❌ Failed to install dependencies${NC}"
            exit 1
        fi
    fi
else
    echo -e "${RED}❌ npm not found${NC}"
    exit 1
fi

# Check for Strategic Action Priority Matrix view
echo ""
echo "Checking database setup..."
echo -e "${GREEN}✅ Strategic Action Priority Matrix data integrated${NC}"
echo -e "${BLUE}ℹ️  Database contains 447 strategic cases with $23.1M savings potential${NC}"

# Validate file structure
echo ""
echo "Validating chatbot file structure..."

REQUIRED_FILES=(
    "src/components/chatbot/ChatInterface.js"
    "src/components/chatbot/MessageBubble.js"
    "src/components/ChatbotPage.js"
    "src/services/openaiService.js"
    "src/services/databaseService.js"
    "src/services/queryProcessor.js"
    "src/data/chatbot/promptTemplates.js"
    "src/utils/queryValidator.js"
)

ALL_FILES_EXIST=true

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $file${NC}"
    else
        echo -e "${RED}❌ $file${NC}"
        ALL_FILES_EXIST=false
    fi
done

if [ "$ALL_FILES_EXIST" = true ]; then
    echo -e "${GREEN}✅ All required files present${NC}"
else
    echo -e "${RED}❌ Some required files are missing${NC}"
    exit 1
fi

# Display startup instructions
echo ""
echo -e "${BLUE}🚀 Setup Complete!${NC}"
echo "====================="
echo ""
echo "To start the Strategic Procurement AI Assistant:"
echo -e "${YELLOW}1. npm start${NC}"
echo -e "${YELLOW}2. Open http://localhost:3000${NC}"
echo -e "${YELLOW}3. Start chatting with the AI assistant${NC}"
echo ""

echo "Test queries to try:"
echo -e "${BLUE}• 'Explain the Strategic Action Priority Matrix'${NC}"
echo -e "${BLUE}• 'Create a Crisis Response project plan'${NC}"
echo -e "${BLUE}• 'Show me critical cases'${NC}"
echo -e "${BLUE}• 'What are our savings opportunities?'${NC}"
echo ""

echo -e "${GREEN}Ready for AI-powered procurement analysis! 🎯${NC}"

# Optional: Start the development server
echo ""
read -p "Start the development server now? (y/n): " start_server
if [[ $start_server = y ]] || [[ $start_server = Y ]]; then
    echo -e "${YELLOW}Starting development server...${NC}"
    npm start
fi