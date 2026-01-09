import { AdminLayout } from '@/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockQueries } from '@/data/mockQueries';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Mail, Phone, MapPin } from 'lucide-react';

const customerTypeColors = {
  individual: 'bg-muted text-muted-foreground',
  business: 'bg-primary/10 text-primary',
  enterprise: 'bg-info/10 text-info',
  government: 'bg-success/10 text-success',
};

const Customers = () => {
  // Get unique customers based on email
  const uniqueCustomers = mockQueries.reduce((acc, query) => {
    if (!acc.find(q => q.email === query.email)) {
      acc.push(query);
    }
    return acc;
  }, [] as typeof mockQueries);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Customers</h1>
          <p className="mt-1 text-muted-foreground">
            View all customers who have submitted queries
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {uniqueCustomers.map((customer) => (
            <Card key={customer.id} className="shadow-card transition-all hover:shadow-elevated">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {customer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <CardTitle className="text-base">{customer.name}</CardTitle>
                    <Badge 
                      variant="secondary" 
                      className={customerTypeColors[customer.customerType]}
                    >
                      {customer.customerType.charAt(0).toUpperCase() + customer.customerType.slice(1)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{customer.contactNo}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{customer.city}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Customers;
