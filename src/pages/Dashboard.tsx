
import { MainLayout } from "@/layouts/main-layout";
import { PageHeader } from "@/components/layout/page-header";
import { DataCard } from "@/components/ui/data-card";
import { ChartCard } from "@/components/ui/chart-card";
import { LineChart } from "@/components/charts/line-chart";
import { BarChart } from "@/components/charts/bar-chart";
import { DoughnutChart } from "@/components/charts/doughnut-chart";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { 
  ArrowUpRight, 
  BarChart3, 
  ClipboardList, 
  Download, 
  FileText, 
  Users 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  mockSurveys, 
  mockResponseRateChartData, 
  mockScoreDistributionChartData, 
  mockProviderComparisonChartData,
  mockAnalyticsData 
} from "@/data/mockData";
import { useEffect } from "react";

const Dashboard = () => {
  // Set authentication flag for demo
  useEffect(() => {
    sessionStorage.setItem("isAuthenticated", "true");
  }, []);
  
  // Table columns for recent surveys
  const surveyColumns = [
    {
      id: "title",
      header: "Survey",
      cell: (row: typeof mockSurveys[0]) => (
        <div className="font-medium">{row.title}</div>
      ),
    },
    {
      id: "responseRate",
      header: "Response Rate",
      cell: (row: typeof mockSurveys[0]) => (
        <div className="flex items-center">
          <div className="w-full max-w-[100px] h-2 bg-muted rounded-full overflow-hidden mr-2">
            <div 
              className="h-full bg-primary" 
              style={{ width: `${row.responseRate}%` }} 
            />
          </div>
          <span>{row.responseRate}%</span>
        </div>
      ),
    },
    {
      id: "completedCount",
      header: "Completed",
      cell: (row: typeof mockSurveys[0]) => (
        <div>{row.completedCount}/{row.totalCount}</div>
      ),
    },
    {
      id: "averageScore",
      header: "Avg. Score",
      cell: (row: typeof mockSurveys[0]) => (
        <div className="flex items-center">
          {row.averageScore}
          <span className="text-xs text-muted-foreground ml-1">/5</span>
        </div>
      ),
    },
    {
      id: "date",
      header: "Date",
      cell: (row: typeof mockSurveys[0]) => (
        <div>{new Date(row.date).toLocaleDateString()}</div>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: () => (
        <Button variant="ghost" size="icon">
          <FileText className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  return (
    <MainLayout>
      <PageHeader 
        title="Dashboard" 
        description="Overview of survey performance and insights"
      >
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </PageHeader>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
        <DataCard
          title="Total Surveys"
          value={mockAnalyticsData.totalSurveys}
          icon={<ClipboardList className="h-4 w-4" />}
          trend={{ value: 12, label: "from last month", positive: true }}
        />
        <DataCard
          title="Average Response Rate"
          value={`${mockAnalyticsData.responseRate}%`}
          icon={<Users className="h-4 w-4" />}
          trend={{ value: 4, label: "from last month", positive: true }}
        />
        <DataCard
          title="Average Score"
          value={mockAnalyticsData.averageScore}
          description="Out of 5"
          icon={<BarChart3 className="h-4 w-4" />}
          trend={{ value: 0.2, label: "from last month", positive: true }}
        />
        <DataCard
          title="ANOVA Significance"
          value={mockAnalyticsData.anovaResults.significant ? "Significant" : "Not Significant"}
          description={`p-value: ${mockAnalyticsData.anovaResults.pValue}`}
          icon={<ArrowUpRight className="h-4 w-4" />}
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 mt-6">
        <ChartCard 
          title="Response Rate Trend" 
          description="Monthly response rate percentage"
        >
          <LineChart data={mockResponseRateChartData} height={250} />
        </ChartCard>
        <ChartCard 
          title="Provider Comparison" 
          description="Average scores by provider"
        >
          <BarChart data={mockProviderComparisonChartData} height={250} />
        </ChartCard>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3 mt-6">
        <div className="md:col-span-2">
          <ChartCard 
            title="Recent Surveys" 
            description="Latest survey performance"
            footer={
              <div className="flex justify-between items-center">
                <span>Showing {mockSurveys.length} surveys</span>
                <Button variant="link" size="sm" className="p-0">
                  View All
                </Button>
              </div>
            }
          >
            <DataTable 
              data={mockSurveys} 
              columns={surveyColumns} 
              searchable={false}
            />
          </ChartCard>
        </div>
        <ChartCard 
          title="Score Distribution" 
          description="Distribution of survey scores"
        >
          <DoughnutChart data={mockScoreDistributionChartData} height={250} />
        </ChartCard>
      </div>
      
      <div className="mt-6">
        <ChartCard 
          title="Prolytix" 
          description="AI-powered analysis of your survey data"
        >
          <div className="space-y-4">
            <div className="border-l-4 border-prolytix-purple pl-4 py-2">
              <h3 className="font-semibold mb-1">Key Finding: Post-Operation Care</h3>
              <p className="text-sm text-muted-foreground">
                Survey data indicates a 15% increase in satisfaction with post-operative care 
                when compared to the previous quarter. This correlates strongly with the 
                implementation of the new follow-up protocol.
              </p>
            </div>
            
            <div className="border-l-4 border-prolytix-blue pl-4 py-2">
              <h3 className="font-semibold mb-1">Trend Alert: Response Rate</h3>
              <p className="text-sm text-muted-foreground">
                The response rate for the Emergency Care Evaluation survey is significantly 
                lower than other surveys (45% vs. average of 72%). Consider implementing 
                follow-up reminders to improve participation.
              </p>
            </div>
            
            <div className="border-l-4 border-prolytix-vivid-purple pl-4 py-2">
              <h3 className="font-semibold mb-1">Provider Insight</h3>
              <p className="text-sm text-muted-foreground">
                Dr. Wilson consistently achieves the highest patient satisfaction scores 
                across all departments. Analysis of free-text responses suggests that 
                clear communication and thorough explanations are key factors.
              </p>
            </div>
            
            <div className="flex justify-end">
              <Badge className="bg-prolytix-purple hover:bg-prolytix-purple/90">
                Powered by Gemini
              </Badge>
            </div>
          </div>
        </ChartCard>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
