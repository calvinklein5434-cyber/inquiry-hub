import { QuerySubmission } from '@/types/query';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, User, Calendar, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

interface QueryDetailModalProps {
  query: QuerySubmission | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusStyles = {
  new: 'bg-info/10 text-info border-info/20',
  'in-progress': 'bg-warning/10 text-warning border-warning/20',
  resolved: 'bg-success/10 text-success border-success/20',
};

const customerTypeLabels = {
  individual: 'Individual',
  business: 'Business',
  enterprise: 'Enterprise',
  government: 'Government',
};

export function QueryDetailModal({ query, open, onOpenChange }: QueryDetailModalProps) {
  if (!query) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Query Details</span>
            <Badge className={statusStyles[query.status]} variant="outline">
              {query.status === 'in-progress' ? 'In Progress' : query.status.charAt(0).toUpperCase() + query.status.slice(1)}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Contact Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{query.name}</p>
                <Badge variant="outline" className="mt-1 font-normal">
                  {customerTypeLabels[query.customerType]}
                </Badge>
              </div>
            </div>

            <div className="grid gap-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${query.email}`} className="text-primary hover:underline">
                  {query.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{query.contactNo}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{query.city}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {format(query.createdAt, 'MMMM d, yyyy \'at\' h:mm a')}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Message */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <MessageSquare className="h-4 w-4" />
              Message
            </div>
            <p className="rounded-lg bg-muted/50 p-4 text-sm leading-relaxed text-foreground">
              {query.message}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button className="flex-1" variant="outline">
              Mark as In Progress
            </Button>
            <Button className="flex-1">
              Mark as Resolved
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
