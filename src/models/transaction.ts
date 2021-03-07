export interface Transaction {
  id: Number;
  wallet: Number;
  category: string;
  amount: string;
  date: string;
  note: string;
}

export function toTransaction(transaction: object): Transaction {
  return transaction as Transaction;
}
