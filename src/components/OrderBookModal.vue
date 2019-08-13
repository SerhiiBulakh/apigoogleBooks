<template>
     <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <div class="modal-header">
                        <slot name="header">
                            Заказать
                        </slot>
                    </div>

                    <div class="modal-body">
                        <slot name="body">
                            <img :src='$store.state.orderBook.img' />
                        <div> 
                            {{$store.state.orderBook.description}}
                        </div>
                        </slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">
                            <div class='footer-form'>
                                <div class="form-group">
                                    <label>Ваше Имя</label>
                                    <input
                                        class="form-control"
                                        type="text"
                                        v-model="person.name"
                                    >
                                </div>
                                <div class="form-group">
                                    <label>Ваш Email</label>
                                    <input
                                        class="form-control"
                                        type="email"
                                        v-model="person.email"
                                    >
                                </div>
                                <div class="form-group">
                                    <label>Ваш номер телефона</label>
                                    <input
                                        class="form-control"
                                        type="text"
                                        v-model="person.phone"
                                    >
                                </div>
                                <button :disabled="disabledButton()"
                                        class="btn btn-primary"
                                        @click="addOrder">Заказать</button>
                            </div>
                            <p v-if="errors.length" >
                                <ul>
                                    <li v-for="error in errors">{{ error }}</li>
                                </ul>
                            </p>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
  name: 'OrderBookModal',
  data() {
    return {
        person: {
                name: '',
                phone: '',
                email: ''
            },
        errors:[]
    }
   
  },
   methods: {
        addOrder(){
                let { phone, name, email } = this.person;
                if(this.validateFields(name, email, phone)) {
                    const book = {
                        person: {
                            name,
                            email,
                            phone
                        },
                        book: this.$store.state.orderBook
                    }
                    this.$store.dispatch('buyBooks', book)
                    this.cleanFields()
                    this.$emit('close')
                }
               
            },
           
        validateFields(name, email, phone) {
                this.errors = [];
                if (name.length < 2){
                        this.errors.push('Заголовок должен быть не меньше двух символов');
                }
                if(!this.validatePhone(phone)) {
                    this.errors.push('Номер телефона не валидный');
                }
                if(!this.validEmail(email)) {
                    this.errors.push('Email не валидный');
                }
                if (!this.errors.length) {
                    return true;
                }
            },
            validEmail (email) {
                console.log(email)
                 const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
            validatePhone(phone) {
                const re = /^\+380\d{3}\d{2}\d{2}\d{2}$/;
                return re.test(phone);
            },
            disabledButton(bool = true) {
                if(this.person.name.length && this.person.phone.length && this.person.email.length) return false
                return true
            },  
               cleanFields() {
                this.person.name = ''
                this.person.phone = ''
                this.person.email = ''
            }
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.footer-form{
    float:left;
}
.modal-footer{
    justify-content:flex-start
}

.modal-container {
  width: 700px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
  height: 300px;
  overflow: hidden;
}

.modal-default-button {
  float: right;
}



.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>