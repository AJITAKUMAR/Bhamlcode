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
    ক: {
      attrs: {
        href: null, পিং: null, প্রকার: null,
        মিডিয়া: media,
        লক্ষ্য: targets,
        hreflang: langs
      }
    },
    abbr: s,
    acronym: s,
    ঠিকানা: s,
    applet: s,
    অঞ্চল: {
      attrs: {
        বিকল্প: null, স্থানাঙ্ক: null, href: null, লক্ষ্য: null, পিং: null,
        মিডিয়া: media, hreflang: langs, প্রকার: null,
        আকৃতি: ["default", "rect", "circle", "poly"]
      }
    },
    নিবন্ধ: s,
    একপাশে: s,
    শ্রুতি: {
      attrs: {
        সূত্র: null, 'মিডিয়া-দল': null,
        'ক্রস-মূল': ["anonymous", "use-credentials"],
        প্রিলোড: ["none", "metadata", "auto"],
        'স্বয়ংক্রিয়-চালু': ["", "autoplay"],
        লুপ: ["", "loop"],
        নিয়ন্ত্রণ: ["", "controls"]
      }
    },
    খ: s,
    বেস: { attrs: { href: null, লক্ষ্য: targets } },
    //basefont: s,
    //bdi: s,
    বিডো: s,
    //big: s,
    'ব্লক-উদ্ধৃতি': { attrs: { উদ্ধৃতি: null } },
    শরীর: s,
    বিআর: s,
    বোতাম: {
      attrs: {
        ফর্ম: null, 'ফর্ম-ক্রিয়া': null, নাম: null, মান: null,
        'স্বয়ংক্রিয়-ফোকাস': ["", "autofocus"],
        অক্ষম: ["", "autofocus"],
        'ফর্ম-এনটাইপ': encs,
        formmethod: methods,
        'ফর্ম-কোন-বৈধতা': ["", "novalidate"],
        formtarget: targets,
        প্রকার: ["submit", "reset", "button"]
      }
    },
    ক্যানভাস: { attrs: { চত্তড়াই: null, উচ্চতা: null } },
    ক্যাপশন: s,
    //center: s,
    উদ্ধৃতি: s,
    কোড: s,
    কর্নেল: { attrs: { স্প্যান: null } },
    কলগ্রুপ: { attrs: { স্প্যান: null } },
    আদেশ: {
      attrs: {
        প্রকার: ["command", "checkbox", "radio"],
        লেবেল: null, আইকন: null, 'রেডিও-দল': null, আদেশ: null, শিরোনাম: null,
        অক্ষম: ["", "disabled"],
        প্রতিরুদ্ধ: ["", "checked"]
      }
    },
    //data: { attrs: { মান: null } },
    //datagrid: { attrs: { অক্ষম: ["", "disabled"], একাধিক: ["", "multiple"] } },
    ডাটালিস্ট: { attrs: { তথ্য: null } },
    ডিডি: s,
    দেল: { attrs: { উদ্ধৃতি: null, datetime: null } },
    বিশদ: { attrs: { খোলা: ["", "open"] } },
    //dfn: s,
    //dir: s,
    ডিভ: s,
    সংলাপ: { attrs: { খোলা: null } },
    //dl: s,
    //dt: s,
    এম: s,
    বসান: { attrs: { সূত্র: null, প্রকার: null, চত্তড়াই: null, উচ্চতা: null } },
    //eventsource: { attrs: { সূত্র: null } },
    ফিল্ডসেট: { attrs: { অক্ষম: ["", "disabled"], ফর্ম: null, নাম: null } },
    //figcaption: s,
    চিত্র: s,
    //font: s,
    পাদচরণ: s,
    ফর্ম: {
      attrs: {
        ক্রিয়া: null, নাম: null,
        'মানা-অক্ষর-সেট': charsets,
        স্বয়ংসম্পূর্ণ: ["on", "off"],
        এনটাইপ: encs,
        পদ্ধতি: methods,
        'বৈধ-করা': ["", "novalidate"],
        লক্ষ্য: targets
      }
    },
    //frame: s,
    //frameset: s,
    এইচ1: s, এইচ2: s, এইচ3: s, এইচ4: s, এইচ5: s, এইচ6: s,
    মাথা: {
      attrs: {},
      children: ["title", "base", "link", "style", "meta", "script", "noscript", "command"]
    },
    শিরোনাম: s,
    //hgroup: s,
    ঘন্টা: s,
    এইচটিএমএল: {
      attrs: { প্রকাশ: null },
      children: ["head", "body"]
    },
    i: s,
    iframe: {
      attrs: {
        সূত্র: null, 'সূত্র-দলিল': null, নাম: null, চত্তড়াই: null, উচ্চতা: null,
        sandbox: ["allow-top-navigation", "allow-same-origin", "allow-forms", "allow-scripts"],
        seamless: ["", "seamless"]
      }
    },
    
    ইমেজ: {
      attrs: {
        বিকল্প: null, সূত্র: null, মানচিত্র: null, 'ব্যবহার-মানচিত্র': null, চত্তড়াই: null, উচ্চতা: null,
        'ক্রস-মূল': ["anonymous", "use-credentials"]
      }
    },
    ইনপুট: {
      attrs: {
        বিকল্প: null, dirname: null, ফর্ম: null, 'ফর্ম-ক্রিয়া': null,
        উচ্চতা: null, তালিকা: null, সর্বাধিক: null, 'সর্বাধিক-দৈর্ঘ্য': null, লঘিষ্ঠ: null,
        নাম: null, প্যাটার্ন: null, স্থানধারক: null, আকার: null, সূত্র: null,
        পদক্ষেপ: null, মান: null, চত্তড়াই: null,
        মানা: ["audio/*", "video/*", "image/*"],
        স্বয়ংসম্পূর্ণ: ["on", "off"],
        'স্বয়ংক্রিয়-ফোকাস': ["", "autofocus"],
        প্রতিরুদ্ধ: ["", "checked"],
        অক্ষম: ["", "disabled"],
        'ফর্ম-এনটাইপ': encs,
        formmethod: methods,
        'ফর্ম-কোন-বৈধতা': ["", "novalidate"],
        formtarget: targets,
        একাধিক: ["", "multiple"],
        'শুধুমাত্র-পাঠযোগ্য': ["", "readonly"],
        অবশ্যক: ["", "required"],
        প্রকার: ["hidden", "text", "search", "tel", "url", "email", "password", "datetime", "date", "month",
               "week", "time", "datetime-local", "number", "range", "color", "checkbox", "radio",
               "file", "submit", "image", "reset", "button"]
      }
    },
    ins: { attrs: { উদ্ধৃতি: null, datetime: null } },
    কেবিডি: s,
    কীজেন: {
      attrs: {
        চ্যালেঞ্জ: null, ফর্ম: null, নাম: null,
        'স্বয়ংক্রিয়-ফোকাস': ["", "autofocus"],
        অক্ষম: ["", "disabled"],
        keytype: ["RSA"]
      }
    },
    লেবেল: { attrs: { "for": null, ফর্ম: null } },
    কিংবদন্তি: s,
    লি: { attrs: { মান: null } },
    লিঙ্ক: {
      attrs: {
        href: null, প্রকার: null,
        hreflang: langs,
        মিডিয়া: media,
        sizes: ["all", "16x16", "16x16 32x32", "16x16 32x32 64x64"]
      }
    },
    মানচিত্র: { attrs: { নাম: null } },
    চিহ্ন: s,
    তালিকা: { attrs: { লেবেল: null, প্রকার: ["list", "context", "toolbar"] } },
    মেটা: {
      attrs: {
        বিষয়বস্তু: null,
        'অক্ষর-সেট': charsets,
        নাম: ["viewport", "application-name", "author", "description", "generator", "keywords"],
        "http-equiv": ["content-language", "content-type", "default-style", "refresh"]
      }
    },
    মিটার: { attrs: { মান: null, লঘিষ্ঠ: null, কম: null, উচ্চ: null, সর্বাধিক: null, সর্বোত্তম: null } },
    নাভ: s,
    noframes: s,
    নসক্রিপ্ট: s,
    অবজেক্ট: {
      attrs: {
        তথ্য: null, প্রকার: null, নাম: null, 'ব্যবহার-মানচিত্র': null, ফর্ম: null, চত্তড়াই: null, উচ্চতা: null,
        typemustmatch: ["", "typemustmatch"]
      }
    },
    ওল: { attrs: { বিপরীত: ["", "reversed"], শুরু: null, প্রকার: ["1", "a", "A", "i", "I"] } },
    optgroup: { attrs: { অক্ষম: ["", "disabled"], লেবেল: null } },
    বিকল্প: { attrs: { অক্ষম: ["", "disabled"], লেবেল: null, selected: ["", "selected"], মান: null } },
    আউটপুট: { attrs: { "for": null, ফর্ম: null, নাম: null } },
    পি: s,
    পরম: { attrs: { নাম: null, মান: null } },
    প্রাক: s,
    অগ্রগতি: { attrs: { মান: null, সর্বাধিক: null } },
    প্রশ্ন: { attrs: { উদ্ধৃতি: null } },
    rp: s,
    rt: s,
    রুবি: s,
    s: s,
    স্যাম্প: s,
    লিপি: {
      attrs: {
        প্রকার: ["text/javascript"],
        সূত্র: null,
        অ্যাসিঙ্ক্রোনাস: ["", "async"],
        'বিলম্বিত-করা': ["", "defer"],
        'অক্ষর-সেট': charsets
      }
    },
    অধ্যায়: s,
    'নির্বাচন-করুন': {
      attrs: {
        ফর্ম: null, নাম: null, আকার: null,
        'স্বয়ংক্রিয়-ফোকাস': ["", "autofocus"],
        অক্ষম: ["", "disabled"],
        একাধিক: ["", "multiple"]
      }
    },
    //small: s,
    //source: { attrs: { সূত্র: null, প্রকার: null, মিডিয়া: null } },
    স্প্যান: s,
    //strike: s,
    শক্তিশালী: s,
    স্টাইল: {
      attrs: {
        প্রকার: ["text/css"],
        মিডিয়া: media,
        scoped: null
      }
    },
    উপ: s,
    সারসংক্ষেপ: s,
    সাপ: s,
    টেবিল: s,
    টডি: s,
    টিডি: { attrs: { colspan: null, rowspan: null, headers: null } },
    টেক্সারিয়া: {
      attrs: {
        'ডিরেক্টরি-নাম': null, ফর্ম: null, 'সর্বাধিক-দৈর্ঘ্য': null, নাম: null, স্থানধারক: null,
        সারি: null, কলাম: null,
        'স্বয়ংক্রিয়-ফোকাস': ["", "autofocus"],
        অক্ষম: ["", "disabled"],
        'শুধুমাত্র-পাঠযোগ্য': ["", "readonly"],
        অবশ্যক: ["", "required"],
        মোড়ানো: ["soft", "hard"]
      }
    },
    //tfoot: s,
    তম: { attrs: { 'কলাম-বিঘত': null, 'সারি-স্প্যান': null, হেডার: null, সুযোগ: ["row", "col", "rowgroup", "colgroup"] } },
    থ্যাড: s,
    সময়: { attrs: { 'তারিখ-সময়': null } },
    শিরোনাম: s,
    tr: s,
    track: {
      attrs: {
        সূত্র: null, লেবেল: null, "default": null,
        ধরনের: ["subtitles", "captions", "descriptions", "chapters", "metadata"],
        'সূত্র-ভাষা': langs
      }
    },
    //tt: s,
    //u: s,
    উল: s,
    //"var": s,
    ভিডিও: {
      attrs: {
        সূত্র: null, পোস্টার: null, চত্তড়াই: null, উচ্চতা: null,
        'ক্রস-মূল': ["anonymous", "use-credentials"],
        প্রিলোড: ["auto", "metadata", "none"],
        'স্বয়ংক্রিয়-চালু': ["", "autoplay"],
        'মিডিয়া-দল': ["movie"],
        নিঃশব্দ: ["", "muted"],
        নিয়ন্ত্রণ: ["", "controls"]
      }
    },
    //wbr: s
  };

  var globalAttrs = {
    accesskey: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    "class": null,
    contenteditable: ["true", "false"],
    contextmenu: null,
    dir: ["ltr", "rtl", "auto"],
    draggable: ["true", "false", "auto"],
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
    title: null,
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
