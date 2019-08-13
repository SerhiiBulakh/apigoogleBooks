<template>
<div>
  <div>
    <div 
      class="card" 
      style="width: 18rem;" 
      v-for='(book, index) in this.$store.state.listBooks'
      :key='index'
      >
      <img class="card-img-top" :src='book.volumeInfo.imageLinks.smallThumbnail'  alt="Card image cap">
      <div class="card-body">
        <h2> {{book.volumeInfo.title}} </h2>
        <h5 class="card-title" v-for='author in book.volumeInfo.authors'>{{author}}</h5>

        <button class="btn btn-primary" @click="order(book)">Заказать</button>
      </div>
    </div>
  </div>

  

  <OrderBookModal v-if="showModal" @close="showModal = false" />
</div>  
</template>

<script>
import OrderBookModal from './OrderBookModal';
export default {
  name: 'ListBooks',
  components:{OrderBookModal},
  data() {
    return {
       showModal: false
    }
   
  },
   methods: {
    order (book) {
     this.$store.dispatch('orderBook', book)
      this.showModal = true;
    }
  }
}
</script>

<style scoped>

</style>
