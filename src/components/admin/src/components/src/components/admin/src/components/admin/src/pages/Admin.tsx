@@ -4,8 +4,8 @@ import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PropertyForm from '@/components/admin/PropertyForm';
import PropertyList from '@/components/admin/PropertyList';
import PropertyManagement from '@/components/admin/PropertyManagement';
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';
import RecentlyListedProperties from '@/components/admin/RecentlyListedProperties';

const Admin = () => {
@@ -55,14 +55,14 @@ const Admin = () => {
  }

  return (
    <div className="min-h-screen bg-royal-50/50 py-12">
    <div className="min-h-screen bg-royal-50/50 dark:bg-royal-900 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-display font-bold text-royal-800">
          <h1 className="text-3xl font-display font-bold text-royal-800 dark:text-royal-200">
            Admin <span className="text-gradient">Dashboard</span>
          </h1>
          <p className="text-royal-600 mt-2">
            Manage your property listings here
          <p className="text-royal-600 dark:text-royal-300 mt-2">
            Comprehensive property management and analytics platform
          </p>
        </div>

@@ -71,19 +71,19 @@ const Admin = () => {
          <RecentlyListedProperties />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="bg-white dark:bg-royal-800 rounded-lg shadow-lg p-6">
          <Tabs defaultValue="properties" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="add">Add New Property</TabsTrigger>
            <TabsList className="mb-6 w-full md:w-auto">
              <TabsTrigger value="properties">Property Management</TabsTrigger>
              <TabsTrigger value="analytics">Analytics Dashboard</TabsTrigger>
            </TabsList>

            <TabsContent value="properties">
              <PropertyList />
              <PropertyManagement />
            </TabsContent>

            <TabsContent value="add">
              <PropertyForm />
            <TabsContent value="analytics">
              <AnalyticsDashboard />
            </TabsContent>
          </Tabs>
        </div>