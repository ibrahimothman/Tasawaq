<template>
  <div ref="modal"
    class="modal fade"
    id="loginModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div v-if="error" class="alert alert-danger" role="alert">
            {{ error.message }}
          </div>
          <ul class="nav nav-fill nav-pills mb-3" id="pills-tab" role="tablist">
              <li class="nav-item">
                  <a class="nav-link active" id="pills-home-tab"
                    data-toggle="pill" href="#pills-login"
                    role="tab" aria-controls="pills-login"
                    aria-selected="true">
                    Sign In
                  </a>
              </li>
              <li class="nav-item">
                  <a class="nav-link"
                    id="pills-register-tab"
                    data-toggle="pill"
                    href="#pills-register"
                    role="tab" aria-controls="pills-register"
                    aria-selected="false">
                    Sign Up
                  </a>
              </li>
          </ul>
          <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active"
              id="pills-login" role="tabpanel"
              aria-labelledby="pills-login-tab">

              <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input type="email"
                    v-model="email" class="form-control"
                    id="exampleInputEmail1" aria-describedby="emailHelp"
                    placeholder="Enter email">
                  <small class="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
              </div>
              <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password"
                    @keyup.enter="onSignIn"
                    v-model="password"
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password">
              </div>

              <div class="form-group">
                <div v-if="loading" class="d-flex justify-content-center">
                  <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
                <button v-if="!loading" class="btn btn-primary" @click="onSignIn">Sign in</button>
              </div>
            </div>

            <div class="tab-pane fade"
              id="pills-register" role="tabpanel"
              aria-labelledby="pills-register-tab">

              <div class="form-group">
                  <label for="email">Email address</label>
                  <input type="email"  v-model="email"
                    class="form-control" id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email">
              </div>
              <div class="form-group">
                  <label for="password">Password</label>
                  <input type="password" v-model="password"
                    class="form-control" id="password"
                    placeholder="Password">
              </div>

              <div class="form-group">
                <div v-if="loading" class="d-flex justify-content-center">
                  <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
                <button v-if="!loading" class="btn btn-primary" @click="onSignUp">Sign up</button>
              </div>

            </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import $ from 'jquery';

export default {
  computed: {
    ...mapState('auth', ['user', 'error', 'loading']),
  },
  data() {
    return {
      show: false,
      name: '',
      email: '',
      password: '',
    };
  },
  methods: {
    ...mapActions('auth', ['signIn', 'signUp']),
    ...mapMutations('auth', ['clearError']),
    async onSignIn() {
      this.clearError();
      if (this.email && this.password) {
        await this.signIn({
          email: this.email,
          password: this.password,
        });
        if (this.user) {
          $('#loginModal').modal('hide');
          this.$router.replace('/admin');
        }
      }
    },
    async onSignUp() {
      this.clearError();
      if (this.email && this.password) {
        await this.signUp({
          email: this.email,
          password: this.password,
        });
        if (this.user) {
          $('#loginModal').modal('hide');
          this.$router.replace('/admin');
        }
      }
    },
  },
};
</script>
