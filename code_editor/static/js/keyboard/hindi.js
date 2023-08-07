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
