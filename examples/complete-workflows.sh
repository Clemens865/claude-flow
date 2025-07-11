#!/bin/bash

# Claude-Flow Enhanced - Complete Workflow Examples
# Comprehensive examples for real-world use cases

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🌊 Claude-Flow Enhanced - Complete Workflow Examples${NC}"
echo "=============================================================="

# Function to print section headers
print_section() {
    echo
    echo -e "${GREEN}📋 $1${NC}"
    echo "----------------------------------------"
}

# Function to run example with description
run_example() {
    local title="$1"
    local description="$2"
    local command="$3"
    
    echo -e "${YELLOW}🚀 $title${NC}"
    echo "   $description"
    echo -e "${BLUE}   Command: $command${NC}"
    
    # Uncomment to actually run the commands
    # eval "$command"
    
    echo "   ✅ Example documented"
    echo
}

print_section "Web Development Workflows"

run_example "Full-Stack E-commerce Platform" \
    "Build complete e-commerce platform with React frontend, Node.js backend, and PostgreSQL database" \
    "npx claude-flow@alpha workflow web-development --template=ecommerce --stack=react,node,postgres --features=auth,products,cart,payments,admin --deploy=docker"

run_example "Real-time Chat Application" \
    "Create real-time chat app with WebSocket support, user authentication, and message history" \
    "npx claude-flow@alpha workflow web-development --template=realtime --features=websockets,auth,chat,history --stack=react,express,socket.io"

run_example "Progressive Web App (PWA)" \
    "Build PWA with offline support, push notifications, and responsive design" \
    "npx claude-flow@alpha workflow web-development --template=pwa --features=offline,notifications,responsive --optimization=performance"

print_section "Data Science & Analytics Workflows"

run_example "Customer Behavior Analysis" \
    "Analyze customer behavior patterns from e-commerce data, generate insights and predictive models" \
    "npx claude-flow@alpha workflow data-analysis --source=ecommerce-db --analysis=behavior,segmentation,prediction --output=dashboard,report"

run_example "Financial Market Analysis" \
    "Analyze stock market trends, perform technical analysis, and generate trading insights" \
    "npx claude-flow@alpha workflow data-analysis --source=market-api --analysis=trends,technical,sentiment --models=prediction,risk"

run_example "Social Media Sentiment Analysis" \
    "Collect and analyze social media data for brand sentiment and trend analysis" \
    "npx claude-flow@alpha workflow data-analysis --source=twitter,instagram --analysis=sentiment,trends,influence --visualization=dashboard"

print_section "Research & Documentation Workflows"

run_example "Academic Literature Review" \
    "Comprehensive literature review on AI/ML topics with citation management and synthesis" \
    "npx claude-flow@alpha workflow research --topic='machine learning trends' --sources=academic,arxiv,pubmed --depth=comprehensive --output=review,bibliography"

run_example "Market Research Report" \
    "Complete market analysis with competitor research, trend analysis, and strategic recommendations" \
    "npx claude-flow@alpha workflow research --topic='SaaS market trends' --sources=reports,news,surveys --analysis=competitive,trends --output=executive-summary,detailed-report"

run_example "Technical Documentation Generation" \
    "Generate comprehensive API documentation, user guides, and developer tutorials" \
    "npx claude-flow@alpha workflow documentation --source=codebase --types=api,user-guide,tutorials --formats=markdown,html,pdf"

print_section "DevOps & Infrastructure Workflows"

run_example "Complete CI/CD Pipeline Setup" \
    "Setup comprehensive CI/CD pipeline with testing, security scanning, and multi-environment deployment" \
    "npx claude-flow@alpha workflow deployment --pipeline=github-actions --stages=build,test,security,deploy --environments=dev,staging,prod"

run_example "Infrastructure as Code" \
    "Create complete infrastructure setup using Terraform, including networking, security, and monitoring" \
    "npx claude-flow@alpha workflow infrastructure --provider=aws --components=vpc,security,compute,database,monitoring --iac=terraform"

run_example "Kubernetes Deployment with Monitoring" \
    "Deploy application to Kubernetes with complete monitoring, logging, and alerting setup" \
    "npx claude-flow@alpha workflow deployment --platform=kubernetes --monitoring=prometheus,grafana --logging=elk-stack --alerts=pagerduty"

