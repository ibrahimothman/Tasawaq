<template>
  <div class="products">
      <div class="container">
        <div class="intro">
          <div class="row">
            <div class="col-md-6 ml-3">
                  <h3>Profile settings</h3>

                <p>
                  Change your profile settings here
                </p>
            </div>
          </div>
        </div>

        <div class="profile-content">
          <div class="container">
              <div class="row">

                <div class="col-md-6">
                  <div class="form-group">
                    <label for="">User Name</label>
                    <input
                      type="text"
                      v-model="profile.name"
                      placeholder="Full name"
                      class="form-control">
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <label for="">Phone Number</label>
                    <input
                      type="text"
                      v-model="profile.phoneNumber"
                      placeholder="Phone"
                      class="form-control">
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-group">
                    <label for="">Address</label>
                    <input
                      type="text"
                      v-model="profile.address"
                      placeholder="Address"
                      class="form-control">
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-group">
                    <label for="">Post Code</label>
                    <input
                      type="text"
                      v-model="profile.postCode"
                      placeholder="Postcode"
                      class="form-control">
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="form-group">
                      <button
                        @click="onUpdateProfile"
                        class="btn btn-primary">
                        Save Changes
                      </button>
                  </div>
                </div>

              </div>
          </div>

        </div>
      </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  computed: {
    ...mapState('profile', ['profiles']),
    profile() {
      return this.profiles[0] || {};
    },
  },
  data() {
    return {
    };
  },
  async created() {
    await this.initProfile();
  },
  methods: {
    ...mapActions('profile', ['initProfile', 'updateProfile']),
    async onUpdateProfile() {
      await this.updateProfile(this.profile);
    },
  },
};
</script>
