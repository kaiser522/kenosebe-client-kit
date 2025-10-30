export type Role = 'ADMIN' | 'USER';

export interface Organization {
  id: number;
  name: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  username: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  role: Role;
  organization?: Organization | number | null;
  created_at: string;
  updated_at: string;
}

export interface Report {
  id: number;
  date: string;
  cards_sold: number;
  starting_jackpot: number;
  ending_jackpot: number;
  loyalty_payout: number;
  charity_payout: number;
  winner: string;
  organization: number | Organization;
  created_at: string;
  updated_at: string;
}

export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
