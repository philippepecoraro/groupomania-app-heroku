<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 shadow-lg bloc">
        <h1 class="text-center">Ajoutez un article</h1>
          <form name="form" @submit.prevent="handleArticle">         
            <div class="form-group">
              <label for="title"><strong>Titre</strong></label>
                <input
                 type="text"
                 class="form-control shadow-lg"          
                 id="title"    
                 v-model="article.title"
                 v-validate="'required'"
                 name="title"
                 placeholder="Entrez un titre"           
                />
                <div v-if="submitted && errors.has('title')"
                  class="alert alert-danger"
                  role="alert"
                  >Un titre est requis!
                </div>       
            </div> 
            <div class="form-group">
              <label for="description"><strong>Description</strong></label>
                <input
                  type="text"
                  class="form-control shadow-lg"                     
                  id="description"       
                  v-model="article.description"
                  v-validate="'required'"
                  name="description"
                  placeholder="Entrez une description"           
                />
                <div v-if="submitted && errors.has('description')"
                  class="alert alert-danger"
                  role="alert"
                >
                Une description est requise
                </div>        
            </div>
            <div class="form-group">
              <label for="text"><strong>Texte</strong></label>
                <textarea
                  class="form-control shadow-lg"          
                  id="text"      
                  v-model="article.text"
                  v-validate="'required'"
                  name="text"
                  placeholder="Entrez un  texte"           
                ></textarea>
                <div v-if="submitted && errors.has('text')"
                  class="alert alert-danger"
                  role="alert"
                  >Un texte est requis!
                </div>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary">       
              Envoyer</button> 
            </div>             
          </form>     
      </div>
    </div>
  </div>
</template>

<script>

import ArticleDataService from "../services/user.service"; 
    
export default {
  name: "add-article",
  data() {
    return {
      article: {     
        title: "",
        description: "",
        text: "",     
        userId: ""
      },
      submitted: false      
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    saveArticle() {
      const data = {
        title: this.article.title,
        description: this.article.description,
        text: this.article.text,
        userId: this.currentUser.id     
      };           
          ArticleDataService.create(data)
           .then(response => {
             this.article.id = response.data.id;          
             this.submitted = true;
              if (response) {
                window.alert('Article ajouté avec succès!');
                this.$router.push('/home');
                  }
                })
            .catch(e => {
              console.log(e);
              window.alert('L\'article n\'a pas été ajouté!');
                 });                    
    },        
 
    handleArticle() {        
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {      
            this.saveArticle();           
        }                            
      });  
    }        
  }     
};
</script>

<style>
.bloc {
   border-radius: 25px;
}

</style>