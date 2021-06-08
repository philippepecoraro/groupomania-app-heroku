<template>
  <div class="text-left shadow-lg" v-if="currentArticle">           
      <h1 class="title text-center">Article</h1>
        <div v-if="currentArticle.signal" class="blocSignal text-center">
          <p class="h4">Signalé</p>
        </div>  
        <div class="list-row text-center">
          <div>
            <label><strong>Date:</strong></label><br/> 
             {{ currentArticle.createdAt }}
          </div>
          <div>
            <label><strong> Auteur de l'article:</strong></label><br/> 
              {{ currentArticle.User.firstname }}
              {{ currentArticle.User.lastname }}
          </div>                          
          <div>
            <label><strong>Titre:</strong></label><br/> 
              {{ currentArticle.title }}
          </div> 
          <div>
            <label><strong>Description:</strong></label><br/> 
              {{ currentArticle.description }}
          </div> 
        </div>
        <div class="blocText text-left p-3 mb-2 bg-white shadow-lg">
          <label><strong>Texte:</strong></label><br/> 
            {{ currentArticle.text }}
        </div> 
        <div v-if="currentUser.isAdmin || currentUser.id === currentArticle.userId">
          <button class="btn btn-danger btn-sm shadow" 
            title="Cliquez pour supprimer l'article"
            @click="deleteOneArticle">
              Supprimer Article
          </button>
        </div>                          
        <div v-if="currentUser.isAdmin && currentArticle.signal">
          <button class="btn btn-warning btn-sm shadow" 
           title="Cliquez pour désignaler l'article"
           @click="signalArticle(false)">
            Désignaler Article
          </button>
        </div>
        <div v-if="currentUser.id !== currentArticle.userId"> 
          <div v-if ="currentArticle.signal === false">
            <button class="btn btn-warning btn-sm shadow"
              title="Cliquez pour signaler l'article" 
              @click="signalArticle(true)">
                Signaler Article
            </button>
          </div>                
        </div>    
        <div class="blocComment1"> 
          <div class="text-center"> 
            <h2 v-if="comments.length !== 0">Liste des commentaires</h2> 
          </div> 
          <div class="blocComment">          
            <div class="text-left">                 
              <div v-for="(comment, key) in comments" class="bloc2Comment shadow"
                :key="key"                                       
              >
                <div v-if="comment.articleId === currentArticle.id" class="blocCommentBloc"> 
                  <div v-if="comment.signal" 
                    class="blocSignal text-center">
                      <p class="h5" >Commentaire signalé</p>
                  </div>                                  
                    <p class="text-center"><strong>Date: </strong><br/> 
                      {{ comment.createdAt}} </p>
                    <p class="text-center" ><strong>Auteur du commentaire: </strong><br/>
                      {{ comment.User.firstname }}
                      {{ comment.User.lastname }}</p>                       
                    <p class="blocComment p-3 mb-2 bg-white shadow"><strong> Texte: </strong><br/>
                      {{ comment.text}} </p>                                               
                </div> 
                <div v-if="(comment.userId !== currentUser.id) && comment.signal !== true"> 
                  <button class="btn btn-warning btn-sm shadow" 
                    title="Cliquez pour signaler le commentaire" 
                    @click="signalComment(comment.id, true)">
                      Signaler Commentaire
                  </button>
                </div>
                <div v-if="currentUser.isAdmin && comment.signal">
                  <button class="btn btn-warning btn-sm shadow" 
                    title="Cliquez pour désignaler le commentaire" 
                     @click="signalComment(comment.id, false)">
                       Désignaler commentaire
                  </button>
                </div>                 
              </div>                   
            </div>
          </div>
          </div>
          <div class="row">
            <div class="blocAjout col-md-12 text-center">          
              <h3>Ajoutez un commentaire</h3>
                <form name="form" @submit.prevent="handleComment"> 
                    <div class="form-group">
                      <label for="text"><strong>Texte</strong> (255 caractères max) </label>
                        <input
                        type="text"
                        class="form-control shadow-lg"
                        id="text"          
                        v-model="comment.text"
                        v-validate="'required'"
                        name="text"
                        placeholder="Entrez votre texte"         
                        />    
                        <div v-if="submitted && errors.has('text')"
                        class="alert alert-danger"
                        role="alert"
                        >Un texte est requis!
                        </div>    
                        <div class="form-group text-left">
                          <button type="submit" class="btn btn-primary">       
                           Envoyer</button> 
                        </div>                 
                    </div>                
                </form>  
            </div> 
          </div>
  </div>        
</template>

<script>

import userService from '../services/user.service';
export default {
    name: 'Article',
    data() {
        return {
          comment: {
            text: "",
            articleId: "",
            userId: ""
          },    
        currentArticle: null,        
        comments:[],           
        currentComment: null,
        currentKey: -1,
        submitted: false
        };
    },
     computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
    methods: {    
    deleteOneArticle() {
      if ( confirm("Etes vous sur de vouloir supprimer cet article ?")) {
        userService.delete(this.currentArticle.id)
        .then(response => {
            console.log(response.data);  
               this.$router.push('/home');               
        })
      }
      else{
           console.log("Vous avez annulé la demande");   
      }
    },
    signalArticle(status) {      
      const data = {       
        signal: status
      }; 
       userService.update(this.currentArticle.id, data)
      .then(response => {
        console.log(response.data);   
        if (this.currentArticle.signal) {
        alert("Article désignalé");     
        }
        else {
          alert("Article signalé");
        }       
        document.location.reload();
      })
    },

     signalComment(comment, status) {         
          const data = {
           signal: status,
         };           
       userService.updateComment(comment, data)
      .then(response => {
        console.log(response.data);       
        if (status) {          
        alert("Commentaire signalé");
       
        }
        else {
          alert("Commentaire désignalé");         
        }        
             document.location.reload();
      })
    }, 
                     
    getComment(postId) {
      userService.getAllComment(postId)
      .then(response => {
        this.comments = response.data;    
        console.log('comments.length:', this.comments.length);
        console.log('getComment-response.data:', response.data);
        console.log('comment:', this.comment);
        console.log('comment.articleId:', this.comment.articleId);
      })
      .catch(e => {
        console.log(e);
      })
    },

        getArticle(id) {
      userService.get(id)
        .then(response => {
          this.currentArticle = response.data; 
           console.log('currentArticleGetArticle:', this.currentArticle)

        })
        .catch(e => {
          console.log(e);
        });
    },

     saveComment() {
      const data = {
        text: this.comment.text,
        articleId: this.currentArticle.id,     
        userId: this.currentUser.id       
      };   
      userService.createComment(data)
        .then(response => {
          this.comment.id = response.data.id;      
          this.submitted = true;
          if (response) {
            console.log('response:', response)
            window.alert('Commentaire créé avec succès!');
            document.location.reload();
          }         
        })
        .catch(e => {
          console.log('e:', e);
          window.alert('Le commentaire n\'a pas été créé!');
        });  
       },       

        handleComment() {
            this.loading = false;
            this.submitted = true;
            this.$validator.validate().then(isValid => {
              if (isValid) {      
                  this.saveComment();                
              }             
         });
        }       
    },     
  
    mounted() {    
      this.getArticle(this.$route.params.id);   
      console.log(' this.$route.params.id:', this.$route.params.id);
      this.getComment(this.$route.params.id);   
       }  
    };

</script>

<style scoped>
.blocSignal {
  background-color: #FDD835;
  width: auto;
}
.blocAjout {
  margin-top: 40px;
}

</style>