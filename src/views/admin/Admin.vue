<template>
  <div class="admin">
<div class="page-wrapper default-theme sidebar-bg bg1"
  :class="{ toggled: sidebar }">
        <a id="show-sidebar" @click="sidebar = true"
          class="btn btn-sm btn-dark" href="#"
          >
            <i class="fas fa-bars"></i>
        </a>
        <nav id="sidebar" class="sidebar-wrapper">
            <div class="sidebar-content">
                <!-- sidebar-brand  -->
                <div class="sidebar-item sidebar-brand">
                    <a href="#">Tasawaq</a>
                    <div id="close-sidebar"
                      @click="sidebar = false">
                        <i class="fas fa-times"></i>
                    </div>
                </div>
                <!-- sidebar-header  -->
                <div class="sidebar-item sidebar-header">
                    <div class="user-pic">
                        <img class="img-responsive img-rounded"
                          src="/img/user.png" alt="User picture">
                    </div>
                    <div class="user-info">
                        <span class="user-name">{{ firstname }}
                            <strong>{{ lastname }}</strong>
                        </span>
                        <span class="user-role">{{ profile.email }}</span>
                        <span class="user-status">
                            <i class="fa fa-circle"></i>

                        </span>
                    </div>
                </div>
                <!-- sidebar-search  -->
                <div class="sidebar-item sidebar-search">
                    <div>
                        <div class="input-group">
                            <input type="text"
                            class="form-control search-menu" placeholder="Search...">
                            <div class="input-group-append">
                                <span class="input-group-text">
                                    <i class="fa fa-search" aria-hidden="true"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- sidebar-menu  -->
                <div class=" sidebar-item sidebar-menu">
                    <ul>
                        <li class="header-menu">
                            <span>Menu</span>
                        </li>

                        <li>
                            <router-link :to="{name: 'Admin-Overview'}">
                                <i class="fa fa-chart-line"></i>
                                <span>Overview</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{name: 'Admin-Products'}">
                                <i class="fab fa-amazon"></i>
                                <span>Products</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{name: 'Admin-Orders'}">
                                <i class="fa fa-shopping-cart"></i>
                                <span>Orders</span>
                            </router-link>
                        </li>

                        <li>
                            <router-link :to="{name: 'Admin-Profile'}">
                                <i class="fa fa-user"></i>
                                <span>Profile</span>
                            </router-link>
                        </li>
                        <li>
                            <a href="#" @click="signOut">
                                <i class="fa fa-power-off"></i>
                                <span>Sign Out</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- sidebar-menu  -->
            </div>

        </nav>
        <!-- sidebar-content  -->
        <main class="page-content">
            <router-view/>
        </main>
        <!-- page-content" -->
    </div>
    <!-- page-wrapper -->
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      sidebar: true,
    };
  },
  computed: {
    ...mapState('profile', ['profiles']),
    profile() {
      return this.profiles[0] || {};
    },
    firstname() {
      return this.profiles[0] ? this.profiles[0].name.split(' ')[0] : '';
    },
    lastname() {
      return this.profiles[0] ? this.profiles[0].name.split(' ')[1] : '';
    },
  },
  methods: {
    ...mapActions('auth', ['signOut']),
  },
};
</script>
