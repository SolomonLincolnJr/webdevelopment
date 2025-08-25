#!/bin/bash

# APEX SNIPER Mock Escalation Script
# Three-Tier LLM Routing System
# Tier 1: Local Llama (Free) -> Tier 2: GenSpark.AI (Low Cost) -> Tier 3: Manus.ai (Elite Only)

set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# LLM Routing Configuration
TIER1_LLM="local-llama"          # FREE - Basic queries, simple validation
TIER2_LLM="genspark-ai"          # LOW COST - Complex validation, UI/UX, compliance
TIER3_LLM="manus-ai"             # HIGH COST - Elite autonomous trading only

# Cost per request (USD)
TIER1_COST=0.00
TIER2_COST=0.05
TIER3_COST=1.50

# Daily budget limits
DAILY_BUDGET_TOTAL=10.00
TIER1_LIMIT=999999  # Unlimited (free)
TIER2_LIMIT=100     # 100 requests = $5.00
TIER3_LIMIT=3       # 3 requests = $4.50

# Usage tracking files
USAGE_DIR="./logs/llm-usage"
mkdir -p "$USAGE_DIR"
TIER1_USAGE_FILE="$USAGE_DIR/tier1-usage-$(date +%Y%m%d).log"
TIER2_USAGE_FILE="$USAGE_DIR/tier2-usage-$(date +%Y%m%d).log"
TIER3_USAGE_FILE="$USAGE_DIR/tier3-usage-$(date +%Y%m%d).log"

echo -e "${PURPLE}🚨 APEX SNIPER MOCK ESCALATION SYSTEM${NC}"
echo -e "${BLUE}📅 Date: $(date)${NC}"
echo -e "${CYAN}🎯 Three-Tier Routing: ${TIER1_LLM} -> ${TIER2_LLM} -> ${TIER3_LLM}${NC}"
echo "=================================================================="

# Function to get current usage count
get_usage_count() {
    local usage_file=$1
    if [ -f "$usage_file" ]; then
        wc -l < "$usage_file" 2>/dev/null || echo 0
    else
        echo 0
    fi
}

# Function to log usage
log_usage() {
    local tier=$1
    local task_type=$2
    local cost=$3
    local usage_file=""
    
    case $tier in
        1) usage_file=$TIER1_USAGE_FILE ;;
        2) usage_file=$TIER2_USAGE_FILE ;;
        3) usage_file=$TIER3_USAGE_FILE ;;
    esac
    
    echo "$(date -Iseconds)|$task_type|$cost" >> "$usage_file"
}

# Function to calculate daily spending
calculate_daily_spending() {
    local tier1_count=$(get_usage_count "$TIER1_USAGE_FILE")
    local tier2_count=$(get_usage_count "$TIER2_USAGE_FILE") 
    local tier3_count=$(get_usage_count "$TIER3_USAGE_FILE")
    
    local tier1_cost=$(echo "$tier1_count * $TIER1_COST" | bc -l 2>/dev/null || echo "0")
    local tier2_cost=$(echo "$tier2_count * $TIER2_COST" | bc -l 2>/dev/null || echo "0")
    local tier3_cost=$(echo "$tier3_count * $TIER3_COST" | bc -l 2>/dev/null || echo "0")
    
    local total_cost=$(echo "$tier1_cost + $tier2_cost + $tier3_cost" | bc -l 2>/dev/null || echo "0")
    
    echo "$total_cost"
}

# Function to determine routing tier based on task complexity
determine_routing_tier() {
    local task_type=$1
    local complexity=$2
    
    case $task_type in
        "simple-query"|"basic-validation"|"text-processing"|"status-check")
            echo 1
            ;;
        "ui-design"|"compliance-check"|"documentation"|"testing"|"code-review")
            echo 2
            ;;
        "autonomous-trading"|"quantum-processing"|"elite-algorithm"|"critical-decision")
            echo 3
            ;;
        *)
            # Default routing based on complexity
            case $complexity in
                "low") echo 1 ;;
                "medium") echo 2 ;;
                "high") echo 3 ;;
                *) echo 1 ;;
            esac
            ;;
    esac
}

