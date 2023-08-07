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
      ए: {
        attrs: {
          एचआरइएफ: null, गुनगुनाहट: null, प्रकार: null,
          मीडिया: media,
          लक्ष्य: targets,
          "एचआरइएफ-भाषा": langs
        }
      },
      एबबर: s,
      परिवर्णीशब्द: s,
      पता: s,
      एप्लेट: s,
      क्षेत्र: {
        attrs: {
          अथवा: null, एचआरइएफ: null, लक्ष्य: null, गुनगुनाहट: null,
          मीडिया: media, "एचआरइएफ-भाषा": langs, प्रकार: null,
          आकार: ["default", "rect", "circle", "poly"],
//          coords: null
        }
      },
      लेख: s,
      अलग: s,
      ऑडियो: {
        attrs: {
          एसआरसी: null, मीडियाग्रुप: null,
          क्रॉसोरिजिन: ["anonymous", "use-credentials"],
          प्रीलोड: ["none", "metadata", "auto"],
          स्वतप्ले: ["", "autoplay"],
          कुंडली: ["", "loop"],
          नियंत्रण: ["", "controls"]
        }
      },
      मोटा: s,
      बेस: { attrs: { एचआरइएफ: null, लक्ष्य: targets } },
      बेसफोंट: s,
      बड़ी: s,
      बीडीऒ: s,
      बड़ा: s,
      ब्लॉककोट: { attrs: { कथन: null } },
      बौडी: s,
      बर: s,
      बटन: {
        attrs: {
          प्रपत्र: null, गठन: null, नाम: null, मूल्य: null,
          ऑटोफोकस: ["", "autofocus"],
          विकलांग: ["", "autofocus"],
          एनक्टाइप: encs,
          तरीका: methods,
          नवजागरण: ["", "novalidate"],
          लक्ष्य: targets,
          प्रकार: ["submit", "reset", "button"]
        }
      },
      कैनवस: { attrs: { चौड़ाई: null, उंचाई: null } },
      कैपशन: s,
      केंद्र: s,
      कथन: s,
      कोड: s,
      कौल: { attrs: { अवधि: null } },
      कौलग़ऱ्प: { attrs: { अवधि: null } },
      आदेश: {
        attrs: {
          प्रकार: ["command", "checkbox", "radio"],
          लेबल: null, आइकन: null, रेडियोग्रुप: null, आदेश: null, शीर्षक: null,
          विकलांग: ["", "disabled"],
          जाँच: ["", "checked"]
        }
      },
      डेटा: { attrs: { मूल्य: null } },
      डेटाग्रिड: { attrs: { विकलांग: ["", "disabled"], विभिन्न: ["", "multiple"] } },
      डेटालिस्ट: { attrs: { आंकड़े: null } },
      डीडी: s,
      हटा: { attrs: { कथन: null, दिनांकऔरसमय: null } },
      विवरण: { attrs: { खुला: ["", "open"] } },
      परिभाषा: s,
      तुमसे: s,
      डिव: s,
      संवाद: { attrs: { खुला: null } },
      डील: s,
      डीटी: s,
      ज़ोर: s,
      एम्बेड: { attrs: { एसआरसी: null, प्रकार: null, चौड़ाई: null, उंचाई: null } },
      घटनास्रोत: { attrs: { एसआरसी: null } },
      फील्डसैट: { attrs: { विकलांग: ["", "disabled"], प्रपत्र: null, नाम: null } },
      अंजीरकैप्शन: s,
      चितऱ: s,
      फ़ॉन्ट: s,
      रेखा: s,
      फ़ार्म: {
        attrs: {
          कार्य: null, नाम: null,
          "स्वीकारकरें-वर्णसेट": charsets,
          स्वतपूर्ण: ["on", "off"],
          एनक्टाइप: encs,
          तरीका: methods,
          नवजागरण: ["", "novalidate"],
          लक्ष्य: targets
        }
      },
      ढांचा: s,
      फ्रेमसेट: s,
      ह1: s, ह2: s, ह3: s, ह4: s, ह5: s, ह6: s,
      हैड: {
        attrs: {},
        children: ["शीर्षक", "बेस", "कड़ी", "शैली", "मैटा", "लिपि", "नोलिपि", "आदेश"]
      },
      हैडर: s,
      हगऱुप: s,
      एचआर: s,
      भामल: {
        attrs: { घोषणापत्र: null },
        children: ["हैड", "बौडी"]
      },
      तिरछा: s,
      आईफ्रेम: {
        attrs: {
          एसआरसी: null, "एसआरसी-दस्तावेज़": null, नाम: null, चौड़ाई: null, उंचाई: null,
          सैंडबॉक्स: ["allow-top-navigation", "allow-same-origin", "allow-forms", "allow-scripts"],
          निर्बाध: ["", "seamless"]
        }
      },
      चित्र: {
        attrs: {
          अथवा: null, एसआरसी: null, इस्माप: null, यूज़मैप: null, चौड़ाई: null, उंचाई: null,
          क्रॉसोरिजिन: ["anonymous", "use-credentials"]
        }
      },
      इनपुट: {
        attrs: {
          अथवा: null, दिरनाम: null, प्रपत्र: null, गठन: null,
          उंचाई: null, सूची: null, मैक्स: null, अधिकतमलंबाई: null, मिनट: null,
          नाम: null, प्रतिरूप: null, प्लेसहोल्डर: null, माप: null, एसआरसी: null,
          कदम: null, मूल्य: null, चौड़ाई: null,
          स्वीकारकरना: ["audio/*", "video/*", "image/*"],
          स्वतपूर्ण: ["on", "off"],
          ऑटोफोकस: ["", "autofocus"],
          जाँच: ["", "checked"],
          विकलांग: ["", "disabled"],
          फॉर्मेंक्टाइप: encs,
          तरीका: methods,
          फॉर्मनोवालिडेट: ["", "novalidate"],
          लक्ष्य: targets,
          विभिन्न: ["", "multiple"],
          केवलपठनीय: ["", "readonly"],
          आवश्यक: ["", "required"],
          प्रकार: ["hidden", "text", "search", "tel", "url", "email", "password", "datetime", "date", "month",
                 "week", "time", "datetime-local", "number", "range", "color", "checkbox", "radio",
                 "file", "submit", "image", "reset", "button"]
        }
      },
      डाल: { attrs: { कथन: null, दिनांकऔरसमय: null } },
      कीबोर्ड: s,
      कुंजी: {
        attrs: {
          चुनौती: null, प्रपत्र: null, नाम: null,
          ऑटोफोकस: ["", "autofocus"],
          विकलांग: ["", "disabled"],
          keytype: ["RSA"]
        }
      },
      लेबल: { attrs: { "for": null, प्रपत्र: null } },
      उपाख्या: s,
      सूची: { attrs: { मूल्य: null } },
      कड़ी: {
        attrs: {
          एचआरइएफ: null, प्रकार: null,
          "एचआरइएफ-भाषा": langs,
          मीडिया: media,
          परिमाण: ["all", "16x16", "16x16 32x32", "16x16 32x32 64x64"]
        }
      },
      नक्शा: { attrs: { नाम: null } },
      निशान: s,
      मेनू: { attrs: { लेबल: null, प्रकार: ["list", "context", "toolbar"] } },
      मैटा: {
        attrs: {
          विषय: null,
          वर्णसेट: charsets,
          नाम: ["viewport", "application-name", "author", "description", "generator", "keywords"],
          "http-equiv": ["content-language", "content-type", "default-style", "refresh"]
        }
      },
      मीटर: { attrs: { मूल्य: null, मिनट: null, कम: null, उच्च: null, मैक्स: null, इष्टतम: null } },
      पथ: s,
      नोफ्रेम्स: s,
      नोलिपि: s,
      वस्तु: {
        attrs: {
          आंकड़े: null, प्रकार: null, नाम: null, यूज़मैप: null, प्रपत्र: null, चौड़ाई: null, उंचाई: null,
          typemustmatch: ["", "typemustmatch"]
        }
      },
      आसूची: { attrs: { औंधा: ["", "reversed"], शुरु: null, प्रकार: ["1", "a", "A", "i", "I"] } },
      विसमूह: { attrs: { विकलांग: ["", "disabled"], लेबल: null } },
      विकल्प: { attrs: { विकलांग: ["", "disabled"], लेबल: null, चुनलिया: ["", "selected"], मूल्य: null } },
      उत्पाद: { attrs: { "for": null, प्रपत्र: null, नाम: null } },
      पैरा: s,
      परम: { attrs: { नाम: null, मूल्य: null } },
      पूर्व: s,
      प्रगति: { attrs: { मूल्य: null, मैक्स: null } },
      क़्: { attrs: { कथन: null } },
      आरपी: s,
      आरटी: s,
      रूबी: s,
      एस: s,
      नमूना: s,
      लिपि: {
        attrs: {
          प्रकार: ["text/javascript"],
          एसआरसी: null,
          अतुल्यकालिक: ["", "async"],
          आस्थगितकरें: ["", "defer"],
          वर्णसेट: charsets
        }
      },
      भाग: s,
      चयन: {
        attrs: {
          प्रपत्र: null, नाम: null, माप: null,
          ऑटोफोकस: ["", "autofocus"],
          विकलांग: ["", "disabled"],
          विभिन्न: ["", "multiple"]
        }
      },
      छोटा: s,
      स्रोत: { attrs: { एसआरसी: null, प्रकार: null, मीडिया: null } },
      पाट: s,
      हड़ताल: s,
      बल: s,
      शैली: {
        attrs: {
          प्रकार: ["text/css"],
          मीडिया: media,
          दायरा: null
        }
      },
      अनु: s,
      सारांश: s,
      उत्तम: s,
      टेबल: s,
      टीबौडी: s,
      टीडी: { attrs: { कॉल्सपन: null, रोस्पेन: null, हेडर: null } },
      पाठक्षेत्र: {
        attrs: {
          दिरनाम: null, प्रपत्र: null, अधिकतमलंबाई: null, नाम: null, प्लेसहोल्डर: null,
          पंक्तियों: null, कॉलम: null,
          ऑटोफोकस: ["", "autofocus"],
          विकलांग: ["", "disabled"],
          केवलपठनीय: ["", "readonly"],
          आवश्यक: ["", "required"],
          wrap: ["soft", "hard"]
        }
      },
      टीफुट: s,
      टीह: { attrs: { कॉल्सपन: null, रोस्पेन: null, हेडर: null, दायरा: ["row", "col", "rowgroup", "colgroup"] } },
      टीहैड: s,
      समय: { attrs: { दिनांकऔरसमय: null } },
      शीर्षक: s,
      टीर: s,
      संकरारास्ता: {
        attrs: {
          एसआरसी: null, लेबल: null, "default": null,
          मेहरबान: ["subtitles", "captions", "descriptions", "chapters", "metadata"],
          "एसआरसी-भाषा": langs
        }
      },
      टीटी: s,
      तुम: s,
      असूची: s,
      बदल: s,
      वीडियो: {
        attrs: {
         एसआरसी: null, poster: null, चौड़ाई: null, उंचाई: null,
          क्रॉसोरिजिन: ["anonymous", "use-credentials"],
          प्रीलोड: ["auto", "metadata", "none"],
          स्वतप्ले: ["", "autoplay"],
          मीडियाग्रुप: ["movie"],
          म्यूटकिएगए: ["", "muted"],
          नियंत्रण: ["", "controls"]
        }
      },
      वबर: s
    };
  var style= ["पंक्तिबद्ध-विषय", "पंक्तिबद्ध-विषयवस्तु", "पंक्तिबद्ध-व्यक्तित्व", "सब", "सजिव", "सजिव-विलंब", "सजिव-दिशा", "सजिव-काल",
  "सजिव-भरण-प्रकार", "सजिव-दुबारा-संख्या", "सजिव-नाम", "सजिव-अभिनय-अवस्था", "सजिव-समय-कार्य", "पिछवाडा-दृश्य", "पृष्ठभुमि",
  "पृष्ठभुमि-जोड", "पृष्ठभुमि-मिश्रण-प्रकार", "पृष्ठभुमि-कतरन", "पृष्ठभुमि-रंग", "पृष्ठभुमि-चित्र", "पृष्ठभुमि-उगम", "पृष्ठभुमि-स्थान", "पृष्ठभुमि-दुबारा",
  "पृष्ठभुमि-आकार", "सिमा", "सिमा-तल", "सिमा-तल-रंग", "सिमा-तल-बाया-दायरा", "सिमा-तल-दाया-दायरा", "सिमा-तल-शैलि", "सिमा-तल-चौडा",
  "सिमा-विफल", "सिमा-रंग", "सिमा-चित्र", "सिमा-चित्र-बढाना", "सिमा-चित्र-दुबारा", "सिमा-चित्र-भाग", "सिमा-चित्र-मुल", "सिमा-चित्र-चौडा",
  "सिमा-बाया", "सिमा-बाया-रंग", "सिमा-बाया-शैलि", "सिमा-बाया-चौडा", "सिमा-दायरा", "सिमा-दाया", "सिमा-दाया-रंग", "सिमा-दाया-शैलि",
  "सिमा-दाया-चौडा", "सिमा-खालीजगह", "सिमाशैलि", "सिमा-शिर्ष", "सिमा-शिर्ष-रंग", "सिमा-शिर्ष-बाया-दायरा", "सिमा-शिर्ष-दाया-दायरा",
  "सिमा-शिर्ष-शैलि", "सिमा-शिर्ष-चौडा", "सिमा-चौडा", "तल", "बक्सा-सजावट-विराम", "बक्सा-साया", "बक्सा-आकारमे", "विराम-बाद",
  "विराम-पहला", "विराम-भितर", "अनुशिर्षक-बगल", "कर्सर-रंग", "@व्यक्तित्वसंच", "साफ", "कतरन", "रंग", "स्तंभ-संख्या", "स्तंभ-भरण",
  "स्तंभ-दरार", "स्तंभ-नियम", "स्तंभ-नियम-रंग", "स्तंभ-नियम-शैलि", "स्तंभ-नियम-चौडा", "स्तंभ-अवधि", "स्तंभ-चौडा", "स्तंभ-संख्या",
  "विषय", "काउंटर-वृद्धि", "काउंटर-कायम", "कर्सर", "दिशा", "प्रदर्शन", "खालि-कक्ष", "छान", "लचिला", "लचिला-मुल", "लचिला-दिशा",
    "लचिला-बहाव", "लचिला-बढ", "लचिला-संकोच", "लचिला-आवरण", "तैर", "लिपि", "@लिपि-चेहरा", "लिपि-परिवार", "लिपि-विशेष-समायोजन",
    "@लिपि-विशेष-किमत", "लिपि-रिक्तिसमायोजन", "लिपि-भाषा-निरस्त", "लिपि-आकार", "लिपि-आकार-समायोजन", "लिपि-विस्तार", "लिपि-शैली",
    "लिपि-संश्लेषण", "लिपि-भिन्न", "लिपि-भिन्न-विकल्प", "लिपि-भिन्न-बडाअक्षर", "लिपि-भिन्न-पुर्व-एशियन", "लिपि-भिन्न-संयोजन", "लिपि-भिन्न-क्रमांक",
    "लिपि-भिन्न-स्थान", "लिपि-भार", "दरार", "जाल", "जाल-क्षेत्र", "जाल-स्वयम-स्तंभ", "जाल-स्वयम-बहाव", "जाल-स्वयम-पंक्तिया", "जाल-स्तंभ", "जाल-स्तंभ-अंत", "जाल-स्तंभ-दरार", "जाल-स्तंभ-आरंभ", "जाल-दरार", "जाल-पंक्ति", "जाल-पंक्ति-अंत", "जाल-पंक्ति-दरार", "जाल-पंक्ति-आरंभ", "जाल-सांचा", "जाल-सांचा-क्षेत्र", "जाल-सांचा-स्तंभ", "जाल-सांचा-पंक्तिया", "लटकनेवाले-विरामचिन्ह", "उंचाई", "योजकचिन्ह", "चित्र-प्रस्तुति", "@आयात", "विलग", "उचित-विषय", "@मुख्यतस्विर", "बाया", "वर्ण-खालिजगह", "रेखा-विराम", "रेखा-उंचाई", "सुची-शैली", "सुची-शैली-चित्र", "सुची-शैली-स्थान", "सुची-शैली-प्रकार", "हािशया", "हाशिया-तल", "हाशिया-बाया", "हाशिया-दाया", "हाशिया-शिर्ष", "मुखौटा", "मुखौटा-कतरन", "मुखौटा-मिश्रण", "मुखौटा-चित्र", "मुखौटा-प्रकार", "मुखौटा-उगम", "मुखौटा-स्थान", "मुखौटा-दुबारा", "मुखौटा-आकार", "मुखौटा-प्रकार", "अधिकतम-उंचाई", "अधिकतम-चौडा", "@माध्यम", "लघु-उंचाई", "लघु-चौडा", "मिश्र-मिश्रण-प्रकार", "प्रयोजन-ठिक", "प्रयोजन-स्थान", "अपारदर्शकता", "क्रम", "अप्रयुक्त", "बाह्यरेखा", "बाह्यरेखा-रंग", "बाह्यरेखा-बदल", "बाह्यरेखा-शैली", "बाह्यरेखा-चौडा", "अधिकबहाव", "अधिकबहाव-आवरण", "अधिकबहाव-क्ष", "अधिकबहाव-व", "भराई", "भराई-तल", "भराई-बाया", "भराई-दाया", "भराई-शिर्ष", "पन्ना-विराम-बाद", "पन्ना-विराम-पहला", "पन्ना-विराम-भितर", "दृष्टिकोन", "दृष्टिकोन-उगम", "निर्देश-कार्य", "स्थान", "उद्धरणचिन्ह", "आकारबदल", "दाया", "पंक्ति-दरार", "घुमाव-आचरण", "टॅब-आकार", "टेबल-नक्शा", "अक्षर-पंक्तिबद्ध", "अक्षर-पंक्तिबद्ध-अंतिम", "अक्षर-जुडना-सिधा", "अक्षर-सजावट", "अक्षर-सजावट-रंग", "अक्षर-सजावट-रेखा", "अक्षर-सजावट-शैली", "अक्षर-अंतर", "अक्षर-उचित", "अक्षर-दिशानिर्देश", "अक्षर-अधिकबहाव", "अक्षर-साया", "अक्षर-परिवर्तन", "अक्षर-अधोरेखा-स्थान", "शिर्ष", "परिवर्तन", "परिवर्तन-उगम", "परिवर्तन-शैली", "संक्रमण", "संक्रमण-विलंब", "संक्रमण-कालावधी", "संक्रमण-गुण", "संक्रमण-समय-कार्य", "युनिकोड-भाषाए", "उपयोगकर्ता-चयन",
  "खडा-पंक्तिबद्ध", "दृश्य", "सफेद-जगह", "खालि-रेखाए", "चौडा", "शब्द-विराम", "शब्द-खालिजगह", "शब्द-आवरण", "लिखावट-प्रकार", ]
    var globalAttrs = {
      आगमनचाबी: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      "कक्षा": null,
     संतोषप्रद: ["true", "false"],
//      contextmenu: null,
      तुमसे: ["ltr", "rtl", "auto"],
      खींचनेयोग्य: ["true", "false", "auto"],
      "ड्रॉप-क्षेत्र": ["copy", "move", "link", "string:", "file:"],
      छुपेहुए: ["hidden"],
      पहचान: null,
      अगतिक: ["inert"],
      "सामान-आईडी": null,
      आइटमप्रॉप: null,
//      itemref: null,
//      itemscope: ["itemscope"],
//      itemtype: null,
      लैंग: ["en", "es"],
      वर्तनीकीजाँच: ["true", "false"],
      "स्वत:-सुधार": ["true", "false"],
      "स्वत:-ूंजीकरण": ["true", "false"],
      शैली: style,
      टैबिंडेक्स: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      शीर्षक: null,
      अनुवादकरना: ["yes", "no"],
      क्लिकपर: null,
      रेले: ["stylesheet", "alternate", "author", "bookmark", "help", "license", "next", "nofollow", "noreferrer", "prefetch", "prev", "search", "tag"]
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
  