import { useState } from 'react';
import { AdminLayout } from '@/layouts/AdminLayout';
import { StatsCard } from '@/components/admin/StatsCard';
import { QueryTable } from '@/components/admin/QueryTable';
import { QueryDetailModal } from '@/components/admin/QueryDetailModal';
import { mockQueries } from '@/data/mockQueries';
import { QuerySubmission } from '@/types/query';
import { MessageSquare, Users, Clock, CheckCircle } from 'lucide-react';

const Index = () => {
  const [selectedQuery, setSelectedQuery] = useState<QuerySubmission | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleViewDetails = (query: QuerySubmission) => {
    setSelectedQuery(query);
    setModalOpen(true);
  };

  // Calculate stats
  const totalQueries = mockQueries.length;
  const newQueries = mockQueries.filter(q => q.status === 'new').length;
  const inProgressQueries = mockQueries.filter(q => q.status === 'in-progress').length;
  const resolvedQueries = mockQueries.filter(q => q.status === 'resolved').length;

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
            trend={{ value: 12, isPositive: true }}
            variant="primary"
          />
          <StatsCard
            title="New Queries"
            value={newQueries}
            icon={Users}
            variant="default"
          />
          <StatsCard
            title="In Progress"
            value={inProgressQueries}
            icon={Clock}
            variant="warning"
          />
          <StatsCard
            title="Resolved"
            value={resolvedQueries}
            icon={CheckCircle}
            trend={{ value: 8, isPositive: true }}
            variant="success"
          />
        </div>

        {/* Recent Queries Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Recent Queries</h2>
          </div>
          <QueryTable queries={mockQueries} onViewDetails={handleViewDetails} />
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