print_section "Security & Compliance Workflows"

run_example "Comprehensive Security Audit" \
    "Perform complete security assessment including code review, infrastructure audit, and compliance check" \
    "npx claude-flow@alpha workflow security-audit --scope=code,infrastructure,compliance --standards=owasp,nist,iso27001 --depth=comprehensive"

run_example "GDPR Compliance Assessment" \
    "Assess and implement GDPR compliance including data mapping, privacy controls, and documentation" \
    "npx claude-flow@alpha workflow compliance --regulation=gdpr --assessment=data-mapping,controls,documentation --remediation=auto"

run_example "Penetration Testing" \
    "Automated penetration testing with vulnerability assessment and remediation recommendations" \
    "npx claude-flow@alpha workflow security-test --type=penetration --scope=web-app,api,infrastructure --depth=comprehensive --report=detailed"

print_section "API Development Workflows"

run_example "REST API with Authentication" \
    "Build comprehensive REST API with JWT authentication, rate limiting, and comprehensive testing" \
    "npx claude-flow@alpha workflow api-development --type=rest --auth=jwt --features=crud,pagination,validation,rate-limiting --testing=comprehensive"

run_example "GraphQL API with Subscriptions" \
    "Create GraphQL API with real-time subscriptions, schema federation, and performance optimization" \
    "npx claude-flow@alpha workflow api-development --type=graphql --features=subscriptions,federation,caching --optimization=performance"

run_example "Microservices Architecture" \
    "Design and implement microservices architecture with service discovery, API gateway, and distributed tracing" \
    "npx claude-flow@alpha workflow api-development --architecture=microservices --services=user,product,order,payment --gateway=api-gateway --tracing=distributed"

print_section "Machine Learning Workflows"

run_example "End-to-End ML Pipeline" \
    "Complete ML pipeline from data ingestion to model deployment with monitoring" \
    "npx claude-flow@alpha workflow ml-pipeline --stages=ingestion,preprocessing,training,validation,deployment --monitoring=mlflow --deployment=api"

run_example "Computer Vision Model" \
    "Develop and deploy computer vision model for image classification with edge deployment" \
    "npx claude-flow@alpha workflow ml-pipeline --type=computer-vision --task=classification --deployment=edge,api --optimization=mobile"

run_example "Natural Language Processing" \
    "Build NLP pipeline for text analysis, sentiment analysis, and entity extraction" \
    "npx claude-flow@alpha workflow ml-pipeline --type=nlp --tasks=sentiment,entities,classification --models=transformer --api=rest"

print_section "Mobile Development Workflows"

run_example "Cross-Platform Mobile App" \
    "Build cross-platform mobile app with React Native including authentication and offline support" \
    "npx claude-flow@alpha workflow mobile-development --platform=react-native --features=auth,offline,push-notifications --deployment=app-stores"

run_example "Flutter E-commerce App" \
    "Create Flutter e-commerce app with payment integration and real-time updates" \
    "npx claude-flow@alpha workflow mobile-development --platform=flutter --features=ecommerce,payments,real-time --backend=firebase"

print_section "Testing & Quality Assurance Workflows"

run_example "Comprehensive Testing Suite" \
    "Generate complete testing suite including unit, integration, e2e, and performance tests" \
    "npx claude-flow@alpha workflow testing --types=unit,integration,e2e,performance --coverage=90 --frameworks=jest,cypress,k6"

run_example "Automated Quality Assurance" \
    "Setup automated QA pipeline with code quality checks, security scanning, and performance testing" \
    "npx claude-flow@alpha workflow qa-automation --checks=code-quality,security,performance --tools=sonarqube,snyk,lighthouse"

print_section "Enterprise Integration Workflows"

run_example "ERP System Integration" \
    "Integrate with enterprise ERP systems including data synchronization and workflow automation" \
    "npx claude-flow@alpha workflow enterprise-integration --systems=sap,oracle --integration=api,etl --automation=workflows"

run_example "CRM Integration with Analytics" \
    "Integrate CRM system with analytics platform for customer insights and automated reporting" \
    "npx claude-flow@alpha workflow enterprise-integration --systems=salesforce,hubspot --analytics=powerbi,tableau --automation=reports"

