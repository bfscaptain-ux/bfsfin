export interface CallbackRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  loanType: string;
  loanSubType: string;
  message: string;
  status: 'New' | 'Contacted' | 'Closed';
  date: string;
}
