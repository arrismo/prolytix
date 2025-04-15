
import { MainLayout } from "@/layouts/main-layout";
import { PageHeader } from "@/components/layout/page-header";
import { ChartCard } from "@/components/ui/chart-card";
import { BarChart } from "@/components/charts/bar-chart";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Download, 
  Filter, 
  Mail, 
  Plus, 
  UserPlus 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { mockProviders, mockProviderComparisonChartData } from "@/data/mockData";

const Providers = () => {
  // Create provider summary data
  const providerSummaryData = mockProviders.map(provider => {
    const totalSurveys = provider.surveys.length;
    const averageResponseRate = provider.surveys.reduce(
      (sum, survey) => sum + survey.responseRate, 
      0
    ) / totalSurveys;
    const averageScore = provider.surveys.reduce(
      (sum, survey) => sum + survey.averageScore, 
      0
    ) / totalSurveys;
    
    return {
      ...provider,
      totalSurveys,
      averageResponseRate,
      averageScore,
    };
  });
  
  // Define columns for providers table
  const providerColumns = [
    {
      id: "name",
      header: "Provider",
      cell: (row: typeof providerSummaryData[0]) => (
        <div className="font-medium">{row.name}</div>
      ),
    },
    {
      id: "specialty",
      header: "Specialty",
      cell: (row: typeof providerSummaryData[0]) => (
        <Badge variant="outline">{row.specialty}</Badge>
      ),
    },
    {
      id: "department",
      header: "Department",
      cell: (row: typeof providerSummaryData[0]) => (
        <div>{row.department}</div>
      ),
    },
    {
      id: "totalSurveys",
      header: "Surveys",
      cell: (row: typeof providerSummaryData[0]) => (
        <div>{row.totalSurveys}</div>
      ),
    },
    {
      id: "averageResponseRate",
      header: "Avg. Response Rate",
      cell: (row: typeof providerSummaryData[0]) => (
        <div>{row.averageResponseRate.toFixed(1)}%</div>
      ),
    },
    {
      id: "averageScore",
      header: "Avg. Score",
      cell: (row: typeof providerSummaryData[0]) => (
        <div className="flex items-center">
          {row.averageScore.toFixed(1)}
          <span className="text-xs text-muted-foreground ml-1">/5</span>
        </div>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: () => (
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon">
            <BarChart3 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Mail className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];
  
  // Create department summary
  const departmentSummary = Array.from(
    new Set(mockProviders.map(provider => provider.department))
  ).map(department => {
    const providers = mockProviders.filter(p => p.department === department);
    const providerCount = providers.length;
    const allSurveys = providers.flatMap(p => p.surveys);
    const surveyCount = allSurveys.length;
    const averageScore = allSurveys.reduce(
      (sum, survey) => sum + survey.averageScore, 
      0
    ) / allSurveys.length;
    
    return {
      department,
      providerCount,
      surveyCount,
      averageScore,
    };
  });
  
  // Department comparison chart data
  const departmentChartData = {
    labels: departmentSummary.map(dept => dept.department),
    datasets: [
      {
        label: "Average Score",
        data: departmentSummary.map(dept => dept.averageScore),
        backgroundColor: "rgba(110, 89, 165, 0.2)",
        borderColor: "rgba(110, 89, 165, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <MainLayout>
      <PageHeader 
        title="Providers" 
        description="Manage and analyze healthcare providers"
      >
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Provider
          </Button>
        </div>
      </PageHeader>
      
      <div className="grid gap-4 md:grid-cols-3 mt-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Providers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockProviders.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departmentSummary.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overall Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(providerSummaryData.reduce(
                (sum, provider) => sum + provider.averageScore, 
                0
              ) / providerSummaryData.length).toFixed(1)}
              <span className="text-sm text-muted-foreground ml-1">/5</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="providers" className="mt-6">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
          <TabsTrigger value="providers">Provider List</TabsTrigger>
          <TabsTrigger value="compare">Provider Comparison</TabsTrigger>
          <TabsTrigger value="departments">Department Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="providers" className="mt-4">
          <ChartCard 
            title="Provider Overview" 
            description="Summary of provider survey performance"
          >
            <DataTable 
              data={providerSummaryData} 
              columns={providerColumns} 
              searchPlaceholder="Search providers..."
            />
          </ChartCard>
        </TabsContent>
        
        <TabsContent value="compare" className="mt-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-lg font-medium">Provider Comparison</h2>
                <p className="text-sm text-muted-foreground">
                  Compare performance metrics between providers
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Select defaultValue="score">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select metric" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="score">Average Score</SelectItem>
                    <SelectItem value="response">Response Rate</SelectItem>
                    <SelectItem value="surveys">Number of Surveys</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <BarChart data={mockProviderComparisonChartData} height={300} />
              </CardContent>
            </Card>
            
            <ChartCard 
              title="Gemini Provider Insights" 
              description="AI-generated comparison analysis"
            >
              <div className="space-y-4 p-4 bg-muted/30 rounded-md">
                <h3 className="font-semibold">Key Performance Factors</h3>
                <p className="text-sm text-muted-foreground">
                  Analysis of provider data reveals three key factors contributing to higher
                  patient satisfaction scores:
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 ml-6 list-disc">
                  <li>
                    <span className="font-medium">Time spent with patients:</span> Providers
                    who average 15+ minutes per patient consultation consistently score 0.7
                    points higher than those spending less than 10 minutes.
                  </li>
                  <li>
                    <span className="font-medium">Communication clarity:</span> Providers
                    who score highly on "explaining medical information clearly" questions
                    show a 92% correlation with overall satisfaction.
                  </li>
                  <li>
                    <span className="font-medium">Follow-up protocol:</span> Implementing
                    standardized follow-up procedures results in a 23% increase in patient
                    satisfaction scores.
                  </li>
                </ul>
                <div className="pt-2">
                  <p className="text-sm font-medium">Recommendation:</p>
                  <p className="text-sm text-muted-foreground">
                    Consider implementing targeted training focused on these three factors,
                    particularly for providers scoring below department averages.
                  </p>
                </div>
              </div>
            </ChartCard>
          </div>
        </TabsContent>
        
        <TabsContent value="departments" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <ChartCard 
              title="Department Comparison" 
              description="Average scores by department"
            >
              <BarChart data={departmentChartData} height={300} />
            </ChartCard>
            
            <Card>
              <CardHeader>
                <CardTitle>Department Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentSummary.map((dept, index) => (
                    <div key={index} className="p-4 border border-border rounded-md">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{dept.department}</h3>
                        <Badge variant="outline">
                          {dept.providerCount} {dept.providerCount === 1 ? 'Provider' : 'Providers'}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Surveys</div>
                          <div className="font-medium">{dept.surveyCount}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Average Score</div>
                          <div className="font-medium flex items-center">
                            {dept.averageScore.toFixed(1)}
                            <span className="text-xs text-muted-foreground ml-1">/5</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Providers;
