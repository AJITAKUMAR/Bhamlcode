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
          "दूर-संदर्भ": null, पिंग: null, type: null,
          माध्यम: media,
          लक्ष्य: targets,
          "दूर-संदर्भ-भाषा": langs
        }
      },
      संक्षेप: s,
      पत्ता: s,
      क्षेत्र: {
        attrs: {
          पर्यायी: null, समन्वय: null, "दूर-संदर्भ": null, लक्ष्य: null, पिंग: null,
          माध्यम: media, "दूर-संदर्भ-भाषा": langs, प्रकार: null,
          आकार: ["default", "rect", "circle", "poly"]
        }
      },
      लेख: s,
      बाजुला: s,
      आवाज: {
        attrs: {
          उगम: null, "माध्यम-गट": null,
          "क्रॉस-मूळ": ["anonymous", "use-credentials"],
          प्रीलोड: ["none", "metadata", "auto"],
          "स्वंय-सुरवात": ["", "autoplay"],
          चक्र: ["", "loop"],
          नियंत्रण: ["", "controls"]
        }
      },
      जाड: s,
      पाया: { attrs: { "दूर-संदर्भ": null, लक्ष्य: targets } },
      बेसफॉन्ट: s,
      वेगळा: s,
      उलट: s,
      नमुना: { attrs: { अवतरण: null } },
      देह: s,
      खंड: s,
      बटण: {
        attrs: {
          स्वरूप: null, निर्मिती: null, नाव: null, मूल्य: null,
          "स्वंय-लक्षकेंद्रित": ["", "autofocus"],
          अक्षम: ["", "autofocus"],
          "स्वरूपाचा-प्रकार": encs,
          //formmethod: methods,
          "फॉर्म-वैध-नाही": ["", "novalidate"],
          //formtarget: targets,
          प्रकार: ["submit", "reset", "button"]
        }
      },
      कापड: { attrs: { रुंदी: null, उंची: null } },
      मथळा: s,
      अवतरण: s,
      कोड: s,
      स्तंभ: { attrs: { कालावधी: null } },
      स्तंभगट: { attrs: { कालावधी: null } },
      आदेश: {
        attrs: {
          प्रकार: ["command", "checkbox", "radio"],
          लेबल: null, चिन्ह: null, "रेडिओ-गट": null, आदेश : null, शीर्षक: null,
          अक्षम: ["", "disabled"],
          तपासले: ["", "checked"]
        }
      },
      डेटा: { attrs: { मूल्य: null } },
      डेटायादी: { attrs: { डेटा: null } },
      विवरण: s,
      वगळा: { attrs: { अवतरण: null, "तारीख-वेळ": null } },
      तपशील: { attrs: { उघडा: ["", "open"] } },
      व्याख्या: s,
      डिव: s,
      संवाद: { attrs: { उघडा: null } },
      विवरणयादी: s,
      विवरणनाव: s,
      जोर: s,
      अंतर्भूत: { attrs: { उगम: null, प्रकार: null, रुंदी: null, उंची: null } },
      क्षेत्रनिर्धारण: { attrs: { अक्षम: ["", "disabled"], स्वरूप: null, नाव: null } },
      प्रतिमा: s,
      तळटीप: s,
      फॉर्म: { 
        attrs: {
          क्रिया: null, नाव: null,
          "स्वीकार-अक्षरसंच": charsets,
          स्वयंपूर्ण: ["on", "off"],
          एन्टाइप: encs,
          पद्धत: methods,
          "प्रमाणीकरण-नाही": ["", "novalidate"],
          लक्ष्य: targets
        }
      },
      ह1: s, ह2: s, ह3: s, ह4: s, ह5: s, ह6: s,
      हेड: {
        attrs: {},
        children: ["पदवी", "पाया", "दुवा", "शैली", "मेटा", "लिपी", "नालिपी", "आदेश"]
      },
      हेडर: s,
      हगऱुप: s,
      "आडवी-रेषा": s,
      भामल: {
        attrs: { प्रकट: null },
        children: ["हेड", "देह"]
      },
      तिरपा: s,
      आयफ्रेम: {
        attrs: {
          उगम: null, "फाइलचा-उगम": null, नाव: null, रुंदी: null, उंची: null,
          सँडबॉक्स: ["allow-top-navigation", "allow-same-origin", "allow-forms", "allow-scripts"],
          अखंड: ["", "seamless"]
        }
      },
      चित्र: {
        attrs: {
          पर्यायी: null, उगम: null, "नकाशा-आहे": null, "नकाशा-वापर": null, रुंदी: null, उंची: null,
          "क्रॉस-मूळ": ["anonymous", "use-credentials"]
        }
      },
      इनपुट: {
        attrs: {
          पर्यायी: null,"मार्गदर्शिका-नाव": null, स्वरूप: null, निर्मिती: null,
          उंची: null, यादी: null, कमाल: null, "कमाल-लांबी": null, किमान: null,
          नाव: null, नमुना: null, प्लेसहोल्डर: null, माप: null, उगम: null,
          पाऊल: null, मूल्य: null, रुंदी: null,
          स्वीकार: ["audio/*", "video/*", "image/*"],
          स्वयंपूर्ण: ["on", "off"],
          "स्वंय-लक्षकेंद्रित": ["", "autofocus"],
          तपासले: ["", "checked"],
          अक्षम: ["", "disabled"],
          "स्वरूपाचा-प्रकार": encs,
          formmethod: methods,
          "फॉर्म-वैध-नाही": ["", "novalidate"],
          formtarget: targets,
          एकाधिक: ["", "multiple"],
          "फक्त-वाचा": ["", "readonly"],
          आवश्यक: ["", "required"],
          प्रकार: ["hidden", "text", "search", "tel", "url", "email", "password", "datetime", "date", "month",
                 "week", "time", "datetime-local", "number", "range", "color", "checkbox", "radio",
                 "file", "submit", "image", "reset", "button"]
        }
      },
      समाविष्ट: { attrs: { अवतरण: null, "तारीख-वेळ": null } },
      कीबोर्ड: s,
      किल्ली: {
        attrs: {
          आव्हान: null, स्वरूप: null, नाव: null,
          "स्वंय-लक्षकेंद्रित": ["", "autofocus"],
          अक्षम: ["", "disabled"],
          keytype: ["RSA"]
        }
      },
      लेबल: { attrs: { "for": null, स्वरूप: null } },
      चित्रविवरण: s,
      यादी: { attrs: { मूल्य: null } },
      दुवा: {
        attrs: {
          "दूर-संदर्भ": null, प्रकार: null,
          "दूर-संदर्भ-भाषा": langs,
          माध्यम: media,
          मापे: ["all", "16x16", "16x16 32x32", "16x16 32x32 64x64"]
        }
      },
      नकाशा: { attrs: { नाव: null } },
      खूण: s,
      मेनू: { attrs: { लेबल: null, प्रकार: ["list", "context", "toolbar"] } },
      मेटा: {
        attrs: {
          आशय: null,
          अक्षरसंच: charsets,
          नाव: ["viewport", "application-name", "author", "description", "generator", "keywords"],
          "http-equiv": ["content-language", "content-type", "default-style", "refresh"]
        }
      },
      मीटर: { attrs: { मूल्य: null, किमान: null, कमी: null, उंच: null, कमाल: null, इष्टतम: null } },
      पथ: s,
      नालिपी: s,
      वस्तू: {
        attrs: {
          डेटा: null, प्रकार: null, नाव: null, "नकाशा-वापर": null, स्वरूप: null, रुंदी: null, उंची: null,
          typemustmatch: ["", "typemustmatch"]
        }
      },
      अनुक्रम: { attrs: { उलट: ["", "reversed"], प्रारंभ: null, प्रकार: ["1", "a", "A", "i", "I"] } },
      पर्यायगट: { attrs: { अक्षम: ["", "disabled"], लेबल: null } },
      पर्याय: { attrs: { अक्षम: ["", "disabled"], लेबल: null, निवडले: ["", "selected"], मूल्य: null } },
      तयार: { attrs: { "for": null, स्वरूप: null, नाव: null } },
      परिच्छेद: s,
      परामूल्य: { attrs: { नाव: null, मूल्य: null } },
      पूर्व: s,
      प्रगति: { attrs: { मूल्य: null, कमाल: null } },
      अवतरण: { attrs: { अवतरण: null } },
      कंस: s,
      सखोल: s,
      रूबी: s,
      खोडा: s,
      नमूना: s,
      लिपी: {
        attrs: {
          प्रकार: ["text/javascript"],
          उगम: null,
          समकालिक: ["", "async"],
          टाळणे: ["", "defer"],
          अक्षरसंच: charsets
        }
      },
      भाग: s,
      निवड: {
        attrs: {
          स्वरूप: null, नाव: null, माप: null,
          "स्वंय-लक्षकेंद्रित": ["", "autofocus"],
          अक्षम: ["", "disabled"],
          एकाधिक: ["", "multiple"]
        }
      },
      छोटे: s,
      उगमस्थान: { attrs: { उगम: null, प्रकार: null, माध्यम: null } },
      विस्तार: s,
      प्रबल: s,
      शैली: {
        attrs: {
          प्रकार: ["text/css"],
          माध्यम: media,
          scoped: null
        }
      },
      तलरेखित: s,
      सारांश: s,
      शिरोरेखित: s,
      टेबल: s,
      "टेबल-बॉडी": s,
      ताडेटा: { attrs: { "स्तंभ-अवधी": null, "पंक्ती-कालावधी": null, शीर्षलेख: null } },
      पाठक्षेत्र: {
        attrs: {
          "मार्गदर्शिका-नाव": null, स्वरूप: null, "कमाल-लांबी": null, नाव: null, प्लेसहोल्डर: null,
          पंक्ती: null, स्तंभ: null,
          "स्वंय-लक्षकेंद्रित": ["", "autofocus"],
          अक्षम: ["", "disabled"],
          "फक्त-वाचा": ["", "readonly"],
          आवश्यक: ["", "required"],
          लपेट: ["soft", "hard"]
        }
      },
      टेबलतळ: s,
      टेबलहेडर: { attrs: { "स्तंभ-अवधी": null, "पंक्ती-कालावधी": null, शीर्षलेख: null, व्याप्ती: ["row", "col", "rowgroup", "colgroup"] } },
      टेबलहेड: s,
      वेळ: { attrs: { "तारीख-वेळ": null } },
      पदवी: s,
      टेबलओळ: s,
      ट्रॅक: {
        attrs: {
          उगम: null, लेबल: null, "default": null,
          kind: ["subtitles", "captions", "descriptions", "chapters", "metadata"],
          "भाषेचा-उगम": langs
        }
      },
      अधोरेखन: s,
      अक्रमित: s,
      चल: s,
      चलचित्र: {
        attrs: {
          उगम: null, poster: null, रुंदी: null, उंची: null,
          "क्रॉस-मूळ": ["anonymous", "use-credentials"],
          प्रीलोड: ["auto", "metadata", "none"],
         "स्वंय-सुरवात": ["", "autoplay"],
          "माध्यम-गट": ["movie"],
          "नि:शब्द" : ["", "muted"],
          नियंत्रण: ["", "controls"]
        }
      },
      "शब्द-खंड": s
    };

