import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listBooks: [],
    orderBook: {
      id:'',
      price: {
        amount: '',
        currencyCode:''
      },
      img: '',
      description: ''
    },
    orderBooks:[],
    totalCost: {
      price: '',
      count: ''
    },
    completed: false
    
    
  },
  mutations: {
    getBooks(state, payload) {
      state.listBooks = [...payload.items]
    },
    addBookToOrder(state, payload) {
      state.orderBook = payload
    },
    addBookToBasket(state, payload) {
      let price = 0;
      state.orderBooks.push(payload)
      state.orderBooks.map(book => {
        if(book.book.price) {
          price += book.book.price.amount
        }
      })
      state.totalCost = {
        price,
        count:state.orderBooks.length
      }
    },
    deleteBooksFromBasket(state) {
      state.orderBooks = []
      state.completed = true
    },
    deletePrice(state) {
      state.totalCost = {},
      state.completed = false
    }
  },
  actions: {
    getBooks({commit}, value) {
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${value}`)
      .then(response => response.json())
      .then(json => commit('getBooks', json))
      .catch(err => console.log(err))
    },
    orderBook({commit}, book) {
      
      const infoBook = {
        id: book.id,
        price: book.saleInfo.listPrice,
        img: book.volumeInfo.imageLinks.smallThumbnail,
        description: book.volumeInfo.description
      }
      commit('addBookToOrder', infoBook)

    },
    buyBooks({commit}, book) {
      commit('addBookToBasket', book)
    },
    deleteBooksFromBasket({commit}) {
      commit('deleteBooksFromBasket')
    },
    deletePrice({commit}) {
      commit('deletePrice')
    }
  }
})
