/*
* Fichero javascript de la práctica 6. 
* Rafael Bayón,Santiago López
*/

//metodos de log
function log(msg,ele){
    console.log("#######################");
    console.log(msg + ": " + ele);
    console.log("");
}

function logmsg(msg){
    console.log("#######################");
    console.log(msg);
    console.log("");
}

//VARIABLES GLOBALES
var EXCL = 33, ALMH = 35, DOL = 36, PERC = 37, AMP = 38, COM = 39, AST = 42, MAS = 43, GUION = 45, 
    SLASH = 47, CERO = 48, NUEVE = 57, IGUAL = 61, INTE = 63, A = 65, Z = 90, POT = 94, BAR = 95, 
    ACEN = 96, a = 97, z = 122, CORCH1 = 123, CORCH2 = 124,PIPE = 124, VIRG = 126, POINT = 46;

//metodo inicial que llama al metodo que revisa el formulario
function init(){
    logmsg("estoy en init");
    let form = document.querySelector("form");    
    form.addEventListener("submit",checkForm);
    //log("muestro form",form);
}

//recupera valores del formulario, y llama a los métodos encargados de revisar cada campo
function checkForm(e){
    logmsg("estoy en checkForm");
    let form = e.target,
        nombre = form.nombre.value,
        pwd = form.pwd.value,
        pwd2 = form.pwd2.value,
        email = form.mail.value,
        sexo = form.sexo.value,
        fecha = form.fecha.value;

    checkName(nombre);

    e.preventDefault();
}


//método que revisa el nombre
function checkName(name){
    let resp = false,
        tam = name.length,
        first = name.charAt(0);

    if(tam >= 3 && tam <= 15 && isNaN(first)){
        if(checkCad(name,tam,englishAndNumber)) resp = true;
        else console.log("Contiene letras que no forman parte del alfabeto inglés o no son números");
    }
    else 
        console.log("Nombre empieza por número o es menor que 3 o mayor que 15");
    return resp;
}

function checkPwd(pwd){
    let resp = false;
        tam = pwd.length;
    
    if(tam >= 6 && tam <= 15){
        
    }
    return resp;
}

//metodo que comprueba si los caracteres son los adecuados, para ello utiliza la funcion que recibe
function checkCad(cad,tam,fnc){
    let resp = true,
        uni = 0;
    logmsg("compruebo alfabeto y números");
    for(let i = 0; i < tam; i++){
        uni = cad.charCodeAt(i);
        log("analizo carácter",cad.charAt(i));
        if(!fnc(uni)){
            resp = false;
            break;
        }
    }
    return resp;
}

function englishAndNumber(uni){
    let resp = true;
    if(!((uni >= CERO && uni <= NUEVE) || (uni >= A && uni <= Z) || (uni >= a && uni <= z))){
        logmsg("cáracter no forma parte del alfabeto inglés o no forma parte de números");
        resp = false;
    }
    return resp;
}



function err(err){
    console.log("Error: " + err);
}


window.addEventListener("load",init);