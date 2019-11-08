/*
* Fichero javascript de la práctica 6. 
* Autores: Rafael Bayón, Santiago López
*/

/*metodo de log*/
function log(msg,ele){
    console.log("#######################");
    console.log(msg + ": " + ele);
    console.log("");
}

/* VARIABLES GLOBALES */

/*registro*/
var contMayus = 0;
var hasMin = false;
var hasMayus = false;
var contPoint = false;

/*álbum*/
var col = 6;
var rows = 15;

var alerta = "";

/* MÉTODOS  */

/************************************* CHECKLOGIN **********************************/

function initLG(){
    let form = document.querySelector("form");    
    form.addEventListener("submit",iniciarsesion);
}

function iniciarsesion(e){
    var log = document.getElementById("login").value;
    var pass = document.getElementById("psw").value;
    var resp = false;
   
    if(!log || !pass)
        mensajeModal1();
    else{
        for(let i = 0; i < log.length; i++){
            if(!loginConditions(log.charAt(i))){
                resp = true;
                break;
            }    
        }

        if(resp){
            resp = false;
            for(let i = 0; i < pass.length; i++){
                if(!loginConditions(pass.charAt(i))){
                    resp = true;
                    break;
                }  
            }
        }
        if(!resp) mensajeModal2();
    }
   if(!resp) e.preventDefault();
}

function mensajeModal1(){
    let titulo, texto, div, html;

       titulo = 'Mensaje de error';
       texto = 'Debes rellenar todos los campos para poder acceder';

       div = document.createElement('div');
       div.classList.add('capa-fondo');

       html = '<article>';
       html += '<h2>' + titulo + '</h2>';
       html += '<p>' + texto + '</p>';
       html += '<button onclick="cerrarLogin();">Aceptar</button>';
       html += '</article>';

        div.innerHTML = html;

        document.body.appendChild(div);
}

function mensajeModal2(){
    let titulo, texto, div, html;

       titulo = 'Mensaje de error';
       texto = 'No esta permitido escribrir espacios en blanco en los campos';

       div = document.createElement('div');
       div.classList.add('capa-fondo');

       html = '<article>';
       html += '<h2>' + titulo + '</h2>';
       html += '<p>' + texto + '</p>';
       html += '<button onclick="cerrarLogin();">Aceptar</button>';
       html += '</article>';

        div.innerHTML = html;

        document.body.appendChild(div);
}

function cerrarLogin(){
    document.querySelector('.capa-fondo').remove();
    location.href="login.html";
}

/************************************* CHECKFORM **********************************/
//selecciona formulario y lo pone a la escucha del evento checkForm
function initRG(){
    let form = document.querySelector("form");    
    form.addEventListener("submit",checkForm);
}

//selecciona elementos del formulario, y realiza comprobación de cada uno (prevent default detiene el evento)
function checkForm(e){
    let form = e.target,
        nombre = form.nombre.value,
        pwd = form.pwd.value,
        pwd2 = form.pwd2.value,
        email = form.mail.value,
        sexo = form.sexo.value,
        fecha = form.fecha.value,
        resp = true;

    alerta = "";

    if(!checkName(nombre)) resp = false;
    if(!checkPwd(pwd)) resp = false;;
    if(!checkPwd2(pwd,pwd2)) resp = false;;
    if(!checkEmail(email)) resp = false;;
    if(!sexo){
        alerta+="·Debe especificar el sexo.\n";
        resp = false;
    }
    if(!checkDate(fecha)) resp = false;;

    if(resp) alerta += "·Información introducida correctamente."
    alert(alerta);

    if(!resp) e.preventDefault();
}

//comprueba el campo del nombre
function checkName(name){
    let resp = false,
        tam = name.length,
        first = name.charAt(0);

    if(tam >= 3 && tam <= 15 && isNaN(first)){
        if(checkCad(name,tam,nameConditions)) resp = true;
        else alerta += "·Usuario Incorrecto: Contiene letras que no forman parte del alfabeto inglés o no son números\n";
    }
    else alerta += "·Usuario Incorrecto: Usuario empieza por número o es menor que 3 o mayor que 15\n";
    return resp;
}

//comprueba el campo del password
function checkPwd(pwd){
    let resp = false;
        tam = pwd.length;
    
    hasMin = false;
    hasMayus = false;
    console.log(tam);
    if(tam >= 6 && tam <= 15){
        if(checkCad(pwd,tam,pwdConditions)){
            if(hasMin && hasMayus) resp = true; 
            else alerta += "·Contraseña Incorrecta: Debe contener al menos una letra mayúscula y una letra minúscula\n";
        } 
        else alerta += "·Contraseña Incorrecta: Contiene letras que no forman parte del alfabeto inglés o no son números ni '-' ni '_'\n";
    }else alerta += "·Contraseña Incorrecta: Contraseña debe tener como mínimo 6 carácteres y como máximo 15\n";
    return resp;
}

//comprueba que la contraseña·ón sea igual que la introducida previamente
function checkPwd2(pwd,pwd2){
    let resp = false;

    if(pwd == pwd2 && pwd2.length > 0) resp = true;
    else alerta += "·Contraseña Confirmación Incorrecta: Contraseñas no son iguales\n";

    return resp;
}

