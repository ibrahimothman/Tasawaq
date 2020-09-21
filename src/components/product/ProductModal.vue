<template>
  <div class="modal fade"
    id="productModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="editLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editLabel">{{ title }}</h5>
          <button type="button"
            class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <div class="row">
              <!-- main product -->
              <div class="col-md-8">
                <div class="form-group">
                  <input type="text"
                    placeholder="Product Name"
                    v-model="product.name"
                    class="form-control">
                </div>

                <div class="form-group">
                  <label for="">Add Description</label>
                  <textarea v-model="product.description"
                    class="form-control" id="" rows="3"></textarea>
                </div>
              </div>
              <!-- product sidebar -->
              <div class="col-md-4">
                <h4 class="display-6">Product Details</h4>
                <hr>

                <div class="form-group">
                  <input type="text"
                    placeholder="Price"
                    v-model="product.price"
                    class="form-control">
                </div>

                 <div class="form-group">
                  <input type="number"
                    placeholder="Quantity"
                    v-model="product.quantity"
                    class="form-control">
                </div>

                <div class="form-group">
                  <input type="text"
                    placeholder="Product tags"
                    v-model="product.tags"
                    class="form-control">
                </div>

                <div class="form-group">
                  <label for="product_image">Product Images</label>
                  <input type="file" class="form-control">
                </div>
              </div>
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
          <button v-if="type === 'add'" @click="onAddProduct"
            type="button"
            class="btn btn-primary">
            Save
          </button>
          <button v-else @click="onUpdateProduct"
            type="button"
            class="btn btn-primary">
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable object-shorthand */
import { mapActions } from 'vuex';
import $ from 'jquery';

export default {
  props: ['title', 'oldProduct', 'type'],
  data() {
    return {
      product: {},
    };
  },
  watch: {
    oldProduct: function (value) {
      this.product = value;
    },
  },
  methods: {
    ...mapActions('products', ['addProduct', 'updateProduct']),
    async onAddProduct() {
      await this.addProduct(this.product);
      this.product = {};
      $('#productModal').modal('hide');
    },
    async onUpdateProduct() {
      console.log(this.product);
      await this.updateProduct(this.product);
      this.product = {};
      $('#productModal').modal('hide');
    },
  },
};
</script>
