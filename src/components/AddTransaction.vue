<template>
  <section id="form-block">
    <h3>Добавить сумму</h3>
    <form id="form" @submit.prevent="onSubmit">
        <div class="form-control">
            <label for="text">Введите основание:</label>
            <input type="text" id="text" v-model="transactionDescription" placeholder="Введите текст..." autocomplete="off">
        </div>
        <div class="form-control">
            <label for="amount">Введите сумму:</label>
            <input type="number" id="amount" v-model="transactionAmount" placeholder="Введите число..." autocomplete="off">
        </div>
        <div class="form-toggle">
              <div class="form-toggle-item item-1">
                <input id="income" type="radio" name="radio" value="income" v-model="transactionType">
                <label for="income">Приход</label>
              </div>
              <div class="form-toggle-item item-2">
                <input id="expense" type="radio" name="radio" value="expense" v-model="transactionType">
                <label for="expense">Расход</label>
              </div>
            </div>
        <button class="btn">Добавить</button>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

const transactionType = ref('income');

const transactionDescription = ref('');
const transactionAmount = ref('');
const emit = defineEmits(['transactionSubmit']);
const toastService = useToast('');

function onSubmit() {
  if (!transactionDescription.value || !transactionAmount.value) {
    toastService.error('Пожалуйста, заполните оба поля');
    return;
  }

  if (isNaN(transactionAmount.value)) {
    toastService.error('Пожалуйста, введите числовое значение');
    return;
  }

  let amount = parseFloat(transactionAmount.value);
  if (transactionType.value === 'expense') {
    amount = -amount;
  }

  const transactionData = {
    text: transactionDescription.value,
    amount: amount,
  };

  emit('transactionSubmit', transactionData);
  transactionDescription.value = '';
  transactionAmount.value = '';
}
</script>