//comprueba que el email sea correcto, para ello comprueba nombre local y dominio
function checkEmail(email){
    let resp = false,
        tam = email.length,
        local = "",
        elementos = new Array(),
        subdominios = new Array();

    if(tam > 0){
        if(email.includes("@")){
            elementos = email.split("@");
            if(elementos.length == 2){
                local = elementos[0];
                subdominios = elementos[1].split(".");            
                if(checkLocal(local)) resp = checkDominio(subdominios);
            } else alerta += "·Email incorrecto: No tiene formato correcto (nombrelocal@dominio)\n";
        }else alerta += "·Email Incorrecto: No tiene formato de email (falta @)\n";
    }else alerta += "·Email Incorrecto: Email está vacío\n";

    return resp;
}

//comprueba el nombre local 
function checkLocal(local){
    let resp = false;
        tam = local.length;
    
    contPoint = 0;

    if(tam > 0 && tam <= 64){
        if(local.charAt(0)!="." && local.charAt(tam-1)!=".")
            resp = checkCad(local,tam,localConditions);
        else alerta += "·Email Incorrecto: No puede haber un punto ni al principio ni al final del nombre local\n";
    } else alerta += "·Email Incorrecto: Está vacío o tamaño superior a 64\n";

    return resp;
}

//comprueba que los dominios sean correctos
function checkDominio(dominio){
    let resp = false;
        tam = dominio.length,
        subdominio = "";

    if(tam > 0){
        for(let i = 0; i < tam; i++){
            subdominio = dominio[i];
            tamsub = subdominio.length;
            if(tamsub > 0 && tamsub <= 63){
                if(subdominio.charAt(0) != "-" && subdominio.charAt(tamsub-1) != "-"){
                    resp = checkCad(subdominio,tamsub,domConditions);
                    if(!resp) break;
                }else alerta += "·Email Incorrecto: No puede haber un '-' ni al principio ni al final del subdominio\n";
            }else alerta += "·Email Incorrecto: Tamaño de subdominio es 0 o mayor que 63\n";   
        }
    }else alerta += "·Email Incorrecto: No hay dominio\n";

    return resp;
}

//comprueba que la fecha sea correcta
function checkDate(date){
    let resp = false,
        elementos = date.split("/"),
        tam = elementos.length,
        currentYear = new Date().getFullYear(),
        limitYear = currentYear - 150;
        day = "",
        month = "",
        year = "";

    if(tam == 3){
        day = elementos[0];
        month = elementos[1];
        year = elementos[2];

        if(month == 2){
            if (isLeapYear(year)) resp = checkDigits(day,1,29);
            else resp = checkDigits(day,1,getLimitMonth(month));
        }else 
            resp = checkDigits(day,1,getLimitMonth(month));

        if(resp){
            if(checkDigits(month,1,12)){
                resp = checkDigits(year,limitYear,currentYear);
                if(!resp) alerta += "·Fecha Incorrecta: Año incorrecto\n";
            } 
            else alerta += "·Fecha Incorrecta: Mes incorrecto\n";
        }else alerta += "·Fecha Incorrecta: Día incorrecto\n";        
    }else alerta += "·Fecha Incorrecta: Formato: dd/mm/yyyy\n";

    return resp;
}

//comprueba que los numeros esten dentro del rango
function checkDigits(num,min,max){
    let resp = false;
    if(num >= min && num <= max) resp = true;

    return resp;
}

/*-----------------------------------------------------------------------------------*/

//recorre la cadena recibida, y para cada carácter ejecuta la función recibida, 
//que dicha función se encargará de hacer las comprobaciones correspondientes
function checkCad(cad,tam,fnc){
    let resp = true,
        char = "";

    for(let i = 0; i < tam; i++){
        char = cad.charAt(i);
        if(!fnc(char)){
            resp = false;
            break;
        }
    }
    return resp;
}

//condiciones del login,no puede tener solo espacios(32) ni solo tabuladores(9)
function loginConditions(char){
    let resp = false,
        uni = char.charCodeAt();

    if(uni == 32 || uni == 9)
        resp = true;

    return resp;
}

//condiciones del nombre, dentro del alfabeto inglés o número
function nameConditions(char){
    let resp = false;
    if((char >= "0" && char <= "9") || (char >= "A" && char <= "Z") || (char >= "a" && char <= "z"))
        resp = true;

    return resp;
}

//condiciones de la contraseña, dentro del alfabeto inglés o número,'-','_', mínimo 1 min. 1 may.
function pwdConditions(char){
    let resp = true;

    resp = nameConditions(char);
    if(resp){
        if(char >= 'A' && char <= 'Z') hasMayus = true;
        else if(char >= 'a' && char <= 'z') hasMin = true;
    }else
        if(char == '-' || char == '_') resp = true;

    return resp;
}