print_section "Startup MVP Workflows"

run_example "Complete MVP in 48 Hours" \
    "Build complete MVP with authentication, core features, and deployment ready for user testing" \
    "npx claude-flow@alpha workflow mvp-development --timeline=48h --features=auth,core,payments --deployment=cloud --testing=basic"

run_example "SaaS Platform MVP" \
    "Create SaaS platform MVP with multi-tenancy, subscription billing, and admin dashboard" \
    "npx claude-flow@alpha workflow mvp-development --type=saas --features=multi-tenant,billing,admin --stack=modern"

print_section "Content & Marketing Workflows"

run_example "Content Marketing Automation" \
    "Automate content creation, SEO optimization, and social media posting" \
    "npx claude-flow@alpha workflow content-marketing --content=blog,social,email --optimization=seo --automation=scheduling"

run_example "SEO Optimization Campaign" \
    "Comprehensive SEO analysis and optimization including technical SEO and content optimization" \
    "npx claude-flow@alpha workflow seo-optimization --analysis=technical,content,competitors --optimization=on-page,off-page"

print_section "Custom Workflow Creation"

echo -e "${YELLOW}🛠️ Creating Custom Workflows${NC}"
echo "   You can create custom workflows by combining agents and templates:"
echo

cat << 'EOF'
# Example: Custom E-learning Platform Workflow
npx claude-flow@alpha workflow create custom-elearning \
  --agents="frontend-specialist,backend-specialist,database-expert,security-auditor" \
  --features="user-management,course-creation,video-streaming,assessments,analytics" \
  --integrations="payment-gateway,video-cdn,email-service" \
  --deployment="kubernetes,monitoring"

# Example: Custom Fintech Application Workflow  
npx claude-flow@alpha workflow create custom-fintech \
  --agents="security-specialist,compliance-expert,api-developer,ml-engineer" \
  --features="kyc,fraud-detection,payment-processing,risk-assessment" \
  --compliance="pci-dss,sox,kyc-aml" \
  --security="encryption,audit-logging,secure-communication"
EOF

echo
print_section "Monitoring and Analytics"

run_example "Real-time Performance Monitoring" \
    "Setup comprehensive monitoring for all workflows with alerts and dashboards" \
    "npx claude-flow@alpha monitor setup --metrics=performance,errors,usage --dashboards=grafana --alerts=slack,email"

run_example "Workflow Analytics and Optimization" \
    "Analyze workflow performance and get optimization recommendations" \
    "npx claude-flow@alpha analytics workflow --period=30d --optimization=auto --reports=executive,technical"

print_section "Team Collaboration"

echo -e "${YELLOW}👥 Team Collaboration Features${NC}"
echo "   Setup team workflows with role-based access and collaboration:"
echo

cat << 'EOF'
# Setup team workspace
npx claude-flow@alpha team create "development-team" \
  --members="dev1@company.com,dev2@company.com" \
  --roles="developer,reviewer,admin" \
  --workflows="web-development,testing,deployment"

# Shared memory and knowledge base
npx claude-flow@alpha team memory share \
  --workspace="development-team" \
  --categories="architecture,best-practices,troubleshooting"

# Collaborative workflows
npx claude-flow@alpha team workflow collaborative \
  --workflow="api-development" \
  --assignees="backend-team,frontend-team,qa-team" \
  --coordination="automatic"
EOF

echo
echo -e "${GREEN}🎉 All workflow examples documented!${NC}"
echo
echo -e "${BLUE}💡 Next Steps:${NC}"
echo "1. Choose a workflow that matches your needs"
echo "2. Customize the parameters for your specific requirements"  
echo "3. Run the workflow and monitor progress via dashboard"
echo "4. Use the memory system to store learnings for future workflows"
echo "5. Create custom workflows by combining existing templates"
echo
echo -e "${YELLOW}📚 For more examples and documentation:${NC}"
echo "   - Check .claude/commands/ for detailed command documentation"
echo "   - Visit the web dashboard at http://localhost:3000"
echo "   - Read QUICK_START.md for getting started guide"
echo "   - Explore enhanced-features.js for programmatic usage"
echo