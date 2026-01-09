import { useState } from 'react';
import { AdminLayout } from '@/layouts/AdminLayout';
import { StatsCard } from '@/components/admin/StatsCard';
import { QueryTable } from '@/components/admin/QueryTable';
import { QueryDetailModal } from '@/components/admin/QueryDetailModal';
import { QuerySubmission } from '@/types/query';
import { MessageSquare, Building2, User, Briefcase } from 'lucide-react';

const Index = () => {
  const [queries] = useState<QuerySubmission[]>([]);
  const [selectedQuery, setSelectedQuery] = useState<QuerySubmission | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleViewDetails = (query: QuerySubmission) => {
    setSelectedQuery(query);
    setModalOpen(true);
  };

  // Calculate stats by customer type
  const totalQueries = queries.length;
  const individualQueries = queries.filter(q => q.customerType === 'individual').length;
  const businessQueries = queries.filter(q => q.customerType === 'business').length;
  const enterpriseQueries = queries.filter(q => q.customerType === 'enterprise').length;

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Manage and respond to customer queries
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Queries"
            value={totalQueries}
            icon={MessageSquare}
            variant="primary"
          />
          <StatsCard
            title="Individual"
            value={individualQueries}
            icon={User}
            variant="default"
          />
          <StatsCard
            title="Business"
            value={businessQueries}
            icon={Briefcase}
            variant="warning"
          />
          <StatsCard
            title="Enterprise"
            value={enterpriseQueries}
            icon={Building2}
            variant="success"
          />
        </div>

        {/* Recent Queries Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Recent Queries</h2>
          </div>
          <QueryTable queries={queries} onViewDetails={handleViewDetails} />
        </div>
      </div>

      {/* Query Detail Modal */}
      <QueryDetailModal
        query={selectedQuery}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </AdminLayout>
  );
};

export default Index;
