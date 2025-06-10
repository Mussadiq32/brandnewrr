@@ -1,290 +1,309 @@

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  FileUp, 
  Download, 
  Trash2, 
  FileText, 
  FilePdf, 
  FileImage, 
  File, 
import {
  Upload,
  FileText,
  Download,
  Trash2,
  Search,
  Filter,
  Eye,
  Edit,
  Share2,
  Lock 
  Clock,
  CheckCircle,
  AlertCircle,
  FileImage
} from 'lucide-react';

type Document = {
interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: Date;
  status: 'Uploaded' | 'Shared' | 'Signed' | 'Pending';
};
  size: number;
  uploadDate: string;
  status: 'uploaded' | 'processing' | 'approved' | 'rejected';
  category: string;
  propertyId?: string;
  url?: string;
}

const DocumentManagement = () => {
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Property Brochure.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadDate: new Date(2023, 4, 15),
      status: 'Uploaded'
      name: 'Property_Title_Deed.pdf',
      type: 'application/pdf',
      size: 2048000,
      uploadDate: '2024-01-15',
      status: 'approved',
      category: 'Legal Documents',
      propertyId: 'prop_001',
    },
    {
      id: '2',
      name: 'Purchase Agreement.docx',
      type: 'docx',
      size: '560 KB',
      uploadDate: new Date(2023, 4, 20),
      status: 'Signed'
      name: 'Floor_Plan.jpg',
      type: 'image/jpeg',
      size: 1024000,
      uploadDate: '2024-01-14',
      status: 'processing',
      category: 'Floor Plans',
      propertyId: 'prop_001',
    },
    {
      id: '3',
      name: 'Floor Plan.jpg',
      type: 'jpg',
      size: '1.2 MB',
      uploadDate: new Date(2023, 4, 25),
      status: 'Shared'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const categories = [
    'Legal Documents',
    'Floor Plans',
    'Property Photos',
    'Inspection Reports',
    'Financial Documents',
    'Insurance Papers',
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return <FileText className="h-4 w-4" />;
    if (type.includes('image')) return <FileImage className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'rejected':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    

    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      const newDocs: Document[] = Array.from(files).map((file) => ({
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
        name: file.name,
        type: file.name.split('.').pop() || 'unknown',
        size: formatFileSize(file.size),
        uploadDate: new Date(),
        status: 'Uploaded'
      }));
      
      setDocuments((prev) => [...prev, ...newDocs]);
      setIsUploading(false);
      
      toast({
        title: "Upload Complete",
        description: `${files.length} document${files.length === 1 ? '' : 's'} uploaded successfully.`
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // Add new documents
          Array.from(files).forEach((file) => {
            const newDoc: Document = {
              id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
              name: file.name,
              type: file.type,
              size: file.size,
              uploadDate: new Date().toISOString().split('T')[0],
              status: 'processing',
              category: 'Property Photos',
            };
            setDocuments((prev) => [...prev, newDoc]);
          });

          toast({
            title: "Upload Successful",
            description: `${files.length} file(s) uploaded successfully`,
          });

          return 100;
        }
        return prev + 10;
      });
      
      // Reset the input
      e.target.value = '';
    }, 1500);
    }, 100);
  };

  const handleDelete = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    
  const handleDeleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    toast({
      title: "Document Deleted",
      description: "The document has been removed."
      description: "Document has been removed successfully",
    });
  };

  const handleDownload = (doc: Document) => {
  const handleStatusChange = (id: string, newStatus: Document['status']) => {
    setDocuments((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, status: newStatus } : doc))
    );
    toast({
      title: "Download Started",
      description: `${doc.name} is downloading.`
      title: "Status Updated",
      description: `Document status changed to ${newStatus}`,
    });
  };

  const handleShare = (doc: Document) => {
    // Simulate sharing process
    toast({
      title: "Share Options",
      description: `Share options for ${doc.name} opened.`
    });
  };
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    switch(type.toLowerCase()) {
      case 'pdf':
        return <FilePdf />;
      case 'doc':
      case 'docx':
        return <FileText />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <FileImage />;
      default:
        return <File />;
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Document Management</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Upload, organize, and manage property documents
          </p>
        </div>

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
        {/* Upload Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="file-upload">Select Files</Label>
                <Input
                  id="file-upload"
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                />
              </div>
              
              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2" /> Document Management
        </CardTitle>
        <CardDescription>
          Upload, store, and share your property documents securely
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <label 
            htmlFor="file-upload" 
            className="flex items-center justify-center w-full p-6 border-2 border-dashed border-muted-foreground/20 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
          >
            <div className="flex flex-col items-center justify-center">
              <FileUp className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="mb-1 text-sm font-medium">
                {isUploading ? "Uploading..." : "Click to upload or drag and drop"}
              </p>
              <p className="text-xs text-muted-foreground">
                PDF, DOCX, JPG, PNG (MAX. 10MB)
              </p>
        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="md:w-48">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <Input 
              id="file-upload" 
              type="file" 
              multiple 
              className="hidden" 
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </label>
        </div>
          </CardContent>
        </Card>

        {documents.length > 0 ? (
          <Table>
            <TableCaption>A list of your documents</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((document) => (
                <TableRow key={document.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      {getFileIcon(document.type)}
                      <span className="ml-2">{document.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground ml-6">
                      {document.size}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {document.status === 'Signed' && (
                        <span className="flex items-center text-green-500">
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Signed
                        </span>
                      )}
                      {document.status === 'Shared' && (
                        <span className="flex items-center text-blue-500">
                          <Share2 className="h-4 w-4 mr-1" />
                          Shared
                        </span>
                      )}
                      {document.status === 'Uploaded' && (
                        <span className="flex items-center text-gray-500">
                          <Lock className="h-4 w-4 mr-1" />
                          Secure
                        </span>
                      )}
                      {document.status === 'Pending' && (
                        <span className="flex items-center text-amber-500">
                          <Clock className="h-4 w-4 mr-1" />
                          Pending
                        </span>
                      )}
        {/* Documents List */}
        <Card>
          <CardHeader>
            <CardTitle>Documents ({filteredDocuments.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="flex items-center gap-4">
                    {getFileIcon(doc.type)}
                    
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{doc.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>{formatFileSize(doc.size)}</span>
                        <span>{doc.uploadDate}</span>
                        <Badge variant="outline">{doc.category}</Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(document.uploadDate)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <Button variant="ghost" size="icon" onClick={() => handleDownload(document)}>
                  </div>

                  <div className="flex items-center gap-2">
                    {getStatusIcon(doc.status)}
                    <Badge 
                      variant={doc.status === 'approved' ? 'default' : 'secondary'}
                    >
                      {doc.status}
                    </Badge>
                    
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleShare(document)}>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(document.id)}>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteDocument(doc.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                  </div>
                </div>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-10">
            <FileText className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No documents uploaded yet.</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
        <p className="text-sm text-muted-foreground">
          {documents.length} document(s)
        </p>
        <label htmlFor="file-upload">
          <Button variant="outline" className="cursor-pointer">
            <FileUp className="mr-2 h-4 w-4" />
            Upload New
            <Input
              id="file-upload"
              type="file"
              className="hidden"
              multiple
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </Button>
        </label>
      </CardFooter>
    </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};