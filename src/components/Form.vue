<template>
<div>
  <p>{{$store.state.completed ? `Ваш заказ на сумму ${$store.state.totalCost.price} успешно оформлен` : ''}}</p>
  <div class="form-group">
    <label>Поиск книг</label>
    <input v-model='inputVal' type="text" class="form-control"  placeholder="Write book's name">
  </div>
  <button class="btn btn-primary" @click='getBooks(inputVal)'>Поиск</button>

</div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'Form',
  data() {
    return {
      inputVal: ''
    }
  },
  methods: {
    ...mapActions([
      'getBooks'
    ])
  },
}
</script>

<style scoped>

</style>
