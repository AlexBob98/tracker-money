<template>
  <section id="history-money">
  <h3>История </h3>
  <ul id="list" class="list">
    <li
      v-for="transaction in paginatedTransactions"
      :key="transaction.id"
      :class="transaction.amount < 0 ? 'minus' : 'plus'"
    >
      {{ transaction.text }}<span>{{ transaction.amount }}₽</span
      ><button class="delete-btn" @click="deleteTransaction(transaction.id)">x</button>
    </li>
  </ul>
  <div v-if="transactions.length > 0" class="page-container">
    <div v-if="transactions.length > 10" class="list-btns">
      <button class="btn" @click="prevPage"> - </button>
      <button class="btn" @click="nextPage"> + </button>
    </div>
    <p v-if="transactions.length > 10" > Страница: {{ currentPage }} из {{ totalPages }}</p>
  </div>
  <div v-else>
    <p style="margin: 0;">Пусто</p>
  </div>
</section>
</template>

<script setup>
import { defineProps, ref, computed } from 'vue';
const currentPage = ref(1);
const pageSize = ref(10);

const paginatedTransactions = computed(() => {
  return props.transactions.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  );
});

const totalPages = computed(() => {
  return Math.ceil(props.transactions.length / pageSize.value);
});

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}
const emit = defineEmits(['transactionDeleted']);
const props = defineProps({
    transactions: {
        type: Array,
        required: true,
    }
});

const deleteTransaction = (id) => {
    emit('transactionDeleted', id)
}
</script>