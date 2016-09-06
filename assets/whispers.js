function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len;
    }
    return result;
}

function gen() {
    lang_map = {"af":"Afrikaans", "ga":"Irish", "sq":"Albanian", "it":"Italian", "ar":"Arabic", "ja":"Japanese", "az":"Azerbaijani", "kn":"Kannada", "eu":"Basque", "ko":"Korean", "bn":"Bengali", "la":"Latin", "be":"Belarusian", "lv":"Latvian", "bg":"Bulgarian", "lt":"Lithuanian", "ca":"Catalan", "mk":"Macedonian", "zh-CN":"SimplifiedChinese", "ms":"Malay", "zh-TW":"TraditionalChinese", "mt":"Maltese", "hr":"Croatian", "no":"Norwegian", "cs":"Czech", "fa":"Persian", "da":"Danish", "pl":"Polish", "nl":"Dutch", "pt":"Portuguese", "en":"English", "ro":"Romanian", "eo":"Esperanto", "ru":"Russian", "et":"Estonian", "sr":"Serbian", "tl":"Filipino", "sk":"Slovak", "fi":"Finnish", "sl":"Slovenian", "fr":"French", "es":"Spanish", "gl":"Galician", "sw":"Swahili", "ka":"Georgian", "sv":"Swedish", "de":"German", "ta":"Tamil", "el":"Greek", "te":"Telugu", "gu":"Gujarati", "th":"Thai", "ht":"CreoleHaitian", "tr":"Turkish", "iw":"Hebrew", "uk":"Ukrainian", "hi":"Hindi", "ur":"Urdu", "hu":"Hungarian", "vi":"Vietnamese", "is":"Icelandic", "cy":"Welsh", "id":"Indonesian", "yi":"Yiddish"}
    var langs = ["af", "ga", "sq", "it", "ar", "ja", "az", "kn", "eu", "ko", "bn", "la", "be", "lv", "bg", "lt", "ca", "mk", "zh-CN", "ms", "zh-TW", "mt", "hr", "no", "cs", "fa", "da", "pl", "nl", "pt", "ro", "eo", "ru", "et", "sr", "tl", "sk", "fi", "sl", "fr", "es", "gl", "sw", "ka", "sv", "de", "ta", "el", "te", "gu", "th", "ht", "tr", "iw", "uk", "hi", "ur", "hu", "vi", "is", "cy", "id", "yi"];

    langs = ["en"].concat(getRandom(langs.concat(langs), parseInt(document.getElementById("trans").value) - 1)).concat(["en"])
    console.log(langs);
    str = document.getElementById('input').value

    var i = 1;

    var node = document.getElementById("tlist");
    while(node.hasChildNodes())
        node.removeChild(node.lastChild);

    var intervalID = setInterval(function() {
        var li = document.createElement("li");
        li.setAttribute("class", "mdl-list__item mdl-list__item--two-line");

        ospan = document.createElement("span");
        ospan.setAttribute("class", "mdl-list__item-primary-content");

        var io = document.createElement("i");
        io.setAttribute("class", "material-icons mdl-list__item-avatar");
        io.setAttribute("style", "color: #fff; background: #442197; display: flex; justify-content: center;");
        io.appendChild(document.createTextNode(i));
        ospan.appendChild(io);

        var ispan = document.createElement("span");
        ispan.appendChild(document.createTextNode("\"" + str + "\""))
        ospan.appendChild(ispan);

        var ilan = document.createElement("span");
        ilan.appendChild(document.createTextNode(lang_map[langs[i - 1]]));
        ilan.setAttribute("class", "mdl-list__item-sub-title");
        ospan.appendChild(ilan);

        li.appendChild(ospan);
        document.getElementById("tlist").appendChild(li);

        $(li).hide().fadeIn(500);

        console.log(i);
        console.log(lang_map[langs[i - 1]] + ": " + str);

        if(i < langs.length) {
            url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + langs[i - 1] + "&tl=" + langs[i] + "&hl=en-us&dt=t&dt=bd&dj=1&source=input&tk=200500.294831&q=" + encodeURI(str);
            i++;
            str = JSON.parse(httpGet(url)).sentences[0].trans;
        }
        else
            window.clearInterval(intervalID);
    }, 1500);
}

window.onload = function() {
    document.getElementById("input")
        .addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode == 13) {
            gen();
        }
    });
}

function showMessage(value){
    document.getElementById("message").innerHTML = "Number of translations: " + (value < 10? "0" + value : value);
}
