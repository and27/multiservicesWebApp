function Actualizar(campo, info) {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var uid = user.uid;
    }

    var write = firebase
      .database()
      .ref("Usuario/" + uid)
      .child(campo)
      .set(info);
  });
}
function cambiarim(){
  
  var  btn=document.getElementById('imbtn');
  btn.innerHTML='<input type="file" id="file" value="upload"/><button onclick="selectim()">Actualizar foto</input>';
}
function selectim(){
  var photo=document.getElementById('photo');
//CODIGO PARA SUBIR FOTO
  var storageRef = firebase.storage().ref();
  var i1 = document.getElementById('file');
  var fileRef1=storageRef.child(i1.files[0].name);
  var x=fileRef1.put(i1.files[0]);
  fileRef1.getDownloadURL().then(function(url) {
//////(//////////////////////////)
    Actualizar('photo', url);
    alert('Foto de Perfil actualizada');
    window.location.replace("main.html")
  });
  

}