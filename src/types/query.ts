export interface QuerySubmission {
  id: string;
  name: string;
  contactNo: string;
  email: string;
  customerType: 'individual' | 'business' | 'enterprise' | 'government';
  city: string;
  message: string;
  createdAt: Date;
  status: 'new' | 'in-progress' | 'resolved';
}

export type CustomerType = QuerySubmission['customerType'];
export type QueryStatus = QuerySubmission['status'];
