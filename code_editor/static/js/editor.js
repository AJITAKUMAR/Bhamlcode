
const iframe = document.querySelector("iframe");
const btn = document.querySelector("button");

editor.on("change", () => {
  var html = editor.getValue();
  Object.keys(dictionary).forEach(function(key) {
    html = html.replaceAll(key, dictionary[key]);
    });
  iframe.src = "data:text/html;charset=utf-8," + encodeURIComponent(html);
});

const onCursorActivity = (instance) => {
    const cursor = editor.getCursor();
    document.getElementById('currentLine').innerHTML = cursor.line+1;
  }
  

editor.on("cursorActivity", onCursorActivity);

    function saveFileAsHTML(){
    var p_lang = document.getElementById("prog_lang");
    var prog_lang = p_lang.options[p_lang.selectedIndex].value;
    if(prog_lang == 'css'){
//    fileNameToSaveAs = fileNameToSaveAs + '.css'
    }else{
//    fileNameToSaveAs = fileNameToSaveAs + '.bhaml'

    var textToWrite = editor.getValue();
    Object.keys(dictionary).forEach(function(key) {
    textToWrite = textToWrite.replaceAll(key, dictionary[key]);
    });
    var textFileAsBlob = new Blob([textToWrite], {type:'text/html'});
    var e = document.getElementById("language");
    var fileNameToSaveAs = e.options[e.selectedIndex].text;
    fileNameToSaveAs = fileNameToSaveAs + '.html'
    var browserName=navigator.appName;
    if (browserName=="Microsoft Internet Explorer")
    {
    window.navigator.msSaveBlob(textFileAsBlob, fileNameToSaveAs );
    }
    else
    {
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null)
    {
    // Chrome allows the link to be clicked
    // without actually adding it to the DOM.
    downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else
    {
    // Firefox requires the link to be added to the DOM
    // before it can be clicked.
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    }

    downloadLink.click();
    }
    }
}
function saveFileAsBHAML(){
    var textToWrite = editor.getValue();
    var textFileAsBlob = new Blob([textToWrite], {type:'text'});
    var e = document.getElementById("language");
    var fileNameToSaveAs = e.options[e.selectedIndex].text;
    var p_lang = document.getElementById("prog_lang");
    var prog_lang = p_lang.options[p_lang.selectedIndex].value;
    if(prog_lang == 'css'){
    fileNameToSaveAs = fileNameToSaveAs + '.css'
    }else{
    fileNameToSaveAs = fileNameToSaveAs + '.bhaml'
    }

    var browserName=navigator.appName;
    if (browserName=="Microsoft Internet Explorer")
    {
    window.navigator.msSaveBlob(textFileAsBlob, fileNameToSaveAs );
    }
    else
    {
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null)
    {
    // Chrome allows the link to be clicked
    // without actually adding it to the DOM.
    downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else
    {
    // Firefox requires the link to be added to the DOM
    // before it can be clicked.
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    }

    downloadLink.click();
    }
}

    function destroyClickedElement(event)
    {
        document.body.removeChild(event.target);
    }

    function loadFileAsText(){
    var fileName = document.getElementById('fileToLoad').value.toLowerCase();
    if(!(fileName.endsWith('.bhaml'))){
        var e = document.getElementById("language");
        var dropdownLang = e.options[e.selectedIndex].text;
        if(dropdownLang.toLowerCase() == "hindi"){
            alert('कृपया .bhaml फ़ाइल अपलोड करें');
        }
        else if(dropdownLang.toLowerCase() == "marathi"){
            alert('कृपया .bhaml फाईल अपलोड करा');
        }
        else if(dropdownLang.toLowerCase() == "gujarati"){
            alert('કૃપા કરીને .bhaml ફાઇલ અપલોડ કરો');
        }
        else if(dropdownLang.toLowerCase() == "malayalam"){
            alert('ദയവായി .bhaml ഫയൽ അപ്‌ലോഡ് ചെയ്യുക');
        }
        else if(dropdownLang.toLowerCase() == "kannada"){
            alert('ದಯವಿಟ್ಟು .bhaml ಫೈಲ್ ಅನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ');
        }
        else if(dropdownLang.toLowerCase() == "odia"){
            alert('ଦୟାକରି .bhaml ଫାଇଲ୍ ଅପଲୋଡ୍ କରନ୍ତୁ |');
        }
        else if(dropdownLang.toLowerCase() == "punjabi"){
            alert('ਕਿਰਪਾ ਕਰਕੇ .bhaml ਫਾਈਲ ਅਪਲੋਡ ਕਰੋ');
        }
        else if(dropdownLang.toLowerCase() == "tamil"){
            alert('.bhaml கோப்பை பதிவேற்றவும்ਕਿਰਪਾ ਕਰਕੇ .bhaml ਫਾਈਲ ਅਪਲੋਡ ਕਰੋ');
        }
        else if(dropdownLang.toLowerCase() == "telugu"){
            alert('దయచేసి .bhaml ఫైల్‌ని అప్‌లోడ్ చేయండి');
        }
        return false;
    }
    var fileToLoad = document.getElementById("fileToLoad").files[0];
     var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent)
    {
        var textFromFileLoaded = fileLoadedEvent.target.result;
        var file_language= textFromFileLoaded.split('\n')[0].split(' ')[4].split(')')[0]
        var e = document.getElementById("language");
        var dropdown = e.options[e.selectedIndex].text;

        var ddlArray= new Array();
        for (i = 0; i < e.options.length; i++) {

           ddlArray[i] = e .options[i].value.split('/')[2];


        }
        if(file_language.toLowerCase() == ''){
            alert("Please check the file");
            return false;
        }
        for(i=0; i<=ddlArray.length; i++){

        if(ddlArray[i] !== undefined){
            if(ddlArray[i].toLowerCase() == file_language.toLowerCase()){
            break;
            }
        }
        
        if(i==ddlArray.length){
            alert("Please check the file, Language not known");
            return false;
            }
        }

        if(file_language.toLowerCase() != dropdown.toLowerCase()){
            if(file_language.toLowerCase() == "hindi"){
                alert("कृपया भाषा चयन को हिंदी में बदलें");
            }
            else if(file_language.toLowerCase() == "marathi"){
                alert("कृपया भाषा निवड मराठीत बदला");
            }
            else if(file_language.toLowerCase() == "gujarati"){
                alert("કૃપા કરીને ભાષા પસંદગી બદલો ગુજરાતી");
            }
            else if(file_language.toLowerCase() == "malayalam"){
                alert("ഭാഷാ തിരഞ്ഞെടുപ്പ് മലയാളത്തിലേക്ക് മാറ്റുക");
            }
            else if(file_language.toLowerCase() == "kannada"){
                alert("ದಯವಿಟ್ಟು ಭಾಷೆಯ ಆಯ್ಕೆಯನ್ನು ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಿ");
            }
            else if(file_language.toLowerCase() == "odia"){
                alert("ଦୟାକରି ଭାଷା ଚୟନକୁ ଓଡିଆରେ ପରିବର୍ତ୍ତନ କରନ୍ତୁ |");
            }
            else if(file_language.toLowerCase() == "punjabi"){
                alert("ਕਿਰਪਾ ਕਰਕੇ ਭਾਸ਼ਾ ਦੀ ਚੋਣ ਨੂੰ ਪੰਜਾਬੀ ਵਿੱਚ ਬਦਲੋ");
            }
            else if(file_language.toLowerCase() == "telugu"){
                alert("దయచేసి భాష ఎంపికను తెలుగులోకి మార్చండి");
            }
            else if(file_language.toLowerCase() == "tamil"){
                alert("மொழி தேர்வை தமிழுக்கு மாற்றவும்");
            }
         return false;
        }else{
         editor.setValue(textFromFileLoaded);
        }
    };
    fileReader.readAsText(fileToLoad, "UTF-8");
}

