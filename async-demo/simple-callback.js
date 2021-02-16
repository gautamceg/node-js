console.log("Before");
//Asynch function call
getUser(1, function(user){
    console.log('User: ',user);
});
console.log("After");

//Aysnc funtion definition
function getUser(id, callback){
    setTimeout(() => {
        console.log("Reading a user from database ...");
        callback({id: id, name: 'Gautam'});
    }, 2000);
}