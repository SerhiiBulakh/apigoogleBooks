<template>
  <div>

    <div 
      class="card" 
      style="width: 18rem;" 
      v-for='(book, index) in this.$store.state.orderBooks'
      :key='index'
      >
      <img class="card-img-top" :src='book.book.img'  alt="Card image cap">
      <div class="card-body">
        <h5> {{book.book.price ? `Цена ${book.book.price.amount}${book.book.price.currencyCode}` : 'Нету в наличии'}} </h5>
        <p class="card-text">{{book.book.description}}</p>
      </div>
    </div>

    <button @click='buyBooks'>Заказать</button>
  </div>

 
  
  
</template>

<script>
export default {
  name: 'Basket',
  methods: {
    buyBooks() {
      this.$store.dispatch('deleteBooksFromBasket')
      this.$router.push('/')
      setTimeout(()=>{
        this.$store.dispatch('deletePrice')
      }, 5000)
    }
  },
}
</script>

<style scoped>
  
</style>
