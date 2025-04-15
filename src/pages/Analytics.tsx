
import { MainLayout } from "@/layouts/main-layout";
import { PageHeader } from "@/components/layout/page-header";
import { ChartCard } from "@/components/ui/chart-card";
import { BarChart } from "@/components/charts/bar-chart";
import { LineChart } from "@/components/charts/line-chart";
import { DoughnutChart } from "@/components/charts/doughnut-chart";
import { Button } from "@/components/ui/button";
import { Download, Filter, Save } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  mockResponseRateChartData, 
  mockScoreDistributionChartData, 
  mockProviderComparisonChartData,
  mockAnalyticsData,
  mockSurveyQuestions
} from "@/data/mockData";

const Analytics = () => {
  // Create some chart data for individual questions
  const questionScores = {
    labels: mockSurveyQuestions.map(q => `Q${q.id.slice(1)}`),
    datasets: [
      {
        label: "Average Score",
        data: mockSurveyQuestions.map(q => q.averageScore),
        backgroundColor: "rgba(110, 89, 165, 0.2)",
        borderColor: "rgba(110, 89, 165, 1)",
        borderWidth: 1,
      },
    ],
  };
  
  // Create some chart data for response rate by month
  const monthlyResponseRate = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Survey 1",
        data: [60, 65, 70, 72, 75, 78],
        backgroundColor: "rgba(110, 89, 165, 0.2)",
        borderColor: "rgba(110, 89, 165, 1)",
        borderWidth: 1,
      },
      {
        label: "Survey 2",
        data: [55, 60, 62, 65, 70, 72],
        backgroundColor: "rgba(14, 165, 233, 0.2)",
        borderColor: "rgba(14, 165, 233, 1)",
        borderWidth: 1,
      },
    ],
  };
  
  // Chart data for demographic breakdown
  const demographicData = {
    labels: ["18-29", "30-44", "45-59", "60-74", "75+"],
    datasets: [
      {
        label: "Respondents",
        data: [12, 35, 42, 38, 23],
        backgroundColor: [
          "rgba(139, 92, 246, 0.2)",
          "rgba(14, 165, 233, 0.2)",
          "rgba(217, 70, 239, 0.2)",
          "rgba(110, 89, 165, 0.2)",
          "rgba(20, 184, 166, 0.2)",
        ],
        borderColor: [
          "rgba(139, 92, 246, 1)",
          "rgba(14, 165, 233, 1)",
          "rgba(217, 70, 239, 1)",
          "rgba(110, 89, 165, 1)",
          "rgba(20, 184, 166, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <MainLayout>
      <PageHeader 
        title="Analytics" 
        description="In-depth analysis of survey data"
      >
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save Report
          </Button>
        </div>
      </PageHeader>
      
      <div className="grid gap-4 md:grid-cols-4 mt-6">
        <Card className="md:col-span-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Analytics Settings</CardTitle>
            <CardDescription>Customize your analytics view</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Time Period</label>
                <Select defaultValue="6m">
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1m">Last Month</SelectItem>
                    <SelectItem value="3m">Last 3 Months</SelectItem>
                    <SelectItem value="6m">Last 6 Months</SelectItem>
                    <SelectItem value="1y">Last Year</SelectItem>
                    <SelectItem value="all">All Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Survey Type</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Surveys</SelectItem>
                    <SelectItem value="satisfaction">Satisfaction</SelectItem>
                    <SelectItem value="post-op">Post-Operation</SelectItem>
                    <SelectItem value="emergency">Emergency Care</SelectItem>
                    <SelectItem value="annual">Annual Assessment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Provider</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Providers</SelectItem>
                    <SelectItem value="p1">Dr. Johnson</SelectItem>
                    <SelectItem value="p2">Dr. Chen</SelectItem>
                    <SelectItem value="p3">Dr. Rodriguez</SelectItem>
                    <SelectItem value="p4">Dr. Wilson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="heart">Heart Center</SelectItem>
                    <SelectItem value="surgical">Surgical</SelectItem>
                    <SelectItem value="childrens">Children's Health</SelectItem>
                    <SelectItem value="neuro">Neuroscience</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="mt-6">
        <TabsList className="grid w-full grid-cols-4 md:w-auto md:inline-flex">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="surveys">Survey Analysis</TabsTrigger>
          <TabsTrigger value="providers">Provider Analysis</TabsTrigger>
          <TabsTrigger value="anova">ANOVA Results</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <ChartCard 
              title="Response Rate Trend" 
              description="Monthly response rate percentage"
            >
              <LineChart data={mockResponseRateChartData} height={250} />
            </ChartCard>
            <ChartCard 
              title="Score Distribution" 
              description="Distribution of survey scores"
            >
              <DoughnutChart data={mockScoreDistributionChartData} height={250} />
            </ChartCard>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <ChartCard 
              title="Provider Comparison" 
              description="Average scores by provider"
            >
              <BarChart data={mockProviderComparisonChartData} height={250} />
            </ChartCard>
            <ChartCard 
              title="Demographic Breakdown" 
              description="Respondents by age group"
            >
              <DoughnutChart data={demographicData} height={250} />
            </ChartCard>
          </div>
          
          <ChartCard 
            title="Gemini Insights" 
            description="AI-powered statistical analysis"
          >
            <div className="space-y-4">
              <div className="bg-muted/30 p-4 rounded-md">
                <h3 className="font-semibold text-lg mb-2">Statistical Analysis Summary</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">ANOVA Results</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      The ANOVA test reveals a statistically significant difference in patient 
                      satisfaction scores across departments (F = {mockAnalyticsData.anovaResults.fValue}, 
                      p = {mockAnalyticsData.anovaResults.pValue}). Post-hoc analysis indicates that 
                      the Neuroscience department (mean score: 4.7) significantly outperforms the 
                      Emergency Care department (mean score: 3.8).
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Correlation Analysis</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      A strong positive correlation (r = 0.78) exists between the time spent 
                      with patients and overall satisfaction scores. Providers who spend an 
                      average of 15+ minutes with patients receive significantly higher ratings 
                      than those spending less than 10 minutes per patient.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Trend Analysis</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Time series analysis shows a steady 3.2% increase in monthly response rates 
                      over the past 6 months. This improvement coincides with the implementation 
                      of the new mobile survey platform, suggesting a positive impact on participation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ChartCard>
        </TabsContent>
        
        <TabsContent value="surveys" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <ChartCard 
              title="Question Scores" 
              description="Average scores for each survey question"
            >
              <BarChart data={questionScores} height={250} />
            </ChartCard>
            <ChartCard 
              title="Response Rate by Survey" 
              description="Monthly response rates for each survey"
            >
              <LineChart data={monthlyResponseRate} height={250} />
            </ChartCard>
          </div>
          
          <ChartCard 
            title="Question Analysis" 
            description="Detailed breakdown of survey questions"
          >
            <div className="space-y-4">
              {mockSurveyQuestions.map((question) => (
                <div key={question.id} className="p-4 border border-border rounded-md">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{question.text}</h3>
                    <div className="flex items-center bg-muted px-2 py-1 rounded-md text-sm">
                      Score: {question.averageScore}/5
                    </div>
                  </div>
                  <div className="mt-2 flex items-center">
                    <div className="w-full max-w-sm h-2 bg-muted rounded-full overflow-hidden mr-2">
                      <div 
                        className="h-full bg-primary" 
                        style={{ width: `${(question.averageScore / 5) * 100}%` }} 
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {question.responseCount} responses
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </TabsContent>
        
        <TabsContent value="providers" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <ChartCard 
              title="Provider Comparison" 
              description="Average scores by provider"
            >
              <BarChart data={mockProviderComparisonChartData} height={250} />
            </ChartCard>
            <ChartCard 
              title="Provider Response Rates" 
              description="Response rates for each provider's surveys"
            >
              <LineChart data={{
                labels: ["Dr. Johnson", "Dr. Chen", "Dr. Rodriguez", "Dr. Wilson"],
                datasets: [{
                  label: "Response Rate",
                  data: [78, 65, 72, 82],
                  backgroundColor: "rgba(14, 165, 233, 0.2)",
                  borderColor: "rgba(14, 165, 233, 1)",
                  borderWidth: 1,
                }]
              }} height={250} />
            </ChartCard>
          </div>
          
          <ChartCard 
            title="Provider Insights" 
            description="Gemini analysis of provider performance"
          >
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="border-l-4 border-prolytix-purple pl-4 py-2">
                  <h3 className="font-semibold mb-1">Dr. Sarah Johnson (Cardiology)</h3>
                  <p className="text-sm text-muted-foreground">
                    Strengths in patient communication and bedside manner, with 92% of patients 
                    rating these aspects as "excellent." Consider sharing communication techniques 
                    with other providers. Area for improvement: follow-up care explanations.
                  </p>
                </div>
                
                <div className="border-l-4 border-prolytix-blue pl-4 py-2">
                  <h3 className="font-semibold mb-1">Dr. Michael Chen (Orthopedics)</h3>
                  <p className="text-sm text-muted-foreground">
                    Excellent technical outcomes with low complication rates. Patient feedback 
                    indicates opportunity to improve explanation of procedure risks and recovery 
                    expectations. Consider implementing standardized education materials.
                  </p>
                </div>
                
                <div className="border-l-4 border-prolytix-vivid-purple pl-4 py-2">
                  <h3 className="font-semibold mb-1">Dr. Emily Rodriguez (Pediatrics)</h3>
                  <p className="text-sm text-muted-foreground">
                    Very strong rapport with young patients and families. Parents particularly 
                    appreciate time spent answering questions (avg. 18 min per visit). Recommend 
                    highlighting this approach in departmental best practices.
                  </p>
                </div>
                
                <div className="border-l-4 border-prolytix-magenta pl-4 py-2">
                  <h3 className="font-semibold mb-1">Dr. James Wilson (Neurology)</h3>
                  <p className="text-sm text-muted-foreground">
                    Consistently highest patient satisfaction scores across all metrics. Key factors: 
                    thorough explanations, empathetic approach, and clear follow-up instructions. 
                    Recommend featuring as case study in provider training.
                  </p>
                </div>
              </div>
            </div>
          </ChartCard>
        </TabsContent>
        
        <TabsContent value="anova" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>ANOVA Summary</CardTitle>
                <CardDescription>Analysis of variance results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/30 p-4 rounded-md">
                      <div className="text-sm text-muted-foreground">F-Value</div>
                      <div className="text-2xl font-bold mt-1">{mockAnalyticsData.anovaResults.fValue}</div>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-md">
                      <div className="text-sm text-muted-foreground">P-Value</div>
                      <div className="text-2xl font-bold mt-1">{mockAnalyticsData.anovaResults.pValue}</div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-md">
                    <div className="text-sm text-muted-foreground">Statistical Significance</div>
                    <div className="text-lg font-medium mt-1 flex items-center">
                      <div className={`h-3 w-3 rounded-full mr-2 ${
                        mockAnalyticsData.anovaResults.significant 
                          ? "bg-green-500" 
                          : "bg-yellow-500"
                      }`} />
                      {mockAnalyticsData.anovaResults.significant 
                        ? "Statistically Significant" 
                        : "Not Statistically Significant"}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-4">
                    The ANOVA results indicate that there is a statistically significant 
                    difference in patient satisfaction scores across different departments 
                    and providers. The p-value of {mockAnalyticsData.anovaResults.pValue} is 
                    below the standard threshold of 0.05, suggesting that the observed 
                    differences are unlikely to have occurred by chance.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <ChartCard 
              title="Mean Comparison" 
              description="Visual comparison of means across groups"
            >
              <BarChart data={{
                labels: ["Heart Center", "Surgical", "Children's Health", "Neuroscience"],
                datasets: [{
                  label: "Mean Satisfaction Score",
                  data: [4.2, 3.8, 4.3, 4.7],
                  backgroundColor: "rgba(110, 89, 165, 0.2)",
                  borderColor: "rgba(110, 89, 165, 1)",
                  borderWidth: 1
                }]
              }} height={250} />
            </ChartCard>
          </div>
          
          <ChartCard 
            title="Post-Hoc Analysis" 
            description="Detailed comparison between groups"
          >
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Comparison</th>
                    <th className="text-left p-2">Mean Difference</th>
                    <th className="text-left p-2">P-Value</th>
                    <th className="text-left p-2">Significant</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2">Heart Center vs. Surgical</td>
                    <td className="p-2">0.4</td>
                    <td className="p-2">0.048</td>
                    <td className="p-2">
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">Heart Center vs. Children's Health</td>
                    <td className="p-2">-0.1</td>
                    <td className="p-2">0.412</td>
                    <td className="p-2">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">Heart Center vs. Neuroscience</td>
                    <td className="p-2">-0.5</td>
                    <td className="p-2">0.024</td>
                    <td className="p-2">
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">Surgical vs. Children's Health</td>
                    <td className="p-2">-0.5</td>
                    <td className="p-2">0.031</td>
                    <td className="p-2">
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">Surgical vs. Neuroscience</td>
                    <td className="p-2">-0.9</td>
                    <td className="p-2">0.004</td>
                    <td className="p-2">
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2">Children's Health vs. Neuroscience</td>
                    <td className="p-2">-0.4</td>
                    <td className="p-2">0.052</td>
                    <td className="p-2">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ChartCard>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Analytics;