# Function to check if tier is available (within limits)
check_tier_availability() {
    local tier=$1
    local current_usage=""
    local tier_limit=""
    
    case $tier in
        1) 
            current_usage=$(get_usage_count "$TIER1_USAGE_FILE")
            tier_limit=$TIER1_LIMIT
            ;;
        2)
            current_usage=$(get_usage_count "$TIER2_USAGE_FILE")
            tier_limit=$TIER2_LIMIT
            ;;
        3)
            current_usage=$(get_usage_count "$TIER3_USAGE_FILE")
            tier_limit=$TIER3_LIMIT
            ;;
    esac
    
    if [ "$current_usage" -lt "$tier_limit" ]; then
        return 0  # Available
    else
        return 1  # Not available (limit reached)
    fi
}

# Function to simulate LLM request processing
process_llm_request() {
    local task_type=$1
    local complexity=$2
    local content=$3
    local request_id=$(date +%s%N | cut -c-10)
    
    echo -e "${BLUE}📨 Processing Request ID: $request_id${NC}"
    echo -e "${CYAN}   Task Type: $task_type${NC}"
    echo -e "${CYAN}   Complexity: $complexity${NC}"
    echo -e "${CYAN}   Content: ${content:0:50}...${NC}"
    
    # Determine optimal routing tier
    local optimal_tier=$(determine_routing_tier "$task_type" "$complexity")
    local selected_tier=$optimal_tier
    local selected_llm=""
    local cost=0
    
    echo -e "${YELLOW}🎯 Optimal Tier: $optimal_tier${NC}"
    
    # Try optimal tier first, then escalate if needed
    for attempt_tier in $(seq $optimal_tier 3); do
        if check_tier_availability $attempt_tier; then
            selected_tier=$attempt_tier
            break
        else
            echo -e "${RED}❌ Tier $attempt_tier limit reached, trying next tier...${NC}"
        fi
    done
    
    # If no tier available, try to downgrade
    if ! check_tier_availability $selected_tier; then
        for attempt_tier in $(seq $((optimal_tier-1)) -1 1); do
            if [ $attempt_tier -gt 0 ] && check_tier_availability $attempt_tier; then
                selected_tier=$attempt_tier
                echo -e "${YELLOW}⬇️ Downgrading to Tier $selected_tier due to budget constraints${NC}"
                break
            fi
        done
    fi
    
    # Execute request on selected tier
    case $selected_tier in
        1)
            selected_llm=$TIER1_LLM
            cost=$TIER1_COST
            echo -e "${GREEN}✅ Routing to Tier 1: $selected_llm (FREE)${NC}"
            ;;
        2)
            selected_llm=$TIER2_LLM
            cost=$TIER2_COST
            echo -e "${YELLOW}💰 Routing to Tier 2: $selected_llm (\$$cost)${NC}"
            ;;
        3)
            selected_llm=$TIER3_LLM
            cost=$TIER3_COST
            echo -e "${RED}🔥 Routing to Tier 3: $selected_llm (\$$cost) - ELITE TASK${NC}"
            
            # Require explicit approval for Manus.ai
            echo -e "${RED}🚨 AUTHORIZATION REQUIRED: This request will use Manus.ai${NC}"
            echo -e "${YELLOW}   Task: $task_type${NC}"
            echo -e "${YELLOW}   Cost: \$$cost${NC}"
            echo -e "${YELLOW}   Justification: Elite autonomous trading task${NC}"
            read -p "   Approve Manus.ai usage? (y/N): " approval
            
            if [[ ! "$approval" =~ ^[Yy]$ ]]; then
                echo -e "${RED}❌ Manus.ai request DENIED - falling back to Tier 2${NC}"
                selected_tier=2
                selected_llm=$TIER2_LLM
                cost=$TIER2_COST
            fi
            ;;
    esac
    
    # Log the usage
    log_usage $selected_tier "$task_type" $cost
    
    # Simulate processing time
    local processing_time=""
    case $selected_tier in
        1) processing_time=1 ;;
        2) processing_time=2 ;;
        3) processing_time=3 ;;
    esac
    
    echo -e "${BLUE}⏳ Processing with $selected_llm...${NC}"
    sleep $processing_time
    
    # Generate mock response
    local response="Mock response from $selected_llm for $task_type task"
    echo -e "${GREEN}✅ Response received from $selected_llm${NC}"
    echo -e "${CYAN}   Response: $response${NC}"
    echo -e "${CYAN}   Cost: \$$cost${NC}"
    echo -e "${CYAN}   Processing Time: ${processing_time}s${NC}"
    
    # Update running totals
    local daily_spending=$(calculate_daily_spending)
    local remaining_budget=$(echo "$DAILY_BUDGET_TOTAL - $daily_spending" | bc 2>/dev/null || echo "0")
    
    echo -e "${PURPLE}💰 Daily Spending: \$$daily_spending / \$$DAILY_BUDGET_TOTAL${NC}"
    echo -e "${PURPLE}💰 Remaining Budget: \$$remaining_budget${NC}"
    
    # Budget warning if approaching limit
    local budget_percentage=$(echo "scale=2; $daily_spending / $DAILY_BUDGET_TOTAL * 100" | bc 2>/dev/null || echo "0")
    if (( $(echo "$budget_percentage > 80" | bc -l 2>/dev/null || echo 0) )); then
        echo -e "${RED}🚨 WARNING: ${budget_percentage}% of daily budget used!${NC}"
    fi
    
    echo -e "${BLUE}─────────────────────────────────────────────────────${NC}"
}

