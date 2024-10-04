<template>
  <section id="balance-block">
    <h4>Ваш баланс</h4>
    <h1 id="balance">{{ total }}₽</h1>
  </section>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      required: true,
    },
  },
};
</script>
