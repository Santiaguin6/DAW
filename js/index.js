/*
* Fichero javascript de la práctica 6. 
* Rafael Bayón,Santiago López
*/


function log(msg,ele){
    console.log("#######################");
    console.log(msg + ": " + ele);
    console.log("");
}

function log(msg){
    console.log("#######################");
    console.log(msg);
    console.log("");
}

function init(){
    log("estoy en js");
    let form = document.querySelector("form");
    
    form.addEventListener("submit",checkForm);
}


function checkForm(){


}








function err(err){
    console.log("Error: " + err);
    
}


window.addEventListener("load",init);