<template>
  <div class="home">
    <Form />
    <ListBooks />
  </div>
</template>

<script>
// @ is an alias to /src
import ListBooks from '@/components/ListBooks.vue';
import Form from '@/components/Form.vue';

export default {
  name: 'home',
  components: {
    ListBooks,
    Form
  }
}
</script>
