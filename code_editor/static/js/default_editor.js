var editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
    mode: "text/html",
    htmlMode: true,
    theme: "dracula",
    lineWrapping: true,
    lineNumbers: true,
    autoCloseTags: true,
    autoCloseBrackets: true,
    extraKeys: {"Ctrl":"autocomplete"},
  })

  //editor.on('keyup',function(editor,event){
  // CodeMirror.commands.autocomplete(editor);
  //});

  editor.on("keyup", function(cm, event) {
    //only show hits for alpha characters
    if(!editor.state.completionActive && (event.keyCode > 7 && event.keyCode < 92)) {
        if(timeout) clearTimeout(timeout);
        var timeout = setTimeout(function() {
            CodeMirror.showHint(cm, CodeMirror.hint.clike, {completeSingle: false});
        }, 150);
    }
});