# Function to display usage statistics
display_usage_stats() {
    echo -e "\n${PURPLE}📊 DAILY USAGE STATISTICS${NC}"
    echo "═══════════════════════════════════════"
    
    local tier1_count=$(get_usage_count "$TIER1_USAGE_FILE")
    local tier2_count=$(get_usage_count "$TIER2_USAGE_FILE")
    local tier3_count=$(get_usage_count "$TIER3_USAGE_FILE")
    local total_requests=$((tier1_count + tier2_count + tier3_count))
    
    echo -e "${GREEN}🔹 Tier 1 ($TIER1_LLM): $tier1_count requests (\$0.00)${NC}"
    echo -e "${YELLOW}🔸 Tier 2 ($TIER2_LLM): $tier2_count requests (\$$(echo "$tier2_count * $TIER2_COST" | bc 2>/dev/null || echo "0"))${NC}"
    echo -e "${RED}🔺 Tier 3 ($TIER3_LLM): $tier3_count requests (\$$(echo "$tier3_count * $TIER3_COST" | bc 2>/dev/null || echo "0"))${NC}"
    echo -e "${BLUE}📊 Total Requests: $total_requests${NC}"
    
    local daily_spending=$(calculate_daily_spending)
    echo -e "${PURPLE}💰 Total Daily Cost: \$$daily_spending${NC}"
    
    # Distribution percentages
    if [ $total_requests -gt 0 ]; then
        local tier1_pct=$(echo "scale=1; $tier1_count * 100 / $total_requests" | bc 2>/dev/null || echo "0")
        local tier2_pct=$(echo "scale=1; $tier2_count * 100 / $total_requests" | bc 2>/dev/null || echo "0")
        local tier3_pct=$(echo "scale=1; $tier3_count * 100 / $total_requests" | bc 2>/dev/null || echo "0")
        
        echo -e "${CYAN}📈 Distribution:${NC}"
        echo -e "${CYAN}   • Local Llama: ${tier1_pct}%${NC}"
        echo -e "${CYAN}   • GenSpark.AI: ${tier2_pct}%${NC}"
        echo -e "${CYAN}   • Manus.ai: ${tier3_pct}%${NC}"
    fi
}

# Main simulation function
run_escalation_simulation() {
    echo -e "${YELLOW}🧪 RUNNING ESCALATION SIMULATION${NC}"
    echo "Simulating various task types and routing decisions..."
    echo ""
    
    # Test cases covering different scenarios
    declare -a test_cases=(
        "simple-query|low|What is the current oil price?"
        "ui-design|medium|Design dashboard for family office trading"
        "compliance-check|medium|Validate FINRA compliance for new strategy"
        "autonomous-trading|high|Execute quantum-enhanced /CL futures trade"
        "basic-validation|low|Check if all services are running"
        "code-review|medium|Review trading algorithm implementation"
        "quantum-processing|high|Optimize quantum fidelity parameters"
        "text-processing|low|Generate status report summary"
        "documentation|medium|Create API documentation for new endpoints"
        "elite-algorithm|high|Calibrate elite trading algorithm parameters"
    )
    
    for test_case in "${test_cases[@]}"; do
        IFS='|' read -r task_type complexity content <<< "$test_case"
        process_llm_request "$task_type" "$complexity" "$content"
        sleep 1  # Brief pause between requests
    done
    
    display_usage_stats
}

