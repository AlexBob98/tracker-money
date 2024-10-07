<template>
  <section id="balance-block">
    <h4>Ваш баланс</h4>
    <h1 id="balance">{{ total }}₽</h1>
  </section>
</template>

<script setup>
import { useTransactionStore } from '../stores/store';
import { storeToRefs } from 'pinia';
const transactionStore = useTransactionStore();

const { total } = storeToRefs(transactionStore);

</script>