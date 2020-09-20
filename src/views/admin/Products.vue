<template>
  <div class="container">
    <div class="row mb-2">
      <div class="col-md-6">
        <h3>Products</h3>
      </div>
      <div class="col-md-6">
        <a
          class="btn btn-primary float-right"
          data-toggle="modal"
          data-target="#addProductModal">
          Add Product
        </a>
      </div>
    </div>
    <div class="row">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Modify</th>
              </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product.id">
                  <td>
                    {{ product.name }}
                  </td>

                  <td>
                    {{ product.price }}
                  </td>
                  <td>
                    {{ product.quantity }}
                  </td>

                  <td>
                    {{ product.description }}
                  </td>

                  <td>
                    <button class="btn btn-primary mr-2">Edit</button>
                    <button class="btn btn-danger">Delete</button>
                  </td>

                </tr>
            </tbody>
          </table>
      </div>
    </div>
    <add-product-modal></add-product-modal>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AddProductModal from '@/components/product/AddProductModal.vue';

export default {
  components: {
    AddProductModal,
  },
  computed: {
    ...mapState('products', ['products']),
  },
  methods: {
    ...mapActions('products', ['initProducts']),
  },
  async created() {
    await this.initProducts();
  },
};
</script>
