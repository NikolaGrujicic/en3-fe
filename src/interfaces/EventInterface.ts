export interface Event {
  id: number;
  owner_addr: string | null;
  contract_addr: string;
  description: string;
  name: string;
  start_date: string; // You might want to use Date instead of string if you parse the dates
  end_date: string; // You might want to use Date instead of string if you parse the dates
  location: string;
  capacity: number;
  price: string; // You might want to use number instead of string if price is always a number
  donation_addr: string;
  image: string;
  donation_percentage: string; // You might want to use number instead of string if percentage is always a number
}