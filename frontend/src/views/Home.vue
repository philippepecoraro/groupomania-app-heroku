<template>
  <div class="container">
    <div class="list row">
      <div class="col-md-12">
        <div class="detail shadow">
          <div>             
            <div class="col-md-12">  
              <div class="bloc">         
                <h1>Liste des Articles</h1> 
                  <p v-if="articles.length !== 0"><strong>Clickez sur un article pour voir son contenu</strong></p>
                    <ul class="list-group text-left">                     
                      <li class="list-group-item shadow-lg"           
                        v-for="(article, index) in articles"
                        :key="index" 
                        @click="setActiveArticle(article, index)"                             >   
                          <div class="list-row text-center">  
                            <p v-if="article.signal" 
                            class="blocSignal"><strong>Article signalé</strong></p>
                            <p><strong>Date de Creation:</strong><br/> 
                            {{article.createdAt}}</p>                         
                            <p><strong>Auteur de l'article:</strong><br/> 
                            {{ article.User.firstname}}
                            {{ article.User.lastname }}</p>                      
                            <p><strong>Titre:</strong><br/> 
                            {{ article.title }}</p> 
                            <p><strong>Description:</strong></p>
                            <p> {{ article.description}} </p>                          
                          </div>                                                                             
                      </li>                      
                    </ul>      
                      <div v-if="articles.length !== 0">                   
                        <button v-if="currentUser.isAdmin" 
                        class="m-3 btn btn-sm btn-danger"
                         @click="removeAllArticles">
                          Supprimez tous les articles
                        </button> 
                      </div>                                                             
              </div> 
            </div>        
          </div>      
        </div>
      </div>   
    </div>  
 </div>
</template>

<script>  

import userService from '../services/user.service';

export default {
  name: 'Home',
  data() {
    return {
      articles:[],
      currentArticle: null,
      currentIndex: -1            
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    retrieveArticles() {
      userService.getAll()
        .then(response => {    
          this.articles = response.data;              
        })
        .catch(e => {
          console.log(e);
        });
    }, 
  
    refreshList() {
      this.retrieveArticles();
      this.currentArticle = null;
      this.currentIndex = -1;       
    },
    setActiveArticle(article, index) {     
      this.currentArticle = article;
      this.currentIndex = index;       
      this.$router.push('/articles/' + this.currentArticle.id);    
     console.log('/articles/:' + this.currentArticle.id);  
     console.log('article:', article.id)
    },      
    
    removeAllArticles() {
      if ( confirm("Etes-vous sur de vouloir supprimer tous les articles ?")) {
      userService.deleteAll()
        .then(response => {
          console.log("responseRemove:" ,response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    }
    else {
        console.log("Vous avez annulé la demande");
    }
    },                
  },

  mounted() {
    this.retrieveArticles();   
   }
  };

</script>

<style scoped>

.list {
  background-color: #f7f7f7;
  text-align: center;
  max-width: 900px;
  margin: auto;
}
.list-group { 
 width: auto;
  margin: auto; 
  border-radius: 20px;
}
.list-group-item {
  display: flex;
  flex-direction: column; 
  background-color: #EEEEEE; 
  border-radius: 20px;
  cursor: pointer;
}
li span {
  text-align: left;
}
.detail {
  text-align: center; 
  border-radius: 10px;
}
.btn {
  margin-bottom: 50px;
  margin-top: 20px;
}
.blocComment {
  border-radius: 20px; 
}
.blocText {
  border-radius: 20px;
}
.blocCommentBloc {
   border-radius: 20px;
}
.bloc2Comment {
  border-radius: 20px;
}
.blocComment1 {
  border: 1px black solid;
  border-radius: 20px;
}
.blocSignal {
  background-color: #FDD835;
  width: auto;
}


</style>