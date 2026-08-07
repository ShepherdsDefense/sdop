export interface Church {
  id: string;
  church_name: string;
  denomination: string | null;
  address: string | null;
  city: string | null;
  county: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  status: string;
  priority: string;
  notes: string | null;
  created_at: string;
}