function lang_change(value){
    //This function changes question to each regional language
    if(value == '/code_editor/hindi/'){
        if (confirm('क्या आप वाकई भाषा बदलना चाहते हैं ?')){
        location = '/code_editor/hindi/';
        }else {select_first_language()}
    }
    else if(value == '/code_editor/gujarati/'){
        if (confirm('શું તમે ખરેખર ભાષા બદલવા માંગો છો ?')){
        location = '/code_editor/gujarati/';
        }else {select_first_language()}
    }
    else if(value == '/code_editor/punjabi/'){
        if (confirm('ਕੀ ਤੁਸੀਂ ਯਕੀਨਨ ਭਾਸ਼ਾ ਨੂੰ ਬਦਲਣਾ ਚਾਹੁੰਦੇ ਹੋ ?')){
        location = '/code_editor/punjabi/';
        }else {select_first_language()}
    }
    else if(value == '/code_editor/malayalam/'){
        if (confirm('ഭാഷ മാറ്റണമെന്ന് തീർച്ചയാണോ ?')){
        location = '/code_editor/malayalam/';
        }else {select_first_language()}
    }
    else if(value == '/code_editor/kannada/'){
        if (confirm('ನೀವು ಭಾಷೆಯನ್ನು ಬದಲಾಯಿಸಲು ಖಚಿತವಾಗಿ ಬಯಸುವಿರಾ ?')){
        location = '/code_editor/kannada/';
        }else {select_first_language()}
    }
    else if(value == '/code_editor/tamil/'){
        if (confirm('நிச்சயமாக மொழியை மாற்ற விரும்புகிறீர்களா ?')){
        location = '/code_editor/tamil/';
        }else {select_first_language()}
    }
    else if(value == '/code_editor/telugu/'){
        if (confirm('మీరు ఖచ్చితంగా భాషను మార్చాలనుకుంటున్నారా ?')){
        location = '/code_editor/telugu/';
        }else {select_first_language()}
    }
    else if(value == '/code_editor/marathi/'){
        if (confirm('तुम्हाला खात्री आहे की तुम्ही भाषा बदलू इच्छिता ?')){
        location = '/code_editor/marathi/';
        }else {select_first_language()}
    }
    else if(value == '/code_editor/odia/'){
        if (confirm('ଆପଣ ନିଶ୍ଚିତ କି ଆପଣ ଭାଷା ପରିବର୍ତ୍ତନ କରିବାକୁ ଚାହୁଁଛନ୍ତି କି ?')){
        location = '/code_editor/odia/';
        }else {select_first_language()}
    }
    else if(value == '/code_editor/bangla/'){
      if (confirm('আপনি কি নিশ্চিত আপনি ভাষা পরিবর্তন করতে চান?')){
        location = '/code_editor/bangla/';
      }else {select_first_language()}
    }
}

