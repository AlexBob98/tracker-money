import { generateUniqueID } from "./uniqueId";

export function handleDeleted(transactions, id) {
  return transactions.filter((transaction) => transaction.id !== id);
};

export function handleTransaction(transactions, transactionData) {
  const newTransaction = {
    id: generateUniqueID(),
    text: transactionData.text,
    amount: transactionData.amount,
  };
  transactions.push(newTransaction);
  return transactions;
}
