
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface PDFViewerProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
}

export function PDFViewer({ url, title, description, className }: PDFViewerProps) {
  const [zoom, setZoom] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  
  const handleZoomIn = () => {
    if (zoom < 2) setZoom(zoom + 0.1);
  };
  
  const handleZoomOut = () => {
    if (zoom > 0.5) setZoom(zoom - 0.1);
  };
  
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  
  const handleDownload = () => {
    window.open(url, '_blank');
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          {description && (
            <CardDescription>{description}</CardDescription>
          )}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={handleZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleDownload}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded border border-border p-1 bg-muted/30 mb-2">
          <iframe 
            src={`${url}#page=${currentPage}`} 
            className="w-full h-[600px] transition-transform duration-200" 
            style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}
          />
        </div>
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>
          <span className="text-sm text-muted-foreground">Page {currentPage}</span>
          <Button variant="outline" size="sm" onClick={handleNextPage}>
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
