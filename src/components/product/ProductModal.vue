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
                  <vue-editor v-model="product.description"></vue-editor>
                </div>

              </div>
              <!-- product sidebar -->
              <div class="col-md-4">
                <div class="form-group">
                  <div class="input-group">
                    <input type="number"
                      placeholder="Price"
                      v-model="product.price"
                      class="form-control">
                      <input type="number"
                      placeholder="Quantity"
                      v-model="product.quantity"
                      class="form-control">
                  </div>

                </div>

                <div class="form-group">
                  <input type="text"
                    placeholder="Product tags"
                    v-model="tag"
                    @keyup.enter="addTag"
                    class="form-control">
                </div>

                <div class="d-flex flex-wrap">
                  <div
                    v-for="(tag, index) in product.tags"
                    :key="index"
                    class="form-group tag mr-1">
                    <span>{{ tag }} </span>
                    <i class="fas fa-times" @click="removeTag(index)"></i>
                  </div>
                </div>

                <div class="form-group">
                  <button @click="onUploadClicked" class="btn btn-primary">Upload image</button>
                  <input
                    type="file"
                    class="form-control"
                    style="display: none"
                    @change="onImageUploaded"
                    ref="fileInput">
                </div>
                <div v-if="type === 'add' && imageURL" class="form-group">
                  <img :src="imageURL" alt="" class="img-fluid">
                </div>
                <div v-else-if="type === 'edit'" class="form-group">
                  <img :src="product.imageURL" alt="" class="img-fluid">
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
import { VueEditor } from 'vue2-editor';

export default {
  props: ['title', 'oldProduct', 'type'],
  components: {
    VueEditor,
  },
  data() {
    return {
      product: {
        tags: [],
      },
      tag: '',
      imageURL: null,
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
      this.imageURL = null;
      $('#productModal').modal('hide');
    },
    async onUpdateProduct() {
      console.log(this.product);
      await this.updateProduct(this.product);
      this.product = {};
      $('#productModal').modal('hide');
    },
    addTag() {
      this.product.tags.push(this.tag);
      this.tag = '';
    },
    removeTag(index) {
      this.product.tags.splice(index, 1);
    },
    onUploadClicked() {
      this.$refs.fileInput.click();
    },
    onImageUploaded(e) {
      const file = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
        this.imageURL = fileReader.result;
      });
      fileReader.readAsDataURL(file);
      this.product.image = file;
    },
  },
};
</script>

<style scoped>
  .tag {
    background-color: #f8f8f8;
    border-radius: 5px;
    padding: 5px;
  }
</style>
