<template>
  <div class="modal fade" id="addProduct" tabindex="-1" role="dialog" aria-labelledby="editLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editLabel">Edit Product</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">

            <div class="row">
              <!-- main product -->
              <div class="col-md-8">
                <div class="form-group">
                  <input type="text" placeholder="Product Name" v-model="product.name" class="form-control">
                </div>

                <div class="form-group">
                  <vue-editor v-model="product.description"></vue-editor>
                </div>
              </div>
              <!-- product sidebar -->
              <div class="col-md-4">
                <h4 class="display-6">Product Details</h4>
                <hr>

                <div class="form-group">
                  <input type="text" placeholder="Product price" v-model="product.price" class="form-control">
                </div>

                <div class="form-group">
                  <input type="text" @keyup.188="addTag" placeholder="Product tags" v-model="tag" class="form-control">

                  <div  class="d-flex">
                    <p v-for="tag in product.tags">
                        <span class="p-1">{{tag}}</span>
                    </p>

                  </div>
                </div>


                <div class="form-group">
                  <label for="product_image">Product Images</label>
                  <input type="file" @change="uploadImage" class="form-control">
                </div>

                <div class="form-group d-flex">
                  <div class="p-1" v-for="(image, index) in product.images">
                      <div class="img-wrapp">
                          <img :src="image" alt="" width="80px">
                          <span class="delete-img" @click="deleteImage(image,index)">X</span>
                      </div>
                  </div>
                </div>

              </div>
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button @click="addProduct()" type="button" class="btn btn-primary" v-if="modal == 'new'">Save changes</button>
          <button @click="updateProduct()" type="button" class="btn btn-primary" v-if="modal == 'edit'">Apply changes</button>
        </div>
      </div>
    </div>
  </div>
</template>
