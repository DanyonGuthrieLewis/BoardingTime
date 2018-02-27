function changed(){
    var nose =  document.getElementById("nose").options[document.getElementById("nose").selectedIndex].value;
    var eye = document.getElementById("eye").options[document.getElementById("eye").selectedIndex].value;
    var mouth = document.getElementById("mouth").options[document.getElementById("mouth").selectedIndex].value;
    var color = document.getElementById("color").options[document.getElementById("color").selectedIndex].value;
    console.log(eye +"/"+ nose +"/"+ mouth +"/"+ color)
    document.getElementById("avat").src ="https://api.adorable.io/avatars/face/"+ eye +"/"+ nose +"/"+ mouth +"/"+ color ;
    document.getElementById("avatar_input").value ="https://api.adorable.io/avatars/face/"+ eye +"/"+ nose +"/"+ mouth +"/"+ color ;
}
var url ="https://api.adorable.io/avatars/face/"+ eye +"/"+ nose +"/"+ mouth +"/"+ color ;

function setSelectedValue(selector, item) {
    for(let i = 0; i < document.getElementById(selector).options.length; i++) {
        console.log(item)
        var compare = document.getElementById(item).value;
        if (document.getElementById(selector).options[i].value == compare) {
            document.getElementById(selector).selectedIndex = i;
            console.log(selector, i);
        }
    }
}

setSelectedValue("nose", "startNose");
setSelectedValue("mouth", "startMouth");
setSelectedValue("eye", "startEye");
setSelectedValue("color", "startColor");