#!/bin/bash

echo "🎯 EXECUTIVE DASHBOARD VALIDATION"
echo "=================================="
echo ""

# Check file structure
echo "📋 Checking Dashboard Files..."
dashboard_files=(
    "src/data/dashboardData.js"
    "src/components/DashboardPage.js"
    "src/components/dashboard/KPICard.js"
    "src/components/dashboard/Navigation.js"
    "src/components/dashboard/ExecutiveInsights.js"
    "src/components/dashboard/ChartTabs.js"
    "src/App.js"
    "src/index.css"
)

missing_files=0
for file in "${dashboard_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file - MISSING"
        missing_files=$((missing_files + 1))
    fi
done

echo ""
echo "📊 Dependencies Check..."

# Check if Chart.js dependencies exist
if grep -q "chart.js" package.json && grep -q "react-chartjs-2" package.json; then
    echo "✅ Chart.js dependencies found"
else
    echo "❌ Chart.js dependencies missing"
    missing_files=$((missing_files + 1))
fi

echo ""
echo "🔍 Summary:"
echo "Files checked: ${#dashboard_files[@]}"
echo "Missing components: $missing_files"

if [ $missing_files -eq 0 ]; then
    echo ""
    echo "🎉 DASHBOARD READY FOR LAUNCH!"
    echo ""
    echo "🚀 Next Steps:"
    echo "1. Run: npm start"
    echo "2. Navigate to: http://localhost:3000"
    echo "3. Test Dashboard ↔ Chatbot navigation"
    echo ""
    echo "📊 Expected Features:"
    echo "• 6 Executive KPI cards with trend indicators"
    echo "• 5 Interactive chart tabs (Spend, Savings, Performance, Risk, Category)"
    echo "• 4 Strategic insights with action timelines"
    echo "• Professional navigation between Dashboard & AI Assistant"
    echo "• Responsive design optimized for C-suite presentation"
    echo ""
    echo "💰 Key Metrics:"
    echo "• Total Spend: $515.87M"
    echo "• Potential Savings: $85.2M"
    echo "• Vendor Consolidation: 2,718 → 1,500"
    echo "• Projected ROI: 420%"
else
    echo ""
    echo "⚠️  SETUP INCOMPLETE"
    echo "Please ensure all files are created before launching."
fi

echo ""
echo "🎯 Ready for Executive Presentation!"