# Instagam API(unofficial)

wanna fetch user infos without registering your application and authentication?

var fuser=new fetchuser('zuck'); // username as parameter                                                  
     fuser.name;    
      fuser.bio;     
       fuser.followers;     
       fuser.following;     
       fuser.isprivate;     
       fuser.media;     
       fuser.pic;                                       
         fuser.userexists;                                    
![fetchuser](https://imgur.com/a/dPkXH)

var fpost=new fpost('linkofpost');     
     fpost.name;     
      fpost.isprivate;          
      fpost.cap;     
      fpost.hasmultipics;     
      fpost.likes;     
      fpost.comments;     
      fpost.media;     
      fpost.tags;     
       fpost.urlexists;     
           
  ![fetchpost](https://imgur.com/a/Eg0lP)
    
var fpics=new fetchpics('georgesfarah4');    
    fpics.result;       
    fpics.userexists;       
    ![fetchpics](https://imgur.com/a/LETkL)
                                                    
    PS:you must have php!
