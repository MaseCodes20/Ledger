import { Timestamp } from "firebase/firestore";

export interface Goal {
  id: string;
  userID: string;
  email: string;
  goal: string;   
  amount: number;      
  savedMoney: number; 
  timestamp: Timestamp; 
}

// For your incomes and expenses
export interface Transaction {
  id: string;
  userID: string;
  email: string;
  amount: number;
  name: string;    
  timestamp: Timestamp;
  [key: string]: any; 
}