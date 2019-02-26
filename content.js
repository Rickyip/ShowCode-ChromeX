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
    // TODO make the elements at start for panel mode
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
        var lock = document.getElementById("lock-switch");
        if(displayDom.innerHTML != "" && savecode != null && lock != null){
            if(!lock.checked){
                savecode.innerHTML = displayDom.innerHTML;
                savecode.innerHTML += getLockHTML();
            }
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
            savecodedom.innerHTML = getLockHTML();

            var container = document.getElementById("showcode-container");
            container.style.display = "grid";
            container.style.gridTemplateColumns = "50% 50%";
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
    // TODO flexibility to let user choose
    var string = '';
    string += "Id:" + element.id;
    string += "\nClass:" + element.className;
    string += lineFactory(true, "display", window.getComputedStyle(element).display);
    string += lineFactory(true, "position", window.getComputedStyle(element).position);
    string += lineFactory(true, "backgroundColor", window.getComputedStyle(element).backgroundColor);
    string += lineFactory(true, "margin", window.getComputedStyle(element).margin);
    string += lineFactory(true, "padding", window.getComputedStyle(element).padding);
    string += lineFactory(true, "height", window.getComputedStyle(element).margheightin);
    string += lineFactory(true, "width", window.getComputedStyle(element).width);
    var font = window.getComputedStyle(element).fontFamily;
    if(font.length > 35 ){
        font = font.substring(0,32)+"...";
    }
    string += "\nFont Family:" + font;
    string += lineFactory(true, "lineHeight", window.getComputedStyle(element).lineHeight);
    string += lineFactory(true, "fontSize", window.getComputedStyle(element).fontSize);
    string += lineFactory(true, "fontWeight", window.getComputedStyle(element).fontWeight);
    string += lineFactory(true, "color", window.getComputedStyle(element).color);
    string += lineFactory(true, "textAlign", window.getComputedStyle(element).textAlign);
    string += lineFactory(true, "verticalAlign", window.getComputedStyle(element).verticalAlign);
    string += lineFactory(true, "lineHeight", window.getComputedStyle(element).lineHeight);
    string += lineFactory(true, "cssFloat", window.getComputedStyle(element).cssFloat);
    string += lineFactory(true, "zIndex", window.getComputedStyle(element).zIndex);
    return string;
}

function lineFactory(newline, title, value){
    var newlineChar = newline ? "<br>" : "";
    return newlineChar+"<span class='showCodeXTitle' style:''>"+title+"</span>: <span class='showCodeXValue' style:''>"+value+"</span>";
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

function getLockHTML(){
    return '<input type="checkbox" id="lock-switch" /><label id="lock-code" for="lock-switch" ></label> <style>#lock-code,#lock-switch{top:7px;right:21px;position:absolute}#lock-switch{height:0;width:0;visibility:hidden;display:inline}#lock-code{cursor:pointer;text-indent:-9999px;width:36px;height:18px;background:grey;display:inline-block;border-radius:18px}#lock-code:after{content:"";position:absolute;top:1px;left:1px;width:16px;height:16px;background:#fff;border-radius:16px;transition:.3s}#lock-switch:checked+#lock-code{background:#bada55}#lock-switch:checked+#lock-code:after{left:calc(100% - 1px);transform:translateX(-100%)}#lock-code:active:after{width:18px}</style>';
}