# Function to test budget enforcement
test_budget_enforcement() {
    echo -e "\n${YELLOW}🧪 TESTING BUDGET ENFORCEMENT${NC}"
    echo "Attempting to exceed daily limits..."
    
    # Try to exceed Tier 3 limit
    echo -e "${RED}Testing Tier 3 (Manus.ai) limit enforcement...${NC}"
    for i in {1..5}; do
        echo -e "${CYAN}Attempt $i to use Manus.ai:${NC}"
        # Simulate non-interactive approval for testing
        echo "n" | process_llm_request "autonomous-trading" "high" "Test elite trading request $i" 2>/dev/null || true
    done
    
    display_usage_stats
}

# Function to generate escalation report
generate_escalation_report() {
    local report_file="escalation-test-report-$(date +%Y%m%d_%H%M%S).json"
    
    local tier1_count=$(get_usage_count "$TIER1_USAGE_FILE")
    local tier2_count=$(get_usage_count "$TIER2_USAGE_FILE")
    local tier3_count=$(get_usage_count "$TIER3_USAGE_FILE")
    local daily_spending=$(calculate_daily_spending)
    
    cat > "$report_file" << EOF
{
  "test_date": "$(date -Iseconds)",
  "test_type": "Mock Escalation System",
  "routing_configuration": {
    "tier_1": {
      "llm": "$TIER1_LLM",
      "cost_per_request": $TIER1_COST,
      "daily_limit": $TIER1_LIMIT,
      "usage_today": $tier1_count
    },
    "tier_2": {
      "llm": "$TIER2_LLM", 
      "cost_per_request": $TIER2_COST,
      "daily_limit": $TIER2_LIMIT,
      "usage_today": $tier2_count
    },
    "tier_3": {
      "llm": "$TIER3_LLM",
      "cost_per_request": $TIER3_COST,
      "daily_limit": $TIER3_LIMIT,
      "usage_today": $tier3_count
    }
  },
  "budget_analysis": {
    "daily_budget": $DAILY_BUDGET_TOTAL,
    "daily_spending": $daily_spending,
    "remaining_budget": $(echo "$DAILY_BUDGET_TOTAL - $daily_spending" | bc 2>/dev/null || echo "0"),
    "budget_utilization_percentage": $(echo "scale=2; $daily_spending / $DAILY_BUDGET_TOTAL * 100" | bc 2>/dev/null || echo "0")
  },
  "optimization_metrics": {
    "free_tier_usage_percentage": $(echo "scale=1; $tier1_count * 100 / ($tier1_count + $tier2_count + $tier3_count)" | bc 2>/dev/null || echo "0"),
    "cost_per_request_average": $(echo "scale=4; $daily_spending / ($tier1_count + $tier2_count + $tier3_count)" | bc 2>/dev/null || echo "0"),
    "manus_ai_usage_percentage": $(echo "scale=1; $tier3_count * 100 / ($tier1_count + $tier2_count + $tier3_count)" | bc 2>/dev/null || echo "0")
  },
  "recommendations": [
    "Maintain Manus.ai usage under 5% for cost optimization",
    "Maximize Local Llama usage for basic tasks",
    "Implement automatic downgrading when tier limits reached",
    "Consider increasing Tier 2 limits if needed for operations"
  ]
}
EOF
    
    echo -e "${GREEN}📄 Escalation test report generated: $report_file${NC}"
}

# Main execution
echo -e "${GREEN}🚀 Starting Mock Escalation System Test${NC}"

# Run the simulation
run_escalation_simulation

# Test budget enforcement
test_budget_enforcement

# Generate report
generate_escalation_report

echo -e "\n${GREEN}✅ MOCK ESCALATION SYSTEM TEST COMPLETED${NC}"
echo -e "${BLUE}📊 Review the generated logs and report for detailed analysis${NC}"
echo -e "${YELLOW}💡 This simulation demonstrates intelligent LLM routing for cost optimization${NC}"

exit 0