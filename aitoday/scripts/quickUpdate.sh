#!/bin/bash

###########################################
# Quick Update Script
#
# Easy-to-use script for running updates
###########################################

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo -e "${BLUE}==============================================================${NC}"
echo -e "${BLUE}       AI Tools Update Agent - Quick Update${NC}"
echo -e "${BLUE}==============================================================${NC}"
echo ""

# Check if .env file exists
if [ ! -f "$PROJECT_ROOT/.env" ]; then
    echo -e "${YELLOW}Warning: .env file not found!${NC}"
    echo -e "${YELLOW}Creating from .env.example...${NC}"

    if [ -f "$PROJECT_ROOT/.env.example" ]; then
        cp "$PROJECT_ROOT/.env.example" "$PROJECT_ROOT/.env"
        echo -e "${GREEN}Created .env file. Please edit it and add your GEMINI_API_KEY${NC}"
        echo ""
    else
        echo -e "${RED}Error: .env.example not found${NC}"
        exit 1
    fi
fi

# Check if GEMINI_API_KEY is set
source "$PROJECT_ROOT/.env" 2>/dev/null
if [ -z "$GEMINI_API_KEY" ] || [ "$GEMINI_API_KEY" == "your_gemini_api_key_here" ]; then
    echo -e "${YELLOW}Warning: GEMINI_API_KEY not set in .env file${NC}"
    echo -e "${YELLOW}AI verification will be skipped${NC}"
    echo -e "${YELLOW}Get your API key from: https://ai.google.dev/${NC}"
    echo ""
fi

# Parse command line arguments
MODE="incremental"
DRY_RUN=""
LIMIT=""
VERBOSE=""

while [[ $# -gt 0 ]]; do
    case $1 in
        --full)
            MODE="full"
            shift
            ;;
        --verify)
            MODE="verify"
            shift
            ;;
        --dry-run)
            DRY_RUN="--dry-run"
            shift
            ;;
        --limit)
            LIMIT="--limit $2"
            shift 2
            ;;
        --verbose)
            VERBOSE="--verbose"
            shift
            ;;
        --help)
            echo "Usage: ./quickUpdate.sh [options]"
            echo ""
            echo "Options:"
            echo "  --full           Run full update (checks all URLs)"
            echo "  --verify         Run verification only"
            echo "  --dry-run        Preview changes without saving"
            echo "  --limit <n>      Process only first N tools"
            echo "  --verbose        Enable detailed logging"
            echo "  --help           Show this help message"
            echo ""
            echo "Examples:"
            echo "  ./quickUpdate.sh                    # Incremental update"
            echo "  ./quickUpdate.sh --full             # Full update"
            echo "  ./quickUpdate.sh --dry-run --limit 10  # Test with 10 tools"
            exit 0
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

echo -e "${BLUE}Configuration:${NC}"
echo -e "  Mode: ${GREEN}$MODE${NC}"
echo -e "  Dry Run: ${GREEN}${DRY_RUN:-No}${NC}"
echo -e "  Limit: ${GREEN}${LIMIT:-None}${NC}"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed${NC}"
    echo "Please install Node.js from: https://nodejs.org/"
    exit 1
fi

# Check if dependencies are installed
if [ ! -d "$PROJECT_ROOT/node_modules" ]; then
    echo -e "${YELLOW}Dependencies not installed. Running npm install...${NC}"
    cd "$PROJECT_ROOT" && npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}Failed to install dependencies${NC}"
        exit 1
    fi
    echo ""
fi

# Run the update agent
echo -e "${GREEN}Starting update agent...${NC}"
echo ""

cd "$PROJECT_ROOT"
node scripts/updateAgent.js --mode "$MODE" $DRY_RUN $LIMIT $VERBOSE

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}==============================================================${NC}"
    echo -e "${GREEN}       Update completed successfully!${NC}"
    echo -e "${GREEN}==============================================================${NC}"
else
    echo ""
    echo -e "${RED}==============================================================${NC}"
    echo -e "${RED}       Update failed. Check logs for details.${NC}"
    echo -e "${RED}==============================================================${NC}"
    exit 1
fi
