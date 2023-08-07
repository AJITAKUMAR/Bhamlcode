// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

(function(mod) {
    if (typeof exports == "object" && typeof module == "object") // CommonJS
      mod(require("../../lib/codemirror"), require("./xml-hint"));
    else if (typeof define == "function" && define.amd) // AMD
      define(["../../lib/codemirror", "./xml-hint"], mod);
    else // Plain browser env
      mod(CodeMirror);
  })(function(CodeMirror) {
    "use strict";
  
    var langs = "ab aa af ak sq am ar an hy as av ae ay az bm ba eu be bn bh bi bs br bg my ca ch ce ny zh cv kw co cr hr cs da dv nl dz en eo et ee fo fj fi fr ff gl ka de el gn gu ht ha he hz hi ho hu ia id ie ga ig ik io is it iu ja jv kl kn kr ks kk km ki rw ky kv kg ko ku kj la lb lg li ln lo lt lu lv gv mk mg ms ml mt mi mr mh mn na nv nb nd ne ng nn no ii nr oc oj cu om or os pa pi fa pl ps pt qu rm rn ro ru sa sc sd se sm sg sr gd sn si sk sl so st es su sw ss sv ta te tg th ti bo tk tl tn to tr ts tt tw ty ug uk ur uz ve vi vo wa cy wo fy xh yi yo za zu".split(" ");
    var targets = ["_blank", "_self", "_top", "_parent"];
    var charsets = ["ascii", "utf-8", "utf-16", "latin1", "latin1"];
    var methods = ["get", "post", "put", "delete"];
    var encs = ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"];
    var media = ["all", "screen", "print", "embossed", "braille", "handheld", "print", "projection", "screen", "tty", "tv", "speech",
                 "3d-glasses", "resolution [>][<][=] [X]", "device-aspect-ratio: X/Y", "orientation:portrait",
                 "orientation:landscape", "device-height: [X]", "device-width: [X]"];
    var s = { attrs: {} }; // Simple tag, reused for a whole lot of tags
  
    var data = {
        ਏ: {
        attrs: {
          href: null, ਪਿੰਗ: null, ਕਿਸਮ: null,
          ਮੀਡਿਆ: media,
          ਟੀਚਾ: targets,
          hreflang: langs
        }
      },
      ਈਬਰ: s,
      acronym: s,
      ਪਤਾ: s,
      applet: s,
      ਖੇਤਰ: {
        attrs: {
            ਪੁਰਾਣਾ: null, coords: null, href: null, ਟੀਚਾ: null, ਪਿੰਗ: null,
          ਮੀਡਿਆ: media, hreflang: langs, ਕਿਸਮ: null,
          ਸ਼ਕਲ: ["default", "rect", "circle", "poly"]
        }
      },
      ਲੇਖ: s,
      "ਇਕ-ਪਾਸੇ": s,
      ਆਡੀਓ: {
        attrs: {
          src: null, mediagroup: null,
          crossorigin: ["anonymous", "use-credentials"],
          preload: ["none", "metadata", "auto"],
          "ਆਟੋ-ਪਲੇਅ": ["", "autoplay"],
          loop: ["", "loop"],
          ਕੰਟਰੋਲ: ["", "controls"]
        }
      },
      ਚਰਬੀ: s,
      ਅਧਾਰ: { attrs: { href: null, ਟੀਚਾ: targets } },
      basefont: s,
      bdi: s,
      "ਵਬੀ.ਡੀ.": s,
      big: s,
      ਬਲਾਕਕੋਟ: { attrs: { cite: null } },
      ਸਰੀਰ: s,
      ਬੀਆਰ: s,
      ਬਟਨ: {
        attrs: {
            ਫਾਰਮ: null, formaction: null, ਨਾਂ: null, ਮੁੱਲ: null,
            ਆਟੋਫੋਕਸ: ["", "autofocus"],
            ਆਯੋਗ: ["", "autofocus"],
          formenctype: encs,
          formmethod: methods,
          formnovalidate: ["", "novalidate"],
          formtarget: targets,
          ਕਿਸਮ: ["submit", "reset", "button"]
        }
      },
      ਕੈਨਵਸ: { attrs: { ਚੌੜਾਈ: null, ਉਚਾਈ: null } },
      ਸੁਰਖੀ: s,
      center: s,
      ਬਿਆਨ: s,
      ਕੋਡ: s,
      ਕਰਨਲ: { attrs: { span: null } },
      ਸਮੂਹ: { attrs: { span: null } },
      ਕਮਾਂਡ: {
        attrs: {
            ਕਿਸਮ: ["command", "checkbox", "radio"],
            ਲੇਬਲ: null, ਆਈਕਾਨ: null, ਰੇਡੀਓਗਰੁੱਪ: null, ਕਮਾਂਡ: null, ਟਾਈਟਲ: null,
          ਆਯੋਗ: ["", "disabled"],
          "ਚੈੱਕ-ਕੀਤਾ": ["", "checked"]
        }
      },
      ਡਾਟਾ: { attrs: { ਮੁੱਲ: null } },
      datagrid: { attrs: { ਆਯੋਗ: ["", "disabled"], ਕਈ: ["", "multiple"] } },
      ਡੈਟਲਿਸਟ: { attrs: { ਡਾਟਾ: null } },
      "ਡੀ.ਡੀ": s,
      ਡੈਲ: { attrs: { cite: null,"ਮਿਤੀ-ਸਮਾਂ": null } },
      ਵੇਰਵਾ: { attrs: { ਖੁੱਲਾ: ["", "open"] } },
      ਪਰਿਭਾਸ਼ਾ: s,
      dir: s,
      ਦਿਵ: s,
      ਸੰਵਾਦ: { attrs: { ਖੁੱਲਾ: null } },
      ਡੀਐਲ: s,
      ਡੀਟੀ: s,
      ਜ਼ੋਰ: s,
      ਏਮਬੈਡ: { attrs: { src: null, ਕਿਸਮ: null, ਚੌੜਾਈ: null, ਉਚਾਈ: null } },
      eventsource: { attrs: { src: null } },
      ਫੀਲਡਸੈੱਟ: { attrs: { ਆਯੋਗ: ["", "disabled"], ਫਾਰਮ: null, ਨਾਂ: null } },
      figcaption: s,
      ਚਿੱਤਰ: s,
      font: s,
      ਫੁੱਟਰ: s,
      ਫਾਰਮ: {
        attrs: {
            ਐਕਸ਼ਨ: null, ਨਾਂ: null,
          "ਸਵੀਕਾਰ-ਚਰਸੈੱਟ": charsets,
          "ਆਟੋ-ਮੁਕੰਮਲ": ["on", "off"],
          enctype: encs,
          ਢੰਗ: methods,
          novalidate: ["", "novalidate"],
          ਟੀਚਾ: targets
        }
      },
      frame: s,
      frameset: s,
      ਐਚ1: s, ਐਚ2: s, ਐਚ3: s, ਐਚ4: s, ਐਚ5: s, ਐਚ6: s,
      ਸਿਰ: {
        attrs: {},
        children: ["ਪਹਿਲਾਂ", "ਅਧਾਰ", "ਲਿੰਕ", "ਸ਼ੈਲੀ", "ਮੱਟਾ", "ਸਕ੍ਰਿਪਟ", "ਨੋਲਪ", "ਕਮਾਂਡ"]
      },
      ਸਿਰਲੇਖ: s,
      ਹੈਗੱਪ: s,
      ਘੰਟਾ: s,
      ਭਮਲ: {
        attrs: { ਮੈਨੀਫੈਸਟ: null },
        children: ["ਸਿਰ", "ਸਰੀਰ"]
      },
      ਇਟੈਲਿਕ: s,
      ਮੈਨੂੰਫਰੇਮ: {
        attrs: {
          src: null, srcdoc: null, ਨਾਂ: null, ਚੌੜਾਈ: null, ਉਚਾਈ: null,
          sandbox: ["allow-top-navigation", "allow-same-origin", "allow-forms", "allow-scripts"],
          seamless: ["", "seamless"]
        }
      },
      ਛਾਪੋ: {
        attrs: {
            ਪੁਰਾਣਾ: null, src: null, ismap: null, usemap: null, ਚੌੜਾਈ: null, ਉਚਾਈ: null,
          crossorigin: ["anonymous", "use-credentials"]
        }
      },
      ਇੰਪੁੱਟ: {
        attrs: {
            ਪੁਰਾਣਾ: null, dirname: null, ਫਾਰਮ: null, formaction: null,
            ਉਚਾਈ: null, ਲਿਸਟ: null, "ਵੱਧੋ-ਵੱਧ": null, maxlength: null, min: null,
          ਨਾਂ: null, pattern: null, placeholder: null, ਆਕਾਰ: null, src: null,
          step: null, ਮੁੱਲ: null, ਚੌੜਾਈ: null,
          ਸਵੀਕਾਰ: ["audio/*", "video/*", "image/*"],
          "ਆਟੋ-ਮੁਕੰਮਲ": ["on", "off"],
          ਆਟੋਫੋਕਸ: ["", "autofocus"],
          "ਚੈੱਕ-ਕੀਤਾ": ["", "checked"],
          ਆਯੋਗ: ["", "disabled"],
          formenctype: encs,
          formmethod: methods,
          formnovalidate: ["", "novalidate"],
          formtarget: targets,
          ਕਈ: ["", "multiple"],
          readonly: ["", "readonly"],
          ਲੋੜੀਦੇ: ["", "required"],
          ਕਿਸਮ: ["hidden", "text", "search", "tel", "url", "email", "password", "datetime", "date", "month",
                 "week", "time", "datetime-local", "number", "range", "color", "checkbox", "radio",
                 "file", "submit", "image", "reset", "button"]
        }
      },
      ਸ਼ਾਖਾ: { attrs: { cite: null, "ਮਿਤੀ-ਸਮਾਂ": null } },
      ਕੀਬੋਰਡ: s,
      ਕੁੰਜੀ: {
        attrs: {
          ਚੁਣੌਤੀ: null, ਫਾਰਮ: null, ਨਾਂ: null,
          ਆਟੋਫੋਕਸ: ["", "autofocus"],
          ਆਯੋਗ: ["", "disabled"],
          keytype: ["RSA"]
        }
      },
      ਲੇਬਲ: { attrs: { "ਲਈ": null, ਫਾਰਮ: null } },
      ਕਥਾ: s,
      ਸੂਚੀ: { attrs: { ਮੁੱਲ: null } },
      ਲਿੰਕ: {
        attrs: {
          href: null, ਕਿਸਮ: null,
          hreflang: langs,
          ਮੀਡਿਆ: media,
          ਅਕਾਰ: ["all", "16x16", "16x16 32x32", "16x16 32x32 64x64"]
        }
      },
      ਨਕਸ਼ਾ: { attrs: { ਨਾਂ: null } },
      ਮਾਰਕ: s,
      ਮੀਨੂ: { attrs: { ਲੇਬਲ: null, ਕਿਸਮ: ["list", "context", "toolbar"] } },
      ਮੱਟਾ: {
        attrs: {
          ਸਮੱਗਰੀ: null,
          ਚਰਸੈੱਟ: charsets,
          ਨਾਂ: ["viewport", "application-name", "author", "description", "generator", "keywords"],
          "http-equiv": ["content-language", "content-type", "default-style", "refresh"]
        }
      },
      ਮੀਟਰ: { attrs: { ਮੁੱਲ: null, min: null, ਘੱਟ: null, high: null, max: null, optimum: null } },
      ਮਾਰਗ: s,
      noframes: s,
      ਨੋਲਪ: s,
      ਚੀਜ਼: {
        attrs: {
            ਡਾਟਾ: null, ਕਿਸਮ: null, ਨਾਂ: null, usemap: null, ਫਾਰਮ: null, ਚੌੜਾਈ: null, ਉਚਾਈ: null,
          typemustmatch: ["", "typemustmatch"]
        }
      },
      "ਗੈਰ-ਸੂਚੀਬੱਧ": { attrs: { ਉਲਟ: ["", "reversed"], ਸ਼ੁਰੂ: null, ਕਿਸਮ: ["1", "a", "A", "i", "I"] } },
      ਨਿਰਲੇਪਤਾ: { attrs: { ਆਯੋਗ: ["", "disabled"], ਲੇਬਲ: null } },
      ਚੋਣ: { attrs: { ਆਯੋਗ: ["", "disabled"], ਲੇਬਲ: null, ਚੁਣੇ: ["", "selected"], ਮੁੱਲ: null } },
      ਆਉਟਪੁੱਟ: { attrs: { "for": null, ਫਾਰਮ: null, ਨਾਂ: null } },
      ਪੈਰਾ: s,
      ਆਖਰੀ: { attrs: { ਨਾਂ: null, ਮੁੱਲ: null } },
      ਪੂਰਬ: s,
      ਤਰੱਕੀ: { attrs: { ਮੁੱਲ: null, "ਵੱਧੋ-ਵੱਧ": null } },
      ਕੀ: { attrs: { cite: null } },
      rp: s,
      rt: s,
      ରୁବି: s,
      s: s,
      ਨਮੂਨਾ: s,
      ਸਕ੍ਰਿਪਟ: {
        attrs: {
            ਕਿਸਮ: ["text/javascript"],
          src: null,
          async: ["", "async"],
          defer: ["", "defer"],
          ਚਰਸੈੱਟ: charsets
        }
      },
      ਰਨ: s,
      ਚੁਣੋ: {
        attrs: {
            ਫਾਰਮ: null, ਨਾਂ: null, ਆਕਾਰ: null,
            ਆਟੋਫੋਕਸ: ["", "autofocus"],
            ਆਯੋਗ: ["", "disabled"],
            ਕਈ: ["", "multiple"]
        }
      },
      ਛੋਟਾ: s,
      source: { attrs: { src: null, ਕਿਸਮ: null, ਮੀਡਿਆ: null } },
      ਪੁਲ: s,
      strike: s,
      ਮਜ਼ਬੂਤ: s,
      ਸ਼ੈਲੀ: {
        attrs: {
            ਕਿਸਮ: ["text/css"],
            ਮੀਡਿਆ: media,
          scoped: null
        }
      },
      ਅਨੂ: s,
      ਸਾਰ: s,
      ਸਹਾਇਤਾ: s,
      ਟੇਬਲ: s,
      ਤਿਆਬੀ: s,
      "ਟੀ.ਡੀ": { attrs: { colspan: null, rowspan: null, headers: null } },
      ਟੈਕਸਟਰੀਆ: {
        attrs: {
          dirname: null, ਫਾਰਮ: null, maxlength: null, ਨਾਂ: null, placeholder: null,
          ਕਤਾਰਾਂ: null, ਕਾਲਰ: null,
          ਆਟੋਫੋਕਸ: ["", "autofocus"],
          ਆਯੋਗ: ["", "disabled"],
          readonly: ["", "readonly"],
          ਲੋੜੀਦੇ: ["", "required"],
          wrap: ["soft", "hard"]
        }
      },
      ਟੂਫੁੱਟ: s,
      ਇਹ: { attrs: { colspan: null, rowspan: null, headers: null, scope: ["row", "col", "rowgroup", "colgroup"] } },
      ਥਾਈਡ: s,
      ਸਮਾਂ: { attrs: { "ਮਿਤੀ-ਸਮਾਂ": null } },
      ਪਹਿਲਾਂ: s,
      ਟੀਆਰ: s,
      track: {
        attrs: {
          src: null, ਲੇਬਲ: null, "default": null,
          ਕਿਸਮ: ["subtitles", "captions", "descriptions", "chapters", "metadata"],
          srclang: langs
        }
      },
      tt: s,
      u: s,
      ਉਲ: s,
      ਬਦਲੋ: s,
      ਵੀਡੀਓ: {
        attrs: {
          src: null, ਸਰਵੋਤਮ: null, ਚੌੜਾਈ: null, ਉਚਾਈ: null,
          crossorigin: ["anonymous", "use-credentials"],
          preload: ["auto", "metadata", "none"],
          "ਆਟੋ-ਪਲੇਅ": ["", "autoplay"],
          mediagroup: ["movie"],
          "ਚੁੱਪ-ਕੀਤਾ": ["", "muted"],
          ਕੰਟਰੋਲ: ["", "controls"]
        }
      },
      ਡਬਲਯੂਆਰ: s
    };
    var style= ["ਅਲਾਈਨ-ਸਮੱਗਰੀ","ਅਲਾਈਨ-ਇਕਾਈ","ਅਲਾਈਨ-ਸਵੈ","ਸਭ","ਐਨੀਮੇਸ਼ਨ ","ਐਨੀਮੇਸ਼ਨ - ਦੇਰੀ","ਐਨੀਮੇਸ਼ਨ- ਦਿਸ਼ਾ","ਐਨੀਮੇਸ਼ਨ - ਮਿਆਦ","ਐਨੀਮੇਸ਼ਨ- ਭਰਨ-ਮੋਡ","ਐਨੀਮੇਸ਼ਨ- ਦੁਹਰਾਓ- ਗਿਣਤੀ","ਐਨੀਮੇਸ਼ਨ - ਨਾਮ","ਐਨੀਮੇਸ਼ਨ- ਪਲੇ- ਸਟੇਟ","ਐਨੀਮੇਸ਼ਨ- ਟਾਈਮਿੰਗ- ਫੰਕਸ਼ਨ",
    "ਬੈਕਫੇਸ-ਦਿਖਣਯੋਗਤਾ","ਬੈਕਗਰਾਊਂਡ","ਪਿਛੋਕੜ- ਲਗਾਵ","ਪਿਛੋਕੜ- ਮਿਸ਼ਰਨ- ਮੋਡ","ਪਿਛੋਕੜ- ਕਲਿੱਪ","ਬੈਕਗਰਾਊਂਡ- ਰੰਗ","ਬੈਕਗਰਾਊਂਡ- ਈਮੇਜ਼","ਬੈਕਗਰਾਊਂਡ- ਮੂਲ","ਬੈਕਗਰਾਊਂਡ- ਸਥਿਤੀ","ਪਿਛੋਕੜ- ਦੁਹਰਾਓ","ਬੈਕਗਰਾਊਂਡ- ਅਕਾਰ","ਬਾਰਡਰ","ਬਾਰਡਰ- ਬੌਟਮ","ਬਾਰਡਰ- ਤਲ- ਰੰਗ","ਬਾਰਡਰ- ਤਲ- ਖੱਬੇ-ਅਰਧਵਿਆਸ","ਬਾਰਡਰ-ਥੱਲੇ-ਸੱਜਾ-ਅਰਧ-ਵਿਆਸ","ਬਾਰਡਰ- ਤਲ-ਸ਼ੈਲੀ","ਬਾਰਡਰ- ਥੱਲੇ- ਚੌੜਾਈ","ਬਾਰਡਰ- ਢਹਿ-ਢੇਰੀ","ਬਾਰਡਰ - ਰੰਗ","ਬਾਰਡਰ- ਚਿੱਤਰ","ਬਾਰਡਰ- ਚਿੱਤਰ- ਸ਼ੁਰੂ","ਬਾਰਡਰ- ਚਿੱਤਰ- ਦੁਹਰਾਓ","ਬਾਰਡਰ- ਚਿੱਤਰ- ਟੁਕੜਾ","ਬਾਰਡਰ- ਚਿੱਤਰ- ਸਰੋਤ","ਬਾਰਡਰ- ਚਿੱਤਰ- ਚੌੜਾਈ","ਬਾਰਡਰ- ਖੱਬੇ","ਬਾਰਡਰ- ਖੱਬੇ- ਰੰਗ","ਬਾਰਡਰ- ਖੱਬੇ-ਸ਼ੈਲੀ","ਬਾਰਡਰ- ਖੱਬੇ-ਚੌੜਾਈ","ਬਾਰਡਰ- ਅਰਧਵਿਆਸ","ਬਾਰਡਰ- ਸੱਜੇ","ਬਾਰਡਰ-ਸੱਜਾ-ਰੰਗ","ਬਾਰਡਰ-ਸੱਜੇ-ਸ਼ੈਲੀ","ਬਾਰਡਰ-ਸੱਜੇ-ਚੌੜਾਈ","ਬਾਰਡਰ- ਸਪੇਸਿੰਗ","ਬਾਰਡਰ- ਸ਼ੈਲੀ","ਬਾਰਡਰ- ਟਾਪ","ਬਾਰਡਰ- ਟਾਪ- ਰੰਗ","ਬਾਰਡਰ- ਟਾਪ- ਖੱਬੇ-ਅਰਧਵਿਆਸ","ਬਾਰਡਰ- ਟਾਪ- ਸੱਜੇ-ਅਰਧਵਿਆਸ","ਬਾਰਡਰ- ਸਿਖਰ-ਸ਼ੈਲੀ","ਬਾਰਡਰ- ਟੌਪ- ਚੌੜਾਈ","ਬਾਰਡਰ- ਚੌੜਾਈ","ਤਲ","ਬਾਕਸ- ਸਜਾਵਟ- ਬ੍ਰੇਕ","ਬਾਕਸ- ਪਰਛਾਵਾਂ","ਬਾਕਸ-ਆਕਾਰ","ਬਰੇਕ-ਬਾਅਦ","ਬਰੇਕ-ਪਹਿਲਾਂ","ਤੋੜਨਾ- ਅੰਦਰ",
    "ਕੈਪਸ਼ਨ-ਸਾਈਡ","ਕੈਰੇਟ-ਰੰਗ","ਸਾਫ਼","ਕਲਿੱਪ","ਰੰਗ","ਕਾਲਮ- ਗਿਣਤੀ","ਕਾਲਮ- ਭਰਨ ਲਈ","ਕਾਲਮ- ਪਾੜਾ","ਕਾਲਮ- ਨਿਯਮ","ਕਾਲਮ- ਨਿਯਮ-ਰੰਗ","ਕਾਲਮ- ਨਿਯਮ-ਸ਼ੈਲੀ","ਕਾਲਮ- ਨਿਯਮ- ਚੌੜਾਈ","ਕਾਲਮ- ਸਪੈਨ","ਕਾਲਮ- ਚੌੜਾਈ","ਕਾਲਮ","ਸਮੱਗਰੀ","ਕਾਊਂਟਰ- ਵਾਧਾ","ਕਾਊਂਟਰ- ਰੀ- ਸੈੱਟ","ਕਰਸਰ",
    "ਦਿਸ਼ਾ","ਡਿਸਪਲੇਅ","ਖਾਲੀ- ਸੈੱਲ","ਫ਼ਿਲਟਰ","ਫਲੈਕਸ","ਫਲੈਕਸ- ਅਧਾਰ","ਫਲੈਕਸ-ਦਿਸ਼ਾ","ਫਲੈਕਸ-ਵਹਾਅ","ਫਲੈਕਸ-ਵਧਣਾ","ਫਲੈਕਸ-ਸੁੰਗੜਨਾ","ਫਲੈਕਸ-ਰੈਪ","ਫਲੋਟ","ਫੋਂਟ","ਫੋਂਟ- ਚਿਹਰਾ","ਫੌਂਟ- ਪਰਿਵਾਰ","ਫੌਂਟ- ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ- ਸੈਟਿੰਗਾਂ","ਫੌਂਟ- ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ- ਮੁੱਲ","ਫੌਂਟ-ਕਰਨਿੰਗ","ਫੌਂਟ- ਭਾਸ਼ਾ- ਓਵਰਰਾਈਡ","ਫੋਂਟ- ਸਾਈਜ਼","ਫੌਂਟ-ਸਾਈਜ਼-ਵਿਵਸਥਿਤ ਕਰੋ","ਫੌਂਟ- ਫੈਲਾਓ","ਫੌਂਟ-ਸਿੰਥੇਸਿਸ","ਫੌਂਟ-ਸਿੰਥੇਸਿਸ","ਫੌਂਟ- ਵੇਰੀਐਂਟ","ਫੋਂਟ- ਵੇਰੀਐਂਟ- ਬਦਲਵੇਂ","ਫੌਂਟ- ਵੇਰੀਐਂਟ- ਕੈਪਸ","ਫੌਂਟ- ਰੂਪ- ਪੂਰਬੀ- ਏਸ਼ੀਆਈ","ਫੌਂਟ- ਰੂਪ- ਸੰਖਿਆਤਮਕ","ਫੌਂਟ- ਵੇਰੀਐਂਟ- ਸਥਿਤੀ","ਫੋਂਟ- ਵਜ਼ਨ",
    "ਅੰਤਰ","ਗਰਿੱਡ","ਗਰਿੱਡ- ਖੇਤਰ","ਗਰਿੱਡ- ਆਟੋ- ਕਾਲਮ","ਗਰਿੱਡ- ਆਟੋ- ਫਲੋ","ਗਰਿੱਡ- ਆਟੋ- ਕਤਾਰਾਂ","ਗਰਿੱਡ- ਕਾਲਮ","ਗਰਿੱਡ-ਕਾਲਮ-ਐਂਡ","ਗਰਿੱਡ-ਕਾਲਮ-ਗੈਪ","ਗਰਿੱਡ-ਕਾਲਮ-ਸਟਾਰਟ","ਗਰਿੱਡ- ਪਾੜਾ","ਗਰਿੱਡ- ਕਤਾਰ","ਗਰਿੱਡ-ਰੋ-ਐਂਡ","ਗਰਿੱਡ-ਕਤਾਰ-ਪਾੜਾ","ਗਰਿੱਡ-ਕਤਾਰ-ਸ਼ੁਰੂ","ਗਰਿੱਡ-ਟੈਂਪਲੇਟ","ਗਰਿੱਡ-ਟੈਂਪਲੇਟ- ਖੇਤਰ","ਗਰਿੱਡ-ਟੈਂਪਲੇਟ- ਕਾਲਮ","ਗਰਿੱਡ-ਟੈਂਪਲੇਟ- ਕਤਾਰਾਂ",
    "ਲਟਕਣਾ-ਵਿਰਾਮ ਚਿੰਨ੍ਹ","ਉਚਾਈ","ਹਾਈਫਨ","ਚਿੱਤਰ-ਰੈਂਡਰਿੰਗ","ਆਯਾਤ","ਵਖਰੇਵਾਂ","ਜਾਇਜ਼-ਸਮੱਗਰੀ","ਕੀਫ੍ਰੇਮ",
    "ਖੱਬਾ","ਅੱਖਰ- ਸਪੇਸਿੰਗ","ਲਾਈਨ-ਬ੍ਰੇਕ","ਲਾਈਨ- ਉਚਾਈ","ਸੂਚੀ-ਸ਼ੈਲੀ","ਸੂਚੀ-ਸ਼ੈਲੀ-ਚਿੱਤਰ","ਸੂਚੀ-ਸ਼ੈਲੀ-ਸਥਿਤੀ","ਸੂਚੀ-ਸ਼ੈਲੀ-ਕਿਸਮ",
    "ਮਾਰਜਨ","ਹਾਸ਼ੀਏ-ਹੇਠਾਂ","ਹਾਸ਼ੀਏ-ਖੱਬੇ","ਹਾਸ਼ੀਏ-ਸੱਜੇ","ਹਾਸ਼ੀਏ-ਚੋਟੀ","ਮਾਸਕ","ਮਾਸਕ-ਕਲਿੱਪ","ਮਾਸਕ-ਸੰਯੁਕਤ","ਮਾਸਕ-ਚਿੱਤਰ","ਮਾਸਕ-ਮੋਡ","ਮਾਸਕ-ਮੂਲ","ਮਾਸਕ-ਸਥਿਤੀ","ਮਾਸਕ-ਦੁਹਰਾਓ","ਮਾਸਕ-ਆਕਾਰ","ਮਾਸਕ-ਕਿਸਮ","ਅਧਿਕਤਮ-ਉਚਾਈ","ਅਧਿਕਤਮ-ਚੌੜਾਈ","ਮੀਡੀਆ","ਘੱਟੋ-ਘੱਟ ਉਚਾਈ","ਘੱਟੋ-ਘੱਟ ਚੌੜਾਈ","ਮਿਕਸ-ਬਲੇਂਡ-ਮੋਡ",
    "ਆਬਜੈਕਟ- ਫਿੱਟ","ਆਬਜੈਕਟ- ਸਥਿਤੀ","ਧੁੰਦਲਾਪਨ","ਆਰਡਰ","ਅਨਾਥ","ਰੂਪਰੇਖਾ","ਰੂਪਰੇਖਾ-ਰੰਗ","ਰੂਪਰੇਖਾ-ਆਫਸੈੱਟ","ਰੂਪਰੇਖਾ-ਸ਼ੈਲੀ","ਰੂਪਰੇਖਾ - ਚੌੜਾਈ","ਓਵਰਫਲੋਅ","ਓਵਰਫਲੋ- ਲਪੇਟਣਾ","ਓਵਰਫਲੋ- x","ਓਵਰਫਲੋ- y",
    "ਪੈਡਿੰਗ","ਪੈਡਿੰਗ- ਥੱਲੇ","ਪੈਡਿੰਗ- ਖੱਬੇ","ਪੈਡਿੰਗ- ਸੱਜੇ","ਪੈਡਿੰਗ- ਟਾਪ","ਪੇਜ- ਬ੍ਰੇਕ- ਬਾਅਦ","ਪੇਜ- ਬ੍ਰੇਕ- ਅੱਗੇ","ਪੰਨਾ- ਬ੍ਰੇਕ- ਅੰਦਰ","ਦ੍ਰਿਸ਼ਟੀਕੋਣ","ਪਰਿਪੇਖ-ਮੂਲ","ਸੰਕੇਤਕ- ਘਟਨਾਵਾਂ","ਸਥਿਤੀ",
    "ਹਵਾਲਾ","ਆਕਾਰ ਬਦਲੋ","ਸੱਜੇ","ਕਤਾਰ- ਅੰਤਰ","ਸਕਰੋਲ- ਵਿਵਹਾਰ","ਟੈਬ- ਆਕਾਰ","ਟੇਬਲ- ਲੇਆਉਟ","ਟੈਕਸਟ- ਅਲਾਈਨ","ਟੈਕਸਟ- ਅਲਾਈਨ- ਆਖਰੀ","ਪਾਠ- ਜੋੜ- ਸਿੱਧਾ","ਟੈਕਸਟ- ਸਜਾਵਟ","ਟੈਕਸਟ- ਸਜਾਵਟ- ਰੰਗ","ਟੈਕਸਟ- ਸਜਾਵਟ- ਲਾਈਨ","ਟੈਕਸਟ- ਸਜਾਵਟ- ਸ਼ੈਲੀ","ਟੈਕਸਟ- ਇੰਡੈਂਟ","ਟੈਕਸਟ- ਜਾਇਜ਼ ਠਹਿਰਾਓ","ਟੈਕਸਟ- ਸਥਿਤੀ","ਟੈਕਸਟ- ਓਵਰਫਲੋ","ਟੈਕਸਟ- ਸ਼ੈਡੋ","ਟੈਕਸਟ - ਪਰਿਵਰਤਨ","ਟੈਕਸਟ-ਅੰਡਰਲਾਈਨ-ਸਥਿਤੀ","ਉੱਤੇ","ਬਦਲਣਾ","ਪਰਿਵਰਤਨ-ਮੂਲ","ਤਬਦੀਲੀ-ਸ਼ੈਲੀ","ਪਰਿਵਰਤਨ","ਪਰਿਵਰਤਨ-ਦੇਰੀ","ਪਰਿਵਰਤਨ-ਅਵਧੀ","ਪਰਿਵਰਤਨ-ਸੰਪੱਤੀ","ਪਰਿਵਰਤਨ-ਸਮਾਂ-ਫੰਕਸ਼ਨ","ਯੂਨੀਕੋਡ- ਬੀੜੀ","ਯੂਜ਼ਰ- ਚੁਣੋ",
    "ਲੰਬਕਾਰੀ- ਇਕਸਾਰ","ਦਿਖਣਯੋਗਤਾ","ਚਿੱਟੀ-ਜਗ੍ਹਾ","ਵਿਧਵਾਵਾਂ","ਚੌੜਾਈ","ਸ਼ਬਦ-ਬ੍ਰੇਕ","ਸ਼ਬਦ-ਵਿੱਥ","ਸ਼ਬਦ-ਲਪੇਟ","ਲਿਖਣ- ਮੋਡ",
    "z-ਇੰਡੈਕਸ",]
  
    var globalAttrs = {
      accesskey: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      "class": null,
      contenteditable: ["true", "false"],
      contextmenu: null,
      dir: ["ltr", "rtl", "auto"],
      ਘਸੀਟਣਯੋਗ: ["true", "false", "auto"],
      dropzone: ["copy", "move", "link", "string:", "file:"],
      hidden: ["hidden"],
      id: null,
      inert: ["inert"],
      itemid: null,
      itemprop: null,
      itemref: null,
      itemscope: ["itemscope"],
      itemtype: null,
      lang: ["en", "es"],
      spellcheck: ["true", "false"],
      autocorrect: ["true", "false"],
      autocapitalize: ["true", "false"],
      style: null,
      tabindex: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      ਟਾਈਟਲ: null,
      translate: ["yes", "no"],
      onclick: null,
      rel: ["stylesheet", "alternate", "author", "bookmark", "help", "license", "next", "nofollow", "noreferrer", "prefetch", "prev", "search", "tag"]
    };
    function populate(obj) {
      for (var attr in globalAttrs) if (globalAttrs.hasOwnProperty(attr))
        obj.attrs[attr] = globalAttrs[attr];
    }
  
    populate(s);
    for (var tag in data) if (data.hasOwnProperty(tag) && data[tag] != s)
      populate(data[tag]);
  
    CodeMirror.htmlSchema = data;
    function htmlHint(cm, options) {
      var local = {schemaInfo: data};
      if (options) for (var opt in options) local[opt] = options[opt];
      return CodeMirror.hint.xml(cm, local);
    }
    CodeMirror.registerHelper("hint", "html", htmlHint);
  });
