
const Lodash=require("lodash")
let postValue=[]
let value=0;
module.exports.postExist= function(posts,req)
{let postValue=[]
    posts.forEach(post => {
   
    
        // js toLowercase() is needed because Lodash seperates the Capitalized letter with a space before turning them into lowercases. Lodash.lowercase() removes the dashes
        if (Lodash.lowerCase(req.params.postName.toLowerCase())=== Lodash.lowerCase(post.title.toLowerCase()
        ) ) {
            postValue=post;
            console.log(postValue+"inside");
          return true;
        
        }
        
      }
      
      );
      console.log("outside");
     return false

}
module.exports.getPost= function()
{

      return postValue;

}

