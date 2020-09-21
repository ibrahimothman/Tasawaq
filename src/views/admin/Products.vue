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
          data-target="#productModal"
          @click="title = 'Add Product'; type = 'add'; product = {}"
          >
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
                    <button
                      @click="onEditBtnClicked(product)"
                      data-toggle="modal"
                      data-target="#productModal"
                      class="btn btn-primary mr-2">
                      Edit
                    </button>
                    <button class="btn btn-danger"
                      @click="onDeleteProduct(product.id)">
                      Delete
                    </button>
                  </td>

                </tr>
            </tbody>
          </table>
      </div>
    </div>
    <product-modal
      :title="title"
      :type="type"
      :oldProduct="product">
    </product-modal>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ProductModal from '@/components/product/ProductModal.vue';
import { swal, Toast } from '@/swal';

export default {
  components: {
    ProductModal,
  },
  data() {
    return {
      title: '',
      type: '',
      product: {},
    };
  },
  computed: {
    ...mapState('products', ['products']),
  },
  methods: {
    ...mapActions('products', ['initProducts', 'deleteProduct']),
    async onDeleteProduct(productId) {
      const result = await swal();
      if (result.value) {
        await this.deleteProduct(productId);
        Toast.fire({
          icon: 'success',
          title: 'Successfully Deleted',
        });
      }
    },
    onEditBtnClicked(product) {
      this.title = 'Edit Product';
      this.type = 'edit';
      this.product = product;
    },
  },
  async created() {
    await this.initProducts();
  },
};
</script>
