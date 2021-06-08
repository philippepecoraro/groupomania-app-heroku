<template>
  <div id="app">    
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent">
        <span class="navbar-toggler-icon"></span>Menu
      </button>
       <div id="navbarContent" class="collapse navbar-collapse"> 
         <ul class="navbar-nav mr-auto">
           <li class="nav-item">
             <router-link to="/home" class="nav-link">
               <font-awesome-icon icon="home" />Accueil
             </router-link>
           </li>       
           <li class="nav-item">
             <router-link to="/add" class="nav-link">
               Ajout Article
             </router-link>
           </li>
         </ul>
         <div v-if="!currentUser">
           <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/register" class="nav-link">
                <font-awesome-icon icon="user-plus" />Inscription
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/login" class="nav-link">
                <font-awesome-icon icon="sign-in-alt" />Login
              </router-link>
            </li>
           </ul>
          </div>
          <div v-if="currentUser">
            <ul class="navbar-nav ml-auto">
             <li class="nav-item">
              <router-link to="/profile" class="nav-link">             
               {{ currentUser.firstname }} {{ currentUser.lastname}} 
                <div v-if="currentUser.isAdmin">
                 Administrateur 
                </div>
                <div v-else>
                 Utilisateur </div>          
              </router-link>
             </li>           
             <li class="nav-item">
              <a class="nav-link" href @click.prevent="logOut">
               <font-awesome-icon icon="sign-out-alt" />LogOut
              </a>
             </li>
            </ul>
          </div>
       </div> 
   </nav>     
    <div class="text-center">
      <a href ="#" >
        <img src="./assets/icon-left-font-monochrome-black.png" height="150" alt="Site logo">
      </a>
    </div>
    <div class="container">
      <router-view />
    </div>     
  </div>      
</template>

<script>

export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }   
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>
<style>
.connectedTitle {
  color: white;
}

</style>

