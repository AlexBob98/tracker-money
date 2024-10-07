<template>
  <Balance :total="total" />
  <Income :income="+income" :expense="+expense" />
  <Transaction
    :transactions="transactions"
    @transaction-deleted="handleDelete"
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
import { onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useTransactionStore } from "../stores/store";
import { storeToRefs } from "pinia";

const storeTransactions = useTransactionStore();
const { transactions, total, income, expense } = storeToRefs(storeTransactions);
const toast = useToast();

onMounted(() => {
  storeTransactions.loadFromLocalStorage();
});

function handleTransactions(transactionData) {
  storeTransactions.addTransactions(transactionData);
  toast.success(`Добавлено: ${transactionData.amount}`);
}

function handleDelete(id) {
  storeTransactions.transactionsDelete(id);
  toast.success("Удалено");
}
</script>