var style= [
  "पंक्तिबद्ध-विषय","पंक्तिबद्ध-विषयवस्तु","पंक्तिबद्ध-व्यक्तित्व","सर्व","सजिव","सजिव-विलंब","सजिव-दिशा","सजिव-काल","सजिव-भरण-प्रकार","सजिव-परत-संख्या","सजिव-नाव","सजिव-अभिनय-अवस्था","सजिव-वेळ-कार्य","मागचाभाग-दृश्य",
  "मागे","मागे-जोड","पृष्ठभुमि-मिश्रण-प्रकार","पृष्ठभुमि-काप","पृष्ठभुमि-रंग","पृष्ठभुमि-चित्र","पृष्ठभुमि-उगम","पृष्ठभुमि-स्थान","पृष्ठभुमि-परत","पृष्ठभुमि-आकार","सिमा","सिमा-तळ","सिमा-तळ-रंग","सिमा-तळ-डावा-आवाका","सिमा-तळ-उजवा-आवाका","सिमा-तळ-शैलि,सिमा-तळ-रुंदि","सिमा-विफल,सिमा-रंग","सिमा-चित्र","सिमा-चित्र-वाढ",
  "सिमा-चित्र-परत","सिमा-चित्र-भाग","सिमा-चित्र-मुळ","सिमा-चित्र-रुंदि","सिमा-डावा","सिमा-डावा-रंग","सिमा-डावा-शैलि","सिमा-डावा-रुंदि","सिमा-आवाका","सिमा-उजवा","सिमा-उजवा-रंग","सिमा-उजवा-शैलि","सिमा-उजवा-रुंदि",
  "सिमा-मोकळीजागा","सिमाशैलि","सिमा-शिर्ष","सिमा-शिर्ष-रंग","सिमा-शिर्ष-डावा-आवाका","सिमा-शिर्ष-उजवा-आवाका","सिमा-शिर्ष-शैलि","सिमा-शिर्ष-रुंदि","सिमा-रुंदि","तळ","खोका-सजावट-विराम","खोका-सावली","खोका-आकारात","विराम-मागचा","विराम-पहिला","विराम-आत","अनुशिर्षक-बाजु","कर्सर-रंग","@व्यक्तित्वसंच","उघड","कापकापरंग","स्तंभ-संख्या","स्तंभ-भरण","स्तंभ-फट","स्तंभ-नियम","स्तंभ-नियम-रंग","स्तंभ-नियम-शैलि","स्तंभ-नियम-रुंदि","स्तंभ-अवधि","स्तंभ-रुंदि","स्तंभ-संख्या","विषय","काउंटर-वृद्धि","काउंटर-कायम","कर्सर","दिशा","प्रदर्शन","मोकळा-कक्ष","गाळण","लवचिक","लवचिक-मुल","लवचिक-दिशा","लवचिक-प्रवाह","लवचिक-वाढ","लवचिक-संकोच","लवचिक-आवरण",
  ,"लिपि","@लिपि-चेहरा","लिपि-परिवार","लिपि-विशेष-समायोजन","@लिपि-विशेष-किमत","लिपि-रिक्तिसमायोजन","लिपि-भाषा-निरस्त","लिपि-आकार","लिपि-आकार-समायोजन","लिपि-विस्तार","लिपि-शैलि","लिपि-संश्लेषण","लिपि-भिन्नता","लिपि-भिन्नता-विकल्प","लिपि-भिन्नता-मोठेअक्षर","लिपि-भिन्नता-पुर्व-एशियन","लिपि-भिन्नता-संयोजन","लिपि-भिन्नता-क्रमांक","लिपि-भिन्नता-स्थान","लिपि-भार","फट","जाळे","जाळे-क्षेत्र","जाळे-स्वयम-स्तंभ","जाळे-स्वयम-प्रवाह","जाळे-स्वयम-ओळी","जाळे-स्तंभ",
  "जाळे-स्तंभ-अंत","जाळे-स्तंभ-फट","जाळे-स्तंभ-आरंभ","जाळे-फट","जाळे-ओळ","जाळे-ओळ-अंत","जाळे-ओळ-फट","जाळे-ओळ-आरंभ","जाळे-सांचा","जाळे-सांचा-क्षेत्र","जाळे-सांचा-स्तंभ","जाळे-सांचा-ओळी","लटकनेवाले-विरामचिन्ह","उंचाई","योजकचिन्ह","चित्र-प्रस्तुति","@आयात","विलग","उचित-विषय","@मुख्यरचना","डावा","वर्ण-मोकळीजागा","रेखा-विराम","रेखा-उंचाई","सुची-शैली","सुची-शैली-चित्र","सुची-शैली-स्थान","सुची-शैली-प्रकार","समास","समास-तळ","समास-डावा","समास-उजवा","समास-शिर्ष","मुखौटा","मुखौटा-काप","मुखौटा-मिश्रण","मुखौटा-चित्र","मुखौटा-प्रकार",
  "मुखौटा-उगम","मुखौटा-स्थान","मुखौटा-परत","मुखौटा-आकार","मुखौटा-प्रकार","अधिकतम-उंचाई","अधिकतम-रुंदी","@माध्यमलघु-उंचाई","लघु-रुंदी","मिश्र-मिश्रण-प्रकार","प्रयोजन-ठिक","प्रयोजन-स्थान","अपारदर्शकता","क्रम","अप्रयुक्त","बाह्यरेखा","बाह्यरेखा-रंग","बाह्यरेखा-बदल","बाह्यरेखा-शैली","बाह्यरेखा-रुंदी","मोठाप्रवाह","मोठाप्रवाह-आवरण","मोठाप्रवाह-क्ष","मोठाप्रवाह-व","भराई","भराई-तळ","भराई-डावा","भराई-उजवा","भराई-शिर्ष","पान-विराम-मागचा","पान-विराम-पहिला","पान-विराम-आत","दृष्टिकोन","दृष्टिकोन-उगम","निर्देशक-कार्य","स्थान","उद्धरणचिन्ह","आकारबदल","उजवा","ओळ-फट","घुमाव-आचरण","टॅब-आकार","टेबल-नकाशा",
  "अक्षर-पंक्तिबद्ध","अक्षर-पंक्तिबद्ध-अंतिम","अक्षर-जुडना-सरळ","अक्षर-सजावट","अक्षर-सजावट-रंग","अक्षर-सजावट-रेखा","अक्षर-सजावट-शैली","अक्षर-अंतर","अक्षर-उचित","अक्षर-दिशानिर्देश","अक्षर-मोठाप्रवाह","अक्षर-सावली","अक्षर-परिवर्तन","अक्षर-अधोरेखा-स्थान","शिर्ष","परिवर्तन","परिवर्तन-उगम","परिवर्तन-शैली","संक्रमण",
  "संक्रमण-विलंब","संक्रमण-कालावधी","संक्रमण-गुण","संक्रमण-वेळ-कार्य","युनिकोड-भाषा","वापरकर्ता-निवड","उभा-पंक्तिबद्ध","दृश्य","पांढरी-जागा","मोकळ्या-रेषा","रुंदी","शब्द-विराम","शब्द-मोकळीजागा","शब्द-आवरण","लिखावट-प्रकार","झ-अनुक्रम"

   ]
  var globalAttrs = {
    आगमनचाबी: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    "कक्षा": null,
   संतोषप्रद: ["true", "false"],
//    contextmenu: null,
    तुमसे: ["ltr", "rtl", "auto"],
    खींचनेयोग्य: ["true", "false", "auto"],
    "ड्रॉप-क्षेत्र": ["copy", "move", "link", "string:", "file:"],
    छुपेहुए: ["hidden"],
    पहचान: null,
    अगतिक: ["inert"],
    "सामान-आईडी": null,
    आइटमप्रॉप: null,
//    itemref: null,
//    itemscope: ["itemscope"],
//    itemtype: null,
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
