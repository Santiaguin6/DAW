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

var contMayus;
var contMin;

/********************************************************************************************* */
function init(){
    logmsg("estoy en init");
    let form = document.querySelector("form");    
    form.addEventListener("submit",checkForm);

    //log("muestro form",form);
}

function checkForm(e){
    logmsg("estoy en checkForm");
    let form = e.target,
        nombre = form.nombre.value,
        pwd = form.pwd.value,
        pwd2 = form.pwd2.value,
        email = form.mail.value,
        sexo = form.sexo.value,
        fecha = form.fecha.value;

    /*if(checkName(nombre)){
        if(checkPwd(pwd)){
            if(pwd2.length > 0 && checkPwd2(pwd,pwd2)){
                if(*/checkEmail(email)/*){

                }
            }
        }
}*/
    
    

    e.preventDefault();
}

function checkName(name){
    let resp = false,
        tam = name.length,
        first = name.charAt(0);

    if(tam >= 3 && tam <= 15 && isNaN(first)){
        if(checkCad(name,tam,nameConditions)){
            resp = true;
            logmsg("nombre correcto");
        } 
        else console.log("Contiene letras que no forman parte del alfabeto inglés o no son números");
    }
    else 
        console.log("Nombre empieza por número o es menor que 3 o mayor que 15");
    return resp;
}

function checkPwd(pwd){
    let resp = false;
        tam = pwd.length;
    
    contMin = false;
    contMayus = false;

    log("tamaño de contraseña",tam);
    log("muestro contraseña",pwd);
    
    if(tam >= 6 && tam <= 15){
        if(checkCad(pwd,tam,pwdConditions)){
            if(contMin && contMayus){
                resp = true;
                logmsg("contraseña correcta");
            } 
            else console.log("Debe contener al menos una letra mayúscula y una letra minúscula")
        } 
        else console.log("Contiene letras que no forman parte del alfabeto inglés o no son números ni '-' ni '_'");
    }else
        console.log("Contraseña debe tener como mínimo 6 carácteres y como máximo 15");
    return resp;
}

function checkPwd2(pwd,pwd2){
    let resp = false;
    log("primera contraseña",pwd);
    log("segunda contraseña",pwd2);
    if(pwd == pwd2){
        logmsg("contraseñas son iguales");
        resp = true;
    } 
    else console.log("Contraseñas no son iguales");

    return resp;
}

function checkEmail(email){
    let resp = false,
        tam = email.length,
        local = "",
        separados = new Array(),
        subdominios = new Array();

    log("analizo este email",email);
    if(tam > 0){
        if(email.includes("@")){
            separados = email.split("@");
            local = separados[0];
            subdominios = separados[1].split(".");
            log("tengo este local",local);
            log("tengo este/estos subdominios",subdominios);
        }else console.log("No tiene formato de email (falta @)");
    }else console.log("Email está vacío");

    return resp;
}
/***************************************************************************************** */
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

function nameConditions(uni){
    let resp = true;
    if(!((uni >= CERO && uni <= NUEVE) || (uni >= A && uni <= Z) || (uni >= a && uni <= z))){
        logmsg("cáracter no forma parte del alfabeto inglés o no forma parte de números");
        resp = false;
    }
    return resp;
}

function pwdConditions(uni){
    let resp = true;

    resp = nameConditions(uni);
    if(resp){
        if(uni >= A && uni <= Z) contMayus = true;
        else contMin = true;
    }else
        if(uni == GUION || uni == BAR) resp = true;

    return resp;
}
/***************************************************************************************************************** */
function err(err){
    console.log("Error: " + err);
}


window.addEventListener("load",init);
