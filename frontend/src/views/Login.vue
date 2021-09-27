<template>
  <div class="container">
  <div class="col-md-12">
    <div class="text-center">
    <h1>Page de connexion</h1>
      <div class="titleText">Rentrez vos identifiants <br />
        Ou <br />
         <router-link to="register">
          Inscrivez-vous
        </router-link>
      </div>
    </div>
    <div class="card card-container">    
      <form name="form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="user.email"
            v-validate="'required'"
            type="email"
            class="form-control"
            name="email"
          />
          <div
            v-if="errors.has('email')"
            class="alert alert-danger"
            role="alert"
          >L'email est requis!</div>
        </div>
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input
            id="password"
            v-model="user.password"
            v-validate="'required'"
            type="password"
            class="form-control"
            name="password"
          />
          <div
            v-if="errors.has('password')"
            class="alert alert-danger"
            role="alert"
          >Le mot de passe est requis!</div>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary btn-block">            
            Login</button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
        </div>
      </form>
    </div>
  </div>
  </div>
</template>

<script>
import User from '../models/user';

export default {
  name: 'Login',
  data() {
    return {
      user: new User('', '','',''),
      loading: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
 
  methods: {             
         handleLogin() {   
            this.$validator.validateAll().then(isValid => {
              if (isValid) {              
                 if (this.user.email && this.user.password) {
                    this.$store.dispatch('auth/login', this.user).then(
                      () => {
                        this.$router.push('/home');
                    
                        console.log(this.user);
                      },
                      error => {          
                        this.message =
                          (error.response && error.response.data) ||
                          error.message ||
                          error.toString();
                      }
                    );
                  }
                }
            });
         }    
     }
};
</script>

<style scoped>

.titleText {
  font-size: 1.5rem;
}

a {
  color: #212529;
}

label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>