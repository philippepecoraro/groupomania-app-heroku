<template>
  <div class="container text-center">  
    <div class="bloc"> 
      <h1 class="text-center">Profil</h1>
        <div v-if="currentUser.isAdmin" class="blocGestion">        
          <p><strong>Vous êtes administrateur</strong></p>
          <p class="h5">Gestion des signalements</p>
        <a class="btn btn-secondary" href="/admin" role="button"
         title="Cliquez pour rejoindre la page des articles et commentaires signalés">
         Gestion</a></div>
        <div v-else>
            <strong>Vous n'êtes pas administrateur</strong>
        </div>          
            <div class="jumbotron">
            <h2 class="text-center">Edition du Prénom et du Nom</h2>       
            <form name="form" @submit.prevent="updateUser">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                    <label for="firstname">
                    <strong>Prénom:</strong></label>
                    {{currentUser.firstname}}
                    <input type="text" 
                    class="form-control"
                    id="firstname"
                    v-model="user.firstname"
                    v-validate="'required'"
                    name="firstname"
                    placeholder="Entrez votre prénom"
                    :class="{ 'is-invalid': submitted && errors.has('firstname')}"
                    />                 
                    <div
                      v-if="submitted && errors.has('firstname')"
                      class="invalid-feedback">Le prénom est requis</div>                 
                  </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="lastname">
                      <strong> Nom:</strong></label>
                    {{currentUser.lastname}}
                    <input type="text"
                    class="form-control" 
                    id="lastname"
                    v-model="user.lastname"
                    v-validate="'required'"
                    name="lastname"
                    placeholder="Entrez votre nom"
                    :class="{ 'is-invalid': submitted && errors.has('lastname')}"
                    />
                      <div
                      v-if="submitted && errors.has('lastname')"
                      class="invalid-feedback">Le nom est requis</div>   
                    </div>
                  </div>
                </div>             
                <div class="form-group">
                  <button type="submit" class="btn btn-primary">Envoyer</button>
                </div>            
            </form>
          </div>
      </div>  
    <p><strong>Email:</strong><br/>
      {{currentUser.email}}</p>   
    <div class="sup text-center">
      <div class="supCompte text-center"> 
      <p><strong>Supprimez votre compte</strong></p> 
      <button @click="deleteAccount" class="btn btn-danger btn-sm shadow-lg" type="button">Suppression compte</button>
      </div>
    </div>  
  </div>  
</template>

<script>

import User from '../services/auth.service'

export default {
  name: 'Profile',
  data() {
    return {    
      user: {
      firstname: "",
      lastname: ""    
      },  
      submitted: false
    };
  },

  computed: {
    currentUser() {      
      return this.$store.state.auth.user;       
    },
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }        
  },  
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');      
    }    
  }, 
  methods: {
          logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
      },
     
  updateUser() {
    const data = {
        firstname: this.user.firstname,
        lastname: this.user.lastname
      };
    this.submitted = true;
    this.$validator.validate().then(valid => {
      if (valid) {
           User.updateName(this.currentUser.id, data)   
      .then(data => {
        console.log(data);       
        sessionStorage.setItem('user', JSON.stringify(this.user));       
        alert('Le compte utilisateur a été mis à jour avec succès !')
        this.logOut();     
      })
      .catch(e => {
        console.log(e);
      });
       
      }
    });
  },  

    deleteAccount() {
       if ( confirm("Etes vous sure de vouloir supprimer ce compte ?")) {        
      User.deleteUser(this.currentUser.id)
      .then(response => {
        console.log('response:', response)
        sessionStorage.removeItem('user');
        this.logOut();
        })
       }
        else {
          console.log("Vous avez annulé la demande");
        }            
    }
  }    
 };  

</script>
<style scoped>

h4 {
  margin-bottom: 50px;
}
.supCompte {
  margin-bottom: 50px; 
}
header, .blocGestion {
  border-radius: 20px;
}
h4 {
  margin-top: 50px;
}

</style>