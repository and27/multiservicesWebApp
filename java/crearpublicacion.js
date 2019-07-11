function writePublication() {
        var title = document.getElementById("titulo").value;
        var desc = document.getElementById("Descripcion").value;
        var cat=document.getElementById("categoria").value;
        var valor=parseFloat(document.getElementById("Valor").value);
        var storageRef = firebase.storage().ref();
        var i1 = document.getElementById("Imagen1");
        var fileRef1=storageRef.child(i1.files[0].name);
        var x=fileRef1.put(i1.files[0]);
        var newPostKey = firebase.database().ref().child("Publications/"+cat).push().key;
        fileRef1.getDownloadURL().then(function(url) {
          var pic1=url;
            firebase.auth().onAuthStateChanged(function(user) {
              if (user) {
                
                var uid= user.uid;
                agregaraPerfil(uid, cat, newPostKey, title);
                var write= firebase.database().ref("Publications/" + cat + "/" + newPostKey).set({
                    userID: uid,
                    username: name,
                    title: title,
                    description: desc,
                    category: cat,
                    valor: valor,
                    pic1: pic1
                       }).then(alert("Se ha creado publicacion"));
                
              }
             //var user= firebase.database().ref("Users").child(uid).update()
             
          
            });
        });   
  }
  function agregaraPerfil(uid, cat, key, title) {
    firebase
      .database()
      .ref("Usuario/" + uid + "/" + "Publication" + "/" + cat + "/" + key)
      .set({
        titulo: title
      });
  }
  
  function actualizarIDpublicacion(ID) {
    firebase
      .database()
      .ref("ID")
      .set({
        IDpublic: ID
      });
  }