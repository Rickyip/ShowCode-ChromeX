var currentElement = null;
var timer;

(function () {
    makeTooltipElement();
})();

document.addEventListener('mouseover', function (e) {
    var x = e.clientX, y = e.clientY;
    var elementMouseIsOver = document.elementFromPoint(x, y);

    timer = window.setTimeout(function () {
        showCode(elementMouseIsOver, x, y);
    }, 2000);
});

document.addEventListener('mouseout', function (e) {
    window.clearTimeout(timer);
    hideCode();
});

function makeTooltipElement() {
    var span = document.createElement('span');
    span.id = "tooltip-span";
    span.style.display = "none";
    document.body.appendChild(span);
}

function showCode(dom, x, y) {
    console.log("Show");

    var tooltip = document.getElementById("tooltip-span");
    tooltip.innerHTML = getBasicCSSText(dom);
    tooltip.style.display = "block";
    tooltip.style.position = "fixed";
    tooltip.style.overflow = "hidden";
    tooltip.style.backgroundColor = "#313235";
    tooltip.style.color = "white";
    tooltip.style.padding = "7px";
    tooltip.style.fontSize = "7px";
    tooltip.style.fontFamily = "Menlo, Consolas, DejaVu Sans Mono, monospace";
    tooltip.style.opacity = "1";
    tooltip.style.borderLeft = "6px solid ";
    tooltip.style.transition = "all 0.3s ease-in-out";
    tooltip.style.wordWrap = "break-word";
    tooltip.style.whiteSpace = "pre-wrap";
    tooltip.style.wordBreak = "normal";
    tooltip.style.zIndex = "9999";

    tooltip.style.top = (y + 20) + 'px';
    tooltip.style.left = (x + 20) + 'px';
}

function getBasicCSSText(element) {
    var string = '';
    string += "Element id:" + element.id;
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
    string += "\nfontFamily:" + font;
    string += "\nlineHeight:" + window.getComputedStyle(element).lineHeight;
    string += "\nfontSize:" + window.getComputedStyle(element).fontSize;
    string += "\nfontWeight:" + window.getComputedStyle(element).fontWeight;
    string += "\ncolor:" + window.getComputedStyle(element).color;
    string += "\ncssFloat:" + window.getComputedStyle(element).cssFloat;
    string += "\nzIndex:" + window.getComputedStyle(element).zIndex;
    return string;
}

function lineFactory(title, value){
    return "<span class='title' style:''"
}

function hideCode() {
    console.log("Hide");
    var tooltip = document.getElementById("tooltip-span");
    tooltip.innerText = '';
    tooltip.style.display = "none";
}
