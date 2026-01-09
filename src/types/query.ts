export interface QuerySubmission {
  id: string;
  name: string;
  contactNo: string;
  email: string;
  customerType: 'individual' | 'business' | 'enterprise' | 'government';
  city: string;
  message: string;
}

export type CustomerType = QuerySubmission['customerType'];
