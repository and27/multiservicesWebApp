function updatephoto(){
    var storageRef = firebase.storage().ref();
    var Ref = storageRef.child('C:\Users\martin\Pictures\Camera Roll\carnetfoto.jpg');
    alert(Ref.fullPath);
}