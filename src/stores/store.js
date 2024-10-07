import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useTransactionStore = defineStore("transactionStore", () => {
  const transactions = ref([]);

  const addTransactions = (obj) => {
    transactions.value.push({ ...obj, id: Math.floor(Math.random() * 10000) });
    saveToLocalStorage(transactions.value);
  };

  const transactionsDelete = (id) => {
    transactions.value = transactions.value.filter((transaction) => transaction.id !== id);
    saveToLocalStorage(transactions.value);
  };

  const total = computed(() => {
    return transactions.value.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);
  });

  const income = computed(() => {
    return transactions.value
      .filter((transaction) => transaction.amount > 0)
      .reduce((acc, transaction) => {
        return acc + transaction.amount;
      }, 0)
      .toFixed(2);
  });

  const expense = computed(() => {
    return transactions.value
      .filter((transaction) => transaction.amount < 0)
      .reduce((acc, transaction) => {
        return acc + transaction.amount;
      }, 0)
      .toFixed(2);
  });

  const saveToLocalStorage = (state) => {
    localStorage.setItem("MyStateTest", JSON.stringify(state));
  };

  const loadFromLocalStorage = () => {
    const storedTransactions = localStorage.getItem("MyStateTest");
    if (storedTransactions) {
      transactions.value = JSON.parse(storedTransactions);
    }
  };

  return {
    total,
    income,
    expense,
    transactions,
    loadFromLocalStorage,
    addTransactions,
    transactionsDelete,
  };
});
