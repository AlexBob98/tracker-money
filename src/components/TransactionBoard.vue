<template>
    <Balance :total="total" />
    <Income :income="+income" :expense="+expense" />
    <Transaction
      :transactions="transactions"
      @transaction-deleted="handleDeleteds"
    />
    <div>
        <AddTransaction @transaction-submit="handleTransactions" />
    </div>
</template>

<script setup>
import Balance from "./Balance.vue";
import Income from "./Income.vue";
import Transaction from "./Transaction.vue";
import AddTransaction from "./AddTransaction.vue";
import { ref, computed, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { handleDeleted, handleTransaction } from "../utils/transactionUtils";

const toast = useToast();
const transactions = ref([]);

onMounted(() => {
  const saveToLocal = JSON.parse(localStorage.getItem("transactions"));
  if (saveToLocal) {
    transactions.value = saveToLocal;
  }
});

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

const handleTransactions = (transactionData) => {
  transactions.value = handleTransaction(transactions.value, transactionData);
  saveTransactionInLocal();

  toast.success(`Добавлено: ${transactionData.amount}`);
};

const handleDeleteds = (id) => {
  transactions.value = handleDeleted(transactions.value, id);
  saveTransactionInLocal();
  toast.success("Удалено");
};
const saveTransactionInLocal = () => {
  localStorage.setItem("transactions", JSON.stringify(transactions.value));
};

</script>
