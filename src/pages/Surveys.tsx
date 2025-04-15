
import { MainLayout } from "@/layouts/main-layout";
import { PageHeader } from "@/components/layout/page-header";
import { ChartCard } from "@/components/ui/chart-card";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Filter, Plus, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockSurveys, mockPatientSurveys, mockProviders } from "@/data/mockData";

const Surveys = () => {
  // Define columns for surveys table
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
          <Trash className="h-4 w-4" />
        </Button>
      ),
    },
  ];
  
  // Define columns for patient surveys table
  const patientSurveyColumns = [
    {
      id: "patientName",
      header: "Patient",
      cell: (row: typeof mockPatientSurveys[0]) => (
        <div className="font-medium">{row.patientName}</div>
      ),
    },
    {
      id: "surveyTitle",
      header: "Survey",
      cell: (row: typeof mockPatientSurveys[0]) => (
        <div>{row.surveyTitle}</div>
      ),
    },
    {
      id: "status",
      header: "Status",
      cell: (row: typeof mockPatientSurveys[0]) => (
        <Badge
          className={
            row.status === "completed"
              ? "bg-green-100 text-green-800 hover:bg-green-100"
              : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
          }
        >
          {row.status}
        </Badge>
      ),
    },
    {
      id: "completedDate",
      header: "Completed Date",
      cell: (row: typeof mockPatientSurveys[0]) => (
        <div>
          {row.completedDate 
            ? new Date(row.completedDate).toLocaleDateString() 
            : "Pending"}
        </div>
      ),
    },
    {
      id: "score",
      header: "Score",
      cell: (row: typeof mockPatientSurveys[0]) => (
        <div>
          {row.score 
            ? (
              <div className="flex items-center">
                {row.score}
                <span className="text-xs text-muted-foreground ml-1">/5</span>
              </div>
            ) 
            : "N/A"}
        </div>
      ),
    },
  ];
  
  // Provider survey data
  const providerSurveys = mockProviders.flatMap(provider => 
    provider.surveys.map(survey => ({
      ...survey,
      providerName: provider.name,
      department: provider.specialty
    }))
  );
  
  // Define columns for provider surveys table
  const providerSurveyColumns = [
    {
      id: "providerName",
      header: "Provider",
      cell: (row: typeof providerSurveys[0]) => (
        <div className="font-medium">{row.providerName}</div>
      ),
    },
    {
      id: "department",
      header: "Department",
      cell: (row: typeof providerSurveys[0]) => (
        <div>{row.department}</div>
      ),
    },
    {
      id: "title",
      header: "Survey",
      cell: (row: typeof providerSurveys[0]) => (
        <div>{row.title}</div>
      ),
    },
    {
      id: "responseRate",
      header: "Response Rate",
      cell: (row: typeof providerSurveys[0]) => (
        <div>{row.responseRate}%</div>
      ),
    },
    {
      id: "averageScore",
      header: "Avg. Score",
      cell: (row: typeof providerSurveys[0]) => (
        <div className="flex items-center">
          {row.averageScore}
          <span className="text-xs text-muted-foreground ml-1">/5</span>
        </div>
      ),
    },
    {
      id: "date",
      header: "Date",
      cell: (row: typeof providerSurveys[0]) => (
        <div>{new Date(row.date).toLocaleDateString()}</div>
      ),
    },
  ];

  return (
    <MainLayout>
      <PageHeader 
        title="Surveys" 
        description="Manage and track survey data"
      >
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Survey
          </Button>
        </div>
      </PageHeader>
      
      <Tabs defaultValue="all" className="mt-6">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
          <TabsTrigger value="all">All Surveys</TabsTrigger>
          <TabsTrigger value="patients">Patient Tracking</TabsTrigger>
          <TabsTrigger value="providers">Provider Surveys</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <ChartCard 
            title="Survey Results" 
            description="List of all surveys and their results"
          >
            <DataTable 
              data={mockSurveys} 
              columns={surveyColumns} 
              searchPlaceholder="Search surveys..."
            />
          </ChartCard>
        </TabsContent>
        
        <TabsContent value="patients" className="mt-4">
          <ChartCard 
            title="Patient Survey Tracking" 
            description="Monitor individual patient survey completion"
          >
            <DataTable 
              data={mockPatientSurveys} 
              columns={patientSurveyColumns} 
              searchPlaceholder="Search patients..."
            />
          </ChartCard>
        </TabsContent>
        
        <TabsContent value="providers" className="mt-4">
          <ChartCard 
            title="Provider Survey Results" 
            description="Survey results by healthcare provider"
          >
            <DataTable 
              data={providerSurveys} 
              columns={providerSurveyColumns} 
              searchPlaceholder="Search providers or surveys..."
            />
          </ChartCard>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Surveys;