function doc_download(){
    var temp_doc = document.getElementById("document-lang");
    var doc = temp_doc.options[temp_doc.selectedIndex].text;
    var temp_programming = document.getElementById("programming-lang");
    var programming = temp_programming.options[temp_programming.selectedIndex].text;
    if(doc == "हिंदी (Hindi)"){
        if(programming == "HTML"){
            location.href = "../../static/documentation/BHAML (HINDI).pdf";
        }
        else if(programming == "CSS"){
            alert(doc);
            alert(programming);
        }
    }
    else if(doc == "ગુજરાતી (Gujarati)"){
        if(programming == "HTML"){
            location.href = "../../static/documentation/BHAML (Gujarati).pdf";
        }
        else if(programming == "CSS"){
            alert(doc);
            alert(programming);
        }
    }
    else if(doc == "ಕನ್ನಡ (Kannada)"){
        if(programming == "HTML"){
            location.href = "../../static/documentation/BHAML (Kannada).pdf";
        }
        else if(programming == "CSS"){
//            alert(doc);
//            alert(programming);
        }
    }
    else if(doc == "മലയാളം (Malayalam)"){
        if(programming == "HTML"){
            location.href = "../../static/documentation/BHAML (Malayalam).pdf";
        }
        else if(programming == "CSS"){
            alert(doc);
            alert(programming);
        }
    }
    else if(doc == "मराठी (Marathi)"){
        if(programming == "HTML"){
            location.href = "../../static/documentation/BHAML (Marathi).pdf";
        }
        else if(programming == "CSS"){
            alert(doc);
            alert(programming);
        }
    }
    else if(doc == "ଓଡିଆ (Odia)"){
        if(programming == "HTML"){
            location.href = "../../static/documentation/BHAML (Odia).pdf";
        }
        else if(programming == "CSS"){
            alert(doc);
            alert(programming);
        }
    }
    else if(doc == "ਪੰਜਾਬੀ (Punjabi)"){
        if(programming == "HTML"){
            location.href = "../../static/documentation/BHAML (Punjabi).pdf";
        }
        else if(programming == "CSS"){
            alert(doc);
            alert(programming);
        }
    }
    else if(doc == "தமிழ் (Tamil)"){
        if(programming == "HTML"){
            location.href = "../../static/documentation/BHAML (Tamil).pdf";
        }
        else if(programming == "CSS"){
            alert(doc);
            alert(programming);
        }
    }
    else if(doc == "తెలుగు (Telugu)"){
        if(programming == "HTML"){
            location.href = "../../static/documentation/BHAML (Telugu).pdf";
        }
        else if(programming == "CSS"){
            alert(doc);
            alert(programming);
        }
    }
}

