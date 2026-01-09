import { useState } from 'react';
import { QuerySubmission } from '@/types/query';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Eye, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface QueryTableProps {
  queries: QuerySubmission[];
  onViewDetails: (query: QuerySubmission) => void;
}

const customerTypeLabels = {
  individual: 'Individual',
  business: 'Business',
  enterprise: 'Enterprise',
  government: 'Government',
};

export function QueryTable({ queries, onViewDetails }: QueryTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [customerTypeFilter, setCustomerTypeFilter] = useState<string>('all');

  const filteredQueries = queries.filter((query) => {
    const matchesSearch =
      query.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCustomerType = customerTypeFilter === 'all' || query.customerType === customerTypeFilter;

    return matchesSearch && matchesCustomerType;
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-3">
          <Select value={customerTypeFilter} onValueChange={setCustomerTypeFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Customer Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="individual">Individual</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="enterprise">Enterprise</SelectItem>
              <SelectItem value="government">Government</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card shadow-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Contact</TableHead>
              <TableHead className="font-semibold">Customer Type</TableHead>
              <TableHead className="font-semibold">City</TableHead>
              <TableHead className="font-semibold">Message</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredQueries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No queries found.
                </TableCell>
              </TableRow>
            ) : (
              filteredQueries.map((query) => (
                <TableRow key={query.id} className="animate-fade-in">
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{query.name}</p>
                      <p className="text-sm text-muted-foreground">{query.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{query.contactNo}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal">
                      {customerTypeLabels[query.customerType]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{query.city}</TableCell>
                  <TableCell className="max-w-[200px] truncate text-muted-foreground">
                    {query.message}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onViewDetails(query)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        Showing {filteredQueries.length} of {queries.length} queries
      </p>
    </div>
  );
}
