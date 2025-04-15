
import { MainLayout } from "@/layouts/main-layout";
import { PageHeader } from "@/components/layout/page-header";
import { PDFViewer } from "@/components/ui/pdf-viewer";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Download, FileText, Filter, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockSamplePDFUrl } from "@/data/mockData";

const Assessments = () => {
  // Mock assessments data
  const assessments = [
    {
      id: "a1",
      title: "Patient Satisfaction Survey Template",
      type: "satisfaction",
      lastUpdated: "2025-03-12",
      status: "active",
      url: mockSamplePDFUrl,
    },
    {
      id: "a2",
      title: "Post-Surgical Care Assessment",
      type: "post-op",
      lastUpdated: "2025-03-01",
      status: "active",
      url: mockSamplePDFUrl,
    },
    {
      id: "a3",
      title: "Emergency Department Experience",
      type: "emergency",
      lastUpdated: "2025-02-15",
      status: "active",
      url: mockSamplePDFUrl,
    },
    {
      id: "a4",
      title: "Annual Health Questionnaire",
      type: "annual",
      lastUpdated: "2025-01-20",
      status: "archived",
      url: mockSamplePDFUrl,
    },
    {
      id: "a5",
      title: "Nursing Care Evaluation",
      type: "satisfaction",
      lastUpdated: "2025-01-10",
      status: "draft",
      url: mockSamplePDFUrl,
    },
  ];
  
  // Define columns for assessments table
  const columns = [
    {
      id: "title",
      header: "Assessment",
      cell: (row: typeof assessments[0]) => (
        <div className="font-medium">{row.title}</div>
      ),
    },
    {
      id: "type",
      header: "Type",
      cell: (row: typeof assessments[0]) => (
        <Badge variant="outline" className="capitalize">
          {row.type}
        </Badge>
      ),
    },
    {
      id: "lastUpdated",
      header: "Last Updated",
      cell: (row: typeof assessments[0]) => (
        <div>{new Date(row.lastUpdated).toLocaleDateString()}</div>
      ),
    },
    {
      id: "status",
      header: "Status",
      cell: (row: typeof assessments[0]) => (
        <Badge
          className={
            row.status === "active"
              ? "bg-green-100 text-green-800 hover:bg-green-100"
              : row.status === "draft"
              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
              : "bg-gray-100 text-gray-800 hover:bg-gray-100"
          }
        >
          {row.status}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: (row: typeof assessments[0]) => (
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <a href={row.url} target="_blank" rel="noopener noreferrer">
              <FileText className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="ghost" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];
  
  // Selected assessment for viewing
  const selectedAssessment = assessments[0];

  return (
    <MainLayout>
      <PageHeader 
        title="Assessments" 
        description="View and manage survey assessments"
      >
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Assessment
          </Button>
        </div>
      </PageHeader>
      
      <Tabs defaultValue="library" className="mt-6">
        <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex">
          <TabsTrigger value="library">Assessment Library</TabsTrigger>
          <TabsTrigger value="viewer">PDF Viewer</TabsTrigger>
        </TabsList>
        
        <TabsContent value="library" className="mt-4">
          <DataTable 
            data={assessments} 
            columns={columns} 
            searchPlaceholder="Search assessments..."
          />
        </TabsContent>
        
        <TabsContent value="viewer" className="mt-4">
          <PDFViewer 
            url={selectedAssessment.url}
            title={selectedAssessment.title}
            description={`Last updated: ${new Date(selectedAssessment.lastUpdated).toLocaleDateString()}`}
          />
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Assessments;