function undolastchange() {
    editor.undo();
}

function redolastchange() {
    editor.redo();
}

function find_in_code() {
    editor.execCommand("find");
}

function replace_all_in_code() {
    editor.execCommand("replaceAll");
}

function at_load() {
    var html = editor.getValue();
    initial = html;
//    alert(initial)
    Object.keys(dictionary).forEach(function(key) {
        html = html.replaceAll(key, dictionary[key]);
        });
     console.log(encodeURIComponent(html))
    iframe.src = "data:text/html;charset=utf-8," + encodeURIComponent(html);
}

function clear_editor() {
    editor.setValue('');
}

function new_editor() {
    editor.setValue(initial);
}

$('.language').click(function(){
    var optionval = $('#language').val();
    $('#language > option[value=' + optionval + ']').remove();

})
function prog_lang(){
    var e = document.getElementById("prog_lang");
    var dropdown_value = e.options[e.selectedIndex].value;
    if(dropdown_value == 'css'){
    var mode_val ="text/css"
    location ="?prog_lang=css"
     editor.setValue('');
    }else{
    location ="?prog_lang=html"
    }
}
function openDialog() {
    document.getElementById('fileToLoad').click();
}

function select_first_language() {
    var dropDown = document.getElementById("language");  
    dropDown.selectedIndex = 0;
  }

input = editor.getInputField();

    $.extend($.keyboard.keyaction, {
        delete: function (base) {
            editor.execCommand('delCharBefore');
        },
        left: function (base) {
            editor.execCommand('goCharLeft');
        },
        right: function (base) {
            editor.execCommand('goCharRight');
        }
    });


    $(input).keyboard({
        // keyBinding: "mousedown touchstart",
        usePreview: false,
        autoAccept: true,
        alwaysOpen: true,
        layout: 'custom',
        useWheel: true,
        position: {
            of: $("#wrap"),
            my: 'right bottom',
            at: 'right bottom',
            at2: 'right bottom',
        },
        css: {

        },
        customLayout: {
            'normal': [
                // 'ॊ 1 2 3 4 5 6 7 8 9 0 -  ृ {bksp}',
                // '{tab} q w e r t y u i o p [ ] \\',
                // 's d f g h j k l ; \' {enter}',
                ' < > ( ) [ ] { } {left} {right}',
                // '{accept} {space} {left} {right}'
            ],
                'shift': [
                '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
                '{tab} Q W E R T Y U I O P { } |',
                'A S D F G H J K L : " {enter}',
                '{shift} Z X C V B N M < > ? {shift}',
                '{accept} {space} {left} {right}']
        },
        validate:function (/* keyboard, value, isClosing */) {
            return true;
        },

    });
