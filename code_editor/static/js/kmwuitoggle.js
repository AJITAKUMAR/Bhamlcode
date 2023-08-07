(function () {
  if (!window.keyman.ui.name)
    try {
      var keymanweb = window.keyman,
        osk = keymanweb.osk,
        util = keymanweb.util,
        dbg = keymanweb.debug;
      if (util.isTouchDevice()) throw "";
      var ui = (keymanweb.ui = {
        name: "toggle",
        initialized: !1,
        controller: null,
        oskButton: null,
        kbdButton: null,
        controllerHovered: !1,
        keyboards: [],
        lastActiveKeyboard: -1,
        selectedMenuItem: null,
        updateList: !0,
        updateTimer: null,
      });
      ui.doFocus = function (a, b, c) {
        if (ui.initialized) {
          window.event && keymanweb.isAttached(window.event.srcElement) && (a = window.event.srcElement);
          b ? (ui.controller.style.display = "block") : keymanweb.getUIState().activationPending || ui.controllerHovered || (ui.controller.style.display = "none");
          c = util.getAbsolute(a);
          b = c.x;
          c = c.y;
          var d = a.ownerDocument;
          if ("on" == d.designMode && d.defaultView && d.defaultView.frameElement) {
            var e = d.defaultView.frameElement.clientWidth;
            a = d.defaultView.frameElement.clientHeight;
          } else (e = a.offsetWidth), (a = a.offsetHeight);
          b + e > window.innerWidth + document.documentElement.scrollLeft - ui.controller.offsetWidth - 1 ? (c += a) : ((b += e + 2), (c += a - 29));
          isNaN(b) || isNaN(c) || ((ui.controller.style.left = b + "px"), (ui.controller.style.top = c + "px"));
        }
      };
      keymanweb.addEventListener("controlfocused", function (a) {
        ui.doFocus(a.target, !0, a.activeControl);
      });
      keymanweb.addEventListener("controlblurred", function (a) {
        ui.doFocus(a.target, !1, null);
      });
      osk.addEventListener("show", function (a) {
        ui.controller.style.display = "block";
        ui.oskButton._setSelected(!0);
        return a;
      });
      osk.addEventListener("hide", function (a) {
        a.HiddenByUser && ui.oskButton._setSelected(!1);
      });
      ui.switchOsk = function () {
        "" == keymanweb.getActiveKeyboard() || keymanweb.isCJK() || osk.show(!osk.isEnabled());
      };
      ui.switchSingleKbd = function () {
        var a = "" == keymanweb.getActiveKeyboard(),
          b = 0;
        if (a) {
          if (0 == ui.keyboards.length) return;
          ui.lastActiveKeyboard < ui.keyboards.length && 0 <= ui.lastActiveKeyboard && (b = ui.lastActiveKeyboard);
          var c = ui.keyboards[b]._InternalName;
          var d = ui.keyboards[b]._LanguageCode;
          keymanweb.setActiveKeyboard(c, d);
          ui.lastActiveKeyboard = b;
        } else keymanweb.setActiveKeyboard("");
        ui.kbdButton && ui.kbdButton._setSelected(a);
      };
      ui.switchNextKbd = function () {
        var a = "" == keymanweb.getActiveKeyboard();
        if (a) {
          if (0 == ui.keyboards.length) return;
          var b = ui.keyboards[0]._InternalName;
          var c = ui.keyboards[0]._LanguageCode;
          keymanweb.setActiveKeyboard(b, c);
          ui.lastActiveKeyboard = 0;
        } else
          ui.lastActiveKeyboard == ui.keyboards.length - 1
            ? (keymanweb.setActiveKeyboard(""), (a = !1))
            : ((b = ui.keyboards[++ui.lastActiveKeyboard]._InternalName), (c = ui.keyboards[ui.lastActiveKeyboard]._LanguageCode), keymanweb.setActiveKeyboard(b, c), (a = !0));
        ui.kbdButton && ui.kbdButton._setSelected(a);
      };
      ui.button = function (a, b, c) {
        this._elem = this._onmouseout = this._onmouseover = this._onclick = null;
        this._over = this._down = !1;
        this._selected = c;
        this.getElem = function () {
          return this._owningObject._elem;
        };
        this.__updatestyle = function () {
          var a = this._owningObject._elem.style;
          this._owningObject._over
            ? ((a.margin = "0px"), this._owningObject._selected ? ((a.border = "solid 1px #ad4a28"), (a.background = "#dfb4b4")) : ((a.border = "solid 1px #dfb4b4"), (a.background = "#f3e5de")))
            : this._owningObject._selected
            ? ((a.background = "#f3e5de"), (a.margin = "0px"), (a.border = "solid 1px #ad4a28"))
            : ((a.background = "none"), (a.margin = "1px"), (a.border = "none"));
        };
        this.__mouseover = function () {
          ui.controllerHovered = !0;
          this._owningObject._over = !0;
          null != this._owningObject._onmouseover && this._owningObject._onmouseover();
          this._owningObject.__updatestyle();
        };
        this.__mouseout = function () {
          ui.controllerHovered = !1;
          this._owningObject._over = !1;
          null != this._owningObject._onmouseout && this._owningObject._onmouseout();
          this._owningObject.__updatestyle();
        };
        this.__click = function () {
          keymanweb.activatingUI(!1);
          return null != this._owningObject._onclick ? this._owningObject._onclick() : !1;
        };
        this.__mousedown = function () {
          keymanweb.activatingUI(!0);
          this._owningObject._down = !0;
          this._owningObject.__updatestyle();
          return !1;
        };
        this.__mouseup = function () {
          this._owningObject._down = !1;
          this._owningObject.__updatestyle();
        };
        this._setSelected = function (a) {
          keymanweb.activatingUI(!1);
          this._owningObject._selected = a;
          this._owningObject.__updatestyle();
        };
        this._getSelected = function () {
          return this._owningObject._selected;
        };
        this._getOver = function () {
          return this._owningObject._over;
        };
        this._getDown = function () {
          return this._owningObject._down;
        };
        this._owningObject = this;
        c = util.getOption("resources") + "ui/toggle/";
        var d = util.createElement("img");
        this._elem = util.createElement("div");
        this._elem._owningObject = this;
        d.style.display = "block";
        d.src = c + a;
        d.id = "KMW_Controller_Img";
        this._elem.style.margin = "0px";
        this._elem.style.width = "24px";
        this._elem.style.height = "24px";
        this._elem.style.zIndex = "10002";
        this._elem.style.lineHeight = "100%";
        this._elem.style.styleFloat = this._elem.style.cssFloat = "left";
        d.title = b;
        d.alt = b;
        this._elem.appendChild(d);
        this._elem.onmouseover = this.__mouseover;
        this._elem.onmouseout = this.__mouseout;
        this._elem.onmousedown = this.__mousedown;
        this._elem.onmouseup = this.__mouseup;
        d._owningObject = this;
        d.onclick = this.__click;
        this.__updatestyle();
        return this;
      };
      ui.initialize = ui.Initialize = function () {
        if (keymanweb.initialized && !util.isTouchDevice()) {
          ui.initialized ? (ui.controller.innerHTML = "") : (ui.controller = util.createElement("div"));
          var a = util.getOption("resources") + "ui/toggle/";
          ui.controller.style.background = "url(" + a + "kmwcontroller2x.gif)";
          ui.controller.style.padding = "1px 2px";
          a = util.loadCookie("KeymanWeb_Keyboard");
          var b = !1;
          "undefined" != typeof a.current && (b = 0 > a.current.indexOf("---"));
          ui.kbdButton = new ui.button("kmw_logo_16.gif", "Use Web Keyboard", b);
          ui.controller.appendChild(ui.kbdButton.getElem());
          a = util.loadCookie("KeymanWeb_OnScreenKeyboard");
          b = !0;
          "undefined" != typeof a.visible && (b = 1 == a.visible);
          ui.oskButton = new ui.button("kmw_osk_16.gif", "Show On Screen Keyboard", b);
          ui.oskButton._onclick = ui.switchOsk;
          ui.controller.appendChild(ui.oskButton.getElem());
          ui.initialized || (ui.controller.style.display = "none");
          ui.controller.style.zIndex = "10001";
          ui.controller.style.position = "absolute";
          ui.initialized || document.body.appendChild(ui.controller);
          ui.initialized = !0;
          ui.updateKeyboardList();
        }
      };
      ui.shutdown = function () {
        var a = ui.controller;
        a && a.parentNode.removeChild(a);
      };
      ui.updateKeyboardList = function () {
        if (keymanweb.initialized || ui.initialized) {
          ui.updateList = !1;
          var a = keymanweb.getKeyboards(),
            b = util.getOption("resources") + "ui/toggle/";
          if (1 < a.length) {
            var c = document.getElementById("KMW_Controller_Img");
            c.src = b + "kmw_logo_16_down.gif";
            c.style.width = "100%";
            ui.controller.style.background = "url(" + b + "kmwcontroller2x.gif)";
            ui.kbdButton.getElem().id = "kmwico";
            ui.kbdButton.getElem().style.width = "36px";
            ui.kbdButton._onmouseover = function () {
              ui.keyboardMenu.className = "sfhover";
            };
            ui.kbdButton._onmouseout = function () {
              ui.keyboardMenu.className = "sfunhover";
            };
            ui.kbdButton._onclick = null;
            ui.createMenu();
          } else
            1 == a.length &&
              ((c = document.getElementById("KMW_Controller_Img")),
              (c.src = b + "kmw_logo_16.gif"),
              (ui.kbdButton.getElem().id = "kmwico"),
              (ui.kbdButton.getElem().style.width = "24px"),
              (c = a[0].InternalName),
              (a = a[0].LanguageCode),
              (ui.controller.style.background = "url(" + b + "kmwcontroller2.gif)"),
              ui.keyboards.push({ _InternalName: c, _LanguageCode: a, _Index: 0 }),
              (ui.kbdButton._onclick = ui.switchSingleKbd),
              (ui.kbdButton._onmouseover = function () {}),
              (ui.kbdButton._onmouseout = function () {}),
              ui.createMenu(),
              "undefined" != typeof ui.keyboardMenu && delete ui.keyboardMenu);
          b = keymanweb.getSavedKeyboard().split(":");
          ui.updateMenu(b[0], b[1]);
        }
      };
      keymanweb.addEventListener("keyboardregistered", function (a) {
        ui.updateList = !0;
        ui.updateTimer && clearTimeout(ui.updateTimer);
        ui.updateTimer = setTimeout(ui.updateKeyboardList, 200);
      });
      keymanweb.addEventListener("keyboardchange", function (a) {
        ui.updateMenu(a.internalName, a.languageCode);
      });
      ui.selectKbd = function (a) {
        var b;
        if (0 > a) var c = (b = "");
        else (b = ui.keyboards[a]._InternalName), (c = ui.keyboards[a]._LanguageCode);
        keymanweb.setActiveKeyboard(b, c);
        keymanweb.focusLastActiveElement();
        ui.kbdButton._setSelected("" != b);
        0 <= a && (ui.lastActiveKeyboard = a);
        return !1;
      };
      ui.updateMenu = function (a, b) {
        var c,
          d = document.getElementById("KMWSel_$");
        for (c = 0; c < ui.keyboards.length; c++) ui.keyboards[c]._InternalName == a && ui.keyboards[c]._LanguageCode == b && (d = document.getElementById("KMWSel_" + ui.keyboards[c]._InternalName + "$" + ui.keyboards[c]._Index));
        d && (null != ui.selectedMenuItem && (ui.selectedMenuItem.className = ""), (d.className = "selected"), (ui.selectedMenuItem = d));
        ui.oskButton && ("cmn" == b || "jpn" == b || "kor" == b ? (ui.oskButton.getElem().style.display = "none") : "" == a ? (ui.oskButton.getElem().style.display = "none") : (ui.oskButton.getElem().style.display = "block"));
      };
      util.addStyleSheet(
        "#KeymanWeb_KbdList {display: block;position: absolute;width: auto;" +
          (8 > util.getIEVersion() ? "200px;" : "auto;") +
          "line-height: 100%;margin: 0;clear: both;float: none;top: auto;border: solid 2px #ad4a28;-moz-border-radius: 4px;-webkit-border-radius: 4px;border-radius: 4px;box-shadow: 4px 4px 2px rgba(136,136,136,.5);-webkit-box-shadow: 4px 4px 2px rgba(136,136,136,.5);-moz-box-shadow: 4px 4px 2px rgba(136,136,136,.5);" +
          (99 > util.getIEVersion() ? "filter:progid:DXImageTransform.Microsoft.DropShadow(OffX=4,OffY=4,Color=#80646464);" : "") +
          "list-style: none;padding: 0;background: white;max-height: 300px;overflow-y: scroll;overflow-x: hidden;white-space: nowrap;z-index: 10001; /* above the osk */}" +
          (7 > util.getIEVersion() ? "* html #KeymanWeb_KbdList {height: expression(this.scrollHeight > 299 ? '300px' : 'auto');}" : "") +
          ".sfunhover#KeymanWeb_KbdList {display: none; left: -999px;}.sfhover#KeymanWeb_KbdList {display: block;left: auto;}#KeymanWeb_KbdList li {float: none;width: auto;padding: 0;margin: 0;text-align: left;}#KeymanWeb_KbdList li a {display: block; padding: 2px 4px;color: #404040;font-family: Tahoma,Verdana,Arial,sans-serif;font-size: 8pt;text-decoration: none;}#KeymanWeb_KbdList li a.selected {font-weight: bold;color: black;}#KeymanWeb_KbdList li a:hover {color: white;background-color: #ad4a28;text-decoration: underline;}"
      );
      ui.createMenu = function () {
        "undefined" == typeof ui.keyboardMenu ? ((ui.keyboardMenu = util.createElement("ul")), (ui.keyboardMenu.id = "KeymanWeb_KbdList"), (ui.keyboardMenu.className = "sfunhover")) : (ui.keyboardMenu.innerHTML = "");
        var a = util.createElement("li"),
          b = util.createElement("a");
        b.innerHTML = "English";
        b.href = "#";
        b.onclick = function () {
          return ui.selectKbd(-1);
        };
        b.id = "KMWSel_$";
        b.className = "selected";
        a.appendChild(b);
        ui.selectedMenuItem = b;
        ui.keyboardMenu.appendChild(a);
        a = keymanweb.getKeyboards();
        b = [];
        ui.keyboards = [];
        for (var c = 0; c < a.length; c++) {
          var d = util.createElement("li"),
            e = util.createElement("a");
          e.innerHTML = a[c].LanguageName + " - " + a[c].Name;
          b[a[c].InternalName] || (b[a[c].InternalName] = 0);
          b[a[c].InternalName]++;
          var f = b[a[c].InternalName];
          ui.keyboards.push({ _InternalName: a[c].InternalName, _LanguageCode: a[c].LanguageCode, _Index: f });
          e.href = "#";
          e.onclick = (function (a) {
            return function () {
              return ui.selectKbd(a);
            };
          })(ui.keyboards.length - 1);
          e.id = "KMWSel_" + a[c].InternalName + "$" + f;
          d.appendChild(e);
          ui.keyboardMenu.appendChild(d);
        }
        ui.keyboardMenu.parentNode != ui.kbdButton.getElem() && ui.kbdButton.getElem().appendChild(ui.keyboardMenu);
      };
      keymanweb.addHotKey(191, 32, ui.switchSingleKbd);
      keymanweb.addHotKey(191, 48, ui.switchNextKbd);
      keymanweb.addHotKey(191, 64, ui.switchOsk);
      keymanweb.addEventListener("loaduserinterface", ui.Initialize);
      ui.Initialize();
    } catch (a) {}
})();
//# sourceMappingURL=kmwuitoggle.js.map
