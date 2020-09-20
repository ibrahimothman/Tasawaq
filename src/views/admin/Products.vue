<template>
  <div class="container">
    <div class="row mb-2">
      <div class="col-md-6">
        <h3>Products</h3>
      </div>
      <div class="col-md-6">
        <button class="btn btn-primary float-right">Add Proasdduct</button>
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
                <tr>
                  <td>
                    name
                  </td>

                  <td>
                    500
                  </td>
                  <td>
                    10
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

  </div>
</template>
