import { useState } from 'react';
import { AdminLayout } from '@/layouts/AdminLayout';
import { QueryTable } from '@/components/admin/QueryTable';
import { QueryDetailModal } from '@/components/admin/QueryDetailModal';
import { mockQueries } from '@/data/mockQueries';
import { QuerySubmission } from '@/types/query';

const Queries = () => {
  const [selectedQuery, setSelectedQuery] = useState<QuerySubmission | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleViewDetails = (query: QuerySubmission) => {
    setSelectedQuery(query);
    setModalOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">All Queries</h1>
          <p className="mt-1 text-muted-foreground">
            View and manage all customer submissions
          </p>
        </div>

        <QueryTable queries={mockQueries} onViewDetails={handleViewDetails} />

        <QueryDetailModal
          query={selectedQuery}
          open={modalOpen}
          onOpenChange={setModalOpen}
        />
      </div>
    </AdminLayout>
  );
};

export default Queries;