//condiciones del nombre local, alfabeto ingles, números, diferentes símbolos, no puntos seguidos
function localConditions(char){
    let resp = true,
        symbols = getSymbols();

    resp = pwdConditions(char);
    
    if(!resp){
        for(let i = 0; i < symbols.length; i++){
            if(char == symbols[i]){ 
                if(char == ".") contPoint++;
                else contPoint = 0;
                if(contPoint != 2) resp = true;
                else alerta += "·Email Incorrecto: No pueden haber dos puntos seguidos.\n";
                break; 
            }
        }
        if(!resp) alerta += "·Email Incorrecto: Contiene letras que no forman parte del alfabeto inglés,no son números o no pertenecen a los símbolos permitidos (!,#,$,%,&,',*,+,/,=,?,^,`,{,},|,~,.)\n";
    }

    return resp;
}

//condiciones del dominio, alfabeto ingles, números , guión, guión no al principio
function domConditions(char){
    let resp = false;

    resp = nameConditions(char);

    if(!resp){
        if(char == "-") resp = true;
    }
    if(!resp) alerta += "·Email Incorrecto: El cáracter no pertenece al alfabeto ingés o no es un '-'.\n";

    return resp;
}
/******************************* auxiliares ******************************************************++*/

//devuelve los símbolos permitidos en email
function getSymbols(){
    let symbols = ["!","#","$","%","&","'","*","+","/","=","?","^","`","{","}","|","~","."];
    return symbols;
}

//comprueba si el año es bisiesto
function isLeapYear(year){
    let resp = false;
    if((year%4) == 0) resp = true;

    return resp;
}

//comprueba los días que tiene un mes
function getLimitMonth(month){
    let array = [31,28,31,30,31,30,31,31,30,31,30,31],
        resp = array[month-1];

    return resp;
}

/*************************************************** SOLICITAR ÁLBUM ************************************************************** */


function insertTable(){
    let main = document.querySelector("main"),
        table;

    table = heading(main);
    rellenar(table);
}

//inserta encabezado
function heading(main){
    let newTable = document.createElement("table"),
        newCaption = document.createElement("caption"),
        newThead = document.createElement("thead"),
        newTr1 = document.createElement("tr"),
        newTr2 = document.createElement("tr"),
        txtCaption = document.createTextNode("Precios de impresión"),
        txtTh1 = document.createTextNode("Blanco y negro"),
        txtTh2 = document.createTextNode("Color"),
        subTxts = ["Número de páginas","Número de fotos","150-300 dpi","450-900 dpi","150-300 dpi","450-900 dpi"];


        main.appendChild(newTable);
        newTable.appendChild(newCaption);
        newCaption.appendChild(txtCaption);
        newTable.appendChild(newThead);
        newThead.appendChild(newTr1);
        newThead.appendChild(newTr2);


        for(let i = 0; i < 4; i++){
            let newTh = document.createElement("th");
            newTr1.appendChild(newTh);
            if(i == 2){
                newTh.appendChild(txtTh1);
                newTh.setAttribute("colspan","2");
            } else if(i == 3){
                newTh.appendChild(txtTh2);
                newTh.setAttribute("colspan","2");
            }
        }

        for(let i = 0; i < col; i++){
            let newTh = document.createElement("th");
            let txt = document.createTextNode(subTxts[i]);  
            newTh.appendChild(txt);          
            newTr2.appendChild(newTh);
        }

    return newTable;
}

//rellena la tabla
function rellenar(table){
    let saltPag = 1,
        saltFot = 3,
        numPag = 0,
        numFot = 0,
        newTbody = document.createElement("body");
    
    table.appendChild(newTbody);
    
    for(let i = 0; i < rows; i++){
        let newTr = document.createElement("tr");
        table.appendChild(newTr);
        numPag += saltPag;
        numFot += saltFot;
        for(let j = 0; j < col; j++){
            let newTd = document.createElement("td");
            let txt = writeTxt(j,numPag,numFot);
            let newTxt = document.createTextNode(txt);
            newTd.appendChild(newTxt);
            newTr.appendChild(newTd);
        }
    }
}

//especifica cual será el contenido de cada celda
function writeTxt(j,numPag,numFot){
    let resp;

    switch(j){
        case 0:
            resp = numPag;
        break;
            
        case 1:
            resp = numFot;
        break;
       
        case 2:
            resp = (getPrice(numPag,numFot,false,150)).toFixed(2);
        break;

        case 3:
            resp = (getPrice(numPag,numFot,false,400)).toFixed(2);
        break;
        
        case 4:
            resp = (getPrice(numPag,numFot,true,150)).toFixed(2);
        break;

        case 5:
            resp = (getPrice(numPag,numFot,true,400)).toFixed(2);
        break;
    }
    return resp;
}

//calcula el precio 
function getPrice(numPags,numFotos,color,resol){
    let resp = 0,
        precPag = 0,
        precColor = 0,
        precResol = 0,
        precPagTot = 0;

    for( let i = 1; i <= numPags; i++){
        if(i < 5) precPag = 0.1;
        else if(i <= 11) precPag = 0.08;
        else precPag = 0.07;

        precPagTot += precPag;
    }

    if(color) precColor = 0.05;

    if(resol > 300) precResol = 0.02;

    resp = precPagTot + (numFotos * precColor) + (numFotos * precResol);

    return resp;
}