var currentElement = null;
var timer;
var tooltipMode = false;
var darkmode = true;
var isActivated = true;

(function () {
    makeDomElement();
})();


if(isActivated){
    document.addEventListener('mouseover', function (e) {
        var x = e.clientX, y = e.clientY;
        var elementMouseIsOver = document.elementFromPoint(x, y);
    
        timer = window.setTimeout(function () {
            showCode(elementMouseIsOver, x, y);
        }, 2000);                                                                                     
    });

    document.addEventListener('mouseout', function (e) {
        window.clearTimeout(timer);
        if(isActivated && tooltipMode){
            hideCode();
        }
    });
}

function makeDomElement() {
    var container = document.createElement('span');
    container.id = "showcode-container";
    container.style.display = "inline-block";
    container.style.margin = "0";

    var span = document.createElement('span');
    span.id = "display-span";
    span.style.display = "none";
    setDisplayElementsStyle(span)

    container.appendChild(span);

    document.body.parentElement.insertBefore(container, document.body);
}

function showCode(dom, x, y) {
    console.log("Show");

    var displayDom = document.getElementById("display-span");
    var savecode =  document.getElementById('saved-code-panel');

    if(!tooltipMode){ 
        if(displayDom.innerHTML != "" && savecode != null){
            savecode.innerHTML = displayDom.innerHTML;
        }
    }
    displayDom.innerHTML = getBasicCSSText(dom);
    displayDom.style.display = "block";

    if(!tooltipMode){ 
        if (typeof(savecode) == 'undefined' || savecode == null){
            var savecodedom = document.createElement('span');
            savecodedom.id = "saved-code-panel";
            savecodedom.style.display = "block";
            
            setDisplayElementsStyle(savecodedom)
            savecodedom.style.border = "2px solid #461b7e";

            var container = document.getElementById("showcode-container");
            container.style.display = "grid";
            container.style.gridTemplateColumns = "auto auto";
            container.gridgap = "2px";

            container.appendChild(savecodedom);
        }
    }

    if(tooltipMode){
        displayDom.style.borderLeft = "6px solid green";
        displayDom.style.position = "fixed";
        displayDom.style.top = (y + 20) + 'px';
        displayDom.style.left = (x + 20) + 'px';
    } else {

        displayDom.style.top = '0px';
        displayDom.style.left = '0px';
    }
}

function getBasicCSSText(element) {
    // flexibility to let user choose
    var string = '';
    string += "Id:" + element.id;
    string += "\nClass:" + element.className;
    string += "\ndisplay:" + window.getComputedStyle(element).display;
    string += "\nposition:" + window.getComputedStyle(element).position;
    string += "\nbg-color:" + window.getComputedStyle(element).backgroundColor;
    string += "\nmargin:" + window.getComputedStyle(element).margin;
    string += "\npadding:" + window.getComputedStyle(element).padding;
    string += "\nheight:" + window.getComputedStyle(element).height;
    string += "\nwidth:" + window.getComputedStyle(element).width;
    var font = window.getComputedStyle(element).fontFamily;
    if(font.length > 35 ){
        font = font.substring(0,32)+"...";
    }
    string += "\nFont Family:" + font;
    string += "\nLine Height:" + window.getComputedStyle(element).lineHeight;
    string += "\nFont Size:" + window.getComputedStyle(element).fontSize;
    string += "\nFont Weight:" + window.getComputedStyle(element).fontWeight;
    string += "\nColor:" + window.getComputedStyle(element).color;
    string += "\nText Align:" + window.getComputedStyle(element).textAlign;
    string += "\nVertical Align:" + window.getComputedStyle(element).verticalAlign;
    string += "\nLine Height:" + window.getComputedStyle(element).lineHeight;
    string += "\nCssFloat:" + window.getComputedStyle(element).cssFloat;
    string += "\nZ-Index:" + window.getComputedStyle(element).zIndex;
    return string;
}

function lineFactory(title, value){
    return "<span class='showCodeXTitle' style:''>title</span>: <span class='showCodeXValue' style:''>value";
}

function hideCode() {
    console.log("Hide");
    var displayDom = document.getElementById("display-span");
    displayDom.innerText = '';
    displayDom.style.display = "none";
}

function whiteListProcess(){
    var currentDomain = {};
    currentDomain.domain = document.domain;
      // Get a value saved in a form.
    var theValue = textarea.value;
    // Check that there's some code there.
    if (!theValue) {
        message('Error: No value specified');
        return;
    }
    chrome.storage.local.get('whiteList', function (result) {
        var whiteList = result.whiteList;
        whiteList.push(currentDomain);
        // Save it using the Chrome extension storage API.
        chrome.storage.sync.set({'whiteList': whiteList}, function() {
            // Notify that we saved.
            message('Settings saved');
        });
    });
   
}

function setDisplayElementsStyle(span) {
    span.style.overflow = "hidden";
    span.style.backgroundColor = "#313235";
    span.style.color = "white";
    span.style.padding = "7px";
    span.style.fontSize = "10px";
    span.style.fontFamily = "Menlo, Consolas, DejaVu Sans Mono, monospace";
    span.style.opacity = "1";
    span.style.transition = "all 0.3s ease-in-out";
    span.style.wordWrap = "break-word";
    span.style.whiteSpace = "pre-wrap";
    span.style.wordBreak = "normal";
    span.style.zIndex = "9999";
}