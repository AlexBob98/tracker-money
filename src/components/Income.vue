<template>
    <section class="inc-exp-container" id="container-money">
        <div>
            <h4>Поступление</h4>
            <p id="money-plus" class="money plus">{{income}}₽ </p>
        </div>
        <div>
            <h4>Расходы</h4>
            <p id="money-minus" class="money minus">{{expense}}₽ </p>
        </div>
    </section>
</template>

<script setup>
import { useTransactionStore } from '../stores/store';
import { storeToRefs } from 'pinia';
const transactionStore = useTransactionStore();

const {income, expense} = storeToRefs(transactionStore);
</script>