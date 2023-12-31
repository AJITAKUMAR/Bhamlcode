/*
 https://github.com/paulmillr/es6-shim
 @license es6-shim Copyright 2013-2016 by Paul Miller (http://paulmillr.com)
   and contributors,  MIT License
 es6-shim: v0.35.4
 see https://github.com/paulmillr/es6-shim/blob/0.35.3/LICENSE
 Details and documentation:
 https://github.com/paulmillr/es6-shim/
 https://mths.be/codepointat v0.2.0 by @mathias  http://mths.be/startswith v0.2.0 by @mathias */
String.kmwFromCharCode = function (f) {
  var g = [],
    k;
  for (k = 0; k < arguments.length; k++) {
    var r = Number(arguments[k]);
    if (!isFinite(r) || 0 > r || 1114111 < r || Math.floor(r) !== r) throw new RangeError("Invalid code point " + r);
    65536 > r ? g.push(r) : ((r -= 65536), g.push((r >> 10) + 55296), g.push((r % 1024) + 56320));
  }
  return String.fromCharCode.apply(void 0, g);
};
String.prototype.kmwCharCodeAt = function (f) {
  var g = String(this),
    k = 0;
  if (0 > f || f >= g.length) return NaN;
  for (var r = 0; r < f; r++) if (((k = g.kmwNextChar(k)), null === k)) return NaN;
  f = g.charCodeAt(k);
  return 55296 <= f && 56319 >= f && g.length > k + 1 && ((g = g.charCodeAt(k + 1)), 56320 <= g && 57343 >= g) ? ((f - 55296) << 10) + (g - 56320) + 65536 : f;
};
String.prototype.kmwIndexOf = function (f, g) {
  var k = String(this);
  f = k.indexOf(f, g);
  if (0 > f) return f;
  for (var r = (g = 0); null !== r && r < f; r = k.kmwNextChar(r)) g++;
  return g;
};
String.prototype.kmwLastIndexOf = function (f, g) {
  var k = String(this);
  f = k.lastIndexOf(f, g);
  if (0 > f) return f;
  for (var r = (g = 0); null !== r && r < f; r = k.kmwNextChar(r)) g++;
  return g;
};
String.prototype.kmwLength = function () {
  var f = String(this);
  if (0 == f.length) return 0;
  for (var g = 0, k = 0; null !== k; g++) k = f.kmwNextChar(k);
  return g;
};
String.prototype.kmwSlice = function (f, g) {
  var k = String(this);
  f = k.kmwCodePointToCodeUnit(f);
  g = k.kmwCodePointToCodeUnit(g);
  return null === f || null === g ? "" : k.slice(f, g);
};
String.prototype.kmwSubstr = function (f, g) {
  var k = String(this);
  0 > f && (f = k.kmwLength() + f);
  0 > f && (f = 0);
  var r = k.kmwCodePointToCodeUnit(f),
    e = r;
  if (null === r) return "";
  if (2 > arguments.length) e = k.length;
  else for (var a = 0; a < g; a++) e = k.kmwNextChar(e);
  return null === e ? k.substring(r) : k.substring(r, e);
};
String.prototype.kmwSubstring = function (f, g) {
  var k = String(this);
  if ("undefined" == typeof g) (f = k.kmwCodePointToCodeUnit(f)), (g = k.length);
  else {
    if (f > g) {
      var r = f;
      f = g;
      g = r;
    }
    f = k.kmwCodePointToCodeUnit(f);
    g = k.kmwCodePointToCodeUnit(g);
  }
  if (isNaN(f) || null === f) f = 0;
  if (isNaN(g) || null === g) g = k.length;
  return k.substring(f, g);
};
String.prototype.kmwNextChar = function (f) {
  var g = String(this);
  if (null === f || 0 > f || f >= g.length - 1) return null;
  var k = g.charCodeAt(f);
  return 55296 <= k && 56319 >= k && g.length > f + 1 && ((k = g.charCodeAt(f + 1)), 56320 <= k && 57343 >= k) ? (f == g.length - 2 ? null : f + 2) : f + 1;
};
String.prototype.kmwPrevChar = function (f) {
  var g = String(this);
  if (null == f || 0 >= f || f > g.length) return null;
  var k = g.charCodeAt(f - 1);
  return 56320 <= k && 57343 >= k && 1 < f && ((g = g.charCodeAt(f - 2)), 55296 <= g && 56319 >= g) ? f - 2 : f - 1;
};
String.prototype.kmwCodePointToCodeUnit = function (f) {
  if (null === f) return null;
  var g = String(this),
    k = 0;
  if (0 > f) {
    k = g.length;
    for (var r = 0; r > f; r--) k = g.kmwPrevChar(k);
    return k;
  }
  if (f == g.kmwLength()) return g.length;
  for (r = 0; r < f; r++) k = g.kmwNextChar(k);
  return k;
};
String.prototype.kmwCodeUnitToCodePoint = function (f) {
  var g = String(this);
  return null === f ? null : 0 == f ? 0 : 0 > f ? g.substr(f).kmwLength() : g.substr(0, f).kmwLength();
};
String.prototype.kmwCharAt = function (f) {
  var g = String(this);
  return 0 <= f ? g.kmwSubstr(f, 1) : "";
};
String.prototype.kmwBMPNextChar = function (f) {
  var g = String(this);
  return 0 > f || f >= g.length - 1 ? null : f + 1;
};
String.prototype.kmwBMPPrevChar = function (f) {
  var g = String(this);
  return 0 >= f || f > g.length ? null : f - 1;
};
String.prototype.kmwBMPCodePointToCodeUnit = function (f) {
  return f;
};
String.prototype.kmwBMPCodeUnitToCodePoint = function (f) {
  return f;
};
String.prototype.kmwBMPLength = function () {
  return String(this).length;
};
String.prototype.kmwBMPSubstr = function (f, g) {
  var k = String(this);
  return -1 < f ? k.substr(f, g) : k.substr(k.length + f, -f);
};
String.kmwEnableSupplementaryPlane = function (f) {
  var g = String.prototype;
  String._kmwFromCharCode = f ? String.kmwFromCharCode : String.fromCharCode;
  g._kmwCharAt = f ? g.kmwCharAt : g.charAt;
  g._kmwCharCodeAt = f ? g.kmwCharCodeAt : g.charCodeAt;
  g._kmwIndexOf = f ? g.kmwIndexOf : g.indexOf;
  g._kmwLastIndexOf = f ? g.kmwLastIndexOf : g.lastIndexOf;
  g._kmwSlice = f ? g.kmwSlice : g.slice;
  g._kmwSubstring = f ? g.kmwSubstring : g.substring;
  g._kmwSubstr = f ? g.kmwSubstr : g.kmwBMPSubstr;
  g._kmwLength = f ? g.kmwLength : g.kmwBMPLength;
  g._kmwNextChar = f ? g.kmwNextChar : g.kmwBMPNextChar;
  g._kmwPrevChar = f ? g.kmwPrevChar : g.kmwBMPPrevChar;
  g._kmwCodePointToCodeUnit = f ? g.kmwCodePointToCodeUnit : g.kmwBMPCodePointToCodeUnit;
  g._kmwCodeUnitToCodePoint = f ? g.kmwCodeUnitToCodePoint : g.kmwBMPCodeUnitToCodePoint;
};
var com;
(function (f) {
  (function (f) {
    (function (f) {
      var g = (function () {
        function a(d, c) {
          this.p = d;
          this.d = c;
          this.o = a.ordinalSeed++;
        }
        a.prototype.match = function (a, c) {
          return this.p == a && this.d == c;
        };
        a.prototype.set = function () {
          this.matched = 1;
        };
        a.prototype.reset = function () {
          this.matched = 0;
        };
        a.prototype.before = function (a) {
          return this.o < a.o;
        };
        a.prototype.clone = function () {
          var d = new a(this.p, this.d);
          d.o = this.o;
          return d;
        };
        a.ordinalSeed = 0;
        a.sortFunc = function (a, c) {
          return a.p != c.p ? c.p - a.p : c.o - a.o;
        };
        return a;
      })();
      f.Deadkey = g;
      var e = (function () {
        function a() {
          this.dks = [];
        }
        a.prototype.toSortedArray = function () {
          this.dks = this.dks.sort(g.sortFunc);
          return [].concat(this.dks);
        };
        a.prototype.clone = function () {
          var d = new a(),
            c = this.toSortedArray();
          d.dks = [];
          c.forEach(function (a) {
            d.dks.push(a.clone());
          });
          return d;
        };
        a.prototype.isMatch = function (a, c, b) {
          if (0 == this.dks.length) return !1;
          c = a - c;
          for (a = 0; a < this.dks.length; a++) if (this.dks[a].match(c, b) && !this.dks[a].matched) return this.dks[a].set(), !0;
          this.resetMatched();
          return !1;
        };
        a.prototype.add = function (a) {
          this.dks = this.dks.concat(a);
        };
        a.prototype.remove = function (a) {
          a = this.dks.indexOf(a);
          this.dks.splice(a, 1);
        };
        a.prototype.clear = function () {
          this.dks = [];
        };
        a.prototype.resetMatched = function () {
          for (var a = 0, c = this.dks; a < c.length; a++) c[a].reset();
        };
        a.prototype.deleteMatched = function () {
          for (var a = 0; a < this.dks.length; a++) this.dks[a].matched && this.dks.splice(a--, 1);
        };
        a.prototype.adjustPositions = function (a, c) {
          if (0 != c)
            for (var b = 0, d = this.dks; b < d.length; b++) {
              var n = d[b];
              n.p > a && (n.p += c);
            }
        };
        a.prototype.count = function () {
          return this.dks.length;
        };
        return a;
      })();
      f.DeadkeyTracker = e;
    })(f.text || (f.text = {}));
  })(f.keyman || (f.keyman = {}));
})(com || (com = {}));
(function (f) {
  (function (f) {
    (function (f) {
      var g = (function () {
        return function () {};
      })();
      f.KeyEvent = g;
    })(f.text || (f.text = {}));
  })(f.keyman || (f.keyman = {}));
})(com || (com = {}));
var __extends =
  (this && this.__extends) ||
  (function () {
    var f = function (g, k) {
      f =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (f, e) {
            f.__proto__ = e;
          }) ||
        function (f, e) {
          for (var a in e) e.hasOwnProperty(a) && (f[a] = e[a]);
        };
      return f(g, k);
    };
    return function (g, k) {
      function r() {
        this.constructor = g;
      }
      f(g, k);
      g.prototype = null === k ? Object.create(k) : ((r.prototype = k.prototype), new r());
    };
  })();
(function (f) {
  (function (f) {
    var g;
    (function (f) {
      var e = (function () {
        function a(a, b, c) {
          this.insert = a;
          this.deleteLeft = b;
          this.deleteRight = c || 0;
        }
        a.nil = new a("", 0, 0);
        return a;
      })();
      f.TextTransform = e;
      var a = (function () {
        function a(b, c, d, e) {
          var h = (this.token = a.tokenSeed++);
          this.keystroke = b;
          this.transform = c;
          this.alternates = e;
          this.preInput = d;
          this.transform.id = this.token;
          e &&
            e.forEach(function (a) {
              a.sample.id = h;
            });
        }
        a.tokenSeed = 0;
        return a;
      })();
      f.Transcription = a;
      var d = (function () {
        function b() {
          this._dks = new g.DeadkeyTracker();
        }
        b.prototype.deadkeys = function () {
          return this._dks;
        };
        b.prototype.hasDeadkeyMatch = function (a, b) {
          return this.deadkeys().isMatch(this.getDeadkeyCaret(), a, b);
        };
        b.prototype.insertDeadkeyBeforeCaret = function (a) {
          a = new f.Deadkey(this.getDeadkeyCaret(), a);
          this.deadkeys().add(a);
        };
        b.prototype.adjustDeadkeys = function (a) {
          this.deadkeys().adjustPositions(this.getDeadkeyCaret(), a);
        };
        b.prototype.setDeadkeys = function (a) {
          this._dks = a.clone();
        };
        b.prototype.buildTransformFrom = function (a) {
          for (var b = this.getText(), c = a.getText(), d = a.getDeadkeyCaret(), h = this.getDeadkeyCaret(), m = 0; m < d && c._kmwCharAt(m) == b._kmwCharAt(m); m++);
          a = d - m;
          m = b._kmwSubstr(m, h - m);
          b = b._kmwLength() - h;
          c = c._kmwLength() - d;
          return new e(m, a, c - b);
        };
        b.prototype.buildTranscriptionFrom = function (b, d, e) {
          var h = this.buildTransformFrom(b);
          return new a(d, h, c.from(b), e);
        };
        b.prototype.restoreTo = function (a) {
          this.setTextBeforeCaret(a.getTextBeforeCaret());
          this.setTextAfterCaret(a.getTextAfterCaret());
          this._dks = a._dks.clone();
        };
        b.prototype.apply = function (a) {
          a.deleteRight && this.setTextAfterCaret(this.getTextAfterCaret()._kmwSubstr(a.deleteRight));
          a.deleteLeft && this.deleteCharsBeforeCaret(a.deleteLeft);
          a.insert && this.insertTextBeforeCaret(a.insert);
          this._dks.clear();
        };
        b.prototype.setTextBeforeCaret = function (a) {
          this.deleteCharsBeforeCaret(this.getTextBeforeCaret()._kmwLength());
          this.insertTextBeforeCaret(a);
        };
        b.prototype.saveProperties = function () {};
        b.prototype.restoreProperties = function () {};
        return b;
      })();
      f.OutputTarget = d;
      var c = (function (a) {
        function b(b, c) {
          var d = a.call(this) || this;
          d.text = b ? b : "";
          b = d.text._kmwLength();
          d.caretIndex = c ? c : b;
          return d;
        }
        __extends(b, a);
        b.from = function (a) {
          var c = a.getTextBeforeCaret(),
            d = c._kmwLength();
          c = new b(c + a.getTextAfterCaret(), d);
          c.setDeadkeys(a.deadkeys());
          return c;
        };
        b.prototype.getElement = function () {
          return null;
        };
        b.prototype.clearSelection = function () {};
        b.prototype.invalidateSelection = function () {};
        b.prototype.hasSelection = function () {
          return !0;
        };
        b.prototype.getDeadkeyCaret = function () {
          return this.caretIndex;
        };
        b.prototype.setDeadkeyCaret = function (a) {
          if (0 > a || a > this.text._kmwLength()) throw Error("Provided caret index is out of range.");
          this.caretIndex = a;
        };
        b.prototype.getTextBeforeCaret = function () {
          return this.text.kmwSubstr(0, this.caretIndex);
        };
        b.prototype.getTextAfterCaret = function () {
          return this.text.kmwSubstr(this.caretIndex);
        };
        b.prototype.getText = function () {
          return this.text;
        };
        b.prototype.deleteCharsBeforeCaret = function (a) {
          0 <= a && (a > this.caretIndex && (a = this.caretIndex), (this.text = this.text.kmwSubstr(0, this.caretIndex - a) + this.getTextAfterCaret()), (this.caretIndex -= a));
        };
        b.prototype.insertTextBeforeCaret = function (a) {
          this.text = this.getTextBeforeCaret() + a + this.getTextAfterCaret();
          this.caretIndex += a.kmwLength();
        };
        b.prototype.setTextAfterCaret = function (a) {
          this.text = this.getTextBeforeCaret() + a;
        };
        return b;
      })(d);
      f.Mock = c;
    })((g = f.text || (f.text = {})));
  })(f.keyman || (f.keyman = {}));
})(com || (com = {}));
(function (f) {
  (function (f) {
    var g = (function () {
      return function (f, e, a) {
        this.interface = f;
        this.keyboard = e;
        this.touchEnabled = a || !1;
      };
    })();
    f.AttachmentInfo = g;
  })(f.keyman || (f.keyman = {}));
})(com || (com = {}));
(function (f, g) {
  "function" === typeof define && define.amd ? define(g) : "object" === typeof exports ? (module.exports = g()) : (f.returnExports = g());
})(this, function () {
  var f = Function.call.bind(Function.apply),
    g = Function.call.bind(Function.call),
    k = Array.isArray,
    r = Object.keys,
    e = function (a) {
      try {
        return a(), !1;
      } catch (x) {
        return !0;
      }
    },
    a = function (a) {
      try {
        return a();
      } catch (x) {
        return !1;
      }
    },
    d = (function (a) {
      return function () {
        return !f(a, this, arguments);
      };
    })(e),
    c = function () {
      return !e(function () {
        return Object.defineProperty({}, "x", { get: function () {} });
      });
    },
    b = !!Object.defineProperty && c(),
    h = "foo" === function () {}.name,
    n = Function.call.bind(Array.prototype.forEach),
    w = Function.call.bind(Array.prototype.reduce),
    q = Function.call.bind(Array.prototype.filter),
    z = Function.call.bind(Array.prototype.some),
    m = function (a, c, d, h) {
      (!h && c in a) || (b ? Object.defineProperty(a, c, { configurable: !0, enumerable: !1, writable: !0, value: d }) : (a[c] = d));
    },
    t = function (a, b, c) {
      n(r(b), function (d) {
        m(a, d, b[d], !!c);
      });
    },
    v = Function.call.bind(Object.prototype.toString),
    E =
      "function" === typeof /abc/
        ? function (a) {
            return "function" === typeof a && "[object Function]" === v(a);
          }
        : function (a) {
            return "function" === typeof a;
          },
    y = {
      getter: function (a, c, d) {
        if (!b) throw new TypeError("getters require true ES5 support");
        Object.defineProperty(a, c, { configurable: !0, enumerable: !1, get: d });
      },
      proxy: function (a, c, d) {
        if (!b) throw new TypeError("getters require true ES5 support");
        var x = Object.getOwnPropertyDescriptor(a, c);
        Object.defineProperty(d, c, {
          configurable: x.configurable,
          enumerable: x.enumerable,
          get: function () {
            return a[c];
          },
          set: function (b) {
            a[c] = b;
          },
        });
      },
      redefine: function (a, c, d) {
        if (b) {
          var x = Object.getOwnPropertyDescriptor(a, c);
          x.value = d;
          Object.defineProperty(a, c, x);
        } else a[c] = d;
      },
      defineByDescriptor: function (a, c, d) {
        b ? Object.defineProperty(a, c, d) : "value" in d && (a[c] = d.value);
      },
      preserveToString: function (a, b) {
        b && E(b.toString) && m(a, "toString", b.toString.bind(b), !0);
      },
    },
    P =
      Object.create ||
      function (a, b) {
        var c = function () {};
        c.prototype = a;
        var d = new c();
        "undefined" !== typeof b &&
          r(b).forEach(function (a) {
            y.defineByDescriptor(d, a, b[a]);
          });
        return d;
      },
    N = function (b, c) {
      return Object.setPrototypeOf
        ? a(function () {
            var a = function sa(a) {
              a = new b(a);
              Object.setPrototypeOf(a, sa.prototype);
              return a;
            };
            Object.setPrototypeOf(a, b);
            a.prototype = P(b.prototype, { constructor: { value: a } });
            return c(a);
          })
        : !1;
    },
    p = (function () {
      if ("undefined" !== typeof self) return self;
      if ("undefined" !== typeof window) return window;
      if ("undefined" !== typeof global) return global;
      throw Error("unable to locate global object");
    })(),
    G = p.isFinite,
    Da = Function.call.bind(String.prototype.indexOf),
    Ga = Function.apply.bind(Array.prototype.indexOf),
    ja = Function.call.bind(Array.prototype.concat),
    Q = Function.call.bind(String.prototype.slice),
    U = Function.call.bind(Array.prototype.push),
    H = Function.apply.bind(Array.prototype.push),
    ka = Function.call.bind(Array.prototype.shift),
    C = Math.max,
    J = Math.min,
    K = Math.floor,
    I = Math.abs,
    X = Math.exp,
    la = Math.log,
    ma = Math.sqrt,
    ta = Function.call.bind(Object.prototype.hasOwnProperty),
    ea = function () {},
    F = p.Map,
    Xb = F && F.prototype["delete"],
    na = F && F.prototype.get,
    oa = F && F.prototype.has,
    db = F && F.prototype.set,
    A = p.Symbol || {},
    Ha = A.species || "@@species",
    L =
      Number.isNaN ||
      function (a) {
        return a !== a;
      },
    Ia =
      Number.isFinite ||
      function (a) {
        return "number" === typeof a && G(a);
      },
    fa = E(Math.sign)
      ? Math.sign
      : function (a) {
          a = Number(a);
          return 0 === a || L(a) ? a : 0 > a ? -1 : 1;
        },
    ha = function (a) {
      a = Number(a);
      return -1 > a || L(a) ? NaN : 0 === a || Infinity === a ? a : -1 === a ? -Infinity : 0 === 1 + a - 1 ? a : a * (la(1 + a) / (1 + a - 1));
    },
    eb = function (a) {
      return "[object Arguments]" === v(a);
    },
    Yb = function (a) {
      return null !== a && "object" === typeof a && "number" === typeof a.length && 0 <= a.length && "[object Array]" !== v(a) && "[object Function]" === v(a.callee);
    },
    Ja = eb(arguments) ? eb : Yb,
    D = {
      primitive: function (a) {
        return null === a || ("function" !== typeof a && "object" !== typeof a);
      },
      string: function (a) {
        return "[object String]" === v(a);
      },
      regex: function (a) {
        return "[object RegExp]" === v(a);
      },
      symbol: function (a) {
        return "function" === typeof p.Symbol && "symbol" === typeof a;
      },
    },
    u = function (a, b, c) {
      var d = a[b];
      m(a, b, c, !0);
      y.preserveToString(a[b], d);
    },
    pa = "function" === typeof A && "function" === typeof A["for"] && D.symbol(A()),
    R = D.symbol(A.iterator) ? A.iterator : "_es6-shim iterator_";
  p.Set && "function" === typeof new p.Set()["@@iterator"] && (R = "@@iterator");
  p.Reflect || m(p, "Reflect", {}, !0);
  var Y = p.Reflect,
    Ka = String,
    La = "undefined" !== typeof document && document ? document.all : null,
    V =
      null == La
        ? function (a) {
            return null == a;
          }
        : function (a) {
            return null == a && a !== La;
          },
    l = {
      Call: function (a, b) {
        var c = 2 < arguments.length ? arguments[2] : [];
        if (!l.IsCallable(a)) throw new TypeError(a + " is not a function");
        return f(a, b, c);
      },
      RequireObjectCoercible: function (a, b) {
        if (V(a)) throw new TypeError(b || "Cannot call method on " + a);
        return a;
      },
      TypeIsObject: function (a) {
        return void 0 === a || null === a || !0 === a || !1 === a ? !1 : "function" === typeof a || "object" === typeof a || a === La;
      },
      ToObject: function (a, b) {
        return Object(l.RequireObjectCoercible(a, b));
      },
      IsCallable: E,
      IsConstructor: function (a) {
        return l.IsCallable(a);
      },
      ToInt32: function (a) {
        return l.ToNumber(a) >> 0;
      },
      ToUint32: function (a) {
        return l.ToNumber(a) >>> 0;
      },
      ToNumber: function (a) {
        if ("[object Symbol]" === v(a)) throw new TypeError("Cannot convert a Symbol value to a number");
        return +a;
      },
      ToInteger: function (a) {
        a = l.ToNumber(a);
        return L(a) ? 0 : 0 !== a && Ia(a) ? (0 < a ? 1 : -1) * K(I(a)) : a;
      },
      ToLength: function (a) {
        a = l.ToInteger(a);
        return 0 >= a ? 0 : a > Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : a;
      },
      SameValue: function (a, b) {
        return a === b ? (0 === a ? 1 / a === 1 / b : !0) : L(a) && L(b);
      },
      SameValueZero: function (a, b) {
        return a === b || (L(a) && L(b));
      },
      IsIterable: function (a) {
        return l.TypeIsObject(a) && ("undefined" !== typeof a[R] || Ja(a));
      },
      GetIterator: function (a) {
        if (Ja(a)) return new Z(a, "value");
        var b = l.GetMethod(a, R);
        if (!l.IsCallable(b)) throw new TypeError("value is not an iterable");
        a = l.Call(b, a);
        if (!l.TypeIsObject(a)) throw new TypeError("bad iterator");
        return a;
      },
      GetMethod: function (a, b) {
        a = l.ToObject(a)[b];
        if (!V(a)) {
          if (!l.IsCallable(a)) throw new TypeError("Method not callable: " + b);
          return a;
        }
      },
      IteratorComplete: function (a) {
        return !!a.done;
      },
      IteratorClose: function (a, b) {
        var c = l.GetMethod(a, "return");
        if (void 0 !== c) {
          try {
            var d = l.Call(c, a);
          } catch (sa) {
            var x = sa;
          }
          if (!b) {
            if (x) throw x;
            if (!l.TypeIsObject(d)) throw new TypeError("Iterator's return method returned a non-object.");
          }
        }
      },
      IteratorNext: function (a) {
        var b = 1 < arguments.length ? a.next(arguments[1]) : a.next();
        if (!l.TypeIsObject(b)) throw new TypeError("bad iterator");
        return b;
      },
      IteratorStep: function (a) {
        a = l.IteratorNext(a);
        return l.IteratorComplete(a) ? !1 : a;
      },
      Construct: function (a, b, c, d) {
        c = "undefined" === typeof c ? a : c;
        if (!d && Y.construct) return Y.construct(a, b, c);
        d = c.prototype;
        l.TypeIsObject(d) || (d = Object.prototype);
        d = P(d);
        a = l.Call(a, d, b);
        return l.TypeIsObject(a) ? a : d;
      },
      SpeciesConstructor: function (a, b) {
        a = a.constructor;
        if (void 0 === a) return b;
        if (!l.TypeIsObject(a)) throw new TypeError("Bad constructor");
        a = a[Ha];
        if (V(a)) return b;
        if (!l.IsConstructor(a)) throw new TypeError("Bad @@species");
        return a;
      },
      CreateHTML: function (a, b, c, d) {
        a = l.ToString(a);
        var x = "<" + b;
        "" !== c && ((d = l.ToString(d).replace(/"/g, "&quot;")), (x += " " + c + '="' + d + '"'));
        return x + ">" + a + "</" + b + ">";
      },
      IsRegExp: function (a) {
        if (!l.TypeIsObject(a)) return !1;
        var b = a[A.match];
        return "undefined" !== typeof b ? !!b : D.regex(a);
      },
      ToString: function (a) {
        return Ka(a);
      },
    };
  if (b && pa) {
    var ua = function (a) {
      if (D.symbol(A[a])) return A[a];
      var b = A["for"]("Symbol." + a);
      Object.defineProperty(A, a, { configurable: !1, enumerable: !1, writable: !1, value: b });
      return b;
    };
    if (!D.symbol(A.search)) {
      var fb = ua("search"),
        gb = String.prototype.search;
      m(RegExp.prototype, fb, function (a) {
        return l.Call(gb, a, [this]);
      });
      u(String.prototype, "search", function (a) {
        var b = l.RequireObjectCoercible(this);
        if (!V(a)) {
          var c = l.GetMethod(a, fb);
          if ("undefined" !== typeof c) return l.Call(c, a, [b]);
        }
        return l.Call(gb, b, [l.ToString(a)]);
      });
    }
    if (!D.symbol(A.replace)) {
      var hb = ua("replace"),
        ib = String.prototype.replace;
      m(RegExp.prototype, hb, function (a, b) {
        return l.Call(ib, a, [this, b]);
      });
      u(String.prototype, "replace", function (a, b) {
        var c = l.RequireObjectCoercible(this);
        if (!V(a)) {
          var d = l.GetMethod(a, hb);
          if ("undefined" !== typeof d) return l.Call(d, a, [c, b]);
        }
        return l.Call(ib, c, [l.ToString(a), b]);
      });
    }
    if (!D.symbol(A.split)) {
      var jb = ua("split"),
        kb = String.prototype.split;
      m(RegExp.prototype, jb, function (a, b) {
        return l.Call(kb, a, [this, b]);
      });
      u(String.prototype, "split", function (a, b) {
        var c = l.RequireObjectCoercible(this);
        if (!V(a)) {
          var d = l.GetMethod(a, jb);
          if ("undefined" !== typeof d) return l.Call(d, a, [c, b]);
        }
        return l.Call(kb, c, [l.ToString(a), b]);
      });
    }
    var lb = D.symbol(A.match),
      Zb =
        lb &&
        (function () {
          var a = {};
          a[A.match] = function () {
            return 42;
          };
          return 42 !== "a".match(a);
        })();
    if (!lb || Zb) {
      var mb = ua("match"),
        nb = String.prototype.match;
      m(RegExp.prototype, mb, function (a) {
        return l.Call(nb, a, [this]);
      });
      u(String.prototype, "match", function (a) {
        var b = l.RequireObjectCoercible(this);
        if (!V(a)) {
          var c = l.GetMethod(a, mb);
          if ("undefined" !== typeof c) return l.Call(c, a, [b]);
        }
        return l.Call(nb, b, [l.ToString(a)]);
      });
    }
  }
  var ob = function (a, c, d) {
      y.preserveToString(c, a);
      Object.setPrototypeOf && Object.setPrototypeOf(a, c);
      b
        ? n(Object.getOwnPropertyNames(a), function (b) {
            b in ea || d[b] || y.proxy(a, b, c);
          })
        : n(Object.keys(a), function (b) {
            b in ea || d[b] || (c[b] = a[b]);
          });
      c.prototype = a.prototype;
      y.redefine(a.prototype, "constructor", c);
    },
    $b = function () {
      return this;
    },
    qa = function (a) {
      b && !ta(a, Ha) && y.getter(a, Ha, $b);
    },
    S = function (a, b) {
      b =
        b ||
        function () {
          return this;
        };
      m(a, R, b);
      !a[R] && D.symbol(R) && (a[R] = b);
    },
    pb = function (a, c, d) {
      b ? Object.defineProperty(a, c, { configurable: !0, enumerable: !0, writable: !0, value: d }) : (a[c] = d);
      if (!l.SameValue(a[c], d)) throw new TypeError("property is nonconfigurable");
    },
    Ma = function (a, b, c, d) {
      if (!l.TypeIsObject(a)) throw new TypeError("Constructor requires `new`: " + b.name);
      a = b.prototype;
      l.TypeIsObject(a) || (a = c);
      c = P(a);
      for (var x in d) ta(d, x) && m(c, x, d[x], !0);
      return c;
    };
  if (String.fromCodePoint && 1 !== String.fromCodePoint.length) {
    var ac = String.fromCodePoint;
    u(String, "fromCodePoint", function (a) {
      return l.Call(ac, this, arguments);
    });
  }
  var qb = {
    fromCodePoint: function (a) {
      for (var b = [], c, d = 0, h = arguments.length; d < h; d++) {
        c = Number(arguments[d]);
        if (!l.SameValue(c, l.ToInteger(c)) || 0 > c || 1114111 < c) throw new RangeError("Invalid code point " + c);
        65536 > c ? U(b, String.fromCharCode(c)) : ((c -= 65536), U(b, String.fromCharCode((c >> 10) + 55296)), U(b, String.fromCharCode((c % 1024) + 56320)));
      }
      return b.join("");
    },
    raw: function (a) {
      var b = l.ToObject(a, "bad callSite");
      b = l.ToObject(b.raw, "bad raw value");
      var c = l.ToLength(b.length);
      if (0 >= c) return "";
      for (var d = [], h = 0, n; h < c; ) {
        n = l.ToString(h);
        n = l.ToString(b[n]);
        U(d, n);
        if (h + 1 >= c) break;
        n = h + 1 < arguments.length ? arguments[h + 1] : "";
        n = l.ToString(n);
        U(d, n);
        h += 1;
      }
      return d.join("");
    },
  };
  String.raw && "xy" !== String.raw({ raw: { 0: "x", 1: "y", length: 2 } }) && u(String, "raw", qb.raw);
  t(String, qb);
  var bc = function Ea(a, b) {
      if (1 > b) return "";
      if (b % 2) return Ea(a, b - 1) + a;
      a = Ea(a, b / 2);
      return a + a;
    },
    aa = {
      repeat: function (a) {
        var b = l.ToString(l.RequireObjectCoercible(this));
        a = l.ToInteger(a);
        if (0 > a || Infinity <= a) throw new RangeError("repeat count must be less than infinity and not overflow maximum string size");
        return bc(b, a);
      },
      startsWith: function (a) {
        var b = l.ToString(l.RequireObjectCoercible(this));
        if (l.IsRegExp(a)) throw new TypeError('Cannot call method "startsWith" with a regex');
        var c = l.ToString(a),
          d;
        1 < arguments.length && (d = arguments[1]);
        d = C(l.ToInteger(d), 0);
        return Q(b, d, d + c.length) === c;
      },
      endsWith: function (a) {
        var b = l.ToString(l.RequireObjectCoercible(this));
        if (l.IsRegExp(a)) throw new TypeError('Cannot call method "endsWith" with a regex');
        var c = l.ToString(a),
          d = b.length,
          h;
        1 < arguments.length && (h = arguments[1]);
        h = "undefined" === typeof h ? d : l.ToInteger(h);
        d = J(C(h, 0), d);
        return Q(b, d - c.length, d) === c;
      },
      includes: function (a) {
        if (l.IsRegExp(a)) throw new TypeError('"includes" does not accept a RegExp');
        var b = l.ToString(a),
          c;
        1 < arguments.length && (c = arguments[1]);
        return -1 !== Da(this, b, c);
      },
      codePointAt: function (a) {
        var b = l.ToString(l.RequireObjectCoercible(this)),
          c = l.ToInteger(a),
          d = b.length;
        if (0 <= c && c < d) {
          a = b.charCodeAt(c);
          if (55296 > a || 56319 < a || c + 1 === d) return a;
          b = b.charCodeAt(c + 1);
          return 56320 > b || 57343 < b ? a : 1024 * (a - 55296) + (b - 56320) + 65536;
        }
      },
    };
  String.prototype.includes && !1 !== "a".includes("a", Infinity) && u(String.prototype, "includes", aa.includes);
  if (String.prototype.startsWith && String.prototype.endsWith) {
    var cc = e(function () {
        return "/a/".startsWith(/a/);
      }),
      dc = a(function () {
        return !1 === "abc".startsWith("a", Infinity);
      });
    (cc && dc) || (u(String.prototype, "startsWith", aa.startsWith), u(String.prototype, "endsWith", aa.endsWith));
  }
  pa &&
    (a(function () {
      var a = /a/;
      a[A.match] = !1;
      return "/a/".startsWith(a);
    }) || u(String.prototype, "startsWith", aa.startsWith),
    a(function () {
      var a = /a/;
      a[A.match] = !1;
      return "/a/".endsWith(a);
    }) || u(String.prototype, "endsWith", aa.endsWith),
    a(function () {
      var a = /a/;
      a[A.match] = !1;
      return "/a/".includes(a);
    }) || u(String.prototype, "includes", aa.includes));
  t(String.prototype, aa);
  var ec = /(^[\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff]+)|([\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff]+$)/g,
    rb = function () {
      return l.ToString(l.RequireObjectCoercible(this)).replace(ec, "");
    },
    sb = /[\u0085\u200b\ufffe]/g,
    tb = /^[-+]0x[0-9a-f]+$/i,
    fc = 3 !== "\u0085\u200b\ufffe".trim().length;
  m(String.prototype, "trim", rb, fc);
  var ba = function (a) {
      return { value: a, done: 0 === arguments.length };
    },
    Na = function (a) {
      l.RequireObjectCoercible(a);
      this._s = l.ToString(a);
      this._i = 0;
    };
  Na.prototype.next = function () {
    var a = this._s,
      b = this._i;
    if ("undefined" === typeof a || b >= a.length) return (this._s = void 0), ba();
    var c = a.charCodeAt(b);
    55296 > c || 56319 < c || b + 1 === a.length ? (c = 1) : ((c = a.charCodeAt(b + 1)), (c = 56320 > c || 57343 < c ? 1 : 2));
    this._i = b + c;
    return ba(a.substr(b, c));
  };
  S(Na.prototype);
  S(String.prototype, function () {
    return new Na(this);
  });
  var va = {
    from: function (a) {
      var b;
      1 < arguments.length && (b = arguments[1]);
      var c;
      if ("undefined" === typeof b) var d = !1;
      else {
        if (!l.IsCallable(b)) throw new TypeError("Array.from: when provided, the second argument must be a function");
        2 < arguments.length && (c = arguments[2]);
        d = !0;
      }
      var h;
      if ("undefined" !== typeof (Ja(a) || l.GetMethod(a, R))) {
        var x = l.IsConstructor(this) ? Object(new this()) : [];
        var n = l.GetIterator(a);
        for (h = 0; ; ) {
          var e = l.IteratorStep(n);
          if (!1 === e) break;
          e = e.value;
          try {
            d && (e = "undefined" === typeof c ? b(e, h) : g(b, c, e, h)), (x[h] = e);
          } catch (gc) {
            throw (l.IteratorClose(n, !0), gc);
          }
          h += 1;
        }
        n = h;
      } else
        for (e = l.ToObject(a), n = l.ToLength(e.length), x = l.IsConstructor(this) ? Object(new this(n)) : Array(n), h = 0; h < n; ++h) {
          var w = e[h];
          d && (w = "undefined" === typeof c ? b(w, h) : g(b, c, w, h));
          pb(x, h, w);
        }
      x.length = n;
      return x;
    },
    of: function () {
      for (var a = arguments.length, b = k(this) || !l.IsCallable(this) ? Array(a) : l.Construct(this, [a]), c = 0; c < a; ++c) pb(b, c, arguments[c]);
      b.length = a;
      return b;
    },
  };
  t(Array, va);
  qa(Array);
  var Z = function (a, b) {
    this.i = 0;
    this.array = a;
    this.kind = b;
  };
  t(Z.prototype, {
    next: function () {
      var a = this.i,
        b = this.array;
      if (!(this instanceof Z)) throw new TypeError("Not an ArrayIterator");
      if ("undefined" !== typeof b)
        for (var c = l.ToLength(b.length); a < c; ) {
          c = this.kind;
          var d;
          "key" === c ? (d = a) : "value" === c ? (d = b[a]) : "entry" === c && (d = [a, b[a]]);
          this.i = a + 1;
          return ba(d);
        }
      this.array = void 0;
      return ba();
    },
  });
  S(Z.prototype);
  Array.of === va.of ||
    (function () {
      var a = function (a) {
        this.length = a;
      };
      a.prototype = [];
      var b = Array.of.apply(a, [1, 2]);
      return b instanceof a && 2 === b.length;
    })() ||
    u(Array, "of", va.of);
  var Ra = {
    copyWithin: function (a, b) {
      var c = l.ToObject(this),
        d = l.ToLength(c.length),
        h = l.ToInteger(a),
        x = l.ToInteger(b);
      h = 0 > h ? C(d + h, 0) : J(h, d);
      x = 0 > x ? C(d + x, 0) : J(x, d);
      var n;
      2 < arguments.length && (n = arguments[2]);
      n = "undefined" === typeof n ? d : l.ToInteger(n);
      n = 0 > n ? C(d + n, 0) : J(n, d);
      d = J(n - x, d - h);
      n = 1;
      x < h && h < x + d && ((n = -1), (x += d - 1), (h += d - 1));
      for (; 0 < d; ) x in c ? (c[h] = c[x]) : delete c[h], (x += n), (h += n), --d;
      return c;
    },
    fill: function (a) {
      var b;
      1 < arguments.length && (b = arguments[1]);
      var c;
      2 < arguments.length && (c = arguments[2]);
      var d = l.ToObject(this),
        h = l.ToLength(d.length);
      b = l.ToInteger("undefined" === typeof b ? 0 : b);
      c = l.ToInteger("undefined" === typeof c ? h : c);
      b = 0 > b ? C(h + b, 0) : J(b, h);
      for (c = 0 > c ? h + c : c; b < h && b < c; ++b) d[b] = a;
      return d;
    },
    find: function (a) {
      var b = l.ToObject(this),
        c = l.ToLength(b.length);
      if (!l.IsCallable(a)) throw new TypeError("Array#find: predicate must be a function");
      for (var d = 1 < arguments.length ? arguments[1] : null, h = 0, x; h < c; h++)
        if (((x = b[h]), d)) {
          if (g(a, d, x, h, b)) return x;
        } else if (a(x, h, b)) return x;
    },
    findIndex: function (a) {
      var b = l.ToObject(this),
        c = l.ToLength(b.length);
      if (!l.IsCallable(a)) throw new TypeError("Array#findIndex: predicate must be a function");
      for (var d = 1 < arguments.length ? arguments[1] : null, h = 0; h < c; h++)
        if (d) {
          if (g(a, d, b[h], h, b)) return h;
        } else if (a(b[h], h, b)) return h;
      return -1;
    },
    keys: function () {
      return new Z(this, "key");
    },
    values: function () {
      return new Z(this, "value");
    },
    entries: function () {
      return new Z(this, "entry");
    },
  };
  Array.prototype.keys && !l.IsCallable([1].keys().next) && delete Array.prototype.keys;
  Array.prototype.entries && !l.IsCallable([1].entries().next) && delete Array.prototype.entries;
  Array.prototype.keys && Array.prototype.entries && !Array.prototype.values && Array.prototype[R] && (t(Array.prototype, { values: Array.prototype[R] }), D.symbol(A.unscopables) && (Array.prototype[A.unscopables].values = !0));
  if (h && Array.prototype.values && "values" !== Array.prototype.values.name) {
    var hc = Array.prototype.values;
    u(Array.prototype, "values", function () {
      return l.Call(hc, this, arguments);
    });
    m(Array.prototype, R, Array.prototype.values, !0);
  }
  t(Array.prototype, Ra);
  0 > 1 / [!0].indexOf(!0, -0) &&
    m(
      Array.prototype,
      "indexOf",
      function (a) {
        var b = Ga(this, arguments);
        return 0 === b && 0 > 1 / b ? 0 : b;
      },
      !0
    );
  S(Array.prototype, function () {
    return this.values();
  });
  Object.getPrototypeOf && S(Object.getPrototypeOf([].values()));
  var ic = (function () {
      return a(function () {
        return 0 === Array.from({ length: -1 }).length;
      });
    })(),
    jc = (function () {
      var a = Array.from([0].entries());
      return 1 === a.length && k(a[0]) && 0 === a[0][0] && 0 === a[0][1];
    })();
  (ic && jc) || u(Array, "from", va.from);
  if (
    !(function () {
      return a(function () {
        return Array.from([0], void 0);
      });
    })()
  ) {
    var ub = Array.from;
    u(Array, "from", function (a) {
      return 1 < arguments.length && "undefined" !== typeof arguments[1] ? l.Call(ub, this, arguments) : g(ub, this, a);
    });
  }
  var kc = -(Math.pow(2, 32) - 1),
    ca = function (b, c) {
      var d = { length: kc };
      d[c ? (d.length >>> 0) - 1 : 0] = !0;
      return a(function () {
        g(
          b,
          d,
          function () {
            throw new RangeError("should not reach here");
          },
          []
        );
        return !0;
      });
    };
  if (!ca(Array.prototype.forEach)) {
    var lc = Array.prototype.forEach;
    u(
      Array.prototype,
      "forEach",
      function (a) {
        return l.Call(lc, 0 <= this.length ? this : [], arguments);
      },
      !0
    );
  }
  if (!ca(Array.prototype.map)) {
    var mc = Array.prototype.map;
    u(
      Array.prototype,
      "map",
      function (a) {
        return l.Call(mc, 0 <= this.length ? this : [], arguments);
      },
      !0
    );
  }
  if (!ca(Array.prototype.filter)) {
    var nc = Array.prototype.filter;
    u(
      Array.prototype,
      "filter",
      function (a) {
        return l.Call(nc, 0 <= this.length ? this : [], arguments);
      },
      !0
    );
  }
  if (!ca(Array.prototype.some)) {
    var oc = Array.prototype.some;
    u(
      Array.prototype,
      "some",
      function (a) {
        return l.Call(oc, 0 <= this.length ? this : [], arguments);
      },
      !0
    );
  }
  if (!ca(Array.prototype.every)) {
    var pc = Array.prototype.every;
    u(
      Array.prototype,
      "every",
      function (a) {
        return l.Call(pc, 0 <= this.length ? this : [], arguments);
      },
      !0
    );
  }
  if (!ca(Array.prototype.reduce)) {
    var qc = Array.prototype.reduce;
    u(
      Array.prototype,
      "reduce",
      function (a) {
        return l.Call(qc, 0 <= this.length ? this : [], arguments);
      },
      !0
    );
  }
  if (!ca(Array.prototype.reduceRight, !0)) {
    var rc = Array.prototype.reduceRight;
    u(
      Array.prototype,
      "reduceRight",
      function (a) {
        return l.Call(rc, 0 <= this.length ? this : [], arguments);
      },
      !0
    );
  }
  var sc = 8 !== Number("0o10"),
    tc = 2 !== Number("0b10"),
    uc = z("\u0085\u200b\ufffe", function (a) {
      return 0 === Number(a + 0 + a);
    });
  if (sc || tc || uc) {
    var W = Number,
      vb = /^0b[01]+$/i,
      wb = /^0o[0-7]+$/i,
      vc = vb.test.bind(vb),
      wc = wb.test.bind(wb),
      xc = function (a) {
        if ("function" === typeof a.valueOf) {
          var b = a.valueOf();
          if (D.primitive(b)) return b;
        }
        if ("function" === typeof a.toString && ((b = a.toString()), D.primitive(b))) return b;
        throw new TypeError("No default value");
      },
      yc = sb.test.bind(sb),
      zc = tb.test.bind(tb),
      wa = (function () {
        var b = function (c) {
          var d = 0 < arguments.length ? (D.primitive(c) ? c : xc(c, "number")) : 0;
          if ("string" === typeof d)
            if (((d = l.Call(rb, d)), vc(d))) d = parseInt(Q(d, 2), 2);
            else if (wc(d)) d = parseInt(Q(d, 2), 8);
            else if (yc(d) || zc(d)) d = NaN;
          var h = this,
            x = a(function () {
              W.prototype.valueOf.call(h);
              return !0;
            });
          return h instanceof b && !x ? new W(d) : W(d);
        };
        return b;
      })();
    ob(W, wa, {});
    t(wa, { NaN: W.NaN, MAX_VALUE: W.MAX_VALUE, MIN_VALUE: W.MIN_VALUE, NEGATIVE_INFINITY: W.NEGATIVE_INFINITY, POSITIVE_INFINITY: W.POSITIVE_INFINITY });
    Number = wa;
    y.redefine(p, "Number", wa);
  }
  var xb = Math.pow(2, 53) - 1;
  t(Number, {
    MAX_SAFE_INTEGER: xb,
    MIN_SAFE_INTEGER: -xb,
    EPSILON: 2.220446049250313e-16,
    parseInt: p.parseInt,
    parseFloat: p.parseFloat,
    isFinite: Ia,
    isInteger: function (a) {
      return Ia(a) && l.ToInteger(a) === a;
    },
    isSafeInteger: function (a) {
      return Number.isInteger(a) && I(a) <= Number.MAX_SAFE_INTEGER;
    },
    isNaN: L,
  });
  m(Number, "parseInt", p.parseInt, Number.parseInt !== p.parseInt);
  1 ===
    [, 1].find(function () {
      return !0;
    }) && u(Array.prototype, "find", Ra.find);
  0 !==
    [, 1].findIndex(function () {
      return !0;
    }) && u(Array.prototype, "findIndex", Ra.findIndex);
  var yb = Function.bind.call(Function.bind, Object.prototype.propertyIsEnumerable),
    xa = function (a, c) {
      b && yb(a, c) && Object.defineProperty(a, c, { enumerable: !1 });
    },
    Ac = function () {
      var a = Number(this),
        b = arguments.length,
        c = b - a;
      c = Array(0 > c ? 0 : c);
      for (var d = a; d < b; ++d) c[d - a] = arguments[d];
      return c;
    },
    zb = function (a) {
      return function (b, c) {
        b[c] = a[c];
        return b;
      };
    },
    Bc = function (a, b) {
      var c = r(Object(b)),
        d;
      l.IsCallable(Object.getOwnPropertySymbols) && (d = q(Object.getOwnPropertySymbols(Object(b)), yb(b)));
      return w(ja(c, d || []), zb(b), a);
    },
    Ab = {
      assign: function (a, b) {
        var c = l.ToObject(a, "Cannot convert undefined or null to object");
        return w(l.Call(Ac, 1, arguments), Bc, c);
      },
      is: function (a, b) {
        return l.SameValue(a, b);
      },
    };
  Object.assign &&
    Object.preventExtensions &&
    (function () {
      var a = Object.preventExtensions({ 1: 2 });
      try {
        Object.assign(a, "xy");
      } catch (B) {
        return "y" === a[1];
      }
    })() &&
    u(Object, "assign", Ab.assign);
  t(Object, Ab);
  if (b) {
    var Cc = {
      setPrototypeOf: (function (a, b) {
        var c = function (a, b) {
          if (!l.TypeIsObject(a)) throw new TypeError("cannot set prototype on a non-object");
          if (null !== b && !l.TypeIsObject(b)) throw new TypeError("can only set prototype to an object or null" + b);
          g(d, a, b);
          return a;
        };
        try {
          var d = a.getOwnPropertyDescriptor(a.prototype, b).set;
          g(d, {}, null);
        } catch (sa) {
          if (a.prototype !== {}[b]) return;
          d = function (a) {
            this[b] = a;
          };
          c.polyfill = c(c({}, null), a.prototype) instanceof a;
        }
        return c;
      })(Object, "__proto__"),
    };
    t(Object, Cc);
  }
  Object.setPrototypeOf &&
    Object.getPrototypeOf &&
    null !== Object.getPrototypeOf(Object.setPrototypeOf({}, null)) &&
    null === Object.getPrototypeOf(Object.create(null)) &&
    (function () {
      var a = Object.create(null),
        b = Object.getPrototypeOf,
        c = Object.setPrototypeOf;
      Object.getPrototypeOf = function (c) {
        c = b(c);
        return c === a ? null : c;
      };
      Object.setPrototypeOf = function (b, d) {
        return c(b, null === d ? a : d);
      };
      Object.setPrototypeOf.polyfill = !1;
    })();
  if (
    e(function () {
      return Object.keys("foo");
    })
  ) {
    var Dc = Object.keys;
    u(Object, "keys", function (a) {
      return Dc(l.ToObject(a));
    });
    r = Object.keys;
  }
  if (
    e(function () {
      return Object.keys(/a/g);
    })
  ) {
    var Ec = Object.keys;
    u(Object, "keys", function (a) {
      if (D.regex(a)) {
        var b = [],
          c;
        for (c in a) ta(a, c) && U(b, c);
        return b;
      }
      return Ec(a);
    });
    r = Object.keys;
  }
  if (
    Object.getOwnPropertyNames &&
    e(function () {
      return Object.getOwnPropertyNames("foo");
    })
  ) {
    var Fc = "object" === typeof window ? Object.getOwnPropertyNames(window) : [],
      Bb = Object.getOwnPropertyNames;
    u(Object, "getOwnPropertyNames", function (a) {
      a = l.ToObject(a);
      if ("[object Window]" === v(a))
        try {
          return Bb(a);
        } catch (B) {
          return ja([], Fc);
        }
      return Bb(a);
    });
  }
  if (
    Object.getOwnPropertyDescriptor &&
    e(function () {
      return Object.getOwnPropertyDescriptor("foo", "bar");
    })
  ) {
    var Gc = Object.getOwnPropertyDescriptor;
    u(Object, "getOwnPropertyDescriptor", function (a, b) {
      return Gc(l.ToObject(a), b);
    });
  }
  if (
    Object.seal &&
    e(function () {
      return Object.seal("foo");
    })
  ) {
    var Hc = Object.seal;
    u(Object, "seal", function (a) {
      return l.TypeIsObject(a) ? Hc(a) : a;
    });
  }
  if (
    Object.isSealed &&
    e(function () {
      return Object.isSealed("foo");
    })
  ) {
    var Ic = Object.isSealed;
    u(Object, "isSealed", function (a) {
      return l.TypeIsObject(a) ? Ic(a) : !0;
    });
  }
  if (
    Object.freeze &&
    e(function () {
      return Object.freeze("foo");
    })
  ) {
    var Jc = Object.freeze;
    u(Object, "freeze", function (a) {
      return l.TypeIsObject(a) ? Jc(a) : a;
    });
  }
  if (
    Object.isFrozen &&
    e(function () {
      return Object.isFrozen("foo");
    })
  ) {
    var Kc = Object.isFrozen;
    u(Object, "isFrozen", function (a) {
      return l.TypeIsObject(a) ? Kc(a) : !0;
    });
  }
  if (
    Object.preventExtensions &&
    e(function () {
      return Object.preventExtensions("foo");
    })
  ) {
    var Lc = Object.preventExtensions;
    u(Object, "preventExtensions", function (a) {
      return l.TypeIsObject(a) ? Lc(a) : a;
    });
  }
  if (
    Object.isExtensible &&
    e(function () {
      return Object.isExtensible("foo");
    })
  ) {
    var Mc = Object.isExtensible;
    u(Object, "isExtensible", function (a) {
      return l.TypeIsObject(a) ? Mc(a) : !1;
    });
  }
  if (
    Object.getPrototypeOf &&
    e(function () {
      return Object.getPrototypeOf("foo");
    })
  ) {
    var Nc = Object.getPrototypeOf;
    u(Object, "getPrototypeOf", function (a) {
      return Nc(l.ToObject(a));
    });
  }
  var Oc =
    b &&
    (function () {
      var a = Object.getOwnPropertyDescriptor(RegExp.prototype, "flags");
      return a && l.IsCallable(a.get);
    })();
  b &&
    !Oc &&
    y.getter(RegExp.prototype, "flags", function () {
      if (!l.TypeIsObject(this)) throw new TypeError("Method called on incompatible type: must be an object.");
      var a = "";
      this.global && (a += "g");
      this.ignoreCase && (a += "i");
      this.multiline && (a += "m");
      this.unicode && (a += "u");
      this.sticky && (a += "y");
      return a;
    });
  var Pc =
      b &&
      a(function () {
        return "/a/i" === String(new RegExp(/a/g, "i"));
      }),
    Qc =
      pa &&
      b &&
      (function () {
        var a = /./;
        a[A.match] = !1;
        return RegExp(a) === a;
      })(),
    Cb = a(function () {
      return "/abc/" === RegExp.prototype.toString.call({ source: "abc" });
    }),
    Rc =
      Cb &&
      a(function () {
        return "/a/b" === RegExp.prototype.toString.call({ source: "a", flags: "b" });
      });
  if (!Cb || !Rc) {
    var Db = RegExp.prototype.toString;
    m(
      RegExp.prototype,
      "toString",
      function () {
        var a = l.RequireObjectCoercible(this);
        if (D.regex(a)) return g(Db, a);
        var b = Ka(a.source);
        a = Ka(a.flags);
        return "/" + b + "/" + a;
      },
      !0
    );
    y.preserveToString(RegExp.prototype.toString, Db);
  }
  if (b && (!Pc || Qc)) {
    var Sc = Object.getOwnPropertyDescriptor(RegExp.prototype, "flags").get,
      Eb = Object.getOwnPropertyDescriptor(RegExp.prototype, "source") || {},
      Tc = function () {
        return this.source;
      },
      Uc = l.IsCallable(Eb.get) ? Eb.get : Tc,
      Fb = RegExp,
      Sa = (function () {
        return function Fa(a, b) {
          var c = l.IsRegExp(a);
          return this instanceof Fa || !c || "undefined" !== typeof b || a.constructor !== Fa ? (D.regex(a) ? ((c = l.Call(Uc, a)), (a = "undefined" === typeof b ? l.Call(Sc, a) : b), new Fa(c, a)) : new Fb(a, b)) : a;
        };
      })();
    ob(Fb, Sa, { $input: !0 });
    RegExp = Sa;
    y.redefine(p, "RegExp", Sa);
  }
  if (b) {
    var Ta = { input: "$_", lastMatch: "$&", lastParen: "$+", leftContext: "$`", rightContext: "$'" };
    n(r(Ta), function (a) {
      a in RegExp &&
        !(Ta[a] in RegExp) &&
        y.getter(RegExp, Ta[a], function () {
          return RegExp[a];
        });
    });
  }
  qa(RegExp);
  var ya = 1 / Number.EPSILON,
    za = Math.pow(2, -23),
    Vc = Math.pow(2, 127) * (2 - za),
    Ua = Math.pow(2, -126),
    ia = Math.E,
    Aa = Math.LOG2E,
    Wc = Math.LOG10E,
    Gb = Number.prototype.clz;
  delete Number.prototype.clz;
  var M = {
    acosh: function (a) {
      var b = Number(a);
      if (L(b) || 1 > a) return NaN;
      if (1 === b) return 0;
      if (Infinity === b) return b;
      a = 1 / (b * b);
      if (2 > b) return ha(b - 1 + ma(1 - a) * b);
      b /= 2;
      return ha(b + ma(1 - a) * b - 1) + 1 / Aa;
    },
    asinh: function (a) {
      var b = Number(a);
      if (0 === b || !G(b)) return b;
      a = I(b);
      var c = a * a;
      b = fa(b);
      return 1 > a ? b * ha(a + c / (ma(c + 1) + 1)) : b * (ha(a / 2 + (ma(1 + 1 / c) * a) / 2 - 1) + 1 / Aa);
    },
    atanh: function (a) {
      a = Number(a);
      if (0 === a) return a;
      if (-1 === a) return -Infinity;
      if (1 === a) return Infinity;
      if (L(a) || -1 > a || 1 < a) return NaN;
      var b = I(a);
      return (fa(a) * ha((2 * b) / (1 - b))) / 2;
    },
    cbrt: function (a) {
      a = Number(a);
      if (0 === a) return a;
      var b = 0 > a;
      b && (a = -a);
      if (Infinity === a) var c = Infinity;
      else (c = X(la(a) / 3)), (c = (a / (c * c) + 2 * c) / 3);
      return b ? -c : c;
    },
    clz32: function (a) {
      a = l.ToUint32(Number(a));
      return 0 === a ? 32 : Gb ? l.Call(Gb, a) : 31 - K(la(a + 0.5) * Aa);
    },
    cosh: function (a) {
      a = Number(a);
      if (0 === a) return 1;
      if (L(a)) return NaN;
      if (!G(a)) return Infinity;
      a = X(I(a) - 1);
      return (ia / 2) * (a + 1 / (a * ia * ia));
    },
    expm1: function (a) {
      a = Number(a);
      if (-Infinity === a) return -1;
      if (!G(a) || 0 === a) return a;
      if (0.5 < I(a)) return X(a) - 1;
      for (var b = a, c = 0, d = 1; c + b !== c; ) (c += b), (d += 1), (b *= a / d);
      return c;
    },
    hypot: function (a, b) {
      for (var c = 0, d = 0, h = 0; h < arguments.length; ++h) {
        var x = I(Number(arguments[h]));
        d < x ? ((c *= (d / x) * (d / x)), (c += 1), (d = x)) : (c += 0 < x ? (x / d) * (x / d) : x);
      }
      return Infinity === d ? Infinity : d * ma(c);
    },
    log2: function (a) {
      return la(a) * Aa;
    },
    log10: function (a) {
      return la(a) * Wc;
    },
    log1p: ha,
    sign: fa,
    sinh: function (a) {
      a = Number(a);
      if (!G(a) || 0 === a) return a;
      var b = I(a);
      if (1 > b) return (b = Math.expm1(b)), (fa(a) * b * (1 + 1 / (b + 1))) / 2;
      b = X(b - 1);
      return fa(a) * (b - 1 / (b * ia * ia)) * (ia / 2);
    },
    tanh: function (a) {
      a = Number(a);
      return L(a) || 0 === a ? a : 20 <= a ? 1 : -20 >= a ? -1 : (Math.expm1(a) - Math.expm1(-a)) / (X(a) + X(-a));
    },
    trunc: function (a) {
      a = Number(a);
      return 0 > a ? -K(-a) : K(a);
    },
    imul: function (a, b) {
      a = l.ToUint32(a);
      b = l.ToUint32(b);
      var c = a & 65535,
        d = b & 65535;
      return (c * d + (((((a >>> 16) & 65535) * d + c * ((b >>> 16) & 65535)) << 16) >>> 0)) | 0;
    },
    fround: function (a) {
      var b = Number(a);
      if (0 === b || Infinity === b || -Infinity === b || L(b)) return b;
      a = fa(b);
      b = I(b);
      if (b < Ua) return a * (b / Ua / za + ya - ya) * Ua * za;
      var c = (1 + za / Number.EPSILON) * b;
      b = c - (c - b);
      return b > Vc || L(b) ? Infinity * a : a * b;
    },
  };
  t(Math, M);
  m(Math, "sinh", M.sinh, Infinity === Math.sinh(710));
  m(Math, "cosh", M.cosh, Infinity === Math.cosh(710));
  m(Math, "log1p", M.log1p, -1e-17 !== Math.log1p(-1e-17));
  m(Math, "asinh", M.asinh, Math.asinh(-1e7) !== -Math.asinh(1e7));
  m(Math, "asinh", M.asinh, Infinity === Math.asinh(1e300));
  m(Math, "atanh", M.atanh, 0 === Math.atanh(1e-300));
  m(Math, "tanh", M.tanh, -2e-17 !== Math.tanh(-2e-17));
  m(Math, "acosh", M.acosh, Infinity === Math.acosh(Number.MAX_VALUE));
  m(Math, "acosh", M.acosh, !(8 > I(1 - Math.acosh(1 + Number.EPSILON) / Math.sqrt(2 * Number.EPSILON)) / Number.EPSILON));
  m(Math, "cbrt", M.cbrt, !(8 > I(1 - Math.cbrt(1e-300) / 1e-100) / Number.EPSILON));
  m(Math, "sinh", M.sinh, -2e-17 !== Math.sinh(-2e-17));
  var Hb = Math.expm1(10);
  m(Math, "expm1", M.expm1, 22025.465794806718 < Hb || 22025.465794806718 > Hb);
  var Xc = Math.round,
    Yc = 0 === Math.round(0.5 - Number.EPSILON / 4) && 1 === Math.round(-0.5 + Number.EPSILON / 3.99),
    Zc = [ya + 1, 2 * ya - 1].every(function (a) {
      return Math.round(a) === a;
    });
  m(
    Math,
    "round",
    function (a) {
      var b = K(a);
      return 0.5 > a - b ? b : -1 === b ? -0 : b + 1;
    },
    !Yc || !Zc
  );
  y.preserveToString(Math.round, Xc);
  var Ib = Math.imul;
  -5 !== Math.imul(4294967295, 5) && ((Math.imul = M.imul), y.preserveToString(Math.imul, Ib));
  2 !== Math.imul.length &&
    u(Math, "imul", function (a, b) {
      return l.Call(Ib, Math, arguments);
    });
  var Ba = (function () {
    var a = p.setTimeout;
    if ("function" === typeof a || "object" === typeof a) {
      l.IsPromise = function (a) {
        return l.TypeIsObject(a) && "undefined" !== typeof a._promise ? !0 : !1;
      };
      var b = function (a) {
          if (!l.IsConstructor(a)) throw new TypeError("Bad promise constructor");
          var b = this;
          b.resolve = void 0;
          b.reject = void 0;
          b.promise = new a(function (a, c) {
            if (void 0 !== b.resolve || void 0 !== b.reject) throw new TypeError("Bad Promise implementation!");
            b.resolve = a;
            b.reject = c;
          });
          if (!l.IsCallable(b.resolve) || !l.IsCallable(b.reject)) throw new TypeError("Bad promise constructor");
        },
        c;
      "undefined" !== typeof window &&
        l.IsCallable(window.postMessage) &&
        (c = function () {
          var a = [];
          window.addEventListener(
            "message",
            function (b) {
              b.source === window && "zero-timeout-message" === b.data && (b.stopPropagation(), 0 !== a.length && ka(a)());
            },
            !0
          );
          return function (b) {
            U(a, b);
            window.postMessage("zero-timeout-message", "*");
          };
        });
      var d = function () {
          var a = p.Promise,
            b = a && a.resolve && a.resolve();
          return (
            b &&
            function (a) {
              return b.then(a);
            }
          );
        },
        h = l.IsCallable(p.setImmediate)
          ? p.setImmediate
          : "object" === typeof process && process.nextTick
          ? process.nextTick
          : d() ||
            (l.IsCallable(c)
              ? c()
              : function (b) {
                  a(b, 0);
                }),
        n = function (a) {
          return a;
        },
        e = function (a) {
          throw a;
        },
        w = {},
        m = function (a, b, c) {
          h(function () {
            if (b === w) a(c);
            else {
              try {
                var d = a(c);
                var h = b.resolve;
              } catch (Va) {
                (d = Va), (h = b.reject);
              }
              h(d);
            }
          });
        },
        f = function (a, b) {
          var c = a._promise,
            d = c.reactionLength;
          if (0 < d && (m(c.fulfillReactionHandler0, c.reactionCapability0, b), (c.fulfillReactionHandler0 = void 0), (c.rejectReactions0 = void 0), (c.reactionCapability0 = void 0), 1 < d))
            for (var h = 1, n = 0; h < d; h++, n += 3) m(c[n + 0], c[n + 2], b), (a[n + 0] = void 0), (a[n + 1] = void 0), (a[n + 2] = void 0);
          c.result = b;
          c.state = 1;
          c.reactionLength = 0;
        },
        q = function (a, b) {
          var c = a._promise,
            d = c.reactionLength;
          if (0 < d && (m(c.rejectReactionHandler0, c.reactionCapability0, b), (c.fulfillReactionHandler0 = void 0), (c.rejectReactions0 = void 0), (c.reactionCapability0 = void 0), 1 < d))
            for (var h = 1, n = 0; h < d; h++, n += 3) m(c[n + 1], c[n + 2], b), (a[n + 0] = void 0), (a[n + 1] = void 0), (a[n + 2] = void 0);
          c.result = b;
          c.state = 2;
          c.reactionLength = 0;
        },
        z = function (a) {
          var b = !1;
          return {
            resolve: function (c) {
              if (!b) {
                b = !0;
                if (c === a) return q(a, new TypeError("Self resolution"));
                if (!l.TypeIsObject(c)) return f(a, c);
                try {
                  var d = c.then;
                } catch ($c) {
                  return q(a, $c);
                }
                if (!l.IsCallable(d)) return f(a, c);
                h(function () {
                  var b = d,
                    h = z(a),
                    n = h.resolve;
                  h = h.reject;
                  try {
                    v(b, c, n, h);
                  } catch (ad) {
                    h(ad);
                  }
                });
              }
            },
            reject: function (c) {
              if (!b) return (b = !0), q(a, c);
            },
          };
        },
        v = function (a, b, c, d) {
          a === E ? g(a, b, c, d, w) : g(a, b, c, d);
        },
        k = (function () {
          var a = function (b) {
            if (!(this instanceof a)) throw new TypeError('Constructor Promise requires "new"');
            if (this && this._promise) throw new TypeError("Bad construction");
            if (!l.IsCallable(b)) throw new TypeError("not a valid resolver");
            var c = Ma(this, a, r, { _promise: { result: void 0, state: 0, reactionLength: 0, fulfillReactionHandler0: void 0, rejectReactionHandler0: void 0, reactionCapability0: void 0 } }),
              d = z(c),
              h = d.reject;
            try {
              b(d.resolve, h);
            } catch (Va) {
              h(Va);
            }
            return c;
          };
          return a;
        })();
      var r = k.prototype;
      var y = function (a, b, c, d) {
        var h = !1;
        return function (n) {
          h || ((h = !0), (b[a] = n), 0 === --d.count && ((n = c.resolve), n(b)));
        };
      };
      t(k, {
        all: function (a) {
          if (!l.TypeIsObject(this)) throw new TypeError("Promise is not object");
          var c = new b(this),
            d;
          try {
            var h = l.GetIterator(a);
            a = d = { iterator: h, done: !1 };
            for (var n = a.iterator, x = [], e = { count: 1 }, w, m, B = 0; ; ) {
              try {
                w = l.IteratorStep(n);
                if (!1 === w) {
                  a.done = !0;
                  break;
                }
                m = w.value;
              } catch (Xa) {
                throw ((a.done = !0), Xa);
              }
              x[B] = void 0;
              var f = this.resolve(m),
                q = y(B, x, c, e);
              e.count += 1;
              v(f.then, f, q, c.reject);
              B += 1;
            }
            if (0 === --e.count) {
              var t = c.resolve;
              t(x);
            }
            return c.promise;
          } catch (Xa) {
            n = Xa;
            if (d && !d.done)
              try {
                l.IteratorClose(h, !0);
              } catch (cd) {
                n = cd;
              }
            h = c.reject;
            h(n);
            return c.promise;
          }
        },
        race: function (a) {
          if (!l.TypeIsObject(this)) throw new TypeError("Promise is not object");
          var c = new b(this),
            d;
          try {
            var h = l.GetIterator(a);
            a = d = { iterator: h, done: !1 };
            for (var n = a.iterator, x, e, w; ; ) {
              try {
                x = l.IteratorStep(n);
                if (!1 === x) {
                  a.done = !0;
                  break;
                }
                e = x.value;
              } catch (Wa) {
                throw ((a.done = !0), Wa);
              }
              w = this.resolve(e);
              v(w.then, w, c.resolve, c.reject);
            }
            return c.promise;
          } catch (Wa) {
            n = Wa;
            if (d && !d.done)
              try {
                l.IteratorClose(h, !0);
              } catch (bd) {
                n = bd;
              }
            h = c.reject;
            h(n);
            return c.promise;
          }
        },
        reject: function (a) {
          if (!l.TypeIsObject(this)) throw new TypeError("Bad promise constructor");
          var c = new b(this),
            d = c.reject;
          d(a);
          return c.promise;
        },
        resolve: function (a) {
          if (!l.TypeIsObject(this)) throw new TypeError("Bad promise constructor");
          if (l.IsPromise(a) && a.constructor === this) return a;
          var c = new b(this),
            d = c.resolve;
          d(a);
          return c.promise;
        },
      });
      t(r, {
        catch: function (a) {
          return this.then(null, a);
        },
        then: function (a, c) {
          if (!l.IsPromise(this)) throw new TypeError("not a promise");
          var d = l.SpeciesConstructor(this, k);
          d = 2 < arguments.length && arguments[2] === w && d === k ? w : new b(d);
          var h = l.IsCallable(a) ? a : n,
            x = l.IsCallable(c) ? c : e,
            B = this._promise;
          if (0 === B.state) {
            if (0 === B.reactionLength) (B.fulfillReactionHandler0 = h), (B.rejectReactionHandler0 = x), (B.reactionCapability0 = d);
            else {
              var f = 3 * (B.reactionLength - 1);
              B[f + 0] = h;
              B[f + 1] = x;
              B[f + 2] = d;
            }
            B.reactionLength += 1;
          } else if (1 === B.state) (B = B.result), m(h, d, B);
          else if (2 === B.state) (B = B.result), m(x, d, B);
          else throw new TypeError("unexpected Promise state");
          return d.promise;
        },
      });
      w = new b(k);
      var E = r.then;
      return k;
    }
  })();
  p.Promise && (delete p.Promise.accept, delete p.Promise.defer, delete p.Promise.prototype.chain);
  if ("function" === typeof Ba) {
    t(p, { Promise: Ba });
    var dd = N(p.Promise, function (a) {
        return a.resolve(42).then(function () {}) instanceof a;
      }),
      ed = !e(function () {
        return p.Promise.reject(42).then(null, 5).then(null, ea);
      }),
      fd = e(function () {
        return p.Promise.call(3, ea);
      }),
      gd = (function (a) {
        var b = a.resolve(5);
        b.constructor = {};
        a = a.resolve(b);
        try {
          a.then(null, ea).then(null, ea);
        } catch (Ea) {
          return !0;
        }
        return b === a;
      })(p.Promise),
      hd =
        b &&
        (function () {
          var a = 0,
            b = Object.defineProperty({}, "then", {
              get: function () {
                a += 1;
              },
            });
          Promise.resolve(b);
          return 1 === a;
        })(),
      Ya = function (a) {
        var b = new Promise(a);
        a(3, function () {});
        this.then = b.then;
        this.constructor = BadResolverPromise_1;
      };
    Ya.prototype = Promise.prototype;
    Ya.all = Promise.all;
    var id = a(function () {
      return !!Ya.all([1, 2]);
    });
    (dd && ed && fd && !gd && hd && !id) || ((Promise = Ba), u(p, "Promise", Ba));
    if (1 !== Promise.all.length) {
      var jd = Promise.all;
      u(Promise, "all", function (a) {
        return l.Call(jd, this, arguments);
      });
    }
    if (1 !== Promise.race.length) {
      var kd = Promise.race;
      u(Promise, "race", function (a) {
        return l.Call(kd, this, arguments);
      });
    }
    if (1 !== Promise.resolve.length) {
      var ld = Promise.resolve;
      u(Promise, "resolve", function (a) {
        return l.Call(ld, this, arguments);
      });
    }
    if (1 !== Promise.reject.length) {
      var md = Promise.reject;
      u(Promise, "reject", function (a) {
        return l.Call(md, this, arguments);
      });
    }
    xa(Promise, "all");
    xa(Promise, "race");
    xa(Promise, "resolve");
    xa(Promise, "reject");
    qa(Promise);
  }
  var Jb = function (a) {
      var b = r(
        w(
          a,
          function (a, b) {
            a[b] = !0;
            return a;
          },
          {}
        )
      );
      return a.join(":") === b.join(":");
    },
    nd = Jb(["z", "a", "bb"]),
    od = Jb(["z", 1, "a", "3", 2]);
  if (b) {
    var da = function (a, b) {
        return b || nd ? (V(a) ? "^" + l.ToString(a) : "string" === typeof a ? "$" + a : "number" === typeof a ? (od ? a : "n" + a) : "boolean" === typeof a ? "b" + a : null) : null;
      },
      Ca = function () {
        return Object.create ? Object.create(null) : {};
      },
      Za = function (a, b, c) {
        if (k(c) || D.string(c))
          n(c, function (a) {
            if (!l.TypeIsObject(a)) throw new TypeError("Iterator value " + a + " is not an entry object");
            b.set(a[0], a[1]);
          });
        else if (c instanceof a)
          g(a.prototype.forEach, c, function (a, c) {
            b.set(c, a);
          });
        else {
          if (!V(c)) {
            var d = b.set;
            if (!l.IsCallable(d)) throw new TypeError("bad map");
            var h = l.GetIterator(c);
          }
          if ("undefined" !== typeof h)
            for (;;) {
              a = l.IteratorStep(h);
              if (!1 === a) break;
              a = a.value;
              try {
                if (!l.TypeIsObject(a)) throw new TypeError("Iterator value " + a + " is not an entry object");
                g(d, b, a[0], a[1]);
              } catch (Oa) {
                throw (l.IteratorClose(h, !0), Oa);
              }
            }
        }
      },
      Kb = function (a, b, c) {
        if (k(c) || D.string(c))
          n(c, function (a) {
            b.add(a);
          });
        else if (c instanceof a)
          g(a.prototype.forEach, c, function (a) {
            b.add(a);
          });
        else {
          if (!V(c)) {
            var d = b.add;
            if (!l.IsCallable(d)) throw new TypeError("bad set");
            var h = l.GetIterator(c);
          }
          if ("undefined" !== typeof h)
            for (;;) {
              a = l.IteratorStep(h);
              if (!1 === a) break;
              a = a.value;
              try {
                g(d, b, a);
              } catch (Oa) {
                throw (l.IteratorClose(h, !0), Oa);
              }
            }
        }
      },
      ra = {
        Map: (function () {
          var a = {},
            b = function (a, b) {
              this.key = a;
              this.value = b;
              this.prev = this.next = null;
            };
          b.prototype.isRemoved = function () {
            return this.key === a;
          };
          var c = function (a, b) {
              if (!l.TypeIsObject(a) || !a._es6map) throw new TypeError("Method Map.prototype." + b + " called on incompatible receiver " + l.ToString(a));
            },
            d = function (a, b) {
              c(a, "[[MapIterator]]");
              this.i = this.head = a._head;
              this.kind = b;
            };
          d.prototype = {
            isMapIterator: !0,
            next: function () {
              if (!this.isMapIterator) throw new TypeError("Not a MapIterator");
              var a = this.i,
                b = this.kind,
                c = this.head;
              if ("undefined" === typeof this.i) return ba();
              for (; a.isRemoved() && a !== c; ) a = a.prev;
              for (; a.next !== c; ) if (((a = a.next), !a.isRemoved())) return (b = "key" === b ? a.key : "value" === b ? a.value : [a.key, a.value]), (this.i = a), ba(b);
              this.i = void 0;
              return ba();
            },
          };
          S(d.prototype);
          var h = function Qa() {
            if (!(this instanceof Qa)) throw new TypeError('Constructor Map requires "new"');
            if (this && this._es6map) throw new TypeError("Bad construction");
            var a = Ma(this, Qa, n, { _es6map: !0, _head: null, _map: F ? new F() : null, _size: 0, _storage: Ca() }),
              c = new b(null, null);
            c.next = c.prev = c;
            a._head = c;
            0 < arguments.length && Za(Qa, a, arguments[0]);
            return a;
          };
          var n = h.prototype;
          y.getter(n, "size", function () {
            if ("undefined" === typeof this._size) throw new TypeError("size method called on incompatible Map");
            return this._size;
          });
          t(n, {
            get: function (a) {
              c(this, "get");
              var b = da(a, !0);
              if (null !== b) {
                if ((a = this._storage[b])) return a.value;
              } else if (this._map) {
                if ((a = na.call(this._map, a))) return a.value;
              } else for (var d = (b = this._head); (d = d.next) !== b; ) if (l.SameValueZero(d.key, a)) return d.value;
            },
            has: function (a) {
              c(this, "has");
              var b = da(a, !0);
              if (null !== b) return "undefined" !== typeof this._storage[b];
              if (this._map) return oa.call(this._map, a);
              for (var d = (b = this._head); (d = d.next) !== b; ) if (l.SameValueZero(d.key, a)) return !0;
              return !1;
            },
            set: function (a, d) {
              c(this, "set");
              var h = this._head,
                n = h,
                x = da(a, !0);
              if (null !== x) {
                if ("undefined" !== typeof this._storage[x]) return (this._storage[x].value = d), this;
                var e = (this._storage[x] = new b(a, d));
                n = h.prev;
              } else this._map && (oa.call(this._map, a) ? (na.call(this._map, a).value = d) : ((e = new b(a, d)), db.call(this._map, a, e), (n = h.prev)));
              for (; (n = n.next) !== h; ) if (l.SameValueZero(n.key, a)) return (n.value = d), this;
              e = e || new b(a, d);
              l.SameValue(-0, a) && (e.key = 0);
              e.next = this._head;
              e.prev = this._head.prev;
              e.prev.next = e;
              e.next.prev = e;
              this._size += 1;
              return this;
            },
            delete: function (b) {
              c(this, "delete");
              var d = this._head,
                h = d,
                n = da(b, !0);
              if (null !== n) {
                if ("undefined" === typeof this._storage[n]) return !1;
                h = this._storage[n].prev;
                delete this._storage[n];
              } else if (this._map) {
                if (!oa.call(this._map, b)) return !1;
                h = na.call(this._map, b).prev;
                Xb.call(this._map, b);
              }
              for (; (h = h.next) !== d; ) if (l.SameValueZero(h.key, b)) return (h.key = a), (h.value = a), (h.prev.next = h.next), (h.next.prev = h.prev), --this._size, !0;
              return !1;
            },
            clear: function () {
              c(this, "clear");
              this._map = F ? new F() : null;
              this._size = 0;
              this._storage = Ca();
              for (var b = this._head, d, h = b.next; (d = h) !== b; ) (d.key = a), (d.value = a), (h = d.next), (d.next = d.prev = b);
              b.next = b.prev = b;
            },
            keys: function () {
              c(this, "keys");
              return new d(this, "key");
            },
            values: function () {
              c(this, "values");
              return new d(this, "value");
            },
            entries: function () {
              c(this, "entries");
              return new d(this, "key+value");
            },
            forEach: function (a) {
              c(this, "forEach");
              for (var b = 1 < arguments.length ? arguments[1] : null, d = this.entries(), h = d.next(); !h.done; h = d.next()) b ? g(a, b, h.value[1], h.value[0], this) : a(h.value[1], h.value[0], this);
            },
          });
          S(n, n.entries);
          return h;
        })(),
        Set: (function () {
          var a = function (a, b) {
              if (!l.TypeIsObject(a) || !a._es6set || "undefined" === typeof a._storage) throw new TypeError("Set.prototype." + b + " called on incompatible receiver " + l.ToString(a));
            },
            b = function Pa() {
              if (!(this instanceof Pa)) throw new TypeError('Constructor Set requires "new"');
              if (this && this._es6set) throw new TypeError("Bad construction");
              var a = Ma(this, Pa, c, { _es6set: !0, "[[SetData]]": null, _storage: Ca() });
              if (!a._es6set) throw new TypeError("bad set");
              0 < arguments.length && Kb(Pa, a, arguments[0]);
              return a;
            };
          var c = b.prototype;
          var d = function (a) {
            if (!a["[[SetData]]"]) {
              var b = new ra.Map();
              a["[[SetData]]"] = b;
              n(r(a._storage), function (a) {
                if ("^null" === a) a = null;
                else if ("^undefined" !== a) {
                  var c = a.charAt(0);
                  a = "$" === c ? Q(a, 1) : "n" === c ? +Q(a, 1) : "b" === c ? "btrue" === a : +a;
                } else a = void 0;
                b.set(a, a);
              });
              a["[[SetData]]"] = b;
            }
            a._storage = null;
          };
          y.getter(b.prototype, "size", function () {
            a(this, "size");
            if (this._storage) return r(this._storage).length;
            d(this);
            return this["[[SetData]]"].size;
          });
          t(b.prototype, {
            has: function (b) {
              a(this, "has");
              var c;
              if (this._storage && null !== (c = da(b))) return !!this._storage[c];
              d(this);
              return this["[[SetData]]"].has(b);
            },
            add: function (b) {
              a(this, "add");
              var c;
              if (this._storage && null !== (c = da(b))) return (this._storage[c] = !0), this;
              d(this);
              this["[[SetData]]"].set(b, b);
              return this;
            },
            delete: function (b) {
              a(this, "delete");
              var c;
              if (this._storage && null !== (c = da(b))) return (b = ta(this._storage, c)), delete this._storage[c] && b;
              d(this);
              return this["[[SetData]]"]["delete"](b);
            },
            clear: function () {
              a(this, "clear");
              this._storage && (this._storage = Ca());
              this["[[SetData]]"] && this["[[SetData]]"].clear();
            },
            values: function () {
              a(this, "values");
              d(this);
              return new h(this["[[SetData]]"].values());
            },
            entries: function () {
              a(this, "entries");
              d(this);
              return new h(this["[[SetData]]"].entries());
            },
            forEach: function (b) {
              a(this, "forEach");
              var c = 1 < arguments.length ? arguments[1] : null,
                h = this;
              d(h);
              this["[[SetData]]"].forEach(function (a, d) {
                c ? g(b, c, d, d, h) : b(d, d, h);
              });
            },
          });
          m(b.prototype, "keys", b.prototype.values, !0);
          S(b.prototype, b.prototype.values);
          var h = function (a) {
            this.it = a;
          };
          h.prototype = {
            isSetIterator: !0,
            next: function () {
              if (!this.isSetIterator) throw new TypeError("Not a SetIterator");
              return this.it.next();
            },
          };
          S(h.prototype);
          return b;
        })(),
      };
    p.Set && !Set.prototype["delete"] && Set.prototype.remove && Set.prototype.items && Set.prototype.map && Array.isArray(new Set().keys) && (p.Set = ra.Set);
    if (p.Map || p.Set) {
      a(function () {
        return 2 === new Map([[1, 2]]).get(1);
      }) ||
        ((p.Map = function B() {
          if (!(this instanceof B)) throw new TypeError('Constructor Map requires "new"');
          var a = new F();
          0 < arguments.length && Za(B, a, arguments[0]);
          delete a.constructor;
          Object.setPrototypeOf(a, p.Map.prototype);
          return a;
        }),
        (p.Map.prototype = P(F.prototype)),
        m(p.Map.prototype, "constructor", p.Map, !0),
        y.preserveToString(p.Map, F));
      var Lb = new Map(),
        Mb = (function () {
          var a = new Map([
            [1, 0],
            [2, 0],
            [3, 0],
            [4, 0],
          ]);
          a.set(-0, a);
          return a.get(0) === a && a.get(-0) === a && a.has(0) && a.has(-0);
        })(),
        pd = Lb.set(1, 2) === Lb;
      (Mb && pd) ||
        u(Map.prototype, "set", function (a, b) {
          g(db, this, 0 === a ? 0 : a, b);
          return this;
        });
      Mb ||
        (t(
          Map.prototype,
          {
            get: function (a) {
              return g(na, this, 0 === a ? 0 : a);
            },
            has: function (a) {
              return g(oa, this, 0 === a ? 0 : a);
            },
          },
          !0
        ),
        y.preserveToString(Map.prototype.get, na),
        y.preserveToString(Map.prototype.has, oa));
      var $a = new Set(),
        Nb =
          Set.prototype["delete"] &&
          Set.prototype.add &&
          Set.prototype.has &&
          (function (a) {
            a["delete"](0);
            a.add(-0);
            return !a.has(0);
          })($a),
        qd = $a.add(1) === $a;
      if (!Nb || !qd) {
        var Ob = Set.prototype.add;
        Set.prototype.add = function (a) {
          g(Ob, this, 0 === a ? 0 : a);
          return this;
        };
        y.preserveToString(Set.prototype.add, Ob);
      }
      if (!Nb) {
        var Pb = Set.prototype.has;
        Set.prototype.has = function (a) {
          return g(Pb, this, 0 === a ? 0 : a);
        };
        y.preserveToString(Set.prototype.has, Pb);
        var Qb = Set.prototype["delete"];
        Set.prototype["delete"] = function (a) {
          return g(Qb, this, 0 === a ? 0 : a);
        };
        y.preserveToString(Set.prototype["delete"], Qb);
      }
      var Rb = N(p.Map, function (a) {
          var b = new a([]);
          b.set(42, 42);
          return b instanceof a;
        }),
        rd = Object.setPrototypeOf && !Rb;
      try {
        var Sb = !(p.Map() instanceof p.Map);
      } catch (x) {
        Sb = x instanceof TypeError;
      }
      if (0 !== p.Map.length || rd || !Sb)
        (p.Map = function B() {
          if (!(this instanceof B)) throw new TypeError('Constructor Map requires "new"');
          var a = new F();
          0 < arguments.length && Za(B, a, arguments[0]);
          delete a.constructor;
          Object.setPrototypeOf(a, B.prototype);
          return a;
        }),
          (p.Map.prototype = F.prototype),
          m(p.Map.prototype, "constructor", p.Map, !0),
          y.preserveToString(p.Map, F);
      var sd = N(p.Set, function (a) {
          var b = new a([]);
          b.add(42, 42);
          return b instanceof a;
        }),
        td = Object.setPrototypeOf && !sd;
      try {
        var Tb = !(p.Set() instanceof p.Set);
      } catch (x) {
        Tb = x instanceof TypeError;
      }
      if (0 !== p.Set.length || td || !Tb) {
        var ab = p.Set;
        p.Set = function B() {
          if (!(this instanceof B)) throw new TypeError('Constructor Set requires "new"');
          var a = new ab();
          0 < arguments.length && Kb(B, a, arguments[0]);
          delete a.constructor;
          Object.setPrototypeOf(a, B.prototype);
          return a;
        };
        p.Set.prototype = ab.prototype;
        m(p.Set.prototype, "constructor", p.Set, !0);
        y.preserveToString(p.Set, ab);
      }
      var bb = new p.Map(),
        ud = !a(function () {
          return bb.keys().next().done;
        });
      ("function" !== typeof p.Map.prototype.clear ||
        0 !== new p.Set().size ||
        0 !== bb.size ||
        "function" !== typeof p.Map.prototype.keys ||
        "function" !== typeof p.Set.prototype.keys ||
        "function" !== typeof p.Map.prototype.forEach ||
        "function" !== typeof p.Set.prototype.forEach ||
        d(p.Map) ||
        d(p.Set) ||
        "function" !== typeof bb.keys().next ||
        ud ||
        !Rb) &&
        t(p, { Map: ra.Map, Set: ra.Set }, !0);
      p.Set.prototype.keys !== p.Set.prototype.values && m(p.Set.prototype, "keys", p.Set.prototype.values, !0);
      S(Object.getPrototypeOf(new p.Map().keys()));
      S(Object.getPrototypeOf(new p.Set().keys()));
      if (h && "has" !== p.Set.prototype.has.name) {
        var vd = p.Set.prototype.has;
        u(p.Set.prototype, "has", function (a) {
          return g(vd, this, a);
        });
      }
    }
    t(p, ra);
    qa(p.Map);
    qa(p.Set);
  }
  var T = function (a) {
      if (!l.TypeIsObject(a)) throw new TypeError("target must be an object");
    },
    O = {
      apply: function () {
        return l.Call(l.Call, null, arguments);
      },
      construct: function (a, b) {
        if (!l.IsConstructor(a)) throw new TypeError("First argument must be a constructor.");
        var c = 2 < arguments.length ? arguments[2] : a;
        if (!l.IsConstructor(c)) throw new TypeError("new.target must be a constructor.");
        return l.Construct(a, b, c, "internal");
      },
      deleteProperty: function (a, c) {
        T(a);
        if (b) {
          var d = Object.getOwnPropertyDescriptor(a, c);
          if (d && !d.configurable) return !1;
        }
        return delete a[c];
      },
      has: function (a, b) {
        T(a);
        return b in a;
      },
    };
  Object.getOwnPropertyNames &&
    Object.assign(O, {
      ownKeys: function (a) {
        T(a);
        var b = Object.getOwnPropertyNames(a);
        l.IsCallable(Object.getOwnPropertySymbols) && H(b, Object.getOwnPropertySymbols(a));
        return b;
      },
    });
  Object.preventExtensions &&
    Object.assign(O, {
      isExtensible: function (a) {
        T(a);
        return Object.isExtensible(a);
      },
      preventExtensions: function (a) {
        T(a);
        return !e(function () {
          return Object.preventExtensions(a);
        });
      },
    });
  if (b) {
    var Ub = function (a, b, c) {
        var d = Object.getOwnPropertyDescriptor(a, b);
        if (!d) return (a = Object.getPrototypeOf(a)), null === a ? void 0 : Ub(a, b, c);
        if ("value" in d) return d.value;
        if (d.get) return l.Call(d.get, c);
      },
      Vb = function (a, b, c, d) {
        var h = Object.getOwnPropertyDescriptor(a, b);
        if (!h) {
          a = Object.getPrototypeOf(a);
          if (null !== a) return Vb(a, b, c, d);
          h = { value: void 0, writable: !0, enumerable: !0, configurable: !0 };
        }
        return "value" in h
          ? h.writable && l.TypeIsObject(d)
            ? Object.getOwnPropertyDescriptor(d, b)
              ? Y.defineProperty(d, b, { value: c })
              : Y.defineProperty(d, b, { value: c, writable: !0, enumerable: !0, configurable: !0 })
            : !1
          : h.set
          ? (g(h.set, d, c), !0)
          : !1;
      };
    Object.assign(O, {
      defineProperty: function (a, b, c) {
        T(a);
        return !e(function () {
          return Object.defineProperty(a, b, c);
        });
      },
      getOwnPropertyDescriptor: function (a, b) {
        T(a);
        return Object.getOwnPropertyDescriptor(a, b);
      },
      get: function (a, b) {
        T(a);
        return Ub(a, b, 2 < arguments.length ? arguments[2] : a);
      },
      set: function (a, b, c) {
        T(a);
        return Vb(a, b, c, 3 < arguments.length ? arguments[3] : a);
      },
    });
  }
  if (Object.getPrototypeOf) {
    var wd = Object.getPrototypeOf;
    O.getPrototypeOf = function (a) {
      T(a);
      return wd(a);
    };
  }
  Object.setPrototypeOf &&
    O.getPrototypeOf &&
    Object.assign(O, {
      setPrototypeOf: function (a, b) {
        T(a);
        if (null !== b && !l.TypeIsObject(b)) throw new TypeError("proto must be an object or null");
        if (b === Y.getPrototypeOf(a)) return !0;
        if (Y.isExtensible && !Y.isExtensible(a)) return !1;
        var c;
        a: {
          for (c = b; c; ) {
            if (a === c) {
              c = !0;
              break a;
            }
            c = O.getPrototypeOf(c);
          }
          c = !1;
        }
        if (c) return !1;
        Object.setPrototypeOf(a, b);
        return !0;
      },
    });
  var xd = function (b, c) {
    l.IsCallable(p.Reflect[b])
      ? a(function () {
          p.Reflect[b](1);
          p.Reflect[b](NaN);
          p.Reflect[b](!0);
          return !0;
        }) && u(p.Reflect, b, c)
      : m(p.Reflect, b, c);
  };
  Object.keys(O).forEach(function (a) {
    xd(a, O[a]);
  });
  var cb = p.Reflect.getPrototypeOf;
  h &&
    cb &&
    "getPrototypeOf" !== cb.name &&
    u(p.Reflect, "getPrototypeOf", function (a) {
      return g(cb, p.Reflect, a);
    });
  p.Reflect.setPrototypeOf &&
    a(function () {
      p.Reflect.setPrototypeOf(1, {});
      return !0;
    }) &&
    u(p.Reflect, "setPrototypeOf", O.setPrototypeOf);
  p.Reflect.defineProperty &&
    (a(function () {
      var a = !p.Reflect.defineProperty(1, "test", { value: 1 }),
        b = "function" !== typeof Object.preventExtensions || !p.Reflect.defineProperty(Object.preventExtensions({}), "test", {});
      return a && b;
    }) ||
      u(p.Reflect, "defineProperty", O.defineProperty));
  p.Reflect.construct &&
    (a(function () {
      var a = function () {};
      return p.Reflect.construct(function () {}, [], a) instanceof a;
    }) ||
      u(p.Reflect, "construct", O.construct));
  if ("Invalid Date" !== String(new Date(NaN))) {
    var yd = Date.prototype.toString;
    u(Date.prototype, "toString", function () {
      var a = +this;
      return a !== a ? "Invalid Date" : l.Call(yd, this);
    });
  }
  var Wb = {
    anchor: function (a) {
      return l.CreateHTML(this, "a", "name", a);
    },
    big: function () {
      return l.CreateHTML(this, "big", "", "");
    },
    blink: function () {
      return l.CreateHTML(this, "blink", "", "");
    },
    bold: function () {
      return l.CreateHTML(this, "b", "", "");
    },
    fixed: function () {
      return l.CreateHTML(this, "tt", "", "");
    },
    fontcolor: function (a) {
      return l.CreateHTML(this, "font", "color", a);
    },
    fontsize: function (a) {
      return l.CreateHTML(this, "font", "size", a);
    },
    italics: function () {
      return l.CreateHTML(this, "i", "", "");
    },
    link: function (a) {
      return l.CreateHTML(this, "a", "href", a);
    },
    small: function () {
      return l.CreateHTML(this, "small", "", "");
    },
    strike: function () {
      return l.CreateHTML(this, "strike", "", "");
    },
    sub: function () {
      return l.CreateHTML(this, "sub", "", "");
    },
    sup: function () {
      return l.CreateHTML(this, "sup", "", "");
    },
  };
  n(Object.keys(Wb), function (a) {
    var b = String.prototype[a];
    if (l.IsCallable(b)) {
      b = g(b, "", ' " ');
      var c = ja([], b.match(/"/g)).length;
      b = b !== b.toLowerCase() || 2 < c;
    } else b = !0;
    b && u(String.prototype, a, Wb[a]);
  });
  var zd = (function () {
      if (!pa) return !1;
      var a = "object" === typeof JSON && "function" === typeof JSON.stringify ? JSON.stringify : null;
      if (!a) return !1;
      if ("undefined" !== typeof a(A()) || "[null]" !== a([A()])) return !0;
      var b = { a: A() };
      b[A()] = !0;
      return "{}" !== a(b) ? !0 : !1;
    })(),
    Ad = a(function () {
      return pa ? "{}" === JSON.stringify(Object(A())) && "[{}]" === JSON.stringify([Object(A())]) : !0;
    });
  if (zd || !Ad) {
    var Bd = JSON.stringify;
    u(JSON, "stringify", function (a) {
      if ("symbol" !== typeof a) {
        var b;
        1 < arguments.length && (b = arguments[1]);
        var c = [a];
        if (k(b)) c.push(b);
        else {
          var d = l.IsCallable(b) ? b : null;
          c.push(function (a, b) {
            a = d ? g(d, this, a, b) : b;
            if ("symbol" !== typeof a) return D.symbol(a) ? zb({})(a) : a;
          });
        }
        2 < arguments.length && c.push(arguments[2]);
        return Bd.apply(this, c);
      }
    });
  }
  return p;
});
(function (f) {
  f = f.keyman || (f.keyman = {});
  (f.environment || (f.environment = {})).VERSION = "13.0";
})(com || (com = {}));
(function (f) {
  f.keyman || (f.keyman = {});
})(com || (com = {}));
(function (f) {
  f = f.keyman || (f.keyman = {});
  (f.text || (f.text = {})).Codes = {
    modifierCodes: { LCTRL: 1, RCTRL: 2, LALT: 4, RALT: 8, SHIFT: 16, CTRL: 32, ALT: 64, CAPS: 256, NO_CAPS: 512, NUM_LOCK: 1024, NO_NUM_LOCK: 2048, SCROLL_LOCK: 4096, NO_SCROLL_LOCK: 8192, VIRTUAL_KEY: 16384 },
    modifierBitmasks: { ALL: 127, ALT_GR_SIM: 5, CHIRAL: 31, IS_CHIRAL: 15, NON_CHIRAL: 112 },
    stateBitmasks: { ALL: 16128, CAPS: 768, NUM_LOCK: 3072, SCROLL_LOCK: 12288 },
    keyCodes: {
      K_BKSP: 8,
      K_TAB: 9,
      K_ENTER: 13,
      K_SHIFT: 16,
      K_CONTROL: 17,
      K_ALT: 18,
      K_PAUSE: 19,
      K_CAPS: 20,
      K_ESC: 27,
      K_SPACE: 32,
      K_PGUP: 33,
      K_PGDN: 34,
      K_END: 35,
      K_HOME: 36,
      K_LEFT: 37,
      K_UP: 38,
      K_RIGHT: 39,
      K_DOWN: 40,
      K_SEL: 41,
      K_PRINT: 42,
      K_EXEC: 43,
      K_INS: 45,
      K_DEL: 46,
      K_HELP: 47,
      K_0: 48,
      K_1: 49,
      K_2: 50,
      K_3: 51,
      K_4: 52,
      K_5: 53,
      K_6: 54,
      K_7: 55,
      K_8: 56,
      K_9: 57,
      K_A: 65,
      K_B: 66,
      K_C: 67,
      K_D: 68,
      K_E: 69,
      K_F: 70,
      K_G: 71,
      K_H: 72,
      K_I: 73,
      K_J: 74,
      K_K: 75,
      K_L: 76,
      K_M: 77,
      K_N: 78,
      K_O: 79,
      K_P: 80,
      K_Q: 81,
      K_R: 82,
      K_S: 83,
      K_T: 84,
      K_U: 85,
      K_V: 86,
      K_W: 87,
      K_X: 88,
      K_Y: 89,
      K_Z: 90,
      K_NP0: 96,
      K_NP1: 97,
      K_NP2: 98,
      K_NP3: 99,
      K_NP4: 100,
      K_NP5: 101,
      K_NP6: 102,
      K_NP7: 103,
      K_NP8: 104,
      K_NP9: 105,
      K_NPSTAR: 106,
      K_NPPLUS: 107,
      K_SEPARATOR: 108,
      K_NPMINUS: 109,
      K_NPDOT: 110,
      K_NPSLASH: 111,
      K_F1: 112,
      K_F2: 113,
      K_F3: 114,
      K_F4: 115,
      K_F5: 116,
      K_F6: 117,
      K_F7: 118,
      K_F8: 119,
      K_F9: 120,
      K_F10: 121,
      K_F11: 122,
      K_F12: 123,
      K_NUMLOCK: 144,
      K_SCROLL: 145,
      K_LSHIFT: 160,
      K_RSHIFT: 161,
      K_LCONTROL: 162,
      K_RCONTROL: 163,
      K_LALT: 164,
      K_RALT: 165,
      K_COLON: 186,
      K_EQUAL: 187,
      K_COMMA: 188,
      K_HYPHEN: 189,
      K_PERIOD: 190,
      K_SLASH: 191,
      K_BKQUOTE: 192,
      K_LBRKT: 219,
      K_BKSLASH: 220,
      K_RBRKT: 221,
      K_QUOTE: 222,
      K_oE2: 226,
      K_OE2: 226,
      K_LOPT: 50001,
      K_ROPT: 50002,
      K_NUMERALS: 50003,
      K_SYMBOLS: 50004,
      K_CURRENCIES: 50005,
      K_UPPER: 50006,
      K_LOWER: 50007,
      K_ALPHA: 50008,
      K_SHIFTED: 50009,
      K_ALTGR: 50010,
      K_TABBACK: 50011,
      K_TABFWD: 50012,
    },
    codesUS: [
      ["0123456789", ";=,-./`", "[\\]'"],
      [")!@#$%^&*(", ":+<_>?~", '{|}"'],
    ],
  };
})(com || (com = {}));
(function (f) {
  (function (g) {
    (function (k) {
      var r = (function () {
        return function () {};
      })();
      k.LegacyKeyEvent = r;
      r = (function () {
        function e() {
          this.stateKeys = { K_CAPS: !1, K_NUMLOCK: !1, K_SCROLL: !1 };
          this.modStateFlags = 0;
          this.swallowKeypress = !1;
        }
        e.prototype.defaultKeyOutput = function (a, d, c, b) {
          var h = a.kName,
            n = a.Lcode,
            e = a.Ltarg,
            q = f.keyman.singleton,
            z = q.domManager,
            m = q.keyboardManager.activeKeyboard,
            t = q.interface.activeTargetOutput instanceof k.Mock,
            v = "",
            r = !1,
            y = e && "undefined" != typeof e.base;
          0 == d ? (r = !0) : d == k.Codes.modifierCodes.SHIFT ? ((r = !0), (d = 1)) : t || console.warn("KMW only defines default key output for the 'default' and 'shift' layers!");
          if (y || c)
            switch (((y = k.Codes.keyCodes[h]) || (y = n), y)) {
              case k.Codes.keyCodes.K_BKSP:
                if (b) return "\b";
                if (e && e._kmwAttachment) var P = e._kmwAttachment.interface;
                q.interface.defaultBackspace(P);
                return "";
              case k.Codes.keyCodes.K_TAB:
                b || z.moveToNext(d);
                break;
              case k.Codes.keyCodes.K_TABBACK:
                b || z.moveToNext(!0);
                break;
              case k.Codes.keyCodes.K_TABFWD:
                b || z.moveToNext(!1);
                break;
              case k.Codes.keyCodes.K_ENTER:
                if ("TEXTAREA" == e.nodeName || ("undefined" != typeof e.base && "TEXTAREA" == e.base.nodeName)) return "\n";
                if (c) {
                  if (q.isEmbedded) return "\n";
                  if (g.dom.Utils.instanceof(e, "HTMLInputElement")) var N = e;
                  else "undefined" != typeof e.base && g.dom.Utils.instanceof(e.base, "HTMLInputElement") && (N = e.base);
                  b || (!N || ("search" != N.type && "submit" != N.type) ? z.moveToNext(!1) : ((N.disabled = !1), N.form.submit()));
                }
                break;
              case k.Codes.keyCodes.K_SPACE:
                return " ";
            }
          else if (8 == a.Lcode) {
            if (b) return "\b";
            q.interface.defaultBackspace();
            return "";
          }
          if (a.Lcode >= k.Codes.keyCodes.K_NP0 && a.Lcode <= k.Codes.keyCodes.K_NPSLASH && m && !m.KM) return (v = String._kmwFromCharCode(106 > a.Lcode ? a.Lcode - 48 : a.Lcode - 64));
          if (h && "U_" == h.substr(0, 2)) (a = parseInt(h.substr(2, 6), 16)), (0 <= a && 31 >= a) || (128 <= a && 159 >= a) ? t || console.log("Suppressing Unicode control code: U_00" + a.toString(16)) : (v = String.kmwFromCharCode(a));
          else if (r)
            try {
              n >= k.Codes.keyCodes.K_0 && n <= k.Codes.keyCodes.K_9
                ? (v = k.Codes.codesUS[d][0][n - k.Codes.keyCodes.K_0])
                : n >= k.Codes.keyCodes.K_A && n <= k.Codes.keyCodes.K_Z
                ? (v = String.fromCharCode(n + (d ? 0 : 32)))
                : n >= k.Codes.keyCodes.K_COLON && n <= k.Codes.keyCodes.K_BKQUOTE
                ? (v = k.Codes.codesUS[d][1][n - k.Codes.keyCodes.K_COLON])
                : n >= k.Codes.keyCodes.K_LBRKT && n <= k.Codes.keyCodes.K_QUOTE && (v = k.Codes.codesUS[d][2][n - k.Codes.keyCodes.K_LBRKT]);
            } catch (p) {
              t || console.error("Error detected with default mapping for key:  code = " + n + ", shift state = " + (1 == d ? "shift" : "default"));
            }
          return v;
        };
        e.getOutputTarget = function (a) {
          var d = f.keyman.singleton;
          if (!a && !d.isHeadless && ((a = d.domManager.getLastActiveElement()), !a)) return null;
          if (a._kmwAttachment && a._kmwAttachment.interface) return a._kmwAttachment.interface;
          throw Error("OSK could not find element output target data!");
        };
        e.prototype._GetClickEventProperties = function (a, d) {
          var c = f.keyman.singleton,
            b = c.keyboardManager.activeKeyboard,
            h = c.util.device.formFactor,
            n = a.layer || a.displayLayer || "",
            e = a.id.toUpperCase(),
            q = this.getModifierState(n);
          a = { Ltarg: d, Lmodifiers: q, Lstates: 0, Lcode: k.Codes.keyCodes[e], LisVirtualKey: !0, vkCode: 0, kName: e, kLayer: n, kbdLayer: a.displayLayer, kNextLayer: a.nextlayer };
          switch (e) {
            case "K_CAPS":
            case "K_NUMLOCK":
            case "K_SCROLL":
              this.stateKeys[e] = !this.stateKeys[e];
          }
          this.commonClickEventPreprocessing(a);
          !b || !b.KM || (b.KVKL && "desktop" != h) ? (a.vkCode = a.Lcode) : a.Lcode != k.Codes.keyCodes.K_SPACE && ((a.vkCode = a.Lcode), this.setMnemonicCode(a, -1 != n.indexOf("shift"), this.stateKeys.K_CAPS));
          "undefined" == typeof b.KM && ((a.Lcode = c.keyMapManager._USKeyCodeToCharCode(a)), (a.LisVirtualKey = !1));
          return a;
        };
        e.prototype.commonClickEventPreprocessing = function (a) {
          a.Lstates |= this.stateKeys.K_CAPS ? k.Codes.modifierCodes.CAPS : k.Codes.modifierCodes.NO_CAPS;
          a.Lstates |= this.stateKeys.K_NUMLOCK ? k.Codes.modifierCodes.NUM_LOCK : k.Codes.modifierCodes.NO_NUM_LOCK;
          a.Lstates |= this.stateKeys.K_SCROLL ? k.Codes.modifierCodes.SCROLL_LOCK : k.Codes.modifierCodes.NO_SCROLL_LOCK;
          "U_" == a.kName.substr(0, 2) && (a.LisVirtualKey = !1);
          "undefined" == typeof a.Lcode && ((a.Lcode = this.getVKDictionaryCode(a.kName)), a.Lcode || (a.Lcode = 1));
          (a.Lmodifiers & k.Codes.modifierBitmasks.ALT_GR_SIM) == k.Codes.modifierBitmasks.ALT_GR_SIM &&
            g.osk.Layouts.emulatesAltGr() &&
            ((a.Lmodifiers &= ~k.Codes.modifierBitmasks.ALT_GR_SIM), (a.Lmodifiers |= k.Codes.modifierCodes.RALT));
        };
        e.prototype.processKeystroke = function (a, d, c, b) {
          var h = f.keyman.singleton,
            n = h.keyboardManager.activeKeyboard,
            e = h.interface,
            q = h.keyMapManager;
          h.isEmbedded || c || "firefox" != h.util.device.browser || !q.browserMap.FF["k" + a.Lcode] || (a.Lcode = q.browserMap.FF["k" + a.Lcode]);
          q = 0;
          this.swallowKeypress = !1;
          n && 0 != a.Lcode && (q = q || e.processKeystroke(c ? h.util.device : h.util.physicalDevice, d, a));
          q ||
            ((a.Lcode = a.vkCode || a.Lcode),
            (e.activeTargetOutput = d),
            (c = this.defaultKeyOutput(a, a.Lmodifiers, !0, b)),
            (e.activeTargetOutput = null),
            c ? ("\b" == c ? e.defaultBackspace(d) : e.output(0, d, c), (q = 1)) : 8 == a.Lcode && (q = 1));
          return 1 == q;
        };
        e.prototype.processKeyEvent = function (a, d) {
          var c = f.keyman.singleton,
            b = !!d;
          "boolean" == typeof d && (d = null);
          var h = c.util.device.formFactor,
            n = c.keyMapManager;
          this.swallowKeypress = !1;
          b && !c.isEmbedded && (c.domManager.initActiveElement(a.Ltarg), c.osk.vkbd.highlightKey(d, !1));
          if ("K_LOPT" == a.kName || "K_ROPT" == a.kName) return c.osk.vkbd.optionKey(d, a.kName, !0), !0;
          if ((("desktop" == h || c.keyboardManager.layoutIsDesktopBased()) && b && this.selectLayer(a.kName, a.kNextLayer)) || (!b && this.doModifierPress(a, !b))) return !0;
          c.isEmbedded || b || "firefox" != c.util.device.browser || !n.browserMap.FF["k" + a.Lcode] || (a.Lcode = n.browserMap.FF["k" + a.Lcode]);
          if (
            !c.modelManager.enabled ||
            ((("K_BKSP" != a.kName && a.Lcode != k.Codes.keyCodes.K_BKSP) || !c.modelManager.tryRevertSuggestion()) && (("K_SPACE" != a.kName && a.Lcode != k.Codes.keyCodes.K_SPACE) || !c.modelManager.tryAcceptSuggestion("space")))
          ) {
            b && !c.isEmbedded && (c.uiManager.setActivatingUI(!0), (f.keyman.DOMEventHandlers.states._IgnoreNextSelChange = 100), c.domManager.focusLastActiveElement(), (f.keyman.DOMEventHandlers.states._IgnoreNextSelChange = 0));
            h = e.getOutputTarget(a.Ltarg);
            n = k.Mock.from(h);
            var w = this.processKeystroke(a, h, b, !1);
            a.kNextLayer && this.selectLayer(a.kName, a.kNextLayer);
            if (w) {
              w = void 0;
              if (a.keyDistribution && a.kbdLayer) {
                var q = c.osk.vkbd.layout;
                w = [];
                for (var g = 0, m = a.keyDistribution; g < m.length; g++) {
                  var t = m[g],
                    v = k.Mock.from(n),
                    r = q.getLayer(a.kbdLayer).getKey(t.keyId);
                  r ? ((r = this._GetClickEventProperties(r, a.Ltarg)), this.processKeystroke(r, v, b, !0) && w.push({ sample: v.buildTransformFrom(n), p: t.p })) : console.warn("Potential fat-finger key could not be found in layer!");
                }
              }
              b = h.buildTranscriptionFrom(n, a, w);
              c.modelManager.predict(b);
              h.getElement() && c["interface"].doInputEvent(h.getElement());
              this.swallowKeypress = d && 8 != a.Lcode ? 0 != a.Lcode : !1;
              8 == a.Lcode && (this.swallowKeypress = !1);
              return !1;
            }
            this.swallowKeypress = !1;
            b && !c.isEmbedded && c.uiManager.setActivatingUI(!1);
            return !c.isEmbedded || (a.Lcode != k.Codes.keyCodes.K_TAB && a.Lcode != k.Codes.keyCodes.K_TABBACK && a.Lcode != k.Codes.keyCodes.K_TABFWD) ? !w : !1;
          }
        };
        e.prototype.clickKey = function (a, d, c, b) {
          c = f.keyman.singleton;
          var h = c.domManager.getLastActiveElement();
          if (null != h) {
            var n = e.getOutputTarget(h);
            c.domManager.initActiveElement(h);
            c.osk.vkbd.highlightKey(a, !1);
            n.invalidateSelection();
            n.deadkeys().deleteMatched();
            h = this._GetClickEventProperties(a.key.spec, h);
            c.modelManager.enabled && ((h.source = d), (h.keyDistribution = b));
            return this.processKeyEvent(h, a);
          }
          return !0;
        };
        e.prototype.setMnemonicCode = function (a, d, c) {
          if (a.Lcode != k.Codes.keyCodes.K_SPACE) {
            var b = new k.KeyEvent(),
              h;
            for (h in a) b[h] = a[h];
            b.kName = "K_xxxx";
            b.Ltarg = null;
            d = this.defaultKeyOutput(b, d ? 16 : 0, !1, !0);
            a.vkCode = a.Lcode;
            d ? (a.Lcode = d.charCodeAt(0)) : delete a.Lcode;
          }
          c && ((65 <= a.Lcode && 90 >= a.Lcode) || (97 <= a.Lcode && 122 >= a.Lcode)) && ((a.Lmodifiers ^= 16), (a.Lcode ^= 32));
        };
        e.prototype.getModifierState = function (a) {
          var d = 0;
          0 <= a.indexOf("shift") && (d |= k.Codes.modifierCodes.SHIFT);
          var c = !1;
          0 <= a.indexOf("leftctrl") && ((d |= k.Codes.modifierCodes.LCTRL), (c = !0));
          0 <= a.indexOf("rightctrl") && ((d |= k.Codes.modifierCodes.RCTRL), (c = !0));
          0 <= a.indexOf("ctrl") && !c && (d |= k.Codes.modifierCodes.CTRL);
          c = !1;
          0 <= a.indexOf("leftalt") && ((d |= k.Codes.modifierCodes.LALT), (c = !0));
          0 <= a.indexOf("rightalt") && ((d |= k.Codes.modifierCodes.RALT), (c = !0));
          0 <= a.indexOf("alt") && !c && (d |= k.Codes.modifierCodes.ALT);
          return d;
        };
        e.prototype.getVKDictionaryCode = function (a) {
          var d = f.keyman.singleton.keyboardManager.activeKeyboard;
          if (!d.VKDictionary) {
            var c = [];
            if ("string" == typeof d.KVKD) for (var b = d.KVKD.split(" "), h = 0; h < b.length; h++) c[b[h].toUpperCase()] = h + 256;
            d.VKDictionary = c;
          }
          return (a = d.VKDictionary[a.toUpperCase()]) ? a : 0;
        };
        e.prototype._UpdateVKShift = function (a, d, c) {
          var b = 0,
            h = f.keyman.singleton,
            n = ["CAPS", "NUM_LOCK", "SCROLL_LOCK"],
            e = ["K_CAPS", "K_NUMLOCK", "K_SCROLL"];
          if (a)
            for (
              b = a.Lmodifiers,
                d = a.Lstates,
                h.keyboardManager.isChiral() &&
                  g.osk.Layouts.emulatesAltGr() &&
                  (this.modStateFlags & k.Codes.modifierBitmasks.ALT_GR_SIM) == k.Codes.modifierBitmasks.ALT_GR_SIM &&
                  ((b |= k.Codes.modifierBitmasks.ALT_GR_SIM), (b &= ~k.Codes.modifierCodes.RALT)),
                a = 0;
              a < n.length;
              a++
            )
              d & k.Codes.stateBitmasks[n[a]] && (this.stateKeys[e[a]] = d & k.Codes.modifierCodes[n[a]]);
          else if (c) for (b |= d, a = 0; a < n.length; a++) d & k.Codes.stateBitmasks[n[a]] && (this.stateKeys[e[a]] = !0);
          else for (b &= ~d, a = 0; a < n.length; a++) d & k.Codes.stateBitmasks[n[a]] && (this.stateKeys[e[a]] = !1);
          h.osk.vkbd && h.osk.vkbd.showLayer(this.getLayerId(b));
          h.osk._Visible && h.osk._Show();
          return !0;
        };
        e.prototype.getLayerId = function (a) {
          return g.osk.Layouts.getLayerId(a);
        };
        e.prototype.selectLayer = function (a, d) {
          var c = 2 > arguments.length ? null : d,
            b = f.keyman.singleton.keyboardManager.isChiral();
          "number" == typeof c && (c = this.getLayerId(16 * c));
          if (!c)
            switch (a) {
              case "K_LSHIFT":
              case "K_RSHIFT":
              case "K_SHIFT":
                c = "shift";
                break;
              case "K_LCONTROL":
              case "K_LCTRL":
                if (b) {
                  c = "leftctrl";
                  break;
                }
              case "K_RCONTROL":
              case "K_RCTRL":
                if (b) {
                  c = "rightctrl";
                  break;
                }
              case "K_CTRL":
                c = "ctrl";
                break;
              case "K_LMENU":
              case "K_LALT":
                if (b) {
                  c = "leftalt";
                  break;
                }
              case "K_RMENU":
              case "K_RALT":
                if (b) {
                  c = "rightalt";
                  break;
                }
              case "K_ALT":
                c = "alt";
                break;
              case "K_ALTGR":
                c = b ? "leftctrl-rightalt" : "ctrl-alt";
                break;
              case "K_CURRENCIES":
              case "K_NUMERALS":
              case "K_SHIFTED":
              case "K_UPPER":
              case "K_LOWER":
              case "K_SYMBOLS":
                c = "default";
            }
          if (!c) return !1;
          this.updateLayer(c);
          f.keyman.singleton.osk._Show();
          return !0;
        };
        e.prototype.updateLayer = function (a) {
          var d = f.keyman.singleton,
            c = d.osk.vkbd;
          if (c) {
            var b = c.layerId,
              h = b;
            if (a == b && "desktop" != d.util.device.formFactor) return !1;
            var n = a;
            if ("desktop" == d.util.device.formFactor) {
              var e = "leftctrl rightctrl ctrl leftalt rightalt alt shift".split(" ");
              for (d = 0; d < e.length; d++) (n = n.replace(e[d] + "-", "")), (n = n.replace(e[d], ""));
              if ("default" == b || "numeric" == b || "symbol" == b || "currency" == b || "" != n) h = a;
              else {
                b = this.getModifierState(h);
                for (d = 0; d < e.length; d++) (h = h.replace(e[d] + "-", "")), (h = h.replace(e[d], ""));
                switch (a) {
                  case "shift":
                    b ^= k.Codes.modifierCodes.SHIFT;
                    break;
                  case "leftctrl":
                    b ^= k.Codes.modifierCodes.LCTRL;
                    break;
                  case "rightctrl":
                    b ^= k.Codes.modifierCodes.RCTRL;
                    break;
                  case "ctrl":
                    b ^= k.Codes.modifierCodes.CTRL;
                    break;
                  case "leftalt":
                    b ^= k.Codes.modifierCodes.LALT;
                    break;
                  case "rightalt":
                    b ^= k.Codes.modifierCodes.RALT;
                    break;
                  case "alt":
                    b ^= k.Codes.modifierCodes.ALT;
                    break;
                  default:
                    h = a;
                }
                "default" != h && (h = "" == h ? this.getLayerId(b) : this.getLayerId(b) + "-" + h);
              }
              "" == h && (h = "default");
            } else h = a;
            c && (c.showLayer(h) || c.showLayer("default"));
          }
        };
        e.prototype._GetEventKeyCode = function (a) {
          return a.keyCode ? a.keyCode : a.which ? a.which : null;
        };
        e.prototype.doModifierPress = function (a, d) {
          var c = f.keyman.singleton;
          switch (a.Lcode) {
            case 8:
              e.getOutputTarget(a.Ltarg).deadkeys().clear();
              break;
            case 16:
            case 17:
            case 18:
            case 20:
            case 144:
            case 145:
              return c["interface"].notifyKeyboard(a.Lcode, a.Ltarg, d ? 1 : 0), c.util.device.touchable ? !0 : this._UpdateVKShift(a, a.Lcode - 15, 1);
          }
          a.LmodifierChange && (c["interface"].notifyKeyboard(0, a.Ltarg, 1), this._UpdateVKShift(a, 0, 1));
          return !1;
        };
        e.prototype._GetKeyEventProperties = function (a, d) {
          var c = f.keyman.singleton;
          d = new k.KeyEvent();
          a = c._GetEventObject(a);
          if (!0 === a.cancelBubble) return null;
          d.Ltarg = c.util.eventTarget(a);
          if (null == d.Ltarg) return null;
          3 == d.Ltarg.nodeType && (d.Ltarg = d.Ltarg.parentNode);
          d.Lcode = this._GetEventKeyCode(a);
          if (null == d.Lcode) return null;
          var b = this.modStateFlags,
            h = !1,
            n = !1;
          var e = k.Codes.keyCodes;
          switch (d.Lcode) {
            case e.K_CTRL:
            case e.K_LCTRL:
            case e.K_RCTRL:
            case e.K_CONTROL:
            case e.K_LCONTROL:
            case e.K_RCONTROL:
              h = !0;
              break;
            case e.K_LMENU:
            case e.K_RMENU:
            case e.K_ALT:
            case e.K_LALT:
            case e.K_RALT:
              n = !0;
          }
          e = 0 | (a.getModifierState("Shift") ? 16 : 0);
          var q = k.Codes.modifierCodes;
          a.getModifierState("Control") && (e |= 0 != a.location && h ? (1 == a.location ? q.LCTRL : q.RCTRL) : b & 3);
          a.getModifierState("Alt") && (e |= 0 != a.location && n ? (1 == a.location ? q.LALT : q.RALT) : b & 12);
          d.Lstates = 0;
          d.Lstates |= a.getModifierState("CapsLock") ? q.CAPS : q.NO_CAPS;
          d.Lstates |= a.getModifierState("NumLock") ? q.NUM_LOCK : q.NO_NUM_LOCK;
          d.Lstates |= a.getModifierState("ScrollLock") || a.getModifierState("Scroll") ? q.SCROLL_LOCK : q.NO_SCROLL_LOCK;
          e |= d.Lstates;
          d.LmodifierChange = this.modStateFlags != e;
          this.modStateFlags = e;
          h = q.RALT | q.LCTRL;
          (b & h) == h && (e & h) != h && (e &= ~h);
          e & q.RALT && (e &= ~q.LCTRL);
          b = k.Codes.modifierBitmasks;
          c.keyboardManager.isChiral()
            ? ((d.Lmodifiers = e & b.CHIRAL), g.osk.Layouts.emulatesAltGr() && (d.Lmodifiers & b.ALT_GR_SIM) == b.ALT_GR_SIM && ((d.Lmodifiers ^= b.ALT_GR_SIM), (d.Lmodifiers |= q.RALT)))
            : (d.Lmodifiers = (e & 16) | (e & (q.LCTRL | q.RCTRL) ? 32 : 0) | (e & (q.LALT | q.RALT) ? 64 : 0));
          (b = c.keyboardManager.activeKeyboard) && b.KM && this.setMnemonicCode(d, a.getModifierState("Shift"), a.getModifierState("CapsLock"));
          d.LisVirtualKey = ("undefined" != typeof a.charCode && null != a.charCode && (0 == a.charCode || 0 != (d.Lmodifiers & 111))) || "keypress" != a.type;
          a = c.keyMapManager;
          b &&
            !b.KM &&
            ((c = a.languageMap[f.keyman.osk.Layouts._BaseLayout]) && c["k" + d.Lcode] && (d.Lcode = c["k" + d.Lcode]),
            "undefined" != typeof b.KM || d.Lmodifiers & 96 || (d = { Lcode: a._USKeyCodeToCharCode(d), Ltarg: d.Ltarg, Lmodifiers: 0, LisVirtualKey: !1, vkCode: d.Lcode, Lstates: d.Lstates, kName: "" }));
          return d;
        };
        e.prototype.keyDown = function (a) {
          this.swallowKeypress = !1;
          var d = this._GetKeyEventProperties(a, !0);
          if (null == d) return !0;
          (d = !this.processKeyEvent(d)) && a && a.preventDefault && (a.preventDefault(), a.stopPropagation());
          return !d;
        };
        e.prototype.keyUp = function (a) {
          a = this._GetKeyEventProperties(a, !1);
          return null == a ? !0 : this.doModifierPress(a, !1);
        };
        e.prototype.keyPress = function (a) {
          var d = f.keyman.singleton,
            c = this._GetKeyEventProperties(a);
          if (null == c || c.LisVirtualKey) return !0;
          if (!d.keyboardManager.activeKeyboard.KM) {
            if (!this.swallowKeypress || 32 > c.Lcode || (d._BrowserIsSafari && 63232 < c.Lcode && 63744 > c.Lcode)) return !0;
            if ((a = d._GetEventObject(a))) a.returnValue = !1;
            return !1;
          }
          var b = e.getOutputTarget(c.Ltarg);
          if (this.swallowKeypress || d["interface"].processKeystroke(d.util.physicalDevice, b, c)) return (this.swallowKeypress = !1), a && a.preventDefault && (a.preventDefault(), a.stopPropagation()), !1;
          this.swallowKeypress = !1;
          return !0;
        };
        return e;
      })();
      k.Processor = r;
    })(g.text || (g.text = {}));
  })(f.keyman || (f.keyman = {}));
})(com || (com = {}));
(function (f) {
  (function (f) {
    var g = (function () {
      function a() {
        this._DisableInput = !1;
        this._IgnoreNextSelChange = 0;
        this._IgnoreBlurFocus = !1;
        this._SelectionControl = this._Selection = null;
      }
      a.prototype.setFocusTimer = function () {
        this.focusing = !0;
        this.focusTimer = window.setTimeout(
          function () {
            this.focusing = !1;
          }.bind(this),
          1e3
        );
      };
      return a;
    })();
    f.CommonDOMStates = g;
    var r = (function () {
      function a(d) {
        this.setFocus = function (a) {}.bind(this);
        this.setBlur = function (a) {}.bind(this);
        this._ControlFocus = function (c) {
          var b = this.keyman.util.device,
            d = this.keyman.osk;
          c = this.keyman._GetEventObject(c);
          c = this.keyman.util.eventTarget(c);
          if (null == c) return !0;
          c.body && (c = c.body);
          if (b.touchable && (null == c.className || 0 > c.className.indexOf("keymanweb-input"))) return !0;
          c.nodeName.toLowerCase();
          if (c.ownerDocument && c instanceof c.ownerDocument.defaultView.HTMLInputElement) {
            var n = c.type.toLowerCase();
            if ("text" != n && "search" != n) return !0;
          } else if (!((c.ownerDocument && "on" == c.ownerDocument.designMode) || (!b.touchable && c.isContentEditable) || (c.ownerDocument && c instanceof c.ownerDocument.defaultView.HTMLTextAreaElement))) return !0;
          e.states.activeElement = c;
          3 == c.nodeType && (c = c.parentNode);
          n = c;
          (null == c.className || 0 > c.className.indexOf("keymanweb-input")) && this instanceof e && this.scrollBody(c);
          c.ownerDocument && c instanceof c.ownerDocument.defaultView.HTMLIFrameElement && (this.keyman.domManager._AttachToIframe(c), (c = c.contentWindow.document.body));
          var w = a.states.lastActiveElement;
          a.states.lastActiveElement = c;
          this.keyman.uiManager.justActivated ? this._BlurKeyboardSettings() : this._FocusKeyboardSettings(w ? !1 : !0);
          if (this._CommonFocusHelper(c)) return !0;
          c.ownerDocument && c instanceof c.ownerDocument.defaultView.HTMLElement && this.keyman.domManager._SetTargDir(c);
          this.doControlFocused(n, a.states.lastActiveElement);
          b.touchable ? (d._Enabled = !0) : d.ready && (this.keyman.keyboardManager.isCJK() && (d._Enabled = !0), d._Enabled ? d._Show() : d._Hide(!1));
          return !0;
        }.bind(this);
        this._ControlBlur = function (c) {
          c = this.keyman._GetEventObject(c);
          var b = this.keyman.util.eventTarget(c);
          if (null == b) return !0;
          b.body && (b = b.body);
          if (a.states._IgnoreBlurFocus) return (c.cancelBubble = !0), c.stopPropagation(), !0;
          f.dom.Utils.instanceof(a.states.activeElement, "TouchAliasElement") && a.states.activeElement.hideCaret();
          a.states.activeElement = null;
          3 == b.nodeType && (b = b.parentNode);
          b.ownerDocument && b instanceof b.ownerDocument.defaultView.HTMLIFrameElement && (b = b.contentWindow.document);
          this._BlurKeyboardSettings();
          a.states.lastActiveElement = b;
          this.keyman.uiManager.justActivated = !1;
          var d = this.keyman.uiManager.isActivating;
          d || this.keyman["interface"].notifyKeyboard(0, b, 0);
          this.doControlBlurred(b, c, d);
          this.keyman.osk.ready && !d && this.keyman.osk._Hide(!1);
          this.doChangeEvent(b);
          this.keyman.interface.resetContext();
          return !0;
        }.bind(this);
        this._SelectionChange = function () {
          a.states._IgnoreNextSelChange && a.states._IgnoreNextSelChange--;
          return !0;
        }.bind(this);
        this._KeyDown = function (c) {
          var b = this.keyman.keyboardManager.activeKeyboard,
            d = this.keyman.osk,
            n = this.keyman.util;
          if (a.states._DisableInput || null == b) return !0;
          b = n.eventTarget(c);
          if (n.device.touchable) {
            if (b && "undefined" != typeof b.kmwInput && 0 == b.kmwInput) return !0;
          } else if (b && 0 <= b.className.indexOf("kmw-disabled")) return !0;
          return d.ready ? this.keyman.textProcessor.keyDown(c) : !0;
        }.bind(this);
        this._KeyPress = function (c) {
          return a.states._DisableInput || null == this.keyman.keyboardManager.activeKeyboard ? !0 : this.keyman.textProcessor.keyPress(c);
        }.bind(this);
        this._KeyUp = function (a) {
          var b = this.keyman.textProcessor,
            c = this.keyman.osk,
            d = b._GetKeyEventProperties(a, !1);
          return null != d && c.ready
            ? 13 != d.Lcode ||
              ((c = !1), d.Ltarg instanceof d.Ltarg.ownerDocument.defaultView.HTMLTextAreaElement && (c = !0), d.Ltarg.base && d.Ltarg.base instanceof d.Ltarg.base.ownerDocument.defaultView.HTMLTextAreaElement && (c = !0), c)
              ? b.keyUp(a)
              : (d.Ltarg instanceof d.Ltarg.ownerDocument.defaultView.HTMLInputElement && ((a = d.Ltarg), "search" == a.type || "submit" == a.type ? a.form.submit() : this.keyman.domManager.moveToNext(!1)), !0)
            : !0;
        }.bind(this);
        this.keyman = d;
      }
      a.prototype.doControlFocused = function (a, c) {
        var b = {};
        b.target = a;
        b.activeControl = c;
        return this.keyman.util.callEvent("kmw.controlfocused", b);
      };
      a.prototype.doControlBlurred = function (a, c, b) {
        var d = {};
        d.target = a;
        d.event = c;
        d.isActivating = b;
        return this.keyman.util.callEvent("kmw.controlblurred", d);
      };
      a.prototype._BlurKeyboardSettings = function (d, c) {
        var b = this.keyman.keyboardManager.activeKeyboard ? this.keyman.keyboardManager.activeKeyboard.KI : "",
          h = this.keyman.keyboardManager.getActiveLanguage();
        void 0 !== d && void 0 !== c && ((b = d), (h = c));
        (d = a.states.lastActiveElement) && null != d._kmwAttachment.keyboard ? ((d._kmwAttachment.keyboard = b), (d._kmwAttachment.languageCode = h)) : ((this.keyman.globalKeyboard = b), (this.keyman.globalLanguageCode = h));
      };
      a.prototype._FocusKeyboardSettings = function (d) {
        var c = a.states.lastActiveElement;
        c && null != c._kmwAttachment.keyboard
          ? this.keyman.keyboardManager.setActiveKeyboard(c._kmwAttachment.keyboard, c._kmwAttachment.languageCode)
          : d || this.keyman.keyboardManager.setActiveKeyboard(this.keyman.globalKeyboard, this.keyman.globalLanguageCode);
        this.keyman.modelManager && this.keyman.modelManager.invalidateContext();
      };
      a.prototype._CommonFocusHelper = function (d) {
        var c = this.keyman.uiManager;
        if (d.ownerDocument && d instanceof d.ownerDocument.defaultView.HTMLIFrameElement && (!this.keyman.domManager._IsIEEditableIframe(d, 1) || !this.keyman.domManager._IsMozillaEditableIframe(d, 1)))
          return (a.states._DisableInput = !0);
        a.states._DisableInput = !1;
        c.justActivated || (d && f.text.Processor.getOutputTarget(d) && f.text.Processor.getOutputTarget(d).deadkeys().clear(), this.keyman["interface"].notifyKeyboard(0, d, 1));
        c.justActivated || a.states._SelectionControl == d || (c.isActivating = !1);
        c.justActivated = !1;
        a.states._SelectionControl = d;
        return !1;
      };
      a.prototype.doChangeEvent = function (d) {
        if (a.states.changed) {
          if ("function" == typeof Event) var c = new Event("change", { bubbles: !0, cancelable: !1 });
          else (c = document.createEvent("HTMLEvents")), c.initEvent("change", !0, !1);
          d.base && d.base.kmw_ip && (d = d.base);
          d.dispatchEvent(c);
        }
        a.states.changed = !1;
      };
      a.states = new g();
      return a;
    })();
    f.DOMEventHandlers = r;
    var e = (function (a) {
      function d(c) {
        c = a.call(this, c) || this;
        c.setFocus = function (a) {
          r.states.setFocusTimer();
          a && f.dom.Utils.instanceof(a, "TouchEvent") ? (a = a.touches[0]) : ((a = { clientX: 0, clientY: 0 }), (a.target = r.states.lastActiveElement ? r.states.lastActiveElement.kmw_ip : this.keyman.domManager.sortedInputs[0].kmw_ip));
          this.setFocusWithTouch(a);
        }.bind(c);
        c.setBlur = function (a) {
          this.keyman.interface.resetContext();
          if ("relatedTarget" in a && a.relatedTarget && ((a = a.relatedTarget), this.doChangeEvent(a), "DIV" != a.nodeName || -1 == a.className.indexOf("keymanweb-input"))) {
            this.cancelInput();
            return;
          }
          r.states.focusing || this.cancelInput();
        }.bind(c);
        c.dragInput = function (a) {
          a.preventDefault();
          a.stopPropagation();
          var b = f.dom.Utils.instanceof(a, "TouchEvent") ? a.targetTouches[0].target : a.target;
          if (null != b) {
            if (null == b.className || 0 > b.className.indexOf("keymanweb-input")) b = b.parentNode;
            if (null == b.className || 0 > b.className.indexOf("keymanweb-input")) b = b.parentNode;
            if (!(null == b.className || 0 > b.className.indexOf("keymanweb-input"))) {
              if (f.dom.Utils.instanceof(a, "TouchEvent")) {
                var c = a.touches[0].screenX;
                var d = a.touches[0].screenY;
              } else (c = a.screenX), (d = a.screenY);
              if ("undefined" == typeof this.firstTouch || null == this.firstTouch) this.firstTouch = { x: c, y: d };
              else {
                var e = this.firstTouch.x,
                  g = this.firstTouch.y;
                a = b.firstChild;
                if ("TEXTAREA" == b.base.nodeName) {
                  if (((c = parseInt(a.style.top, 10)), isNaN(c) && (c = 0), (e = g - d), -4 > e || 4 < e)) (a.style.top = (c < e ? c - e : 0) + "px"), (this.firstTouch.y = d);
                } else {
                  d = parseInt(a.style.left, 10);
                  isNaN(d) && (d = 0);
                  var m = e - c;
                  if (-4 > m || 4 < m)
                    (e = 0),
                      (g = f.dom.Utils.getAbsoluteX(b) + b.offsetWidth - a.offsetWidth - 32),
                      "rtl" == b.base.dir ? (e = 16) : (g -= 24),
                      (d -= m),
                      d > e && (d = e),
                      d < g && (d = g),
                      (a.style.left = d + "px"),
                      (this.firstTouch.x = c);
                }
              }
              this.setScrollBar(b);
            }
          }
        }.bind(c);
        return c;
      }
      __extends(d, a);
      d.prototype.setFocusWithTouch = function (a) {
        var b = this.keyman.osk,
          c = a.clientX,
          d = a.clientY,
          e = a.target;
        var q = e && f.dom.Utils.instanceof(e, "HTMLSpanElement") ? e.parentNode : e && null != e.className && 0 <= e.className.indexOf("keymanweb-input") ? e.firstChild : e;
        a = q.parentNode;
        if (r.states.activeElement != a) {
          var g = r.states.activeElement;
          g && g.hideCaret();
          r.states.activeElement = a;
          a.focus();
        }
        this.keyman.domManager._SetTargDir(a);
        b.ready && !b._Visible && b._Show();
        if (e && f.dom.Utils.instanceof(e, "TouchAliasElement"))
          (d = f.dom.Utils.getAbsoluteX(q.firstChild)), "rtl" == a.dir ? ((d += q.firstChild.offsetWidth), (b = c > d ? 0 : 1e5)) : (b = c < d ? 0 : 1e5), a.setTextCaret(b), a.scrollInput();
        else {
          var m;
          q = q.childNodes[1];
          e = 0;
          g = a.getText()._kmwLength();
          b = a.getTextCaret();
          var t = document.body.scrollTop;
          if (a.base instanceof a.base.ownerDocument.defaultView.HTMLTextAreaElement) {
            var v = Math.round(a.base.offsetHeight / a.base.rows);
            for (m = 0; 16 > m; m++) {
              var k = f.dom.Utils.getAbsoluteY(q) - t;
              if (k > d && b > e && b != g) (g = b), (b = Math.round((b + e) / 2));
              else if (k < d - v && b < g && b != e) (e = b), (b = Math.round((b + g) / 2));
              else break;
              a.setTextCaret(b);
            }
            for (; f.dom.Utils.getAbsoluteY(q) - t > d && b > e; ) a.setTextCaret(--b);
            for (; f.dom.Utils.getAbsoluteY(q) - t < d - v && b < g; ) a.setTextCaret(++b);
          }
          k =
            "rtl" == a.dir
              ? function (a, b) {
                  return a < b;
                }
              : function (a, b) {
                  return a > b;
                };
          for (m = 0; 16 > m; m++) {
            d = f.dom.Utils.getAbsoluteX(q);
            if (k(d, c) && b > e && b != g) (g = b), (b = Math.round((b + e) / 2));
            else if (!k(d, c) && b < g && b != e) (e = b), (b = Math.round((b + g) / 2));
            else break;
            a.setTextCaret(b);
          }
          for (; k(f.dom.Utils.getAbsoluteX(q), c) && b > e; ) a.setTextCaret(--b);
          for (; !k(f.dom.Utils.getAbsoluteX(q), c) && b < g; ) a.setTextCaret(++b);
        }
        this._BlurKeyboardSettings();
        r.states.lastActiveElement = a;
        a.showCaret();
        this._FocusKeyboardSettings(!1);
        this._CommonFocusHelper(a);
      };
      d.prototype.cancelInput = function () {
        r.states.activeElement && r.states.activeElement.hideCaret && r.states.activeElement.hideCaret();
        r.states.activeElement = null;
        this.keyman.osk.hideNow();
      };
      d.prototype.setScrollBar = function (a) {
        var b = a.childNodes[0],
          c = a.childNodes[1].style;
        (b.offsetWidth > a.offsetWidth || 0 > b.offsetLeft) && "TEXTAREA" != a.base.nodeName
          ? ((c.height = "4px"), (c.width = (a.offsetWidth / b.offsetWidth) * 100 + "%"), (c.left = (-b.offsetLeft / b.offsetWidth) * 100 + "%"), (c.top = "0"), (c.visibility = "visible"))
          : b.offsetHeight > a.offsetHeight || 0 > b.offsetTop
          ? ((c.width = "4px"), (c.height = (a.offsetHeight / b.offsetHeight) * 100 + "%"), (c.top = (-b.offsetTop / b.offsetHeight) * 100 + "%"), (c.left = "0"), (c.visibility = "visible"))
          : (c.visibility = "hidden");
      };
      d.prototype.scrollBody = function (a) {
        var b = this.keyman.osk;
        if (a && null != a.className && !(0 > a.className.indexOf("keymanweb-input")) && b.ready) {
          a = a.firstChild.childNodes[1];
          var c = f.dom.Utils.getAbsoluteY(a),
            d = window.pageYOffset;
          c < d ? (b = c - d) : ((b = c - d - (window.innerHeight - b._Box.offsetHeight - a.offsetHeight - 2)), 0 > b && (b = 0));
          0 != b && window.scrollTo(0, b + window.pageYOffset);
        }
      };
      return d;
    })(r);
    f.DOMTouchHandlers = e;
  })(f.keyman || (f.keyman = {}));
})(com || (com = {}));
(function (f) {
  (function (f) {
    (function (f) {
      var g = (function () {
        function e(a) {
          if (void 0 === a || null === a) this.components = [].concat(e.DEVELOPER_VERSION_FALLBACK.components);
          else if (Array.isArray(a)) {
            if (2 > a.length) throw Error("Version string must have at least a major and minor component!");
            this.components = [].concat(a);
          } else {
            a = a.split(".");
            var d = [];
            if (2 > a.length) throw Error("Version string must have at least a major and minor component!");
            for (var c = 0; c < a.length; c++) {
              var b = parseInt(a[c], 10);
              if (isNaN(b)) throw Error("Version string components must be numerical!");
              d.push(b);
            }
            this.components = d;
          }
        }
        Object.defineProperty(e.prototype, "major", {
          get: function () {
            return this.components[0];
          },
          enumerable: !0,
          configurable: !0,
        });
        Object.defineProperty(e.prototype, "minor", {
          get: function () {
            return this.components[1];
          },
          enumerable: !0,
          configurable: !0,
        });
        e.prototype.toString = function () {
          return this.components.join(".");
        };
        e.prototype.equals = function (a) {
          return 0 == this.compareTo(a);
        };
        e.prototype.precedes = function (a) {
          return 0 > this.compareTo(a);
        };
        e.prototype.compareTo = function (a) {
          var d = this.components.length < a.components.length,
            c = this.components.length < a.components.length ? this.components.length : a.components.length,
            b;
          for (b = 0; b < c; b++) {
            var h = this.components[b] - a.components[b];
            if (0 != h) return h;
          }
          a = d ? a.components : this.components;
          do {
            if (0 < a[b]) return d ? -1 : 1;
            b++;
          } while (b < a.length);
          return 0;
        };
        e.DEVELOPER_VERSION_FALLBACK = new e([9, 0, 0]);
        e.NO_DEFAULT_KEYCAPS = new e([12, 0]);
        e.MAC_POSSIBLE_IPAD_ALIAS = new e([10, 15]);
        return e;
      })();
      f.Version = g;
    })(f.utils || (f.utils = {}));
  })(f.keyman || (f.keyman = {}));
})(com || (com = {}));
(function (f) {
  (function (f) {
    (function (f) {
      var g = (function () {
        return function (e) {
          this.popupCanvasBackgroundColor = "Android" == e.OS ? "#999" : "dark" == e.colorScheme ? "#0f1319" : "#ffffff";
        };
      })();
      f.StyleConstants = g;
    })(f.utils || (f.utils = {}));
  })(f.keyman || (f.keyman = {}));
})(com || (com = {}));
(function (f) {
  (function (f) {
    var g = (function () {
      function g() {
        this.detected = !1;
        this.touchable = !!("ontouchstart" in window);
        this.OS = "";
        this.formFactor = "desktop";
        this.dyLandscape = this.dyPortrait = 0;
        this.version = "0";
        this.orientation = window.orientation;
        this.browser = "";
      }
      g.prototype.getDPI = function () {
        var e = document.createElement("DIV"),
          a = e.style,
          d = 96;
        if ("complete" !== document.readyState) return d;
        e.id = "calculateDPI";
        a.position = "absolute";
        a.display = "block";
        a.visibility = "hidden";
        a.left = "10px";
        a.top = "10px";
        a.width = "1in";
        a.height = "10px";
        document.body.appendChild(e);
        d = "undefined" == typeof window.devicePixelRatio ? e.offsetWidth : e.offsetWidth * window.devicePixelRatio;
        document.body.removeChild(e);
        return d;
      };
      g.prototype.detect = function () {
        var e = g._GetIEVersion(),
          a = !1;
        if (navigator && navigator.userAgent) {
          var d = navigator.userAgent;
          if (0 <= d.indexOf("iPad")) (this.OS = "iOS"), (this.formFactor = "tablet"), (this.dyPortrait = this.dyLandscape = 0);
          else if (0 <= d.indexOf("iPhone")) (this.OS = "iOS"), (this.formFactor = "phone"), (this.dyPortrait = this.dyLandscape = 25);
          else if (0 <= d.indexOf("Android")) {
            this.OS = "Android";
            this.formFactor = "phone";
            this.dyPortrait = 75;
            this.dyLandscape = 25;
            try {
              this.version = d.match(/(?:Android\s+)(\d+\.\d+\.\d+)/)[1];
            } catch (c) {}
          } else
            0 <= d.indexOf("Linux")
              ? (this.OS = "Linux")
              : 0 <= d.indexOf("Macintosh")
              ? ((d = /Intel Mac OS X (10(?:[_\.]\d+)+)/i.exec(d)), 1 < d.length && d[1] && ((a = d[1].replace("_", ".")), (a = new f.utils.Version(a)), (a = 0 >= f.utils.Version.MAC_POSSIBLE_IPAD_ALIAS.compareTo(a)), (this.OS = "MacOSX")))
              : 0 <= d.indexOf("Windows NT") && ((this.OS = "Windows"), 0 <= d.indexOf("Touch") && (this.formFactor = "phone"), "number" == typeof navigator.msMaxTouchPoints && 0 < navigator.msMaxTouchPoints && (this.touchable = !0));
        }
        "tablet" == this.formFactor && 400 > Math.min(screen.width, screen.height) && (this.formFactor = "phone");
        "phone" == this.formFactor && 720 < Math.max(screen.width, screen.height) && "iOS" != this.OS && (this.formFactor = "tablet");
        d = "Win32" == navigator.platform || "MacIntel" == navigator.platform;
        "iOS" != this.OS || "ongesturestart" in window || d || (this.OS = "Android");
        this.browser = "web";
        if (999 > e) this.browser = "ie";
        else {
          if ("iOS" == this.OS || "macosx" == this.OS.toLowerCase()) this.browser = "safari";
          /Firefox|Chrome|OPR|Safari|Edge/.test(navigator.userAgent) &&
            (0 <= navigator.userAgent.indexOf("Firefox") && "onmozorientationchange" in screen
              ? (this.browser = "firefox")
              : 0 <= navigator.userAgent.indexOf("OPR")
              ? (this.browser = "opera")
              : 0 <= navigator.userAgent.indexOf(" Edge/")
              ? (this.browser = "edge")
              : 0 <= navigator.userAgent.indexOf("Chrome")
              ? (this.browser = "chrome")
              : 0 <= navigator.userAgent.indexOf("Safari") && (this.browser = "safari"));
        }
        a &&
          "safari" == this.browser &&
          window.TouchEvent &&
          ((this.OS = "iOS"),
          (this.formFactor = "tablet"),
          (this.dyPortrait = this.dyLandscape = 0),
          (e = screen.height / screen.width),
          1 > e && (e = 1 / e),
          1.6 < e && ((this.formFactor = "phone"), (this.dyPortrait = this.dyLandscape = 25)));
        this.colorScheme = this.prefersDarkMode() ? "dark" : "light";
        this.detected = !0;
      };
      g._GetIEVersion = function () {
        var e = "";
        "userAgent" in navigator && (e = navigator.userAgent);
        if ("selection" in document) {
          var a = navigator.appVersion;
          var d = a.indexOf("MSIE ");
          if (0 <= d) {
            if ("BackCompat" == document.compatMode) return 6;
            a = a.substr(d + 5);
            d = a.indexOf(".");
            if (0 < d) return parseInt(a.substr(0, d), 10);
          }
        }
        d = e.indexOf("Trident/");
        if (0 > d) return 999;
        e = e.substr(d + 8);
        d = e.indexOf(".");
        return 0 < d ? parseInt(e.substr(0, d), 10) + 4 : 999;
      };
      g.prototype.prefersDarkMode = function () {
        return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      };
      Object.defineProperty(g.prototype, "styles", {
        get: function () {
          this._styles || (this.detected || this.detect(), (this._styles = new f.utils.StyleConstants(this)));
          return this._styles;
        },
        enumerable: !0,
        configurable: !0,
      });
      return g;
    })();
    f.Device = g;
  })(f.keyman || (f.keyman = {}));
})(com || (com = {}));
(function (f) {
  (function (g) {
    (function (g) {
      var k = (function () {
        function e() {}
        e.getAbsoluteX = function (a) {
          if (!a) return 0;
          var d = a.offsetLeft ? a.offsetLeft : 0;
          var c = a;
          if (c.offsetParent) {
            for (; c.offsetParent; ) (c = c.offsetParent), (d += c.offsetLeft);
            var b = c.ownerDocument;
            "fixed" == c.style.position && b && b.scrollingElement && (d += b.scrollingElement.scrollLeft);
          }
          return c && c.ownerDocument && a.ownerDocument != window.document && (a = c.ownerDocument) && a.defaultView && a.defaultView.frameElement ? d + e.getAbsoluteX(a.defaultView.frameElement) - a.documentElement.scrollLeft : d;
        };
        e.getAbsoluteY = function (a) {
          if (!a) return 0;
          var d = a.offsetTop ? a.offsetTop : 0;
          var c = a;
          if (c.ownerDocument && c instanceof c.ownerDocument.defaultView.HTMLElement) {
            for (; c.offsetParent; ) (c = c.offsetParent), (d += c.offsetTop);
            var b = c.ownerDocument;
            "fixed" == c.style.position && b && b.scrollingElement && (d += b.scrollingElement.scrollTop);
          }
          return c && c.ownerDocument && a.ownerDocument != window.document && (a = c.ownerDocument) && a.defaultView && a.defaultView.frameElement ? d + e.getAbsoluteY(a.defaultView.frameElement) : d;
        };
        e.instanceof = function (a, d) {
          if ("TouchAliasElement" == d) return this.instanceof(a, "HTMLDivElement") ? void 0 !== a.base : !1;
          var c;
          if (!a) return !1;
          if (a.Window) return "Window" == d;
          a.defaultView
            ? (c = a.defaultView[d])
            : a.ownerDocument
            ? (c = a.ownerDocument.defaultView[d])
            : a.target &&
              (this.instanceof(a.target, "Window") ? (c = a.target[d]) : this.instanceof(a.target, "Document") ? (c = a.target.defaultView[d]) : this.instanceof(a.target, "HTMLElement") && (c = a.target.ownerDocument.defaultView[d]));
          return c ? a instanceof c : !1;
        };
        e.forceScroll = function (a) {
          if (f && f.keyman && f.keyman.DOMEventHandlers && !f.keyman.singleton.isEmbedded) {
            var d = f.keyman.DOMEventHandlers,
              c = a.selectionStart,
              b = a.selectionEnd;
            d.states._IgnoreBlurFocus = !0;
            a.blur();
            a.focus();
            d.states._IgnoreBlurFocus = !1;
            a.selectionStart = c;
            a.selectionEnd = b;
          }
        };
        return e;
      })();
      g.Utils = k;
    })(g.dom || (g.dom = {}));
  })(f.keyman || (f.keyman = {}));
})(com || (com = {}));
(function (f) {
  (function (g) {
    (function (g) {
      g.constructTouchAlias = function (e) {
        var a = document.createElement("div"),
          d = new r(),
          c;
        for (c in d) a.hasOwnProperty(c) || (a[c] = d[c]);
        e ? a.initWithBase(e) : a.init();
        return a;
      };
      var r = (function () {
        function e() {
          this.base = null;
          this.__activeCaret = !1;
        }
        e.getDevice = function () {
          if (!e.device) {
            var a = new f.keyman.Device();
            a.detect();
            e.device = a;
          }
          return e.device;
        };
        e.getOS = function () {
          return this.getDevice().OS;
        };
        e.prototype.isMultiline = function () {
          return this.base && "TEXTAREA" == this.base.nodeName;
        };
        e.prototype.initCaret = function () {
          this.__caretDiv = document.createElement("DIV");
          var a = this.__caretDiv.style;
          a.position = "absolute";
          a.height = "16px";
          a.width = "2px";
          a.backgroundColor = "blue";
          a.border = "none";
          a.left = a.top = "0px";
          a.display = "block";
          a.visibility = "hidden";
          a.zIndex = "9998";
          this.__caretTimerId = window.setInterval(this.flashCaret.bind(this), 500);
        };
        e.prototype.init = function () {
          this.className = "keymanweb-input";
          var a = (this.__scrollDiv = document.createElement("div")),
            d = this.style;
          d.overflow = "hidden";
          d.position = "absolute";
          d.border = "hidden";
          d.border = "none";
          d.borderRadius = "5px";
          var c = (this.__scrollBar = document.createElement("div")),
            b = c.style;
          b.position = "absolute";
          b.height = b.width = "4px";
          b.left = b.top = "0";
          b.display = "block";
          b.visibility = "hidden";
          b.backgroundColor = "#808080";
          b.borderRadius = "2px";
          this.__preCaret = document.createElement("span");
          this.__postCaret = document.createElement("span");
          this.__caretSpan = document.createElement("span");
          this.__preCaret.innerHTML = this.__postCaret.innerHTML = this.__caretSpan.innerHTML = "";
          this.__preCaret.className = this.__postCaret.className = this.__caretSpan.className = "keymanweb-font";
          a.appendChild(this.__preCaret);
          a.appendChild(this.__caretSpan);
          a.appendChild(this.__postCaret);
          this.appendChild(a);
          this.appendChild(c);
          a = a.style;
          a.position = "absolute";
          c = this.__preCaret.style;
          b = this.__postCaret.style;
          var h = this.__caretSpan.style;
          c.border = b.border = "none";
          c.height = b.height = "100%";
          h.border = "1px solid red";
          h.visibility = "hidden";
          h.marginLeft = h.marginRight = "-1px";
          d.padding = "8px";
          a.padding = "0px 2px";
          this.tabIndex = 0;
          this.style.msTouchAction = "none";
          a.minWidth = d.width;
          a.height = d.height;
          this.initCaret();
        };
        e.prototype.initWithBase = function (a) {
          this.base = a;
          this.init();
          this.base.kmw_ip = this;
          a.disabled = !0;
          var d = window.getComputedStyle(a, null),
            c = this.__scrollDiv.style,
            b = this.__preCaret.style,
            h = this.__postCaret.style;
          this.dir = a.dir;
          b.fontFamily = h.fontFamily = c.fontFamily = d.fontFamily;
          "input" != a.nodeName.toLowerCase() || isNaN(parseInt(d.height, 10)) || (b.lineHeight = h.lineHeight = d.height);
          "Android" == e.getOS() && "transparent" == d.backgroundColor ? (c.backgroundColor = "#fff") : (c.backgroundColor = d.backgroundColor);
          "textarea" == this.base.nodeName.toLowerCase() ? (b.whiteSpace = h.whiteSpace = "pre-wrap") : (b.whiteSpace = h.whiteSpace = "pre");
          this.base.parentNode.appendChild(this);
          this.updateInput();
          b = this.style;
          b.color = d.color;
          b.fontFamily = d.fontFamily;
          b.fontSize = d.fontSize;
          b.fontWeight = d.fontWeight;
          b.textDecoration = d.textDecoration;
          b.padding = d.padding;
          b.margin = d.margin;
          b.border = d.border;
          b.borderRadius = d.borderRadius;
          "webkitTapHighlightColor" in b && (b.webkitTapHighlightColor = "rgba(0,0,0,0)");
          a instanceof a.ownerDocument.defaultView.HTMLTextAreaElement
            ? (2 == a.rows && ((h = parseInt(d.height, 10) - parseInt(d.paddingTop, 10) - parseInt(d.paddingBottom, 10)), (d = parseInt(d.fontSize, 10)), (d = Math.round(h / d)), d > a.rows + 1 && (a.rows = d)),
              (c.width = b.width),
              (c.minHeight = b.height))
            : ((c.minWidth = b.width), (c.height = b.height));
          a.style.visibility = "hidden";
          (function (a) {
            a.__resizeHandler = function () {
              window.setTimeout(function () {
                a.updateInput();
              }, 1);
            };
            a.base.addEventListener("resize", a.__resizeHandler, !1);
            a.base.addEventListener("orientationchange", a.__resizeHandler, !1);
          })(this);
          this.setText(a instanceof a.ownerDocument.defaultView.HTMLTextAreaElement || a instanceof a.ownerDocument.defaultView.HTMLInputElement ? a.value : a.textContent, null);
        };
        e.prototype.setText = function (a, d) {
          if (null === a) {
            var c = this.__preCaret.textContent;
            a = this.__postCaret.textContent;
            a = c + a;
          }
          0 > d && (d = 0);
          c = a._kmwLength();
          if (null === d || void 0 === d || d > c) d = c;
          c = a._kmwSubstr(0, d);
          a = a._kmwSubstr(d);
          this.__preCaret.textContent = c;
          this.__postCaret.textContent = a;
          this.updateBaseElement();
        };
        e.prototype.getTextBeforeCaret = function () {
          return this.__preCaret.textContent;
        };
        e.prototype.getTextAfterCaret = function () {
          return this.__postCaret.textContent;
        };
        e.prototype.setTextBeforeCaret = function (a) {
          this.isMultiline() || (a = a.replace(/\s+$/, " "));
          this.__preCaret.textContent = a;
          this.updateBaseElement();
          this.scrollInput();
        };
        e.prototype.getTextCaret = function () {
          return this.getTextBeforeCaret()._kmwLength();
        };
        e.prototype.setTextCaret = function (a) {
          this.setText(null, a);
          this.showCaret();
        };
        e.prototype.updateBaseElement = function () {
          if (this.base) {
            var a = this.base.ownerDocument.defaultView;
            this.base instanceof a.HTMLInputElement || this.base instanceof a.HTMLTextAreaElement ? (this.base.value = this.getText()) : (this.base.textContent = this.getText());
            a = this.getText()._kmwLength();
            this.style.backgroundColor = 0 == a ? "transparent" : window.getComputedStyle(this.base, null).backgroundColor;
            "iOS" == e.getOS() && (this.base.style.visibility = 0 == a ? "visible" : "hidden");
          }
        };
        e.prototype.flashCaret = function () {
          if (this.__activeCaret) {
            var a = this.__caretDiv.style;
            a.visibility = "visible" != a.visibility ? "visible" : "hidden";
          }
        };
        e.prototype.showCaret = function () {
          var a = this.__scrollDiv,
            d = this.__caretDiv.style,
            c = this.__caretSpan;
          this.__caretDiv.parentNode != a && a.appendChild(this.__caretDiv);
          d.left = c.offsetLeft + "px";
          d.top = c.offsetTop + "px";
          d.height = c.offsetHeight - 1 + "px";
          d.visibility = "hidden";
          this.__activeCaret = !0;
          this.scrollBody();
          this.setScrollBar();
        };
        e.prototype.hideCaret = function () {
          if (this.base instanceof this.base.ownerDocument.defaultView.HTMLTextAreaElement || this.base instanceof this.base.ownerDocument.defaultView.HTMLInputElement) this.base.value = this.getText();
          this.setText(null, 1e5);
          var a = this.__scrollDiv.style;
          this.isMultiline() ? (a.top = "0") : (a.left = "rtl" == this.base.dir ? this.offsetWidth - this.__scrollDiv.offsetWidth - 8 + "px" : "0");
          this.__caretDiv.parentNode && this.__caretDiv.parentNode.removeChild(this.__caretDiv);
          this.__caretDiv.style.visibility = "hidden";
          this.__scrollBar.style.visibility = "hidden";
          this.__activeCaret = !1;
        };
        e.prototype.getText = function () {
          return this.textContent;
        };
        e.prototype.updateInput = function () {
          if (this.base) {
            var a = this.style,
              d = this.base,
              c = window.getComputedStyle(d, null),
              b = parseInt(c.marginLeft, 10),
              h = parseInt(c.marginTop, 10),
              n = g.Utils.getAbsoluteX(d),
              w = g.Utils.getAbsoluteY(d),
              f = this.offsetParent;
            f && ((n -= g.Utils.getAbsoluteX(f)), (w -= g.Utils.getAbsoluteY(f)));
            isNaN(b) && (b = 0);
            isNaN(h) && (h = 0);
            a.left = n - b + "px";
            a.top = w - h + "px";
            "undefined" != typeof c.MozBoxSizing && ((a.left = n + "px"), (a.top = w + "px"));
            b = d.offsetWidth;
            d = d.offsetHeight;
            h = parseInt(c.paddingLeft, 10);
            n = parseInt(c.paddingRight, 10);
            w = parseInt(c.paddingTop, 10);
            f = parseInt(c.paddingBottom, 10);
            var z = parseInt(c.borderLeft, 10),
              m = parseInt(c.borderRight, 10),
              t = parseInt(c.borderTop, 10),
              v = parseInt(c.borderBottom, 10),
              r = "undefined";
            "undefined" != typeof c.boxSizing ? (r = c.boxSizing) : "undefined" != typeof c.MozBoxSizing && (r = c.MozBoxSizing);
            "content-box" == r && (isNaN(h) || (b -= h), isNaN(n) || (b -= n), isNaN(z) || (b -= z), isNaN(m) || (b -= m), isNaN(w) || (d -= w), isNaN(f) || (d -= f), isNaN(t) || (d -= t), isNaN(v) || (d -= v));
            "Android" == e.getOS() && ("undefined" != typeof c.MozBoxSizing ? ((a.paddingTop = w + 1 + "px"), (a.paddingLeft = h + "px"), this.isMultiline() ? (a.marginTop = "1px") : (a.marginLeft = "1px"), b--, d--) : (b++, d++));
            a.width = b + "px";
            a.height = d + "px";
          }
        };
        e.prototype.scrollInput = function () {
          var a = this.__scrollDiv,
            d = this.__caretSpan,
            c = g.Utils.getAbsoluteX(d);
          d = g.Utils.getAbsoluteY(d);
          var b = g.Utils.getAbsoluteX(this),
            h = g.Utils.getAbsoluteY(this),
            n = parseInt(a.style.left, 10),
            e = parseInt(a.style.top, 10),
            f = 0,
            z = 0;
          isNaN(n) && (n = 0);
          isNaN(e) && (e = 0);
          this.isMultiline()
            ? ((c = Math.round(this.offsetHeight / this.base.rows)), d < h && (z = d - h), d > h + this.offsetHeight - c && (z = d - h - this.offsetHeight + c), 0 != z && (a.style.top = (e < z ? e - z : 0) + "px"))
            : (c < b + 8 && (f = c - b - 12), c > b + this.offsetWidth - 12 && (f = c - b - this.offsetWidth + 12), 0 != f && (a.style.left = (n < f ? n - f : 0) + "px"));
          this.showCaret();
        };
        e.prototype.scrollBody = function () {
          var a = 0;
          if (window.keyman) {
            var d = window.keyman.osk;
            d && d._Box && (a = d._Box.offsetHeight);
          }
          d = this.__caretSpan;
          var c = g.Utils.getAbsoluteY(d),
            b = window.pageYOffset;
          c < b ? (a = c - b) : ((a = c - b - (window.innerHeight - a - d.offsetHeight - 2)), 0 > a && (a = 0));
          0 != a && window.scrollTo(0, a + window.pageYOffset);
        };
        e.prototype.setScrollBar = function () {
          var a = this.__scrollDiv,
            d = this.__scrollBar.style;
          (a.offsetWidth > this.offsetWidth || 0 > a.offsetLeft) && !this.isMultiline()
            ? ((d.height = "4px"), (d.width = (this.offsetWidth / a.offsetWidth) * 100 + "%"), (d.left = (-a.offsetLeft / a.offsetWidth) * 100 + "%"), (d.top = "0"), (d.visibility = "visible"))
            : a.offsetHeight > this.offsetHeight || 0 > a.offsetTop
            ? ((d.width = "4px"), (d.height = (this.offsetHeight / a.offsetHeight) * 100 + "%"), (d.top = (-a.offsetTop / a.offsetHeight) * 100 + "%"), (d.left = "0"), (d.visibility = "visible"))
            : (d.visibility = "hidden");
        };
        return e;
      })();
    })(g.dom || (g.dom = {}));
  })(f.keyman || (f.keyman = {}));
})(com || (com = {}));
(function (f) {
  (function (f) {
    (function (g) {
      var r = (function (e) {
        function a(a) {
          var c = e.call(this) || this;
          c.root = a;
          c._cachedSelectionStart = -1;
          return c;
        }
        __extends(a, e);
        a.prototype.getElement = function () {
          return this.root;
        };
        a.prototype.clearSelection = function () {
          var a = this.getCaret();
          this.root.value = this.root.value._kmwSubstring(0, a) + this.root.value._kmwSubstring(this.processedSelectionEnd);
          this.setCaret(a);
        };
        a.prototype.hasSelection = function () {
          return !0;
        };
        a.prototype.invalidateSelection = function () {
          this._cachedSelectionStart = -1;
        };
        a.prototype.getCaret = function () {
          this.root.selectionStart != this._cachedSelectionStart &&
            ((this._cachedSelectionStart = this.root.selectionStart),
            (this.processedSelectionStart = this.root.value._kmwCodeUnitToCodePoint(this.root.selectionStart)),
            (this.processedSelectionEnd = this.root.value._kmwCodeUnitToCodePoint(this.root.selectionEnd)));
          return this.processedSelectionStart;
        };
        a.prototype.getDeadkeyCaret = function () {
          return this.getCaret();
        };
        a.prototype.setCaret = function (a) {
          this.setSelection(a, a);
        };
        a.prototype.setSelection = function (a, c) {
          var b = this.root.value._kmwCodePointToCodeUnit(a),
            d = this.root.value._kmwCodePointToCodeUnit(c);
          this.root.setSelectionRange(b, d);
          this.processedSelectionStart = a;
          this.processedSelectionEnd = c;
          g.Utils.forceScroll(this.root);
        };
        a.prototype.getTextBeforeCaret = function () {
          return this.getText()._kmwSubstring(0, this.getCaret());
        };
        a.prototype.setTextBeforeCaret = function (a) {
          this.getCaret();
          var c = a._kmwLength();
          this.root.value = a + this.getText()._kmwSubstring(this.processedSelectionStart);
          this.setCaret(c);
        };
        a.prototype.setTextAfterCaret = function (a) {
          var c = this.getCaret();
          this.root.value = this.getTextBeforeCaret() + a;
          this.setCaret(c);
        };
        a.prototype.getTextAfterCaret = function () {
          this.getCaret();
          return this.getText()._kmwSubstring(this.processedSelectionEnd);
        };
        a.prototype.getText = function () {
          return this.root.value;
        };
        a.prototype.deleteCharsBeforeCaret = function (a) {
          if (0 < a) {
            var c = this.getTextBeforeCaret(),
              b = this.getCaret();
            a > b && (a = b);
            this.adjustDeadkeys(-a);
            this.setTextBeforeCaret(c.kmwSubstring(0, this.getCaret() - a));
            this.setCaret(b - a);
          }
        };
        a.prototype.insertTextBeforeCaret = function (a) {
          if (a) {
            var c = this.getCaret(),
              b = this.getTextBeforeCaret(),
              d = this.getText()._kmwSubstring(this.processedSelectionStart);
            this.adjustDeadkeys(a._kmwLength());
            this.root.value = b + a + d;
            this.setCaret(c + a._kmwLength());
          }
        };
        return a;
      })(f.text.OutputTarget);
      g.Input = r;
    })(f.dom || (f.dom = {}));
  })(f.keyman || (f.keyman = {}));
})(com || (com = {}));
(function (f) {
  (function (f) {
    (function (g) {
      var r = (function (e) {
        function a(a) {
          var c = e.call(this) || this;
          c.root = a;
          c._cachedSelectionStart = -1;
          return c;
        }
        __extends(a, e);
        a.prototype.getElement = function () {
          return this.root;
        };
        a.prototype.clearSelection = function () {
          var a = this.getCaret();
          this.root.value = this.root.value._kmwSubstring(0, a) + this.root.value._kmwSubstring(this.processedSelectionEnd);
          this.setCaret(a);
        };
        a.prototype.hasSelection = function () {
          return !0;
        };
        a.prototype.invalidateSelection = function () {
          this._cachedSelectionStart = -1;
        };
        a.prototype.getCaret = function () {
          this.root.selectionStart != this._cachedSelectionStart &&
            ((this._cachedSelectionStart = this.root.selectionStart),
            (this.processedSelectionStart = this.root.value._kmwCodeUnitToCodePoint(this.root.selectionStart)),
            (this.processedSelectionEnd = this.root.value._kmwCodeUnitToCodePoint(this.root.selectionEnd)));
          return this.processedSelectionStart;
        };
        a.prototype.getDeadkeyCaret = function () {
          return this.getCaret();
        };
        a.prototype.setCaret = function (a) {
          this.setSelection(a, a);
        };
        a.prototype.setSelection = function (a, c) {
          var b = this.root.value._kmwCodePointToCodeUnit(a),
            d = this.root.value._kmwCodePointToCodeUnit(c);
          this.root.setSelectionRange(b, d);
          this.processedSelectionStart = a;
          this.processedSelectionEnd = c;
          g.Utils.forceScroll(this.root);
        };
        a.prototype.getTextBeforeCaret = function () {
          return this.getText()._kmwSubstring(0, this.getCaret());
        };
        a.prototype.setTextBeforeCaret = function (a) {
          this.getCaret();
          var c = a._kmwLength();
          this.root.value = a + this.getText()._kmwSubstring(this.processedSelectionStart);
          this.setCaret(c);
        };
        a.prototype.setTextAfterCaret = function (a) {
          var c = this.getCaret();
          this.root.value = this.getTextBeforeCaret() + a;
          this.setCaret(c);
        };
        a.prototype.getTextAfterCaret = function () {
          this.getCaret();
          return this.getText()._kmwSubstring(this.processedSelectionEnd);
        };
        a.prototype.getText = function () {
          return this.root.value;
        };
        a.prototype.deleteCharsBeforeCaret = function (a) {
          if (0 < a) {
            var c = this.getTextBeforeCaret(),
              b = this.getCaret();
            a > b && (a = b);
            this.adjustDeadkeys(-a);
            this.setTextBeforeCaret(c.kmwSubstring(0, this.getCaret() - a));
            this.setCaret(b - a);
          }
        };
        a.prototype.insertTextBeforeCaret = function (a) {
          if (a) {
            var c = this.getCaret(),
              b = this.getTextBeforeCaret(),
              d = this.getText()._kmwSubstring(this.processedSelectionStart);
            this.adjustDeadkeys(a._kmwLength());
            this.root.value = b + a + d;
            this.setCaret(c + a._kmwLength());
          }
        };
        return a;
      })(f.text.OutputTarget);
      g.TextArea = r;
    })(f.dom || (f.dom = {}));
  })(f.keyman || (f.keyman = {}));
})(com || (com = {}));
(function (f) {
  (function (f) {
    (function (g) {
      var r = (function () {
          return function (a, c) {
            this.node = a;
            this.offset = c;
          };
        })(),
        e = (function () {
          return function (a, c) {
            this.start = a;
            this.end = c;
          };
        })(),
        a = (function (a) {
          function c(b) {
            if (b.isContentEditable) {
              var c = a.call(this) || this;
              c.root = b;
            } else throw "Specified element is not already content-editable!";
            return c;
          }
          __extends(c, a);
          c.prototype.getElement = function () {
            return this.root;
          };
          c.prototype.hasSelection = function () {
            var a = this.root.ownerDocument.getSelection(),
              c = function (a, b) {
                return 3 != b.nodeType ? null : 0 != (b.compareDocumentPosition(a) & 8);
              };
            return (this.root != a.anchorNode && !this.root.contains(a.anchorNode) && !c(this.root, a.anchorNode)) || (this.root != a.focusNode && !this.root.contains(a.focusNode) && !c(this.root, a.anchorNode)) ? !1 : !0;
          };
          c.prototype.clearSelection = function () {
            if (this.hasSelection()) {
              var a = this.root.ownerDocument.getSelection();
              a.isCollapsed || a.deleteFromDocument();
            } else console.warn("Attempted to clear an unowned Selection!");
          };
          c.prototype.invalidateSelection = function () {};
          c.prototype.getCarets = function () {
            var a = this.root.ownerDocument.getSelection(),
              c = a.anchorNode.compareDocumentPosition(a.focusNode);
            if (a.isCollapsed) return (c = new r(a.anchorNode, a.anchorOffset)), new e(c, c);
            var d = new r(a.anchorNode, a.anchorOffset);
            a = new r(a.focusNode, a.focusOffset);
            d.node == a.node && (c = 0 < a.offset - d.offset ? 2 : 4);
            return c & 2 ? new e(d, a) : new e(a, d);
          };
          c.prototype.getDeadkeyCaret = function () {
            return this.getTextBeforeCaret().kmwLength();
          };
          c.prototype.getTextBeforeCaret = function () {
            if (this.hasSelection()) {
              var a = this.getCarets().start;
              return 3 != a.node.nodeType ? "" : a.node.textContent.substr(0, a.offset);
            }
          };
          c.prototype.getTextAfterCaret = function () {
            if (this.hasSelection()) {
              var a = this.getCarets().end;
              return 3 != a.node.nodeType ? "" : a.node.textContent.substr(a.offset);
            }
          };
          c.prototype.getText = function () {
            return this.root.innerText;
          };
          c.prototype.deleteCharsBeforeCaret = function (a) {
            if (this.hasSelection() && !(0 >= a)) {
              var b = this.getCarets().start;
              a > b.offset && (a = b.offset);
              if (3 != b.node.nodeType) console.warn("Deletion of characters requested without available context!");
              else {
                var c = this.root.ownerDocument.createRange(),
                  d = b.offset - b.node.nodeValue.substr(0, b.offset)._kmwSubstr(-a).length;
                c.setStart(b.node, d);
                c.setEnd(b.node, b.offset);
                this.adjustDeadkeys(-a);
                c.deleteContents();
              }
            }
          };
          c.prototype.insertTextBeforeCaret = function (a) {
            if (this.hasSelection()) {
              var b = this.getCarets().start,
                c = a._kmwLength(),
                d = this.root.ownerDocument.getSelection();
              if (0 != c) {
                this.adjustDeadkeys(c);
                c = this.root.ownerDocument.createRange();
                if (3 == b.node.nodeType) {
                  var e = b.node;
                  e.insertData(b.offset, a);
                  c.setStart(e, b.offset + a.length);
                } else {
                  e = b.node.ownerDocument.createTextNode(a);
                  var f = this.root.ownerDocument.createRange();
                  f.setStart(b.node, b.offset);
                  f.collapse(!0);
                  f.insertNode(e);
                  c.setStart(e, a.length);
                }
                c.collapse(!0);
                d.removeAllRanges();
                try {
                  d.addRange(c);
                } catch (m) {
                  b.node.parentElement.scrollIntoView(), d.addRange(c);
                }
                d.collapseToEnd();
              }
            }
          };
          c.prototype.setTextAfterCaret = function (a) {
            if (this.hasSelection()) {
              var b = this.getCarets().end,
                c = a._kmwLength();
              this.root.ownerDocument.getSelection();
              0 != c &&
                (3 == b.node.nodeType
                  ? ((c = b.node), c.replaceData(b.offset, c.length, a))
                  : ((a = b.node.ownerDocument.createTextNode(a)), (c = this.root.ownerDocument.createRange()), c.setStart(b.node, b.offset), c.collapse(!0), c.insertNode(a)));
            }
          };
          return c;
        })(f.text.OutputTarget);
      g.ContentEditable = a;
    })(f.dom || (f.dom = {}));
  })(f.keyman || (f.keyman = {}));
})(com || (com = {}));
(function (f) {
  (function (f) {
    (function (g) {
      var r = (function () {
          return function (a, b) {
            this.node = a;
            this.offset = b;
          };
        })(),
        e = (function () {
          return function (a, b) {
            this.start = a;
            this.end = b;
          };
        })(),
        a = (function () {
          return function (a, b) {
            this.cmd = a;
            this.stateType = b;
          };
        })(),
        d = (function (c) {
          function b(a) {
            var b = c.call(this) || this;
            b.root = a;
            if (a.contentWindow && a.contentWindow.document && "on" == a.contentWindow.document.designMode) (b.doc = a.contentWindow.document), (b.docRoot = a.contentWindow.document.documentElement);
            else throw "Specified IFrame is not in design-mode!";
            return b;
          }
          __extends(b, c);
          b.prototype.getElement = function () {
            return this.root;
          };
          b.prototype.hasSelection = function () {
            this.doc.getSelection();
            document.getSelection();
            return !0;
          };
          b.prototype.clearSelection = function () {
            if (this.hasSelection()) {
              var a = this.doc.getSelection();
              a.isCollapsed || a.deleteFromDocument();
            } else console.warn("Attempted to clear an unowned Selection!");
          };
          b.prototype.invalidateSelection = function () {};
          b.prototype.getCarets = function () {
            var a = this.doc.getSelection(),
              b = a.anchorNode.compareDocumentPosition(a.focusNode);
            if (a.isCollapsed) return (b = new r(a.anchorNode, a.anchorOffset)), new e(b, b);
            var c = new r(a.anchorNode, a.anchorOffset);
            a = new r(a.focusNode, a.focusOffset);
            c.node == a.node && (b = 0 < a.offset - c.offset ? 2 : 4);
            return b & 2 ? new e(c, a) : new e(a, c);
          };
          b.prototype.getDeadkeyCaret = function () {
            return this.getTextBeforeCaret().kmwLength();
          };
          b.prototype.getTextBeforeCaret = function () {
            if (this.hasSelection()) {
              var a = this.getCarets().start;
              return 3 != a.node.nodeType ? "" : a.node.textContent.substr(0, a.offset);
            }
          };
          b.prototype.getTextAfterCaret = function () {
            if (this.hasSelection()) {
              var a = this.getCarets().end;
              return 3 != a.node.nodeType ? "" : a.node.textContent.substr(a.offset);
            }
          };
          b.prototype.getText = function () {
            return this.docRoot.innerText;
          };
          b.prototype.deleteCharsBeforeCaret = function (a) {
            if (this.hasSelection() && !(0 >= a)) {
              var b = this.getCarets().start;
              a > b.offset && (a = b.offset);
              if (3 != b.node.nodeType) console.warn("Deletion of characters requested without available context!");
              else {
                var c = this.doc.createRange(),
                  d = b.offset - b.node.nodeValue.substr(0, b.offset)._kmwSubstr(-a).length;
                c.setStart(b.node, d);
                c.setEnd(b.node, b.offset);
                this.adjustDeadkeys(-a);
                c.deleteContents();
              }
            }
          };
          b.prototype.insertTextBeforeCaret = function (a) {
            if (this.hasSelection()) {
              var b = this.getCarets().start,
                c = a._kmwLength(),
                d = this.doc.getSelection();
              if (0 != c) {
                this.adjustDeadkeys(c);
                c = this.root.ownerDocument.createRange();
                if (3 == b.node.nodeType) {
                  var h = b.node;
                  h.insertData(b.offset, a);
                  c.setStart(h, b.offset + a.length);
                } else {
                  h = this.doc.createTextNode(a);
                  var e = this.doc.createRange();
                  e.setStart(b.node, b.offset);
                  e.collapse(!0);
                  e.insertNode(h);
                  c.setStart(h, a.length);
                }
                c.collapse(!0);
                d.removeAllRanges();
                try {
                  d.addRange(c);
                } catch (t) {
                  b.node.parentElement.scrollIntoView(), d.addRange(c);
                }
                d.collapseToEnd();
              }
            }
          };
          b.prototype.setTextAfterCaret = function (a) {
            if (this.hasSelection()) {
              var b = this.getCarets().end,
                c = a._kmwLength();
              this.doc.getSelection();
              0 != c &&
                (3 == b.node.nodeType
                  ? ((c = b.node), c.replaceData(b.offset, c.length, a))
                  : ((a = b.node.ownerDocument.createTextNode(a)), (c = this.root.ownerDocument.createRange()), c.setStart(b.node, b.offset), c.collapse(!0), c.insertNode(a)));
            }
          };
          b.prototype.saveProperties = function () {
            var b = [
              new a("backcolor", 1),
              new a("fontname", 1),
              new a("fontsize", 1),
              new a("forecolor", 1),
              new a("bold", 0),
              new a("italic", 0),
              new a("strikethrough", 0),
              new a("subscript", 0),
              new a("superscript", 0),
              new a("underline", 0),
            ];
            this.doc.defaultView && b.push(new a("hilitecolor", 1));
            for (var c = 0; c < b.length; c++) {
              var d = b[c];
              d.cache = 1 == d.stateType ? this.doc.queryCommandValue(d.cmd) : this.doc.queryCommandState(d.cmd);
            }
            this.commandCache = b;
          };
          b.prototype.restoreProperties = function (a) {
            this.commandCache || console.error("No command cache exists to restore!");
            for (var b = 0; b < this.commandCache.length; b++) {
              var c = this.commandCache[b];
              1 == c.stateType ? this.doc.queryCommandValue(c.cmd) != c.cache && (a && a(), this.doc.execCommand(c.cmd, !1, c.cache)) : this.doc.queryCommandState(c.cmd) != c.cache && (a && a(), this.doc.execCommand(c.cmd, !1, null));
            }
          };
          return b;
        })(f.text.OutputTarget);
      g.DesignIFrame = d;
    })(f.dom || (f.dom = {}));
  })(f.keyman || (f.keyman = {}));
})(com || (com = {}));
(function (f) {
  (function (f) {
    (function (g) {
      var r = (function (e) {
        function a(a) {
          var c = e.call(this) || this;
          c.root = a;
          return c;
        }
        __extends(a, e);
        a.prototype.getElement = function () {
          return this.root;
        };
        a.prototype.clearSelection = function () {};
        a.prototype.invalidateSelection = function () {};
        a.prototype.hasSelection = function () {
          return !0;
        };
        a.prototype.getDeadkeyCaret = function () {
          return this.root.getTextCaret();
        };
        a.prototype.getTextBeforeCaret = function () {
          return this.root.getTextBeforeCaret();
        };
        a.prototype.getTextAfterCaret = function () {
          return this.root.getTextAfterCaret();
        };
        a.prototype.getText = function () {
          return this.root.getText();
        };
        a.prototype.deleteCharsBeforeCaret = function (a) {
          if (0 < a) {
            var c = this.getTextBeforeCaret();
            this.getDeadkeyCaret() < a && (a = this.getDeadkeyCaret());
            this.adjustDeadkeys(-a);
            this.root.setTextBeforeCaret(c.kmwSubstring(0, this.root.getTextCaret() - a));
          }
        };
        a.prototype.insertTextBeforeCaret = function (a) {
          this.adjustDeadkeys(a._kmwLength());
          this.root.setTextBeforeCaret(this.root.getTextBeforeCaret() + a);
        };
        a.prototype.setTextAfterCaret = function (a) {
          this.root.setText(this.getTextBeforeCaret() + a, this.getTextBeforeCaret()._kmwLength());
        };
        return a;
      })(f.text.OutputTarget);
      g.TouchAlias = r;
    })(f.dom || (f.dom = {}));
  })(f.keyman || (f.keyman = {}));
})(com || (com = {}));
(function (f) {
  (function (f) {
    (function (f) {
      f.wrapElement = function (g) {
        return f.Utils.instanceof(g, "HTMLInputElement")
          ? new f.Input(g)
          : f.Utils.instanceof(g, "HTMLTextAreaElement")
          ? new f.TextArea(g)
          : f.Utils.instanceof(g, "TouchAliasElement")
          ? new f.TouchAlias(g)
          : f.Utils.instanceof(g, "HTMLIFrameElement") && g.contentWindow && g.contentWindow.document && "on" == g.contentWindow.document.designMode
          ? new f.DesignIFrame(g)
          : g.isContentEditable
          ? new f.ContentEditable(g)
          : null;
      };
    })(f.dom || (f.dom = {}));
  })(f.keyman || (f.keyman = {}));
})(com || (com = {}));
(function (f) {
  (function (f) {
    var g = (function () {
      function g(e) {
        this.inputList = [];
        this.sortedInputs = [];
        this.nonKMWTouchHandler = function (a) {
          f.DOMEventHandlers.states.focusing = !1;
          clearTimeout(f.DOMEventHandlers.states.focusTimer);
          this.keyman.osk.hideNow();
        }.bind(this);
        this._EnablementMutationObserverCore = function (a) {
          for (var d = 0; d < a.length; d++) {
            var c = a[d],
              b = c.oldValue ? 0 <= c.oldValue.indexOf("kmw-disabled") : !1,
              h = 0 <= c.target.className.indexOf("kmw-disabled");
            b && !h ? this._EnableControl(c.target) : !b && h && this._DisableControl(c.target);
            !h &&
              "readonly" == c.attributeName &&
              ((b = c.oldValue ? null != c.oldValue : !1), (h = c.target), h instanceof h.ownerDocument.defaultView.HTMLInputElement || h instanceof h.ownerDocument.defaultView.HTMLTextAreaElement) &&
              ((h = h.readOnly), b && !h ? this._EnableControl(c.target) : !b && h && this._DisableControl(c.target));
          }
        }.bind(this);
        this._AutoAttachObserverCore = function (a) {
          for (var d = [], c = [], b = 0; b < a.length; b++) {
            for (var h = a[b], e = 0; e < h.addedNodes.length; e++) d = d.concat(this._GetDocumentEditables(h.addedNodes[e]));
            for (e = 0; e < h.removedNodes.length; e++) c = c.concat(this._GetDocumentEditables(h.removedNodes[e]));
          }
          for (a = 0; a < d.length; a++) this.isKMWInput(d[a]) && this._MutationAdditionObserved(d[a]);
          for (a = 0; a < c.length; a++) this.isKMWInput(c[a]) && this._MutationRemovalObserved(c[a]);
          if (d.length || c.length)
            if (!this.keyman.util.device.touchable) this.listInputs();
            else if (this.keyman.util.device.touchable) {
              var f = this;
              window.setTimeout(
                function () {
                  f.listInputs();
                  for (var a = 0; a < this.sortedInputs.length; a++) this.sortedInputs[a].kmw_ip && this.sortedInputs[a].kmw_ip.updateInput();
                }.bind(this),
                1
              );
            }
        }.bind(this);
        this._MutationAdditionObserved = function (a) {
          if (a instanceof a.ownerDocument.defaultView.HTMLIFrameElement && !this.keyman.util.device.touchable) {
            var d = this;
            a.addEventListener("load", function () {
              window.setTimeout(function () {
                d.attachToControl(a);
              }, 1);
            });
          } else this.attachToControl(a);
        };
        this._MutationRemovalObserved = function (a) {
          this.keyman.util.device.touchable && this.disableTouchElement(a);
          this.disableInputElement(a);
          this.clearElementAttachment(a);
        };
        this.enableControl = function (a) {
          this.isAttached(a) || console.warn("KeymanWeb is not attached to element " + a);
          var d = a.className;
          0 <= d.indexOf("kmw-disabled") && (a.className = d.replace("kmw-disabled", "").trim());
        };
        this._WindowLoad = function (a) {
          document.body.scrollTop = 0;
          "undefined" != typeof document.documentElement && (document.documentElement.scrollTop = 0);
        }.bind(this);
        this._WindowUnload = function () {
          this.keyman.uiManager.doUnload();
          this.keyman.osk.ready && (this.keyman.osk.shutdown(), this.keyman.osk._Unload());
          this.clearLastActiveElement();
        }.bind(this);
        this.init = function (a) {
          var d,
            c = this.keyman.osk;
          var b = this.keyman.util;
          var h = b.device,
            e = function (a) {
              if (0 == a.length) return a;
              "/" != a.substr(a.length - 1, 1) && (a += "/");
              return "http" == a.replace(/^(http)s?:.*/, "$1") || "file" == a.replace(/^(file):.*/, "$1")
                ? a
                : "//" == a.substr(0, 2)
                ? this.keyman.protocol + a
                : "/" == a.substr(0, 1)
                ? this.keyman.rootPath + a.substr(1)
                : this.keyman.srcPath + a;
            }.bind(this);
          var f = this.keyman.options;
          if ("object" == typeof a && null !== a) for (d in f) a.hasOwnProperty(d) && (f[d] = a[d]);
          "" != f.root && (this.keyman.rootPath = e(f.root));
          "" == f.resources && (f.resources = this.keyman.srcPath);
          f.resources = e(f.resources);
          f.keyboards = e(f.keyboards);
          f.fonts = e(f.fonts);
          "" == f.attachType && (f.attachType = "auto");
          this.keyman.setDefaultDeviceOptions(f);
          if (this.keyman.initialized) return Promise.resolve();
          var q = this.keyman,
            z = this;
          if ("complete" !== document.readyState)
            return new Promise(function (b) {
              window.setTimeout(function () {
                z.init(a).then(function () {
                  b();
                });
              }, 50);
            });
          q.modelManager.init();
          this.keyman._MasterDocument = window.document;
          "Android" == h.OS && ((f = h.getDPI()), (h.formFactor = screen.height < 4 * f || screen.width < 4 * f ? "phone" : "tablet"));
          this.keyman.setInitialized(1);
          c.prepare();
          b.prepareWait();
          this.keyman.keyboardManager.registerDeferredStubs();
          this.initializeUI();
          this.keyman.keyboardManager.registerDeferredKeyboards();
          if (this.keyman.isEmbedded) return this.keyman.keyboardManager.setDefaultKeyboard() || console.error("No keyboard stubs exist - cannot initialize keyboard!"), Promise.resolve();
          this.keyman.appliedFont = this.keyman.baseFont = this.getBaseFont();
          h.touchable && this.keyman.handleRotationEvents();
          "manual" != this.keyman.options.attachType && this._SetupDocument(document.documentElement);
          this.listInputs();
          h.touchable &&
            (c._Box.addEventListener(
              "touchend",
              function (a) {
                a.stopPropagation();
              },
              !1
            ),
            (b = document.createElement("DIV")),
            (f = b.style),
            (f.width = "100%"),
            (f.height = screen.width / 2 + "px"),
            document.body.appendChild(b),
            "Android" == h.OS && 0 < navigator.userAgent.indexOf("Chrome")
              ? ((this.keyman.hideOskWhileScrolling = function (a) {
                  if ("undefined" != typeof c._Box && "undefined" != typeof c._Box.style) {
                    d = a.target.parentNode;
                    if (
                      "undefined" != typeof d &&
                      null != d &&
                      (0 <= d.className.indexOf("keymanweb-input") ||
                        0 <= d.className.indexOf("kmw-key-") ||
                        ("undefined" != typeof d.parentNode && ((d = d.parentNode), 0 <= d.className.indexOf("keymanweb-input") || 0 <= d.className.indexOf("kmw-key-"))))
                    )
                      return;
                    c.hideNow();
                  }
                }),
                this.keyman.util.attachDOMEvent(document.body, "touchstart", this.keyman.hideOskWhileScrolling, !1))
              : ((this.keyman.conditionallyHideOsk = function () {
                  q.hideOnRelease && !c.lgList && c.hideNow();
                  q.hideOnRelease = !1;
                }),
                (this.keyman.hideOskIfOnBody = function (a) {
                  q.touchY = a.touches[0].screenY;
                  q.hideOnRelease = !0;
                }),
                (this.keyman.cancelHideIfScrolling = function (a) {
                  a = a.touches[0].screenY;
                  var b = q.touchY;
                  if (5 < a - b || 5 > b - a) q.hideOnRelease = !1;
                }),
                this.keyman.util.attachDOMEvent(document.body, "touchstart", this.keyman.hideOskIfOnBody, !1),
                this.keyman.util.attachDOMEvent(document.body, "touchmove", this.keyman.cancelHideIfScrolling, !1),
                this.keyman.util.attachDOMEvent(document.body, "touchend", this.keyman.conditionallyHideOsk, !1)));
          this.keyman.keyboardManager.restoreCurrentKeyboard();
          MutationObserver
            ? ((h = document.querySelector("body")),
              "manual" != this.keyman.options.attachType && ((b = { childList: !0, subtree: !0 }), (this.attachmentObserver = new MutationObserver(this._AutoAttachObserverCore)), this.attachmentObserver.observe(h, b)),
              (b = { subtree: !0, attributes: !0, attributeOldValue: !0, attributeFilter: ["class", "readonly"] }),
              (this.enablementObserver = new MutationObserver(this._EnablementMutationObserverCore)),
              this.enablementObserver.observe(h, b))
            : console.warn("Your browser is outdated and does not support MutationObservers, a web feature needed by KeymanWeb to support dynamically-added elements.");
          this.keyman.util.attachDOMEvent(document.body, "focus", g.suppressFocusCheck, !0);
          this.keyman.util.attachDOMEvent(document.body, "blur", g.suppressFocusCheck, !0);
          this.keyman.setInitialized(2);
          return Promise.resolve();
        }.bind(this);
        this.keyman = e;
        e.util.device.touchable && (this.touchHandlers = new f.DOMTouchHandlers(e));
        this.nonTouchHandlers = new f.DOMEventHandlers(e);
      }
      g.prototype.shutdown = function () {
        try {
          this.enablementObserver && this.enablementObserver.disconnect();
          this.attachmentObserver && this.attachmentObserver.disconnect();
          for (var e = 0, a = this.inputList; e < a.length; e++) this.disableInputElement(a[e]);
          this.keyman.util.detachDOMEvent(document.body, "focus", g.suppressFocusCheck, !0);
          this.keyman.util.detachDOMEvent(document.body, "blur", g.suppressFocusCheck, !0);
        } catch (d) {
          console.error("Error occurred during shutdown"), console.error(d);
        }
      };
      g.prototype.getHandlers = function (e) {
        return (e = e.base ? e.base._kmwAttachment : e._kmwAttachment) ? (e.touchEnabled ? this.touchHandlers : this.nonTouchHandlers) : this.keyman.touchAliasing;
      };
      g.prototype.enableTouchElement = function (e) {
        if ("iframe" == e.tagName.toLowerCase()) return !1;
        if (this.isKMWDisabled(e)) return this.setupNonKMWTouchElement(e), !1;
        e.kmwInput = !0;
        e.removeEventListener("touchstart", this.nonKMWTouchHandler);
        if (e.kmw_ip) {
          if (-1 != this.inputList.indexOf(e.kmw_ip)) return !1;
          this.inputList.push(e.kmw_ip);
          console.log("Unexpected state - this element's simulated input DIV should have been removed from the page!");
          return !0;
        }
        var a = f.dom.constructTouchAlias(e);
        this.isAttached(a) ? (a._kmwAttachment.interface = f.dom.wrapElement(a)) : this.setupElementAttachment(a);
        e._kmwAttachment = a._kmwAttachment;
        this.enableInputElement(a, !0);
        var d = this.touchHandlers;
        a.addEventListener("touchstart", d.setFocus);
        a.onmspointerdown = function (a) {
          a.preventDefault();
          a.stopPropagation();
          return d.setFocus(a);
        };
        a.addEventListener("touchend", function (a) {
          a.stopPropagation();
        });
        a.onmspointerup = function (a) {
          a.stopPropagation();
        };
        a.addEventListener("touchmove", d.dragInput, !1);
        a.onmspointermove = d.dragInput;
        a.onblur = d.setBlur;
        return !0;
      };
      g.prototype.disableTouchElement = function (e) {
        if ("iframe" != e.tagName.toLowerCase()) {
          if (e.kmw_ip) {
            var a = this.inputList.indexOf(e.kmw_ip);
            -1 != a && this.inputList.splice(a, 1);
            e.style.visibility = "visible";
            e.disabled = !1;
            e.removeEventListener("resize", e.kmw_ip._kmwResizeHandler);
            this.disableInputElement(e.kmw_ip);
            e._kmwAttachment.interface = f.dom.wrapElement(e);
            e.parentNode && e.parentNode.removeChild(e.kmw_ip);
            delete e.kmw_ip;
          }
          this.setupNonKMWTouchElement(e);
        }
      };
      g.prototype.setupNonKMWTouchElement = function (e) {
        this.keyman.util.attachDOMEvent(e, "touchstart", this.nonKMWTouchHandler, !1);
        this.isAttached(e) && (e._kmwAttachment.touchEnabled = !1);
      };
      g.prototype.enableInputElement = function (e, a) {
        var d = a ? e.base : e;
        this.isKMWDisabled(d) ||
          (e instanceof e.ownerDocument.defaultView.HTMLIFrameElement
            ? this._AttachToIframe(e)
            : (a || this.setupElementAttachment(e),
              (d.className = d.className ? d.className + " keymanweb-font" : "keymanweb-font"),
              this.inputList.push(e),
              this.keyman.util.attachDOMEvent(d, "focus", this.getHandlers(e)._ControlFocus),
              this.keyman.util.attachDOMEvent(d, "blur", this.getHandlers(e)._ControlBlur),
              (e.onkeypress = this.getHandlers(e)._KeyPress),
              (e.onkeydown = this.getHandlers(e)._KeyDown),
              (e.onkeyup = this.getHandlers(e)._KeyUp)));
      };
      g.prototype.disableInputElement = function (e, a) {
        if (e) {
          var d = a ? e.base : e;
          if ((e.ownerDocument.defaultView && e instanceof e.ownerDocument.defaultView.HTMLIFrameElement) || e instanceof HTMLIFrameElement) this._DetachFromIframe(e);
          else {
            0 < d.className.indexOf("keymanweb-font") && !a && (d.className = d.className.replace("keymanweb-font", "").trim());
            var c = this.inputList.indexOf(e);
            -1 < c && this.inputList.splice(c, 1);
            a || (this.keyman.util.detachDOMEvent(d, "focus", this.getHandlers(e)._ControlFocus), this.keyman.util.detachDOMEvent(d, "blur", this.getHandlers(e)._ControlBlur));
            e.onkeypress = null;
            e.onkeydown = null;
            e.onkeyup = null;
          }
          a && (this.inputList.push(d), (d.onkeypress = this.getHandlers(e)._KeyPress), (d.onkeydown = this.getHandlers(e)._KeyDown), (d.onkeyup = this.getHandlers(e)._KeyUp));
          a = this.getLastActiveElement();
          if (a == e || a == e.kmw_ip) this.clearLastActiveElement(), this.keyman.osk._Hide(!1);
        }
      };
      g.prototype.isKMWDisabled = function (e) {
        var a = e.className;
        return e.readOnly || (a && 0 <= a.indexOf("kmw-disabled")) ? !0 : !1;
      };
      g.prototype.attachToControl = function (e) {
        var a = this.keyman.util.device.touchable;
        if (!this.isAttached(e) || e instanceof e.ownerDocument.defaultView.HTMLIFrameElement)
          this.isKMWInput(e) ? (this.isKMWDisabled(e) ? a && this.setupNonKMWTouchElement(e) : a && !this.keyman.isEmbedded ? this.enableTouchElement(e) : this.enableInputElement(e)) : a && this.setupNonKMWTouchElement(e);
      };
      g.prototype.detachFromControl = function (e) {
        if (this.isAttached(e) || e instanceof e.ownerDocument.defaultView.HTMLIFrameElement) this.isKMWInput(e) && (this.isKMWDisabled(e) || this._DisableControl(e)), this.clearElementAttachment(e);
      };
      g.prototype.isAttached = function (e) {
        return e._kmwAttachment ? !0 : !1;
      };
      g.prototype.isKMWInput = function (e) {
        var a = this.keyman.util.device.touchable;
        if (e instanceof e.ownerDocument.defaultView.HTMLTextAreaElement) return !0;
        if (e instanceof e.ownerDocument.defaultView.HTMLInputElement) {
          if ("text" == e.type || "search" == e.type) return !0;
        } else if (e instanceof e.ownerDocument.defaultView.HTMLIFrameElement && !a)
          try {
            if (e.contentWindow && e.contentWindow.document) return !0;
          } catch (d) {
            console.warn("Error during attachment to / detachment from iframe: "), console.warn(d);
          }
        else if (e.isContentEditable && !a) return !0;
        return !1;
      };
      g.prototype.setupElementAttachment = function (e) {
        if (!e._kmwAttachment) {
          var a = f.dom.wrapElement(e);
          a || f.dom.Utils.instanceof(e, "HTMLIFrameElement") || console.warn("Could not create processing interface for newly-attached element!");
          e._kmwAttachment = new f.AttachmentInfo(a, null, this.keyman.util.device.touchable);
        }
      };
      g.prototype.clearElementAttachment = function (e) {
        e._kmwAttachment = null;
      };
      g.prototype._AttachToIframe = function (e) {
        var a = this.keyman.util;
        try {
          var d = e.contentWindow.document;
          d &&
            ("on" == d.designMode.toLowerCase()
              ? ("firefox" == a.device.browser
                  ? (a.attachDOMEvent(d, "focus", this.getHandlers(e)._ControlFocus), a.attachDOMEvent(d, "blur", this.getHandlers(e)._ControlBlur))
                  : (a.attachDOMEvent(d.body, "focus", this.getHandlers(e)._ControlFocus), a.attachDOMEvent(d.body, "blur", this.getHandlers(e)._ControlBlur)),
                a.attachDOMEvent(d.body, "keydown", this.getHandlers(e)._KeyDown),
                a.attachDOMEvent(d.body, "keypress", this.getHandlers(e)._KeyPress),
                a.attachDOMEvent(d.body, "keyup", this.getHandlers(e)._KeyUp),
                this.setupElementAttachment(e),
                (d.body._kmwAttachment = e._kmwAttachment))
              : this._SetupDocument(d.body));
        } catch (c) {}
      };
      g.prototype._DetachFromIframe = function (e) {
        var a = this.keyman.util;
        try {
          var d = e.contentWindow.document;
          d &&
            ("on" == d.designMode.toLowerCase()
              ? ("firefox" == a.device.browser
                  ? (a.detachDOMEvent(d, "focus", this.getHandlers(e)._ControlFocus), a.detachDOMEvent(d, "blur", this.getHandlers(e)._ControlBlur))
                  : (a.detachDOMEvent(d.body, "focus", this.getHandlers(e)._ControlFocus), a.detachDOMEvent(d.body, "blur", this.getHandlers(e)._ControlBlur)),
                a.detachDOMEvent(d.body, "keydown", this.getHandlers(e)._KeyDown),
                a.detachDOMEvent(d.body, "keypress", this.getHandlers(e)._KeyPress),
                a.detachDOMEvent(d.body, "keyup", this.getHandlers(e)._KeyUp),
                (d.body._kmwAttachment = null))
              : this._ClearDocument(d.body));
        } catch (c) {}
      };
      g.prototype._GetDocumentEditables = function (e) {
        var a = this.keyman.util,
          d = [];
        if (e.ownerDocument && e instanceof e.ownerDocument.defaultView.HTMLElement) {
          var c = e.ownerDocument.defaultView;
          e instanceof c.HTMLInputElement || e instanceof c.HTMLTextAreaElement ? d.push(e) : e instanceof c.HTMLIFrameElement && d.push(e);
        }
        e.getElementsByTagName && (d = d.concat(a.arrayFromNodeList(e.getElementsByTagName("INPUT")), a.arrayFromNodeList(e.getElementsByTagName("TEXTAREA")), a.arrayFromNodeList(e.getElementsByTagName("IFRAME"))));
        e.querySelectorAll && (d = d.concat(a.arrayFromNodeList(e.querySelectorAll("[contenteditable]"))));
        e.ownerDocument && e instanceof e.ownerDocument.defaultView.HTMLElement && e.isContentEditable && d.push(e);
        return d;
      };
      g.prototype._SetupDocument = function (e) {
        e = this._GetDocumentEditables(e);
        for (var a = 0; a < e.length; a++) this.attachToControl(e[a]);
      };
      g.prototype._ClearDocument = function (e) {
        e = this._GetDocumentEditables(e);
        for (var a = 0; a < e.length; a++) this.detachFromControl(e[a]);
      };
      g.prototype._SetTargDir = function (e) {
        var a = this.keyman.keyboardManager.isRTL() ? "rtl" : "ltr";
        e &&
          (this.keyman.util.device.touchable
            ? 0 == e.textContent.length && ((e.base.dir = e.dir = a), e.setTextCaret(1e4))
            : e instanceof e.ownerDocument.defaultView.HTMLInputElement || e instanceof e.ownerDocument.defaultView.HTMLTextAreaElement
            ? 0 == e.value.length && (e.dir = a)
            : "string" == typeof e.textContent && 0 == e.textContent.length && (e.dir = a));
      };
      g.prototype._DisableControl = function (e) {
        if (this.isAttached(e) || e instanceof e.ownerDocument.defaultView.HTMLIFrameElement)
          this.keyman.util.device.touchable
            ? (this.disableTouchElement(e),
              this.setupNonKMWTouchElement(e),
              window.setTimeout(
                function () {
                  this.listInputs();
                  for (var a = 0; a < this.sortedInputs.length; a++) this.sortedInputs[a].kmw_ip && this.sortedInputs[a].kmw_ip.updateInput(this.sortedInputs[a].kmw_ip);
                }.bind(this),
                1
              ))
            : this.listInputs(),
            this.disableInputElement(e);
      };
      g.prototype._EnableControl = function (e) {
        if (this.isAttached(e))
          if (this.keyman.util.device.touchable) {
            this.enableTouchElement(e);
            var a = this.keyman;
            window.setTimeout(
              function () {
                a.domManager.listInputs();
                for (var d = 0; d < this.sortedInputs.length; d++) this.sortedInputs[d].kmw_ip && this.sortedInputs[d].kmw_ip.updateInput(this.sortedInputs[d].kmw_ip);
              }.bind(this),
              1
            );
          } else this.enableInputElement(e);
      };
      g.prototype.listInputs = function () {
        var e,
          a = [],
          d = document.getElementsByTagName("input"),
          c = document.getElementsByTagName("textarea");
        for (e = 0; e < d.length; e++)
          switch (d[e].type) {
            case "text":
            case "search":
            case "email":
            case "url":
              0 > d[e].className.indexOf("kmw-disabled") && a.push({ ip: d[e], x: f.dom.Utils.getAbsoluteX(d[e]), y: f.dom.Utils.getAbsoluteY(d[e]) });
          }
        for (e = 0; e < c.length; e++) 0 > c[e].className.indexOf("kmw-disabled") && a.push({ ip: c[e], x: f.dom.Utils.getAbsoluteX(c[e]), y: f.dom.Utils.getAbsoluteY(c[e]) });
        a.sort(function (a, c) {
          return a.y != c.y ? a.y - c.y : a.x - c.x;
        });
        d = [];
        for (e = 0; e < a.length; e++) d.push(a[e].ip);
        this.sortedInputs = d;
      };
      g.prototype.disableControl = function (e) {
        this.isAttached(e) || console.warn("KeymanWeb is not attached to element " + e);
        var a = e.className;
        0 > a.indexOf("kmw-disabled") && (e.className = a ? a + " kmw-disabled" : "kmw-disabled");
      };
      g.prototype.setKeyboardForControl = function (e, a, d) {
        null !== a && void 0 !== a ? 0 > a.indexOf("Keyboard_") && "" != a && (a = "Keyboard_" + a) : (d = null);
        if (e instanceof e.ownerDocument.defaultView.HTMLIFrameElement) console.warn("'keymanweb.setKeyboardForControl' cannot set keyboard on iframes.");
        else if (this.isAttached(e)) {
          e._kmwAttachment.keyboard = a;
          e._kmwAttachment.languageCode = d;
          var c = this.getLastActiveElement();
          !c || (c != e && c != e.kmw_ip) || (null != a && null != d ? this.keyman.keyboardManager.setActiveKeyboard(a, d) : this.keyman.keyboardManager.setActiveKeyboard(this.keyman.globalKeyboard, this.keyman.globalLanguageCode));
        } else console.error("KeymanWeb is not attached to element " + e);
      };
      g.prototype.getKeyboardForControl = function (e) {
        if (this.isAttached(e)) return e._kmwAttachment.keyboard;
        console.error("KeymanWeb is not attached to element " + e);
        return null;
      };
      g.prototype.getLanguageForControl = function (e) {
        if (this.isAttached(e)) return e._kmwAttachment.languageCode;
        console.error("KeymanWeb is not attached to element " + e);
        return null;
      };
      g.prototype.focusLastActiveElement = function () {
        var e = this.getLastActiveElement();
        e &&
          ((this.keyman.uiManager.justActivated = !0),
          e.ownerDocument && e instanceof e.ownerDocument.defaultView.HTMLIFrameElement && this.keyman.domManager._IsMozillaEditableIframe(e, 0) ? e.ownerDocument.defaultView.focus() : e.focus && e.focus());
      };
      g.prototype.getLastActiveElement = function () {
        return f.DOMEventHandlers.states.lastActiveElement;
      };
      g.prototype.clearLastActiveElement = function () {
        f.DOMEventHandlers.states.lastActiveElement = null;
      };
      g.prototype.getActiveElement = function () {
        return f.DOMEventHandlers.states.activeElement;
      };
      g.prototype._setActiveElement = function (e) {
        f.DOMEventHandlers.states.activeElement = e;
      };
      g.prototype.setActiveElement = function (e, a) {
        "string" == typeof e && (e = document.getElementById(e));
        if (this.keyman.isEmbedded) this.isAttached(e) || this.attachToControl(e);
        else if (!this.isAttached(e)) {
          console.warn("Cannot set an element KMW is not attached to as the active element.");
          return;
        }
        e = e.kmw_ip ? e.kmw_ip : e;
        this.keyman.isEmbedded || this.keyman.touchAliasing._BlurKeyboardSettings();
        f.DOMEventHandlers.states.activeElement != e && this.keyman.interface.resetContext();
        f.DOMEventHandlers.states.activeElement = f.DOMEventHandlers.states.lastActiveElement = e;
        this.keyman.isEmbedded || this.keyman.touchAliasing._FocusKeyboardSettings(!1);
        1 < arguments.length && a && (this.keyman.util.device.touchable ? this.keyman.touchAliasing.setFocusWithTouch({ clientX: 0, clientY: 0, target: e }) : this.focusLastActiveElement());
      };
      g.prototype.initActiveElement = function (e) {
        null == f.DOMEventHandlers.states.activeElement && (f.DOMEventHandlers.states.activeElement = e);
      };
      g.prototype.moveToNext = function (e) {
        var a,
          d = this.sortedInputs,
          c = this.getActiveElement(),
          b = this.keyman.util.device.touchable;
        if (0 != d.length) {
          b && (c = c.base);
          for (a = 0; a < d.length && d[a] != c; a++);
          a = e ? a - 1 : a + 1;
          a = a >= d.length ? a - d.length : a;
          a = 0 > a ? a + d.length : a;
          b ? ((f.DOMEventHandlers.states.focusing = !0), (e = d[a].kmw_ip), "undefined" == typeof e ? d[a].focus() : (this.keyman.domManager.setActiveElement(e), e.setTextCaret(1e4), e.scrollInput(), e.focus())) : d[a].focus();
        }
      };
      g.prototype.moveToElement = function (e) {
        "string" == typeof e && (e = document.getElementById(e));
        this.keyman.util.device.touchable && e.kmw_ip ? e.kmw_ip.focus() : e.focus();
      };
      g.prototype._IsIEEditableIframe = function (e, a) {
        var d,
          c = e && (d = e.tagName) && "body" == d.toLowerCase() && (d = e.ownerDocument) && d.parentWindow;
        return (!a && c) || (a && (!c || e.isContentEditable));
      };
      g.prototype._IsMozillaEditableIframe = function (e, a) {
        var d;
        e = e && (d = e.defaultView) && d.frameElement;
        return (!a && e) || (a && (!e || "on" == d.document.designMode.toLowerCase()));
      };
      g.prototype.getBaseFont = function () {
        var e = this.keyman.util,
          a = document.getElementsByTagName("input"),
          d = document.getElementsByTagName("textarea"),
          c = 0;
        if (0 == a.length && 0 == d.length) c = 0;
        else if (0 < a.length && 0 == d.length) c = 1;
        else if (0 == a.length && 0 < d.length) c = 2;
        else {
          var b = a[0],
            h = d[0];
          b.offsetTop < h.offsetTop ? (c = 1) : b.offsetTop > h.offsetTop ? (c = 2) : b.offsetLeft < h.offsetLeft ? (c = 1) : b.offsetLeft > h.offsetLeft && (c = 2);
        }
        switch (c) {
          case 0:
          case 1:
            e.getStyleValue(a[0], "font-family");
          case 2:
            var n = e.getStyleValue(d[0], "font-family");
        }
        if ("undefined" == typeof n || "monospace" == n) n = "Arial,sans-serif";
        return n;
      };
      g.prototype.initializeUI = function () {
        this.keyman.ui && this.keyman.ui.initialize instanceof Function ? (this.keyman.ui.initialize(), this.keyman.osk._Show()) : this.keyman.isEmbedded || window.setTimeout(this.initializeUI.bind(this), 1e3);
      };
      g.suppressFocusCheck = function (e) {
        f.DOMEventHandlers.states._IgnoreBlurFocus && (e.stopPropagation(), (e.cancelBubble = !0));
        return !0;
      };
      return g;
    })();
    f.DOMManager = g;
  })(f.keyman || (f.keyman = {}));
})(com || (com = {}));
(function (f) {
  (function (g) {
    var k = (function () {
        function e(a, d, c, b) {
          this.Pelem = a;
          this.Peventname = d.toLowerCase();
          this.Phandler = c;
          this.PuseCapture = b;
        }
        e.prototype.equals = function (a) {
          return this.Pelem == a.Pelem && this.Peventname == a.Peventname && this.Phandler == a.Phandler && this.PuseCapture == a.PuseCapture;
        };
        return e;
      })(),
      r = (function () {
        function e(a) {
          this.linkedStylesheets = [];
          this.events = {};
          this.currentEvents = [];
          this.domEvents = [];
          this.embeddedFonts = [];
          this._GetAbsolute = this.getAbsolute;
          this.selectStartHandler = function () {
            return !1;
          };
          this._CancelMouse = function (a) {
            (a = f.keyman.singleton._GetEventObject(a)) && a.preventDefault && a.preventDefault();
            a && ((a.cancelBubble = !0), (a.returnValue = !1));
            return !1;
          };
          this.createElement = this._CreateElement;
          this.initDevices();
          this.keyman = a;
        }
        e.prototype.getLanguageCodes = function (a) {
          return -1 == a.indexOf("-") ? [a] : a.split("-");
        };
        e.prototype.initDevices = function () {
          this.device = new g.Device();
          this.physicalDevice = new g.Device();
          this.activeDevice = this.device;
          this.device.detect();
          "desktop" == this.device.formFactor && (this.device.touchable = !1);
          this.physicalDevice = new g.Device();
          this.physicalDevice.touchable = !1;
          this.physicalDevice.browser = this.device.browser;
          this.physicalDevice.formFactor = "desktop";
          this.physicalDevice.OS = this.device.OS;
        };
        e.prototype.arrayFromNodeList = function (a) {
          for (var d = [], c = 0; c < a.length; c++) d.push(a[c]);
          return d;
        };
        e.prototype.addEventListener = function (a, d) {
          this.removeEventListener(a, d);
          this.events[a].push(d);
          return !0;
        };
        e.prototype.removeEventListener = function (a, d) {
          "undefined" == typeof this.events[a] && (this.events[a] = []);
          for (var c = 0; c < this.events[a].length; c++) if (this.events[a][c] == d) return this.events[a].splice(c, 1), !0;
          return !1;
        };
        e.prototype.callEvent = function (a, d) {
          if ("undefined" == typeof this.events[a]) return !0;
          if (-1 != this.currentEvents.indexOf(a)) return !1;
          this.currentEvents.push(a);
          for (var c = 0; c < this.events[a].length; c++) {
            var b = this.events[a][c],
              h = !1;
            try {
              h = b(d);
            } catch (n) {
              console.error(n), (h = !1);
            }
            if (!1 === h) return this.currentEvents.pop(), !1;
          }
          this.currentEvents.pop();
          return !0;
        };
        e.prototype.attachDOMEvent = function (a, d, c, b) {
          this.detachDOMEvent(a, d, c, b);
          a.addEventListener(d, c, b ? !0 : !1);
          a = new k(a, d, c, b);
          this.domEvents.push(a);
        };
        e.prototype.detachDOMEvent = function (a, d, c, b) {
          a.removeEventListener(d, c, b);
          a = new k(a, d, c, b);
          for (d = 0; d < this.domEvents.length; d++)
            if (this.domEvents[d].equals(a)) {
              this.domEvents.splice(d, 1);
              break;
            }
        };
        e.prototype.getOption = function (a, d) {
          return a in this.keyman.options ? this.keyman.options[a] : 1 < arguments.length ? d : "";
        };
        e.prototype.hasClass = function (a, d) {
          d = " " + d + " ";
          return 0 <= (" " + a.className + " ").replace(/[\n\t\r\f]/g, " ").indexOf(d);
        };
        e.prototype.setOption = function (a, d) {
          this.keyman.options[a] = d;
        };
        e.prototype.getAbsoluteX = function (a) {
          return g.dom.Utils.getAbsoluteX(a);
        };
        e.prototype.getAbsoluteY = function (a) {
          return g.dom.Utils.getAbsoluteY(a);
        };
        e.prototype.getAbsolute = function (a) {
          return { x: this.getAbsoluteX(a), y: this.getAbsoluteY(a) };
        };
        e.prototype.mouseDownPreventDefaultHandler = function (a) {
          a && a.preventDefault();
        };
        e.prototype._CreateElement = function (a) {
          a = document.createElement(a);
          "undefined" != typeof a.onselectstart ? (a.onselectstart = this.selectStartHandler) : ((a.style.MozUserSelect = "none"), (a.style.KhtmlUserSelect = "none"), (a.style.UserSelect = "none"), (a.style.WebkitUserSelect = "none"));
          return a;
        };
        e.prototype.getIEVersion = function () {
          return g.Device._GetIEVersion();
        };
        e.prototype.getFontSizeStyle = function (a) {
          var d = "string" == typeof a ? a : a.style.fontSize;
          return -1 != d.indexOf("em")
            ? ((a = parseFloat(d.substr(0, d.indexOf("em")))), { val: a, absolute: !1 })
            : -1 != d.indexOf("px")
            ? ((a = parseFloat(d.substr(0, d.indexOf("px")))), { val: a, absolute: !0 })
            : -1 != d.indexOf("pt")
            ? ((a = parseFloat(d.substr(0, d.indexOf("pt")))), { val: (4 * a) / 3, absolute: !0 })
            : -1 != d.indexOf("%")
            ? ((a = parseFloat(d.substr(0, d.indexOf("%")))), { val: a / 100, absolute: !1 })
            : isNaN((a = Number(d)))
            ? (console.error("Could not properly parse specified fontsize info: '" + d + "'."), null)
            : { val: (4 * a) / 3, absolute: !0 };
        };
        e.prototype.getStyleValue = function (a, d) {
          try {
            if (a && "undefined" != typeof window.getComputedStyle) return window.getComputedStyle(a, "").getPropertyValue(d);
          } catch (c) {}
          return "";
        };
        e.prototype.getStyleInt = function (a, d, c) {
          a = parseInt(this.getStyleValue(a, d), 10);
          return isNaN(a) ? ("number" == typeof c ? c : 0) : a;
        };
        e.prototype.isTouchDevice = function () {
          return this.device.touchable;
        };
        e.prototype.portraitView = function () {
          return !this.landscapeView();
        };
        e.prototype.landscapeView = function () {
          if ("undefined" != typeof window.orientation) var a = window.orientation;
          else "undefined" != typeof window.screen.orientation && (a = window.screen.orientation.angle);
          return void 0 !== a ? 1 == Math.abs(a / 90) : !1;
        };
        e.prototype.getViewportScale = function () {
          try {
            if (screen.width > document.documentElement.clientWidth) return 1;
            var a = screen.width;
            this.landscapeView() ? screen.width < screen.height && (a = screen.height) : screen.width > screen.height && (a = screen.height);
            return Math.round((100 * a) / window.innerWidth) / 100;
          } catch (d) {
            return 1;
          }
        };
        e.prototype.barHeight = function () {
          var a = 0;
          "phone" == this.device.formFactor && (a = screen.height / 2 - window.innerHeight - (this.landscapeView() ? this.device.dyLandscape : this.device.dyPortrait));
          return a;
        };
        e.prototype._EncodeEntities = function (a) {
          return a.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;");
        };
        e.prototype.createShim = function () {
          console.warn("The util.createShim function is deprecated, as its old functionality is no longer needed.  It and references to its previously-produced shims may be safely removed.");
        };
        e.prototype.showShim = function (a, d, c) {
          console.warn("The util.showShim function is deprecated, as its old functionality is no longer needed.  It may be safely removed.");
        };
        e.prototype.hideShim = function (a) {
          console.warn("The util.hideShim function is deprecated, as its old functionality is no longer needed.  It may be safely removed.");
        };
        e.prototype.rgba = function (a, d, c, b, h) {
          a = "transparent";
          try {
            a = "rgba(" + d + "," + c + "," + b + "," + h + ")";
          } catch (n) {
            a = "rgb(" + d + "," + c + "," + b + ")";
          }
          return a;
        };
        e.prototype.addStyleSheet = function (a) {
          var d = document.createElement("style");
          d.type = "text/css";
          d.appendChild(document.createTextNode(a));
          a = document.getElementsByTagName("HEAD");
          0 < a.length ? a[0].appendChild(d) : document.body.appendChild(d);
          this.linkedStylesheets.push(d);
          return d;
        };
        e.prototype.removeStyleSheet = function (a) {
          if (null == a || "object" != typeof a || "STYLE" != a.nodeName || "undefined" == typeof a.parentNode || null == a.parentNode) return !1;
          a.parentNode.removeChild(a);
          return !0;
        };
        e.prototype.linkStyleSheet = function (a) {
          var d = document.getElementsByTagName("head");
          if (0 < d.length) {
            var c = document.createElement("link");
            c.type = "text/css";
            c.rel = "stylesheet";
            c.href = a;
            this.linkedStylesheets.push(c);
            d[0].appendChild(c);
          }
        };
        e.prototype.addFontFaceStyleSheet = function (a) {
          if ("undefined" != typeof a && ("undefined" == typeof a.files && (a.files = a.source), "undefined" != typeof a.files)) {
            var d,
              c = "",
              b = "",
              h = "",
              e = "",
              f = [];
            for (d = 0; d < this.embeddedFonts.length; d++) if (this.embeddedFonts[d] == a.family) return;
            "string" == typeof a.files ? (f[0] = a.files) : (f = a.files);
            for (d = 0; d < f.length; d++)
              0 < f[d].toLowerCase().indexOf(".otf") && (c = f[d]),
                0 < f[d].toLowerCase().indexOf(".ttf") && (c = f[d]),
                0 < f[d].toLowerCase().indexOf(".woff") && (b = f[d]),
                0 < f[d].toLowerCase().indexOf(".eot") && (h = f[d]),
                0 < f[d].toLowerCase().indexOf(".svg") && (e = f[d]);
            "" != c && 0 > c.indexOf("/") && (c = this.keyman.options.fonts + c);
            "" != b && 0 > b.indexOf("/") && (b = this.keyman.options.fonts + b);
            "" != h && 0 > h.indexOf("/") && (h = this.keyman.options.fonts + h);
            "" != e && 0 > e.indexOf("/") && (e = this.keyman.options.fonts + e);
            d = "@font-face {\nfont-family:" + a.family + ";\nfont-style:normal;\nfont-weight:normal;\n";
            if (9 <= g.Device._GetIEVersion())
              if ("iOS" == this.device.OS)
                if ("" != c) (c = this.unCached(c)), (d = d + "src:url('" + c + "') format('truetype');");
                else return;
              else {
                h = [];
                "Android" == this.device.OS
                  ? ("" != e && h.push("url('" + e + "') format('svg')"), "" != b && h.push("url('" + b + "') format('woff')"), "" != c && h.push("url('" + c + "') format('truetype')"))
                  : ("" != b && h.push("url('" + b + "') format('woff')"), "" != c && h.push("url('" + c + "') format('truetype')"), "" != e && h.push("url('" + e + "') format('svg')"));
                if (0 == h.length) return;
                d += "src:" + h.join(",") + ";";
              }
            else if ("" != h) d = d + "src:url('" + h + "');";
            else return;
            this.addStyleSheet(d + "\n}\n");
            this.embeddedFonts.push(a.family);
          }
        };
        e.prototype.unCached = function (a) {
          return a;
        };
        e.prototype.loadCookie = function (a) {
          var d = {};
          if (0 < arguments.length) {
            var c = this.loadCookie(),
              b;
            for (b in c)
              if (b == a)
                for (var h = decodeURIComponent(c[b]).split(";"), e = 0; e < h.length; e++) {
                  var f = h[e].split("=");
                  d[f[0]] = 1 < f.length ? f[1] : "";
                }
          } else if ("undefined" != typeof document.cookie && "" != document.cookie) for (c = document.cookie.split(/;\s*/), e = 0; e < c.length; e++) (h = c[e].split("=")), 2 == h.length && (d[h[0]] = h[1]);
          return d;
        };
        e.prototype.saveCookie = function (a, d) {
          var c = "",
            b;
          for (b in d) c = c + b + "=" + d[b] + ";";
          d = new Date(new Date().valueOf() + 2592e6).toUTCString();
          document.cookie = a + "=" + encodeURIComponent(c) + "; path=/; expires=" + d;
        };
        e.prototype.toNumber = function (a, d) {
          a = parseInt(a, 10);
          return isNaN(a) ? d : a;
        };
        e.prototype.toFloat = function (a, d) {
          a = parseFloat(a);
          return isNaN(a) ? d : a;
        };
        e.prototype.nzString = function (a, d) {
          var c = "";
          1 < arguments.length && (c = d);
          return "undefined" == typeof a || null == a || 0 == a || "" == a ? c : "" + a;
        };
        e.prototype.deepCopy = function (a, d) {
          d = d || {};
          for (var c in a) "object" === typeof a[c] ? ((d[c] = a[c].constructor === Array ? [] : {}), this.deepCopy(a[c], d[c])) : (d[c] = a[c]);
          return d;
        };
        e.prototype.eventTarget = function (a) {
          return a ? (a.target ? a.target : a.srcElement ? a.srcElement : window.event ? window.event.srcElement : null) : null;
        };
        e.prototype.eventType = function (a) {
          return a && a.type ? a.type : window.event ? window.event.type : "";
        };
        e.prototype.alert = function (a, d) {
          var c = this.waiting,
            b = c.firstChild.childNodes;
          b[0].style.display = "block";
          b[1].className = "kmw-alert-text";
          b[1].innerHTML = a;
          b[2].style.display = "none";
          c.style.display = "block";
          c.dismiss = 1 < arguments.length ? d : null;
        };
        e.prototype.wait = function (a) {};
        e.prototype.prepareWait = function () {
          var a = document.createElement("DIV"),
            d = document.createElement("DIV"),
            c = document.createElement("DIV"),
            b = document.createElement("DIV"),
            h = document.createElement("DIV");
          a.className = "kmw-wait-background";
          d.className = "kmw-wait-box";
          a.dismiss = null;
          c.className = "kmw-wait-text";
          b.className = "kmw-wait-graphic";
          h.className = "kmw-alert-close";
          d.onmousedown = d.onclick = function (b) {
            "block" == h.style.display && ((a.style.display = "none"), a.dismiss && a.dismiss());
          };
          d.addEventListener("touchstart", d.onclick, !1);
          a.onmousedown = a.onclick = function (a) {
            a.preventDefault();
            a.stopPropagation();
          };
          a.addEventListener("touchstart", a.onclick, !1);
          d.appendChild(h);
          d.appendChild(c);
          d.appendChild(b);
          a.appendChild(d);
          document.body.appendChild(a);
          this.waiting = a;
        };
        e.prototype.shutdown = function () {
          this.events = {};
          for (var a = 0, d = this.domEvents; a < d.length; a++) {
            var c = d[a];
            this.detachDOMEvent(c.Pelem, c.Peventname, c.Phandler, c.PuseCapture);
          }
          this.waiting.parentNode.removeChild(this.waiting);
          a = 0;
          for (d = this.linkedStylesheets; a < d.length; a++) (c = d[a]), c.remove ? c.remove() : c.parentNode && c.parentNode.removeChild(c);
        };
        e.prototype.myPath = function (a) {
          var d,
            c = document.getElementsByTagName("script");
          for (d = 0; d < c.length; d++) {
            var b = c[d];
            if (0 <= b.src.indexOf(a)) return b.src.substr(0, b.src.lastIndexOf("/") + 1);
          }
          return "";
        };
        e.prototype.prependProtocol = function (a) {
          return /^https?:/.test(a) ? a : "//" == a.substr(0, 2) ? this.keyman.protocol + a : "/" == a.substr(0, 1) ? this.keyman.protocol + "/" + a : this.keyman.protocol + "//" + a;
        };
        e.prototype.testString = function (a) {
          var d = a.family;
          if ("sample" in a && "string" == typeof a.sample) return "BESbswy" + a.sample;
          var c = "TamilWeb TibetanWeb LatinWeb CherokeeWeb EgyptianWeb SinhalaWeb KhmerWeb ArabicWeb BurmeseWeb LaoWeb OriyaWeb GeezWeb".split(" "),
            b = "\u0bbe\u0bf5 \u0f7f\u0fd0 \u02b0\u02a4 \u13d0\u13c9 \ua723\uf7d3 \u0dd8\u0da3 \u17d6\u178e \u0639\u06b3 \u1038\u1024 \u0ec0\u0edd \u0b03\u0b06 \u1361\u132c".split(" ");
          for (a = 0; a < c.length; a++) if (d == c[a]) return "BESbswy" + b[a];
          return "BESbswy";
        };
        e.prototype.checkFont = function (a) {
          var d = a.family,
            c = document.createElement("DIV"),
            b = c.style,
            h = document.createElement("P"),
            e = document.createElement("P"),
            f = document.createElement("SPAN"),
            g = f.style,
            z = document.createElement("SPAN"),
            m = z.style;
          b.position = "absolute";
          b.top = "10px";
          b.left = "10px";
          b.visibility = "hidden";
          document.body.appendChild(c);
          c.appendChild(h);
          c.appendChild(e);
          h.appendChild(f);
          e.appendChild(z);
          f.setAttribute("style", "font-family:monospace !important");
          m.fontFamily = d + ",monospace";
          g.fontSize = m.fontSize = "24px";
          f.innerHTML = z.innerHTML = this.testString(a);
          f.offsetWidth != z.offsetWidth &&
            (f.setAttribute("style", "font-family:sans-serif !important"), (m.fontFamily = d + ",sans-serif"), f.offsetWidth != z.offsetWidth && (f.setAttribute("style", "font-family:serif !important"), (m.fontFamily = d + ",serif")));
          a = f.offsetWidth != z.offsetWidth;
          h.removeChild(f);
          e.removeChild(z);
          c.removeChild(h);
          c.removeChild(e);
          document.body.removeChild(c);
          return a;
        };
        e.prototype.checkFontDescriptor = function (a) {
          return "undefined" == typeof a || "string" != typeof a.family ? !0 : this.checkFont(a);
        };
        return e;
      })();
    g.Util = r;
  })(f.keyman || (f.keyman = {}));
})(com || (com = {}));
var Util = com.keyman.Util;
(function (f) {
  (function (g) {
    (function (k) {
      var r = (function () {
        return function () {};
      })();
      k.KeyInformation = r;
      (function () {
        return function () {};
      })();
      (function () {
        return function () {};
      })();
      (function () {
        return function () {};
      })();
      (function () {
        return function () {};
      })();
      (function () {
        return function () {};
      })();
      (function () {
        return function () {};
      })();
      var e = (function () {
          function a() {}
          a.prototype.reset = function () {
            this._cache = [];
          };
          a.prototype.get = function (a, b) {
            return "undefined" == typeof this._cache[a] || "undefined" == typeof this._cache[a][b] ? null : this._cache[a][b];
          };
          a.prototype.set = function (a, b, c) {
            "undefined" == typeof this._cache[a] && (this._cache[a] = []);
            this._cache[a][b] = c;
          };
          return a;
        })(),
        a = (function () {
          function a() {}
          a.prototype.reset = function () {
            this._cache = [];
          };
          a.prototype.get = function (a, b) {
            return "undefined" == typeof this._cache[a] || "undefined" == typeof this._cache[a][b] ? null : this._cache[a][b];
          };
          a.prototype.set = function (a, b, c) {
            "undefined" == typeof this._cache[a] && (this._cache[a] = []);
            this._cache[a][b] = c;
          };
          return a;
        })(),
        d = (function () {
          function a(a) {
            this.e = a;
            this.c = a.style.backgroundColor;
          }
          a.prototype.reset = function () {
            this.e.style.backgroundColor = this.c;
          };
          return a;
        })(),
        c = (function () {
          function b() {
            this.cachedContext = new e();
            this.cachedContextEx = new a();
            this.TSS_LAYER = 33;
            this.TSS_PLATFORM = 31;
            this._AnyIndices = [];
            this._BeepObjects = [];
            this._BeepTimeout = 0;
            this.GetLastActiveElement = this.getLastActiveElement;
            this.FocusLastActiveElement = this.focusLastActiveElement;
            this.HideHelp = this.hideHelp;
            this.ShowHelp = this.showHelp;
            this.ShowPinnedHelp = this.showPinnedHelp;
          }
          b.prototype.saveFocus = function () {
            f.keyman.singleton.isHeadless || (g.DOMEventHandlers.states._IgnoreNextSelChange = 1);
          };
          b.prototype.notifyKeyboard = function (a, b, c) {
            var d = f.keyman.singleton.keyboardManager.activeKeyboard;
            b = b instanceof k.OutputTarget ? b : k.Processor.getOutputTarget(b);
            null != d && "function" == typeof d.KNS && d.KNS(a, b, c);
          };
          b.prototype.insertText = function (a, b) {
            var c = f.keyman.singleton;
            this.resetContextCache();
            var d = this.activeTargetOutput ? this.activeTargetOutput : k.Processor.getOutputTarget();
            return null != d
              ? (c.isHeadless || (c.uiManager.setActivatingUI(!0), (g.DOMEventHandlers.states._IgnoreNextSelChange = 100), c.domManager.focusLastActiveElement(), (g.DOMEventHandlers.states._IgnoreNextSelChange = 0)),
                null != a && this.output(0, d, a),
                "undefined" !== typeof b && null !== b && this.deadkeyOutput(0, d, b),
                d.invalidateSelection(),
                !0)
              : !1;
          };
          b.prototype.registerKeyboard = function (a) {
            f.keyman.singleton.keyboardManager._registerKeyboard(a);
          };
          b.prototype.registerStub = function (a) {
            return f.keyman.singleton.keyboardManager._registerStub(a);
          };
          b.prototype.context = function (a, b, c) {
            var d = this.cachedContext.get(a, b);
            if (null !== d) return d;
            c = this.KC_(a, b, c);
            this.cachedContext.set(a, b, c);
            return c;
          };
          b.prototype.KC_ = function (a, b, c) {
            c = c.getTextBeforeCaret();
            c._kmwLength() < a && (c = Array(a - c._kmwLength() + 1).join("\ufffe") + c);
            return c._kmwSubstr(-a)._kmwSubstr(0, b);
          };
          b.prototype.nul = function (a, b) {
            return "\ufffe" === this.context(a + 1, 1, b);
          };
          b.prototype.contextMatch = function (a, b, c, d) {
            if (this.context(a, d, b) === c) return !0;
            b.deadkeys().resetMatched();
            return !1;
          };
          b.prototype._BuildExtendedContext = function (a, b, c) {
            var d = this.cachedContextEx.get(a, b);
            if (null !== d) return d;
            d = this.cachedContextEx.get(a, a);
            if (null === d) {
              var h = c.deadkeys().toSortedArray(),
                e = 0;
              for (d = { valContext: [], deadContext: [] }; d.valContext.length < a; ) {
                var n = c.getDeadkeyCaret() - e;
                0 < h.length && h[0].p > n
                  ? h.splice(0, 1)
                  : 0 < h.length && h[0].p == n
                  ? ((d.deadContext[a - d.valContext.length - 1] = h[0]), (d.valContext = [h[0].d].concat(d.valContext)), h.splice(0, 1))
                  : ((n = this.context(++e, 1, c)), (d.valContext = [n].concat(d.valContext)));
              }
              this.cachedContextEx.set(a, a, d);
            }
            c = d;
            c.valContext = c.valContext.slice(0, b);
            for (d = 0; d < c.valContext.length; d++) "\ufffe" == c[d] && (c.valContext.splice(0, 1), c.deadContext.splice(0, 1));
            0 == c.valContext.length && ((c.valContext = ["\ufffe"]), (c.deadContext = []));
            this.cachedContextEx.set(a, b, c);
            return c;
          };
          b.prototype.fullContextMatch = function (a, b, c) {
            var d = this._BuildExtendedContext(a, c.length, b);
            a = d.valContext;
            d = d.deadContext;
            for (var h = !1, e = 0; e < c.length; e++)
              if ("string" == typeof c[e]) {
                if (c[e] !== a[e]) {
                  h = !0;
                  break;
                }
              } else {
                var n = c[e];
                switch (n.t) {
                  case "d":
                    n.d !== a[e] ? (h = !0) : d[e].set();
                    break;
                  case "a":
                    var f = this.any(e, "string" == typeof a[e] ? a[e] : { t: "d", d: a[e] }, n.a);
                    n.n ? n.n && (f || "\ufffe" !== a[e]) && (h = !0) : f ? void 0 !== d[e] && d[e].set() : (h = !0);
                    break;
                  case "i":
                    n = this._Index(n.i, n.o);
                    void 0 !== n && ("string" == typeof n ? n : n.d) !== a[e] ? (h = !0) : void 0 !== d[e] && d[e].set();
                    break;
                  case "c":
                    a[n.c - 1] !== a[e] ? (h = !0) : void 0 !== d[e] && d[e].set();
                    break;
                  case "n":
                    "\ufffe" != a[e] && (h = !0);
                    break;
                  default:
                    throw Error("Unexpected object in fullContextMatch specification: " + n);
                }
              }
            h && (b.deadkeys().resetMatched(), (this._AnyIndices = []));
            return !h;
          };
          b.prototype.isKeypress = function (a) {
            var b = f.keyman.singleton;
            return b.keyboardManager.activeKeyboard.KM ? !a.LisVirtualKey : b.keyMapManager._USKeyCodeToCharCode(a) ? !0 : !1;
          };
          b.prototype.keyMatch = function (a, b, c) {
            var d = !1,
              h = 173 == a.Lcode ? 189 : a.Lcode,
              e = f.keyman.singleton.keyboardManager.getKeyboardModifierBitmask(),
              n = f.keyman.text.Codes,
              g = e & n.modifierBitmasks.ALL;
            e &= n.stateBitmasks.ALL;
            255 < a.vkCode && (h = a.vkCode);
            if (a.LisVirtualKey || 255 < h) {
              if (16384 == (b & 16384) || 255 < h) d = (d = c == h && (b & g) == a.Lmodifiers) && this.stateMatch(a, b & e);
            } else 0 == (b & 16384) && (d = h == c);
            d || this.activeTargetOutput.deadkeys().resetMatched();
            return d;
          };
          b.prototype.stateMatch = function (a, b) {
            return (b & a.Lstates) == b;
          };
          b.prototype.keyInformation = function (a) {
            var b = new r();
            b.vk = a.LisVirtualKey;
            b.code = a.Lcode;
            b.modifiers = a.Lmodifiers;
            return b;
          };
          b.prototype.deadkeyMatch = function (a, b, c) {
            return b.hasDeadkeyMatch(a, c);
          };
          b.prototype.beepReset = function () {
            this.resetContextCache();
            var a;
            for (a = this._BeepTimeout = 0; a < this._BeepObjects.length; a++) this._BeepObjects[a].reset();
            this._BeepObjects = [];
          };
          b.prototype.beep = function (a) {
            this.resetContextCache();
            if (!(a instanceof k.Mock)) {
              var b = f.keyman.singleton;
              "beepKeyboard" in b && b.beepKeyboard();
              var c = a.getElement();
              a instanceof g.dom.DesignIFrame && (c = a.docRoot);
              if (c && c.style && "undefined" != typeof c.style.backgroundColor) {
                for (a = 0; a < this._BeepObjects.length; a++) if (this._BeepObjects[a].e == c) return;
                this._BeepObjects = b._push(this._BeepObjects, new d(c));
                c.style.backgroundColor = "#000000";
                0 == this._BeepTimeout && ((this._BeepTimeout = 1), window.setTimeout(this.beepReset.bind(this), 50));
              }
            }
          };
          b.prototype._ExplodeStore = function (a) {
            if ("string" == typeof a) {
              var b = f.keyman.singleton.keyboardManager.getActiveKeyboardTag();
              if (b.stores[a]) return b.stores[a];
              for (var c = [], d = 0; d < a._kmwLength(); d++) c.push(a._kmwCharAt(d));
              return (b.stores[a] = c);
            }
            return a;
          };
          b.prototype.any = function (a, b, c) {
            if ("" == b) return !1;
            c = this._ExplodeStore(c);
            for (var d = -1, h = 0; h < c.length; h++)
              if ("string" == typeof c[h]) {
                if (c[h] == b) {
                  d = h;
                  break;
                }
              } else if (c[h].d === b.d) {
                d = h;
                break;
              }
            this._AnyIndices[a] = d;
            return 0 <= d;
          };
          b.prototype._Index = function (a, b) {
            a = this._ExplodeStore(a);
            if (this._AnyIndices[b - 1] < a.length) return a[this._AnyIndices[b - 1]];
            console.warn("Unmatched contextual index() statement detected in rule with index " + b + "!");
            return "";
          };
          b.prototype.indexOutput = function (a, b, c, d) {
            this.resetContextCache();
            b = this._Index(b, c);
            if ("" !== b)
              if ("string" == typeof b) this.output(a, d, b);
              else if (b.t)
                switch (b.t) {
                  case "b":
                    this.beep(d);
                    break;
                  case "d":
                    this.deadkeyOutput(a, d, b.d);
                    break;
                  default:
                    throw Error("Unexpected object in fullContextMatch specification: " + b);
                }
              else this.deadkeyOutput(a, d, b.d);
          };
          b.prototype.deleteContext = function (a, b) {
            if (0 < a) {
              var c = this._BuildExtendedContext(a, a, b);
              for (var d = 0, h = 0; h < c.valContext.length; h++) {
                var e = c.deadContext[h];
                e ? (b.deadkeys().remove(e), a--) : "\ufffe" == c.valContext[h] && d++;
              }
              c = c.valContext.length - d;
              a > c && (a = c);
            }
            b.deadkeys().resetMatched();
            this.output(a, b, "");
          };
          b.prototype.output = function (a, b, c) {
            this.resetContextCache();
            var d = f.keyman.singleton;
            if ("oninserttext" in d && !(b instanceof k.Mock)) d.oninserttext(a, c);
            b.saveProperties();
            b.clearSelection();
            b.deadkeys().deleteMatched();
            0 <= a && b.deleteCharsBeforeCaret(a);
            b.insertTextBeforeCaret(c);
            b.restoreProperties();
            "function" == typeof d.refreshElementContent && d.refreshElementContent(b.getElement());
            (0 <= a || c) && b.getElement() == g.DOMEventHandlers.states.activeElement && (g.DOMEventHandlers.states.changed = !0);
          };
          b.prototype.deadkeyOutput = function (a, b, c) {
            this.resetContextCache();
            0 <= a && this.output(a, b, "");
            b.insertDeadkeyBeforeCaret(c);
          };
          b.prototype.ifStore = function (a, b, c) {
            c = f.keyman.singleton;
            var d = !0;
            if (a == this.TSS_LAYER) d = c.osk.vkbd.layerId === b;
            else if (a == this.TSS_PLATFORM) {
              var h = b.split(" ");
              for (a = 0; a < h.length; a++)
                switch (((b = h[a].toLowerCase()), b)) {
                  case "touch":
                  case "hardware":
                    c.util.activeDevice.touchable != ("touch" == b) && (d = !1);
                    break;
                  case "macos":
                  case "mac":
                    b = "macosx";
                  case "macosx":
                  case "windows":
                  case "android":
                  case "ios":
                  case "linux":
                    c.util.activeDevice.OS.toLowerCase() != b && (d = !1);
                    break;
                  case "tablet":
                  case "phone":
                  case "desktop":
                    c.util.device.formFactor != b && (d = !1);
                    break;
                  case "web":
                    "native" == c.util.device.browser && (d = !1);
                    break;
                  case "native":
                  case "ie":
                  case "chrome":
                  case "firefox":
                  case "safari":
                  case "edge":
                  case "opera":
                    c.util.device.browser != b && (d = !1);
                    break;
                  default:
                    d = !1;
                }
            }
            return d;
          };
          b.prototype.setStore = function (a, b, c) {
            var d = f.keyman.singleton;
            this.resetContextCache();
            return a == this.TSS_LAYER ? (c instanceof k.Mock ? void 0 : d.osk.vkbd.showLayer(b)) : !1;
          };
          b.prototype.loadStore = function (a, b, c) {
            var d = f.keyman.singleton;
            this.resetContextCache();
            a = d.util.loadCookie("KeymanWeb_" + a + "_Option_" + b);
            return "undefined" != typeof a[b] ? decodeURIComponent(a[b]) : c;
          };
          b.prototype.saveStore = function (a, b) {
            var c = f.keyman.singleton;
            this.resetContextCache();
            var d = c.keyboardManager.activeKeyboard;
            if (!d || "undefined" == typeof d.KI || "" == d.KI) return !1;
            a = "KeymanWeb_" + d.KI + "_Option_" + a;
            b = encodeURIComponent(b);
            c.util.saveCookie(a, b);
            return !0;
          };
          b.prototype.resetContextCache = function () {
            this.cachedContext.reset();
            this.cachedContextEx.reset();
          };
          b.prototype.doInputEvent = function (a) {
            var b;
            "function" == typeof window.InputEvent && (b = new window.InputEvent("input", { bubbles: !0, cancelable: !1 }));
            a.base && a.base.kmw_ip && (a = a.base);
            a && b && a.dispatchEvent(b);
          };
          b.prototype.defaultBackspace = function (a) {
            a || (a = this.activeTargetOutput ? this.activeTargetOutput : k.Processor.getOutputTarget());
            this.output(1, a, "");
            a.getElement() && this.doInputEvent(a.getElement());
          };
          b.prototype.processKeystroke = function (a, b, c) {
            var d = f.keyman.singleton;
            if (!b) throw "No target specified for keyboard output!";
            b.invalidateSelection();
            b.deadkeys().resetMatched();
            this.resetContextCache();
            d.util.activeDevice = a;
            this.activeTargetOutput = b;
            a = d.keyboardManager.activeKeyboard.gs(b, c);
            this.activeTargetOutput = null;
            return a;
          };
          b.prototype.getLastActiveElement = function () {
            return k.Processor.getOutputTarget();
          };
          b.prototype.focusLastActiveElement = function () {
            var a = f.keyman.singleton;
            a.isHeadless || a.domManager.focusLastActiveElement();
          };
          b.prototype.hideHelp = function () {
            var a = f.keyman.singleton;
            a.isHeadless || a.osk._Hide(!0);
          };
          b.prototype.showHelp = function (a, b) {
            var c = f.keyman.singleton;
            c.isHeadless || c.osk._Show(a, b);
          };
          b.prototype.showPinnedHelp = function () {
            var a = f.keyman.singleton;
            a.isHeadless || ((a.osk.userPositioned = !0), a.osk._Show(-1, -1));
          };
          b.prototype.resetContext = function () {
            var a = f.keyman.singleton;
            !a.isHeadless && a.osk.vkbd && (a.osk.vkbd.layerId = "default");
            var b = this.activeTargetOutput ? this.activeTargetOutput : k.Processor.getOutputTarget();
            b && b.deadkeys().clear();
            this.resetContextCache();
            this.resetVKShift();
            a.modelManager && a.modelManager.invalidateContext();
            a.isHeadless || a.osk._Show();
          };
          b.prototype.setNumericLayer = function () {
            var a = f.keyman.singleton,
              b;
            if (!a.isHeadless) {
              var c = a.osk.vkbd;
              for (b = 0; b < c.layers.length; b++) "numeric" == c.layers[b].id && ((c.layerId = "numeric"), a.osk._Show());
            }
          };
          b.prototype.resetVKShift = function () {
            var a = f.keyman.singleton,
              b = f.keyman.singleton.textProcessor;
            a.isHeadless || a.uiManager.isActivating || !a.osk.vkbd || (b._UpdateVKShift && b._UpdateVKShift(null, 15, 0));
          };
          return b;
        })();
      k.KeyboardInterface = c;
    })(g.text || (g.text = {}));
  })(f.keyman || (f.keyman = {}));
})(com || (com = {}));
(function (f) {
  (function (g) {
    var k = (function () {
        function a(a, c) {
          this.id = a;
          this.language = c;
        }
        a.prototype.toString = function () {
          var a = this.id;
          this.language ? ((a = a + "@" + this.language), this.version && (a = a + "@" + this.version)) : this.version && (a = a + "@@" + this.version);
          return a;
        };
        return a;
      })(),
      r = (function () {
        return function (a, b) {
          this.family = a.family;
          this.files = a.source;
          this.path = b;
        };
      })(),
      e = (function () {
        return function (a, b) {
          this.KI = "Keyboard_" + a;
          this.KLC = b;
        };
      })();
    g.KeyboardStub = e;
    var a = (function () {
      return function () {
        this.stores = {};
      };
    })();
    g.KeyboardTag = a;
    var d = (function () {
      function c(a) {
        this.activeStub = null;
        this.keyboardStubs = [];
        this.deferredStubs = [];
        this.deferredKRS = [];
        this.deferredKR = [];
        this.dfltStub = null;
        this.keyboards = [];
        this.languageList = null;
        this.languagesPending = [];
        this.linkedScripts = [];
        this._GetKeyboardDetail = function (a) {
          var b = {};
          b.Name = a.KN;
          b.InternalName = a.KI;
          b.LanguageName = a.KL;
          b.LanguageCode = a.KLC;
          b.RegionName = a.KR;
          b.RegionCode = a.KRC;
          b.CountryName = a.KC;
          b.CountryCode = a.KCC;
          b.KeyboardID = a.KD;
          b.Font = a.KFont;
          b.OskFont = a.KOskFont;
          return b;
        };
        this.keymanweb = a;
      }
      c.prototype.getActiveKeyboardName = function () {
        return this.activeKeyboard ? this.activeKeyboard.KI : "";
      };
      c.prototype.getActiveKeyboardTag = function () {
        return this.activeKeyboard ? this.activeKeyboard._kmw : null;
      };
      c.prototype.getActiveLanguage = function (a) {
        return null == this.activeStub ? "" : a ? this.activeStub.KL : this.activeStub.KLC;
      };
      c.prototype.getDetailedKeyboards = function () {
        var a = [],
          c;
        for (c = 0; c < this.keyboardStubs.length; c++) {
          var d = this.keyboardStubs[c];
          d = this._GetKeyboardDetail(d);
          a = this.keymanweb._push(a, d);
        }
        return a;
      };
      c.prototype.registerDeferredStubs = function () {
        this.addKeyboardArray(this.deferredStubs);
        for (var a = 0; a < this.deferredKRS.length; a++) this._registerStub(this.deferredKRS[a]);
      };
      c.prototype.registerDeferredKeyboards = function () {
        for (var a = 0; a < this.deferredKR.length; a++) this._registerKeyboard(this.deferredKR[a]);
      };
      c.prototype.addStub = function (a) {
        if ("string" != typeof a.id) return !1;
        "undefined" != typeof a.language && (console.warn("The 'language' property for keyboard stubs has been deprecated.  Please use the 'languages' property instead."), (a.languages = a.language));
        if ("undefined" == typeof a.languages) return !1;
        "string" != typeof a.name && ((a.name = a.id.replace("_", " ")), (a.name = a.name.substr(0, 1).toUpperCase() + a.name.substr(1)));
        var b = a.languages,
          c = [];
        "undefined" == typeof b.length ? (c[0] = b) : (c = b);
        var d = { keyboardBaseUri: this.keymanweb.options.keyboards, fontBaseUri: this.keymanweb.options.fonts };
        for (b = 0; b < c.length; b++) this.mergeStub(a, c[b], d);
        return !0;
      };
      c.prototype.mergeStub = function (a, d, n) {
        var b = this.findStub(a.id, d.id),
          h = !1;
        null == b && ((b = new e(a.id, d.id)), this.keyboardStubs.push(b), (h = !0));
        var f = d.region,
          m = 0;
        if ("number" == typeof f) m = 1 > f || 9 < f ? 0 : f - 1;
        else if ("string" == typeof f)
          for (var g = 2 == f.length ? c.regionCodes : c.regions, v = 0; v < g.length; v++)
            if (f.toLowerCase() == g[v].toLowerCase()) {
              m = v;
              break;
            }
        b.KL = "undefined" === typeof b.KL ? d.name : b.KL;
        b.KR = "undefined" === typeof b.KR ? c.regions[m] : b.KR;
        b.KRC = "undefined" === typeof b.KRC ? c.regionCodes[m] : b.KRC;
        b.KN = "undefined" === typeof b.KN ? a.name : b.KN;
        "undefined" == typeof b.KF && ((f = /^(([\.]\/)|([\.][\.]\/)|(\/))|(:)/), (b.KF = a.filename), f.test(b.KF) || (b.KF = n.keyboardBaseUri + b.KF));
        a = n.fontBaseUri;
        "" != this.keymanweb.options.fonts
          ? ((a = this.keymanweb.options.fonts), (f = /^https?\:/), f.test(a) || (a = "//" == a.substr(0, 2) ? this.keymanweb.protocol + a : "/" == a.substr(0, 1) ? this.keymanweb.rootPath + a.substr(1) : this.keymanweb.rootPath + a))
          : (this.keymanweb.options.fonts = a);
        "undefined" != typeof d.font && (b.KFont = "undefined" === typeof b.KFont ? new r(d.font, a) : b.KFont);
        "undefined" != typeof d.oskFont && (b.KOskFont = "undefined" === typeof b.KOskFont ? new r(d.oskFont, a) : b.KOskFont);
        this.doKeyboardRegistered(b.KI, b.KL, b.KN, b.KLC, b.KP);
        !this.activeStub && h && 1 == this.keyboardStubs.length && (this.doBeforeKeyboardChange(b.KI, b.KLC), this._SetActiveKeyboard(b.KI, b.KLC, !1), this.doKeyboardChange(b.KI, b.KLC));
      };
      c.prototype.findStub = function (a, c) {
        var b;
        for (b = 0; b < this.keyboardStubs.length; b++) if (this.keyboardStubs[b].KI == "Keyboard_" + a && this.keyboardStubs[b].KLC == c) return this.keyboardStubs[b];
        return null;
      };
      c.prototype.setDefaultKeyboard = function () {
        return 0 < this.keyboardStubs.length ? (this._SetActiveKeyboard(this.keyboardStubs[0].KI, this.keyboardStubs[0].KLC), !0) : !1;
      };
      c.prototype.setActiveKeyboard = function (a, c) {
        !this.keymanweb.isEmbedded && a && 0 != a.indexOf("Keyboard_") && (a = "Keyboard_" + a);
        this.doBeforeKeyboardChange(a, c);
        var b = this._SetActiveKeyboard(a, c, !0);
        null != this.keymanweb.domManager.getLastActiveElement() && this.keymanweb.domManager.focusLastActiveElement();
        this.doKeyboardChange(a, c);
        return b;
      };
      c.prototype._SetActiveKeyboard = function (a, c, d) {
        var b,
          e,
          h = this.keymanweb.util,
          f = this.keymanweb.osk;
        if (2 > arguments.length || !c) c = "---";
        for (b = 0; b < this.keyboardStubs.length && (a != this.keyboardStubs[b].KI || (c != this.keyboardStubs[b].KLC && "---" != c)); b++);
        h.device.touchable && ("" == a || null == a || b >= this.keyboardStubs.length) && 0 != this.keyboardStubs.length && ((a = this.keyboardStubs[0].KI), (c = this.keyboardStubs[0].KLC));
        2 < arguments.length && d && this.saveCurrentKeyboard(a, c);
        if (this.activeStub && this.activeKeyboard && this.activeKeyboard.KI == a && this.activeStub.KI == a && this.activeStub.KLC == c && !this.keymanweb.mustReloadKeyboard) return Promise.resolve();
        if (this.activeKeyboard && this.activeKeyboard.KI == a)
          for (e = 0; e < this.keyboardStubs.length; e++)
            if (this.keyboardStubs[e].KI == a && this.keyboardStubs[e].KLC == c) return (this.activeStub = this.keyboardStubs[e]), f.vkbd.appendStyleSheet(), this.keymanweb.mustReloadKeyboard && f._Load(), Promise.resolve();
        this.activeStub = this.activeKeyboard = null;
        if ("" == a) return f._Hide(!1), this.keymanweb.isEmbedded || h.wait(!1), Promise.resolve();
        for (e = 0; e < this.keyboards.length; e++)
          if (this.keyboards[e].KI == a) {
            this.activeKeyboard = this.keyboards[e];
            this.keymanweb.domManager._SetTargDir(this.keymanweb.domManager.getLastActiveElement());
            for (b = 0; b < this.keyboardStubs.length; b++)
              if (this.keyboardStubs[b].KI == a && (this.keyboardStubs[b].KLC == c || "---" == c)) {
                this.activeStub = this.keyboardStubs[b];
                break;
              }
            break;
          }
        if (null == this.activeKeyboard) {
          for (e = 0; e < this.keyboardStubs.length; e++)
            if (this.keyboardStubs[e].KI == a && (this.keyboardStubs[e].KLC == c || "---" == c)) {
              if (this.isCJK(this.keyboardStubs[e]) || h.device.touchable) f._Enabled = !0;
              if (!this.keyboardStubs[e].asyncLoader) {
                f.ready && f._Hide(!1);
                var n = this.keyboardStubs[e];
                n.asyncLoader = {};
                var g = n.KN,
                  k = n.KL;
                g = g.replace(/\s*keyboard\s*/i, "");
                n.asyncLoader.callback = function (a, b) {
                  var c = a || "Sorry, the " + g + " keyboard for " + k + " is not currently available.";
                  this.keymanweb.isEmbedded ||
                    (h.wait(!1),
                    h.alert(
                      a || c,
                      function () {
                        this.keymanweb.setActiveKeyboard("");
                      }.bind(this)
                    ));
                  switch (b) {
                    case "err":
                      console.error(c);
                      break;
                    default:
                      console.warn(c);
                  }
                  0 < e && ((a = this.keyboardStubs[0]), this._SetActiveKeyboard(a.KI, a.KLC, !0));
                }.bind(this);
                n.asyncLoader.timer = window.setTimeout(n.asyncLoader.callback, 1e4);
                this.keymanweb.isEmbedded || h.wait("Installing keyboard<br/>" + g);
                var y = this;
                n.asyncLoader.promise = new Promise(function (a, b) {
                  window.setTimeout(function () {
                    y.installKeyboard(a, b, n);
                  }, 0);
                });
              }
              this.activeStub = this.keyboardStubs[e];
              return this.keyboardStubs[e].asyncLoader.promise;
            }
          this.keymanweb.domManager._SetTargDir(this.keymanweb.domManager.getLastActiveElement());
        }
        b = this.activeKeyboard;
        null !== b && String.kmwEnableSupplementaryPlane(b && ((b.KS && 1 == b.KS) || "Hieroglyphic" == b.KN));
        f._Load();
        return Promise.resolve();
      };
      c.prototype.installKeyboard = function (a, c, d) {
        var b = this.keymanweb.util,
          e = this.keymanweb.osk,
          h = b._CreateElement("script");
        h.charset = "UTF-8";
        h.type = "text/javascript";
        this.keymanweb.isEmbedded && (h.id = d.KI);
        var f = d.KF,
          n = d.KL,
          g = d.KN,
          k = this;
        h.addEventListener(
          "error",
          function () {
            null !== d.asyncLoader.timer && (window.clearTimeout(d.asyncLoader.timer), (d.asyncLoader.timer = null));
            d.asyncLoader.callback("Cannot find the " + g + " keyboard for " + n + ".", "warn");
            d.asyncLoader = null;
            c();
          },
          !1
        );
        h.addEventListener(
          "load",
          function () {
            null !== d.asyncLoader.timer && (window.clearTimeout(d.asyncLoader.timer), (d.asyncLoader.timer = null));
            var h = k.getKeyboardByID(d.KI);
            h
              ? (d == k.activeStub &&
                  (k.doBeforeKeyboardChange(h.KI, d.KLC),
                  (k.activeKeyboard = h),
                  null != k.keymanweb.domManager.getLastActiveElement() && ((k.keymanweb.uiManager.justActivated = !0), k.keymanweb.domManager._SetTargDir(k.keymanweb.domManager.getLastActiveElement())),
                  String.kmwEnableSupplementaryPlane(h && ((h.KS && 1 == h.KS) || "Hieroglyphic" == h.KN)),
                  k.saveCurrentKeyboard(h.KI, d.KLC),
                  e._Load()),
                k.keymanweb.isEmbedded || b.wait(!1),
                (d.asyncLoader = null),
                a())
              : (d.asyncLoader.callback("Error registering the " + g + " keyboard for " + n + ".", "error"), (d.asyncLoader = null), c());
          },
          !1
        );
        h.src = this.keymanweb.getKeyboardPath(f);
        try {
          document.body.appendChild(h), this.linkedScripts.push(h);
        } catch (y) {
          try {
            document.getElementsByTagName("head")[0].appendChild(h);
          } catch (P) {
            c();
          }
        }
      };
      c.prototype.saveCurrentKeyboard = function (a, c) {
        this.keymanweb.util.saveCookie("KeymanWeb_Keyboard", { current: a + ":" + c });
        this.keymanweb.isEmbedded || this.keymanweb.touchAliasing._BlurKeyboardSettings(a, c);
      };
      c.prototype.restoreCurrentKeyboard = function () {
        var a = this.keyboardStubs,
          c = a.length;
        if (!(1 > a.length)) {
          var d = this.getSavedKeyboard();
          d.split(":");
          var e = d.split(":");
          2 > e.length && (e[1] = "");
          for (d = 0; d < c && (a[d].KI != e[0] || (a[d].KLC != e[1] && "" != e[1])); d++);
          if (d < c || null == this.activeKeyboard) this._SetActiveKeyboard(e[0], e[1], !1), (this.keymanweb.globalKeyboard = e[0]), (this.keymanweb.globalLanguageCode = e[1]), this.doKeyboardChange(e[0], e[1]);
        }
      };
      c.prototype.getSavedKeyboard = function () {
        var a = this.keymanweb.util.loadCookie("KeymanWeb_Keyboard");
        if ("string" != typeof a.current) return "Keyboard_us:eng";
        var c,
          d = this.keyboardStubs;
        for (c = 0; c < d.length; c++) {
          var e = d[c].KI + ":" + d[c].KLC;
          if (e == a.current) return e;
        }
        for (c = 0; c < d.length; c++) if (((e = d[c].KI + ":" + d[c].KLC), "Keyboard_us:eng" == e)) return e;
        return 0 < d.length ? d[0].KI + ":" + d[0].KLC : "Keyboard_us:eng";
      };
      c.prototype.isCJK = function (a) {
        var b = this.activeKeyboard,
          c = "";
        0 < arguments.length && (b = a);
        b && ("undefined" != typeof b.KLC ? (c = b.KLC) : "undefined" != typeof b.LanguageCode && (c = b.LanguageCode));
        return "cmn" == c || "jpn" == c || "kor" == c;
      };
      c.prototype.isRTL = function (a) {
        a = a || this.activeKeyboard;
        return null != a && a.KRTL;
      };
      c.prototype.isChiral = function (a) {
        "string" == typeof a && (a = this.getKeyboardByID(a));
        return !!(this.getKeyboardModifierBitmask(a) & g.text.Codes.modifierBitmasks.IS_CHIRAL);
      };
      c.prototype.getKeyboardModifierBitmask = function (a) {
        var b = this.activeKeyboard;
        0 < arguments.length && "undefined" != typeof a && (b = a);
        return b ? (b.KMBM ? b.KMBM : g.text.Codes.modifierBitmasks.NON_CHIRAL) : 0;
      };
      c.prototype.getFont = function (a) {
        return (a = a || this.activeKeyboard) && a.KV ? a.KV.F : null;
      };
      c.prototype.layoutIsDesktopBased = function (a) {
        var b = f.keyman.singleton;
        return (a = a || this.activeKeyboard) && a.KVKL ? "desktop" == b.util.device.formFactor : !0;
      };
      c.prototype.getKeyboardByID = function (a) {
        var b;
        for (b = 0; b < this.keyboards.length; b++) if (a == this.keyboards[b].KI) return this.keyboards[b];
        return null;
      };
      c.prototype.isUniqueRequest = function (a, c) {
        var b;
        if (null == this.findStub(c.id, c.language)) {
          for (b = 0; b < a.length; b++) if (a[b].id == c.id && a[b].language == c.language) return !1;
          return !0;
        }
        return !1;
      };
      c.prototype.addKeyboardArray = function (a) {
        if (!this.keymanweb.initialized) for (var b = 0; b < a.length; b++) this.deferredStubs.push(a[b]);
        else if (0 != a.length) {
          var c,
            d = "",
            e = [];
          for (b = 0; b < a.length; b++) {
            if ("string" == typeof a[b] && 0 < a[b].length) {
              var f = a[b].split("@"),
                m = [""];
              "english" == f[0].toLowerCase() && (f[0] = "us");
              1 < f.length && (m = f[1].split(","));
              for (c = 0; c < m.length; c++) {
                var g = new k(f[0]);
                "" != m[c] && (g.language = m[c]);
                2 < f.length && (g.version = f[2]);
                this.isUniqueRequest(e, g) && e.push(g);
              }
            }
            if ("object" == typeof a[b] && null != a[b])
              if ("string" == typeof a[b].filename) this.addStub(a[b]) || alert("To use a custom keyboard, you must specify file name, keyboard name, language, language code and region code.");
              else if (
                (a[b].language && (console.warn("The 'language' property for keyboard stubs has been deprecated.  Please use the 'languages' property instead."), (a[b].languages = a[b].language)),
                (m = a[b].languages),
                "number" == typeof m.length)
              )
                for (c = 0; c < m.length; c++) (g = new k(a[b].id, a[b].languages[c].id)), this.isUniqueRequest(e, g) && e.push(g);
              else (g = new k(a[b].id, a[b].languages[c].id)), this.isUniqueRequest(e, g) && e.push(g);
          }
          if (0 != e.length) {
            a = "&keyboardid=";
            for (b = 0; b < e.length; b++) (a = a + d + e[b].toString()), (d = ",");
            this.keymanCloudRequest(a, !1);
          }
        }
      };
      c.prototype.registerLanguagesForKeyboard = function (a, c, d) {
        var b,
          e = 0;
        var h = "";
        if ("undefined" != typeof a)
          if (("string" == typeof c.keyboardid && (h = c.keyboardid.split(",")[d]), "number" == typeof a.length))
            if (1 == a.length || "$" == h.substr(-1, 1) || "" == h) for (h = 0; h < a.length; h++) this.registerLanguagesForKeyboard(a[h], c, d);
            else {
              for (h = 0; h < a.length; h++) {
                var f = a[h].id.toLowerCase();
                "us" == f && (f = "english");
                for (b = 0; b < a[h].languages.length; b++)
                  if (f == a[h].languages[b].name.toLowerCase()) {
                    e = h;
                    break;
                  }
              }
              this.registerLanguagesForKeyboard(a[e], c, d);
            }
          else if (((d = h.split("@")[1]), "string" == typeof d && (d = d.replace(/\$$/, "")), (e = a.languages), "undefined" != typeof e))
            if ("number" == typeof e.length) for (h = 0; h < e.length; h++) ("undefined" != typeof d && e[h].id != d) || this.mergeStub(a, e[h], c);
            else this.mergeStub(a, e, c);
      };
      c.prototype.register = function (a) {
        var b = a.options;
        a.timerid && window.clearTimeout(a.timerid);
        if ("string" == typeof a.error) (b = ""), "string" == typeof a.keyboardid && (b = a.keyboardid.substr(0, 1).toUpperCase() + a.keyboardid.substr(1)), this.serverUnavailable(b + " keyboard not found.");
        else if ("undefined" != typeof b && "undefined" != typeof b.context)
          if ("keyboard" == b.context) {
            var c = a.keyboard;
            if ("number" == typeof c.length) for (a = 0; a < c.length; a++) this.registerLanguagesForKeyboard(c[a], b, a);
            else this.registerLanguagesForKeyboard(c, b, 0);
          } else "language" == b.context && ((this.languageList = a.languages), this.languagesPending && this.addLanguageKeyboards(this.languagesPending), (this.languagesPending = []));
      };
      c.prototype.addLanguageKeyboards = function (a) {
        var b, c;
        if (null == this.languageList) {
          var d = 0 == this.languagesPending.length;
          for (b = 0; b < a.length; b++) this.languagesPending.push(a[b]);
          d && this.keymanCloudRequest("", !0);
        } else {
          var e = "";
          for (b = 0; b < a.length; b++) {
            var f = a[b].toLowerCase();
            (c = "$" == f.substr(-1, 1)) && (f = f.substr(0, f.length - 1));
            for (d = 0; d < this.languageList.length; d++)
              if (f == this.languageList[d].name.toLowerCase()) {
                "" != e && (e += ",");
                e = e + "@" + this.languageList[d].id;
                c && (e += "$");
                break;
              }
          }
          "" == e ? this.keymanweb.util.alert("No keyboards are available for " + a[0] + ". Does it have another language name?") : this.keymanCloudRequest("&keyboardid=" + e, !1);
        }
      };
      c.prototype.keymanCloudRequest = function (a, c) {
        var b = "https://api.keyman.com/cloud/4.0/",
          d = this.keymanweb.util._CreateElement("script");
        b = b + (1 < arguments.length && c ? "languages" : "keyboards") + "?jsonp=keyman.register&languageidtype=bcp47&version=" + this.keymanweb.version;
        var e = this;
        var h =
          "&timerid=" +
          window.setTimeout(function () {
            e.serverUnavailable(a);
          }, 1e4);
        d.charset = "UTF-8";
        d.src = b + a + h;
        d.type = "text/javascript";
        try {
          document.body.appendChild(d);
        } catch (m) {
          document.getElementsByTagName("head")[0].appendChild(d);
        }
      };
      c.prototype.serverUnavailable = function (a) {
        this.keymanweb.util.alert("" == a ? "Unable to connect to Keyman Cloud server!" : a);
        this.keymanweb.warned = !0;
      };
      c.prototype.removeKeyboards = function (a) {
        if (0 == arguments.length) return !1;
        var b,
          c,
          d = !0,
          e = !1,
          f = !1;
        for (b = 0; b < arguments.length; b++) {
          for (c = this.keyboardStubs.length - 1; 0 <= c; c--)
            if ("Keyboard_" + arguments[b] == this.keyboardStubs[c].KI) {
              "Keyboard_" + arguments[b] == this.getActiveKeyboardName() && (e = !0);
              f = !0;
              this.keyboardStubs.splice(c, 1);
              break;
            }
          0 > c && (d = !1);
        }
        e && (0 < this.keyboardStubs.length ? this._SetActiveKeyboard(this.keyboardStubs[0].KI, this.keyboardStubs[0].KLC, !0) : this._SetActiveKeyboard("", "", !1), (this.keymanweb.uiManager.justActivated = !0));
        f && this.doKeyboardUnregistered();
        return d;
      };
      c.prototype._registerKeyboard = function (b) {
        if (this.keymanweb.initialized)
          if (b._kmw) console.error("The keyboard _kmw property is a reserved field for engine use only; this keyboard is invalid.");
          else {
            b._kmw = new a();
            var c;
            this.keymanweb.isEmbedded && this.keymanweb.preserveID(b);
            var d = this.activeStub,
              e = this.activeStub;
            if (!(d && "KI" in d) || d.KI != b.KI)
              for (c = 0; c < this.keyboardStubs.length; c++) {
                d = this.keyboardStubs[c];
                if (b.KI == d.KI) break;
                d = null;
              }
            null == this.activeStub && null != d && (this.activeStub = d);
            for (c = 0; c < this.keyboards.length; c++) if (b.KI == this.keyboards[c].KI) return;
            this.keyboards = this.keymanweb._push(this.keyboards, b);
            this.doKeyboardLoaded(b.KI);
            this.activeStub = e;
          }
        else this.deferredKR.push(b);
      };
      c.prototype._registerStub = function (a) {
        var b;
        if (!this.keymanweb.initialized) return this.deferredKRS.push(a), null;
        null == this.dfltStub && (this.dfltStub = a);
        this.keymanweb.isEmbedded && this.keymanweb.namespaceID(a);
        "undefined" == typeof a.KLC && (a.KLC = "");
        "undefined" == typeof a.KL && (a.KL = "undefined");
        for (b = 0; b < this.keyboardStubs.length; b++) if (this.keyboardStubs[b].KI == a.KI && ("" == a.KLC || this.keyboardStubs[b].KLC == a.KLC)) return 1;
        this.keyboardStubs = this.keymanweb._push(this.keyboardStubs, a);
        this.doKeyboardRegistered(a.KI, a.KL, a.KN, a.KLC, a.KP);
        this.activeStub || this.dfltStub != a || 1 != this.keyboardStubs.length || this.setActiveKeyboard(a.KI, a.KLC);
        return null;
      };
      c.prototype.doKeyboardRegistered = function (a, c, d, e, f) {
        a = { internalName: a, language: c, keyboardName: d, languageCode: e };
        f && (a["package"] = f);
        return this.keymanweb.util.callEvent("kmw.keyboardregistered", a);
      };
      c.prototype.doKeyboardUnregistered = function () {
        return this.keymanweb.util.callEvent("kmw.keyboardregistered", {});
      };
      c.prototype.doKeyboardLoaded = function (a) {
        var b = {};
        b.keyboardName = a;
        return this.keymanweb.util.callEvent("kmw.keyboardloaded", b);
      };
      c.prototype.doBeforeKeyboardChange = function (a, c) {
        var b = {};
        b.internalName = a;
        b.languageCode = c;
        return this.keymanweb.util.callEvent("kmw.beforekeyboardchange", b);
      };
      c.prototype.doKeyboardChange = function (a, c, d) {
        return this.keymanweb.util.callEvent("kmw.keyboardchange", { internalName: a, languageCode: c, indirect: 2 < arguments.length ? d : !1 });
      };
      c.prototype.shutdown = function () {
        for (var a = 0, c = this.linkedScripts; a < c.length; a++) {
          var d = c[a];
          d.remove ? d.remove() : d.parentNode && d.parentNode.removeChild(d);
        }
      };
      c.regions = "World;Africa;Asia;Europe;South America;North America;Oceania;Central America;Middle East".split(";");
      c.regionCodes = "un af as eu sa na oc ca me".split(" ");
      return c;
    })();
    g.KeyboardManager = d;
  })(f.keyman || (f.keyman = {}));
})(com || (com = {}));
(function (f) {
  (function (f) {
    var g = (function () {
        return function () {};
      })(),
      r = (function () {
        return function () {
          this.FF = new g();
          this.Safari = new g();
          this.Opera = new g();
          this.FF.k61 = 187;
          this.FF.k59 = 186;
        };
      })(),
      e = (function () {
        return function () {
          this.se = new g();
          this.se.k220 = 192;
          this.se.k187 = 189;
          this.se.k219 = 187;
          this.se.k221 = 219;
          this.se.k186 = 221;
          this.se.k191 = 220;
          this.se.k192 = 186;
          this.se.k189 = 191;
          this.uk = new g();
          this.uk.k223 = 192;
          this.uk.k192 = 222;
          this.uk.k222 = 226;
          this.uk.k220 = 220;
        };
      })(),
      a = (function () {
        function a() {
          this.browserMap = new r();
          this.languageMap = new e();
          this._usCodeInit();
        }
        a.prototype._usCodeInit = function () {
          var a = new g(),
            b = new g();
          a.k192 = 96;
          a.k49 = 49;
          a.k50 = 50;
          a.k51 = 51;
          a.k52 = 52;
          a.k53 = 53;
          a.k54 = 54;
          a.k55 = 55;
          a.k56 = 56;
          a.k57 = 57;
          a.k48 = 48;
          a.k189 = 45;
          a.k187 = 61;
          a.k81 = 113;
          a.k87 = 119;
          a.k69 = 101;
          a.k82 = 114;
          a.k84 = 116;
          a.k89 = 121;
          a.k85 = 117;
          a.k73 = 105;
          a.k79 = 111;
          a.k80 = 112;
          a.k219 = 91;
          a.k221 = 93;
          a.k220 = 92;
          a.k65 = 97;
          a.k83 = 115;
          a.k68 = 100;
          a.k70 = 102;
          a.k71 = 103;
          a.k72 = 104;
          a.k74 = 106;
          a.k75 = 107;
          a.k76 = 108;
          a.k186 = 59;
          a.k222 = 39;
          a.k90 = 122;
          a.k88 = 120;
          a.k67 = 99;
          a.k86 = 118;
          a.k66 = 98;
          a.k78 = 110;
          a.k77 = 109;
          a.k188 = 44;
          a.k190 = 46;
          a.k191 = 47;
          b.k192 = 126;
          b.k49 = 33;
          b.k50 = 64;
          b.k51 = 35;
          b.k52 = 36;
          b.k53 = 37;
          b.k54 = 94;
          b.k55 = 38;
          b.k56 = 42;
          b.k57 = 40;
          b.k48 = 41;
          b.k189 = 95;
          b.k187 = 43;
          b.k81 = 81;
          b.k87 = 87;
          b.k69 = 69;
          b.k82 = 82;
          b.k84 = 84;
          b.k89 = 89;
          b.k85 = 85;
          b.k73 = 73;
          b.k79 = 79;
          b.k80 = 80;
          b.k219 = 123;
          b.k221 = 125;
          b.k220 = 124;
          b.k65 = 65;
          b.k83 = 83;
          b.k68 = 68;
          b.k70 = 70;
          b.k71 = 71;
          b.k72 = 72;
          b.k74 = 74;
          b.k75 = 75;
          b.k76 = 76;
          b.k186 = 58;
          b.k222 = 34;
          b.k90 = 90;
          b.k88 = 88;
          b.k67 = 67;
          b.k86 = 86;
          b.k66 = 66;
          b.k78 = 78;
          b.k77 = 77;
          b.k188 = 60;
          b.k190 = 62;
          b.k191 = 63;
          this._usCharCodes = [a, b];
        };
        a.prototype._USKeyCodeToCharCode = function (a) {
          return this._usCharCodes[a.Lmodifiers & 16 ? 1 : 0]["k" + a.Lcode];
        };
        return a;
      })();
    f.KeyMapManager = a;
  })(f.keyman || (f.keyman = {}));
})(com || (com = {}));
(function (f) {
  (function (f) {
    var g = (function () {
        function e(a, d, c) {
          this.code = a;
          this.shift = d;
          this.handler = c;
        }
        e.prototype.matches = function (a, d) {
          return this.code == a && this.shift == d;
        };
        return e;
      })(),
      r = (function () {
        function e(a) {
          this.hotkeys = [];
          this._Process = function (a) {
            a || (a = window.event);
            var c = this.keyman.textProcessor._GetEventKeyCode(a);
            if (null == c) return !1;
            for (var b = (a.shiftKey ? 16 : 0) | (a.ctrlKey ? 32 : 0) | (a.altKey ? 64 : 0), d = 0; d < this.hotkeys.length; d++)
              if (this.hotkeys[d].matches(c, b)) return this.hotkeys[d].handler(), (a.returnValue = !1), a && a.preventDefault && a.preventDefault(), (a.cancelBubble = !0), !1;
            return !0;
          }.bind(this);
          this.keyman = a;
        }
        e.prototype.addHotKey = function (a, d, c) {
          for (var b = 0; b < this.hotkeys.length; b++)
            if (this.hotkeys[b].code == a && this.hotkeys[b].shift == d) {
              this.hotkeys[b].handler = c;
              return;
            }
          this.hotkeys.push(new g(a, d, c));
        };
        e.prototype.removeHotkey = function (a, d) {
          for (var c = 0; c < this.hotkeys.length; c++)
            if (this.hotkeys[c].matches(a, d)) {
              this.hotkeys.splice(c, 1);
              break;
            }
        };
        return e;
      })();
    f.HotkeyManager = r;
  })(f.keyman || (f.keyman = {}));
})(com || (com = {}));
(function (f) {
  (function (f) {
    var g = (function () {
      return function (e, a) {
        this.activationPending = e;
        this.activated = a;
      };
    })();
    f.UIState = g;
    var r = (function () {
      function e(a) {
        this.justActivated = this.isActivating = !1;
        this.doUnload = function () {
          return this.keyman.util.callEvent("kmw.unloaduserinterface", {});
        };
        this.keyman = a;
      }
      e.prototype.getUIState = function () {
        return new g(this.isActivating, this.justActivated);
      };
      e.prototype.setActivatingUI = function (a) {
        this.isActivating = a ? !0 : !1;
      };
      e.prototype.doLoad = function () {
        return this.keyman.util.callEvent("kmw.loaduserinterface", {});
      };
      return e;
    })();
    f.UIManager = r;
  })(f.keyman || (f.keyman = {}));
})(com || (com = {}));
(function (f) {
  (function (g) {
    (function (k) {
      var r = f.keyman.text.Codes,
        e = (function () {
          function a() {}
          a.buildDefaultLayout = function (d, c, b, e) {
            var h = f.keyman.singleton.util,
              w = e;
            "object" != typeof a.dfltLayout[w] && (w = "desktop");
            w = h.deepCopy(a.dfltLayout[w]);
            var q,
              z = w.layer,
              m = d.KLS,
              t = d.K102,
              v,
              E = 0 != (b & r.modifierBitmasks.IS_CHIRAL);
            (b = !("undefined" == typeof m || !m)) || (m = d.KLS = a.processLegacyDefinitions(d.BK));
            d = Object.getOwnPropertyNames(m);
            var y = [];
            d.splice(d.indexOf("default"), 1);
            d = ["default"].concat(d);
            a.emulatesAltGr(m) &&
              (-1 == d.indexOf("leftctrl-leftalt") && -1 != d.indexOf("rightalt") && (d.push("leftctrl-leftalt"), (m["leftctrl-leftalt"] = m.rightalt)),
              -1 == d.indexOf("leftctrl-leftalt-shift") && -1 != d.indexOf("rightalt-shift") && (d.push("leftctrl-leftalt-shift"), (m["leftctrl-leftalt-shift"] = m["rightalt-shift"])));
            if ("desktop" == e) for (y = a.generateLayerIds(E), q = 0; q < y.length; q++) -1 != d.indexOf(y[q]) && y.splice(q--, 1);
            var P = d.concat(y);
            if (b && "desktop" != e) {
              b = null;
              y = z[0].row;
              for (q = 0; q < y.length; q++) {
                var N = y[q].key;
                for (var p = 0; p < N.length; p++) {
                  var G = N[p];
                  "K_SHIFT" == G.id && (b = G);
                }
              }
              if (b) for (v in ((b.sk = []), m)) "default" != v && "shift" != v && ((q = a.modifierSpecials[v]), b.sk.push(new k.OSKKeySpec("K_" + q, q, null, "1", v)));
              else console.warn("Error in default layout - cannot find default Shift key!");
            }
            for (q = 0; q < P.length; q++) 0 < q && (z[q] = h.deepCopy(z[0])), (z[q].id = P[q]), (z[q].nextlayer = P[q]), a.formatDefaultLayer(z[q], E, e, !!t);
            for (q = 0; q < z.length; q++) {
              t = z[q];
              p = P = E = b = null;
              var Da = m[t.id],
                Ga = "shift" == t.id ? 1 : 0,
                ja = "default" == t.id || Ga ? 1 : 0;
              y = t.row;
              for (h = 0; h < y.length; h++)
                for (N = y[h].key, v = 0; v < N.length; v++) {
                  G = N[v];
                  var Q = a.dfltCodes.indexOf(G.id);
                  if (Da || ja)
                    Da && 0 <= Q && Q < Da.length && (G.text = Da[Q]),
                      ja && c.precedes(g.utils.Version.NO_DEFAULT_KEYCAPS) && "K_SPACE" != G.id && Q + 65 * Ga < a.dfltText.length && null !== G.text && (G.text = G.text || a.dfltText[Q + 65 * Ga]);
                  null !== G.text && (G.text = G.text || "");
                  switch (G.id) {
                    case "K_SHIFT":
                      b = G;
                      break;
                    case "K_CAPS":
                      E = G;
                      break;
                    case "K_NUMLOCK":
                      P = G;
                      break;
                    case "K_SCROLL":
                      p = G;
                  }
                  if (null != G.sk) {
                    for (Q = 0; Q < G.sk.length; Q++) -1 == d.indexOf(G.sk[Q].nextlayer) && G.sk.splice(Q--, 1);
                    0 == G.sk.length && (G.sk = null);
                  }
                }
              t.shiftKey = b;
              t.capsKey = E;
              t.numKey = P;
              t.scrollKey = p;
              "desktop" != e && 0 < q && null != b && ((b.sp = a.buttonClasses["SHIFT-ON"]), (b.sk = null), (b.text = a.modifierSpecials[z[q].id] ? a.modifierSpecials[z[q].id] : "*Shift*"));
            }
            return w;
          };
          a.getLayerId = function (a) {
            var c = r.modifierCodes,
              b = "";
            if (0 == a) return "default";
            a & c.LCTRL && (b = (0 < b.length ? b + "-" : "") + "leftctrl");
            a & c.RCTRL && (b = (0 < b.length ? b + "-" : "") + "rightctrl");
            a & c.LALT && (b = (0 < b.length ? b + "-" : "") + "leftalt");
            a & c.RALT && (b = (0 < b.length ? b + "-" : "") + "rightalt");
            a & c.SHIFT && (b = (0 < b.length ? b + "-" : "") + "shift");
            a & c.CTRL && (b = (0 < b.length ? b + "-" : "") + "ctrl");
            a & c.ALT && (b = (0 < b.length ? b + "-" : "") + "alt");
            return b;
          };
          a.emulatesAltGr = function (d) {
            var c = window.keyman,
              b = r.modifierCodes;
            if (!c.keyboardManager.isChiral()) return !1;
            if (!d) {
              d = c.keyboardManager.activeKeyboard;
              if (null == d || null == d.KV) return !1;
              d = d.KV.KLS;
            }
            var e = b.LCTRL | b.LALT,
              f = d[a.getLayerId(e)];
            e = d[a.getLayerId(b.SHIFT | e)];
            return (null != f && f != d[a.getLayerId(b.RALT)]) || (null != e && e != d[a.getLayerId(b.RALT | b.SHIFT)]) ? !1 : (c.keyboardManager.getKeyboardModifierBitmask(), !0);
          };
          a.generateLayerIds = function (d) {
            if (d) {
              d = 32;
              var c = 1;
            } else (d = 8), (c = 16);
            for (var b = [], e = 0; e < d; e++) b.push(a.getLayerId(e * c));
            return b;
          };
          a.formatDefaultLayer = function (d, c, b, e) {
            for (var h = d.id, f = a.buttonClasses, g = 0; g < d.row.length; g++)
              for (var k = d.row[g].key, m = 0; m < k.length; m++) {
                var t = k[m];
                switch (t.id) {
                  case "K_SHIFT":
                  case "K_LSHIFT":
                  case "K_RSHIFT":
                    -1 != h.indexOf("shift") && (t.sp = f["SHIFT-ON"]);
                    "desktop" != b && "default" != h && (t.nextlayer = "default");
                    break;
                  case "K_LCTRL":
                  case "K_LCONTROL":
                    if (c) {
                      -1 != h.indexOf("leftctrl") && (t.sp = f["SHIFT-ON"]);
                      break;
                    }
                  case "K_RCTRL":
                  case "K_RCONTROL":
                    if (c) {
                      -1 != h.indexOf("rightctrl") && (t.sp = f["SHIFT-ON"]);
                      break;
                    }
                  case "K_CONTROL":
                    -1 == h.indexOf("ctrl") || (c && (-1 == h.indexOf("leftctrl") || -1 == h.indexOf("rightctrl"))) || (t.sp = f["SHIFT-ON"]);
                    break;
                  case "K_LALT":
                    if (c) {
                      -1 != h.indexOf("leftalt") && (t.sp = f["SHIFT-ON"]);
                      break;
                    }
                  case "K_RALT":
                    if (c) {
                      -1 != h.indexOf("rightalt") && (t.sp = f["SHIFT-ON"]);
                      break;
                    }
                  case "K_ALT":
                    -1 == h.indexOf("alt") || (c && (-1 == h.indexOf("leftalt") || -1 == h.indexOf("rightalt"))) || (t.sp = f["SHIFT-ON"]);
                    break;
                  case "K_oE2":
                    ("undefined" != typeof e && e) || ("desktop" == b ? (k.splice(m--, 1), (k[0].width = "200")) : (k[m].sp = f.HIDDEN));
                }
              }
          };
          a.processLegacyDefinitions = function (d) {
            for (var c = a.generateLayerIds(!1), b = {}, e = 0; e < c.length; e++) {
              for (var f = c[e], g = [], q = !1, k = 0; 65 > k; k++) {
                var m = k + 65 * e;
                g.push(d[m]);
                m < d.length && "" != d[m] && k != a.dfltCodes.indexOf("K_SPACE") && (q = !0);
              }
              q && (b[f] = g);
            }
            ("undefined" != typeof b["default"] && b["default"]) || (b["default"] = [""]);
            ("undefined" != typeof b.shift && b.shift) || (b.shift = [""]);
            return b;
          };
          a.dfltCodes = "K_BKQUOTE K_1 K_2 K_3 K_4 K_5 K_6 K_7 K_8 K_9 K_0 K_HYPHEN K_EQUAL K_* K_* K_* K_Q K_W K_E K_R K_T K_Y K_U K_I K_O K_P K_LBRKT K_RBRKT K_BKSLASH K_* K_* K_* K_A K_S K_D K_F K_G K_H K_J K_K K_L K_COLON K_QUOTE K_* K_* K_* K_* K_* K_oE2 K_Z K_X K_C K_V K_B K_N K_M K_COMMA K_PERIOD K_SLASH K_* K_* K_* K_* K_* K_SPACE".split(
            " "
          );
          a.dfltText = "`1234567890-=\u00a7~~qwertyuiop[]\\~~~asdfghjkl;'~~~~~?zxcvbnm,./~~~~~ ~!@#$%^&*()_+\u00a7~~QWERTYUIOP{}\\~~~ASDFGHJKL:\"~~~~~?ZXCVBNM<>?~~~~~ ";
          a.buttonClasses = { DEFAULT: "0", SHIFT: "1", "SHIFT-ON": "2", SPECIAL: "3", "SPECIAL-ON": "4", DEADKEY: "8", BLANK: "9", HIDDEN: "10" };
          a.modifierSpecials = {
            leftalt: "*LAlt*",
            rightalt: "*RAlt*",
            alt: "*Alt*",
            leftctrl: "*LCtrl*",
            rightctrl: "*RCtrl*",
            ctrl: "*Ctrl*",
            "ctrl-alt": "*AltGr*",
            "leftctrl-leftalt": "*LAltCtrl*",
            "rightctrl-rightalt": "*RAltCtrl*",
            "leftctrl-leftalt-shift": "*LAltCtrlShift*",
            "rightctrl-rightalt-shift": "*RAltCtrlShift*",
            shift: "*Shift*",
            "shift-alt": "*AltShift*",
            "shift-ctrl": "*CtrlShift*",
            "shift-ctrl-alt": "*AltCtrlShift*",
            "leftalt-shift": "*LAltShift*",
            "rightalt-shift": "*RAltShift*",
            "leftctrl-shift": "*LCtrlShift*",
            "rightctrl-shift": "*RCtrlShift*",
          };
          a._BaseLayout = "us";
          a._BaseLayoutEuro = { se: "\u00a71234567890+\u00b4~~~QWERTYUIOP\u00c5\u00a8'~~~ASDFGHJKL\u00d6\u00c4~~~~~<ZXCVBNM,.-~~~~~ ", uk: "`1234567890-=~~~QWERTYUIOP[]#~~~ASDFGHJKL;'~~~~~\\ZXCVBNM,./~~~~~ " };
          a.dfltLayout = {
            desktop: {
              font: "Tahoma,Helvetica",
              layer: [
                {
                  id: "default",
                  row: [
                    {
                      id: "1",
                      key: [
                        { id: "K_BKQUOTE" },
                        { id: "K_1" },
                        { id: "K_2" },
                        { id: "K_3" },
                        { id: "K_4" },
                        { id: "K_5" },
                        { id: "K_6" },
                        { id: "K_7" },
                        { id: "K_8" },
                        { id: "K_9" },
                        { id: "K_0" },
                        { id: "K_HYPHEN" },
                        { id: "K_EQUAL" },
                        { id: "K_BKSP", text: "*BkSp*", sp: "1", width: "130" },
                      ],
                    },
                    {
                      id: "2",
                      key: [
                        { id: "K_TAB", text: "*Tab*", sp: "1", width: "130" },
                        { id: "K_Q" },
                        { id: "K_W" },
                        { id: "K_E" },
                        { id: "K_R" },
                        { id: "K_T" },
                        { id: "K_Y" },
                        { id: "K_U" },
                        { id: "K_I" },
                        { id: "K_O" },
                        { id: "K_P" },
                        { id: "K_LBRKT" },
                        { id: "K_RBRKT" },
                        { id: "K_BKSLASH" },
                      ],
                    },
                    {
                      id: "3",
                      key: [
                        { id: "K_CAPS", text: "*Caps*", sp: "1", width: "165" },
                        { id: "K_A" },
                        { id: "K_S" },
                        { id: "K_D" },
                        { id: "K_F" },
                        { id: "K_G" },
                        { id: "K_H" },
                        { id: "K_J" },
                        { id: "K_K" },
                        { id: "K_L" },
                        { id: "K_COLON" },
                        { id: "K_QUOTE" },
                        { id: "K_ENTER", text: "*Enter*", sp: "1", width: "165" },
                      ],
                    },
                    {
                      id: "4",
                      key: [
                        { id: "K_SHIFT", text: "*Shift*", sp: "1", width: "130" },
                        { id: "K_oE2" },
                        { id: "K_Z" },
                        { id: "K_X" },
                        { id: "K_C" },
                        { id: "K_V" },
                        { id: "K_B" },
                        { id: "K_N" },
                        { id: "K_M" },
                        { id: "K_COMMA" },
                        { id: "K_PERIOD" },
                        { id: "K_SLASH" },
                        { id: "K_RSHIFT", text: "*Shift*", sp: "1", width: "130" },
                      ],
                    },
                    {
                      id: "5",
                      key: [
                        { id: "K_LCONTROL", text: "*Ctrl*", sp: "1", width: "170" },
                        { id: "K_LALT", text: "*Alt*", sp: "1", width: "160" },
                        { id: "K_SPACE", text: "", width: "770" },
                        { id: "K_RALT", text: "*Alt*", sp: "1", width: "160" },
                        { id: "K_RCONTROL", text: "*Ctrl*", sp: "1", width: "170" },
                      ],
                    },
                  ],
                },
              ],
            },
            tablet: {
              font: "Tahoma,Helvetica",
              layer: [
                {
                  id: "default",
                  row: [
                    {
                      id: "0",
                      key: [
                        { id: "K_1" },
                        { id: "K_2" },
                        { id: "K_3" },
                        { id: "K_4" },
                        { id: "K_5" },
                        { id: "K_6" },
                        { id: "K_7" },
                        { id: "K_8" },
                        { id: "K_9" },
                        { id: "K_0" },
                        { id: "K_HYPHEN" },
                        { id: "K_EQUAL" },
                        { sp: "10", width: "1" },
                      ],
                    },
                    {
                      id: "1",
                      key: [
                        { id: "K_Q", pad: "25" },
                        { id: "K_W" },
                        { id: "K_E" },
                        { id: "K_R" },
                        { id: "K_T" },
                        { id: "K_Y" },
                        { id: "K_U" },
                        { id: "K_I" },
                        { id: "K_O" },
                        { id: "K_P" },
                        { id: "K_LBRKT" },
                        { id: "K_RBRKT" },
                        { sp: "10", width: "1" },
                      ],
                    },
                    {
                      id: "2",
                      key: [
                        { id: "K_A", pad: "50" },
                        { id: "K_S" },
                        { id: "K_D" },
                        { id: "K_F" },
                        { id: "K_G" },
                        { id: "K_H" },
                        { id: "K_J" },
                        { id: "K_K" },
                        { id: "K_L" },
                        { id: "K_COLON" },
                        { id: "K_QUOTE" },
                        { id: "K_BKSLASH", width: "90" },
                      ],
                    },
                    {
                      id: "3",
                      key: [
                        { id: "K_oE2", width: "90" },
                        { id: "K_Z" },
                        { id: "K_X" },
                        { id: "K_C" },
                        { id: "K_V" },
                        { id: "K_B" },
                        { id: "K_N" },
                        { id: "K_M" },
                        { id: "K_COMMA" },
                        { id: "K_PERIOD" },
                        { id: "K_SLASH" },
                        { id: "K_BKQUOTE" },
                        { sp: "10", width: "1" },
                      ],
                    },
                    {
                      id: "4",
                      key: [
                        {
                          id: "K_SHIFT",
                          text: "*Shift*",
                          sp: "1",
                          width: "200",
                          sk: [
                            { id: "K_LCONTROL", text: "*Ctrl*", sp: "1", width: "50", nextlayer: "ctrl" },
                            { id: "K_LCONTROL", text: "*LCtrl*", sp: "1", width: "50", nextlayer: "leftctrl" },
                            { id: "K_RCONTROL", text: "*RCtrl*", sp: "1", width: "50", nextlayer: "rightctrl" },
                            { id: "K_LALT", text: "*Alt*", sp: "1", width: "50", nextlayer: "alt" },
                            { id: "K_LALT", text: "*LAlt*", sp: "1", width: "50", nextlayer: "leftalt" },
                            { id: "K_RALT", text: "*RAlt*", sp: "1", width: "50", nextlayer: "rightalt" },
                            { id: "K_ALTGR", text: "*AltGr*", sp: "1", width: "50", nextlayer: "ctrl-alt" },
                          ],
                        },
                        { id: "K_LOPT", text: "*Menu*", sp: "1", width: "150" },
                        { id: "K_SPACE", text: "", width: "570" },
                        { id: "K_BKSP", text: "*BkSp*", sp: "1", width: "150" },
                        { id: "K_ENTER", text: "*Enter*", sp: "1", width: "200" },
                      ],
                    },
                  ],
                },
              ],
            },
            phone: {
              font: "Tahoma,Helvetica",
              layer: [
                {
                  id: "default",
                  row: [
                    {
                      id: "0",
                      key: [
                        { id: "K_1" },
                        { id: "K_2" },
                        { id: "K_3" },
                        { id: "K_4" },
                        { id: "K_5" },
                        { id: "K_6" },
                        { id: "K_7" },
                        { id: "K_8" },
                        { id: "K_9" },
                        { id: "K_0" },
                        { id: "K_HYPHEN" },
                        { id: "K_EQUAL" },
                        { sp: "10", width: "1" },
                      ],
                    },
                    {
                      id: "1",
                      key: [
                        { id: "K_Q", pad: "25" },
                        { id: "K_W" },
                        { id: "K_E" },
                        { id: "K_R" },
                        { id: "K_T" },
                        { id: "K_Y" },
                        { id: "K_U" },
                        { id: "K_I" },
                        { id: "K_O" },
                        { id: "K_P" },
                        { id: "K_LBRKT" },
                        { id: "K_RBRKT" },
                        { sp: "10", width: "1" },
                      ],
                    },
                    {
                      id: "2",
                      key: [
                        { id: "K_A", pad: "50" },
                        { id: "K_S" },
                        { id: "K_D" },
                        { id: "K_F" },
                        { id: "K_G" },
                        { id: "K_H" },
                        { id: "K_J" },
                        { id: "K_K" },
                        { id: "K_L" },
                        { id: "K_COLON" },
                        { id: "K_QUOTE" },
                        { id: "K_BKSLASH", width: "90" },
                      ],
                    },
                    {
                      id: "3",
                      key: [
                        { id: "K_oE2", width: "90" },
                        { id: "K_Z" },
                        { id: "K_X" },
                        { id: "K_C" },
                        { id: "K_V" },
                        { id: "K_B" },
                        { id: "K_N" },
                        { id: "K_M" },
                        { id: "K_COMMA" },
                        { id: "K_PERIOD" },
                        { id: "K_SLASH" },
                        { id: "K_BKQUOTE" },
                        { sp: "10", width: "1" },
                      ],
                    },
                    {
                      id: "4",
                      key: [
                        {
                          id: "K_SHIFT",
                          text: "*Shift*",
                          sp: "1",
                          width: "200",
                          sk: [
                            { id: "K_LCONTROL", text: "*Ctrl*", sp: "1", width: "50", nextlayer: "ctrl" },
                            { id: "K_LCONTROL", text: "*LCtrl*", sp: "1", width: "50", nextlayer: "leftctrl" },
                            { id: "K_RCONTROL", text: "*RCtrl*", sp: "1", width: "50", nextlayer: "rightctrl" },
                            { id: "K_LALT", text: "*Alt*", sp: "1", width: "50", nextlayer: "alt" },
                            { id: "K_LALT", text: "*LAlt*", sp: "1", width: "50", nextlayer: "leftalt" },
                            { id: "K_RALT", text: "*RAlt*", sp: "1", width: "50", nextlayer: "rightalt" },
                            { id: "K_ALTGR", text: "*AltGr*", sp: "1", width: "50", nextlayer: "ctrl-alt" },
                          ],
                        },
                        { id: "K_LOPT", text: "*Menu*", width: "150", sp: "1" },
                        { id: "K_SPACE", width: "570", text: "" },
                        { id: "K_BKSP", text: "*BkSp*", width: "150", sp: "1" },
                        { id: "K_ENTER", text: "*Enter*", width: "200", sp: "1" },
                      ],
                    },
                  ],
                },
              ],
            },
          };
          return a;
        })();
      k.Layouts = e;
    })(g.osk || (g.osk = {}));
  })(f.keyman || (f.keyman = {}));
})(com || (com = {}));
(function (f) {
  (function (g) {
    (function (k) {
      var r = (function () {
        function e(a) {
          this.keyman = a;
          this.scrolling = !1;
          this.shim = this.constructShim();
        }
        e.prototype.constructShim = function () {
          var a = this,
            d = this.keyman.util._CreateElement("div"),
            c = this.keyman.osk;
          d.id = "kmw-language-menu-background";
          d.addEventListener(
            "touchstart",
            function (b) {
              b.preventDefault();
              a.hide();
              if (2 < b.touches.length) {
                var d = b.touches[1].pageX;
                b = b.touches[1].pageY;
                var e = c.vkbd.spaceBar;
                d > e.offsetLeft && d < e.offsetLeft + e.offsetWidth && b > e.offsetTop && b < e.offsetTop + e.offsetHeight && c.showBuild();
              }
            },
            !1
          );
          return d;
        };
        e.prototype.show = function () {
          var a = this.keyman.keyboardManager.keyboardStubs,
            d = this.keyman.util;
          if (!(1 > a.length)) {
            var c = (this.lgList = d._CreateElement("div"));
            this.lgList.id = "kmw-language-menu";
            var b = this;
            document.body.appendChild(this.shim);
            var e = d._CreateElement("div"),
              f = e.style,
              g = d._CreateElement("div");
            e.id = "kmw-menu-scroll-container";
            g.id = "kmw-menu-scroller";
            "WebkitOverflowScrolling" in f && (f.WebkitOverflowScrolling = "touch");
            e.appendChild(g);
            c.appendChild(e);
            var q;
            f = d._CreateElement("div");
            f.id = "kmw-menu-index";
            for (q = 1; 26 >= q; q++) {
              var k = d._CreateElement("p");
              k.innerHTML = String.fromCharCode(q + 64);
              f.appendChild(k);
            }
            f.addEventListener(
              "touchstart",
              function (a) {
                b.scrollToLanguage(a, e, g);
              },
              !1
            );
            f.addEventListener(
              "touchend",
              function (a) {
                a.stopPropagation();
                a.preventDefault();
              },
              !1
            );
            c.appendChild(f);
            c.addEventListener(
              "scroll",
              function (a) {
                b.scrolling = !0;
              },
              !1
            );
            e.addEventListener(
              "scroll",
              function (a) {
                1 > e.scrollTop && (e.scrollTop = 1);
                e.scrollTop > e.scrollHeight - e.offsetHeight - 1 && (e.scrollTop = e.scrollHeight - e.offsetHeight - 1);
              },
              !1
            );
            this.activeLgNo = this.addLanguages(g, a);
            this.lgList.style.visibility = "hidden";
            document.body.appendChild(this.lgList);
            "Android" == d.device.OS && "devicePixelRatio" in window && (this.lgList.style.fontSize = 2 / window.devicePixelRatio + "em");
            "Android" == d.device.OS &&
              "tablet" == d.device.formFactor &&
              "devicePixelRatio" in window &&
              ((q = parseInt(d.getStyleValue(c, "width"), 10)),
              (a = c.style),
              isNaN(q) || (a.width = a.maxWidth = (2 * q) / window.devicePixelRatio + "px"),
              (q = parseInt(d.getStyleValue(e, "width"), 10)),
              (a = e.style),
              isNaN(q) || (a.width = a.maxWidth = (2 * q) / window.devicePixelRatio + "px"),
              (q = parseInt(d.getStyleValue(g, "width"), 10)),
              (a = g.style),
              isNaN(q) || (a.width = a.maxWidth = (2 * q) / window.devicePixelRatio + "px"));
            this.adjust(0);
            d = Math.floor(c.offsetHeight / 26);
            a = Math.round((100 * d) / (f.childNodes[1].offsetTop - f.childNodes[0].offsetTop)) / 100;
            k = 0.6 < a ? 1 : 2;
            1.25 < a && (a = 1.25);
            for (q = 0; 26 > q; q++) {
              var m = f.childNodes[q].style;
              2 == k && 1 == q % 2 ? (m.display = "none") : ((m.fontSize = a * k + "em"), (m.lineHeight = d * k + "px"));
            }
            q = e.offsetWidth;
            e.scrollHeight > e.offsetHeight + 3 ? (q += f.offsetWidth) : (f.style.display = "none");
            c.style.width = q + "px";
            this.lgList.style.visibility = "";
            c = g.firstChild.offsetHeight * this.activeLgNo + 1;
            e.scrollTop = c;
            e.scrollTop < c && (e.scrollTop = e.scrollHeight - e.offsetHeight);
            e.scrollTop > e.scrollHeight - e.offsetHeight - 1 && (e.scrollTop = e.scrollHeight - e.offsetHeight - 1);
          }
        };
        e.prototype.adjust = function (a) {
          var d = this.keyman.osk,
            c = this.keyman.util,
            b = c.device,
            e = this.lgList,
            f = e.firstChild,
            k = f.firstChild,
            q = e.style;
          e = e.childNodes[1];
          var z = window.innerHeight - d.vkbd.lgKey.offsetHeight - 16;
          a = (k.childNodes.length + a - 1) * k.firstChild.firstChild.offsetHeight;
          "iOS" == b.OS && ("phone" == b.formFactor ? ((b = c.landscapeView() ? 36 : 0), (z = (window.innerHeight - b - 16) * c.getViewportScale())) : "tablet" == b.formFactor && ((b = c.landscapeView() ? 16 : 0), (z -= b)));
          q.left = g.dom.Utils.getAbsoluteX(d.vkbd.lgKey) + "px";
          a > z && (a = z);
          q.height = a + "px";
          q.bottom = "0px";
          e.style.height = f.style.height = q.height;
        };
        e.prototype.scrollToLanguage = function (a, d, c) {
          a.stopImmediatePropagation();
          a.stopPropagation();
          a.preventDefault();
          var b = a.touches[0].target;
          if ("P" == b.nodeName) {
            var e;
            a = 0;
            b = b.innerHTML.charCodeAt(0);
            var f = c.childNodes;
            try {
              for (e = 0; e < f.length - 1; e++) {
                var g = f[e].firstChild.innerHTML.toUpperCase().charCodeAt(0);
                if (g >= b) break;
              }
            } catch (q) {}
            try {
              (a = c.firstChild.offsetHeight * e + 1), (d.scrollTop = a);
            } catch (q) {
              a = 0;
            }
            try {
              d.scrollTop < a && (d.scrollTop = d.scrollHeight - d.offsetHeight), d.scrollTop > d.scrollHeight - d.offsetHeight - 1 && (d.scrollTop = d.scrollHeight - d.offsetHeight - 1);
            } catch (q) {}
          }
        };
        e.prototype.addLanguages = function (a, d) {
          var c = d.length,
            b = this.keyman.util,
            e = b.device,
            f,
            g,
            q = [];
          for (g = 0; g < c; g++) {
            var k = d[g].KL;
            -1 == q.indexOf(k) && q.push(k);
          }
          q.sort();
          var m = Math.round(100 / b.getViewportScale()) / 100,
            t,
            v,
            E,
            y,
            r = -1;
          k = function () {
            t = b._CreateElement("div");
            t.className = "kbd-list-closed";
            v = b._CreateElement("p");
            v.kList = [];
            for (g = 0; g < c; g++) d[g].KL == q[f] && v.kList.push(d[g]);
            "iOS" == e.OS && (v.style.fontSize = m + "em");
            t.appendChild(v);
            a.appendChild(t);
            q[f] == N.keyman.keyboardManager.activeStub.KL && (r = f);
            var h = N;
            if (1 < v.kList.length)
              for (
                v.className = "kbd-list",
                  v.innerHTML = q[f] + "...",
                  v.scrolled = !1,
                  v.ontouchend = function (a) {
                    a.preventDefault();
                    a.stopPropagation();
                    a.target.scrolled ? (a.target.scrolled = !1) : (this.parentNode.className = "kbd-list-closed" == this.parentNode.className ? "kbd-list-open" : "kbd-list-closed");
                    h.adjust("kbd-list-closed" == this.parentNode.className ? 0 : this.kList.length);
                  },
                  v.addEventListener(
                    "touchstart",
                    function (a) {
                      a.stopPropagation();
                    },
                    !1
                  ),
                  v.addEventListener(
                    "touchmove",
                    function (a) {
                      a.target.scrolled = !0;
                      a.stopPropagation();
                    },
                    !1
                  ),
                  E = 0;
                E < v.kList.length;
                E++
              )
                (y = b._CreateElement("p")), (y.className = "kbd-list-entry"), "iOS" == e.OS && (y.style.fontSize = m + "em"), N.addKeyboard(v.kList[E], y, !1), t.appendChild(y);
            else (v.innerHTML = q[f]), (v.className = "kbd-single-entry"), N.addKeyboard(v.kList[0], v, !0);
            f == r && (v.className += " current");
          };
          var N = this;
          for (f = 0; f < q.length; f++) k();
          k = b._CreateElement("div");
          k.id = "kmw-menu-footer";
          var p = function (a) {
            a.preventDefault();
            a.stopPropagation();
          };
          k.addEventListener("touchstart", p, !1);
          k.addEventListener("touchmove", p, !1);
          k.addEventListener("touchend", p, !1);
          a.appendChild(k);
          return r;
        };
        e.prototype.addKeyboard = function (a, d, c) {
          d.kn = a.KI;
          d.kc = a.KLC;
          d.innerHTML = c ? a.KL : a.KN.replace(" Keyboard", "");
          var b = this;
          a = function (a) {
            a.stopPropagation();
            0 >= this.className.indexOf("selected") && (this.className += " selected");
            b.scrolling = !1;
            b.y0 = a.touches[0].pageY;
            return !0;
          };
          c = function (a) {
            a.stopImmediatePropagation();
            var c = b.lgList.childNodes[0],
              d = c.scrollHeight - c.offsetHeight;
            if ("undefined" != typeof a.pageY) var e = a.pageY;
            else if ("undefined" != typeof a.touches) e = a.touches[0].pageY;
            else return;
            var h = e - b.y0;
            if (0 > h) c.scrollTop >= d - 1 && (a.preventDefault(), (b.y0 = e));
            else if (0 < h) 2 > c.scrollTop && (a.preventDefault(), (b.y0 = e));
            else return;
            if (-5 > h || 5 < h) (b.scrolling = !0), (this.className = this.className.replace(/\s*selected/, "")), (b.y0 = e);
            return !0;
          };
          var e = function (a) {
            a.preventDefault();
            "undefined" != typeof a.stopImmediatePropagation ? a.stopImmediatePropagation() : a.stopPropagation();
            b.scrolling
              ? (this.className = this.className.replace(/\s*selected/, ""))
              : (f.keyman.DOMEventHandlers.states.setFocusTimer(),
                (b.lgList.style.display = "none"),
                b.keyman.keyboardManager._SetActiveKeyboard(this.kn, this.kc, !0),
                b.keyman.keyboardManager.doKeyboardChange(this.kn, this.kc),
                b.keyman.domManager.focusLastActiveElement(),
                b.hide(),
                b.keyman.osk._Show());
            return !0;
          };
          d.onmspointerdown = a;
          d.addEventListener("touchstart", a, !1);
          d.onmspointermove = c;
          d.addEventListener("touchmove", c, !1);
          d.onmspointerout = e;
          d.addEventListener("touchend", e, !1);
        };
        e.prototype.hide = function () {
          var a = this.keyman.osk,
            d = this;
          this.lgList &&
            (a.vkbd.highlightKey(a.vkbd.lgKey, !1),
            (this.lgList.style.visibility = "hidden"),
            window.setTimeout(function () {
              d.shim.parentElement && (document.body.removeChild(d.shim), document.body.removeChild(d.lgList));
            }, 500));
        };
        return e;
      })();
      k.LanguageMenu = r;
    })(g.osk || (g.osk = {}));
  })(f.keyman || (f.keyman = {}));
})(com || (com = {}));
(function (f) {
  (function (f) {
    (function (f) {
      var g = (function () {
        function a() {}
        a.polyfill = function (b, c) {
          var d = new a(),
            e;
          for (e in d) b.hasOwnProperty(e) || (b[e] = d[e]);
          b.displayLayer = c;
          b.layer = b.layer || c;
        };
        a.DEFAULT_PAD = 15;
        a.DEFAULT_RIGHT_MARGIN = 15;
        a.DEFAULT_KEY_WIDTH = 100;
        a.DEFAULT_KEY = { text: "", width: a.DEFAULT_KEY_WIDTH.toString(), sp: "0", pad: a.DEFAULT_PAD.toString() };
        return a;
      })();
      f.ActiveKey = g;
      var e = (function () {
          function a() {}
          a.polyfill = function (b, c, d, e) {
            for (var h = b.key, f = 0; f < h.length; f++) {
              var m = h[f];
              for (v in g.DEFAULT_KEY) "string" != typeof m[v] && (m[v] = g.DEFAULT_KEY[v]);
              switch (m.sp) {
                case "1":
                  a.SPECIAL_LABEL.test(m.text) || "" == m.text || (m.sp = "3");
                  break;
                case "2":
                  a.SPECIAL_LABEL.test(m.text) || "" == m.text || (m.sp = "4");
              }
              g.polyfill(m, c);
            }
            var n = 0;
            for (f = 0; f < h.length - 1; f++) {
              c = parseInt(h[f].width, 10) / d;
              h[f].widthpc = c;
              var v = parseInt(h[f].pad, 10) / d;
              h[f].padpc = v;
              h[f].proportionalX = n + v + c / 2;
              h[f].proportionalWidth = c;
              n += v + c;
            }
            var k = g.DEFAULT_RIGHT_MARGIN / d;
            n += k;
            1 == h.length && 0 > parseInt(h[0].pad, 10)
              ? ((c = parseInt(h[0].width, 10) / d), (h[0].widthpc = c), (n += c), (h[0].padpc = 1 - n), (h[0].proportionalX = n - k - c / 2), (h[0].proportionalWidth = c))
              : 0 < h.length && ((f = h.length - 1), (v = parseInt(h[f].pad, 10) / d), (h[f].padpc = v), (h[f].widthpc = c = 1 - (n + v)), (h[f].proportionalX = 1 - k - c / 2), (h[f].proportionalWidth = c));
            d = new a();
            for (m in d) b.hasOwnProperty(m) || (b[m] = d[m]);
            b.proportionalY = e;
          };
          a.prototype.populateKeyMap = function (a) {
            this.key.forEach(function (b) {
              b.id && (a[b.id] = b);
            });
          };
          a.SPECIAL_LABEL = /\*\w+\*/;
          return a;
        })(),
        a = (function () {
          function a() {}
          a.polyfill = function (b, c) {
            b.aligned = !1;
            for (var d = b.row, h = 0, f = 0; f < b.row.length; f++) {
              for (var k = 0, m = d[f].key, t = 0; t < m.length; t++) {
                var v = m[t];
                if (null == v) --m.length;
                else {
                  var E = "string" == typeof v.width && "" != v.width ? parseInt(v.width, 10) : g.DEFAULT_KEY_WIDTH;
                  if (isNaN(E) || 0 == E) E = g.DEFAULT_KEY_WIDTH;
                  v.width = E.toString();
                  var y = "string" == typeof v.pad && "" != v.pad ? parseInt(v.pad, 10) : g.DEFAULT_PAD;
                  if (isNaN(y) || 0 == y) y = g.DEFAULT_PAD;
                  v.pad = y.toString();
                  k += E + y;
                }
              }
              k > h && (h = k);
            }
            h = "desktop" == c ? h + 5 : h + g.DEFAULT_RIGHT_MARGIN;
            c = b.row.length;
            for (f = 0; f < c; f++) e.polyfill(b.row[f], b.id, h, (f + 0.5) / c);
            f = new a();
            for (v in f) b.hasOwnProperty(v) || (b[v] = f[v]);
            b.totalWidth = h;
            b.defaultKeyProportionalWidth = parseInt(g.DEFAULT_KEY.width, 10) / h;
            b.rowProportionalHeight = 1 / c;
            b.keyMap = b.constructKeyMap();
          };
          a.prototype.constructKeyMap = function () {
            var a = {};
            this.row.forEach(function (b) {
              b.populateKeyMap(a);
            });
            return a;
          };
          a.prototype.getTouchProbabilities = function (a, c) {
            a = this.simpleTouchDistribution(a, c);
            c = [];
            for (var b in a) c.push({ keyId: b, p: a[b] });
            return c.sort(function (a, b) {
              return b.p - a.p;
            });
          };
          a.prototype.simpleTouchDistribution = function (a, c) {
            a = this.keyTouchDistances(a, c);
            c = {};
            var b = 0,
              d;
            for (d in a) b += c[d] = 1 / (a[d] + 1e-6);
            for (d in c) c[d] /= b;
            return c;
          };
          a.prototype.keyTouchDistances = function (a, c) {
            var b = this,
              d = {};
            this.row.forEach(function (e) {
              e.key.forEach(function (h) {
                if (h.id) {
                  var f = Math.abs(a.x - h.proportionalX),
                    g = Math.abs(a.y - e.proportionalY);
                  if (f > 0.5 * h.proportionalWidth) {
                    var n = f - 0.5 * h.proportionalWidth;
                    f = 0.5;
                  } else (n = 0), (f /= h.proportionalWidth);
                  if (g > 0.5 * b.rowProportionalHeight) {
                    var k = g - 0.5 * b.rowProportionalHeight;
                    g = 0.5;
                  } else (k = 0), (g /= b.rowProportionalHeight);
                  n *= c;
                  n += f * b.rowProportionalHeight;
                  k += g * b.rowProportionalHeight;
                  d[h.id] = n * n + k * k;
                }
              });
            });
            return d;
          };
          a.prototype.getKey = function (a) {
            0 == a.indexOf(this.id + "-") && (a = a.replace(this.id + "-", ""));
            return this.keyMap[a];
          };
          return a;
        })();
      f.ActiveLayer = a;
      var d = (function () {
        function c() {}
        c.prototype.getLayer = function (a) {
          return this.layerMap[a];
        };
        c.polyfill = function (b, d) {
          if (null == b) throw Error("Cannot build an ActiveLayout for a null specification.");
          var e,
            h = {};
          var f = b.layer;
          for (e = 0; e < f.length; e++) {
            var g = f[e];
            var m = g.row;
            for (g = m.length; 0 < g && !(0 < m[g - 1].key.length); g--);
            g < m.length && m.splice(g - m.length, m.length - g);
          }
          for (e = 0; e < f.length; e++) a.polyfill(f[e], d), (h[f[e].id] = f[e]);
          d = new c();
          for (var t in d) b.hasOwnProperty(t) || (b[t] = d[t]);
          b.layerMap = h;
          return b;
        };
        return c;
      })();
      f.ActiveLayout = d;
    })(f.osk || (f.osk = {}));
  })(f.keyman || (f.keyman = {}));
})(com || (com = {}));
(function (f) {
  (function (g) {
    (function (k) {
      function r(a, b) {
        for (var c in b) a.hasOwnProperty(c) || (a[c] = b[c]);
        return a;
      }
      function e(a) {
        return a && "key" in a && a.key instanceof h;
      }
      function a(a) {
        return e(a) ? a : null;
      }
      var d = f.keyman.text.Codes,
        c = (function () {
          return function (a, b) {
            this.key = a;
            this.keyId = b;
          };
        })();
      k.isKey = e;
      k.getKeyFrom = a;
      var b = (function () {
        return function (a, b, c, d, e, h) {
          this.id = a;
          this.text = b;
          this.width = c ? c : "50";
          this.sp = d;
          this.nextlayer = e;
          this.pad = h;
        };
      })();
      k.OSKKeySpec = b;
      var h = (function () {
        function a(a, b, c) {
          this.spec = a;
          this.layer = b;
          this.formFactor = c;
        }
        a.getTextWidth = function (b, c, d) {
          d.fontFamily || (d.fontFamily = getComputedStyle(document.body).fontFamily);
          (d.fontSize && "" != d.fontSize) || (d.fontSize = "1em");
          var e = d.fontFamily;
          b = b.getKeyEmFontSize();
          d = window.keyman.util.getFontSizeStyle(d.fontSize);
          d = d.absolute ? d.val + "px" : d.val * b + "px";
          b = (a.getTextWidth.canvas || (a.getTextWidth.canvas = document.createElement("canvas"))).getContext("2d");
          b.font = d + " " + e;
          return b.measureText(c).width;
        };
        a.prototype.getKeyWidth = function () {
          var a = this.objectUnits();
          if ("px" == a) return this.spec.widthpc;
          if ("%" == a) return (a = f.keyman.singleton.osk.getWidthFromCookie()), Math.floor((a * this.spec.widthpc) / 100);
        };
        a.prototype.objectUnits = function () {
          return "desktop" == this.formFactor ? "%" : "px";
        };
        a.prototype.renameSpecialKey = function (a) {
          return q.specialCharacters[a] ? String.fromCharCode(57344 + q.specialCharacters[a]) : a;
        };
        a.prototype.generateKeyText = function (b) {
          var c = window.keyman.util,
            d = this.spec,
            e = c._CreateElement("span"),
            h = e.style;
          if (null == d.text || "" == d.text) {
            var f = "\u00a0";
            "string" == typeof d.id && /^U_[0-9A-F]{4}$/i.test(d.id) && (f = String.fromCharCode(parseInt(d.id.substr(2), 16)));
          } else f = d.text;
          e.className = "kmw-key-text";
          if ("1" == d.sp || "2" == d.sp) f = this.renameSpecialKey("*Tab*" == d.text && "shift" == this.layer ? "*TabLeft*" : d.text);
          h.fontSize = b.fontSize;
          "string" == typeof d.font && "" != d.font && (h.fontFamily = d.font);
          "string" == typeof d.fontsize && "" != d.fontsize && (h.fontSize = d.fontsize);
          var g = window.keyman.keyboardManager,
            m = { fontSize: h.fontSize };
          m.fontFamily = h.fontFamily ? h.fontFamily : b.fontFamily;
          d = a.getTextWidth(b, f, m);
          0 == d && "" != f && "\u00a0" != f && ((f = "\u25cc" + f), g.isRTL() && (f = "\u200f" + f), (d = a.getTextWidth(b, f, m)));
          b = c.getFontSizeStyle(h.fontSize);
          c = (0.9 * this.getKeyWidth()) / d;
          1 > c && (h.fontSize = b.absolute ? c * b.val + "px" : c * b.val + "em");
          e.innerHTML = f;
          return e;
        };
        return a;
      })();
      k.OSKKey = h;
      var n = (function (a) {
        function b(b, c, d) {
          return a.call(this, b, c, d) || this;
        }
        __extends(b, a);
        b.prototype.getId = function (a) {
          return this.layer + "-" + this.spec.id;
        };
        b.prototype.generateKeyCapLabel = function () {
          var a = d.keyCodes[this.spec.id];
          switch (a) {
            case 186:
              a = 59;
              break;
            case 187:
              a = 61;
              break;
            case 188:
              a = 44;
              break;
            case 189:
              a = 45;
              break;
            case 190:
              a = 46;
              break;
            case 191:
              a = 47;
              break;
            case 192:
              a = 96;
              break;
            case 219:
              a = 91;
              break;
            case 220:
              a = 92;
              break;
            case 221:
              a = 93;
              break;
            case 222:
              a = 39;
              break;
            default:
              if (48 > a || 90 < a) a = 0;
          }
          if (0 < a) {
            var b = window.keyman.util._CreateElement("div");
            b.className = "kmw-key-label";
            b.innerHTML = String.fromCharCode(a);
            return b;
          }
          return null;
        };
        b.prototype.processSubkeys = function (a) {
          var b,
            c = (a.subKeys = this.spec.sk);
          for (b = 0; b < c.length; b++) {
            if ("1" == c[b].sp || "2" == c[b].sp) c[b].text = this.renameSpecialKey(c[b].text);
            c[b].layer || (c[b].layer = a.key.layer);
          }
          b = window.keyman.util._CreateElement("div");
          b.className = "kmw-key-popup-icon";
          a.appendChild(b);
        };
        b.prototype.construct = function (a, b, d, e) {
          var h = f.keyman.singleton.util,
            g = this.spec,
            m = "desktop" == this.formFactor,
            n = h._CreateElement("div");
          n.className = "kmw-key-square";
          var t = n.style;
          t.width = this.objectGeometry(g.widthpc);
          var v = e;
          h = h._CreateElement("div");
          h = r(h, new c(this, g.id));
          a.setButtonClass(g, h, b);
          m ? (t.marginLeft = this.objectGeometry(g.padpc)) : ((t.left = this.objectGeometry(e + g.padpc)), a.isStatic || (t.bottom = d.bottom), (t.height = d.height), (h.style.left = t.left), (h.style.width = t.width));
          e = e + g.padpc + g.widthpc;
          (b.keyLabels || m) && (b = this.generateKeyCapLabel()) && h.appendChild(b);
          h.id = this.getId(a);
          a.isStatic || a.device.touchable || ((h.onmouseover = h.onmousedown = a.mouseOverMouseDownHandler), (h.onmouseup = h.onmouseout = a.mouseUpMouseOutHandler));
          h.appendChild(this.generateKeyText(a));
          "undefined" != typeof g.sk && null != g.sk ? this.processSubkeys(h) : (h.subKeys = null);
          n.appendChild(h);
          return { element: n, percent: e - v };
        };
        b.prototype.objectGeometry = function (a) {
          var b = this.objectUnits();
          return "%" == b ? a + b : Math.round(100 * a) / 100 + b;
        };
        return b;
      })(h);
      k.OSKBaseKey = n;
      var w = (function (a) {
        function b(b, c, d) {
          return a.call(this, b, c, d) || this;
        }
        __extends(b, a);
        b.prototype.getId = function (a) {
          var b = this.spec;
          return "string" == typeof this.layer && "" != this.layer ? "popup-" + this.layer + "-" + b.id : "popup-" + a.layerId + "-" + b.id;
        };
        b.prototype.construct = function (a, b, d) {
          var e = this.spec,
            h = document.createElement("div"),
            f = a.getDefaultKeyObject(),
            g = h.style,
            m;
          for (m in f) "string" != typeof e[m] && (e[m] = f[m]);
          h.className = "kmw-key-square-ex";
          d && (g.marginTop = "5px");
          g.width = "undefined" != typeof e.width ? (parseInt(e.width, 10) * b.offsetWidth) / 100 + "px" : b.offsetWidth + "px";
          g.height = b.offsetHeight + "px";
          b = document.createElement("div");
          b = r(b, new c(this, e.id));
          a.setButtonClass(e, b);
          b.id = this.getId(a);
          e = b.style;
          e.height = g.height;
          e.width = g.width;
          e.position = "absolute";
          b.appendChild(this.generateKeyText(a));
          h.appendChild(b);
          return h;
        };
        return b;
      })(h);
      k.OSKSubKey = w;
      var q = (function () {
        function c(a, b, c, d, e, h) {
          this.layerId = "default";
          this.popupPending = this.ddOSK = this.isStatic = !1;
          this.popupDelay = 500;
          this.touch = function (a) {
            var b = f.keyman.singleton.textProcessor,
              c = a.changedTouches[0].target,
              d = this.keyTarget(c);
            this.touchX = a.changedTouches[0].pageX;
            this.currentTarget = d;
            this.cancelDelete();
            var e = document.getElementById("kmw-popup-keys");
            if (!((e && "visible" == e.style.visibility) || this.popupVisible)) {
              this.touchCount = a.touches.length;
              if ((d && 0 <= d.className.indexOf("key-hidden")) || 0 <= c.className.indexOf("kmw-key-row")) d = this.findNearestKey(a, c);
              null != d &&
                ((c = d.keyId),
                this.highlightKey(d, !0),
                "K_LOPT" == c || "K_ROPT" == c
                  ? (window.setTimeout(
                      function () {
                        b.clickKey(d);
                      }.bind(this),
                      0
                    ),
                    (this.touchPending = this.keyPending = null))
                  : "K_BKSP" == c
                  ? ((c = this.getTouchProbabilities(a.changedTouches[0])),
                    b.clickKey(d, a.changedTouches[0], this.layerId, c),
                    (this.deleteKey = d),
                    (this.deleting = window.setTimeout(this.repeatDelete, 500)),
                    (this.touchPending = this.keyPending = null))
                  : (this.keyPending
                      ? (this.highlightKey(this.keyPending, !1), (c = this.getTouchProbabilities(this.touchPending)), b.clickKey(this.keyPending, this.touchPending, this.layerId, c), this.clearPopup(), this.touchCount--)
                      : this.touchHold(d),
                    (this.keyPending = d),
                    (this.touchPending = a.changedTouches[0])));
            }
          }.bind(this);
          this.release = function (a) {
            var b = f.keyman.singleton.textProcessor,
              c = document.getElementById("kmw-popup-keys"),
              d = this.currentTarget;
            this.cancelDelete();
            if (c && "visible" == c.style.visibility) {
              if (0 < a.touches.length) return;
              if (null == d || (0 > d.id.indexOf("popup") && d.id != this.popupBaseKey.id)) this.highlightKey(this.keyPending, !1), this.clearPopup(), (this.touchPending = this.keyPending = null);
            }
            this.popupVisible ||
              (d && d.id && this.optionKey(d, d.id, !1),
              (d = a.changedTouches[0].pageX),
              (d = (2 > d && 5 < this.touchX) || (d > window.innerWidth - 2 && this.touchX < window.innerWidth - 5)),
              (c = this.touchCount),
              0 < this.touchCount && this.touchCount--,
              this.keyPending
                ? (this.highlightKey(this.keyPending, !1),
                  0 > this.keyPending.className.indexOf("hidden") && 0 < c && !d && ((d = this.getTouchProbabilities(a.changedTouches[0])), b.clickKey(this.keyPending, a.changedTouches[0], this.layerId, d)),
                  this.clearPopup(),
                  (this.touchPending = this.keyPending = null))
                : ((b = a.changedTouches[0]), (d = this.keyTarget(b.target)), d || ((b = document.elementFromPoint(b.clientX, b.clientY)), (d = this.findNearestKey(a, b))), this.highlightKey(d, !1)));
          }.bind(this);
          this.moveOver = function (a) {
            var b = f.keyman.singleton.util;
            a.preventDefault();
            a.cancelBubble = !0;
            "function" == typeof a.stopImmediatePropagation ? a.stopImmediatePropagation() : "function" == typeof a.stopPropagation && a.stopPropagation();
            if (0 == this.touchCount) this.cancelDelete();
            else {
              var c = "object" == typeof a.touches ? a.touches[0].clientX : a.clientX,
                d = "object" == typeof a.touches ? a.touches[0].clientY : a.clientY;
              this.touchPending = a.changedTouches[0];
              var e = document.elementFromPoint(c, d),
                h = this.keyPending,
                g = this.keyTarget(e);
              if ((g && 0 <= g.className.indexOf("key-hidden")) || (e && !g && 0 <= e.className.indexOf("key-row"))) g = this.findNearestKey(a, e);
              g && "string" == typeof g.id && 0 > g.id.indexOf("-K_BKSP") && this.cancelDelete();
              if (!(1 < a.touches.length))
                if (this.popupVisible)
                  null == g
                    ? (h && this.highlightKey(h, !1), (this.touchPending = this.keyPending = null))
                    : g == this.popupBaseKey
                    ? (b.hasClass(g, "kmw-key-touched") || this.highlightKey(g, !0), (this.keyPending = g), (this.touchPending = a.touches[0]))
                    : (h && this.highlightKey(h, !1), (this.touchPending = this.keyPending = null));
                else {
                  (b = document.getElementById("kmw-popup-keys")) && "visible" == b.style.visibility && "phone" == this.device.formFactor && g == this.popupBaseKey && (g = b.childNodes[0].firstChild);
                  this.currentTarget = g;
                  h && g && g !== h && this.highlightKey(h, !1);
                  this.highlightSubKeys(g, c, d);
                  if (b && "visible" == b.style.visibility) {
                    if (g && 0 > g.id.indexOf("popup") && g != this.popupBaseKey) return;
                    g && g == this.popupBaseKey && 0 > g.className.indexOf("kmw-key-touched") && this.highlightKey(g, !0);
                  } else
                    (c = Math.max(5, this.kbdDiv.offsetTop + this.kbdDiv.offsetParent.offsetTop - 0.25 * this.kbdDiv.firstChild.offsetHeight)),
                      h && a.touches[0].pageY < c && (this.highlightKey(h, !1), this.showKeyTip(null, !1), (this.touchPending = this.keyPending = null));
                  g && this.keyPending && ((this.keyPending = g), (this.touchPending = a.touches[0]));
                  this.keyPending && (h != g || 0 > g.className.indexOf("kmw-key-touched")) && this.highlightKey(g, !0);
                  h && g && g != h && "" != g.id && this.touchHold(g);
                }
            }
          }.bind(this);
          this.repeatDelete = function () {
            var a = f.keyman.singleton.textProcessor;
            this.deleting && (a.clickKey(this.deleteKey), (this.deleting = window.setTimeout(this.repeatDelete, 100)));
          }.bind(this);
          this.mouseOverMouseDownHandler = function (a) {
            var b = f.keyman.singleton.util,
              c = b.eventTarget(a);
            null !== c &&
              "desktop" == this.device.formFactor &&
              ("SPAN" == c.nodeName && (c = c.parentNode),
              (c = this.keyTarget(c)),
              "mousedown" == b.eventType(a) ? ((this.currentKey = c.id), b._CancelMouse(a), this.highlightKey(c, !0)) : c.id == this.currentKey && this.highlightKey(c, !0));
          }.bind(this);
          this.mouseUpMouseOutHandler = function (a) {
            var b = f.keyman.singleton,
              c = b.util,
              d = c.eventTarget(a);
            null !== d &&
              "desktop" == this.device.formFactor &&
              ("SPAN" == d.nodeName && (d = d.parentNode), (d = this.keyTarget(d)), this.highlightKey(d, !1), "mouseup" == c.eventType(a) && (d.id == this.currentKey && b.textProcessor.clickKey(d), (this.currentKey = "")));
          }.bind(this);
          b = f.keyman.singleton;
          var m = b.util;
          this.device = e = e || m.device;
          h && (this.isStatic = h);
          h = c;
          c = m._CreateElement("div");
          m = b.keyboardManager.activeKeyboard;
          if ("object" != typeof h || null == h) (b = m ? new g.utils.Version(m.KVER) : new g.utils.Version(b.version)), (h = k.Layouts.buildDefaultLayout(a, b, d, e.formFactor));
          this.layout = k.ActiveLayout.polyfill(h, e.formFactor);
          this.layers = h.layer;
          this.fontFamily = "font" in h ? h.font : "";
          h.keyLabels = "undefined" != typeof h.displayUnderlying ? 1 == h.displayUnderlying : m && "undefined" != typeof m.KDU && m.KDU;
          a = this.deviceDependentLayout(h, e.formFactor);
          this.ddOSK = !0;
          c.appendChild(a);
          this.kbdHelpDiv = this.kbdDiv = c;
          this.isStatic ? (c.childNodes[0].className = e.formFactor + "-static kmw-osk-inner-frame") : (c.className = e.formFactor + " kmw-osk-inner-frame");
        }
        c.prototype.getDefaultKeyObject = function () {
          return new b(void 0, "", k.ActiveKey.DEFAULT_KEY.width, k.ActiveKey.DEFAULT_KEY.sp, null, k.ActiveKey.DEFAULT_KEY.pad);
        };
        c.prototype.deviceDependentLayout = function (a, b) {
          var c = f.keyman.singleton.util,
            d = f.keyman.singleton.osk,
            e = 100,
            h = c._CreateElement("div"),
            g = h.style;
          h.className = "kmw-key-layer-group";
          switch (b) {
            case "phone":
            case "tablet":
              var m = d.getHeight();
              g.height = m + "px";
              e = Math.round((100 * d.getKeyboardHeight()) / m);
          }
          if (null == a) return h;
          m = a.fontsize;
          g.fontSize = "undefined" == typeof m || null == m || "" == m ? "1em" : a.fontsize;
          this.fontSize = g.fontSize;
          var t;
          var q = a.layer;
          this.getDefaultKeyObject().fontsize = g.fontSize;
          for (m = 0; m < q.length; m++) {
            var r = q[m],
              w = r.row;
            for (t = w.length; 0 < t && !(0 < w[t - 1].key.length); t--);
            t < w.length && w.splice(t - w.length, w.length - t);
          }
          var z = e / q[0].row.length;
          "desktop" == b && (z = e / q[0].row.length);
          e = "desktop" == b ? 100 : d.getWidth();
          !this.isStatic && this.device.touchable && (h.addEventListener("touchstart", this.touch, !0), h.addEventListener("touchend", this.release, !0), h.addEventListener("touchmove", this.moveOver, !1));
          for (m = 0; m < q.length; m++) {
            r = q[m];
            d = c._CreateElement("div");
            t = d.style;
            d.className = "kmw-key-layer";
            t.display = 0 == m ? "block" : "none";
            t.height = g.height;
            t.fontFamily = "font" in a ? a.font : "";
            d.layer = d.nextLayer = r.id;
            "string" == typeof r.nextlayer && (d.nextLayer = r.nextlayer);
            w = r.row;
            for (t = 0; t < w.length; t++) {
              var U = c._CreateElement("div");
              U.className = "kmw-key-row";
              U.onmousedown = c.mouseDownPreventDefaultHandler;
              var H = w[t];
              var ka = U.style;
              ka.maxHeight = ka.height = z + "%";
              var C = H.key;
              var J = 0;
              for (H = 0; H < C.length - 1; H++) {
                var K = C[H].widthpc * e;
                C[H].widthpc = K;
                var I = C[H].padpc * e;
                C[H].padpc = I;
                C[H].proportionalX = (J + I + K / 2) / e;
                C[H].proportionalWidth = K / e;
                J += I + K;
              }
              var X = (k.ActiveKey.DEFAULT_RIGHT_MARGIN * e) / r.totalWidth;
              J += X;
              1 == C.length && 0 > parseInt(C[0].pad, 10)
                ? ((K = C[0].widthpc * e), (C[0].widthpc = K), (J += K), (C[0].padpc = e - J), (C[0].proportionalX = (J - X - K / 2) / e), (C[0].proportionalWidth = K / e))
                : 0 < C.length && ((H = C.length - 1), (I = C[H].padpc * e), (C[H].padpc = I), (J += I), (C[H].widthpc = K = e - J), (C[H].proportionalX = (e - X - K / 2) / e), (C[H].proportionalWidth = K / e));
              for (H = J = 0; H < C.length; H++) (K = C[H]), (K = new n(K, r.id, b).construct(this, a, ka, J)), U.appendChild(K.element), (J += K.percent);
              d.appendChild(U);
            }
            h.appendChild(d);
          }
          return h;
        };
        c.prototype.getTouchCoordinatesOnKeyboard = function (a) {
          var b = f.keyman.singleton.util.getAbsolute(this.kbdDiv.firstChild);
          a = { x: a.pageX - b.x, y: a.pageY - b.y };
          b = this.kbdDiv.firstChild;
          a.x /= b.offsetWidth;
          a.y /= b.offsetHeight;
          return a;
        };
        c.prototype.getTouchProbabilities = function (a) {
          if (!f.keyman.singleton.modelManager.mayCorrect) return null;
          a = this.getTouchCoordinatesOnKeyboard(a);
          var b = this.kbdDiv.firstChild;
          return this.layout.layer[this.layerIndex].getTouchProbabilities(a, b.offsetWidth / b.offsetHeight);
        };
        c.prototype.keyTarget = function (b) {
          var c = f.keyman.singleton.util;
          try {
            if (b) {
              if (c.hasClass(b, "kmw-key")) return a(b);
              if (b.parentNode && c.hasClass(b.parentNode, "kmw-key")) return a(b.parentNode);
              if (b.firstChild && c.hasClass(b.firstChild, "kmw-key")) return a(b.firstChild);
            }
          } catch (v) {}
          return null;
        };
        c.prototype.findNearestKey = function (a, b) {
          if (!a || "undefined" == typeof a.changedTouches || 0 == a.changedTouches.length) return null;
          for (a = a.changedTouches[0].pageX; b && void 0 !== b.className && 0 > b.className.indexOf("key-row"); ) b = b.parentNode;
          if (!b) return null;
          var c,
            d = 0,
            e = 24,
            h = 1e5;
          for (c = 0; c < b.childNodes.length; c++) {
            var f = b.childNodes[c];
            if (!(void 0 !== f.className && 0 <= f.className.indexOf("key-hidden"))) {
              var g = f.offsetLeft;
              var m = g + f.offsetWidth;
              if (a >= g && a <= m) return f.firstChild;
              g -= a;
              0 <= g && g < h && ((d = c), (h = g));
              g = a - m;
              0 <= g && g < h && ((d = c), (h = g));
            }
          }
          return 1e5 > h && ((b = b.childNodes[d]), (g = b.offsetLeft), (m = g + b.offsetWidth), 40 < b.offsetWidth && (e = 0.6 * b.offsetWidth), (0 <= g - a && g - a < e) || (0 <= a - m && a - m < e)) ? b.firstChild : null;
        };
        c.prototype.cancelDelete = function () {
          this.deleting && window.clearTimeout(this.deleting);
          this.deleting = 0;
        };
        c.prototype.findKeyElement = function (a, b) {
          for (var c = this.kbdDiv.firstChild, d = 0; d < c.childElementCount; d++) {
            var e = c.childNodes[d];
            if (e.firstChild.firstChild.firstChild.key.layer == a)
              for (var h = 0; h < e.childElementCount; h++)
                for (var f = e.childNodes[h], g = 0; g < f.childElementCount; g++) {
                  var m = f.childNodes[g].firstChild;
                  if (m.keyId == b) return m;
                }
          }
          return null;
        };
        c.prototype._UpdateVKShiftStyle = function (a) {
          var b,
            c = f.keyman.singleton.textProcessor;
          if (a) for (b = 0; b < this.layers.length && this.layers[b].id != this.layerId; b++);
          else {
            b = this.layerIndex;
            a = this.layers[b].id;
            var d = this.layers[b];
            b = ["K_CAPS", "K_NUMLOCK", "K_SCROLL"];
            var e = [d.capsKey, d.numKey, d.scrollKey];
            for (d = 0; d < e.length; d++)
              if (null != e[d]) {
                e[d].sp = c.stateKeys[b[d]] ? k.Layouts.buttonClasses["SHIFT-ON"] : k.Layouts.buttonClasses.SHIFT;
                var h = a + "-" + b[d],
                  g = document.getElementById(h);
                null == g && (g = this.findKeyElement(a, b[d]));
                null != g ? this.setButtonClass(e[d], g, this.layout) : console.warn('Could not find key to apply style: "' + h + '"');
              }
          }
        };
        c.prototype.setButtonClass = function (a, b, c) {
          var d = 0,
            e = "default shift shift-on special special-on    deadkey blank hidden".split(" ");
          "string" == typeof a.dk && "1" == a.dk && (d = 8);
          "string" == typeof a.sp && (d = parseInt(a.sp, 10));
          if (0 > d || 10 < d) d = 0;
          c = c || this.layout;
          b.className = 4 < c.layer[0].row.length && "phone" == this.device.formFactor ? "kmw-key kmw-5rows kmw-key-" + e[d] : "kmw-key kmw-key-" + e[d];
        };
        c.prototype.clearPopup = function () {
          var a = f.keyman.singleton.osk,
            b = document.getElementById("kmw-popup-keys");
          null != b && (b.shim && a._Box.removeChild(b.shim), b.parentNode.removeChild(b));
          this.popupCallout && a._Box.removeChild(this.popupCallout);
          this.popupCallout = null;
          this.subkeyDelayTimer && (window.clearTimeout(this.subkeyDelayTimer), (this.subkeyDelayTimer = null));
          this.popupBaseKey = null;
        };
        c.prototype.showSubKeys = function (a) {
          if (null != this.keyPending) {
            var b = f.keyman.singleton,
              c = b.util,
              d = this.device,
              e = a.subKeys,
              h = document.createElement("DIV");
            this.getDefaultKeyObject();
            h.id = "kmw-popup-keys";
            this.popupBaseKey = a;
            "phone" == d.formFactor && this.prependBaseKey(a);
            var m = h.style;
            m.bottom = parseInt(a.style.bottom, 10) + parseInt(a.style.height, 10) + 4 + "px";
            m.fontFamily = this.fontFamily;
            m.fontSize = b.util.getStyleValue(a, "font-size");
            m.visibility = "hidden";
            var n = e.length;
            var k = Math.min(Math.ceil(n / 9), 2);
            var q = Math.ceil(n / k);
            1 < k && (m.width = q * a.offsetWidth + 5 * q + "px");
            for (m = 0; m < n; m++) {
              var r = !1,
                w = Math.floor(m / q);
              1 < k && 0 < w && (r = !0);
              r = new f.keyman.osk.OSKSubKey(e[m], a.key.layer, d.formFactor).construct(this, a, r);
              h.appendChild(r);
            }
            this.showKeyTip(null, !1);
            b.osk._Box.appendChild(h);
            m = h.style;
            e = g.dom.Utils.getAbsoluteX(a) + 0.5 * (a.offsetWidth - h.offsetWidth);
            c = (c.landscapeView() ? screen.height : screen.width) - h.offsetWidth;
            e > c && (e = c);
            0 > e && (e = 0);
            m.left = e + "px";
            m.visibility = "visible";
            c = b.isEmbedded;
            k = getComputedStyle(h);
            e = b.osk.getHeight();
            n = parseInt(k.bottom, 10);
            k = parseInt(k.height, 10);
            q = 0;
            k + n > e && c && ((q = k + n - e), (m.bottom = n - q + "px"));
            this.popupCallout = this.addCallout(a, q);
            h.shim = document.createElement("DIV");
            h.shim.id = "kmw-popup-shim";
            b.osk._Box.appendChild(h.shim);
            "phone" == d.formFactor && ((this.keyPending = a = h.childNodes[0].firstChild), this.highlightKey(a, !0));
          }
        };
        c.prototype.prependBaseKey = function (a) {
          var c = a.subKeys,
            d = f.keyman.singleton;
          if (a && "undefined" != typeof a.id) {
            a.id.split("-");
            var e = a.keyId;
            var h = a.key.spec.layer;
            var g = a.key.spec.sp,
              m = a.key.spec.nextlayer;
            if ("undefined" != typeof c && 0 < c.length && (c[0].id != e || c[0].layer != h)) {
              e = new b(e, "", void 0, g, m);
              "" != h && (e.layer = h);
              for (h = 0; h < a.childNodes.length && !d.util.hasClass(a.childNodes[h], "kmw-key-text"); h++);
              h < a.childNodes.length && (e.text = a.childNodes[h].textContent);
              c.splice(0, 0, e);
            }
          }
        };
        c.prototype.showLanguage = function () {
          var a = f.keyman.singleton,
            b = "",
            c = a.keyboardManager.activeStub;
          c ? ((a = c.KL), (b = c.KN)) : (a = a.getActiveLanguage(!0) ? a.getActiveLanguage(!0) : "English");
          try {
            var d = this.spaceBar.firstChild,
              e = d.parentNode;
            "undefined" == typeof e.className || "" == e.className ? (e.className = "kmw-spacebar") : -1 == e.className.indexOf("kmw-spacebar") && (e.className += " kmw-spacebar");
            d.className = "kmw-spacebar-caption";
            b = b.replace(/\s*keyboard\s*/i, "");
            c = "";
            c = b == a ? a : a + " (" + b + ")";
            d.innerHTML != c && (d.innerHTML = c);
          } catch (P) {}
        };
        c.prototype.highlightKey = function (a, b) {
          if (a && "" != a.className && !(0 <= a.className.indexOf("kmw-key-row"))) {
            var c = a.className;
            null != this.keytip && 0 > c.indexOf("kmw-key-shift") && 0 > c.indexOf("kmw-spacebar") && 0 > a.id.indexOf("popup")
              ? this.showKeyTip(a, b)
              : b && 0 > c.indexOf(" kmw-key-touched")
              ? ((a.className = c + " kmw-key-touched"), this.showKeyTip(null, !1))
              : (a.className = c.replace(" kmw-key-touched", ""));
          }
        };
        c.prototype.getKeyEmFontSize = function () {
          var a = f.keyman.singleton,
            b = a.util;
          if ("desktop" == this.device.formFactor) return 0.8 * this.getFontSizeFromCookie();
          var c = getComputedStyle(document.body).fontSize;
          c = b.getFontSizeStyle(c).val;
          var d = 1;
          this.isStatic || (d = b.getFontSizeStyle(a.osk._Box).val);
          return c * d;
        };
        c.prototype.getFontSizeFromCookie = function () {
          var a = f.keyman.singleton.util,
            b = a.loadCookie("KeymanWeb_OnScreenKeyboard");
          if ("undefined" == typeof b || null == b) return 16;
          a = a.toNumber(b.height, 0.15 * screen.height);
          a > 0.5 * screen.height && (a = 0.5 * screen.height);
          return a / 8;
        };
        c.prototype.getSpecialKey = function (b, c) {
          var d = this.kbdDiv.childNodes[0].childNodes;
          if (0 <= b && b < d.length)
            for (b = d[b].childNodes, b = b[b.length - 1].childNodes, d = 0; d < b.length; d++) {
              var e = a(b[d].firstChild);
              if (e && e.keyId == c) return e;
            }
          return null;
        };
        c.prototype.show = function () {
          var a = this.device,
            b,
            c = -1,
            d = this.kbdDiv.childNodes[0].childNodes;
          for (b = 0; b < d.length; b++) {
            var e = d[b];
            e.layer == this.layerId
              ? ((e.style.display = "block"), (this.nextLayer = this.layerId), (this.layerIndex = c = b), "string" == typeof this.layers[b].nextlayer && (this.nextLayer = this.layers[b].nextlayer), this._UpdateVKShiftStyle())
              : (e.style.display = "none");
          }
          a.touchable && ((this.lgKey = this.getSpecialKey(c, "K_LOPT")), (this.hkKey = this.getSpecialKey(c, "K_ROPT")), "iOS" == a.OS && "phone" == a.formFactor && this.adjustHeights());
          this.spaceBar = this.getSpecialKey(c, "K_SPACE");
        };
        c.prototype.showLayer = function (a) {
          var b = f.keyman.singleton;
          if (a == this.layerId && "desktop" != this.device.formFactor) return !0;
          if (b.keyboardManager.activeKeyboard) for (var c = 0; c < this.layers.length; c++) if (this.layers[c].id == a) return (this.layerId = a), b.osk._Show(), !0;
          return !1;
        };
        c.prototype.adjustHeights = function () {
          var a = f.keyman.singleton,
            b = a.osk._Box;
          if (!(b && this.kbdDiv && this.kbdDiv.firstChild && this.kbdDiv.firstChild.firstChild.childNodes)) return !1;
          var c = 1;
          "iOS" != this.device.OS || a.isEmbedded || (c /= a.util.getViewportScale());
          a = this.computedAdjustedOskHeight();
          b = b.style;
          b.height = b.maxHeight = a + "px";
          b = this.kbdDiv.firstChild.style;
          b.height = b.maxHeight = a + "px";
          b.fontSize = c + "em";
          this.adjustLayerHeights(a);
          return !0;
        };
        c.prototype.computedAdjustedOskHeight = function () {
          for (var a = this.device, b = this.kbdDiv.firstChild.childNodes, c = f.keyman.singleton.osk.getKeyboardHeight(), d = 0, e = 0; e < b.length; e++) {
            var h = b[e].childNodes.length;
            h *= Math.floor(c / (0 == h ? 1 : h));
            h > d && (d = h);
          }
          b = d + 0;
          "Android" == a.OS && "devicePixelRatio" in window && (b /= window.devicePixelRatio);
          return b;
        };
        c.prototype.adjustLayerHeights = function (a) {
          for (var b = f.keyman.singleton.osk, c = this.device, d = this.kbdDiv.firstChild.childNodes, e = 0; e < d.length; e++) {
            var h = d[e],
              g = d[e].childNodes.length;
            d[e].style.height = a + "px";
            var n = Math.floor(b.getKeyboardHeight() / (0 == g ? 1 : g));
            "Android" == c.OS && "devicePixelRatio" in window && ((h.style.height = h.style.maxHeight = a + "px"), (n /= window.devicePixelRatio));
            h = Math.round(0.15 * n);
            for (var m = 0; m < g; m++) {
              var k = d[e].childNodes[m].style,
                q = (g - m - 1) * n + 1;
              this.isStatic || (k.bottom = q + "px");
              k.maxHeight = k.height = n + "px";
              this.layout.layer[e].row[m].proportionalY = (a - q - n / 2) / a;
              this.adjustRowHeights(d[e].childNodes[m].childNodes, n, q, h);
            }
          }
        };
        c.prototype.adjustRowHeights = function (a, b, c, d) {
          var e = f.keyman.singleton.util,
            h = this.device;
          h = "iOS" == h.OS && "phone" == h.formFactor && e.landscapeView();
          for (var g = a.length, n = 0; n < g; n++) {
            var m = a[n],
              k;
            for (k = 0; k < m.childNodes.length && !e.hasClass(m.childNodes[k], "kmw-key"); k++);
            var q = m.style;
            this.isStatic || (q.bottom = c - d / 2 + "px");
            q.height = q.minHeight = b + "px";
            q = m.childNodes[k].style;
            this.isStatic || (q.bottom = c + "px");
            q.height = q.minHeight = b - d + "px";
            h && 0 < k && (m.childNodes[0].style.fontSize = "6px");
          }
        };
        c.prototype.appendStyleSheet = function () {
          var a = f.keyman.singleton,
            b = a.util,
            c = a.keyboardManager.activeKeyboard,
            d = a.keyboardManager.activeStub;
          if (null != d) {
            this.styleSheet && b.removeStyleSheet(this.styleSheet);
            var e = d.KFont;
            d = d.KOskFont;
            b.addFontFaceStyleSheet(e);
            b.addFontFaceStyleSheet(d);
            a.hideInputs();
            var h = this.addFontStyle(e, d);
            null != c && "string" == typeof c.KCSS && (h += c.KCSS);
            this.styleSheet = b.addStyleSheet(h);
            this.waitForFonts(e, d) && a.alignInputs();
          }
        };
        c.prototype.addFontStyle = function (a, b) {
          var c = f.keyman.singleton,
            d = c.baseFont;
          "undefined" != typeof a && "undefined" != typeof a.family && (d = a.family);
          d = d.replace(/\u0022/g, "");
          var e = new RegExp("\\s?" + d + ",?"),
            h = c.appliedFont.replace(/\u0022/g, "");
          h = h.replace(e, "");
          h = h.replace(/,$/, "");
          h = '"' + ("" == h ? d : d + "," + h).replace(/,\s?/g, '","') + '"';
          d = ".keymanweb-font{\nfont-family:" + h + " !important;\n}\n";
          "undefined" != typeof b
            ? (d = d + '.kmw-key-text{\nfont-family:"' + b.family.replace(/\u0022/g, "").replace(/,/g, '","') + '";\n}\n')
            : "undefined" != typeof a && (d = d + '.kmw-key-text{\nfont-family:"' + a.family.replace(/\u0022/g, "").replace(/,/g, '","') + '";\n}\n');
          c.appliedFont = h;
          return d;
        };
        c.buildDocumentationKeyboard = function (a, b, d, e) {
          var h = f.keyman.singleton;
          b = h.keyboardManager.activeKeyboard;
          d = "undefined" == typeof d ? "desktop" : d;
          e = "undefined" == typeof e ? "default" : e;
          var n = new g.Device();
          n.formFactor = d;
          "desktop" != d && (n.OS = "iOS");
          var m = h.keyboardManager.keyboards;
          if (null != a) {
            var p = a.toLowerCase().replace("keyboard_", "");
            for (a = 0; a < m.length; a++)
              if (p == m[a].KI.toLowerCase().replace("keyboard_", "")) {
                b = m[a];
                break;
              }
          }
          if (!b) return null;
          p = b.KVKL;
          a = null;
          m = b.KV;
          "object" == typeof p &&
            ("object" == typeof p[d] && null != p[d]
              ? (a = p[d])
              : "phone" == d && "object" == typeof p.tablet && null != p.tablet
              ? (a = p.tablet)
              : "tablet" == d && "object" == typeof p.phone && null != p.phone
              ? (a = p.phone)
              : "object" == typeof p.desktop && null != p.desktop && (a = p.desktop));
          null == a && null != m && ((a = new g.utils.Version(b.KVER)), (a = k.Layouts.buildDefaultLayout(m, a, h.keyboardManager.getKeyboardModifierBitmask(b), d)));
          null != a && (a.keyLabels = "undefined" != typeof a.displayUnderlying ? 1 == a.displayUnderlying : "undefined" != typeof b.KDU && b.KDU);
          h = new c(m, null, a, h.keyboardManager.getKeyboardModifierBitmask(), n, !0);
          n = h.kbdDiv.childNodes[0];
          null != a ? ((h.layerId = e), h.show(), h.adjustHeights(), (n.style.fontSize = h.kbdDiv.style.fontSize)) : (n.innerHTML = "<p style='color:#c40; font-size:0.5em;margin:10px;'>No " + d + " layout is defined for " + b.KN + ".</p>");
          n.style.border = "1px solid #ccc";
          return n;
        };
        c.prototype.onHide = function () {
          this.hkKey && this.highlightKey(this.hkKey, !1);
        };
        c.prototype.touchHold = function (a) {
          this.subkeyDelayTimer && (window.clearTimeout(this.subkeyDelayTimer), (this.subkeyDelayTimer = null));
          "undefined" != typeof a.subKeys &&
            null != a.subKeys &&
            (this.subkeyDelayTimer = window.setTimeout(
              function () {
                this.clearPopup();
                this.showSubKeys(a);
              }.bind(this),
              this.popupDelay
            ));
        };
        c.prototype.optionKey = function (a, b, c) {
          a = f.keyman.singleton;
          var d = a.osk;
          c &&
            (0 <= b.indexOf("K_LOPT")
              ? d.showLanguageMenu()
              : 0 <= b.indexOf("K_ROPT") && (a.uiManager.setActivatingUI(!1), d._Hide(!0), (b = a.domManager.getActiveElement()), g.dom.Utils.instanceof(b, "TouchAliasElement") && b.hideCaret(), a.domManager.clearLastActiveElement()));
        };
        c.prototype.highlightSubKeys = function (a, b, c) {
          if (null != a && null != a.subKeys) {
            var d,
              e = document.getElementById("kmw-popup-keys");
            5 < this.touchY - c && null == e && (this.subkeyDelayTimer && window.clearTimeout(this.subkeyDelayTimer), this.showSubKeys(a), (e = document.getElementById("kmw-popup-keys")));
            for (d = 0; d < a.subKeys.length; d++)
              try {
                var h = e.childNodes[d].firstChild;
                var f = g.dom.Utils.getAbsoluteX(h);
                var n = g.dom.Utils.getAbsoluteY(h);
                var m = f + h.offsetWidth;
                var k = n + h.offsetHeight;
                var q = b > f && b < m && c > n && c < k;
                this.highlightKey(h, q);
                q && this.highlightKey(a, !1);
              } catch (ja) {}
          }
        };
        c.prototype.showKeyTip = function (a, b) {
          var c = f.keyman.singleton,
            d = c.util,
            e = c.osk,
            h = this.keytip;
          if (null != h && (a != h.key || b != h.state)) {
            var n = document.getElementById("kmw-popup-keys");
            n = n && "visible" == n.style.visibility;
            if (b && !n) {
              var m = g.dom.Utils.getAbsoluteY(e._Box),
                k = e._Box.offsetHeight;
              e = g.dom.Utils.getAbsoluteX(a);
              var q = g.dom.Utils.getAbsoluteY(a);
              n = a.offsetWidth;
              for (
                var r = a.offsetHeight, w = a.firstChild, t = h.element.style, z = h.element.childNodes[1], H = z.style, ka = 0, C = h.element.firstChild, J = 0;
                J < a.childNodes.length && ((w = a.childNodes[J]), !d.hasClass(w, "kmw-key-text"));
                J++
              );
              C.width = 1.6 * n;
              C.height = 2.3 * r;
              t.top = "auto";
              t.bottom = m + k - q - r + "px";
              t.textAlign = "center";
              t.overflow = "visible";
              t.fontFamily = d.getStyleValue(w, "font-family");
              t.width = C.width + "px";
              t.height = C.height + "px";
              d = d.getStyleInt(w, "font-size");
              0 != d && ((d *= 1.8), (t.fontSize = d + "px"), (m = f.keyman.osk.OSKKey.getTextWidth(this, z.textContent, t)), (m = (0.9 * C.width) / m), 1 > m && (t.fontSize = d * m + "px"));
              z.textContent = w.textContent;
              H.display = "block";
              H.position = "absolute";
              H.textAlign = "center";
              H.width = "100%";
              H.top = "2%";
              H.bottom = "auto";
              w = (C.width - n) / 2;
              e < w ? ((ka = -1), (e += w)) : e > window.innerWidth - n - w && ((ka = 1), (e -= w));
              z = c.isEmbedded;
              d = getComputedStyle(h.element);
              c = c.osk.getHeight();
              H = parseInt(d.bottom, 10);
              d = parseInt(d.height, 10);
              m = 0;
              d + H > c && z && ((m = d + H - c), (C.height -= m), (t.height = C.height + "px"));
              this.drawPreview(C, n, r, ka, m);
              t.left = e - w + "px";
              t.display = "block";
            } else h.element.style.display = "none";
            h.key = a;
            h.state = b;
          }
        };
        c.prototype.drawPreview = function (a, b, c, d, e) {
          var h = f.keyman.singleton.util.device;
          e = e || 0;
          c = a.getContext("2d");
          var g = (a.width - b) / 2,
            n = a.height + e;
          e = g;
          var m = b + g;
          b += 2 * g;
          var k = 0.5 * n,
            q = 0.6 * n,
            w = 8,
            r = a.height;
          q = q > r ? r : q;
          n = n > r ? r : n;
          "Android" == h.OS && (w = 3);
          switch (d) {
            case -1:
              e -= g;
              m -= g;
              break;
            case 1:
              (e += g), (m += g);
          }
          c.clearRect(0, 0, a.width, a.height);
          "Android" == h.OS && (e = m = (e + m) / 2);
          c.fillStyle = h.styles.popupCanvasBackgroundColor;
          c.lineWidth = 1;
          c.strokeStyle = "#cccccc";
          c.save();
          c.beginPath();
          c.moveTo(0 + w, 0);
          c.arcTo(b, 0, b, w, w);
          "Android" == h.OS ? (c.arcTo(b, k, m, q, w), c.arcTo(m, q, e, q, w)) : ((a = 0), n > q && (a = n - q > w ? w : n - q), c.arcTo(b, k, m, q, w), c.arcTo(m, q, m - a, n, a), c.arcTo(m, n, e, n, a), c.arcTo(e, n, e, q - a, a));
          c.arcTo(e, q, 0, k - w, w);
          c.arcTo(0, k, 0, w, w);
          c.arcTo(0, 0, 0 + w, 0, w);
          c.fill();
          c.stroke();
          c.restore();
        };
        c.prototype.createKeyTip = function () {
          var a = f.keyman.singleton,
            b = a.util;
          if ("phone" == a.util.device.formFactor) {
            if (null == this.keytip) {
              this.keytip = { key: null, state: !1 };
              var c = (this.keytip.element = b._CreateElement("div"));
              c.className = "kmw-keytip";
              c.id = "kmw-keytip";
              c.style.pointerEvents = "none";
              c.appendChild(b._CreateElement("canvas"));
              c.appendChild(b._CreateElement("span"));
            }
            a.osk._Box.appendChild(this.keytip.element);
          }
        };
        c.prototype.addCallout = function (a, b) {
          var c = f.keyman.singleton,
            d = c.util;
          if ("phone" != d.device.formFactor || "iOS" != d.device.OS) return null;
          b = b || 0;
          var e = a.offsetHeight - b;
          if (0 < e) {
            d = d._CreateElement("div");
            var h = d.style;
            d.id = "kmw-popup-callout";
            c.osk._Box.appendChild(d);
            c = a.offsetLeft;
            var g = a.offsetWidth;
            h.top = a.offsetTop + b - 6 + "px";
            h.left = c + "px";
            h.width = g + "px";
            h.height = e + 6 + "px";
            return d;
          }
          return null;
        };
        c.prototype.waitForFonts = function (a, b) {
          var c = f.keyman.singleton,
            d = c.util;
          if (("undefined" == typeof a && "undefined" == typeof b) || ("undefined" == typeof a.files && "undefined" == typeof b.files)) return !0;
          var e = d.checkFontDescriptor(a),
            h = d.checkFontDescriptor(b);
          if (e && h) return !0;
          c.fontCheckTimer = window.setInterval(function () {
            d.checkFontDescriptor(a) && d.checkFontDescriptor(b) && (window.clearInterval(c.fontCheckTimer), (c.fontCheckTimer = null), c.alignInputs());
          }, 100);
          window.setTimeout(function () {
            c.fontCheckTimer && (window.clearInterval(c.fontCheckTimer), (c.fontCheckTimer = null), c.alignInputs());
          }, 5e3);
          return !1;
        };
        c.specialCharacters = {
          "*Shift*": 8,
          "*Enter*": 5,
          "*Tab*": 6,
          "*BkSp*": 4,
          "*Menu*": 11,
          "*Hide*": 10,
          "*Alt*": 25,
          "*Ctrl*": 1,
          "*Caps*": 3,
          "*ABC*": 16,
          "*abc*": 17,
          "*123*": 19,
          "*Symbol*": 21,
          "*Currency*": 20,
          "*Shifted*": 8,
          "*AltGr*": 2,
          "*TabLeft*": 7,
          "*LAlt*": 86,
          "*RAlt*": 87,
          "*LCtrl*": 88,
          "*RCtrl*": 89,
          "*LAltCtrl*": 96,
          "*RAltCtrl*": 97,
          "*LAltCtrlShift*": 98,
          "*RAltCtrlShift*": 99,
          "*AltShift*": 100,
          "*CtrlShift*": 101,
          "*AltCtrlShift*": 102,
          "*LAltShift*": 103,
          "*RAltShift*": 104,
          "*LCtrlShift*": 105,
          "*RCtrlShift*": 112,
        };
        return c;
      })();
      k.VisualKeyboard = q;
    })(g.osk || (g.osk = {}));
  })(f.keyman || (f.keyman = {}));
})(com || (com = {}));
(function (f) {
  (function (g) {
    (function (g) {
      var k = (function () {
          function a(a) {
            this.totalLength = 0;
            this.x = a.pageX;
            this.totalLength = 0;
          }
          a.prototype.updateTo = function (a) {
            var c = this.x;
            this.x = a.pageX;
            a = { deltaX: this.x - c };
            this.totalLength += Math.abs(a.deltaX);
            return a;
          };
          Object.defineProperty(a.prototype, "hasScrolled", {
            get: function () {
              return this.totalLength > a.HAS_SCROLLED_FUDGE_FACTOR;
            },
            enumerable: !0,
            configurable: !0,
          });
          a.HAS_SCROLLED_FUDGE_FACTOR = 10;
          return a;
        })(),
        e = (function () {
          function a(a, c, b) {
            this.baseElement = a;
            this.rowClassMatch = c;
            this.selectedTargetMatch = b;
          }
          a.prototype.findTargetFromTouch = function (a, c, b) {
            b = b ? a.touches : a.changedTouches;
            if (!a || "undefined" == typeof b || 0 == b.length) return null;
            for (a = b[0].pageX; c && void 0 !== c.className && 0 > c.className.indexOf(this.rowClassMatch); ) c = c.parentNode;
            if (!c) return null;
            var d = 0,
              e = 24,
              f = 1e5;
            for (b = 0; b < c.childNodes.length; b++) {
              var g = c.childNodes[b];
              if (!this.isInvalidTarget(this.findTargetFrom(g))) {
                var k = g.offsetLeft;
                var m = k + g.offsetWidth;
                k -= a;
                0 <= k && k < f && ((d = b), (f = k));
                m = a - m;
                0 <= m && m < f && ((d = b), (f = m));
                if (0 > m && 0 > k) return this.findTargetFrom(g);
              }
            }
            return 1e5 > f && ((c = c.childNodes[d]), (k = c.offsetLeft), (m = k + c.offsetWidth), 40 < c.offsetWidth && (e = 0.6 * c.offsetWidth), (0 <= k - a && k - a < e) || (0 <= a - m && a - m < e)) ? this.findTargetFrom(c) : null;
          };
          a.prototype.findBestTarget = function (a, c) {
            var b = c ? document.elementFromPoint(a.touches[0].clientX, a.touches[0].clientY) : a.changedTouches[0].target;
            var d = this.findTargetFrom(b);
            d || (d = this.findTargetFromTouch(a, b, c));
            return d;
          };
          a.prototype.isInvalidTarget = function (a) {
            return !1;
          };
          a.prototype.touchStart = function (a) {
            this.currentTarget = this.findBestTarget(a);
            this.touchX = a.changedTouches[0].pageX;
            this.touchY = a.changedTouches[0].pageY;
            this.touchCount = a.touches.length;
            this.currentTarget &&
              ((this.scrollTouchState = this.currentTarget.clientWidth < this.currentTarget.scrollWidth ? new k(a.changedTouches[0]) : null),
              this.highlight(this.currentTarget, !0),
              this.pendingTarget ? (this.highlight(this.pendingTarget, !1), this.select(this.pendingTarget), this.clearHolds(), this.touchCount--) : this.hold(this.currentTarget),
              (this.pendingTarget = this.currentTarget));
          };
          a.prototype.touchEnd = function (a) {
            var c = this.currentTarget;
            if (this.isSubmenuActive() || this.hasModalPopup()) {
              if (0 < a.touches.length) return;
              if (null == c || (0 > c.id.indexOf("popup") && c.id != this.popupBaseTarget.id)) this.highlight(this.pendingTarget, !1), this.clearHolds(), (this.pendingTarget = null);
            }
            c = a.changedTouches[0].pageX;
            c = (2 > c && 5 < this.touchX) || (c > window.innerWidth - 2 && this.touchX < window.innerWidth - 5);
            this.scrollTouchState && (c = c || this.scrollTouchState.hasScrolled);
            var b = this.touchCount;
            0 < this.touchCount && this.touchCount--;
            this.pendingTarget
              ? (this.highlight(this.pendingTarget, !1), 0 > this.pendingTarget.className.indexOf("hidden") && 0 < b && !c && this.select(this.pendingTarget), this.clearHolds(), (this.pendingTarget = null))
              : (c = this.findBestTarget(a)) && this.highlight(c, !1);
          };
          a.prototype.touchMove = function (a) {
            var c = f.keyman.singleton,
              b = c.util;
            a.preventDefault();
            a.cancelBubble = !0;
            "function" == typeof a.stopImmediatePropagation ? a.stopImmediatePropagation() : "function" == typeof a.stopPropagation && a.stopPropagation();
            if (!(1 < a.touches.length || 0 == this.touchCount))
              if (this.currentTarget && null != this.scrollTouchState) (a = this.scrollTouchState.updateTo(a.changedTouches[0]).deltaX), (this.currentTarget.scrollLeft -= window.devicePixelRatio * a);
              else {
                var d = "object" == typeof a.touches ? a.touches[0].clientY : a.clientY,
                  e = this.pendingTarget,
                  g = this.findBestTarget(a, !0);
                if (this.hasModalPopup())
                  null == g
                    ? (e && this.highlight(e, !1), (this.pendingTarget = null))
                    : g == this.popupBaseTarget
                    ? (b.hasClass(g, this.selectedTargetMatch) || this.highlight(g, !0), (this.pendingTarget = g))
                    : (e && this.highlight(e, !1), (this.pendingTarget = null));
                else {
                  this.currentTarget = g = this.dealiasSubTarget(g);
                  e && g && g !== e && this.highlight(e, !1);
                  if (g && this.hasSubmenu(g)) {
                    !c.isEmbedded && 5 < this.touchY - d && !this.isSubmenuActive() && this.displaySubmenuFor(g);
                    if (g && 0 > g.id.indexOf("popup") && g != this.popupBaseTarget) return;
                    g && g == this.popupBaseTarget && 0 > g.className.indexOf(this.selectedTargetMatch) && this.highlight(g, !0);
                  } else
                    (b = this.baseElement),
                      (c = b.offsetParent.offsetTop + b.offsetTop),
                      (b = b.offsetHeight),
                      (d = Math.max(5, c - 0.25 * b)),
                      e && (a.touches[0].pageY < d || a.touches[0].pageY > c + b + 0.25 * b) && (this.highlight(e, !1), this.clearHolds(), (this.pendingTarget = null));
                  g && this.pendingTarget && (this.pendingTarget = g);
                  this.pendingTarget && g && (e != g || 0 > g.className.indexOf(this.selectedTargetMatch)) && this.highlight(g, !0);
                  e && g && g != e && "" != g.id && this.hold(g);
                }
              }
          };
          return a;
        })();
      g.UITouchHandlerBase = e;
    })(g.dom || (g.dom = {}));
  })(f.keyman || (f.keyman = {}));
})(com || (com = {}));
(function (f) {
  (function (g) {
    (function (k) {
      var r = (function () {
        function a(b) {
          var c = f.keyman.singleton.util._CreateElement("div");
          c.id = a.BANNER_ID;
          c.className = a.BANNER_CLASS;
          this.div = c;
          this.height = b;
          this.update();
        }
        Object.defineProperty(a.prototype, "height", {
          get: function () {
            return this._height;
          },
          set: function (a) {
            this._height = 0 < a ? a : 0;
            this.update();
          },
          enumerable: !0,
          configurable: !0,
        });
        a.prototype.update = function () {
          var a = this.div.style,
            b = a.height,
            c = a.display;
          0 < this._height ? ((a.height = this._height + "px"), (a.display = "block")) : ((a.height = "0px"), (a.display = "none"));
          return b !== a.height || c !== a.display;
        };
        a.prototype.appendStyleSheet = function () {};
        a.prototype.getDiv = function () {
          return this.div;
        };
        a.prototype.activate = function () {};
        a.prototype.deactivate = function () {};
        a.DEFAULT_HEIGHT = 37;
        a.BANNER_CLASS = "kmw-banner-bar";
        a.BANNER_ID = "kmw-banner-bar";
        return a;
      })();
      k.Banner = r;
      var e = (function (a) {
        function b() {
          return a.call(this, 0) || this;
        }
        __extends(b, a);
        return b;
      })(r);
      k.BlankBanner = e;
      e = (function (a) {
        function b(b, c) {
          if (0 < b.length) {
            var d = a.call(this) || this;
            c && (d.height = c);
          } else d = a.call(this, 0) || this;
          0 <= b.indexOf("base64") ? console.log("Loading img from base64 data") : console.log("Loading img with src '" + b + "'");
          d.img = document.createElement("img");
          d.img.setAttribute("src", b);
          b = d.img.style;
          b.width = "100%";
          b.height = "100%";
          d.getDiv().appendChild(d.img);
          console.log("Image loaded.");
          return d;
        }
        __extends(b, a);
        b.prototype.setImagePath = function (a) {
          this.img && this.img.setAttribute("src", a);
        };
        return b;
      })(r);
      k.ImageBanner = e;
      var a = (function () {
        function a(a) {
          this._applyFunctor = null;
          var b = f.keyman.singleton;
          this.index = a;
          this.constructRoot();
          a = this.display = b.util._CreateElement("span");
          this.div.appendChild(a);
        }
        a.prototype.constructRoot = function () {
          var b = f.keyman.singleton,
            c = (this.div = b.util._CreateElement("div")),
            e = c.style;
          c.className = "kmw-suggest-option";
          c.id = a.BASE_ID + this.index;
          if ((b = b.keyboardManager.activeStub)) b.KLC && (c.lang = b.KLC), (c = b.KFont) && c.family && "" != c.family && (e.fontFamily = this.fontFamily = c.family);
          e.width = (100 - d.MARGIN * (d.SUGGESTION_LIMIT - 1)) / d.SUGGESTION_LIMIT + "%";
          this.div.suggestion = this;
        };
        Object.defineProperty(a.prototype, "suggestion", {
          get: function () {
            return this._suggestion;
          },
          enumerable: !0,
          configurable: !0,
        });
        a.prototype.update = function (a, b) {
          this._suggestion = a;
          this._applyFunctor = b || null;
          this.updateText();
        };
        a.prototype.updateText = function () {
          var a = this.generateSuggestionText();
          this.div.replaceChild(a, this.display);
          this.display = a;
        };
        a.prototype.apply = function (a) {
          var b = f.keyman.singleton;
          if (this.isEmpty()) return [null, null];
          if (this._applyFunctor) return this._applyFunctor(), [null, null];
          var c = b.modelManager.getPredictionState(this._suggestion.transformId);
          if (c) {
            a || (a = g.text.Processor.getOutputTarget());
            var d = g.text.Mock.from(c.preInput);
            d.apply(this._suggestion.transform);
            var e = d.buildTransformFrom(a);
            d = b.modelManager.wordbreak(a);
            a.apply(e);
            if (b.oninserttext && b.isEmbedded) b.oninserttext(e.deleteLeft, e.insert, e.deleteRight);
            b = g.text.Mock.from(c.preInput);
            b.apply(c.transform);
            return [b.buildTranscriptionFrom(a, null), d];
          }
          console.warn("Could not apply the Suggestion!");
          return [null, null];
        };
        a.prototype.isEmpty = function () {
          return !this._suggestion;
        };
        a.prototype.generateSuggestionText = function () {
          var a = f.keyman.singleton,
            b = this._suggestion,
            c = a.util._CreateElement("span");
          c.className = "kmw-suggestion-text";
          if (null == b) return c;
          null == b.displayAs || "" == b.displayAs ? (b = "\u00a0") : ((a = a.keyboardManager.isRTL()), (b = String.fromCharCode(a ? 8238 : 8237) + b.displayAs));
          c.innerHTML = b;
          return c;
        };
        a.BASE_ID = "kmw-suggestion-";
        return a;
      })();
      k.BannerSuggestion = a;
      var d = (function (b) {
        function d(e) {
          e = b.call(this, e || r.DEFAULT_HEIGHT) || this;
          e.getDiv().className = e.getDiv().className + " " + d.BANNER_CLASS;
          e.options = [];
          for (var h = 0; h < d.SUGGESTION_LIMIT; h++) {
            var g = new a(h);
            e.options[h] = g;
          }
          g = f.keyman.singleton.keyboardManager.isRTL();
          for (h = 0; h < d.SUGGESTION_LIMIT; h++) {
            var n = g ? d.SUGGESTION_LIMIT - h - 1 : h;
            e.getDiv().appendChild(e.options[n].div);
            if (h != d.SUGGESTION_LIMIT) {
              n = f.keyman.singleton.util._CreateElement("div");
              n.className = "kmw-banner-separator";
              var m = n.style;
              m.marginLeft = d.MARGIN / 2 + "%";
              m.marginRight = d.MARGIN / 2 + "%";
              e.getDiv().appendChild(n);
            }
          }
          e.manager = new c(e.getDiv(), e.options);
          e.setupTouchHandling();
          return e;
        }
        __extends(d, b);
        d.prototype.setupTouchHandling = function () {
          var a = f.keyman.singleton,
            b = this.getDiv(),
            c = this.manager;
          a.util.device.touchable &&
            (b.addEventListener(
              "touchstart",
              function (a) {
                c.touchStart(a);
              },
              !0
            ),
            b.addEventListener(
              "touchend",
              function (a) {
                c.touchEnd(a);
              },
              !0
            ),
            b.addEventListener(
              "touchmove",
              function (a) {
                c.touchMove(a);
              },
              !1
            ));
        };
        d.prototype.activate = function () {
          var a = f.keyman.singleton,
            b = this.manager;
          a.modelManager.addEventListener("invalidatesuggestions", b.invalidateSuggestions);
          a.modelManager.addEventListener("suggestionsready", b.updateSuggestions);
          a.modelManager.addEventListener("tryaccept", b.tryAccept);
          a.modelManager.addEventListener("tryrevert", b.tryRevert);
          a.modelManager.predict();
        };
        d.prototype.deactivate = function () {
          var a = f.keyman.singleton,
            b = this.manager;
          a.modelManager.removeEventListener("invalidatesuggestions", b.invalidateSuggestions);
          a.modelManager.removeEventListener("suggestionsready", b.updateSuggestions);
          a.modelManager.removeEventListener("tryaccept", b.tryAccept);
          a.modelManager.removeEventListener("tryrevert", b.tryRevert);
        };
        d.prototype.rotateSuggestions = function () {
          this.manager.rotateSuggestions();
        };
        d.SUGGESTION_LIMIT = 3;
        d.MARGIN = 1;
        d.TOUCHED_CLASS = "kmw-suggest-touched";
        d.BANNER_CLASS = "kmw-suggest-banner";
        return d;
      })(r);
      k.SuggestionBanner = d;
      var c = (function (b) {
        function c(a, c) {
          a = b.call(this, a, r.BANNER_CLASS, d.TOUCHED_CLASS) || this;
          a.initNewContext = !0;
          a.currentSuggestions = [];
          a.recentAccept = !1;
          a.preAccept = null;
          a.swallowPrediction = !1;
          a.doRevert = !1;
          a.recentRevert = !1;
          a.rejectedSuggestions = [];
          a._applyReversion = function () {
            var a = f.keyman.singleton,
              b = g.text.Processor.getOutputTarget(),
              c = this.preAccept,
              d = g.text.Mock.from(c.preInput);
            d.apply(c.transform);
            c = d.buildTransformFrom(b);
            b.apply(c);
            if (a.oninserttext && a.isEmbedded) a.oninserttext(c.deleteLeft, c.insert, c.deleteRight);
            this.currentSuggestions = this.previousSuggestions;
            this.currentTranscriptionID = this.previousTranscriptionID;
            a = this.currentSuggestions.indexOf(this.recentAccepted);
            -1 != a && (this.rejectedSuggestions.push(this.recentAccepted), this.currentSuggestions.splice(a, 1));
            this.doRevert = this.recentAccept = !1;
            this.recentRevert = !0;
            this.doUpdate();
          }.bind(a);
          a.tryAccept = function (a) {
            return !this.recentAccept && this.selected ? (this.doAccept(this.selected), !1) : this.recentAccept && "space" == a ? (this.recentAccept = !1) : !0;
          }.bind(a);
          a.tryRevert = function () {
            this.doRevert ? (this.recentAccept = this.doRevert = !1) : this.recentAccept && (this.showRevert(), (this.swallowPrediction = !0));
            return !0;
          }.bind(a);
          a.invalidateSuggestions = function (a) {
            this.initNewContext = !1;
            (this.swallowPrediction && "context" != a) || ((this.recentRevert = this.doRevert = this.recentAccept = !1), (this.rejectedSuggestions = []), "context" == a && ((this.swallowPrediction = !1), (this.initNewContext = !0)));
            this.options.forEach(function (a) {
              a.update(null);
            });
          }.bind(a);
          a.updateSuggestions = function (a) {
            var b = a.suggestions;
            this.currentSuggestions = b;
            this.currentTranscriptionID = a.transcriptionID;
            for (a = 0; a < b.length; a++) {
              var c = b[a];
              "keep" == c.tag && (this.keepSuggestion = c);
            }
            this.keepSuggestion && this.currentSuggestions.splice(this.currentSuggestions.indexOf(this.keepSuggestion), 1);
            this.swallowPrediction ? (this.swallowPrediction = !1) : ((this.recentRevert = this.doRevert = this.recentAccept = !1), (this.rejectedSuggestions = []));
            this.doUpdate();
          }.bind(a);
          a.options = c;
          return a;
        }
        __extends(c, b);
        c.prototype.findTargetFrom = function (a) {
          var b = f.keyman.singleton.util;
          try {
            if (a) {
              if (b.hasClass(a, "kmw-suggest-option")) return a;
              if (a.parentNode && b.hasClass(a.parentNode, "kmw-suggest-option")) return a.parentNode;
            }
          } catch (q) {}
          return null;
        };
        c.prototype.highlight = function (b, c) {
          var e = b.className,
            h = " " + d.TOUCHED_CLASS;
          -1 == b.id.indexOf(a.BASE_ID) ? console.warn("Cannot find BannerSuggestion object for element to highlight!") : (this.selected = b.suggestion).isEmpty() && ((c = !1), (this.selected = null));
          c && 0 > e.indexOf(h) ? (b.className = e + h) : (b.className = e.replace(h, ""));
        };
        c.prototype.select = function (a) {
          this.doAccept(a.suggestion);
        };
        c.prototype.hold = function (a) {
          a = a.suggestion;
          var b = -1 == this.currentSuggestions.indexOf(a.suggestion);
          this.platformHold && this.platformHold(a, b);
        };
        c.prototype.clearHolds = function () {};
        c.prototype.hasModalPopup = function () {
          return f.keyman.singleton.osk.vkbd.popupVisible;
        };
        c.prototype.dealiasSubTarget = function (a) {
          return a;
        };
        c.prototype.hasSubmenu = function (a) {
          return !1;
        };
        c.prototype.isSubmenuActive = function () {
          return !1;
        };
        c.prototype.displaySubmenuFor = function (a) {
          throw Error("Method not implemented.");
        };
        c.prototype.doAccept = function (a) {
          var b = a.apply(),
            c = b[0];
          b = b[1];
          var d = this;
          c &&
            ((this.preAccept = c),
            b.then(function (a) {
              d.preAcceptText = a;
            }),
            (this.selected = null),
            (this.recentAccept = !0),
            (this.recentRevert = this.doRevert = !1),
            (this.recentAccepted = a.suggestion),
            (this.previousSuggestions = this.currentSuggestions),
            (this.previousTranscriptionID = this.currentTranscriptionID),
            (a = f.keyman.singleton),
            (this.swallowPrediction = !0),
            a.modelManager.predict());
        };
        c.prototype.showRevert = function () {
          this.revertSuggestion = { transform: null, displayAs: '"' + this.preAcceptText + '"' };
          this.doRevert = !0;
          this.doUpdate();
        };
        c.prototype.activateKeep = function () {
          return !this.recentAccept && !this.recentRevert && !this.initNewContext;
        };
        c.prototype.doUpdate = function () {
          var a = this,
            b = [];
          this.activateKeep() && this.keepSuggestion ? b.push(this.keepSuggestion) : this.doRevert && b.push(this.revertSuggestion);
          b = b.concat(this.currentSuggestions);
          this.options.forEach(function (c, d) {
            d < b.length ? c.update(b[d], 0 == d && a.doRevert ? a._applyReversion : null) : c.update(null);
          });
        };
        c.prototype.rotateSuggestions = function () {
          if (0 < this.currentSuggestions.length) {
            var a = d.SUGGESTION_LIMIT - (this.activateKeep() ? 1 : 0);
            a = this.currentSuggestions.splice(0, a);
            this.rejectedSuggestions = this.rejectedSuggestions.concat(a);
          }
          0 == this.currentSuggestions.length && ((this.currentSuggestions = this.rejectedSuggestions), (this.rejectedSuggestions = []));
          this.doUpdate();
        };
        return c;
      })(g.dom.UITouchHandlerBase);
      k.SuggestionManager = c;
    })(g.osk || (g.osk = {}));
  })(f.keyman || (f.keyman = {}));
})(com || (com = {}));
(function (f) {
  (function (g) {
    (function (g) {
      var k = (function () {
        function e() {
          this._options = {};
          this.imagePath = "";
          this.constructContainer();
          this.setOptions(e.DEFAULT_OPTIONS);
          f.keyman.singleton.modelManager.addEventListener("modelchange", this.selectBanner.bind(this));
        }
        e.prototype.constructContainer = function () {
          var a = f.keyman.singleton.util._CreateElement("div");
          a.id = "keymanweb_banner_container";
          a.className = "kmw-banner-container";
          return (this.bannerContainer = a);
        };
        Object.defineProperty(e.prototype, "element", {
          get: function () {
            return this.bannerContainer;
          },
          enumerable: !0,
          configurable: !0,
        });
        e.prototype.getOptions = function () {
          var a = {},
            d;
          for (d in this._options) a[d] = this._options[d];
          return a;
        };
        e.prototype.setOptions = function (a) {
          var d = f.keyman.singleton,
            c;
          for (c in a) {
            switch (c) {
              case "alwaysShow":
                this.alwaysShow = a[c];
                break;
              case "mayPredict":
                d.modelManager.mayPredict = a[c];
                break;
              case "mayCorrect":
                d.modelManager.mayCorrect = a[c];
                break;
              case "imagePath":
                this.imagePath = a[c];
            }
            this._options[c] = a[c];
          }
          this.selectBanner();
        };
        e.prototype.appendStyles = function () {
          this.activeBanner && this.activeBanner.appendStyleSheet();
        };
        e.prototype.setBanner = function (a, d) {
          switch (a) {
            case "blank":
              d = new g.BlankBanner();
              break;
            case "image":
              d = new g.ImageBanner(this.imagePath, g.Banner.DEFAULT_HEIGHT);
              break;
            case "suggestion":
              d = new g.SuggestionBanner(d);
              break;
            default:
              throw Error("Invalid type specified for the banner!");
          }
          this._activeType = a;
          d && (this._setBanner(d), d.activate());
        };
        e.prototype.selectBanner = function (a) {
          f.keyman.singleton.modelManager.activeModel ? this.setBanner("suggestion") : this.alwaysShow ? this.setBanner("image") : this.setBanner("blank");
        };
        e.prototype._setBanner = function (a) {
          if (this.activeBanner) {
            if (a == this.activeBanner) return;
            var d = this.activeBanner;
            d.deactivate();
            this.bannerContainer.replaceChild(a.getDiv(), d.getDiv());
          }
          this.activeBanner = a;
          this.bannerContainer.appendChild(a.getDiv());
          f.keyman.singleton.osk._Show();
        };
        Object.defineProperty(e.prototype, "activeType", {
          get: function () {
            return this._activeType;
          },
          enumerable: !0,
          configurable: !0,
        });
        Object.defineProperty(e.prototype, "height", {
          get: function () {
            return this.activeBanner ? this.activeBanner.height : 0;
          },
          set: function (a) {
            this.activeBanner && (this.activeBanner.height = a);
          },
          enumerable: !0,
          configurable: !0,
        });
        e.DEFAULT_OPTIONS = { alwaysShow: !1, mayPredict: !0, mayCorrect: !0, imagePath: "" };
        return e;
      })();
      g.BannerManager = k;
    })(g.osk || (g.osk = {}));
  })(f.keyman || (f.keyman = {}));
})(com || (com = {}));
(function (f) {
  (function (g) {
    (function (k) {
      var r = (function () {
        function e() {
          this.ready = !1;
          this.loadRetry = 0;
          this._Visible = !1;
          this._Enabled = !0;
          this.vpScale = 1;
          this.noDrag = this.userPositioned = !1;
          this.modifierCodes = g.text.Codes.modifierCodes;
          this.modifierBitmasks = g.text.Codes.modifierBitmasks;
          this.stateBitmasks = g.text.Codes.stateBitmasks;
          this.keyCodes = g.text.Codes.keyCodes;
          this.restorePosition = function () {
            this._Visible && (f.keyman.singleton.domManager.focusLastActiveElement(), this.loadCookie(), (this.userPositioned = !1), this.saveCookie(), this._Show(), this.doResizeMove());
            this.pinImg && (this.pinImg.style.display = "none");
            window.event && (window.event.returnValue = !1);
          }.bind(this);
          this._VKbdMouseOver = function (a) {
            f.keyman.singleton.uiManager.setActivatingUI(!0);
          }.bind(this);
          this._VKbdMouseOut = function (a) {
            f.keyman.singleton.uiManager.setActivatingUI(!1);
          }.bind(this);
          this._VResizeMouseOver = this._VResizeMouseOut = function (a) {
            a = f.keyman.singleton._GetEventObject(a);
            if (!a) return !1;
            a && a.preventDefault && a.preventDefault();
            var d = this.getRect();
            this.width = d.width;
            this.height = d.height;
            a.cancelBubble = !0;
            return !1;
          }.bind(this);
          this._VResizeMouseDown = function (a) {
            var d = f.keyman.singleton;
            d.uiManager.justActivated = !0;
            a = d._GetEventObject(a);
            if (!a) return !0;
            this.resizing = !0;
            if (a.pageX) {
              var c = a.pageX;
              var b = a.pageY;
            } else a.clientX && ((c = a.clientX + document.body.scrollLeft), (b = a.clientY + document.body.scrollTop));
            this._ResizeMouseX = c;
            this._ResizeMouseY = b;
            document.onmousemove != this._VResizeMouseMove && document.onmousemove != this._VMoveMouseMove && ((this._VPreviousMouseMove = document.onmousemove), (this._VPreviousMouseUp = document.onmouseup));
            this._VPreviousCursor = document.body.style.cursor;
            this._VPreviousMouseButton = "undefined" == typeof a.which ? a.button : a.which;
            this._VOriginalWidth = this.vkbd.kbdDiv.offsetWidth;
            this._VOriginalHeight = this.vkbd.kbdDiv.offsetHeight;
            document.onmousemove = this._VResizeMouseMove;
            document.onmouseup = this._VResizeMoveMouseUp;
            document.body.style.cursor && (document.body.style.cursor = "se-resize");
            a && a.preventDefault && a.preventDefault();
            a.cancelBubble = !0;
            return !1;
          }.bind(this);
          this._VResizeMouseMove = function (a) {
            a = f.keyman.singleton._GetEventObject(a);
            if (!a) return !0;
            this.resizing = !0;
            if (this._VPreviousMouseButton != ("undefined" == typeof a.which ? a.button : a.which)) return this._VResizeMoveMouseUp(a);
            if (a.pageX) {
              var d = a.pageX;
              var c = a.pageY;
            } else a.clientX && ((d = a.clientX + document.body.scrollLeft), (c = a.clientY + document.body.scrollTop));
            d = this._VOriginalWidth + d - this._ResizeMouseX;
            c = this._VOriginalHeight + c - this._ResizeMouseY;
            d < 0.2 * screen.width && (d = 0.2 * screen.width);
            c < 0.1 * screen.height && (c = 0.1 * screen.height);
            d > 0.9 * screen.width && (d = 0.9 * screen.width);
            c > 0.5 * screen.height && (d = 0.5 * screen.height);
            this.vkbd.kbdDiv.style.width = d + "px";
            this.vkbd.kbdDiv.style.height = c + "px";
            this.vkbd.kbdDiv.style.fontSize = c / 8 + "px";
            a && a.preventDefault && a.preventDefault();
            a.cancelBubble = !0;
            return !1;
          }.bind(this);
          this._VMoveMouseDown = function (a) {
            var d = f.keyman.singleton;
            d.uiManager.justActivated = !0;
            a = d._GetEventObject(a);
            if (!a) return !0;
            this.resizing = !0;
            if (a.pageX) {
              var c = a.pageX;
              var b = a.pageY;
            } else a.clientX && ((c = a.clientX + document.body.scrollLeft), (b = a.clientY + document.body.scrollTop));
            document.onmousemove != this._VResizeMouseMove && document.onmousemove != this._VMoveMouseMove && ((this._VPreviousMouseMove = document.onmousemove), (this._VPreviousMouseUp = document.onmouseup));
            this._VPreviousCursor = document.body.style.cursor;
            this._VPreviousMouseButton = "undefined" == typeof a.which ? a.button : a.which;
            this._VMoveX = c - this._Box.offsetLeft;
            this._VMoveY = b - this._Box.offsetTop;
            d.keyboardManager.isCJK() && (this.pinImg.style.left = "15px");
            document.onmousemove = this._VMoveMouseMove;
            document.onmouseup = this._VResizeMoveMouseUp;
            document.body.style.cursor && (document.body.style.cursor = "move");
            a && a.preventDefault && a.preventDefault();
            a.cancelBubble = !0;
            return !1;
          }.bind(this);
          this._VMoveMouseMove = function (a) {
            a = f.keyman.singleton._GetEventObject(a);
            if (!a || this.noDrag) return !0;
            this.userPositioned = this.resizing = !0;
            this.pinImg.style.display = "block";
            if (this._VPreviousMouseButton != ("undefined" == typeof a.which ? a.button : a.which)) return this._VResizeMoveMouseUp(a);
            if (a.pageX) {
              var d = a.pageX;
              var c = a.pageY;
            } else a.clientX && ((d = a.clientX + document.body.scrollLeft), (c = a.clientY + document.body.scrollTop));
            this._Box.style.left = d - this._VMoveX + "px";
            this._Box.style.top = c - this._VMoveY + "px";
            a && a.preventDefault && a.preventDefault();
            d = this.getRect();
            this.width = d.width;
            this.height = d.height;
            a.cancelBubble = !0;
            return !1;
          }.bind(this);
          this._VResizeMoveMouseUp = function (a) {
            var d = f.keyman.singleton;
            a = d._GetEventObject(a);
            if (!a) return !0;
            this.resizing = !1;
            this.vkbd && (this.vkbd.currentKey = null);
            document.onmousemove = this._VPreviousMouseMove;
            document.onmouseup = this._VPreviousMouseUp;
            document.body.style.cursor && (document.body.style.cursor = this._VPreviousCursor);
            d.domManager.focusLastActiveElement();
            a && a.preventDefault && a.preventDefault();
            d.uiManager.justActivated = !1;
            d.uiManager.setActivatingUI(!1);
            this.vkbd && ((this._VOriginalWidth = this.vkbd.kbdDiv.offsetWidth), (this._VOriginalHeight = this.vkbd.kbdDiv.offsetHeight));
            this.doResizeMove();
            a.cancelBubble = !0;
            this.saveCookie();
            return !1;
          }.bind(this);
          this.hideNow = function () {
            this._Box.removeEventListener("transitionend", this.hideNow, !1);
            this._Box.removeEventListener("webkitTransitionEnd", this.hideNow, !1);
            if (!(0 <= document.body.className.indexOf("osk-always-visible"))) {
              var a = this._Box.style;
              a.display = "none";
              a.opacity = "1";
              this._Visible = !1;
              a.transition = a.msTransition = a.MozTransition = a.WebkitTransition = "";
              if (this.vkbd) this.vkbd.onHide();
            }
          }.bind(this);
        }
        e.prototype.prepare = function () {
          var a = f.keyman.singleton,
            d = a.util;
          if (a.initialized) {
            if (
              !this.ready &&
              ((this._Box = d._CreateElement("div")),
              document.body.appendChild(this._Box),
              d.linkStyleSheet(a.getStyleSheetPath("kmwosk.css")),
              d.attachDOMEvent(this._Box, "mousedown", function (b) {
                a.uiManager.setActivatingUI(!0);
                return !1;
              }),
              d.device.touchable)
            ) {
              var c = function (a) {
                a.cancelable && a.preventDefault();
                a.stopPropagation();
                return !1;
              };
              d.attachDOMEvent(this._Box, "touchstart", function (b) {
                a.uiManager.setActivatingUI(!0);
                return c(b);
              });
              d.attachDOMEvent(this._Box, "touchend", c);
              d.attachDOMEvent(this._Box, "touchmove", c);
              d.attachDOMEvent(this._Box, "touchcancel", c);
              this.vpScale = d.getViewportScale();
            }
            this.loadCookie();
            this.banner = new k.BannerManager();
            this.ready = !0;
          } else window.setTimeout(this.prepare.bind(this), 200);
        };
        e.prototype._Unload = function () {
          this._Box = this.banner = this.vkbd = null;
        };
        e.prototype._Load = function () {
          var a = f.keyman.singleton,
            d = a.util,
            c = d.device,
            b = a.keyboardManager.activeKeyboard;
          if (null == this._Box) 99 <= this.loadRetry || (window.setTimeout(this._Load.bind(this), 100), this.loadRetry++);
          else {
            this.loadRetry = 0;
            a._TitleElement && (a._TitleElement.innerHTML = "KeymanWeb");
            this._Visible = !1;
            var e = this._Box.style;
            e.zIndex = "9999";
            e.display = "none";
            e.width = c.touchable ? "100%" : "auto";
            e.position = "desktop" == c.formFactor ? "absolute" : "fixed";
            if (c.touchable) {
              var g = 1;
              if ("phone" == c.formFactor) g = 1.92 * (a.isEmbedded ? 0.65 : 0.6);
              else {
                var r = 1;
                "Android" == c.OS && "devicePixelRatio" in window && (r = window.devicePixelRatio);
                g = "Android" == c.OS && "tablet" == c.formFactor && this.getHeight() < 300 * r ? 1.2 * g : 2 * g;
              }
              e.fontSize = g + "em";
            }
            this.vkbd = null;
            this._Box.innerHTML = "";
            this._Box.onmouseover = this._VKbdMouseOver;
            this._Box.onmouseout = this._VKbdMouseOut;
            if (null != b || c.touchable) {
              g = null;
              r = null;
              e = "";
              this._Box.className = "";
              if (null != b) {
                g = b.KV;
                e = b.KH;
                var q = b.KVKL;
                "undefined" != typeof q &&
                  null != q &&
                  ((r = q[c.formFactor]), "undefined" == typeof r || null == r) &&
                  ("phone" == c.formFactor ? (r = q.tablet) : "tablet" == c.formFactor && (r = q.phone), "undefined" == typeof r || null == r) &&
                  (r = q.desktop);
              }
              if (null != g && null != g.BK) {
                q = g.BK;
                for (var z = !0, m = 0; m < q.length; m++)
                  if (0 < q[m].length) {
                    z = !1;
                    break;
                  }
                z && (g = null);
              }
              null != g || "" == e || c.touchable
                ? (null == g && (g = { F: "Tahoma", BK: k.Layouts.dfltText }), this._GenerateVisualKeyboard(g, e, r, a.keyboardManager.getKeyboardModifierBitmask()))
                : ((c = d._CreateElement("div")),
                  (c.className = "kmw-title-bar"),
                  c.appendChild(this._TitleBarInterior()),
                  (c.onmousedown = this._VMoveMouseDown),
                  this._Box.appendChild(c),
                  (c = d._CreateElement("div")),
                  (c.className = "kmw-osk-static"),
                  (c.innerHTML = e),
                  this._Box.appendChild(c),
                  b.KHF && b.KHF(this._Box));
              a._TitleElement && ((a._TitleElement.innerHTML = "<span style='font-weight:bold'>" + b.KN + "</span> - " + a._TitleElement.innerHTML), (a._TitleElement.className = ""), (a._TitleElement.style.color = "#fff"));
            } else
              (c = d._CreateElement("div")),
                (c.className = "kmw-title-bar"),
                c.appendChild(this._TitleBarInterior()),
                (c.onmousedown = this._VMoveMouseDown),
                this._Box.appendChild(c),
                (c = d._CreateElement("div")),
                (c.className = "kmw-osk-none"),
                this._Box.appendChild(c);
            a = this._Box.firstChild;
            b = " kmw-keyboard-" + (b ? b.KI.replace("Keyboard_", "") : "");
            "keymanweb_title_bar" == a.id ? (a = a.nextSibling.nextSibling) : "keymanweb_banner_container" == a.id && (a = a.nextSibling);
            a.className = "kmw-osk-inner-frame" + b;
            this.banner.appendStyles();
            this.vkbd && (this.vkbd.createKeyTip(), this.vkbd.appendStyleSheet());
            this._Enabled && this._Show();
          }
        };
        e.prototype._GenerateVisualKeyboard = function (a, d, c, b) {
          this.vkbd = new f.keyman.osk.VisualKeyboard(a, d, c, b);
          a = f.keyman.singleton.util;
          this._Box.className = a.device.formFactor + " " + a.device.OS.toLowerCase() + " kmw-osk-frame";
          "desktop" == a.device.formFactor && this._Box.appendChild(this.controlBar());
          this.banner && this._Box.appendChild(this.banner.element);
          this._Box.appendChild(this.vkbd.kbdDiv);
          "desktop" == a.device.formFactor ? this._Box.appendChild(this.resizeBar()) : this.vkbd.adjustHeights();
        };
        e.prototype.controlBar = function () {
          var a = f.keyman.singleton,
            d = a.util,
            c = d._CreateElement("div"),
            b = "";
          c.id = "keymanweb_title_bar";
          c.className = "kmw-title-bar";
          c.onmousedown = this._VMoveMouseDown;
          a.keyboardManager.activeKeyboard && (b = a.keyboardManager.activeKeyboard.KN);
          a = d._CreateElement("span");
          a.className = "kmw-title-bar-caption";
          a.innerHTML = b;
          c.appendChild(a);
          b = this.closeButton = d._CreateElement("div");
          b.id = "kmw-close-button";
          b.className = "kmw-title-bar-image";
          b.onmousedown = d._CancelMouse;
          b.onclick = function () {
            this._Hide(!0);
          }.bind(this);
          c.appendChild(b);
          b = this.helpImg = d._CreateElement("div");
          b.id = "kmw-help-image";
          b.className = "kmw-title-bar-image";
          b.title = "KeymanWeb Help";
          b.onclick = function () {
            d.callEvent("osk.helpclick", {});
            window.event && (window.event.returnValue = !1);
            return !1;
          };
          b.onmousedown = d._CancelMouse;
          c.appendChild(b);
          b = this.configImg = d._CreateElement("div");
          b.id = "kmw-config-image";
          b.className = "kmw-title-bar-image";
          b.title = "KeymanWeb Configuration Options";
          b.onclick = function () {
            d.callEvent("osk.configclick", {});
            window.event && (window.event.returnValue = !1);
            return !1;
          };
          b.onmousedown = d._CancelMouse;
          c.appendChild(b);
          b = this.pinImg = d._CreateElement("div");
          b.id = "kmw-pin-image";
          b.className = "kmw-title-bar-image";
          b.title = "Pin the On Screen Keyboard to its default location on the active text box";
          b.onclick = function () {
            this.loadCookie();
            this.userPositioned = !1;
            this.saveCookie();
            this._Show();
            this.doResizeMove();
            this.pinImg && (this.pinImg.style.display = "none");
            window.event && (window.event.returnValue = !1);
            return !1;
          }.bind(this);
          b.onmousedown = d._CancelMouse;
          c.appendChild(b);
          return c;
        };
        e.prototype.resizeBar = function () {
          var a = f.keyman.singleton.util,
            d = a._CreateElement("div");
          d.className = "kmw-footer";
          d.onmousedown = a._CancelMouse;
          var c = a._CreateElement("div");
          c.className = "kmw-footer-caption";
          c.innerHTML = '<a href="https://keyman.com/developer/keymanweb/">KeymanWeb</a>';
          c.id = "keymanweb-osk-footer-caption";
          a.attachDOMEvent(
            c,
            "dblclick",
            function (a) {
              a && a.shiftKey && this.showBuild();
              return !1;
            }.bind(this),
            !1
          );
          "onselectstart" in c && (c.onselectstart = a.selectStartHandler);
          d.appendChild(c);
          a = a._CreateElement("div");
          a.className = "kmw-footer-resize";
          a.onmousedown = this._VResizeMouseDown;
          a.onmouseover = a.onmouseout = this._VResizeMouseOut;
          d.appendChild(a);
          this.resizeIcon = a;
          return d;
        };
        e.prototype.showBuild = function () {
          var a = f.keyman.singleton;
          a.util.alert("KeymanWeb Version " + a.version + "." + a.build + '<br /><br /><span style="font-size:0.8em">Copyright &copy; 2017 SIL International</span>');
        };
        e.prototype._TitleBarInterior = function () {
          var a = f.keyman.singleton,
            d = a.util,
            c = d._CreateElement("div"),
            b = c.style;
          b.paddingLeft = "2px";
          b.cursor = "move";
          b.background = "#ad4a28";
          b.font = "8pt Tahoma,Arial,sans-serif";
          b = d._CreateElement("div");
          b.className = "kmw-title-bar-actions";
          b.onmousedown = d._CancelMouse;
          var e = d._CreateElement("div");
          e.className = "kmw-close-button";
          e.onmousedown = d._CancelMouse;
          e.onclick = function () {
            this._Hide(!0);
          }.bind(this);
          this.closeButton = e;
          b.appendChild(e);
          e = this.pinImg = d._CreateElement("div");
          e.className = "kmw-pin-image";
          e.title = "Pin the On Screen Keyboard to its default location on the active text box";
          e.onclick = this.restorePosition;
          e.onmousedown = d._CancelMouse;
          e.style.display = "none";
          d.device.touchable || b.appendChild(e);
          c.appendChild(b);
          a = a._TitleElement = d._CreateElement("span");
          a.className = "kmw-title-bar-caption";
          a.innerHTML = "KeymanWeb";
          c.appendChild(a);
          return c;
        };
        e.prototype.isEnabled = function () {
          return this._Enabled;
        };
        e.prototype.isVisible = function () {
          return this._Visible;
        };
        e.prototype.saveCookie = function () {
          var a = f.keyman.singleton.util,
            d = a.loadCookie("KeymanWeb_OnScreenKeyboard"),
            c = this.getPos();
          d.visible = this._Enabled ? 1 : 0;
          d.userSet = this.userPositioned ? 1 : 0;
          d.left = c.left;
          d.top = c.top;
          this.vkbd && ((d.width = this.width), (d.height = this.height));
          a.saveCookie("KeymanWeb_OnScreenKeyboard", d);
        };
        e.prototype.loadCookie = function () {
          var a = f.keyman.singleton.util,
            d = a.loadCookie("KeymanWeb_OnScreenKeyboard");
          if ("undefined" == typeof d || null == d) return (this.userPositioned = !1);
          this._Enabled = 1 == a.toNumber(d.visible, 1);
          this.userPositioned = 1 == a.toNumber(d.userSet, 0);
          this.x = a.toNumber(d.left, -1);
          this.y = a.toNumber(d.top, -1);
          var c = a.toNumber(d.width, 0.3 * screen.width);
          a = a.toNumber(d.height, 0.15 * screen.height);
          c < 0.2 * screen.width && (c = 0.2 * screen.width);
          a < 0.1 * screen.height && (a = 0.1 * screen.height);
          c > 0.9 * screen.width && (c = 0.9 * screen.width);
          a > 0.5 * screen.height && (a = 0.5 * screen.height);
          this.vkbd && ((this.vkbd.kbdDiv.style.width = c + "px"), (this.vkbd.kbdDiv.style.height = a + "px"), (this.vkbd.kbdDiv.style.fontSize = a / 8 + "px"));
          (-1 != this.x && -1 != this.y && this._Box) || (this.userPositioned = !1);
          this.x < window.pageXOffset - 0.8 * c && (this.x = window.pageXOffset - 0.8 * c);
          0 > this.y && ((this.y = this.x = -1), (this.userPositioned = !1));
          this.userPositioned && this._Box && this.setPos({ left: this.x, top: this.y });
          return !0;
        };
        e.prototype.getWidthFromCookie = function () {
          var a = f.keyman.singleton.util,
            d = a.loadCookie("KeymanWeb_OnScreenKeyboard");
          if ("undefined" == typeof d || null == d) return 0.3 * screen.width;
          a = a.toNumber(d.width, 0.3 * screen.width);
          a < 0.2 * screen.width ? (a = 0.2 * screen.width) : a > 0.9 * screen.width && (a = 0.9 * screen.width);
          return a;
        };
        e.prototype.getBannerHeight = function () {
          return null != this.banner ? this.banner.height : 0;
        };
        e.prototype.getKeyboardHeight = function () {
          var a = f.keyman.singleton,
            d = a.util.device;
          if ("function" == typeof a.getOskHeight) return a.getOskHeight();
          var c = Math.floor(Math.min(screen.availHeight, screen.availWidth) / 2);
          if ("phone" == d.formFactor) {
            var b = Math.min(screen.height, screen.width),
              e = Math.max(screen.height, screen.width);
            c = a.util.portraitView() ? Math.floor(Math.max(screen.availHeight, screen.availWidth) / 3) : ((e / b) * c) / 1.6;
          }
          "iOS" == d.OS && (c /= a.util.getViewportScale());
          "Android" == d.OS && "phone" == d.formFactor && "devicePixelRatio" in window && /Firefox|Chrome|OPR/.test(navigator.userAgent) && (c *= window.devicePixelRatio);
          return c;
        };
        e.prototype.getHeight = function () {
          return this.getBannerHeight() + this.getKeyboardHeight();
        };
        e.prototype.getWidth = function () {
          var a = f.keyman.singleton,
            d = a.util.device;
          if ("function" == typeof a.getOskWidth) return a.getOskWidth();
          if ("iOS" == d.OS) var c = window.innerWidth;
          else if ("Android" == d.OS)
            try {
              c = document.documentElement.clientWidth;
            } catch (b) {
              c = screen.availWidth;
            }
          else c = screen.width;
          return c;
        };
        e.prototype.doResizeMove = function (a) {
          return f.keyman.singleton.util.callEvent("osk.resizemove", a);
        };
        e.prototype.getRect = function () {
          var a = {};
          this.vkbd
            ? ((a.left = a.left = g.dom.Utils.getAbsoluteX(this.vkbd.kbdDiv)),
              (a.top = a.top = g.dom.Utils.getAbsoluteY(this.vkbd.kbdDiv)),
              (a.width = a.width = g.dom.Utils.getAbsoluteX(this.vkbd.kbdHelpDiv) - g.dom.Utils.getAbsoluteX(this.vkbd.kbdDiv) + this.vkbd.kbdHelpDiv.offsetWidth),
              (a.height = a.height = g.dom.Utils.getAbsoluteY(this.vkbd.kbdHelpDiv) - g.dom.Utils.getAbsoluteY(this.vkbd.kbdDiv) + this.vkbd.kbdHelpDiv.offsetHeight))
            : ((a.left = a.left = g.dom.Utils.getAbsoluteX(this._Box)),
              (a.top = a.top = g.dom.Utils.getAbsoluteY(this._Box)),
              (a.width = a.width = g.dom.Utils.getAbsoluteX(this._Box) + this._Box.offsetWidth),
              (a.height = a.height = g.dom.Utils.getAbsoluteY(this._Box) + this._Box.offsetHeight));
          return a;
        };
        e.prototype.setRect = function (a) {
          var d = f.keyman.singleton.util;
          if (null != this._Box && "desktop" == d.device.formFactor) {
            d = this._Box;
            var c = d.style;
            "left" in a && ((c.left = a.left - g.dom.Utils.getAbsoluteX(d) + d.offsetLeft + "px"), (this.dfltX = c.left));
            "top" in a && ((c.top = a.top - g.dom.Utils.getAbsoluteY(d) + d.offsetTop + "px"), (this.dfltY = c.top));
            if (null != this.vkbd) {
              var b = this.vkbd.kbdDiv;
              c = b.style;
              if ("width" in a) {
                var e = a.width - (d.offsetWidth - b.offsetWidth);
                e < 0.2 * screen.width && (e = 0.2 * screen.width);
                e > 0.9 * screen.width && (e = 0.9 * screen.width);
                c.width = e + "px";
                this.width = e;
              }
              "height" in a &&
                ((d = a.height - (d.offsetHeight - b.offsetHeight)),
                d < 0.1 * screen.height && (d = 0.1 * screen.height),
                d > 0.5 * screen.height && (d = 0.5 * screen.height),
                (c.height = d + "px"),
                (c.fontSize = d / 8 + "px"),
                (this.height = d));
              "nosize" in a && this.resizeIcon && (this.resizeIcon.style.display = a.nosize ? "none" : "block");
            }
            "nomove" in a && ((this.noDrag = a.nomove), this.pinImg && (this.pinImg.style.display = a.nomove || !this.userPositioned ? "none" : "block"));
            this.saveCookie();
          }
        };
        e.prototype.getPos = function () {
          var a = this._Box;
          return { left: this._Visible ? a.offsetLeft : this.x, top: this._Visible ? a.offsetTop : this.y };
        };
        e.prototype.setPos = function (a) {
          if ("undefined" != typeof this._Box && !f.keyman.singleton.util.device.touchable) {
            if (this.userPositioned) {
              var d = a.left;
              a = a.top;
              "undefined" != typeof d && (d < -0.8 * this._Box.offsetWidth && (d = -0.8 * this._Box.offsetWidth), this.userPositioned && ((this._Box.style.left = d + "px"), (this.x = d)));
              "undefined" != typeof a && (0 > a && (a = 0), this.userPositioned && ((this._Box.style.top = a + "px"), (this.y = a)));
            }
            this.pinImg && (this.pinImg.style.display = this.userPositioned ? "block" : "none");
          }
        };
        e.prototype._Show = function (a, d) {
          var c = f.keyman.singleton,
            b = c.util.device;
          if (null != this._Box && null != c.domManager.getActiveElement() && (b.touchable || (null != c.keyboardManager.activeKeyboard && this._Enabled))) {
            var e = this._Box.style;
            b.touchable && "" == e.bottom && (e.visibility = "hidden");
            b.touchable && (e.opacity = "1");
            if (this.vkbd && this.vkbd.ddOSK && (this.vkbd.show(), b.touchable)) {
              e.position = "fixed";
              e.left = e.bottom = "0px";
              var n = this.vkbd.kbdDiv.firstChild.style.height;
              n = n.substr(0, n.indexOf("px"));
              e.height = e.maxHeight = this.getBannerHeight() + parseInt(n, 10) + 5 + "px";
              e.border = "none";
              e.borderTop = "1px solid gray";
              this._Visible = this._Enabled = !0;
            }
            e.display = "block";
            this.vkbd && this.vkbd.showLanguage();
            "desktop" == b.formFactor &&
              ((e.position = "absolute"),
              (e.display = "block"),
              (e.left = "0px"),
              this.loadCookie(),
              0 <= a
                ? ((e.left = a + "px"), (e.top = d + "px"))
                : this.userPositioned
                ? ((e.left = this.x + "px"), (e.top = this.y + "px"))
                : ((a = c.domManager.getActiveElement()),
                  (d = a.ownerDocument),
                  "on" == d.designMode && d.defaultView && d.defaultView.frameElement && (a = d.defaultView.frameElement),
                  this.dfltX ? (e.left = this.dfltX) : "undefined" != typeof a && null != a && (e.left = g.dom.Utils.getAbsoluteX(a) + "px"),
                  this.dfltY ? (e.top = this.dfltY) : "undefined" != typeof a && null != a && (e.top = g.dom.Utils.getAbsoluteY(a) + a.offsetHeight + "px")),
              (this._Visible = this._Enabled = !0),
              this.vkbd && this.vkbd.kbdDiv && ((this.width = this.vkbd.kbdDiv.offsetWidth), (this.height = this.vkbd.kbdDiv.offsetHeight)),
              this.saveCookie(),
              (a = this.pinImg),
              "undefined" != typeof a && null != a && (a.style.display = this.userPositioned ? "block" : "none"));
            "hidden" == e.visibility &&
              window.setTimeout(
                function () {
                  this._Box.style.visibility = "visible";
                }.bind(this),
                0
              );
            b.touchable || ((b = {}), (b.x = this._Box.offsetLeft), (b.y = this._Box.offsetTop), (b.userLocated = this.userPositioned), this.doShow(b));
          }
        };
        e.prototype._Hide = function (a) {
          var d = f.keyman.singleton,
            c = d.util.device;
          this._Box && "block" == this._Box.style.display && this.vkbd && this.vkbd.kbdDiv && ((this.width = this.vkbd.kbdDiv.offsetWidth), (this.height = this.vkbd.kbdDiv.offsetHeight));
          if (a) (this._Enabled = d.keyboardManager.isCJK() || c.touchable ? !0 : !1), this.saveCookie();
          else if ("desktop" == c.formFactor && 0 <= document.body.className.indexOf("osk-always-visible")) return;
          this._Visible = !1;
          this._Box && c.touchable && 0 < this._Box.offsetHeight
            ? ((c = this._Box.style),
              (c.transition = "string" == typeof c.MozBoxSizing ? "opacity 0.8s linear" : (c.msTransition = c.WebkitTransition = "opacity 0.5s linear 0")),
              window.setTimeout(
                function () {
                  var a = this._Box.style;
                  this._Visible
                    ? (a.transition = a.msTransition = a.MozTransition = a.WebkitTransition = "")
                    : ((a.opacity = "0"), this._Box.addEventListener("transitionend", this.hideNow, !1), this._Box.addEventListener("webkitTransitionEnd", this.hideNow, !1));
                }.bind(this),
                200
              ))
            : this._Box && (this._Box.style.display = "none");
          c = {};
          c.HiddenByUser = a;
          this.doHide(c);
          a && d.domManager.focusLastActiveElement();
        };
        e.prototype.hide = function () {
          this._Enabled = !1;
          this._Hide(!0);
        };
        e.prototype.doShow = function (a) {
          return f.keyman.singleton.util.callEvent("osk.show", a);
        };
        e.prototype.doHide = function (a) {
          return f.keyman.singleton.util.callEvent("osk.hide", a);
        };
        e.prototype.showLanguageMenu = function () {
          new k.LanguageMenu(f.keyman.singleton).show();
        };
        e.prototype.userLocated = function () {
          return this.userPositioned;
        };
        e.prototype.show = function (a) {
          0 < arguments.length ? ((this._Enabled = a) ? this._Show() : this._Hide(!0)) : this._Visible ? this._Hide(!0) : this._Show();
        };
        e.prototype.addEventListener = function (a, d) {
          return f.keyman.singleton.util.addEventListener("osk." + a, d);
        };
        e.prototype.shutdown = function () {
          var a = this._Box;
          a.parentElement && a.parentElement.removeChild(a);
        };
        return e;
      })();
      k.OSKManager = r;
    })(g.osk || (g.osk = {}));
  })(f.keyman || (f.keyman = {}));
})(com || (com = {}));
function LMLayerWorkerCode() {
  String.prototype.codePointAt ||
    (function () {
      var a = (function () {
          try {
            var a = {},
              c = Object.defineProperty,
              d = c(a, a, a) && c;
          } catch (w) {}
          return d;
        })(),
        c = function (a) {
          if (null == this) throw TypeError();
          var b = String(this),
            c = b.length,
            d = a ? Number(a) : 0;
          d != d && (d = 0);
          if (!(0 > d || d >= c)) return (a = b.charCodeAt(d)), 55296 <= a && 56319 >= a && c > d + 1 && ((b = b.charCodeAt(d + 1)), 56320 <= b && 57343 >= b) ? 1024 * (a - 55296) + b - 56320 + 65536 : a;
        };
      a ? a(String.prototype, "codePointAt", { value: c, configurable: !0, writable: !0 }) : (String.prototype.codePointAt = c);
    })();
  String.prototype.startsWith ||
    (function () {
      var a = (function () {
          try {
            var a = {},
              b = Object.defineProperty,
              c = b(a, a, a) && b;
          } catch (q) {}
          return c;
        })(),
        c = {}.toString,
        b = function (a) {
          if (null == this) throw TypeError();
          var b = String(this);
          if (a && "[object RegExp]" == c.call(a)) throw TypeError();
          var d = b.length,
            e = String(a),
            h = e.length,
            f = 1 < arguments.length ? arguments[1] : void 0;
          f = f ? Number(f) : 0;
          f != f && (f = 0);
          f = Math.min(Math.max(f, 0), d);
          if (h + f > d) return !1;
          for (d = -1; ++d < h; ) if (b.charCodeAt(f + d) != e.charCodeAt(d)) return !1;
          return !0;
        };
      a ? a(String.prototype, "startsWith", { value: b, configurable: !0, writable: !0 }) : (String.prototype.startsWith = b);
    })();
  Array.from ||
    (Array.from = (function () {
      var a = Object.prototype.toString,
        c = function (b) {
          return "function" === typeof b || "[object Function]" === a.call(b);
        },
        b = Math.pow(2, 53) - 1;
      return function (a) {
        var d = Object(a);
        if (null == a) throw new TypeError("Array.from requires an array-like object - not null or undefined");
        var e = 1 < arguments.length ? arguments[1] : void 0,
          f;
        if ("undefined" !== typeof e) {
          if (!c(e)) throw new TypeError("Array.from: when provided, the second argument must be a function");
          2 < arguments.length && (f = arguments[2]);
        }
        var h = Number(d.length);
        h = isNaN(h) ? 0 : 0 !== h && isFinite(h) ? (0 < h ? 1 : -1) * Math.floor(Math.abs(h)) : h;
        h = Math.min(Math.max(h, 0), b);
        for (var g = c(this) ? Object(new this(h)) : Array(h), k = 0, r; k < h; ) (r = d[k]), (g[k] = e ? ("undefined" === typeof f ? e(r, k) : e.call(f, r, k)) : r), (k += 1);
        g.length = h;
        return g;
      };
    })());
  String.kmwFromCharCode = function (a) {
    var c = [],
      b;
    for (b = 0; b < arguments.length; b++) {
      var d = Number(arguments[b]);
      if (!isFinite(d) || 0 > d || 1114111 < d || Math.floor(d) !== d) throw new RangeError("Invalid code point " + d);
      65536 > d ? c.push(d) : ((d -= 65536), c.push((d >> 10) + 55296), c.push((d % 1024) + 56320));
    }
    return String.fromCharCode.apply(void 0, c);
  };
  String.prototype.kmwCharCodeAt = function (a) {
    var c = String(this),
      b = 0;
    if (0 > a || a >= c.length) return NaN;
    for (var d = 0; d < a; d++) if (((b = c.kmwNextChar(b)), null === b)) return NaN;
    a = c.charCodeAt(b);
    return 55296 <= a && 56319 >= a && c.length > b + 1 && ((c = c.charCodeAt(b + 1)), 56320 <= c && 57343 >= c) ? ((a - 55296) << 10) + (c - 56320) + 65536 : a;
  };
  String.prototype.kmwIndexOf = function (a, c) {
    var b = String(this);
    a = b.indexOf(a, c);
    if (0 > a) return a;
    for (var d = (c = 0); null !== d && d < a; d = b.kmwNextChar(d)) c++;
    return c;
  };
  String.prototype.kmwLastIndexOf = function (a, c) {
    var b = String(this);
    a = b.lastIndexOf(a, c);
    if (0 > a) return a;
    for (var d = (c = 0); null !== d && d < a; d = b.kmwNextChar(d)) c++;
    return c;
  };
  String.prototype.kmwLength = function () {
    var a = String(this);
    if (0 == a.length) return 0;
    for (var c = 0, b = 0; null !== b; c++) b = a.kmwNextChar(b);
    return c;
  };
  String.prototype.kmwSlice = function (a, c) {
    var b = String(this);
    a = b.kmwCodePointToCodeUnit(a);
    c = b.kmwCodePointToCodeUnit(c);
    return null === a || null === c ? "" : b.slice(a, c);
  };
  String.prototype.kmwSubstr = function (a, c) {
    var b = String(this);
    0 > a && (a = b.kmwLength() + a);
    0 > a && (a = 0);
    var d = b.kmwCodePointToCodeUnit(a),
      e = d;
    if (null === d) return "";
    if (2 > arguments.length) e = b.length;
    else for (var f = 0; f < c; f++) e = b.kmwNextChar(e);
    return null === e ? b.substring(d) : b.substring(d, e);
  };
  String.prototype.kmwSubstring = function (a, c) {
    var b = String(this);
    if ("undefined" == typeof c) (a = b.kmwCodePointToCodeUnit(a)), (c = b.length);
    else {
      if (a > c) {
        var d = a;
        a = c;
        c = d;
      }
      a = b.kmwCodePointToCodeUnit(a);
      c = b.kmwCodePointToCodeUnit(c);
    }
    if (isNaN(a) || null === a) a = 0;
    if (isNaN(c) || null === c) c = b.length;
    return b.substring(a, c);
  };
  String.prototype.kmwNextChar = function (a) {
    var c = String(this);
    if (null === a || 0 > a || a >= c.length - 1) return null;
    var b = c.charCodeAt(a);
    return 55296 <= b && 56319 >= b && c.length > a + 1 && ((b = c.charCodeAt(a + 1)), 56320 <= b && 57343 >= b) ? (a == c.length - 2 ? null : a + 2) : a + 1;
  };
  String.prototype.kmwPrevChar = function (a) {
    var c = String(this);
    if (null == a || 0 >= a || a > c.length) return null;
    var b = c.charCodeAt(a - 1);
    return 56320 <= b && 57343 >= b && 1 < a && ((c = c.charCodeAt(a - 2)), 55296 <= c && 56319 >= c) ? a - 2 : a - 1;
  };
  String.prototype.kmwCodePointToCodeUnit = function (a) {
    if (null === a) return null;
    var c = String(this),
      b = 0;
    if (0 > a) {
      b = c.length;
      for (var d = 0; d > a; d--) b = c.kmwPrevChar(b);
      return b;
    }
    if (a == c.kmwLength()) return c.length;
    for (d = 0; d < a; d++) b = c.kmwNextChar(b);
    return b;
  };
  String.prototype.kmwCodeUnitToCodePoint = function (a) {
    var c = String(this);
    return null === a ? null : 0 == a ? 0 : 0 > a ? c.substr(a).kmwLength() : c.substr(0, a).kmwLength();
  };
  String.prototype.kmwCharAt = function (a) {
    var c = String(this);
    return 0 <= a ? c.kmwSubstr(a, 1) : "";
  };
  String.prototype.kmwBMPNextChar = function (a) {
    var c = String(this);
    return 0 > a || a >= c.length - 1 ? null : a + 1;
  };
  String.prototype.kmwBMPPrevChar = function (a) {
    var c = String(this);
    return 0 >= a || a > c.length ? null : a - 1;
  };
  String.prototype.kmwBMPCodePointToCodeUnit = function (a) {
    return a;
  };
  String.prototype.kmwBMPCodeUnitToCodePoint = function (a) {
    return a;
  };
  String.prototype.kmwBMPLength = function () {
    return String(this).length;
  };
  String.prototype.kmwBMPSubstr = function (a, c) {
    var b = String(this);
    return -1 < a ? b.substr(a, c) : b.substr(b.length + a, -a);
  };
  String.kmwEnableSupplementaryPlane = function (a) {
    var c = String.prototype;
    String._kmwFromCharCode = a ? String.kmwFromCharCode : String.fromCharCode;
    c._kmwCharAt = a ? c.kmwCharAt : c.charAt;
    c._kmwCharCodeAt = a ? c.kmwCharCodeAt : c.charCodeAt;
    c._kmwIndexOf = a ? c.kmwIndexOf : c.indexOf;
    c._kmwLastIndexOf = a ? c.kmwLastIndexOf : c.lastIndexOf;
    c._kmwSlice = a ? c.kmwSlice : c.slice;
    c._kmwSubstring = a ? c.kmwSubstring : c.substring;
    c._kmwSubstr = a ? c.kmwSubstr : c.kmwBMPSubstr;
    c._kmwLength = a ? c.kmwLength : c.kmwBMPLength;
    c._kmwNextChar = a ? c.kmwNextChar : c.kmwBMPNextChar;
    c._kmwPrevChar = a ? c.kmwPrevChar : c.kmwBMPPrevChar;
    c._kmwCodePointToCodeUnit = a ? c.kmwCodePointToCodeUnit : c.kmwBMPCodePointToCodeUnit;
    c._kmwCodeUnitToCodePoint = a ? c.kmwCodeUnitToCodePoint : c.kmwBMPCodeUnitToCodePoint;
  };
  var f;
  (function (a) {
    var c = (function () {
      function a(a) {
        a = a || {};
        this._futureSuggestions = a.futureSuggestions ? a.futureSuggestions.slice() : [];
        a.punctuation && (this.punctuation = a.punctuation);
      }
      a.prototype.configure = function (a) {
        return (this.configuration = { leftContextCodePoints: a.maxLeftContextCodePoints, rightContextCodePoints: a.maxRightContextCodePoints });
      };
      a.prototype.predict = function (a, b, c) {
        a = function (a) {
          for (var b = [], c = 0; c < a.length; c++) b.push({ sample: a[c], p: 1 });
          return b;
        };
        return c ? a(c) : (c = this._futureSuggestions.shift()) ? a(c) : [];
      };
      a.prototype.wordbreak = function (a) {
        a = g.default_(a.left);
        return 0 < a.length ? a.pop().text : "";
      };
      return a;
    })();
    a.DummyModel = c;
  })(f || (f = {}));
  var g;
  (function (a) {
    var c = (function () {
      function a(a, b) {
        this.text = a;
        this.start = b;
      }
      Object.defineProperty(a.prototype, "length", {
        get: function () {
          return this.text.length;
        },
        enumerable: !0,
        configurable: !0,
      });
      Object.defineProperty(a.prototype, "end", {
        get: function () {
          return this.start + this.text.length;
        },
        enumerable: !0,
        configurable: !0,
      });
      return a;
    })();
    a.ascii = function (a) {
      for (var b = /[A-Za-z0-9']+/g, d = [], e; null !== (e = b.exec(a)); ) d.push(new c(e[0], e.index));
      return d;
    };
  })(g || (g = {}));
  var k = (function () {
      function a(c) {
        this.lexicalModel = c;
        this.punctuation = a.determinePunctuationFromModel(c);
      }
      a.prototype.isWhitespace = function (a) {
        if ("" == a.insert) return !1;
        a = a.insert;
        a = a.replace(/.*[\u0009\u000A\u000D\u0020\u00a0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u202f\u205f\u3000]/i, "");
        return "" == a;
      };
      a.prototype.isBackspace = function (a) {
        return "" == a.insert && 0 < a.deleteLeft;
      };
      a.prototype.predict = function (c, b) {
        var d = [],
          e = this.punctuation,
          g = {};
        c instanceof Array || (c = [{ sample: c, p: 1 }]);
        var k = c.sort(function (a, b) {
            return b.p - a.p;
          })[0].sample,
          r = this.isWhitespace(k),
          m = this.isBackspace(k),
          t = f.applyTransform(k, b),
          v = this.lexicalModel.wordbreak(t),
          E = null;
        t = function (a) {
          var c = a.sample;
          if ((y.isWhitespace(c) && !r) || (y.isBackspace(c) && !m)) return "continue";
          var d = !1;
          if (y.isWhitespace(c)) {
            var h = f.applyTransform(c, b);
            d = "" == y.lexicalModel.wordbreak(h);
          }
          y.lexicalModel.predict(c, b).forEach(function (b) {
            void 0 !== c.id && (b.sample.transformId = c.id);
            d && f.prependTransform(b.sample.transform, c);
            0 < b.sample.transform.insert.length && (b.sample.transform.insert += e.insertAfterWord);
            var h = b.sample.displayAs;
            if (h == v) (E = b.sample), (E.tag = "keep");
            else {
              var m = g[h];
              m ? (m.p += b.p * a.p) : (g[h] = { sample: b.sample, p: b.p * a.p });
            }
          });
        };
        for (var y = this, P = 0; P < c.length; P++) t(c[P]);
        E || "" == v || (E = { displayAs: v, transformId: k.id, transform: { insert: k.insert + e.insertAfterWord, deleteLeft: k.deleteLeft, deleteRight: k.deleteRight, id: k.id }, tag: "keep" });
        E && ((c = e.quotesForKeepSuggestion), (k = c.open), (c = c.close), (E.displayAs = e.isRTL ? c + E.displayAs + k : k + E.displayAs + c));
        for (var N in g) d.push(g[N]);
        d = d.sort(function (a, b) {
          return b.p - a.p;
        });
        d = d.splice(0, a.MAX_SUGGESTIONS).map(function (a) {
          return a.sample;
        });
        E && (d = [E].concat(d));
        return d;
      };
      a.determinePunctuationFromModel = function (a) {
        var b = r;
        if (!a.punctuation) return b;
        a = a.punctuation;
        var c = a.insertAfterWord;
        "" === c || c || (c = b.insertAfterWord);
        var d = a.quotesForKeepSuggestion;
        d || (d = b.quotesForKeepSuggestion);
        return { insertAfterWord: c, quotesForKeepSuggestion: d, isRTL: a.isRTL };
      };
      a.MAX_SUGGESTIONS = 12;
      return a;
    })(),
    r = { quotesForKeepSuggestion: { open: "\u201c", close: "\u201d" }, insertAfterWord: " " },
    e =
      (this && this.__assign) ||
      function () {
        e =
          Object.assign ||
          function (a) {
            for (var c, b = 1, d = arguments.length; b < d; b++) {
              c = arguments[b];
              for (var e in c) Object.prototype.hasOwnProperty.call(c, e) && (a[e] = c[e]);
            }
            return a;
          };
        return e.apply(this, arguments);
      },
    a = (function () {
      function a(a) {
        void 0 === a && (a = { importScripts: null, postMessage: null });
        this._postMessage = a.postMessage || postMessage;
        this._importScripts = a.importScripts || importScripts;
        this.setupConfigState();
      }
      a.prototype.error = function (a, b) {
        this.cast("error", { log: a, error: b && b.stack ? b.stack : void 0 });
      };
      a.prototype.onMessage = function (a) {
        if (!a.data.message) throw Error("Missing required 'message' property: " + a.data);
        a = a.data;
        if ("load" == a.message) {
          if (a.model == this._currentModelSource) {
            "undefined" !== typeof console && console.warn("Duplicate model load message detected - squashing!");
            return;
          }
          this._currentModelSource = a.model;
        } else "unload" == a.message && (this._currentModelSource = null);
        this.state.handleMessage(a);
      };
      a.prototype.cast = function (a, b) {
        var c = this._postMessage;
        c(e({ message: a }, b));
      };
      a.prototype.loadModel = function (a) {
        try {
          var b = a.configure(this._platformCapabilities);
          b.leftContextCodePoints || (b.leftContextCodePoints = b.leftContextCodeUnits);
          b.rightContextCodePoints || (b.rightContextCodePoints = b.rightContextCodeUnits);
          b.leftContextCodePoints || (b.leftContextCodePoints = this._platformCapabilities.maxLeftContextCodePoints);
          b.rightContextCodePoints || (b.rightContextCodePoints = this._platformCapabilities.maxRightContextCodePoints || 0);
          this.transitionToReadyState(a);
          this.cast("ready", { configuration: b });
        } catch (h) {
          this.error("loadModel failed!", h);
        }
      };
      a.prototype.loadModelFile = function (a) {
        try {
          this._importScripts(a);
        } catch (b) {
          this.error("Error occurred when attempting to load dictionary", b);
        }
      };
      a.prototype.unloadModel = function () {
        this.transitionToLoadingState();
      };
      a.prototype.setupConfigState = function () {
        var a = this;
        this.state = {
          name: "unconfigured",
          handleMessage: function (b) {
            if ("config" !== b.message) throw Error("invalid message; expected 'config' but got " + b.message);
            a._platformCapabilities = b.capabilities;
            a.transitionToLoadingState();
          },
        };
      };
      a.prototype.transitionToLoadingState = function () {
        var a = this;
        this.state = {
          name: "modelless",
          handleMessage: function (b) {
            if ("load" !== b.message) throw Error("invalid message; expected 'load' but got " + b.message);
            a.loadModelFile(b.model);
          },
        };
      };
      a.prototype.transitionToReadyState = function (a) {
        var b = this;
        this.state = {
          name: "ready",
          handleMessage: function (c) {
            switch (c.message) {
              case "predict":
                var d = c.transform,
                  e = c.context;
                d = new k(a).predict(d, e);
                b.cast("suggestions", { token: c.token, suggestions: d });
                break;
              case "wordbreak":
                d = a.wordbreak(c.context);
                b.cast("currentword", { token: c.token, word: d });
                break;
              case "unload":
                b.unloadModel();
                break;
              default:
                throw Error("invalid message; expected one of {'predict', 'unload'} but got " + c.message);
            }
          },
        };
      };
      a.install = function (c) {
        var b = new a({ postMessage: c.postMessage, importScripts: c.importScripts.bind(c) });
        c.onmessage = b.onMessage.bind(b);
        c.LMLayerWorker = b;
        c.models = f;
        c.wordBreakers = g;
        return b;
      };
      return a;
    })();
  "undefined" !== typeof module && "undefined" !== typeof module.exports
    ? ((module.exports = a), (module.exports.models = f), (module.exports.wordBreakers = g), (module.exports.ModelCompositor = k))
    : "undefined" !== typeof self && "postMessage" in self
    ? a.install(self)
    : (window.LMLayerWorker = a);
  (function (a) {
    a.applyTransform = function (a, b) {
      var c = b.left || "",
        d = c.length;
      c = c.substring(0, d - (d < a.deleteLeft ? d : a.deleteLeft)) + (a.insert || "");
      d = b.right || "";
      var e = d.length;
      a = d.substring(e < a.deleteRight ? e : a.deleteRight);
      return { left: c, right: a, startOfBuffer: b.startOfBuffer, endOfBuffer: b.endOfBuffer };
    };
    a.prependTransform = function (a, b) {
      a.insert = b.insert + a.insert;
      a.deleteLeft += b.deleteLeft;
      b.deleteRight && (a.deleteRight = (a.deleteRight || 0) + b.deleteRight);
    };
  })(f || (f = {}));
  (function (a) {
    a.placeholder = function (a) {
      var b = 0;
      return a.split(/\s+/).map(function (a) {
        a = { start: b, end: b + a.length, text: a, length: a.length };
        b = a.end;
        return a;
      });
    };
  })(g || (g = {}));
  (function (a) {
    function c(a, b, d) {
      void 0 === d && (d = 0);
      if ("leaf" === a.type || d === b.length) return a;
      var e = b[d];
      return a.children[e] ? c(a.children[e], b, d + 1) : null;
    }
    function b(a, b, c, d) {
      void 0 === d && (d = 12);
      var e = new k(),
        f = [];
      if ("leaf" === a.type) {
        var h = 0;
        for (a = a.entries; h < a.length; h++) {
          var g = a[h];
          if (g.key.startsWith(b) && (f.push({ text: g.content, p: g.weight / c }), f.length >= d)) break;
        }
      } else {
        e.enqueue(a);
        var m = void 0;
        b = function () {
          if ("type" in m)
            if ("leaf" === m.type) e.enqueueAll(m.entries);
            else {
              var a = m;
              e.enqueueAll(
                m.values.map(function (b) {
                  return a.children[b];
                })
              );
            }
          else if ((f.push({ text: m.content, p: m.weight / c }), f.length >= d)) return { value: f };
        };
        for (; (m = e.pop()); ) if (((h = b()), "object" === typeof h)) return h.value;
      }
      return f;
    }
    function d(a) {
      return a
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[\u00C0-\u212A]/g, function (a) {
          return a in r ? r[a] : a;
        })
        .toLowerCase();
    }
    var e = (function () {
      function b(a, b) {
        void 0 === b && (b = {});
        this._trie = new f(a.root, a.totalWeight, b.searchTermToKey || d);
        this.breakWords = b.wordBreaker || g["default"];
        this.punctuation = b.punctuation;
      }
      b.prototype.configure = function (a) {
        return (this.configuration = { leftContextCodePoints: a.maxLeftContextCodePoints, rightContextCodePoints: a.maxRightContextCodePoints });
      };
      b.prototype.predict = function (b, c) {
        function d(a) {
          for (var b = [], c = 0; c < a.length; c++) {
            var d = a[c];
            b.push({ sample: d, p: d.p });
          }
          return b;
        }
        if (!b.insert && c.startOfBuffer && c.endOfBuffer)
          return d(
            this._trie.firstN(12).map(function (a) {
              var b = a.text;
              return { transform: { insert: b, deleteLeft: 0 }, displayAs: b, p: a.p };
            })
          );
        c = a.applyTransform(b, c);
        var e = b.deleteLeft - b.insert.kmwLength(),
          f = this.getLastWord(c.left);
        return d(
          this._trie.lookup(f).map(function (a) {
            var b = a.text;
            a = a.p;
            return { transform: { insert: b, deleteLeft: e + f.kmwLength() }, displayAs: b, p: a };
          })
        );
      };
      b.prototype.getLastWord = function (a) {
        a = this.breakWords(a);
        return 0 < a.length ? a.pop().text : "";
      };
      b.prototype.wordbreak = function (a) {
        return this.getLastWord(a.left);
      };
      return b;
    })();
    a.TrieModel = e;
    var f = (function () {
        function a(a, b, c) {
          this.root = a;
          this.toKey = c;
          this.totalWeight = b;
        }
        a.prototype.lookup = function (a) {
          a = this.toKey(a);
          var d = c(this.root, a);
          return null === d ? [] : b(d, a, this.totalWeight);
        };
        a.prototype.firstN = function (a) {
          return b(this.root, "", this.totalWeight, a);
        };
        return a;
      })(),
      k = (function () {
        function a() {
          this._storage = [];
        }
        a.prototype.enqueue = function (a) {
          this._storage.push(a);
        };
        a.prototype.enqueueAll = function (a) {
          this._storage = this._storage.concat(a);
        };
        a.prototype.pop = function () {
          this._storage.sort(function (a, b) {
            return b.weight - a.weight;
          });
          return this._storage.shift();
        };
        return a;
      })(),
      r = {
        À: "A",
        Á: "A",
        Â: "A",
        Ã: "A",
        Ä: "A",
        Å: "A",
        Ç: "C",
        È: "E",
        É: "E",
        Ê: "E",
        Ë: "E",
        Ì: "I",
        Í: "I",
        Î: "I",
        Ï: "I",
        Ñ: "N",
        Ò: "O",
        Ó: "O",
        Ô: "O",
        Õ: "O",
        Ö: "O",
        Ù: "U",
        Ú: "U",
        Û: "U",
        Ü: "U",
        Ý: "Y",
        à: "a",
        á: "a",
        â: "a",
        ã: "a",
        ä: "a",
        å: "a",
        ç: "c",
        è: "e",
        é: "e",
        ê: "e",
        ë: "e",
        ì: "i",
        í: "i",
        î: "i",
        ï: "i",
        ñ: "n",
        ò: "o",
        ó: "o",
        ô: "o",
        õ: "o",
        ö: "o",
        ù: "u",
        ú: "u",
        û: "u",
        ü: "u",
        ý: "y",
        ÿ: "y",
        Ā: "A",
        ā: "a",
        Ă: "A",
        ă: "a",
        Ą: "A",
        ą: "a",
        Ć: "C",
        ć: "c",
        Ĉ: "C",
        ĉ: "c",
        Ċ: "C",
        ċ: "c",
        Č: "C",
        č: "c",
        Ď: "D",
        ď: "d",
        Ē: "E",
        ē: "e",
        Ĕ: "E",
        ĕ: "e",
        Ė: "E",
        ė: "e",
        Ę: "E",
        ę: "e",
        Ě: "E",
        ě: "e",
        Ĝ: "G",
        ĝ: "g",
        Ğ: "G",
        ğ: "g",
        Ġ: "G",
        ġ: "g",
        Ģ: "G",
        ģ: "g",
        Ĥ: "H",
        ĥ: "h",
        Ĩ: "I",
        ĩ: "i",
        Ī: "I",
        ī: "i",
        Ĭ: "I",
        ĭ: "i",
        Į: "I",
        į: "i",
        İ: "I",
        Ĵ: "J",
        ĵ: "j",
        Ķ: "K",
        ķ: "k",
        Ĺ: "L",
        ĺ: "l",
        Ļ: "L",
        ļ: "l",
        Ľ: "L",
        ľ: "l",
        Ń: "N",
        ń: "n",
        Ņ: "N",
        ņ: "n",
        Ň: "N",
        ň: "n",
        Ō: "O",
        ō: "o",
        Ŏ: "O",
        ŏ: "o",
        Ő: "O",
        ő: "o",
        Ŕ: "R",
        ŕ: "r",
        Ŗ: "R",
        ŗ: "r",
        Ř: "R",
        ř: "r",
        Ś: "S",
        ś: "s",
        Ŝ: "S",
        ŝ: "s",
        Ş: "S",
        ş: "s",
        Š: "S",
        š: "s",
        Ţ: "T",
        ţ: "t",
        Ť: "T",
        ť: "t",
        Ũ: "U",
        ũ: "u",
        Ū: "U",
        ū: "u",
        Ŭ: "U",
        ŭ: "u",
        Ů: "U",
        ů: "u",
        Ű: "U",
        ű: "u",
        Ų: "U",
        ų: "u",
        Ŵ: "W",
        ŵ: "w",
        Ŷ: "Y",
        ŷ: "y",
        Ÿ: "Y",
        Ź: "Z",
        ź: "z",
        Ż: "Z",
        ż: "z",
        Ž: "Z",
        ž: "z",
        Ơ: "O",
        ơ: "o",
        Ư: "U",
        ư: "u",
        Ǎ: "A",
        ǎ: "a",
        Ǐ: "I",
        ǐ: "i",
        Ǒ: "O",
        ǒ: "o",
        Ǔ: "U",
        ǔ: "u",
        Ǖ: "U",
        ǖ: "u",
        Ǘ: "U",
        ǘ: "u",
        Ǚ: "U",
        ǚ: "u",
        Ǜ: "U",
        ǜ: "u",
        Ǟ: "A",
        ǟ: "a",
        Ǡ: "A",
        ǡ: "a",
        Ǣ: "\u00c6",
        ǣ: "\u00e6",
        Ǧ: "G",
        ǧ: "g",
        Ǩ: "K",
        ǩ: "k",
        Ǫ: "O",
        ǫ: "o",
        Ǭ: "O",
        ǭ: "o",
        Ǯ: "\u01b7",
        ǯ: "\u0292",
        ǰ: "j",
        Ǵ: "G",
        ǵ: "g",
        Ǹ: "N",
        ǹ: "n",
        Ǻ: "A",
        ǻ: "a",
        Ǽ: "\u00c6",
        ǽ: "\u00e6",
        Ǿ: "\u00d8",
        ǿ: "\u00f8",
        Ȁ: "A",
        ȁ: "a",
        Ȃ: "A",
        ȃ: "a",
        Ȅ: "E",
        ȅ: "e",
        Ȇ: "E",
        ȇ: "e",
        Ȉ: "I",
        ȉ: "i",
        Ȋ: "I",
        ȋ: "i",
        Ȍ: "O",
        ȍ: "o",
        Ȏ: "O",
        ȏ: "o",
        Ȑ: "R",
        ȑ: "r",
        Ȓ: "R",
        ȓ: "r",
        Ȕ: "U",
        ȕ: "u",
        Ȗ: "U",
        ȗ: "u",
        Ș: "S",
        ș: "s",
        Ț: "T",
        ț: "t",
        Ȟ: "H",
        ȟ: "h",
        Ȧ: "A",
        ȧ: "a",
        Ȩ: "E",
        ȩ: "e",
        Ȫ: "O",
        ȫ: "o",
        Ȭ: "O",
        ȭ: "o",
        Ȯ: "O",
        ȯ: "o",
        Ȱ: "O",
        ȱ: "o",
        Ȳ: "Y",
        ȳ: "y",
        "\u0340": "\u0300",
        "\u0341": "\u0301",
        "\u0343": "\u0313",
        "\u0344": "\u0308",
        ʹ: "\u02b9",
        "\u037e": ";",
        "\u0385": "\u00a8",
        Ά: "\u0391",
        "\u0387": "\u00b7",
        Έ: "\u0395",
        Ή: "\u0397",
        Ί: "\u0399",
        Ό: "\u039f",
        Ύ: "\u03a5",
        Ώ: "\u03a9",
        ΐ: "\u03b9",
        Ϊ: "\u0399",
        Ϋ: "\u03a5",
        ά: "\u03b1",
        έ: "\u03b5",
        ή: "\u03b7",
        ί: "\u03b9",
        ΰ: "\u03c5",
        ϊ: "\u03b9",
        ϋ: "\u03c5",
        ό: "\u03bf",
        ύ: "\u03c5",
        ώ: "\u03c9",
        ϓ: "\u03d2",
        ϔ: "\u03d2",
        Ѐ: "\u0415",
        Ё: "\u0415",
        Ѓ: "\u0413",
        Ї: "\u0406",
        Ќ: "\u041a",
        Ѝ: "\u0418",
        Ў: "\u0423",
        Й: "\u0418",
        й: "\u0438",
        ѐ: "\u0435",
        ё: "\u0435",
        ѓ: "\u0433",
        ї: "\u0456",
        ќ: "\u043a",
        ѝ: "\u0438",
        ў: "\u0443",
        Ѷ: "\u0474",
        ѷ: "\u0475",
        Ӂ: "\u0416",
        ӂ: "\u0436",
        Ӑ: "\u0410",
        ӑ: "\u0430",
        Ӓ: "\u0410",
        ӓ: "\u0430",
        Ӗ: "\u0415",
        ӗ: "\u0435",
        Ӛ: "\u04d8",
        ӛ: "\u04d9",
        Ӝ: "\u0416",
        ӝ: "\u0436",
        Ӟ: "\u0417",
        ӟ: "\u0437",
        Ӣ: "\u0418",
        ӣ: "\u0438",
        Ӥ: "\u0418",
        ӥ: "\u0438",
        Ӧ: "\u041e",
        ӧ: "\u043e",
        Ӫ: "\u04e8",
        ӫ: "\u04e9",
        Ӭ: "\u042d",
        ӭ: "\u044d",
        Ӯ: "\u0423",
        ӯ: "\u0443",
        Ӱ: "\u0423",
        ӱ: "\u0443",
        Ӳ: "\u0423",
        ӳ: "\u0443",
        Ӵ: "\u0427",
        ӵ: "\u0447",
        Ӹ: "\u042b",
        ӹ: "\u044b",
        Ḁ: "A",
        ḁ: "a",
        Ḃ: "B",
        ḃ: "b",
        Ḅ: "B",
        ḅ: "b",
        Ḇ: "B",
        ḇ: "b",
        Ḉ: "C",
        ḉ: "c",
        Ḋ: "D",
        ḋ: "d",
        Ḍ: "D",
        ḍ: "d",
        Ḏ: "D",
        ḏ: "d",
        Ḑ: "D",
        ḑ: "d",
        Ḓ: "D",
        ḓ: "d",
        Ḕ: "E",
        ḕ: "e",
        Ḗ: "E",
        ḗ: "e",
        Ḙ: "E",
        ḙ: "e",
        Ḛ: "E",
        ḛ: "e",
        Ḝ: "E",
        ḝ: "e",
        Ḟ: "F",
        ḟ: "f",
        Ḡ: "G",
        ḡ: "g",
        Ḣ: "H",
        ḣ: "h",
        Ḥ: "H",
        ḥ: "h",
        Ḧ: "H",
        ḧ: "h",
        Ḩ: "H",
        ḩ: "h",
        Ḫ: "H",
        ḫ: "h",
        Ḭ: "I",
        ḭ: "i",
        Ḯ: "I",
        ḯ: "i",
        Ḱ: "K",
        ḱ: "k",
        Ḳ: "K",
        ḳ: "k",
        Ḵ: "K",
        ḵ: "k",
        Ḷ: "L",
        ḷ: "l",
        Ḹ: "L",
        ḹ: "l",
        Ḻ: "L",
        ḻ: "l",
        Ḽ: "L",
        ḽ: "l",
        Ḿ: "M",
        ḿ: "m",
        Ṁ: "M",
        ṁ: "m",
        Ṃ: "M",
        ṃ: "m",
        Ṅ: "N",
        ṅ: "n",
        Ṇ: "N",
        ṇ: "n",
        Ṉ: "N",
        ṉ: "n",
        Ṋ: "N",
        ṋ: "n",
        Ṍ: "O",
        ṍ: "o",
        Ṏ: "O",
        ṏ: "o",
        Ṑ: "O",
        ṑ: "o",
        Ṓ: "O",
        ṓ: "o",
        Ṕ: "P",
        ṕ: "p",
        Ṗ: "P",
        ṗ: "p",
        Ṙ: "R",
        ṙ: "r",
        Ṛ: "R",
        ṛ: "r",
        Ṝ: "R",
        ṝ: "r",
        Ṟ: "R",
        ṟ: "r",
        Ṡ: "S",
        ṡ: "s",
        Ṣ: "S",
        ṣ: "s",
        Ṥ: "S",
        ṥ: "s",
        Ṧ: "S",
        ṧ: "s",
        Ṩ: "S",
        ṩ: "s",
        Ṫ: "T",
        ṫ: "t",
        Ṭ: "T",
        ṭ: "t",
        Ṯ: "T",
        ṯ: "t",
        Ṱ: "T",
        ṱ: "t",
        Ṳ: "U",
        ṳ: "u",
        Ṵ: "U",
        ṵ: "u",
        Ṷ: "U",
        ṷ: "u",
        Ṹ: "U",
        ṹ: "u",
        Ṻ: "U",
        ṻ: "u",
        Ṽ: "V",
        ṽ: "v",
        Ṿ: "V",
        ṿ: "v",
        Ẁ: "W",
        ẁ: "w",
        Ẃ: "W",
        ẃ: "w",
        Ẅ: "W",
        ẅ: "w",
        Ẇ: "W",
        ẇ: "w",
        Ẉ: "W",
        ẉ: "w",
        Ẋ: "X",
        ẋ: "x",
        Ẍ: "X",
        ẍ: "x",
        Ẏ: "Y",
        ẏ: "y",
        Ẑ: "Z",
        ẑ: "z",
        Ẓ: "Z",
        ẓ: "z",
        Ẕ: "Z",
        ẕ: "z",
        ẖ: "h",
        ẗ: "t",
        ẘ: "w",
        ẙ: "y",
        ẛ: "\u017f",
        Ạ: "A",
        ạ: "a",
        Ả: "A",
        ả: "a",
        Ấ: "A",
        ấ: "a",
        Ầ: "A",
        ầ: "a",
        Ẩ: "A",
        ẩ: "a",
        Ẫ: "A",
        ẫ: "a",
        Ậ: "A",
        ậ: "a",
        Ắ: "A",
        ắ: "a",
        Ằ: "A",
        ằ: "a",
        Ẳ: "A",
        ẳ: "a",
        Ẵ: "A",
        ẵ: "a",
        Ặ: "A",
        ặ: "a",
        Ẹ: "E",
        ẹ: "e",
        Ẻ: "E",
        ẻ: "e",
        Ẽ: "E",
        ẽ: "e",
        Ế: "E",
        ế: "e",
        Ề: "E",
        ề: "e",
        Ể: "E",
        ể: "e",
        Ễ: "E",
        ễ: "e",
        Ệ: "E",
        ệ: "e",
        Ỉ: "I",
        ỉ: "i",
        Ị: "I",
        ị: "i",
        Ọ: "O",
        ọ: "o",
        Ỏ: "O",
        ỏ: "o",
        Ố: "O",
        ố: "o",
        Ồ: "O",
        ồ: "o",
        Ổ: "O",
        ổ: "o",
        Ỗ: "O",
        ỗ: "o",
        Ộ: "O",
        ộ: "o",
        Ớ: "O",
        ớ: "o",
        Ờ: "O",
        ờ: "o",
        Ở: "O",
        ở: "o",
        Ỡ: "O",
        ỡ: "o",
        Ợ: "O",
        ợ: "o",
        Ụ: "U",
        ụ: "u",
        Ủ: "U",
        ủ: "u",
        Ứ: "U",
        ứ: "u",
        Ừ: "U",
        ừ: "u",
        Ử: "U",
        ử: "u",
        Ữ: "U",
        ữ: "u",
        Ự: "U",
        ự: "u",
        Ỳ: "Y",
        ỳ: "y",
        Ỵ: "Y",
        ỵ: "y",
        Ỷ: "Y",
        ỷ: "y",
        Ỹ: "Y",
        ỹ: "y",
        ἀ: "\u03b1",
        ἁ: "\u03b1",
        ἂ: "\u03b1",
        ἃ: "\u03b1",
        ἄ: "\u03b1",
        ἅ: "\u03b1",
        ἆ: "\u03b1",
        ἇ: "\u03b1",
        Ἀ: "\u0391",
        Ἁ: "\u0391",
        Ἂ: "\u0391",
        Ἃ: "\u0391",
        Ἄ: "\u0391",
        Ἅ: "\u0391",
        Ἆ: "\u0391",
        Ἇ: "\u0391",
        ἐ: "\u03b5",
        ἑ: "\u03b5",
        ἒ: "\u03b5",
        ἓ: "\u03b5",
        ἔ: "\u03b5",
        ἕ: "\u03b5",
        Ἐ: "\u0395",
        Ἑ: "\u0395",
        Ἒ: "\u0395",
        Ἓ: "\u0395",
        Ἔ: "\u0395",
        Ἕ: "\u0395",
        ἠ: "\u03b7",
        ἡ: "\u03b7",
        ἢ: "\u03b7",
        ἣ: "\u03b7",
        ἤ: "\u03b7",
        ἥ: "\u03b7",
        ἦ: "\u03b7",
        ἧ: "\u03b7",
        Ἠ: "\u0397",
        Ἡ: "\u0397",
        Ἢ: "\u0397",
        Ἣ: "\u0397",
        Ἤ: "\u0397",
        Ἥ: "\u0397",
        Ἦ: "\u0397",
        Ἧ: "\u0397",
        ἰ: "\u03b9",
        ἱ: "\u03b9",
        ἲ: "\u03b9",
        ἳ: "\u03b9",
        ἴ: "\u03b9",
        ἵ: "\u03b9",
        ἶ: "\u03b9",
        ἷ: "\u03b9",
        Ἰ: "\u0399",
        Ἱ: "\u0399",
        Ἲ: "\u0399",
        Ἳ: "\u0399",
        Ἴ: "\u0399",
        Ἵ: "\u0399",
        Ἶ: "\u0399",
        Ἷ: "\u0399",
        ὀ: "\u03bf",
        ὁ: "\u03bf",
        ὂ: "\u03bf",
        ὃ: "\u03bf",
        ὄ: "\u03bf",
        ὅ: "\u03bf",
        Ὀ: "\u039f",
        Ὁ: "\u039f",
        Ὂ: "\u039f",
        Ὃ: "\u039f",
        Ὄ: "\u039f",
        Ὅ: "\u039f",
        ὐ: "\u03c5",
        ὑ: "\u03c5",
        ὒ: "\u03c5",
        ὓ: "\u03c5",
        ὔ: "\u03c5",
        ὕ: "\u03c5",
        ὖ: "\u03c5",
        ὗ: "\u03c5",
        Ὑ: "\u03a5",
        Ὓ: "\u03a5",
        Ὕ: "\u03a5",
        Ὗ: "\u03a5",
        ὠ: "\u03c9",
        ὡ: "\u03c9",
        ὢ: "\u03c9",
        ὣ: "\u03c9",
        ὤ: "\u03c9",
        ὥ: "\u03c9",
        ὦ: "\u03c9",
        ὧ: "\u03c9",
        Ὠ: "\u03a9",
        Ὡ: "\u03a9",
        Ὢ: "\u03a9",
        Ὣ: "\u03a9",
        Ὤ: "\u03a9",
        Ὥ: "\u03a9",
        Ὦ: "\u03a9",
        Ὧ: "\u03a9",
        ὰ: "\u03b1",
        ά: "\u03b1",
        ὲ: "\u03b5",
        έ: "\u03b5",
        ὴ: "\u03b7",
        ή: "\u03b7",
        ὶ: "\u03b9",
        ί: "\u03b9",
        ὸ: "\u03bf",
        ό: "\u03bf",
        ὺ: "\u03c5",
        ύ: "\u03c5",
        ὼ: "\u03c9",
        ώ: "\u03c9",
        ᾀ: "\u03b1",
        ᾁ: "\u03b1",
        ᾂ: "\u03b1",
        ᾃ: "\u03b1",
        ᾄ: "\u03b1",
        ᾅ: "\u03b1",
        ᾆ: "\u03b1",
        ᾇ: "\u03b1",
        ᾈ: "\u0391",
        ᾉ: "\u0391",
        ᾊ: "\u0391",
        ᾋ: "\u0391",
        ᾌ: "\u0391",
        ᾍ: "\u0391",
        ᾎ: "\u0391",
        ᾏ: "\u0391",
        ᾐ: "\u03b7",
        ᾑ: "\u03b7",
        ᾒ: "\u03b7",
        ᾓ: "\u03b7",
        ᾔ: "\u03b7",
        ᾕ: "\u03b7",
        ᾖ: "\u03b7",
        ᾗ: "\u03b7",
        ᾘ: "\u0397",
        ᾙ: "\u0397",
        ᾚ: "\u0397",
        ᾛ: "\u0397",
        ᾜ: "\u0397",
        ᾝ: "\u0397",
        ᾞ: "\u0397",
        ᾟ: "\u0397",
        ᾠ: "\u03c9",
        ᾡ: "\u03c9",
        ᾢ: "\u03c9",
        ᾣ: "\u03c9",
        ᾤ: "\u03c9",
        ᾥ: "\u03c9",
        ᾦ: "\u03c9",
        ᾧ: "\u03c9",
        ᾨ: "\u03a9",
        ᾩ: "\u03a9",
        ᾪ: "\u03a9",
        ᾫ: "\u03a9",
        ᾬ: "\u03a9",
        ᾭ: "\u03a9",
        ᾮ: "\u03a9",
        ᾯ: "\u03a9",
        ᾰ: "\u03b1",
        ᾱ: "\u03b1",
        ᾲ: "\u03b1",
        ᾳ: "\u03b1",
        ᾴ: "\u03b1",
        ᾶ: "\u03b1",
        ᾷ: "\u03b1",
        Ᾰ: "\u0391",
        Ᾱ: "\u0391",
        Ὰ: "\u0391",
        Ά: "\u0391",
        ᾼ: "\u0391",
        ι: "\u03b9",
        "\u1fc1": "\u00a8",
        ῂ: "\u03b7",
        ῃ: "\u03b7",
        ῄ: "\u03b7",
        ῆ: "\u03b7",
        ῇ: "\u03b7",
        Ὲ: "\u0395",
        Έ: "\u0395",
        Ὴ: "\u0397",
        Ή: "\u0397",
        ῌ: "\u0397",
        "\u1fcd": "\u1fbf",
        "\u1fce": "\u1fbf",
        "\u1fcf": "\u1fbf",
        ῐ: "\u03b9",
        ῑ: "\u03b9",
        ῒ: "\u03b9",
        ΐ: "\u03b9",
        ῖ: "\u03b9",
        ῗ: "\u03b9",
        Ῐ: "\u0399",
        Ῑ: "\u0399",
        Ὶ: "\u0399",
        Ί: "\u0399",
        "\u1fdd": "\u1ffe",
        "\u1fde": "\u1ffe",
        "\u1fdf": "\u1ffe",
        ῠ: "\u03c5",
        ῡ: "\u03c5",
        ῢ: "\u03c5",
        ΰ: "\u03c5",
        ῤ: "\u03c1",
        ῥ: "\u03c1",
        ῦ: "\u03c5",
        ῧ: "\u03c5",
        Ῠ: "\u03a5",
        Ῡ: "\u03a5",
        Ὺ: "\u03a5",
        Ύ: "\u03a5",
        Ῥ: "\u03a1",
        "\u1fed": "\u00a8",
        "\u1fee": "\u00a8",
        "\u1fef": "`",
        ῲ: "\u03c9",
        ῳ: "\u03c9",
        ῴ: "\u03c9",
        ῶ: "\u03c9",
        ῷ: "\u03c9",
        Ὸ: "\u039f",
        Ό: "\u039f",
        Ὼ: "\u03a9",
        Ώ: "\u03a9",
        ῼ: "\u03a9",
        "\u1ffd": "\u00b4",
        "\u2000": "\u2002",
        "\u2001": "\u2003",
        Ω: "\u03a9",
        K: "K",
        Å: "A",
      };
  })(f || (f = {}));
  (function (a) {
    (a.data || (a.data = {})).WORD_BREAK_PROPERTY = [
      [10, 10, 1],
      [11, 12, 2],
      [13, 13, 3],
      [32, 32, 4],
      [34, 34, 5],
      [39, 39, 6],
      [44, 44, 7],
      [46, 46, 8],
      [48, 57, 9],
      [58, 58, 10],
      [59, 59, 7],
      [65, 90, 11],
      [95, 95, 12],
      [97, 122, 11],
      [133, 133, 2],
      [170, 170, 11],
      [173, 173, 13],
      [181, 181, 11],
      [183, 183, 10],
      [186, 186, 11],
      [192, 214, 11],
      [216, 246, 11],
      [248, 442, 11],
      [443, 443, 11],
      [444, 447, 11],
      [448, 451, 11],
      [452, 659, 11],
      [660, 660, 11],
      [661, 687, 11],
      [688, 705, 11],
      [706, 709, 11],
      [710, 721, 11],
      [722, 727, 11],
      [734, 735, 11],
      [736, 740, 11],
      [748, 748, 11],
      [749, 749, 11],
      [750, 750, 11],
      [751, 767, 11],
      [768, 879, 14],
      [880, 883, 11],
      [884, 884, 11],
      [886, 887, 11],
      [890, 890, 11],
      [891, 893, 11],
      [894, 894, 7],
      [895, 895, 11],
      [902, 902, 11],
      [903, 903, 10],
      [904, 906, 11],
      [908, 908, 11],
      [910, 929, 11],
      [931, 1013, 11],
      [1015, 1153, 11],
      [1155, 1159, 14],
      [1160, 1161, 14],
      [1162, 1327, 11],
      [1329, 1366, 11],
      [1369, 1369, 11],
      [1371, 1372, 11],
      [1374, 1374, 11],
      [1376, 1416, 11],
      [1417, 1417, 7],
      [1425, 1469, 14],
      [1471, 1471, 14],
      [1473, 1474, 14],
      [1476, 1477, 14],
      [1479, 1479, 14],
      [1488, 1514, 15],
      [1519, 1522, 15],
      [1523, 1523, 11],
      [1524, 1524, 10],
      [1536, 1541, 13],
      [1548, 1549, 7],
      [1552, 1562, 14],
      [1564, 1564, 13],
      [1568, 1599, 11],
      [1600, 1600, 11],
      [1601, 1610, 11],
      [1611, 1631, 14],
      [1632, 1641, 9],
      [1643, 1643, 9],
      [1644, 1644, 7],
      [1646, 1647, 11],
      [1648, 1648, 14],
      [1649, 1747, 11],
      [1749, 1749, 11],
      [1750, 1756, 14],
      [1757, 1757, 13],
      [1759, 1764, 14],
      [1765, 1766, 11],
      [1767, 1768, 14],
      [1770, 1773, 14],
      [1774, 1775, 11],
      [1776, 1785, 9],
      [1786, 1788, 11],
      [1791, 1791, 11],
      [1807, 1807, 13],
      [1808, 1808, 11],
      [1809, 1809, 14],
      [1810, 1839, 11],
      [1840, 1866, 14],
      [1869, 1957, 11],
      [1958, 1968, 14],
      [1969, 1969, 11],
      [1984, 1993, 9],
      [1994, 2026, 11],
      [2027, 2035, 14],
      [2036, 2037, 11],
      [2040, 2040, 7],
      [2042, 2042, 11],
      [2045, 2045, 14],
      [2048, 2069, 11],
      [2070, 2073, 14],
      [2074, 2074, 11],
      [2075, 2083, 14],
      [2084, 2084, 11],
      [2085, 2087, 14],
      [2088, 2088, 11],
      [2089, 2093, 14],
      [2112, 2136, 11],
      [2137, 2139, 14],
      [2144, 2154, 11],
      [2208, 2228, 11],
      [2230, 2237, 11],
      [2259, 2273, 14],
      [2274, 2274, 13],
      [2275, 2306, 14],
      [2307, 2307, 14],
      [2308, 2361, 11],
      [2362, 2362, 14],
      [2363, 2363, 14],
      [2364, 2364, 14],
      [2365, 2365, 11],
      [2366, 2368, 14],
      [2369, 2376, 14],
      [2377, 2380, 14],
      [2381, 2381, 14],
      [2382, 2383, 14],
      [2384, 2384, 11],
      [2385, 2391, 14],
      [2392, 2401, 11],
      [2402, 2403, 14],
      [2406, 2415, 9],
      [2417, 2417, 11],
      [2418, 2432, 11],
      [2433, 2433, 14],
      [2434, 2435, 14],
      [2437, 2444, 11],
      [2447, 2448, 11],
      [2451, 2472, 11],
      [2474, 2480, 11],
      [2482, 2482, 11],
      [2486, 2489, 11],
      [2492, 2492, 14],
      [2493, 2493, 11],
      [2494, 2496, 14],
      [2497, 2500, 14],
      [2503, 2504, 14],
      [2507, 2508, 14],
      [2509, 2509, 14],
      [2510, 2510, 11],
      [2519, 2519, 14],
      [2524, 2525, 11],
      [2527, 2529, 11],
      [2530, 2531, 14],
      [2534, 2543, 9],
      [2544, 2545, 11],
      [2556, 2556, 11],
      [2558, 2558, 14],
      [2561, 2562, 14],
      [2563, 2563, 14],
      [2565, 2570, 11],
      [2575, 2576, 11],
      [2579, 2600, 11],
      [2602, 2608, 11],
      [2610, 2611, 11],
      [2613, 2614, 11],
      [2616, 2617, 11],
      [2620, 2620, 14],
      [2622, 2624, 14],
      [2625, 2626, 14],
      [2631, 2632, 14],
      [2635, 2637, 14],
      [2641, 2641, 14],
      [2649, 2652, 11],
      [2654, 2654, 11],
      [2662, 2671, 9],
      [2672, 2673, 14],
      [2674, 2676, 11],
      [2677, 2677, 14],
      [2689, 2690, 14],
      [2691, 2691, 14],
      [2693, 2701, 11],
      [2703, 2705, 11],
      [2707, 2728, 11],
      [2730, 2736, 11],
      [2738, 2739, 11],
      [2741, 2745, 11],
      [2748, 2748, 14],
      [2749, 2749, 11],
      [2750, 2752, 14],
      [2753, 2757, 14],
      [2759, 2760, 14],
      [2761, 2761, 14],
      [2763, 2764, 14],
      [2765, 2765, 14],
      [2768, 2768, 11],
      [2784, 2785, 11],
      [2786, 2787, 14],
      [2790, 2799, 9],
      [2809, 2809, 11],
      [2810, 2815, 14],
      [2817, 2817, 14],
      [2818, 2819, 14],
      [2821, 2828, 11],
      [2831, 2832, 11],
      [2835, 2856, 11],
      [2858, 2864, 11],
      [2866, 2867, 11],
      [2869, 2873, 11],
      [2876, 2876, 14],
      [2877, 2877, 11],
      [2878, 2878, 14],
      [2879, 2879, 14],
      [2880, 2880, 14],
      [2881, 2884, 14],
      [2887, 2888, 14],
      [2891, 2892, 14],
      [2893, 2893, 14],
      [2902, 2902, 14],
      [2903, 2903, 14],
      [2908, 2909, 11],
      [2911, 2913, 11],
      [2914, 2915, 14],
      [2918, 2927, 9],
      [2929, 2929, 11],
      [2946, 2946, 14],
      [2947, 2947, 11],
      [2949, 2954, 11],
      [2958, 2960, 11],
      [2962, 2965, 11],
      [2969, 2970, 11],
      [2972, 2972, 11],
      [2974, 2975, 11],
      [2979, 2980, 11],
      [2984, 2986, 11],
      [2990, 3001, 11],
      [3006, 3007, 14],
      [3008, 3008, 14],
      [3009, 3010, 14],
      [3014, 3016, 14],
      [3018, 3020, 14],
      [3021, 3021, 14],
      [3024, 3024, 11],
      [3031, 3031, 14],
      [3046, 3055, 9],
      [3072, 3072, 14],
      [3073, 3075, 14],
      [3076, 3076, 14],
      [3077, 3084, 11],
      [3086, 3088, 11],
      [3090, 3112, 11],
      [3114, 3129, 11],
      [3133, 3133, 11],
      [3134, 3136, 14],
      [3137, 3140, 14],
      [3142, 3144, 14],
      [3146, 3149, 14],
      [3157, 3158, 14],
      [3160, 3162, 11],
      [3168, 3169, 11],
      [3170, 3171, 14],
      [3174, 3183, 9],
      [3200, 3200, 11],
      [3201, 3201, 14],
      [3202, 3203, 14],
      [3205, 3212, 11],
      [3214, 3216, 11],
      [3218, 3240, 11],
      [3242, 3251, 11],
      [3253, 3257, 11],
      [3260, 3260, 14],
      [3261, 3261, 11],
      [3262, 3262, 14],
      [3263, 3263, 14],
      [3264, 3268, 14],
      [3270, 3270, 14],
      [3271, 3272, 14],
      [3274, 3275, 14],
      [3276, 3277, 14],
      [3285, 3286, 14],
      [3294, 3294, 11],
      [3296, 3297, 11],
      [3298, 3299, 14],
      [3302, 3311, 9],
      [3313, 3314, 11],
      [3328, 3329, 14],
      [3330, 3331, 14],
      [3333, 3340, 11],
      [3342, 3344, 11],
      [3346, 3386, 11],
      [3387, 3388, 14],
      [3389, 3389, 11],
      [3390, 3392, 14],
      [3393, 3396, 14],
      [3398, 3400, 14],
      [3402, 3404, 14],
      [3405, 3405, 14],
      [3406, 3406, 11],
      [3412, 3414, 11],
      [3415, 3415, 14],
      [3423, 3425, 11],
      [3426, 3427, 14],
      [3430, 3439, 9],
      [3450, 3455, 11],
      [3458, 3459, 14],
      [3461, 3478, 11],
      [3482, 3505, 11],
      [3507, 3515, 11],
      [3517, 3517, 11],
      [3520, 3526, 11],
      [3530, 3530, 14],
      [3535, 3537, 14],
      [3538, 3540, 14],
      [3542, 3542, 14],
      [3544, 3551, 14],
      [3558, 3567, 9],
      [3570, 3571, 14],
      [3633, 3633, 14],
      [3636, 3642, 14],
      [3655, 3662, 14],
      [3664, 3673, 9],
      [3761, 3761, 14],
      [3764, 3772, 14],
      [3784, 3789, 14],
      [3792, 3801, 9],
      [3840, 3840, 11],
      [3864, 3865, 14],
      [3872, 3881, 9],
      [3893, 3893, 14],
      [3895, 3895, 14],
      [3897, 3897, 14],
      [3902, 3903, 14],
      [3904, 3911, 11],
      [3913, 3948, 11],
      [3953, 3966, 14],
      [3967, 3967, 14],
      [3968, 3972, 14],
      [3974, 3975, 14],
      [3976, 3980, 11],
      [3981, 3991, 14],
      [3993, 4028, 14],
      [4038, 4038, 14],
      [4139, 4140, 14],
      [4141, 4144, 14],
      [4145, 4145, 14],
      [4146, 4151, 14],
      [4152, 4152, 14],
      [4153, 4154, 14],
      [4155, 4156, 14],
      [4157, 4158, 14],
      [4160, 4169, 9],
      [4182, 4183, 14],
      [4184, 4185, 14],
      [4190, 4192, 14],
      [4194, 4196, 14],
      [4199, 4205, 14],
      [4209, 4212, 14],
      [4226, 4226, 14],
      [4227, 4228, 14],
      [4229, 4230, 14],
      [4231, 4236, 14],
      [4237, 4237, 14],
      [4239, 4239, 14],
      [4240, 4249, 9],
      [4250, 4252, 14],
      [4253, 4253, 14],
      [4256, 4293, 11],
      [4295, 4295, 11],
      [4301, 4301, 11],
      [4304, 4346, 11],
      [4348, 4348, 11],
      [4349, 4351, 11],
      [4352, 4680, 11],
      [4682, 4685, 11],
      [4688, 4694, 11],
      [4696, 4696, 11],
      [4698, 4701, 11],
      [4704, 4744, 11],
      [4746, 4749, 11],
      [4752, 4784, 11],
      [4786, 4789, 11],
      [4792, 4798, 11],
      [4800, 4800, 11],
      [4802, 4805, 11],
      [4808, 4822, 11],
      [4824, 4880, 11],
      [4882, 4885, 11],
      [4888, 4954, 11],
      [4957, 4959, 14],
      [4992, 5007, 11],
      [5024, 5109, 11],
      [5112, 5117, 11],
      [5121, 5740, 11],
      [5743, 5759, 11],
      [5760, 5760, 4],
      [5761, 5786, 11],
      [5792, 5866, 11],
      [5870, 5872, 11],
      [5873, 5880, 11],
      [5888, 5900, 11],
      [5902, 5905, 11],
      [5906, 5908, 14],
      [5920, 5937, 11],
      [5938, 5940, 14],
      [5952, 5969, 11],
      [5970, 5971, 14],
      [5984, 5996, 11],
      [5998, 6e3, 11],
      [6002, 6003, 14],
      [6068, 6069, 14],
      [6070, 6070, 14],
      [6071, 6077, 14],
      [6078, 6085, 14],
      [6086, 6086, 14],
      [6087, 6088, 14],
      [6089, 6099, 14],
      [6109, 6109, 14],
      [6112, 6121, 9],
      [6155, 6157, 14],
      [6158, 6158, 13],
      [6160, 6169, 9],
      [6176, 6210, 11],
      [6211, 6211, 11],
      [6212, 6264, 11],
      [6272, 6276, 11],
      [6277, 6278, 14],
      [6279, 6312, 11],
      [6313, 6313, 14],
      [6314, 6314, 11],
      [6320, 6389, 11],
      [6400, 6430, 11],
      [6432, 6434, 14],
      [6435, 6438, 14],
      [6439, 6440, 14],
      [6441, 6443, 14],
      [6448, 6449, 14],
      [6450, 6450, 14],
      [6451, 6456, 14],
      [6457, 6459, 14],
      [6470, 6479, 9],
      [6608, 6617, 9],
      [6656, 6678, 11],
      [6679, 6680, 14],
      [6681, 6682, 14],
      [6683, 6683, 14],
      [6741, 6741, 14],
      [6742, 6742, 14],
      [6743, 6743, 14],
      [6744, 6750, 14],
      [6752, 6752, 14],
      [6753, 6753, 14],
      [6754, 6754, 14],
      [6755, 6756, 14],
      [6757, 6764, 14],
      [6765, 6770, 14],
      [6771, 6780, 14],
      [6783, 6783, 14],
      [6784, 6793, 9],
      [6800, 6809, 9],
      [6832, 6845, 14],
      [6846, 6846, 14],
      [6912, 6915, 14],
      [6916, 6916, 14],
      [6917, 6963, 11],
      [6964, 6964, 14],
      [6965, 6965, 14],
      [6966, 6970, 14],
      [6971, 6971, 14],
      [6972, 6972, 14],
      [6973, 6977, 14],
      [6978, 6978, 14],
      [6979, 6980, 14],
      [6981, 6987, 11],
      [6992, 7001, 9],
      [7019, 7027, 14],
      [7040, 7041, 14],
      [7042, 7042, 14],
      [7043, 7072, 11],
      [7073, 7073, 14],
      [7074, 7077, 14],
      [7078, 7079, 14],
      [7080, 7081, 14],
      [7082, 7082, 14],
      [7083, 7085, 14],
      [7086, 7087, 11],
      [7088, 7097, 9],
      [7098, 7141, 11],
      [7142, 7142, 14],
      [7143, 7143, 14],
      [7144, 7145, 14],
      [7146, 7148, 14],
      [7149, 7149, 14],
      [7150, 7150, 14],
      [7151, 7153, 14],
      [7154, 7155, 14],
      [7168, 7203, 11],
      [7204, 7211, 14],
      [7212, 7219, 14],
      [7220, 7221, 14],
      [7222, 7223, 14],
      [7232, 7241, 9],
      [7245, 7247, 11],
      [7248, 7257, 9],
      [7258, 7287, 11],
      [7288, 7293, 11],
      [7296, 7304, 11],
      [7312, 7354, 11],
      [7357, 7359, 11],
      [7376, 7378, 14],
      [7380, 7392, 14],
      [7393, 7393, 14],
      [7394, 7400, 14],
      [7401, 7404, 11],
      [7405, 7405, 14],
      [7406, 7411, 11],
      [7412, 7412, 14],
      [7413, 7414, 11],
      [7415, 7415, 14],
      [7416, 7417, 14],
      [7418, 7418, 11],
      [7424, 7467, 11],
      [7468, 7530, 11],
      [7531, 7543, 11],
      [7544, 7544, 11],
      [7545, 7578, 11],
      [7579, 7615, 11],
      [7616, 7673, 14],
      [7675, 7679, 14],
      [7680, 7957, 11],
      [7960, 7965, 11],
      [7968, 8005, 11],
      [8008, 8013, 11],
      [8016, 8023, 11],
      [8025, 8025, 11],
      [8027, 8027, 11],
      [8029, 8029, 11],
      [8031, 8061, 11],
      [8064, 8116, 11],
      [8118, 8124, 11],
      [8126, 8126, 11],
      [8130, 8132, 11],
      [8134, 8140, 11],
      [8144, 8147, 11],
      [8150, 8155, 11],
      [8160, 8172, 11],
      [8178, 8180, 11],
      [8182, 8188, 11],
      [8192, 8198, 4],
      [8200, 8202, 4],
      [8204, 8204, 14],
      [8205, 8205, 16],
      [8206, 8207, 13],
      [8216, 8216, 8],
      [8217, 8217, 8],
      [8228, 8228, 8],
      [8231, 8231, 10],
      [8232, 8232, 2],
      [8233, 8233, 2],
      [8234, 8238, 13],
      [8239, 8239, 12],
      [8255, 8256, 12],
      [8260, 8260, 7],
      [8276, 8276, 12],
      [8287, 8287, 4],
      [8288, 8292, 13],
      [8294, 8303, 13],
      [8305, 8305, 11],
      [8319, 8319, 11],
      [8336, 8348, 11],
      [8400, 8412, 14],
      [8413, 8416, 14],
      [8417, 8417, 14],
      [8418, 8420, 14],
      [8421, 8432, 14],
      [8450, 8450, 11],
      [8455, 8455, 11],
      [8458, 8467, 11],
      [8469, 8469, 11],
      [8473, 8477, 11],
      [8484, 8484, 11],
      [8486, 8486, 11],
      [8488, 8488, 11],
      [8490, 8493, 11],
      [8495, 8500, 11],
      [8501, 8504, 11],
      [8505, 8505, 11],
      [8508, 8511, 11],
      [8517, 8521, 11],
      [8526, 8526, 11],
      [8544, 8578, 11],
      [8579, 8580, 11],
      [8581, 8584, 11],
      [9398, 9449, 11],
      [11264, 11310, 11],
      [11312, 11358, 11],
      [11360, 11387, 11],
      [11388, 11389, 11],
      [11390, 11492, 11],
      [11499, 11502, 11],
      [11503, 11505, 14],
      [11506, 11507, 11],
      [11520, 11557, 11],
      [11559, 11559, 11],
      [11565, 11565, 11],
      [11568, 11623, 11],
      [11631, 11631, 11],
      [11647, 11647, 14],
      [11648, 11670, 11],
      [11680, 11686, 11],
      [11688, 11694, 11],
      [11696, 11702, 11],
      [11704, 11710, 11],
      [11712, 11718, 11],
      [11720, 11726, 11],
      [11728, 11734, 11],
      [11736, 11742, 11],
      [11744, 11775, 14],
      [11823, 11823, 11],
      [12288, 12288, 4],
      [12293, 12293, 11],
      [12330, 12333, 14],
      [12334, 12335, 14],
      [12337, 12341, 17],
      [12347, 12347, 11],
      [12348, 12348, 11],
      [12441, 12442, 14],
      [12443, 12444, 17],
      [12448, 12448, 17],
      [12449, 12538, 17],
      [12540, 12542, 17],
      [12543, 12543, 17],
      [12549, 12591, 11],
      [12593, 12686, 11],
      [12704, 12730, 11],
      [12784, 12799, 17],
      [13008, 13054, 17],
      [13056, 13143, 17],
      [40960, 40980, 11],
      [40981, 40981, 11],
      [40982, 42124, 11],
      [42192, 42231, 11],
      [42232, 42237, 11],
      [42240, 42507, 11],
      [42508, 42508, 11],
      [42512, 42527, 11],
      [42528, 42537, 9],
      [42538, 42539, 11],
      [42560, 42605, 11],
      [42606, 42606, 11],
      [42607, 42607, 14],
      [42608, 42610, 14],
      [42612, 42621, 14],
      [42623, 42623, 11],
      [42624, 42651, 11],
      [42652, 42653, 11],
      [42654, 42655, 14],
      [42656, 42725, 11],
      [42726, 42735, 11],
      [42736, 42737, 14],
      [42775, 42783, 11],
      [42784, 42785, 11],
      [42786, 42863, 11],
      [42864, 42864, 11],
      [42865, 42887, 11],
      [42888, 42888, 11],
      [42889, 42890, 11],
      [42891, 42894, 11],
      [42895, 42895, 11],
      [42896, 42943, 11],
      [42946, 42950, 11],
      [42999, 42999, 11],
      [43e3, 43001, 11],
      [43002, 43002, 11],
      [43003, 43009, 11],
      [43010, 43010, 14],
      [43011, 43013, 11],
      [43014, 43014, 14],
      [43015, 43018, 11],
      [43019, 43019, 14],
      [43020, 43042, 11],
      [43043, 43044, 14],
      [43045, 43046, 14],
      [43047, 43047, 14],
      [43072, 43123, 11],
      [43136, 43137, 14],
      [43138, 43187, 11],
      [43188, 43203, 14],
      [43204, 43205, 14],
      [43216, 43225, 9],
      [43232, 43249, 14],
      [43250, 43255, 11],
      [43259, 43259, 11],
      [43261, 43262, 11],
      [43263, 43263, 14],
      [43264, 43273, 9],
      [43274, 43301, 11],
      [43302, 43309, 14],
      [43312, 43334, 11],
      [43335, 43345, 14],
      [43346, 43347, 14],
      [43360, 43388, 11],
      [43392, 43394, 14],
      [43395, 43395, 14],
      [43396, 43442, 11],
      [43443, 43443, 14],
      [43444, 43445, 14],
      [43446, 43449, 14],
      [43450, 43451, 14],
      [43452, 43453, 14],
      [43454, 43456, 14],
      [43471, 43471, 11],
      [43472, 43481, 9],
      [43493, 43493, 14],
      [43504, 43513, 9],
      [43520, 43560, 11],
      [43561, 43566, 14],
      [43567, 43568, 14],
      [43569, 43570, 14],
      [43571, 43572, 14],
      [43573, 43574, 14],
      [43584, 43586, 11],
      [43587, 43587, 14],
      [43588, 43595, 11],
      [43596, 43596, 14],
      [43597, 43597, 14],
      [43600, 43609, 9],
      [43643, 43643, 14],
      [43644, 43644, 14],
      [43645, 43645, 14],
      [43696, 43696, 14],
      [43698, 43700, 14],
      [43703, 43704, 14],
      [43710, 43711, 14],
      [43713, 43713, 14],
      [43744, 43754, 11],
      [43755, 43755, 14],
      [43756, 43757, 14],
      [43758, 43759, 14],
      [43762, 43762, 11],
      [43763, 43764, 11],
      [43765, 43765, 14],
      [43766, 43766, 14],
      [43777, 43782, 11],
      [43785, 43790, 11],
      [43793, 43798, 11],
      [43808, 43814, 11],
      [43816, 43822, 11],
      [43824, 43866, 11],
      [43867, 43867, 11],
      [43868, 43871, 11],
      [43872, 43879, 11],
      [43888, 43967, 11],
      [43968, 44002, 11],
      [44003, 44004, 14],
      [44005, 44005, 14],
      [44006, 44007, 14],
      [44008, 44008, 14],
      [44009, 44010, 14],
      [44012, 44012, 14],
      [44013, 44013, 14],
      [44016, 44025, 9],
      [44032, 55203, 11],
      [55216, 55238, 11],
      [55243, 55291, 11],
      [64256, 64262, 11],
      [64275, 64279, 11],
      [64285, 64285, 15],
      [64286, 64286, 14],
      [64287, 64296, 15],
      [64298, 64310, 15],
      [64312, 64316, 15],
      [64318, 64318, 15],
      [64320, 64321, 15],
      [64323, 64324, 15],
      [64326, 64335, 15],
      [64336, 64433, 11],
      [64467, 64829, 11],
      [64848, 64911, 11],
      [64914, 64967, 11],
      [65008, 65019, 11],
      [65024, 65039, 14],
      [65040, 65040, 7],
      [65043, 65043, 10],
      [65044, 65044, 7],
      [65056, 65071, 14],
      [65075, 65076, 12],
      [65101, 65103, 12],
      [65104, 65104, 7],
      [65106, 65106, 8],
      [65108, 65108, 7],
      [65109, 65109, 10],
      [65136, 65140, 11],
      [65142, 65276, 11],
      [65279, 65279, 13],
      [65287, 65287, 8],
      [65292, 65292, 7],
      [65294, 65294, 8],
      [65296, 65305, 9],
      [65306, 65306, 10],
      [65307, 65307, 7],
      [65313, 65338, 11],
      [65343, 65343, 12],
      [65345, 65370, 11],
      [65382, 65391, 17],
      [65392, 65392, 17],
      [65393, 65437, 17],
      [65438, 65439, 14],
      [65440, 65470, 11],
      [65474, 65479, 11],
      [65482, 65487, 11],
      [65490, 65495, 11],
      [65498, 65500, 11],
      [65529, 65531, 13],
      [65536, 65547, 11],
      [65549, 65574, 11],
      [65576, 65594, 11],
      [65596, 65597, 11],
      [65599, 65613, 11],
      [65616, 65629, 11],
      [65664, 65786, 11],
      [65856, 65908, 11],
      [66045, 66045, 14],
      [66176, 66204, 11],
      [66208, 66256, 11],
      [66272, 66272, 14],
      [66304, 66335, 11],
      [66349, 66368, 11],
      [66369, 66369, 11],
      [66370, 66377, 11],
      [66378, 66378, 11],
      [66384, 66421, 11],
      [66422, 66426, 14],
      [66432, 66461, 11],
      [66464, 66499, 11],
      [66504, 66511, 11],
      [66513, 66517, 11],
      [66560, 66639, 11],
      [66640, 66717, 11],
      [66720, 66729, 9],
      [66736, 66771, 11],
      [66776, 66811, 11],
      [66816, 66855, 11],
      [66864, 66915, 11],
      [67072, 67382, 11],
      [67392, 67413, 11],
      [67424, 67431, 11],
      [67584, 67589, 11],
      [67592, 67592, 11],
      [67594, 67637, 11],
      [67639, 67640, 11],
      [67644, 67644, 11],
      [67647, 67669, 11],
      [67680, 67702, 11],
      [67712, 67742, 11],
      [67808, 67826, 11],
      [67828, 67829, 11],
      [67840, 67861, 11],
      [67872, 67897, 11],
      [67968, 68023, 11],
      [68030, 68031, 11],
      [68096, 68096, 11],
      [68097, 68099, 14],
      [68101, 68102, 14],
      [68108, 68111, 14],
      [68112, 68115, 11],
      [68117, 68119, 11],
      [68121, 68149, 11],
      [68152, 68154, 14],
      [68159, 68159, 14],
      [68192, 68220, 11],
      [68224, 68252, 11],
      [68288, 68295, 11],
      [68297, 68324, 11],
      [68325, 68326, 14],
      [68352, 68405, 11],
      [68416, 68437, 11],
      [68448, 68466, 11],
      [68480, 68497, 11],
      [68608, 68680, 11],
      [68736, 68786, 11],
      [68800, 68850, 11],
      [68864, 68899, 11],
      [68900, 68903, 14],
      [68912, 68921, 9],
      [69376, 69404, 11],
      [69415, 69415, 11],
      [69424, 69445, 11],
      [69446, 69456, 14],
      [69600, 69622, 11],
      [69632, 69632, 14],
      [69633, 69633, 14],
      [69634, 69634, 14],
      [69635, 69687, 11],
      [69688, 69702, 14],
      [69734, 69743, 9],
      [69759, 69761, 14],
      [69762, 69762, 14],
      [69763, 69807, 11],
      [69808, 69810, 14],
      [69811, 69814, 14],
      [69815, 69816, 14],
      [69817, 69818, 14],
      [69821, 69821, 13],
      [69837, 69837, 13],
      [69840, 69864, 11],
      [69872, 69881, 9],
      [69888, 69890, 14],
      [69891, 69926, 11],
      [69927, 69931, 14],
      [69932, 69932, 14],
      [69933, 69940, 14],
      [69942, 69951, 9],
      [69956, 69956, 11],
      [69957, 69958, 14],
      [69968, 70002, 11],
      [70003, 70003, 14],
      [70006, 70006, 11],
      [70016, 70017, 14],
      [70018, 70018, 14],
      [70019, 70066, 11],
      [70067, 70069, 14],
      [70070, 70078, 14],
      [70079, 70080, 14],
      [70081, 70084, 11],
      [70089, 70092, 14],
      [70096, 70105, 9],
      [70106, 70106, 11],
      [70108, 70108, 11],
      [70144, 70161, 11],
      [70163, 70187, 11],
      [70188, 70190, 14],
      [70191, 70193, 14],
      [70194, 70195, 14],
      [70196, 70196, 14],
      [70197, 70197, 14],
      [70198, 70199, 14],
      [70206, 70206, 14],
      [70272, 70278, 11],
      [70280, 70280, 11],
      [70282, 70285, 11],
      [70287, 70301, 11],
      [70303, 70312, 11],
      [70320, 70366, 11],
      [70367, 70367, 14],
      [70368, 70370, 14],
      [70371, 70378, 14],
      [70384, 70393, 9],
      [70400, 70401, 14],
      [70402, 70403, 14],
      [70405, 70412, 11],
      [70415, 70416, 11],
      [70419, 70440, 11],
      [70442, 70448, 11],
      [70450, 70451, 11],
      [70453, 70457, 11],
      [70459, 70460, 14],
      [70461, 70461, 11],
      [70462, 70463, 14],
      [70464, 70464, 14],
      [70465, 70468, 14],
      [70471, 70472, 14],
      [70475, 70477, 14],
      [70480, 70480, 11],
      [70487, 70487, 14],
      [70493, 70497, 11],
      [70498, 70499, 14],
      [70502, 70508, 14],
      [70512, 70516, 14],
      [70656, 70708, 11],
      [70709, 70711, 14],
      [70712, 70719, 14],
      [70720, 70721, 14],
      [70722, 70724, 14],
      [70725, 70725, 14],
      [70726, 70726, 14],
      [70727, 70730, 11],
      [70736, 70745, 9],
      [70750, 70750, 14],
      [70751, 70751, 11],
      [70784, 70831, 11],
      [70832, 70834, 14],
      [70835, 70840, 14],
      [70841, 70841, 14],
      [70842, 70842, 14],
      [70843, 70846, 14],
      [70847, 70848, 14],
      [70849, 70849, 14],
      [70850, 70851, 14],
      [70852, 70853, 11],
      [70855, 70855, 11],
      [70864, 70873, 9],
      [71040, 71086, 11],
      [71087, 71089, 14],
      [71090, 71093, 14],
      [71096, 71099, 14],
      [71100, 71101, 14],
      [71102, 71102, 14],
      [71103, 71104, 14],
      [71128, 71131, 11],
      [71132, 71133, 14],
      [71168, 71215, 11],
      [71216, 71218, 14],
      [71219, 71226, 14],
      [71227, 71228, 14],
      [71229, 71229, 14],
      [71230, 71230, 14],
      [71231, 71232, 14],
      [71236, 71236, 11],
      [71248, 71257, 9],
      [71296, 71338, 11],
      [71339, 71339, 14],
      [71340, 71340, 14],
      [71341, 71341, 14],
      [71342, 71343, 14],
      [71344, 71349, 14],
      [71350, 71350, 14],
      [71351, 71351, 14],
      [71352, 71352, 11],
      [71360, 71369, 9],
      [71453, 71455, 14],
      [71456, 71457, 14],
      [71458, 71461, 14],
      [71462, 71462, 14],
      [71463, 71467, 14],
      [71472, 71481, 9],
      [71680, 71723, 11],
      [71724, 71726, 14],
      [71727, 71735, 14],
      [71736, 71736, 14],
      [71737, 71738, 14],
      [71840, 71903, 11],
      [71904, 71913, 9],
      [71935, 71935, 11],
      [72096, 72103, 11],
      [72106, 72144, 11],
      [72145, 72147, 14],
      [72148, 72151, 14],
      [72154, 72155, 14],
      [72156, 72159, 14],
      [72160, 72160, 14],
      [72161, 72161, 11],
      [72163, 72163, 11],
      [72164, 72164, 14],
      [72192, 72192, 11],
      [72193, 72202, 14],
      [72203, 72242, 11],
      [72243, 72248, 14],
      [72249, 72249, 14],
      [72250, 72250, 11],
      [72251, 72254, 14],
      [72263, 72263, 14],
      [72272, 72272, 11],
      [72273, 72278, 14],
      [72279, 72280, 14],
      [72281, 72283, 14],
      [72284, 72329, 11],
      [72330, 72342, 14],
      [72343, 72343, 14],
      [72344, 72345, 14],
      [72349, 72349, 11],
      [72384, 72440, 11],
      [72704, 72712, 11],
      [72714, 72750, 11],
      [72751, 72751, 14],
      [72752, 72758, 14],
      [72760, 72765, 14],
      [72766, 72766, 14],
      [72767, 72767, 14],
      [72768, 72768, 11],
      [72784, 72793, 9],
      [72818, 72847, 11],
      [72850, 72871, 14],
      [72873, 72873, 14],
      [72874, 72880, 14],
      [72881, 72881, 14],
      [72882, 72883, 14],
      [72884, 72884, 14],
      [72885, 72886, 14],
      [72960, 72966, 11],
      [72968, 72969, 11],
      [72971, 73008, 11],
      [73009, 73014, 14],
      [73018, 73018, 14],
      [73020, 73021, 14],
      [73023, 73029, 14],
      [73030, 73030, 11],
      [73031, 73031, 14],
      [73040, 73049, 9],
      [73056, 73061, 11],
      [73063, 73064, 11],
      [73066, 73097, 11],
      [73098, 73102, 14],
      [73104, 73105, 14],
      [73107, 73108, 14],
      [73109, 73109, 14],
      [73110, 73110, 14],
      [73111, 73111, 14],
      [73112, 73112, 11],
      [73120, 73129, 9],
      [73440, 73458, 11],
      [73459, 73460, 14],
      [73461, 73462, 14],
      [73728, 74649, 11],
      [74752, 74862, 11],
      [74880, 75075, 11],
      [77824, 78894, 11],
      [78896, 78904, 13],
      [82944, 83526, 11],
      [92160, 92728, 11],
      [92736, 92766, 11],
      [92768, 92777, 9],
      [92880, 92909, 11],
      [92912, 92916, 14],
      [92928, 92975, 11],
      [92976, 92982, 14],
      [92992, 92995, 11],
      [93008, 93017, 9],
      [93027, 93047, 11],
      [93053, 93071, 11],
      [93760, 93823, 11],
      [93952, 94026, 11],
      [94031, 94031, 14],
      [94032, 94032, 11],
      [94033, 94087, 14],
      [94095, 94098, 14],
      [94099, 94111, 11],
      [94176, 94177, 11],
      [94179, 94179, 11],
      [110592, 110592, 17],
      [110948, 110951, 17],
      [113664, 113770, 11],
      [113776, 113788, 11],
      [113792, 113800, 11],
      [113808, 113817, 11],
      [113821, 113822, 14],
      [113824, 113827, 13],
      [119141, 119142, 14],
      [119143, 119145, 14],
      [119149, 119154, 14],
      [119155, 119162, 13],
      [119163, 119170, 14],
      [119173, 119179, 14],
      [119210, 119213, 14],
      [119362, 119364, 14],
      [119808, 119892, 11],
      [119894, 119964, 11],
      [119966, 119967, 11],
      [119970, 119970, 11],
      [119973, 119974, 11],
      [119977, 119980, 11],
      [119982, 119993, 11],
      [119995, 119995, 11],
      [119997, 120003, 11],
      [120005, 120069, 11],
      [120071, 120074, 11],
      [120077, 120084, 11],
      [120086, 120092, 11],
      [120094, 120121, 11],
      [120123, 120126, 11],
      [120128, 120132, 11],
      [120134, 120134, 11],
      [120138, 120144, 11],
      [120146, 120485, 11],
      [120488, 120512, 11],
      [120514, 120538, 11],
      [120540, 120570, 11],
      [120572, 120596, 11],
      [120598, 120628, 11],
      [120630, 120654, 11],
      [120656, 120686, 11],
      [120688, 120712, 11],
      [120714, 120744, 11],
      [120746, 120770, 11],
      [120772, 120779, 11],
      [120782, 120831, 9],
      [121344, 121398, 14],
      [121403, 121452, 14],
      [121461, 121461, 14],
      [121476, 121476, 14],
      [121499, 121503, 14],
      [121505, 121519, 14],
      [122880, 122886, 14],
      [122888, 122904, 14],
      [122907, 122913, 14],
      [122915, 122916, 14],
      [122918, 122922, 14],
      [123136, 123180, 11],
      [123184, 123190, 14],
      [123191, 123197, 11],
      [123200, 123209, 9],
      [123214, 123214, 11],
      [123584, 123627, 11],
      [123628, 123631, 14],
      [123632, 123641, 9],
      [124928, 125124, 11],
      [125136, 125142, 14],
      [125184, 125251, 11],
      [125252, 125258, 14],
      [125259, 125259, 11],
      [125264, 125273, 9],
      [126464, 126467, 11],
      [126469, 126495, 11],
      [126497, 126498, 11],
      [126500, 126500, 11],
      [126503, 126503, 11],
      [126505, 126514, 11],
      [126516, 126519, 11],
      [126521, 126521, 11],
      [126523, 126523, 11],
      [126530, 126530, 11],
      [126535, 126535, 11],
      [126537, 126537, 11],
      [126539, 126539, 11],
      [126541, 126543, 11],
      [126545, 126546, 11],
      [126548, 126548, 11],
      [126551, 126551, 11],
      [126553, 126553, 11],
      [126555, 126555, 11],
      [126557, 126557, 11],
      [126559, 126559, 11],
      [126561, 126562, 11],
      [126564, 126564, 11],
      [126567, 126570, 11],
      [126572, 126578, 11],
      [126580, 126583, 11],
      [126585, 126588, 11],
      [126590, 126590, 11],
      [126592, 126601, 11],
      [126603, 126619, 11],
      [126625, 126627, 11],
      [126629, 126633, 11],
      [126635, 126651, 11],
      [127280, 127305, 11],
      [127312, 127337, 11],
      [127344, 127369, 11],
      [127462, 127487, 18],
      [127995, 127999, 14],
      [917505, 917505, 13],
      [917536, 917631, 14],
      [917760, 917999, 14],
    ];
  })(g || (g = {}));
  (function (a) {
    function c(a) {
      return !Array.from(a)
        .map(e)
        .every(function (a) {
          return 3 === a || 1 === a || 2 === a || 4 === a;
        });
    }
    function b(a) {
      function b(b) {
        return b >= a.length ? a.length : d(a[b]) ? b + 2 : b + 1;
      }
      function c(b) {
        return 0 > b ? 19 : b >= a.length ? 20 : d(a[b]) ? e(a[b] + a[b + 1]) : e(a[b]);
      }
      function f(a) {
        return 11 === a || 15 === a;
      }
      if (0 === a.length) return [];
      var h = [];
      var g = 0;
      var k = 19,
        m = 19;
      var n = c(0);
      var r = 0;
      do {
        var q = g;
        g = b(g);
        n = [k, m, n, c(g)];
        var w = n[0];
        k = n[1];
        m = n[2];
        n = n[3];
        if (19 === k) h.push(q);
        else {
          if (20 === m) {
            h.push(q);
            break;
          }
          if (3 !== k || 1 !== m)
            if (2 === k || 3 === k || 1 === k) h.push(q);
            else if (2 === m || 3 === m || 1 === m) h.push(q);
            else if (4 !== k || 4 != m) {
              for (; 13 === m || 14 === m || 16 === m; ) (g = [g, b(g)]), (q = g[0]), (g = g[1]), (n = [n, c(g)]), (m = n[0]), (n = n[1]);
              if (20 === m) {
                h.push(q);
                break;
              }
              for (; 13 === n || 14 === n || 16 === n; ) (g = b(g)), (n = c(g));
              if (!f(k) || !f(m))
                if (!f(k) || !f(n) || (10 !== m && 8 !== m && 6 !== m))
                  if (!f(w) || !f(m) || (10 !== k && 8 !== k && 6 !== k))
                    if (15 !== k || 6 !== m)
                      if (15 !== k || 5 !== m || 15 !== n)
                        if (15 !== w || 5 !== k || 15 !== m)
                          if (9 !== k || 9 !== m)
                            if (!f(k) || 9 !== m)
                              if (9 !== k || !f(m))
                                if (9 !== w || 9 !== m || (7 !== k && 8 !== k && 6 !== k))
                                  if (9 !== k || 9 !== n || (7 !== m && 8 !== m && 6 !== m))
                                    if (17 !== k || 17 !== m)
                                      if ((!f(k) && 9 !== k && 17 !== k && 12 !== k) || 12 !== m)
                                        if ((!f(m) && 9 !== m && 17 !== m) || 12 !== k) {
                                          if (18 === m) {
                                            if (((r += 1), 1 == r % 2)) continue;
                                          } else r = 0;
                                          h.push(q);
                                        }
            }
        }
      } while (q < a.length);
      return h;
    }
    function d(a) {
      a = a.charCodeAt(0);
      return 55296 <= a && 56319 >= a;
    }
    function e(a) {
      a = a.codePointAt(0);
      return f(a, 0, g.length - 1);
    }
    function f(a, b, c) {
      if (c < b) return 0;
      var d = b + ~~((c - b) / 2),
        e = g[d];
      return a < e[0] ? f(a, b, d - 1) : a > e[1] ? f(a, d + 1, c) : e[2];
    }
    a.default_ = function (a) {
      var d = b(a);
      if (0 == d.length) return [];
      for (var e = [], f = 0; f < d.length - 1; f++) {
        var h = d[f + 1],
          g = new k(a, d[f], h);
        c(g.text) ? e.push(g) : f == d.length - 2 && ((g = new k(a, h, h)), e.push(g));
      }
      return e;
    };
    var g = a.data.WORD_BREAK_PROPERTY,
      k = (function () {
        function a(a, b, c) {
          this._source = a;
          this.start = b;
          this.end = c;
        }
        Object.defineProperty(a.prototype, "text", {
          get: function () {
            return this._source.substring(this.start, this.end);
          },
          enumerable: !0,
          configurable: !0,
        });
        Object.defineProperty(a.prototype, "length", {
          get: function () {
            return this.end - this.start;
          },
          enumerable: !0,
          configurable: !0,
        });
        return a;
      })();
  })(g || (g = {}));
  g["default"] = g.default_;
}
(function (f, g) {
  "function" === typeof define && define.amd ? define(g) : "object" === typeof exports ? (module.exports = g()) : (f.returnExports = g());
})(this, function () {
  var f = Function.call.bind(Function.apply),
    g = Function.call.bind(Function.call),
    k = Array.isArray,
    r = Object.keys,
    e = function (a) {
      try {
        return a(), !1;
      } catch (x) {
        return !0;
      }
    },
    a = function (a) {
      try {
        return a();
      } catch (x) {
        return !1;
      }
    },
    d = (function (a) {
      return function () {
        return !f(a, this, arguments);
      };
    })(e),
    c = function () {
      return !e(function () {
        return Object.defineProperty({}, "x", { get: function () {} });
      });
    },
    b = !!Object.defineProperty && c(),
    h = "foo" === function () {}.name,
    n = Function.call.bind(Array.prototype.forEach),
    w = Function.call.bind(Array.prototype.reduce),
    q = Function.call.bind(Array.prototype.filter),
    z = Function.call.bind(Array.prototype.some),
    m = function (a, c, d, e) {
      (!e && c in a) || (b ? Object.defineProperty(a, c, { configurable: !0, enumerable: !1, writable: !0, value: d }) : (a[c] = d));
    },
    t = function (a, b, c) {
      n(r(b), function (d) {
        m(a, d, b[d], !!c);
      });
    },
    v = Function.call.bind(Object.prototype.toString),
    E =
      "function" === typeof /abc/
        ? function (a) {
            return "function" === typeof a && "[object Function]" === v(a);
          }
        : function (a) {
            return "function" === typeof a;
          },
    y = {
      getter: function (a, c, d) {
        if (!b) throw new TypeError("getters require true ES5 support");
        Object.defineProperty(a, c, { configurable: !0, enumerable: !1, get: d });
      },
      proxy: function (a, c, d) {
        if (!b) throw new TypeError("getters require true ES5 support");
        var e = Object.getOwnPropertyDescriptor(a, c);
        Object.defineProperty(d, c, {
          configurable: e.configurable,
          enumerable: e.enumerable,
          get: function () {
            return a[c];
          },
          set: function (b) {
            a[c] = b;
          },
        });
      },
      redefine: function (a, c, d) {
        if (b) {
          var e = Object.getOwnPropertyDescriptor(a, c);
          e.value = d;
          Object.defineProperty(a, c, e);
        } else a[c] = d;
      },
      defineByDescriptor: function (a, c, d) {
        b ? Object.defineProperty(a, c, d) : "value" in d && (a[c] = d.value);
      },
      preserveToString: function (a, b) {
        b && E(b.toString) && m(a, "toString", b.toString.bind(b), !0);
      },
    },
    P =
      Object.create ||
      function (a, b) {
        var c = function () {};
        c.prototype = a;
        var d = new c();
        "undefined" !== typeof b &&
          r(b).forEach(function (a) {
            y.defineByDescriptor(d, a, b[a]);
          });
        return d;
      },
    N = function (b, c) {
      return Object.setPrototypeOf
        ? a(function () {
            var a = function sa(a) {
              a = new b(a);
              Object.setPrototypeOf(a, sa.prototype);
              return a;
            };
            Object.setPrototypeOf(a, b);
            a.prototype = P(b.prototype, { constructor: { value: a } });
            return c(a);
          })
        : !1;
    },
    p = (function () {
      if ("undefined" !== typeof self) return self;
      if ("undefined" !== typeof window) return window;
      if ("undefined" !== typeof global) return global;
      throw Error("unable to locate global object");
    })(),
    G = p.isFinite,
    Da = Function.call.bind(String.prototype.indexOf),
    Ga = Function.apply.bind(Array.prototype.indexOf),
    ja = Function.call.bind(Array.prototype.concat),
    Q = Function.call.bind(String.prototype.slice),
    U = Function.call.bind(Array.prototype.push),
    H = Function.apply.bind(Array.prototype.push),
    ka = Function.call.bind(Array.prototype.shift),
    C = Math.max,
    J = Math.min,
    K = Math.floor,
    I = Math.abs,
    X = Math.exp,
    la = Math.log,
    ma = Math.sqrt,
    ta = Function.call.bind(Object.prototype.hasOwnProperty),
    ea = function () {},
    F = p.Map,
    Xb = F && F.prototype["delete"],
    na = F && F.prototype.get,
    oa = F && F.prototype.has,
    db = F && F.prototype.set,
    A = p.Symbol || {},
    Ha = A.species || "@@species",
    L =
      Number.isNaN ||
      function (a) {
        return a !== a;
      },
    Ia =
      Number.isFinite ||
      function (a) {
        return "number" === typeof a && G(a);
      },
    fa = E(Math.sign)
      ? Math.sign
      : function (a) {
          a = Number(a);
          return 0 === a || L(a) ? a : 0 > a ? -1 : 1;
        },
    ha = function (a) {
      a = Number(a);
      return -1 > a || L(a) ? NaN : 0 === a || Infinity === a ? a : -1 === a ? -Infinity : 0 === 1 + a - 1 ? a : a * (la(1 + a) / (1 + a - 1));
    },
    eb = function (a) {
      return "[object Arguments]" === v(a);
    },
    Yb = function (a) {
      return null !== a && "object" === typeof a && "number" === typeof a.length && 0 <= a.length && "[object Array]" !== v(a) && "[object Function]" === v(a.callee);
    },
    Ja = eb(arguments) ? eb : Yb,
    D = {
      primitive: function (a) {
        return null === a || ("function" !== typeof a && "object" !== typeof a);
      },
      string: function (a) {
        return "[object String]" === v(a);
      },
      regex: function (a) {
        return "[object RegExp]" === v(a);
      },
      symbol: function (a) {
        return "function" === typeof p.Symbol && "symbol" === typeof a;
      },
    },
    u = function (a, b, c) {
      var d = a[b];
      m(a, b, c, !0);
      y.preserveToString(a[b], d);
    },
    pa = "function" === typeof A && "function" === typeof A["for"] && D.symbol(A()),
    R = D.symbol(A.iterator) ? A.iterator : "_es6-shim iterator_";
  p.Set && "function" === typeof new p.Set()["@@iterator"] && (R = "@@iterator");
  p.Reflect || m(p, "Reflect", {}, !0);
  var Y = p.Reflect,
    Ka = String,
    La = "undefined" !== typeof document && document ? document.all : null,
    V =
      null == La
        ? function (a) {
            return null == a;
          }
        : function (a) {
            return null == a && a !== La;
          },
    l = {
      Call: function (a, b) {
        var c = 2 < arguments.length ? arguments[2] : [];
        if (!l.IsCallable(a)) throw new TypeError(a + " is not a function");
        return f(a, b, c);
      },
      RequireObjectCoercible: function (a, b) {
        if (V(a)) throw new TypeError(b || "Cannot call method on " + a);
        return a;
      },
      TypeIsObject: function (a) {
        return void 0 === a || null === a || !0 === a || !1 === a ? !1 : "function" === typeof a || "object" === typeof a || a === La;
      },
      ToObject: function (a, b) {
        return Object(l.RequireObjectCoercible(a, b));
      },
      IsCallable: E,
      IsConstructor: function (a) {
        return l.IsCallable(a);
      },
      ToInt32: function (a) {
        return l.ToNumber(a) >> 0;
      },
      ToUint32: function (a) {
        return l.ToNumber(a) >>> 0;
      },
      ToNumber: function (a) {
        if ("[object Symbol]" === v(a)) throw new TypeError("Cannot convert a Symbol value to a number");
        return +a;
      },
      ToInteger: function (a) {
        a = l.ToNumber(a);
        return L(a) ? 0 : 0 !== a && Ia(a) ? (0 < a ? 1 : -1) * K(I(a)) : a;
      },
      ToLength: function (a) {
        a = l.ToInteger(a);
        return 0 >= a ? 0 : a > Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : a;
      },
      SameValue: function (a, b) {
        return a === b ? (0 === a ? 1 / a === 1 / b : !0) : L(a) && L(b);
      },
      SameValueZero: function (a, b) {
        return a === b || (L(a) && L(b));
      },
      IsIterable: function (a) {
        return l.TypeIsObject(a) && ("undefined" !== typeof a[R] || Ja(a));
      },
      GetIterator: function (a) {
        if (Ja(a)) return new Z(a, "value");
        var b = l.GetMethod(a, R);
        if (!l.IsCallable(b)) throw new TypeError("value is not an iterable");
        a = l.Call(b, a);
        if (!l.TypeIsObject(a)) throw new TypeError("bad iterator");
        return a;
      },
      GetMethod: function (a, b) {
        a = l.ToObject(a)[b];
        if (!V(a)) {
          if (!l.IsCallable(a)) throw new TypeError("Method not callable: " + b);
          return a;
        }
      },
      IteratorComplete: function (a) {
        return !!a.done;
      },
      IteratorClose: function (a, b) {
        var c = l.GetMethod(a, "return");
        if (void 0 !== c) {
          try {
            var d = l.Call(c, a);
          } catch (sa) {
            var e = sa;
          }
          if (!b) {
            if (e) throw e;
            if (!l.TypeIsObject(d)) throw new TypeError("Iterator's return method returned a non-object.");
          }
        }
      },
      IteratorNext: function (a) {
        var b = 1 < arguments.length ? a.next(arguments[1]) : a.next();
        if (!l.TypeIsObject(b)) throw new TypeError("bad iterator");
        return b;
      },
      IteratorStep: function (a) {
        a = l.IteratorNext(a);
        return l.IteratorComplete(a) ? !1 : a;
      },
      Construct: function (a, b, c, d) {
        c = "undefined" === typeof c ? a : c;
        if (!d && Y.construct) return Y.construct(a, b, c);
        d = c.prototype;
        l.TypeIsObject(d) || (d = Object.prototype);
        d = P(d);
        a = l.Call(a, d, b);
        return l.TypeIsObject(a) ? a : d;
      },
      SpeciesConstructor: function (a, b) {
        a = a.constructor;
        if (void 0 === a) return b;
        if (!l.TypeIsObject(a)) throw new TypeError("Bad constructor");
        a = a[Ha];
        if (V(a)) return b;
        if (!l.IsConstructor(a)) throw new TypeError("Bad @@species");
        return a;
      },
      CreateHTML: function (a, b, c, d) {
        a = l.ToString(a);
        var e = "<" + b;
        "" !== c && ((d = l.ToString(d).replace(/"/g, "&quot;")), (e += " " + c + '="' + d + '"'));
        return e + ">" + a + "</" + b + ">";
      },
      IsRegExp: function (a) {
        if (!l.TypeIsObject(a)) return !1;
        var b = a[A.match];
        return "undefined" !== typeof b ? !!b : D.regex(a);
      },
      ToString: function (a) {
        return Ka(a);
      },
    };
  if (b && pa) {
    var ua = function (a) {
      if (D.symbol(A[a])) return A[a];
      var b = A["for"]("Symbol." + a);
      Object.defineProperty(A, a, { configurable: !1, enumerable: !1, writable: !1, value: b });
      return b;
    };
    if (!D.symbol(A.search)) {
      var fb = ua("search"),
        gb = String.prototype.search;
      m(RegExp.prototype, fb, function (a) {
        return l.Call(gb, a, [this]);
      });
      u(String.prototype, "search", function (a) {
        var b = l.RequireObjectCoercible(this);
        if (!V(a)) {
          var c = l.GetMethod(a, fb);
          if ("undefined" !== typeof c) return l.Call(c, a, [b]);
        }
        return l.Call(gb, b, [l.ToString(a)]);
      });
    }
    if (!D.symbol(A.replace)) {
      var hb = ua("replace"),
        ib = String.prototype.replace;
      m(RegExp.prototype, hb, function (a, b) {
        return l.Call(ib, a, [this, b]);
      });
      u(String.prototype, "replace", function (a, b) {
        var c = l.RequireObjectCoercible(this);
        if (!V(a)) {
          var d = l.GetMethod(a, hb);
          if ("undefined" !== typeof d) return l.Call(d, a, [c, b]);
        }
        return l.Call(ib, c, [l.ToString(a), b]);
      });
    }
    if (!D.symbol(A.split)) {
      var jb = ua("split"),
        kb = String.prototype.split;
      m(RegExp.prototype, jb, function (a, b) {
        return l.Call(kb, a, [this, b]);
      });
      u(String.prototype, "split", function (a, b) {
        var c = l.RequireObjectCoercible(this);
        if (!V(a)) {
          var d = l.GetMethod(a, jb);
          if ("undefined" !== typeof d) return l.Call(d, a, [c, b]);
        }
        return l.Call(kb, c, [l.ToString(a), b]);
      });
    }
    var lb = D.symbol(A.match),
      Zb =
        lb &&
        (function () {
          var a = {};
          a[A.match] = function () {
            return 42;
          };
          return 42 !== "a".match(a);
        })();
    if (!lb || Zb) {
      var mb = ua("match"),
        nb = String.prototype.match;
      m(RegExp.prototype, mb, function (a) {
        return l.Call(nb, a, [this]);
      });
      u(String.prototype, "match", function (a) {
        var b = l.RequireObjectCoercible(this);
        if (!V(a)) {
          var c = l.GetMethod(a, mb);
          if ("undefined" !== typeof c) return l.Call(c, a, [b]);
        }
        return l.Call(nb, b, [l.ToString(a)]);
      });
    }
  }
  var ob = function (a, c, d) {
      y.preserveToString(c, a);
      Object.setPrototypeOf && Object.setPrototypeOf(a, c);
      b
        ? n(Object.getOwnPropertyNames(a), function (b) {
            b in ea || d[b] || y.proxy(a, b, c);
          })
        : n(Object.keys(a), function (b) {
            b in ea || d[b] || (c[b] = a[b]);
          });
      c.prototype = a.prototype;
      y.redefine(a.prototype, "constructor", c);
    },
    $b = function () {
      return this;
    },
    qa = function (a) {
      b && !ta(a, Ha) && y.getter(a, Ha, $b);
    },
    S = function (a, b) {
      b =
        b ||
        function () {
          return this;
        };
      m(a, R, b);
      !a[R] && D.symbol(R) && (a[R] = b);
    },
    pb = function (a, c, d) {
      b ? Object.defineProperty(a, c, { configurable: !0, enumerable: !0, writable: !0, value: d }) : (a[c] = d);
      if (!l.SameValue(a[c], d)) throw new TypeError("property is nonconfigurable");
    },
    Ma = function (a, b, c, d) {
      if (!l.TypeIsObject(a)) throw new TypeError("Constructor requires `new`: " + b.name);
      a = b.prototype;
      l.TypeIsObject(a) || (a = c);
      c = P(a);
      for (var e in d) ta(d, e) && m(c, e, d[e], !0);
      return c;
    };
  if (String.fromCodePoint && 1 !== String.fromCodePoint.length) {
    var ac = String.fromCodePoint;
    u(String, "fromCodePoint", function (a) {
      return l.Call(ac, this, arguments);
    });
  }
  var qb = {
    fromCodePoint: function (a) {
      for (var b = [], c, d = 0, e = arguments.length; d < e; d++) {
        c = Number(arguments[d]);
        if (!l.SameValue(c, l.ToInteger(c)) || 0 > c || 1114111 < c) throw new RangeError("Invalid code point " + c);
        65536 > c ? U(b, String.fromCharCode(c)) : ((c -= 65536), U(b, String.fromCharCode((c >> 10) + 55296)), U(b, String.fromCharCode((c % 1024) + 56320)));
      }
      return b.join("");
    },
    raw: function (a) {
      var b = l.ToObject(a, "bad callSite");
      b = l.ToObject(b.raw, "bad raw value");
      var c = l.ToLength(b.length);
      if (0 >= c) return "";
      for (var d = [], e = 0, f; e < c; ) {
        f = l.ToString(e);
        f = l.ToString(b[f]);
        U(d, f);
        if (e + 1 >= c) break;
        f = e + 1 < arguments.length ? arguments[e + 1] : "";
        f = l.ToString(f);
        U(d, f);
        e += 1;
      }
      return d.join("");
    },
  };
  String.raw && "xy" !== String.raw({ raw: { 0: "x", 1: "y", length: 2 } }) && u(String, "raw", qb.raw);
  t(String, qb);
  var bc = function Ea(a, b) {
      if (1 > b) return "";
      if (b % 2) return Ea(a, b - 1) + a;
      a = Ea(a, b / 2);
      return a + a;
    },
    aa = {
      repeat: function (a) {
        var b = l.ToString(l.RequireObjectCoercible(this));
        a = l.ToInteger(a);
        if (0 > a || Infinity <= a) throw new RangeError("repeat count must be less than infinity and not overflow maximum string size");
        return bc(b, a);
      },
      startsWith: function (a) {
        var b = l.ToString(l.RequireObjectCoercible(this));
        if (l.IsRegExp(a)) throw new TypeError('Cannot call method "startsWith" with a regex');
        var c = l.ToString(a),
          d;
        1 < arguments.length && (d = arguments[1]);
        d = C(l.ToInteger(d), 0);
        return Q(b, d, d + c.length) === c;
      },
      endsWith: function (a) {
        var b = l.ToString(l.RequireObjectCoercible(this));
        if (l.IsRegExp(a)) throw new TypeError('Cannot call method "endsWith" with a regex');
        var c = l.ToString(a),
          d = b.length,
          e;
        1 < arguments.length && (e = arguments[1]);
        e = "undefined" === typeof e ? d : l.ToInteger(e);
        d = J(C(e, 0), d);
        return Q(b, d - c.length, d) === c;
      },
      includes: function (a) {
        if (l.IsRegExp(a)) throw new TypeError('"includes" does not accept a RegExp');
        var b = l.ToString(a),
          c;
        1 < arguments.length && (c = arguments[1]);
        return -1 !== Da(this, b, c);
      },
      codePointAt: function (a) {
        var b = l.ToString(l.RequireObjectCoercible(this)),
          c = l.ToInteger(a),
          d = b.length;
        if (0 <= c && c < d) {
          a = b.charCodeAt(c);
          if (55296 > a || 56319 < a || c + 1 === d) return a;
          b = b.charCodeAt(c + 1);
          return 56320 > b || 57343 < b ? a : 1024 * (a - 55296) + (b - 56320) + 65536;
        }
      },
    };
  String.prototype.includes && !1 !== "a".includes("a", Infinity) && u(String.prototype, "includes", aa.includes);
  if (String.prototype.startsWith && String.prototype.endsWith) {
    var cc = e(function () {
        return "/a/".startsWith(/a/);
      }),
      dc = a(function () {
        return !1 === "abc".startsWith("a", Infinity);
      });
    (cc && dc) || (u(String.prototype, "startsWith", aa.startsWith), u(String.prototype, "endsWith", aa.endsWith));
  }
  pa &&
    (a(function () {
      var a = /a/;
      a[A.match] = !1;
      return "/a/".startsWith(a);
    }) || u(String.prototype, "startsWith", aa.startsWith),
    a(function () {
      var a = /a/;
      a[A.match] = !1;
      return "/a/".endsWith(a);
    }) || u(String.prototype, "endsWith", aa.endsWith),
    a(function () {
      var a = /a/;
      a[A.match] = !1;
      return "/a/".includes(a);
    }) || u(String.prototype, "includes", aa.includes));
  t(String.prototype, aa);
  var ec = /(^[\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff]+)|([\t\n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff]+$)/g,
    rb = function () {
      return l.ToString(l.RequireObjectCoercible(this)).replace(ec, "");
    },
    sb = /[\u0085\u200b\ufffe]/g,
    tb = /^[-+]0x[0-9a-f]+$/i,
    fc = 3 !== "\u0085\u200b\ufffe".trim().length;
  m(String.prototype, "trim", rb, fc);
  var ba = function (a) {
      return { value: a, done: 0 === arguments.length };
    },
    Na = function (a) {
      l.RequireObjectCoercible(a);
      this._s = l.ToString(a);
      this._i = 0;
    };
  Na.prototype.next = function () {
    var a = this._s,
      b = this._i;
    if ("undefined" === typeof a || b >= a.length) return (this._s = void 0), ba();
    var c = a.charCodeAt(b);
    55296 > c || 56319 < c || b + 1 === a.length ? (c = 1) : ((c = a.charCodeAt(b + 1)), (c = 56320 > c || 57343 < c ? 1 : 2));
    this._i = b + c;
    return ba(a.substr(b, c));
  };
  S(Na.prototype);
  S(String.prototype, function () {
    return new Na(this);
  });
  var va = {
    from: function (a) {
      var b;
      1 < arguments.length && (b = arguments[1]);
      var c;
      if ("undefined" === typeof b) var d = !1;
      else {
        if (!l.IsCallable(b)) throw new TypeError("Array.from: when provided, the second argument must be a function");
        2 < arguments.length && (c = arguments[2]);
        d = !0;
      }
      var e;
      if ("undefined" !== typeof (Ja(a) || l.GetMethod(a, R))) {
        var f = l.IsConstructor(this) ? Object(new this()) : [];
        var h = l.GetIterator(a);
        for (e = 0; ; ) {
          var x = l.IteratorStep(h);
          if (!1 === x) break;
          x = x.value;
          try {
            d && (x = "undefined" === typeof c ? b(x, e) : g(b, c, x, e)), (f[e] = x);
          } catch (gc) {
            throw (l.IteratorClose(h, !0), gc);
          }
          e += 1;
        }
        h = e;
      } else
        for (x = l.ToObject(a), h = l.ToLength(x.length), f = l.IsConstructor(this) ? Object(new this(h)) : Array(h), e = 0; e < h; ++e) {
          var k = x[e];
          d && (k = "undefined" === typeof c ? b(k, e) : g(b, c, k, e));
          pb(f, e, k);
        }
      f.length = h;
      return f;
    },
    of: function () {
      for (var a = arguments.length, b = k(this) || !l.IsCallable(this) ? Array(a) : l.Construct(this, [a]), c = 0; c < a; ++c) pb(b, c, arguments[c]);
      b.length = a;
      return b;
    },
  };
  t(Array, va);
  qa(Array);
  var Z = function (a, b) {
    this.i = 0;
    this.array = a;
    this.kind = b;
  };
  t(Z.prototype, {
    next: function () {
      var a = this.i,
        b = this.array;
      if (!(this instanceof Z)) throw new TypeError("Not an ArrayIterator");
      if ("undefined" !== typeof b)
        for (var c = l.ToLength(b.length); a < c; ) {
          c = this.kind;
          var d;
          "key" === c ? (d = a) : "value" === c ? (d = b[a]) : "entry" === c && (d = [a, b[a]]);
          this.i = a + 1;
          return ba(d);
        }
      this.array = void 0;
      return ba();
    },
  });
  S(Z.prototype);
  Array.of === va.of ||
    (function () {
      var a = function (a) {
        this.length = a;
      };
      a.prototype = [];
      var b = Array.of.apply(a, [1, 2]);
      return b instanceof a && 2 === b.length;
    })() ||
    u(Array, "of", va.of);
  var Ra = {
    copyWithin: function (a, b) {
      var c = l.ToObject(this),
        d = l.ToLength(c.length),
        e = l.ToInteger(a),
        f = l.ToInteger(b);
      e = 0 > e ? C(d + e, 0) : J(e, d);
      f = 0 > f ? C(d + f, 0) : J(f, d);
      var h;
      2 < arguments.length && (h = arguments[2]);
      h = "undefined" === typeof h ? d : l.ToInteger(h);
      h = 0 > h ? C(d + h, 0) : J(h, d);
      d = J(h - f, d - e);
      h = 1;
      f < e && e < f + d && ((h = -1), (f += d - 1), (e += d - 1));
      for (; 0 < d; ) f in c ? (c[e] = c[f]) : delete c[e], (f += h), (e += h), --d;
      return c;
    },
    fill: function (a) {
      var b;
      1 < arguments.length && (b = arguments[1]);
      var c;
      2 < arguments.length && (c = arguments[2]);
      var d = l.ToObject(this),
        e = l.ToLength(d.length);
      b = l.ToInteger("undefined" === typeof b ? 0 : b);
      c = l.ToInteger("undefined" === typeof c ? e : c);
      b = 0 > b ? C(e + b, 0) : J(b, e);
      for (c = 0 > c ? e + c : c; b < e && b < c; ++b) d[b] = a;
      return d;
    },
    find: function (a) {
      var b = l.ToObject(this),
        c = l.ToLength(b.length);
      if (!l.IsCallable(a)) throw new TypeError("Array#find: predicate must be a function");
      for (var d = 1 < arguments.length ? arguments[1] : null, e = 0, f; e < c; e++)
        if (((f = b[e]), d)) {
          if (g(a, d, f, e, b)) return f;
        } else if (a(f, e, b)) return f;
    },
    findIndex: function (a) {
      var b = l.ToObject(this),
        c = l.ToLength(b.length);
      if (!l.IsCallable(a)) throw new TypeError("Array#findIndex: predicate must be a function");
      for (var d = 1 < arguments.length ? arguments[1] : null, e = 0; e < c; e++)
        if (d) {
          if (g(a, d, b[e], e, b)) return e;
        } else if (a(b[e], e, b)) return e;
      return -1;
    },
    keys: function () {
      return new Z(this, "key");
    },
    values: function () {
      return new Z(this, "value");
    },
    entries: function () {
      return new Z(this, "entry");
    },
  };
  Array.prototype.keys && !l.IsCallable([1].keys().next) && delete Array.prototype.keys;
  Array.prototype.entries && !l.IsCallable([1].entries().next) && delete Array.prototype.entries;
  Array.prototype.keys && Array.prototype.entries && !Array.prototype.values && Array.prototype[R] && (t(Array.prototype, { values: Array.prototype[R] }), D.symbol(A.unscopables) && (Array.prototype[A.unscopables].values = !0));
  if (h && Array.prototype.values && "values" !== Array.prototype.values.name) {
    var hc = Array.prototype.values;
    u(Array.prototype, "values", function () {
      return l.Call(hc, this, arguments);
    });
    m(Array.prototype, R, Array.prototype.values, !0);
  }
  t(Array.prototype, Ra);
  0 > 1 / [!0].indexOf(!0, -0) &&
    m(
      Array.prototype,
      "indexOf",
      function (a) {
        var b = Ga(this, arguments);
        return 0 === b && 0 > 1 / b ? 0 : b;
      },
      !0
    );
  S(Array.prototype, function () {
    return this.values();
  });
  Object.getPrototypeOf && S(Object.getPrototypeOf([].values()));
  var ic = (function () {
      return a(function () {
        return 0 === Array.from({ length: -1 }).length;
      });
    })(),
    jc = (function () {
      var a = Array.from([0].entries());
      return 1 === a.length && k(a[0]) && 0 === a[0][0] && 0 === a[0][1];
    })();
  (ic && jc) || u(Array, "from", va.from);
  if (
    !(function () {
      return a(function () {
        return Array.from([0], void 0);
      });
    })()
  ) {
    var ub = Array.from;
    u(Array, "from", function (a) {
      return 1 < arguments.length && "undefined" !== typeof arguments[1] ? l.Call(ub, this, arguments) : g(ub, this, a);
    });
  }
  var kc = -(Math.pow(2, 32) - 1),
    ca = function (b, c) {
      var d = { length: kc };
      d[c ? (d.length >>> 0) - 1 : 0] = !0;
      return a(function () {
        g(
          b,
          d,
          function () {
            throw new RangeError("should not reach here");
          },
          []
        );
        return !0;
      });
    };
  if (!ca(Array.prototype.forEach)) {
    var lc = Array.prototype.forEach;
    u(
      Array.prototype,
      "forEach",
      function (a) {
        return l.Call(lc, 0 <= this.length ? this : [], arguments);
      },
      !0
    );
  }
  if (!ca(Array.prototype.map)) {
    var mc = Array.prototype.map;
    u(
      Array.prototype,
      "map",
      function (a) {
        return l.Call(mc, 0 <= this.length ? this : [], arguments);
      },
      !0
    );
  }
  if (!ca(Array.prototype.filter)) {
    var nc = Array.prototype.filter;
    u(
      Array.prototype,
      "filter",
      function (a) {
        return l.Call(nc, 0 <= this.length ? this : [], arguments);
      },
      !0
    );
  }
  if (!ca(Array.prototype.some)) {
    var oc = Array.prototype.some;
    u(
      Array.prototype,
      "some",
      function (a) {
        return l.Call(oc, 0 <= this.length ? this : [], arguments);
      },
      !0
    );
  }
  if (!ca(Array.prototype.every)) {
    var pc = Array.prototype.every;
    u(
      Array.prototype,
      "every",
      function (a) {
        return l.Call(pc, 0 <= this.length ? this : [], arguments);
      },
      !0
    );
  }
  if (!ca(Array.prototype.reduce)) {
    var qc = Array.prototype.reduce;
    u(
      Array.prototype,
      "reduce",
      function (a) {
        return l.Call(qc, 0 <= this.length ? this : [], arguments);
      },
      !0
    );
  }
  if (!ca(Array.prototype.reduceRight, !0)) {
    var rc = Array.prototype.reduceRight;
    u(
      Array.prototype,
      "reduceRight",
      function (a) {
        return l.Call(rc, 0 <= this.length ? this : [], arguments);
      },
      !0
    );
  }
  var sc = 8 !== Number("0o10"),
    tc = 2 !== Number("0b10"),
    uc = z("\u0085\u200b\ufffe", function (a) {
      return 0 === Number(a + 0 + a);
    });
  if (sc || tc || uc) {
    var W = Number,
      vb = /^0b[01]+$/i,
      wb = /^0o[0-7]+$/i,
      vc = vb.test.bind(vb),
      wc = wb.test.bind(wb),
      xc = function (a) {
        if ("function" === typeof a.valueOf) {
          var b = a.valueOf();
          if (D.primitive(b)) return b;
        }
        if ("function" === typeof a.toString && ((b = a.toString()), D.primitive(b))) return b;
        throw new TypeError("No default value");
      },
      yc = sb.test.bind(sb),
      zc = tb.test.bind(tb),
      wa = (function () {
        var b = function (c) {
          var d = 0 < arguments.length ? (D.primitive(c) ? c : xc(c, "number")) : 0;
          if ("string" === typeof d)
            if (((d = l.Call(rb, d)), vc(d))) d = parseInt(Q(d, 2), 2);
            else if (wc(d)) d = parseInt(Q(d, 2), 8);
            else if (yc(d) || zc(d)) d = NaN;
          var e = this,
            f = a(function () {
              W.prototype.valueOf.call(e);
              return !0;
            });
          return e instanceof b && !f ? new W(d) : W(d);
        };
        return b;
      })();
    ob(W, wa, {});
    t(wa, { NaN: W.NaN, MAX_VALUE: W.MAX_VALUE, MIN_VALUE: W.MIN_VALUE, NEGATIVE_INFINITY: W.NEGATIVE_INFINITY, POSITIVE_INFINITY: W.POSITIVE_INFINITY });
    Number = wa;
    y.redefine(p, "Number", wa);
  }
  var xb = Math.pow(2, 53) - 1;
  t(Number, {
    MAX_SAFE_INTEGER: xb,
    MIN_SAFE_INTEGER: -xb,
    EPSILON: 2.220446049250313e-16,
    parseInt: p.parseInt,
    parseFloat: p.parseFloat,
    isFinite: Ia,
    isInteger: function (a) {
      return Ia(a) && l.ToInteger(a) === a;
    },
    isSafeInteger: function (a) {
      return Number.isInteger(a) && I(a) <= Number.MAX_SAFE_INTEGER;
    },
    isNaN: L,
  });
  m(Number, "parseInt", p.parseInt, Number.parseInt !== p.parseInt);
  1 ===
    [, 1].find(function () {
      return !0;
    }) && u(Array.prototype, "find", Ra.find);
  0 !==
    [, 1].findIndex(function () {
      return !0;
    }) && u(Array.prototype, "findIndex", Ra.findIndex);
  var yb = Function.bind.call(Function.bind, Object.prototype.propertyIsEnumerable),
    xa = function (a, c) {
      b && yb(a, c) && Object.defineProperty(a, c, { enumerable: !1 });
    },
    Ac = function () {
      var a = Number(this),
        b = arguments.length,
        c = b - a;
      c = Array(0 > c ? 0 : c);
      for (var d = a; d < b; ++d) c[d - a] = arguments[d];
      return c;
    },
    zb = function (a) {
      return function (b, c) {
        b[c] = a[c];
        return b;
      };
    },
    Bc = function (a, b) {
      var c = r(Object(b)),
        d;
      l.IsCallable(Object.getOwnPropertySymbols) && (d = q(Object.getOwnPropertySymbols(Object(b)), yb(b)));
      return w(ja(c, d || []), zb(b), a);
    },
    Ab = {
      assign: function (a, b) {
        var c = l.ToObject(a, "Cannot convert undefined or null to object");
        return w(l.Call(Ac, 1, arguments), Bc, c);
      },
      is: function (a, b) {
        return l.SameValue(a, b);
      },
    };
  Object.assign &&
    Object.preventExtensions &&
    (function () {
      var a = Object.preventExtensions({ 1: 2 });
      try {
        Object.assign(a, "xy");
      } catch (B) {
        return "y" === a[1];
      }
    })() &&
    u(Object, "assign", Ab.assign);
  t(Object, Ab);
  if (b) {
    var Cc = {
      setPrototypeOf: (function (a, b) {
        var c = function (a, b) {
          if (!l.TypeIsObject(a)) throw new TypeError("cannot set prototype on a non-object");
          if (null !== b && !l.TypeIsObject(b)) throw new TypeError("can only set prototype to an object or null" + b);
          g(d, a, b);
          return a;
        };
        try {
          var d = a.getOwnPropertyDescriptor(a.prototype, b).set;
          g(d, {}, null);
        } catch (sa) {
          if (a.prototype !== {}[b]) return;
          d = function (a) {
            this[b] = a;
          };
          c.polyfill = c(c({}, null), a.prototype) instanceof a;
        }
        return c;
      })(Object, "__proto__"),
    };
    t(Object, Cc);
  }
  Object.setPrototypeOf &&
    Object.getPrototypeOf &&
    null !== Object.getPrototypeOf(Object.setPrototypeOf({}, null)) &&
    null === Object.getPrototypeOf(Object.create(null)) &&
    (function () {
      var a = Object.create(null),
        b = Object.getPrototypeOf,
        c = Object.setPrototypeOf;
      Object.getPrototypeOf = function (c) {
        c = b(c);
        return c === a ? null : c;
      };
      Object.setPrototypeOf = function (b, d) {
        return c(b, null === d ? a : d);
      };
      Object.setPrototypeOf.polyfill = !1;
    })();
  if (
    e(function () {
      return Object.keys("foo");
    })
  ) {
    var Dc = Object.keys;
    u(Object, "keys", function (a) {
      return Dc(l.ToObject(a));
    });
    r = Object.keys;
  }
  if (
    e(function () {
      return Object.keys(/a/g);
    })
  ) {
    var Ec = Object.keys;
    u(Object, "keys", function (a) {
      if (D.regex(a)) {
        var b = [],
          c;
        for (c in a) ta(a, c) && U(b, c);
        return b;
      }
      return Ec(a);
    });
    r = Object.keys;
  }
  if (
    Object.getOwnPropertyNames &&
    e(function () {
      return Object.getOwnPropertyNames("foo");
    })
  ) {
    var Fc = "object" === typeof window ? Object.getOwnPropertyNames(window) : [],
      Bb = Object.getOwnPropertyNames;
    u(Object, "getOwnPropertyNames", function (a) {
      a = l.ToObject(a);
      if ("[object Window]" === v(a))
        try {
          return Bb(a);
        } catch (B) {
          return ja([], Fc);
        }
      return Bb(a);
    });
  }
  if (
    Object.getOwnPropertyDescriptor &&
    e(function () {
      return Object.getOwnPropertyDescriptor("foo", "bar");
    })
  ) {
    var Gc = Object.getOwnPropertyDescriptor;
    u(Object, "getOwnPropertyDescriptor", function (a, b) {
      return Gc(l.ToObject(a), b);
    });
  }
  if (
    Object.seal &&
    e(function () {
      return Object.seal("foo");
    })
  ) {
    var Hc = Object.seal;
    u(Object, "seal", function (a) {
      return l.TypeIsObject(a) ? Hc(a) : a;
    });
  }
  if (
    Object.isSealed &&
    e(function () {
      return Object.isSealed("foo");
    })
  ) {
    var Ic = Object.isSealed;
    u(Object, "isSealed", function (a) {
      return l.TypeIsObject(a) ? Ic(a) : !0;
    });
  }
  if (
    Object.freeze &&
    e(function () {
      return Object.freeze("foo");
    })
  ) {
    var Jc = Object.freeze;
    u(Object, "freeze", function (a) {
      return l.TypeIsObject(a) ? Jc(a) : a;
    });
  }
  if (
    Object.isFrozen &&
    e(function () {
      return Object.isFrozen("foo");
    })
  ) {
    var Kc = Object.isFrozen;
    u(Object, "isFrozen", function (a) {
      return l.TypeIsObject(a) ? Kc(a) : !0;
    });
  }
  if (
    Object.preventExtensions &&
    e(function () {
      return Object.preventExtensions("foo");
    })
  ) {
    var Lc = Object.preventExtensions;
    u(Object, "preventExtensions", function (a) {
      return l.TypeIsObject(a) ? Lc(a) : a;
    });
  }
  if (
    Object.isExtensible &&
    e(function () {
      return Object.isExtensible("foo");
    })
  ) {
    var Mc = Object.isExtensible;
    u(Object, "isExtensible", function (a) {
      return l.TypeIsObject(a) ? Mc(a) : !1;
    });
  }
  if (
    Object.getPrototypeOf &&
    e(function () {
      return Object.getPrototypeOf("foo");
    })
  ) {
    var Nc = Object.getPrototypeOf;
    u(Object, "getPrototypeOf", function (a) {
      return Nc(l.ToObject(a));
    });
  }
  var Oc =
    b &&
    (function () {
      var a = Object.getOwnPropertyDescriptor(RegExp.prototype, "flags");
      return a && l.IsCallable(a.get);
    })();
  b &&
    !Oc &&
    y.getter(RegExp.prototype, "flags", function () {
      if (!l.TypeIsObject(this)) throw new TypeError("Method called on incompatible type: must be an object.");
      var a = "";
      this.global && (a += "g");
      this.ignoreCase && (a += "i");
      this.multiline && (a += "m");
      this.unicode && (a += "u");
      this.sticky && (a += "y");
      return a;
    });
  var Pc =
      b &&
      a(function () {
        return "/a/i" === String(new RegExp(/a/g, "i"));
      }),
    Qc =
      pa &&
      b &&
      (function () {
        var a = /./;
        a[A.match] = !1;
        return RegExp(a) === a;
      })(),
    Cb = a(function () {
      return "/abc/" === RegExp.prototype.toString.call({ source: "abc" });
    }),
    Rc =
      Cb &&
      a(function () {
        return "/a/b" === RegExp.prototype.toString.call({ source: "a", flags: "b" });
      });
  if (!Cb || !Rc) {
    var Db = RegExp.prototype.toString;
    m(
      RegExp.prototype,
      "toString",
      function () {
        var a = l.RequireObjectCoercible(this);
        if (D.regex(a)) return g(Db, a);
        var b = Ka(a.source);
        a = Ka(a.flags);
        return "/" + b + "/" + a;
      },
      !0
    );
    y.preserveToString(RegExp.prototype.toString, Db);
  }
  if (b && (!Pc || Qc)) {
    var Sc = Object.getOwnPropertyDescriptor(RegExp.prototype, "flags").get,
      Eb = Object.getOwnPropertyDescriptor(RegExp.prototype, "source") || {},
      Tc = function () {
        return this.source;
      },
      Uc = l.IsCallable(Eb.get) ? Eb.get : Tc,
      Fb = RegExp,
      Sa = (function () {
        return function Fa(a, b) {
          var c = l.IsRegExp(a);
          return this instanceof Fa || !c || "undefined" !== typeof b || a.constructor !== Fa ? (D.regex(a) ? ((c = l.Call(Uc, a)), (a = "undefined" === typeof b ? l.Call(Sc, a) : b), new Fa(c, a)) : new Fb(a, b)) : a;
        };
      })();
    ob(Fb, Sa, { $input: !0 });
    RegExp = Sa;
    y.redefine(p, "RegExp", Sa);
  }
  if (b) {
    var Ta = { input: "$_", lastMatch: "$&", lastParen: "$+", leftContext: "$`", rightContext: "$'" };
    n(r(Ta), function (a) {
      a in RegExp &&
        !(Ta[a] in RegExp) &&
        y.getter(RegExp, Ta[a], function () {
          return RegExp[a];
        });
    });
  }
  qa(RegExp);
  var ya = 1 / Number.EPSILON,
    za = Math.pow(2, -23),
    Vc = Math.pow(2, 127) * (2 - za),
    Ua = Math.pow(2, -126),
    ia = Math.E,
    Aa = Math.LOG2E,
    Wc = Math.LOG10E,
    Gb = Number.prototype.clz;
  delete Number.prototype.clz;
  var M = {
    acosh: function (a) {
      var b = Number(a);
      if (L(b) || 1 > a) return NaN;
      if (1 === b) return 0;
      if (Infinity === b) return b;
      a = 1 / (b * b);
      if (2 > b) return ha(b - 1 + ma(1 - a) * b);
      b /= 2;
      return ha(b + ma(1 - a) * b - 1) + 1 / Aa;
    },
    asinh: function (a) {
      var b = Number(a);
      if (0 === b || !G(b)) return b;
      a = I(b);
      var c = a * a;
      b = fa(b);
      return 1 > a ? b * ha(a + c / (ma(c + 1) + 1)) : b * (ha(a / 2 + (ma(1 + 1 / c) * a) / 2 - 1) + 1 / Aa);
    },
    atanh: function (a) {
      a = Number(a);
      if (0 === a) return a;
      if (-1 === a) return -Infinity;
      if (1 === a) return Infinity;
      if (L(a) || -1 > a || 1 < a) return NaN;
      var b = I(a);
      return (fa(a) * ha((2 * b) / (1 - b))) / 2;
    },
    cbrt: function (a) {
      a = Number(a);
      if (0 === a) return a;
      var b = 0 > a;
      b && (a = -a);
      if (Infinity === a) var c = Infinity;
      else (c = X(la(a) / 3)), (c = (a / (c * c) + 2 * c) / 3);
      return b ? -c : c;
    },
    clz32: function (a) {
      a = l.ToUint32(Number(a));
      return 0 === a ? 32 : Gb ? l.Call(Gb, a) : 31 - K(la(a + 0.5) * Aa);
    },
    cosh: function (a) {
      a = Number(a);
      if (0 === a) return 1;
      if (L(a)) return NaN;
      if (!G(a)) return Infinity;
      a = X(I(a) - 1);
      return (ia / 2) * (a + 1 / (a * ia * ia));
    },
    expm1: function (a) {
      a = Number(a);
      if (-Infinity === a) return -1;
      if (!G(a) || 0 === a) return a;
      if (0.5 < I(a)) return X(a) - 1;
      for (var b = a, c = 0, d = 1; c + b !== c; ) (c += b), (d += 1), (b *= a / d);
      return c;
    },
    hypot: function (a, b) {
      for (var c = 0, d = 0, e = 0; e < arguments.length; ++e) {
        var f = I(Number(arguments[e]));
        d < f ? ((c *= (d / f) * (d / f)), (c += 1), (d = f)) : (c += 0 < f ? (f / d) * (f / d) : f);
      }
      return Infinity === d ? Infinity : d * ma(c);
    },
    log2: function (a) {
      return la(a) * Aa;
    },
    log10: function (a) {
      return la(a) * Wc;
    },
    log1p: ha,
    sign: fa,
    sinh: function (a) {
      a = Number(a);
      if (!G(a) || 0 === a) return a;
      var b = I(a);
      if (1 > b) return (b = Math.expm1(b)), (fa(a) * b * (1 + 1 / (b + 1))) / 2;
      b = X(b - 1);
      return fa(a) * (b - 1 / (b * ia * ia)) * (ia / 2);
    },
    tanh: function (a) {
      a = Number(a);
      return L(a) || 0 === a ? a : 20 <= a ? 1 : -20 >= a ? -1 : (Math.expm1(a) - Math.expm1(-a)) / (X(a) + X(-a));
    },
    trunc: function (a) {
      a = Number(a);
      return 0 > a ? -K(-a) : K(a);
    },
    imul: function (a, b) {
      a = l.ToUint32(a);
      b = l.ToUint32(b);
      var c = a & 65535,
        d = b & 65535;
      return (c * d + (((((a >>> 16) & 65535) * d + c * ((b >>> 16) & 65535)) << 16) >>> 0)) | 0;
    },
    fround: function (a) {
      var b = Number(a);
      if (0 === b || Infinity === b || -Infinity === b || L(b)) return b;
      a = fa(b);
      b = I(b);
      if (b < Ua) return a * (b / Ua / za + ya - ya) * Ua * za;
      var c = (1 + za / Number.EPSILON) * b;
      b = c - (c - b);
      return b > Vc || L(b) ? Infinity * a : a * b;
    },
  };
  t(Math, M);
  m(Math, "sinh", M.sinh, Infinity === Math.sinh(710));
  m(Math, "cosh", M.cosh, Infinity === Math.cosh(710));
  m(Math, "log1p", M.log1p, -1e-17 !== Math.log1p(-1e-17));
  m(Math, "asinh", M.asinh, Math.asinh(-1e7) !== -Math.asinh(1e7));
  m(Math, "asinh", M.asinh, Infinity === Math.asinh(1e300));
  m(Math, "atanh", M.atanh, 0 === Math.atanh(1e-300));
  m(Math, "tanh", M.tanh, -2e-17 !== Math.tanh(-2e-17));
  m(Math, "acosh", M.acosh, Infinity === Math.acosh(Number.MAX_VALUE));
  m(Math, "acosh", M.acosh, !(8 > I(1 - Math.acosh(1 + Number.EPSILON) / Math.sqrt(2 * Number.EPSILON)) / Number.EPSILON));
  m(Math, "cbrt", M.cbrt, !(8 > I(1 - Math.cbrt(1e-300) / 1e-100) / Number.EPSILON));
  m(Math, "sinh", M.sinh, -2e-17 !== Math.sinh(-2e-17));
  var Hb = Math.expm1(10);
  m(Math, "expm1", M.expm1, 22025.465794806718 < Hb || 22025.465794806718 > Hb);
  var Xc = Math.round,
    Yc = 0 === Math.round(0.5 - Number.EPSILON / 4) && 1 === Math.round(-0.5 + Number.EPSILON / 3.99),
    Zc = [ya + 1, 2 * ya - 1].every(function (a) {
      return Math.round(a) === a;
    });
  m(
    Math,
    "round",
    function (a) {
      var b = K(a);
      return 0.5 > a - b ? b : -1 === b ? -0 : b + 1;
    },
    !Yc || !Zc
  );
  y.preserveToString(Math.round, Xc);
  var Ib = Math.imul;
  -5 !== Math.imul(4294967295, 5) && ((Math.imul = M.imul), y.preserveToString(Math.imul, Ib));
  2 !== Math.imul.length &&
    u(Math, "imul", function (a, b) {
      return l.Call(Ib, Math, arguments);
    });
  var Ba = (function () {
    var a = p.setTimeout;
    if ("function" === typeof a || "object" === typeof a) {
      l.IsPromise = function (a) {
        return l.TypeIsObject(a) && "undefined" !== typeof a._promise ? !0 : !1;
      };
      var b = function (a) {
          if (!l.IsConstructor(a)) throw new TypeError("Bad promise constructor");
          var b = this;
          b.resolve = void 0;
          b.reject = void 0;
          b.promise = new a(function (a, c) {
            if (void 0 !== b.resolve || void 0 !== b.reject) throw new TypeError("Bad Promise implementation!");
            b.resolve = a;
            b.reject = c;
          });
          if (!l.IsCallable(b.resolve) || !l.IsCallable(b.reject)) throw new TypeError("Bad promise constructor");
        },
        c;
      "undefined" !== typeof window &&
        l.IsCallable(window.postMessage) &&
        (c = function () {
          var a = [];
          window.addEventListener(
            "message",
            function (b) {
              b.source === window && "zero-timeout-message" === b.data && (b.stopPropagation(), 0 !== a.length && ka(a)());
            },
            !0
          );
          return function (b) {
            U(a, b);
            window.postMessage("zero-timeout-message", "*");
          };
        });
      var d = function () {
          var a = p.Promise,
            b = a && a.resolve && a.resolve();
          return (
            b &&
            function (a) {
              return b.then(a);
            }
          );
        },
        e = l.IsCallable(p.setImmediate)
          ? p.setImmediate
          : "object" === typeof process && process.nextTick
          ? process.nextTick
          : d() ||
            (l.IsCallable(c)
              ? c()
              : function (b) {
                  a(b, 0);
                }),
        f = function (a) {
          return a;
        },
        h = function (a) {
          throw a;
        },
        k = {},
        m = function (a, b, c) {
          e(function () {
            if (b === k) a(c);
            else {
              try {
                var d = a(c);
                var e = b.resolve;
              } catch (Va) {
                (d = Va), (e = b.reject);
              }
              e(d);
            }
          });
        },
        n = function (a, b) {
          var c = a._promise,
            d = c.reactionLength;
          if (0 < d && (m(c.fulfillReactionHandler0, c.reactionCapability0, b), (c.fulfillReactionHandler0 = void 0), (c.rejectReactions0 = void 0), (c.reactionCapability0 = void 0), 1 < d))
            for (var e = 1, f = 0; e < d; e++, f += 3) m(c[f + 0], c[f + 2], b), (a[f + 0] = void 0), (a[f + 1] = void 0), (a[f + 2] = void 0);
          c.result = b;
          c.state = 1;
          c.reactionLength = 0;
        },
        r = function (a, b) {
          var c = a._promise,
            d = c.reactionLength;
          if (0 < d && (m(c.rejectReactionHandler0, c.reactionCapability0, b), (c.fulfillReactionHandler0 = void 0), (c.rejectReactions0 = void 0), (c.reactionCapability0 = void 0), 1 < d))
            for (var e = 1, f = 0; e < d; e++, f += 3) m(c[f + 1], c[f + 2], b), (a[f + 0] = void 0), (a[f + 1] = void 0), (a[f + 2] = void 0);
          c.result = b;
          c.state = 2;
          c.reactionLength = 0;
        },
        q = function (a) {
          var b = !1;
          return {
            resolve: function (c) {
              if (!b) {
                b = !0;
                if (c === a) return r(a, new TypeError("Self resolution"));
                if (!l.TypeIsObject(c)) return n(a, c);
                try {
                  var d = c.then;
                } catch ($c) {
                  return r(a, $c);
                }
                if (!l.IsCallable(d)) return n(a, c);
                e(function () {
                  var b = d,
                    e = q(a),
                    f = e.resolve;
                  e = e.reject;
                  try {
                    w(b, c, f, e);
                  } catch (ad) {
                    e(ad);
                  }
                });
              }
            },
            reject: function (c) {
              if (!b) return (b = !0), r(a, c);
            },
          };
        },
        w = function (a, b, c, d) {
          a === z ? g(a, b, c, d, k) : g(a, b, c, d);
        },
        u = (function () {
          var a = function (b) {
            if (!(this instanceof a)) throw new TypeError('Constructor Promise requires "new"');
            if (this && this._promise) throw new TypeError("Bad construction");
            if (!l.IsCallable(b)) throw new TypeError("not a valid resolver");
            var c = Ma(this, a, v, { _promise: { result: void 0, state: 0, reactionLength: 0, fulfillReactionHandler0: void 0, rejectReactionHandler0: void 0, reactionCapability0: void 0 } }),
              d = q(c),
              e = d.reject;
            try {
              b(d.resolve, e);
            } catch (Va) {
              e(Va);
            }
            return c;
          };
          return a;
        })();
      var v = u.prototype;
      var y = function (a, b, c, d) {
        var e = !1;
        return function (f) {
          e || ((e = !0), (b[a] = f), 0 === --d.count && ((f = c.resolve), f(b)));
        };
      };
      t(u, {
        all: function (a) {
          if (!l.TypeIsObject(this)) throw new TypeError("Promise is not object");
          var c = new b(this),
            d;
          try {
            var e = l.GetIterator(a);
            a = d = { iterator: e, done: !1 };
            for (var f = a.iterator, h = [], g = { count: 1 }, k, m, n = 0; ; ) {
              try {
                k = l.IteratorStep(f);
                if (!1 === k) {
                  a.done = !0;
                  break;
                }
                m = k.value;
              } catch (Xa) {
                throw ((a.done = !0), Xa);
              }
              h[n] = void 0;
              var x = this.resolve(m),
                r = y(n, h, c, g);
              g.count += 1;
              w(x.then, x, r, c.reject);
              n += 1;
            }
            if (0 === --g.count) {
              var p = c.resolve;
              p(h);
            }
            return c.promise;
          } catch (Xa) {
            f = Xa;
            if (d && !d.done)
              try {
                l.IteratorClose(e, !0);
              } catch (cd) {
                f = cd;
              }
            e = c.reject;
            e(f);
            return c.promise;
          }
        },
        race: function (a) {
          if (!l.TypeIsObject(this)) throw new TypeError("Promise is not object");
          var c = new b(this),
            d;
          try {
            var e = l.GetIterator(a);
            a = d = { iterator: e, done: !1 };
            for (var f = a.iterator, h, g, k; ; ) {
              try {
                h = l.IteratorStep(f);
                if (!1 === h) {
                  a.done = !0;
                  break;
                }
                g = h.value;
              } catch (Wa) {
                throw ((a.done = !0), Wa);
              }
              k = this.resolve(g);
              w(k.then, k, c.resolve, c.reject);
            }
            return c.promise;
          } catch (Wa) {
            f = Wa;
            if (d && !d.done)
              try {
                l.IteratorClose(e, !0);
              } catch (bd) {
                f = bd;
              }
            e = c.reject;
            e(f);
            return c.promise;
          }
        },
        reject: function (a) {
          if (!l.TypeIsObject(this)) throw new TypeError("Bad promise constructor");
          var c = new b(this),
            d = c.reject;
          d(a);
          return c.promise;
        },
        resolve: function (a) {
          if (!l.TypeIsObject(this)) throw new TypeError("Bad promise constructor");
          if (l.IsPromise(a) && a.constructor === this) return a;
          var c = new b(this),
            d = c.resolve;
          d(a);
          return c.promise;
        },
      });
      t(v, {
        catch: function (a) {
          return this.then(null, a);
        },
        then: function (a, c) {
          if (!l.IsPromise(this)) throw new TypeError("not a promise");
          var d = l.SpeciesConstructor(this, u);
          d = 2 < arguments.length && arguments[2] === k && d === u ? k : new b(d);
          var e = l.IsCallable(a) ? a : f,
            g = l.IsCallable(c) ? c : h,
            n = this._promise;
          if (0 === n.state) {
            if (0 === n.reactionLength) (n.fulfillReactionHandler0 = e), (n.rejectReactionHandler0 = g), (n.reactionCapability0 = d);
            else {
              var x = 3 * (n.reactionLength - 1);
              n[x + 0] = e;
              n[x + 1] = g;
              n[x + 2] = d;
            }
            n.reactionLength += 1;
          } else if (1 === n.state) (n = n.result), m(e, d, n);
          else if (2 === n.state) (n = n.result), m(g, d, n);
          else throw new TypeError("unexpected Promise state");
          return d.promise;
        },
      });
      k = new b(u);
      var z = v.then;
      return u;
    }
  })();
  p.Promise && (delete p.Promise.accept, delete p.Promise.defer, delete p.Promise.prototype.chain);
  if ("function" === typeof Ba) {
    t(p, { Promise: Ba });
    var dd = N(p.Promise, function (a) {
        return a.resolve(42).then(function () {}) instanceof a;
      }),
      ed = !e(function () {
        return p.Promise.reject(42).then(null, 5).then(null, ea);
      }),
      fd = e(function () {
        return p.Promise.call(3, ea);
      }),
      gd = (function (a) {
        var b = a.resolve(5);
        b.constructor = {};
        a = a.resolve(b);
        try {
          a.then(null, ea).then(null, ea);
        } catch (Ea) {
          return !0;
        }
        return b === a;
      })(p.Promise),
      hd =
        b &&
        (function () {
          var a = 0,
            b = Object.defineProperty({}, "then", {
              get: function () {
                a += 1;
              },
            });
          Promise.resolve(b);
          return 1 === a;
        })(),
      Ya = function (a) {
        var b = new Promise(a);
        a(3, function () {});
        this.then = b.then;
        this.constructor = BadResolverPromise_2;
      };
    Ya.prototype = Promise.prototype;
    Ya.all = Promise.all;
    var id = a(function () {
      return !!Ya.all([1, 2]);
    });
    (dd && ed && fd && !gd && hd && !id) || ((Promise = Ba), u(p, "Promise", Ba));
    if (1 !== Promise.all.length) {
      var jd = Promise.all;
      u(Promise, "all", function (a) {
        return l.Call(jd, this, arguments);
      });
    }
    if (1 !== Promise.race.length) {
      var kd = Promise.race;
      u(Promise, "race", function (a) {
        return l.Call(kd, this, arguments);
      });
    }
    if (1 !== Promise.resolve.length) {
      var ld = Promise.resolve;
      u(Promise, "resolve", function (a) {
        return l.Call(ld, this, arguments);
      });
    }
    if (1 !== Promise.reject.length) {
      var md = Promise.reject;
      u(Promise, "reject", function (a) {
        return l.Call(md, this, arguments);
      });
    }
    xa(Promise, "all");
    xa(Promise, "race");
    xa(Promise, "resolve");
    xa(Promise, "reject");
    qa(Promise);
  }
  var Jb = function (a) {
      var b = r(
        w(
          a,
          function (a, b) {
            a[b] = !0;
            return a;
          },
          {}
        )
      );
      return a.join(":") === b.join(":");
    },
    nd = Jb(["z", "a", "bb"]),
    od = Jb(["z", 1, "a", "3", 2]);
  if (b) {
    var da = function (a, b) {
        return b || nd ? (V(a) ? "^" + l.ToString(a) : "string" === typeof a ? "$" + a : "number" === typeof a ? (od ? a : "n" + a) : "boolean" === typeof a ? "b" + a : null) : null;
      },
      Ca = function () {
        return Object.create ? Object.create(null) : {};
      },
      Za = function (a, b, c) {
        if (k(c) || D.string(c))
          n(c, function (a) {
            if (!l.TypeIsObject(a)) throw new TypeError("Iterator value " + a + " is not an entry object");
            b.set(a[0], a[1]);
          });
        else if (c instanceof a)
          g(a.prototype.forEach, c, function (a, c) {
            b.set(c, a);
          });
        else {
          if (!V(c)) {
            var d = b.set;
            if (!l.IsCallable(d)) throw new TypeError("bad map");
            var e = l.GetIterator(c);
          }
          if ("undefined" !== typeof e)
            for (;;) {
              a = l.IteratorStep(e);
              if (!1 === a) break;
              a = a.value;
              try {
                if (!l.TypeIsObject(a)) throw new TypeError("Iterator value " + a + " is not an entry object");
                g(d, b, a[0], a[1]);
              } catch (Oa) {
                throw (l.IteratorClose(e, !0), Oa);
              }
            }
        }
      },
      Kb = function (a, b, c) {
        if (k(c) || D.string(c))
          n(c, function (a) {
            b.add(a);
          });
        else if (c instanceof a)
          g(a.prototype.forEach, c, function (a) {
            b.add(a);
          });
        else {
          if (!V(c)) {
            var d = b.add;
            if (!l.IsCallable(d)) throw new TypeError("bad set");
            var e = l.GetIterator(c);
          }
          if ("undefined" !== typeof e)
            for (;;) {
              a = l.IteratorStep(e);
              if (!1 === a) break;
              a = a.value;
              try {
                g(d, b, a);
              } catch (Oa) {
                throw (l.IteratorClose(e, !0), Oa);
              }
            }
        }
      },
      ra = {
        Map: (function () {
          var a = {},
            b = function (a, b) {
              this.key = a;
              this.value = b;
              this.prev = this.next = null;
            };
          b.prototype.isRemoved = function () {
            return this.key === a;
          };
          var c = function (a, b) {
              if (!l.TypeIsObject(a) || !a._es6map) throw new TypeError("Method Map.prototype." + b + " called on incompatible receiver " + l.ToString(a));
            },
            d = function (a, b) {
              c(a, "[[MapIterator]]");
              this.i = this.head = a._head;
              this.kind = b;
            };
          d.prototype = {
            isMapIterator: !0,
            next: function () {
              if (!this.isMapIterator) throw new TypeError("Not a MapIterator");
              var a = this.i,
                b = this.kind,
                c = this.head;
              if ("undefined" === typeof this.i) return ba();
              for (; a.isRemoved() && a !== c; ) a = a.prev;
              for (; a.next !== c; ) if (((a = a.next), !a.isRemoved())) return (b = "key" === b ? a.key : "value" === b ? a.value : [a.key, a.value]), (this.i = a), ba(b);
              this.i = void 0;
              return ba();
            },
          };
          S(d.prototype);
          var e = function Qa() {
            if (!(this instanceof Qa)) throw new TypeError('Constructor Map requires "new"');
            if (this && this._es6map) throw new TypeError("Bad construction");
            var a = Ma(this, Qa, f, { _es6map: !0, _head: null, _map: F ? new F() : null, _size: 0, _storage: Ca() }),
              c = new b(null, null);
            c.next = c.prev = c;
            a._head = c;
            0 < arguments.length && Za(Qa, a, arguments[0]);
            return a;
          };
          var f = e.prototype;
          y.getter(f, "size", function () {
            if ("undefined" === typeof this._size) throw new TypeError("size method called on incompatible Map");
            return this._size;
          });
          t(f, {
            get: function (a) {
              c(this, "get");
              var b = da(a, !0);
              if (null !== b) {
                if ((a = this._storage[b])) return a.value;
              } else if (this._map) {
                if ((a = na.call(this._map, a))) return a.value;
              } else for (var d = (b = this._head); (d = d.next) !== b; ) if (l.SameValueZero(d.key, a)) return d.value;
            },
            has: function (a) {
              c(this, "has");
              var b = da(a, !0);
              if (null !== b) return "undefined" !== typeof this._storage[b];
              if (this._map) return oa.call(this._map, a);
              for (var d = (b = this._head); (d = d.next) !== b; ) if (l.SameValueZero(d.key, a)) return !0;
              return !1;
            },
            set: function (a, d) {
              c(this, "set");
              var e = this._head,
                f = e,
                h = da(a, !0);
              if (null !== h) {
                if ("undefined" !== typeof this._storage[h]) return (this._storage[h].value = d), this;
                var g = (this._storage[h] = new b(a, d));
                f = e.prev;
              } else this._map && (oa.call(this._map, a) ? (na.call(this._map, a).value = d) : ((g = new b(a, d)), db.call(this._map, a, g), (f = e.prev)));
              for (; (f = f.next) !== e; ) if (l.SameValueZero(f.key, a)) return (f.value = d), this;
              g = g || new b(a, d);
              l.SameValue(-0, a) && (g.key = 0);
              g.next = this._head;
              g.prev = this._head.prev;
              g.prev.next = g;
              g.next.prev = g;
              this._size += 1;
              return this;
            },
            delete: function (b) {
              c(this, "delete");
              var d = this._head,
                e = d,
                f = da(b, !0);
              if (null !== f) {
                if ("undefined" === typeof this._storage[f]) return !1;
                e = this._storage[f].prev;
                delete this._storage[f];
              } else if (this._map) {
                if (!oa.call(this._map, b)) return !1;
                e = na.call(this._map, b).prev;
                Xb.call(this._map, b);
              }
              for (; (e = e.next) !== d; ) if (l.SameValueZero(e.key, b)) return (e.key = a), (e.value = a), (e.prev.next = e.next), (e.next.prev = e.prev), --this._size, !0;
              return !1;
            },
            clear: function () {
              c(this, "clear");
              this._map = F ? new F() : null;
              this._size = 0;
              this._storage = Ca();
              for (var b = this._head, d, e = b.next; (d = e) !== b; ) (d.key = a), (d.value = a), (e = d.next), (d.next = d.prev = b);
              b.next = b.prev = b;
            },
            keys: function () {
              c(this, "keys");
              return new d(this, "key");
            },
            values: function () {
              c(this, "values");
              return new d(this, "value");
            },
            entries: function () {
              c(this, "entries");
              return new d(this, "key+value");
            },
            forEach: function (a) {
              c(this, "forEach");
              for (var b = 1 < arguments.length ? arguments[1] : null, d = this.entries(), e = d.next(); !e.done; e = d.next()) b ? g(a, b, e.value[1], e.value[0], this) : a(e.value[1], e.value[0], this);
            },
          });
          S(f, f.entries);
          return e;
        })(),
        Set: (function () {
          var a = function (a, b) {
              if (!l.TypeIsObject(a) || !a._es6set || "undefined" === typeof a._storage) throw new TypeError("Set.prototype." + b + " called on incompatible receiver " + l.ToString(a));
            },
            b = function Pa() {
              if (!(this instanceof Pa)) throw new TypeError('Constructor Set requires "new"');
              if (this && this._es6set) throw new TypeError("Bad construction");
              var a = Ma(this, Pa, c, { _es6set: !0, "[[SetData]]": null, _storage: Ca() });
              if (!a._es6set) throw new TypeError("bad set");
              0 < arguments.length && Kb(Pa, a, arguments[0]);
              return a;
            };
          var c = b.prototype;
          var d = function (a) {
            if (!a["[[SetData]]"]) {
              var b = new ra.Map();
              a["[[SetData]]"] = b;
              n(r(a._storage), function (a) {
                if ("^null" === a) a = null;
                else if ("^undefined" !== a) {
                  var c = a.charAt(0);
                  a = "$" === c ? Q(a, 1) : "n" === c ? +Q(a, 1) : "b" === c ? "btrue" === a : +a;
                } else a = void 0;
                b.set(a, a);
              });
              a["[[SetData]]"] = b;
            }
            a._storage = null;
          };
          y.getter(b.prototype, "size", function () {
            a(this, "size");
            if (this._storage) return r(this._storage).length;
            d(this);
            return this["[[SetData]]"].size;
          });
          t(b.prototype, {
            has: function (b) {
              a(this, "has");
              var c;
              if (this._storage && null !== (c = da(b))) return !!this._storage[c];
              d(this);
              return this["[[SetData]]"].has(b);
            },
            add: function (b) {
              a(this, "add");
              var c;
              if (this._storage && null !== (c = da(b))) return (this._storage[c] = !0), this;
              d(this);
              this["[[SetData]]"].set(b, b);
              return this;
            },
            delete: function (b) {
              a(this, "delete");
              var c;
              if (this._storage && null !== (c = da(b))) return (b = ta(this._storage, c)), delete this._storage[c] && b;
              d(this);
              return this["[[SetData]]"]["delete"](b);
            },
            clear: function () {
              a(this, "clear");
              this._storage && (this._storage = Ca());
              this["[[SetData]]"] && this["[[SetData]]"].clear();
            },
            values: function () {
              a(this, "values");
              d(this);
              return new e(this["[[SetData]]"].values());
            },
            entries: function () {
              a(this, "entries");
              d(this);
              return new e(this["[[SetData]]"].entries());
            },
            forEach: function (b) {
              a(this, "forEach");
              var c = 1 < arguments.length ? arguments[1] : null,
                e = this;
              d(e);
              this["[[SetData]]"].forEach(function (a, d) {
                c ? g(b, c, d, d, e) : b(d, d, e);
              });
            },
          });
          m(b.prototype, "keys", b.prototype.values, !0);
          S(b.prototype, b.prototype.values);
          var e = function (a) {
            this.it = a;
          };
          e.prototype = {
            isSetIterator: !0,
            next: function () {
              if (!this.isSetIterator) throw new TypeError("Not a SetIterator");
              return this.it.next();
            },
          };
          S(e.prototype);
          return b;
        })(),
      };
    p.Set && !Set.prototype["delete"] && Set.prototype.remove && Set.prototype.items && Set.prototype.map && Array.isArray(new Set().keys) && (p.Set = ra.Set);
    if (p.Map || p.Set) {
      a(function () {
        return 2 === new Map([[1, 2]]).get(1);
      }) ||
        ((p.Map = function B() {
          if (!(this instanceof B)) throw new TypeError('Constructor Map requires "new"');
          var a = new F();
          0 < arguments.length && Za(B, a, arguments[0]);
          delete a.constructor;
          Object.setPrototypeOf(a, p.Map.prototype);
          return a;
        }),
        (p.Map.prototype = P(F.prototype)),
        m(p.Map.prototype, "constructor", p.Map, !0),
        y.preserveToString(p.Map, F));
      var Lb = new Map(),
        Mb = (function () {
          var a = new Map([
            [1, 0],
            [2, 0],
            [3, 0],
            [4, 0],
          ]);
          a.set(-0, a);
          return a.get(0) === a && a.get(-0) === a && a.has(0) && a.has(-0);
        })(),
        pd = Lb.set(1, 2) === Lb;
      (Mb && pd) ||
        u(Map.prototype, "set", function (a, b) {
          g(db, this, 0 === a ? 0 : a, b);
          return this;
        });
      Mb ||
        (t(
          Map.prototype,
          {
            get: function (a) {
              return g(na, this, 0 === a ? 0 : a);
            },
            has: function (a) {
              return g(oa, this, 0 === a ? 0 : a);
            },
          },
          !0
        ),
        y.preserveToString(Map.prototype.get, na),
        y.preserveToString(Map.prototype.has, oa));
      var $a = new Set(),
        Nb =
          Set.prototype["delete"] &&
          Set.prototype.add &&
          Set.prototype.has &&
          (function (a) {
            a["delete"](0);
            a.add(-0);
            return !a.has(0);
          })($a),
        qd = $a.add(1) === $a;
      if (!Nb || !qd) {
        var Ob = Set.prototype.add;
        Set.prototype.add = function (a) {
          g(Ob, this, 0 === a ? 0 : a);
          return this;
        };
        y.preserveToString(Set.prototype.add, Ob);
      }
      if (!Nb) {
        var Pb = Set.prototype.has;
        Set.prototype.has = function (a) {
          return g(Pb, this, 0 === a ? 0 : a);
        };
        y.preserveToString(Set.prototype.has, Pb);
        var Qb = Set.prototype["delete"];
        Set.prototype["delete"] = function (a) {
          return g(Qb, this, 0 === a ? 0 : a);
        };
        y.preserveToString(Set.prototype["delete"], Qb);
      }
      var Rb = N(p.Map, function (a) {
          var b = new a([]);
          b.set(42, 42);
          return b instanceof a;
        }),
        rd = Object.setPrototypeOf && !Rb;
      try {
        var Sb = !(p.Map() instanceof p.Map);
      } catch (x) {
        Sb = x instanceof TypeError;
      }
      if (0 !== p.Map.length || rd || !Sb)
        (p.Map = function B() {
          if (!(this instanceof B)) throw new TypeError('Constructor Map requires "new"');
          var a = new F();
          0 < arguments.length && Za(B, a, arguments[0]);
          delete a.constructor;
          Object.setPrototypeOf(a, B.prototype);
          return a;
        }),
          (p.Map.prototype = F.prototype),
          m(p.Map.prototype, "constructor", p.Map, !0),
          y.preserveToString(p.Map, F);
      var sd = N(p.Set, function (a) {
          var b = new a([]);
          b.add(42, 42);
          return b instanceof a;
        }),
        td = Object.setPrototypeOf && !sd;
      try {
        var Tb = !(p.Set() instanceof p.Set);
      } catch (x) {
        Tb = x instanceof TypeError;
      }
      if (0 !== p.Set.length || td || !Tb) {
        var ab = p.Set;
        p.Set = function B() {
          if (!(this instanceof B)) throw new TypeError('Constructor Set requires "new"');
          var a = new ab();
          0 < arguments.length && Kb(B, a, arguments[0]);
          delete a.constructor;
          Object.setPrototypeOf(a, B.prototype);
          return a;
        };
        p.Set.prototype = ab.prototype;
        m(p.Set.prototype, "constructor", p.Set, !0);
        y.preserveToString(p.Set, ab);
      }
      var bb = new p.Map(),
        ud = !a(function () {
          return bb.keys().next().done;
        });
      ("function" !== typeof p.Map.prototype.clear ||
        0 !== new p.Set().size ||
        0 !== bb.size ||
        "function" !== typeof p.Map.prototype.keys ||
        "function" !== typeof p.Set.prototype.keys ||
        "function" !== typeof p.Map.prototype.forEach ||
        "function" !== typeof p.Set.prototype.forEach ||
        d(p.Map) ||
        d(p.Set) ||
        "function" !== typeof bb.keys().next ||
        ud ||
        !Rb) &&
        t(p, { Map: ra.Map, Set: ra.Set }, !0);
      p.Set.prototype.keys !== p.Set.prototype.values && m(p.Set.prototype, "keys", p.Set.prototype.values, !0);
      S(Object.getPrototypeOf(new p.Map().keys()));
      S(Object.getPrototypeOf(new p.Set().keys()));
      if (h && "has" !== p.Set.prototype.has.name) {
        var vd = p.Set.prototype.has;
        u(p.Set.prototype, "has", function (a) {
          return g(vd, this, a);
        });
      }
    }
    t(p, ra);
    qa(p.Map);
    qa(p.Set);
  }
  var T = function (a) {
      if (!l.TypeIsObject(a)) throw new TypeError("target must be an object");
    },
    O = {
      apply: function () {
        return l.Call(l.Call, null, arguments);
      },
      construct: function (a, b) {
        if (!l.IsConstructor(a)) throw new TypeError("First argument must be a constructor.");
        var c = 2 < arguments.length ? arguments[2] : a;
        if (!l.IsConstructor(c)) throw new TypeError("new.target must be a constructor.");
        return l.Construct(a, b, c, "internal");
      },
      deleteProperty: function (a, c) {
        T(a);
        if (b) {
          var d = Object.getOwnPropertyDescriptor(a, c);
          if (d && !d.configurable) return !1;
        }
        return delete a[c];
      },
      has: function (a, b) {
        T(a);
        return b in a;
      },
    };
  Object.getOwnPropertyNames &&
    Object.assign(O, {
      ownKeys: function (a) {
        T(a);
        var b = Object.getOwnPropertyNames(a);
        l.IsCallable(Object.getOwnPropertySymbols) && H(b, Object.getOwnPropertySymbols(a));
        return b;
      },
    });
  Object.preventExtensions &&
    Object.assign(O, {
      isExtensible: function (a) {
        T(a);
        return Object.isExtensible(a);
      },
      preventExtensions: function (a) {
        T(a);
        return !e(function () {
          return Object.preventExtensions(a);
        });
      },
    });
  if (b) {
    var Ub = function (a, b, c) {
        var d = Object.getOwnPropertyDescriptor(a, b);
        if (!d) return (a = Object.getPrototypeOf(a)), null === a ? void 0 : Ub(a, b, c);
        if ("value" in d) return d.value;
        if (d.get) return l.Call(d.get, c);
      },
      Vb = function (a, b, c, d) {
        var e = Object.getOwnPropertyDescriptor(a, b);
        if (!e) {
          a = Object.getPrototypeOf(a);
          if (null !== a) return Vb(a, b, c, d);
          e = { value: void 0, writable: !0, enumerable: !0, configurable: !0 };
        }
        return "value" in e
          ? e.writable && l.TypeIsObject(d)
            ? Object.getOwnPropertyDescriptor(d, b)
              ? Y.defineProperty(d, b, { value: c })
              : Y.defineProperty(d, b, { value: c, writable: !0, enumerable: !0, configurable: !0 })
            : !1
          : e.set
          ? (g(e.set, d, c), !0)
          : !1;
      };
    Object.assign(O, {
      defineProperty: function (a, b, c) {
        T(a);
        return !e(function () {
          return Object.defineProperty(a, b, c);
        });
      },
      getOwnPropertyDescriptor: function (a, b) {
        T(a);
        return Object.getOwnPropertyDescriptor(a, b);
      },
      get: function (a, b) {
        T(a);
        return Ub(a, b, 2 < arguments.length ? arguments[2] : a);
      },
      set: function (a, b, c) {
        T(a);
        return Vb(a, b, c, 3 < arguments.length ? arguments[3] : a);
      },
    });
  }
  if (Object.getPrototypeOf) {
    var wd = Object.getPrototypeOf;
    O.getPrototypeOf = function (a) {
      T(a);
      return wd(a);
    };
  }
  Object.setPrototypeOf &&
    O.getPrototypeOf &&
    Object.assign(O, {
      setPrototypeOf: function (a, b) {
        T(a);
        if (null !== b && !l.TypeIsObject(b)) throw new TypeError("proto must be an object or null");
        if (b === Y.getPrototypeOf(a)) return !0;
        if (Y.isExtensible && !Y.isExtensible(a)) return !1;
        var c;
        a: {
          for (c = b; c; ) {
            if (a === c) {
              c = !0;
              break a;
            }
            c = O.getPrototypeOf(c);
          }
          c = !1;
        }
        if (c) return !1;
        Object.setPrototypeOf(a, b);
        return !0;
      },
    });
  var xd = function (b, c) {
    l.IsCallable(p.Reflect[b])
      ? a(function () {
          p.Reflect[b](1);
          p.Reflect[b](NaN);
          p.Reflect[b](!0);
          return !0;
        }) && u(p.Reflect, b, c)
      : m(p.Reflect, b, c);
  };
  Object.keys(O).forEach(function (a) {
    xd(a, O[a]);
  });
  var cb = p.Reflect.getPrototypeOf;
  h &&
    cb &&
    "getPrototypeOf" !== cb.name &&
    u(p.Reflect, "getPrototypeOf", function (a) {
      return g(cb, p.Reflect, a);
    });
  p.Reflect.setPrototypeOf &&
    a(function () {
      p.Reflect.setPrototypeOf(1, {});
      return !0;
    }) &&
    u(p.Reflect, "setPrototypeOf", O.setPrototypeOf);
  p.Reflect.defineProperty &&
    (a(function () {
      var a = !p.Reflect.defineProperty(1, "test", { value: 1 }),
        b = "function" !== typeof Object.preventExtensions || !p.Reflect.defineProperty(Object.preventExtensions({}), "test", {});
      return a && b;
    }) ||
      u(p.Reflect, "defineProperty", O.defineProperty));
  p.Reflect.construct &&
    (a(function () {
      var a = function () {};
      return p.Reflect.construct(function () {}, [], a) instanceof a;
    }) ||
      u(p.Reflect, "construct", O.construct));
  if ("Invalid Date" !== String(new Date(NaN))) {
    var yd = Date.prototype.toString;
    u(Date.prototype, "toString", function () {
      var a = +this;
      return a !== a ? "Invalid Date" : l.Call(yd, this);
    });
  }
  var Wb = {
    anchor: function (a) {
      return l.CreateHTML(this, "a", "name", a);
    },
    big: function () {
      return l.CreateHTML(this, "big", "", "");
    },
    blink: function () {
      return l.CreateHTML(this, "blink", "", "");
    },
    bold: function () {
      return l.CreateHTML(this, "b", "", "");
    },
    fixed: function () {
      return l.CreateHTML(this, "tt", "", "");
    },
    fontcolor: function (a) {
      return l.CreateHTML(this, "font", "color", a);
    },
    fontsize: function (a) {
      return l.CreateHTML(this, "font", "size", a);
    },
    italics: function () {
      return l.CreateHTML(this, "i", "", "");
    },
    link: function (a) {
      return l.CreateHTML(this, "a", "href", a);
    },
    small: function () {
      return l.CreateHTML(this, "small", "", "");
    },
    strike: function () {
      return l.CreateHTML(this, "strike", "", "");
    },
    sub: function () {
      return l.CreateHTML(this, "sub", "", "");
    },
    sup: function () {
      return l.CreateHTML(this, "sup", "", "");
    },
  };
  n(Object.keys(Wb), function (a) {
    var b = String.prototype[a];
    if (l.IsCallable(b)) {
      b = g(b, "", ' " ');
      var c = ja([], b.match(/"/g)).length;
      b = b !== b.toLowerCase() || 2 < c;
    } else b = !0;
    b && u(String.prototype, a, Wb[a]);
  });
  var zd = (function () {
      if (!pa) return !1;
      var a = "object" === typeof JSON && "function" === typeof JSON.stringify ? JSON.stringify : null;
      if (!a) return !1;
      if ("undefined" !== typeof a(A()) || "[null]" !== a([A()])) return !0;
      var b = { a: A() };
      b[A()] = !0;
      return "{}" !== a(b) ? !0 : !1;
    })(),
    Ad = a(function () {
      return pa ? "{}" === JSON.stringify(Object(A())) && "[{}]" === JSON.stringify([Object(A())]) : !0;
    });
  if (zd || !Ad) {
    var Bd = JSON.stringify;
    u(JSON, "stringify", function (a) {
      if ("symbol" !== typeof a) {
        var b;
        1 < arguments.length && (b = arguments[1]);
        var c = [a];
        if (k(b)) c.push(b);
        else {
          var d = l.IsCallable(b) ? b : null;
          c.push(function (a, b) {
            a = d ? g(d, this, a, b) : b;
            if ("symbol" !== typeof a) return D.symbol(a) ? zb({})(a) : a;
          });
        }
        2 < arguments.length && c.push(arguments[2]);
        return Bd.apply(this, c);
      }
    });
  }
  return p;
});
(function (f) {
  (function (f) {
    (function (f) {
      (function (f) {
        var e = (function () {
          function a() {
            this._promises = new Map();
          }
          Object.defineProperty(a.prototype, "length", {
            get: function () {
              return this._promises.size;
            },
            enumerable: !0,
            configurable: !0,
          });
          a.prototype.make = function (a, c, b) {
            if (this._promises.has(a)) return b("Existing request with token " + a);
            this._promises.set(a, { reject: b, resolve: c });
          };
          a.prototype.keep = function (a, c) {
            var b = this._promises.get(a);
            if (!b) throw Error("No promise associated with token: " + a);
            b = b.resolve;
            this._promises.delete(a);
            return b(c);
          };
          a.prototype.break = function (a, c) {
            var b = this._promises.get(a);
            if (!b) throw Error("No promise associated with token: " + a);
            this._promises.delete(a);
            b.reject(c);
          };
          return a;
        })();
        f.PromiseStore = e;
      })(f.prediction || (f.prediction = {}));
    })(f.text || (f.text = {}));
  })(f.keyman || (f.keyman = {}));
})(com || (com = {}));
(function (f) {
  (function (f) {
    (function (f) {
      (function (f) {
        var e = (function () {
          function a(d, c) {
            this._worker = c || new Worker(a.asBlobURI(LMLayerWorkerCode));
            this._worker.onmessage = this.onMessage.bind(this);
            this._declareLMLayerReady = null;
            this._predictPromises = new f.PromiseStore();
            this._wordbreakPromises = new f.PromiseStore();
            this._nextToken = Number.MIN_SAFE_INTEGER;
            this.sendConfig(d);
          }
          a.prototype.sendConfig = function (a) {
            this._worker.postMessage({ message: "config", capabilities: a });
          };
          a.prototype.loadModel = function (a) {
            var c = this;
            return new Promise(function (b, d) {
              c._declareLMLayerReady = b;
              c._worker.postMessage({ message: "load", model: a });
            });
          };
          a.prototype.unloadModel = function () {
            this._worker.postMessage({ message: "unload" });
          };
          a.prototype.predict = function (a, c) {
            var b = this,
              d = this._nextToken++;
            return new Promise(function (e, f) {
              b._predictPromises.make(d, e, f);
              b._worker.postMessage({ message: "predict", token: d, transform: a, context: c });
            });
          };
          a.prototype.wordbreak = function (a) {
            var c = this,
              b = this._nextToken++;
            return new Promise(function (d, e) {
              c._wordbreakPromises.make(b, d, e);
              c._worker.postMessage({ message: "wordbreak", token: b, context: a });
            });
          };
          a.prototype.onMessage = function (a) {
            var c = a.data;
            if ("error" === c.message) console.error(c.log), c.error && console.error(c.error);
            else if ("ready" === c.message) this._declareLMLayerReady(a.data.configuration);
            else if ("suggestions" === c.message) this._predictPromises.keep(c.token, c.suggestions);
            else if ("currentword" === c.message) this._wordbreakPromises.keep(c.token, c.word);
            else throw Error("Message not implemented: " + c.message);
          };
          a.prototype.shutdown = function () {
            this._worker.terminate();
          };
          a.unwrap = function (a) {
            return a.toString().match(/function[^{]+{((?:.|\r|\n)+)}[^}]*$/)[1];
          };
          a.asBlobURI = function (d) {
            d = a.unwrap(d);
            d = new Blob([d], { type: "text/javascript" });
            return URL.createObjectURL(d);
          };
          return a;
        })();
        f.LMLayer = e;
      })(f.prediction || (f.prediction = {}));
    })(f.text || (f.text = {}));
  })(f.keyman || (f.keyman = {}));
})(com || (com = {}));
(function () {
  var f = com.keyman.text.prediction;
  "undefined" !== typeof module && "undefined" !== typeof module.exports ? ((module.exports = f.LMLayer), (f.LMLayer.PromiseStore = f.PromiseStore)) : (window.LMLayer = f.LMLayer);
})();
(function (f) {
  (function (g) {
    (function (g) {
      (function (k) {
        var e = (function () {
            return function (a, b) {
              this.left = a.getTextBeforeCaret();
              this.startOfBuffer = this.left._kmwLength() > b.leftContextCodePoints;
              this.startOfBuffer || (this.left = this.left._kmwSubstr(-b.leftContextCodePoints));
              this.right = a.getTextAfterCaret();
              this.endOfBuffer = this.right._kmwLength() > b.leftContextCodePoints;
              this.endOfBuffer || (this.right = this.right._kmwSubstr(0, b.leftContextCodePoints));
            };
          })(),
          a = (function () {
            return function (a, b) {
              this.suggestions = a;
              this.transcriptionID = b;
            };
          })();
        k.ReadySuggestions = a;
        var d = (function () {
          function c() {
            this.recentTranscriptions = [];
            this._mayCorrect = this._mayPredict = !0;
            this.registeredModels = {};
            this.languageModelMap = {};
          }
          c.prototype.init = function () {
            var a = f.keyman.singleton,
              c = { maxLeftContextCodePoints: 64, maxRightContextCodePoints: a.isEmbedded ? 0 : 64 };
            this.canEnable() && ((this.lmEngine = new k.LMLayer(c)), a.addEventListener("keyboardchange", this.onKeyboardChange.bind(this)));
          };
          Object.defineProperty(c.prototype, "activeModel", {
            get: function () {
              return this.currentModel;
            },
            enumerable: !0,
            configurable: !0,
          });
          c.prototype.unloadModel = function () {
            this.lmEngine.unloadModel();
            delete this.currentModel;
            delete this.configuration;
          };
          c.prototype.loadModel = function (a) {
            if (!a) throw Error("Null reference not allowed.");
            var b = this;
            return this.lmEngine.loadModel(a.path).then(function (c) {
              b.currentModel = a;
              b.configuration = c;
            });
          };
          c.prototype.onKeyboardChange = function (a) {
            var b,
              d = f.keyman.singleton;
            if (!this.mayPredict) return Promise.resolve();
            "string" == typeof a && (a = ((b = {}), (b.internalName = d.keyboardManager.getActiveKeyboardName()), (b.languageCode = a), (b.indirect = !0), b));
            var e = this.languageModelMap[a.languageCode],
              g;
            if (this.currentModel !== e && (this.currentModel && (this.unloadModel(), d.util.callEvent(c.EVENT_PREFIX + "modelchange", "unloaded")), e && (g = this.loadModel(e)), g)) {
              var k = this;
              g.then(function () {
                k.mayPredict ? d.util.callEvent(c.EVENT_PREFIX + "modelchange", "loaded") : k.unloadModel();
              }).catch(function (a) {
                console.error("Could not load model '" + e.id + "': " + a);
              });
            }
          };
          c.prototype.register = function (a) {
            var b = f.keyman.singleton.keyboardManager.getActiveLanguage();
            this.registeredModels[a.id] = a;
            var c = this;
            a.languages.forEach(function (d) {
              c.languageModelMap[d] = a;
              if (d == b) c.onKeyboardChange(d);
            });
          };
          c.prototype.deregister = function (a) {
            var b = f.keyman.singleton;
            if (this.registeredModels[a]) {
              var d = this.registeredModels[a];
              delete this.registeredModels[a];
              this.currentModel && this.currentModel.id == a && (this.unloadModel(), b.util.callEvent(c.EVENT_PREFIX + "modelchange", "unloaded"));
              var e = this;
              d.languages.forEach(function (b) {
                e.languageModelMap[b].id == a && delete e.languageModelMap[b];
              });
            }
          };
          c.prototype.isRegistered = function (a) {
            return !!this.registeredModels[a.id];
          };
          c.prototype.addEventListener = function (a, d) {
            return f.keyman.singleton.util.addEventListener(c.EVENT_PREFIX + a, d);
          };
          c.prototype.removeEventListener = function (a, d) {
            return f.keyman.singleton.util.removeEventListener(c.EVENT_PREFIX + a, d);
          };
          c.prototype.invalidateContext = function () {
            f.keyman.singleton.util.callEvent(c.EVENT_PREFIX + "invalidatesuggestions", "context");
            this.currentModel && this.configuration && this.predict_internal();
          };
          c.prototype.wordbreak = function (a) {
            a = new e(g.Mock.from(a), this.configuration);
            return this.lmEngine.wordbreak(a);
          };
          c.prototype.predict = function (a) {
            this.currentModel && this.configuration && (f.keyman.singleton.util.callEvent(c.EVENT_PREFIX + "invalidatesuggestions", "new"), this.predict_internal(a));
          };
          c.prototype.predict_internal = function (b) {
            var d = f.keyman.singleton;
            if (!b)
              if ((b = g.Processor.getOutputTarget())) b = b.buildTranscriptionFrom(b, null);
              else return;
            var k = new e(b.preInput, this.configuration);
            this.recordTranscription(b);
            var r = b.transform,
              q = (this.currentPromise = this.lmEngine.predict(b.alternates || b.transform, k)),
              z = this;
            q.then(function (b) {
              q == z.currentPromise && ((b = new a(b, r.id)), d.util.callEvent(c.EVENT_PREFIX + "suggestionsready", b), (z.currentPromise = null));
            });
          };
          c.prototype.recordTranscription = function (a) {
            this.recentTranscriptions.push(a);
            this.recentTranscriptions.length > c.TRANSCRIPTION_BUFFER && this.recentTranscriptions.splice(0, 1);
          };
          c.prototype.getPredictionState = function (a) {
            var b = this.recentTranscriptions.filter(function (b) {
              return b.token == a;
            });
            return 0 == b.length ? null : b[0];
          };
          c.prototype.shutdown = function () {
            this.lmEngine.shutdown();
          };
          Object.defineProperty(c.prototype, "enabled", {
            get: function () {
              return this.activeModel && this._mayPredict;
            },
            enumerable: !0,
            configurable: !0,
          });
          c.prototype.canEnable = function () {
            var a = f.keyman.singleton;
            return 10 == a.util.getIEVersion()
              ? (console.warn("KeymanWeb cannot properly initialize its WebWorker in this version of IE."), !1)
              : 10 > a.util.getIEVersion()
              ? (console.warn("WebWorkers are not supported in this version of IE."), !1)
              : !0;
          };
          c.prototype.doEnable = function (a) {
            var b = f.keyman.singleton;
            if (a) {
              if (((a = b.keyboardManager.getActiveLanguage()), this.languageModelMap[a])) this.onKeyboardChange(a);
            } else this.activeModel && this.unloadModel(), b.util.callEvent(c.EVENT_PREFIX + "modelchange", "unloaded");
          };
          Object.defineProperty(c.prototype, "mayPredict", {
            get: function () {
              return this._mayPredict;
            },
            set: function (a) {
              var b = this.enabled;
              this.canEnable() && ((this._mayPredict = a), (b != this.enabled || a) && this.doEnable(a));
            },
            enumerable: !0,
            configurable: !0,
          });
          Object.defineProperty(c.prototype, "mayCorrect", {
            get: function () {
              return this._mayCorrect;
            },
            set: function (a) {
              this._mayCorrect = a;
            },
            enumerable: !0,
            configurable: !0,
          });
          c.prototype.tryAcceptSuggestion = function (a) {
            return !f.keyman.singleton.util.callEvent(c.EVENT_PREFIX + "tryaccept", a);
          };
          c.prototype.tryRevertSuggestion = function () {
            return !f.keyman.singleton.util.callEvent(c.EVENT_PREFIX + "tryrevert", null);
          };
          c.EVENT_PREFIX = "kmw.mm.";
          c.TRANSCRIPTION_BUFFER = 10;
          return c;
        })();
        k.ModelManager = d;
      })(g.prediction || (g.prediction = {}));
    })(g.text || (g.text = {}));
  })(f.keyman || (f.keyman = {}));
})(com || (com = {}));
(function (f) {
  (function (g) {
    var k = (function () {
      function k() {
        this._TitleElement = null;
        this._IE = 0;
        this._MasterDocument = null;
        this._HotKeys = [];
        this.warned = !1;
        this.baseFont = "sans-serif";
        this.appliedFont = "";
        this.fontCheckTimer = null;
        this.protocol = this.rootPath = this.srcPath = "";
        this.mustReloadKeyboard = !1;
        this.globalLanguageCode = this.globalKeyboard = null;
        this.isEmbedded = !1;
        this.refocusTimer = 0;
        this.isHeadless = !1;
        this.build = 300;
        this.options = { root: "", resources: "", keyboards: "", fonts: "", attachType: "", ui: null };
        this.refreshElementContent = null;
        this.util = this.util = new g.Util(this);
        window.KeymanWeb = this.interface = this["interface"] = new g.text.KeyboardInterface();
        this.ui = this.ui = {};
        this.keyboardManager = new g.KeyboardManager(this);
        this.domManager = new g.DOMManager(this);
        this.hotkeyManager = new g.HotkeyManager(this);
        this.uiManager = new g.UIManager(this);
        this.keyMapManager = new g.KeyMapManager();
        this.textProcessor = new g.text.Processor();
        this.modelManager = new g.text.prediction.ModelManager();
        this.osk = this.osk = new f.keyman.osk.OSKManager();
        this.build = k.__BUILD__;
        this.srcPath = k._srcPath;
        this.rootPath = k._rootPath;
        this.protocol = k._protocol;
        this.version = f.keyman.environment.VERSION;
        this.helpURL = "http://help.keyman.com/go";
        this.setInitialized(0);
        this.loaded = !0;
      }
      k.prototype.setDefaultDeviceOptions = function (e) {};
      k.prototype.getStyleSheetPath = function (e) {
        return e;
      };
      k.prototype.getKeyboardPath = function (e, a) {
        return e;
      };
      k.prototype.KC_ = function (e, a, d) {
        return "";
      };
      k.prototype.handleRotationEvents = function () {};
      k.prototype.alignInputs = function (e) {};
      k.prototype.hideInputs = function () {};
      k.prototype.namespaceID = function (e) {};
      k.prototype.preserveID = function (e) {};
      k.prototype.setInitialized = function (e) {
        this.initialized = this.initialized = e;
      };
      k.prototype.delayedInit = function () {
        this.touchAliasing = this.util.device.touchable ? this.domManager.touchHandlers : this.domManager.nonTouchHandlers;
      };
      k.prototype.shutdown = function () {
        this.util.detachDOMEvent(window, "focus", this.pageFocusHandler, !1);
        this.util.detachDOMEvent(window, "blur", this.pageFocusHandler, !1);
        this.domManager.shutdown();
        this.osk.shutdown();
        this.util.shutdown();
        this.keyboardManager.shutdown();
        this.modelManager.shutdown();
        this.ui && this.ui.shutdown && this.ui.shutdown();
        g.DOMEventHandlers.states = new g.CommonDOMStates();
      };
      k.prototype.isFontAvailable = function (e) {
        return this.util.checkFont({ family: e });
      };
      k.prototype.addEventListener = function (e, a) {
        return this.util.addEventListener("kmw." + e, a);
      };
      k.prototype._GetEventObject = function (e) {
        if (!e && ((e = window.event), !e)) {
          var a = this.domManager.getLastActiveElement();
          if (a) {
            a = a.ownerDocument;
            if (a) var d = a.defaultView;
            if (!d) return null;
            e = d.event;
          }
        }
        return e;
      };
      k.prototype._push = function (e, a) {
        e.push ? e.push(a) : (e = e.concat(a));
        return e;
      };
      k.prototype.attachToControl = function (e) {
        this.domManager.attachToControl(e);
      };
      k.prototype.detachFromControl = function (e) {
        this.domManager.detachFromControl(e);
      };
      k.prototype.addKeyboards = function (e) {
        0 == arguments.length ? this.keyboardManager.keymanCloudRequest("", !1) : this.keyboardManager.addKeyboardArray(arguments);
      };
      k.prototype.addKeyboardsForLanguage = function (e) {
        this.keyboardManager.addLanguageKeyboards(arguments);
      };
      k.prototype.register = function (e) {
        this.keyboardManager.register(e);
      };
      k.prototype.removeKeyboards = function (e) {
        return this.keyboardManager.removeKeyboards(e);
      };
      k.prototype.setActiveKeyboard = function (e, a) {
        return this.keyboardManager.setActiveKeyboard(e, a);
      };
      k.prototype.getActiveKeyboard = function () {
        return this.keyboardManager.getActiveKeyboardName();
      };
      k.prototype.getActiveLanguage = function (e) {
        return this.keyboardManager.getActiveLanguage(e);
      };
      k.prototype.isAttached = function (e) {
        return this.domManager.isAttached(e);
      };
      k.prototype.isCJK = function (e) {
        return this.keyboardManager.isCJK(e);
      };
      k.prototype.isChiral = function (e) {
        return this.keyboardManager.isChiral(e);
      };
      k.prototype.getKeyboard = function (e, a) {
        var d,
          c = this.keyboardManager.getDetailedKeyboards();
        for (d = 0; d < c.length; d++) {
          var b = c[d];
          if (b.InternalName == e || b.InternalName == "Keyboard_" + e) if (2 > arguments.length || b.LanguageCode == a) return b;
        }
        return null;
      };
      k.prototype.getKeyboards = function () {
        return this.keyboardManager.getDetailedKeyboards();
      };
      k.prototype.getSavedKeyboard = function () {
        return this.keyboardManager.getSavedKeyboard();
      };
      k.prototype.init = function (e) {
        return this.domManager.init(e);
      };
      k.prototype.resetContext = function () {
        this.interface.resetContext();
      };
      k.prototype.setNumericLayer = function () {
        this.interface.setNumericLayer();
      };
      k.prototype.disableControl = function (e) {
        this.domManager.disableControl(e);
      };
      k.prototype.enableControl = function (e) {
        this.domManager.enableControl(e);
      };
      k.prototype.setKeyboardForControl = function (e, a, d) {
        this.domManager.setKeyboardForControl(e, a, d);
      };
      k.prototype.getKeyboardForControl = function (e) {
        this.domManager.getKeyboardForControl(e);
      };
      k.prototype.getLanguageForControl = function (e) {
        this.domManager.getLanguageForControl(e);
      };
      k.prototype.focusLastActiveElement = function () {
        this.domManager.focusLastActiveElement();
      };
      k.prototype.getLastActiveElement = function () {
        return this.domManager.getLastActiveElement();
      };
      k.prototype.setActiveElement = function (e, a) {
        return this.domManager.setActiveElement(e, a);
      };
      k.prototype.moveToElement = function (e) {
        this.domManager.moveToElement(e);
      };
      k.prototype.addHotKey = function (e, a, d) {
        this.hotkeyManager.addHotKey(e, a, d);
      };
      k.prototype.removeHotKey = function (e, a) {
        this.hotkeyManager.removeHotkey(e, a);
      };
      k.prototype.getUIState = function () {
        return this.uiManager.getUIState();
      };
      k.prototype.activatingUI = function (e) {
        this.uiManager.setActivatingUI(e);
      };
      k.prototype.BuildVisualKeyboard = function (e, a, d, c) {
        return f.keyman.osk.VisualKeyboard.buildDocumentationKeyboard(e, a, d, c);
      };
      return k;
    })();
    g.KeymanBase = k;
  })(f.keyman || (f.keyman = {}));
})(com || (com = {}));
var scripts = document.getElementsByTagName("script"),
  ss = scripts[scripts.length - 1].src,
  sPath = ss.substr(0, ss.lastIndexOf("/") + 1),
  KeymanBase = com.keyman.KeymanBase;
KeymanBase._srcPath = sPath;
KeymanBase._rootPath = sPath.replace(/(https?:\/\/)([^\/]*)(.*)/, "$1$2/");
KeymanBase._protocol = sPath.replace(/(.{3,5}:)(.*)/, "$1");
KeymanBase.__BUILD__ = 109;
(window.keyman && window.keyman.loaded) ||
  (function () {
    window.keyman = com.keyman.singleton = new KeymanBase();
  })();
window.keyman.initialized ||
  (function () {
    var f = window.keyman,
      g = f.util;
    f.debug = f.debug = function (g) {
      if (null == f.debugElement) {
        var k = document.createElement("DIV");
        var e = k.style;
        e.position = "absolute";
        e.width = "30%";
        e.maxHeight = "50%";
        e.top = "0";
        e.right = "0";
        e.minHeight = "50px";
        e.border = "1px solid blue";
        e.whiteSpace = "pre-line";
        e.overflowY = "scroll";
        e = document.createElement("P");
        e.id = "debug_output";
        e.style.margin = "2px";
        k.appendChild(e);
        document.body.appendChild(k);
        f.debugElement = e;
      }
      if (null != (e = document.getElementById("debug_output")))
        if (0 == arguments.length) "undefined" != typeof e.textContent ? (e.textContent = "") : (e.innerHTML = "");
        else {
          k = new Date().toTimeString().substr(3, 5) + " ";
          var a, d;
          for (a = 0; a < arguments.length; a++) {
            0 < a && (k += "; ");
            var c = arguments[a];
            if ("object" == typeof c)
              if (null == c) k += "null";
              else {
                var b = "";
                for (d in c) {
                  0 < b.length && (b += ", ");
                  b = b + d + ":";
                  switch (typeof c[d]) {
                    case "string":
                    case "number":
                    case "boolean":
                      b += c[d];
                      break;
                    default:
                      b += typeof c[d];
                  }
                  if (1024 < b.length) {
                    b = b.substr(0, 1e3) + "...";
                    break;
                  }
                }
                0 < b.length && (k = k + "{" + b + "}");
              }
            else k += c;
          }
          1500 < k.length && (k = k.substr(0, 1500) + " (more)");
          "undefined" != typeof e.textContent ? (e.textContent = k + "\n" + e.textContent) : (e.innerHTML = k + "<br />" + e.innerHTML);
        }
    };
    f.debugElement = null;
    f.delayedInit();
    com.keyman.osk.Layouts._BaseLayout = "undefined" !== typeof window.KeymanWeb_BaseLayout ? window.KeymanWeb_BaseLayout : "us";
    f._BrowserIsSafari = 0 <= navigator.userAgent.indexOf("AppleWebKit");
    g.attachDOMEvent(window, "load", f.domManager._WindowLoad, !1);
    g.attachDOMEvent(window, "unload", f.domManager._WindowUnload, !1);
    g.attachDOMEvent(document, "keyup", f.hotkeyManager._Process, !1);
    f.pageFocusHandler = f.interface.resetVKShift.bind(f.interface);
    g.attachDOMEvent(window, "focus", f.pageFocusHandler, !1);
    g.attachDOMEvent(window, "blur", f.pageFocusHandler, !1);
    String.kmwEnableSupplementaryPlane(!1);
  })();
(function (f) {
  (function (f) {
    var g = (function () {
        function e() {
          this.innerWidth = window.innerWidth;
          this.innerHeight = window.innerHeight;
        }
        e.prototype.equals = function (a) {
          return this.innerWidth == a.innerWidth && this.innerHeight == a.innerHeight;
        };
        return e;
      })(),
      r = (function () {
        function e(a) {
          this.idlePermutationCounter = e.IDLE_PERMUTATION_CAP;
          this.keyman = a;
        }
        e.prototype.resolve = function () {
          this.keyman.alignInputs();
          var a = this.keyman.osk;
          a._Load();
          this.oskVisible && a._Show();
          this.isActive = !1;
          this.updateTimer && (window.clearInterval(this.updateTimer), (this.rotState = null));
        };
        e.prototype.initNewRotation = function () {
          this.oskVisible = this.keyman.osk.isVisible();
          this.keyman.osk.hideNow();
          this.isActive = !0;
        };
        e.prototype.init = function () {
          if (!this.keyman.isEmbedded) {
            var a = this.keyman.util.device.OS,
              d = this.keyman.util,
              c = this;
            "iOS" == a
              ? (d.attachDOMEvent(window, "orientationchange", function () {
                  c.iOSEventHandler();
                  return !1;
                }),
                d.attachDOMEvent(window, "resize", function () {
                  c.iOSEventHandler();
                  return !1;
                }))
              : "Android" == a &&
                ("onmozorientationchange" in screen
                  ? d.attachDOMEvent(screen, "mozorientationchange", function () {
                      c.initNewRotation();
                      return !1;
                    })
                  : d.attachDOMEvent(window, "orientationchange", function () {
                      c.initNewRotation();
                      return !1;
                    }),
                d.attachDOMEvent(window, "resize", function () {
                  c.resolve();
                  return !1;
                }));
          }
        };
        e.prototype.iOSEventHandler = function () {
          this.isActive || (this.initNewRotation(), (this.rotState = new g()), (this.updateTimer = window.setInterval(this.iOSEventUpdate.bind(this), e.UPDATE_INTERVAL)));
          this.idlePermutationCounter = 0;
        };
        e.prototype.iOSEventUpdate = function () {
          var a = new g();
          this.rotState.equals(a) ? ++this.idlePermutationCounter == e.IDLE_PERMUTATION_CAP && this.resolve() : ((this.rotState = a), (this.idlePermutationCounter = 0));
        };
        e.IDLE_PERMUTATION_CAP = 15;
        e.UPDATE_INTERVAL = 20;
        return e;
      })();
    f.RotationManager = r;
  })(f.keyman || (f.keyman = {}));
})(com || (com = {}));
window.keyman.initialized ||
  (function () {
    var f = window.keyman,
      g = f.util,
      k = g.device,
      r = com.keyman.dom;
    f.isEmbedded = !1;
    f.setDefaultDeviceOptions = function (e) {
      "" == e.attachType && (e.attachType = k.touchable ? "manual" : "auto");
    };
    g.wait = function (e) {
      var a = this.waiting;
      if ("undefined" != typeof a && null != a && !f.warned) {
        var d = a.firstChild.childNodes;
        e
          ? ((a.pending = !0),
            window.setTimeout(function () {
              a.pending && (window.scrollTo(0, 0), (d[0].style.display = "none"), (d[1].className = "kmw-wait-text"), (d[1].innerHTML = e), (d[2].style.display = "block"), (a.style.display = "block"));
            }, 1e3))
          : a.pending && ((d[1].innerHTML = ""), (a.pending = !1), (a.style.display = "none"));
      }
    };
    f.getStyleSheetPath = function (e) {
      return g.getOption("resources") + "osk/" + e;
    };
    f.getKeyboardPath = function (e) {
      return (/^(([\.]\/)|([\.][\.]\/)|(\/))|(:)/.test(e) ? "" : f.options.keyboards) + e;
    };
    f.alignInputs = function (e) {
      if (k.touchable) {
        var a = f.domManager,
          d = [];
        e
          ? e.forEach(function (a) {
              a.base ? d.push(a) : a.kmw_ip && d.push(a.kmw_ip);
            })
          : (d = a.inputList);
        d.forEach(function (a) {
          r.Utils.instanceof(a, "TouchAliasElement") && a.updateInput();
          a.style.visibility = "visible";
          0 < a.base.textContent.length && (a.base.style.visibility = "hidden");
        });
      }
    };
    f.hideInputs = function () {
      var e = f.domManager;
      if (k.touchable) for (var a = 0; a < e.inputList.length; a++) (e.inputList[a].style.visibility = "hidden"), (e.inputList[a].base.style.visibility = "visible");
    };
    f.isPositionSynthesized = function () {
      return k.touchable;
    };
    f.handleRotationEvents = function () {
      new com.keyman.RotationManager(f).init();
    };
  })();
(function () {
  var f = window.keyman,
    g = window.setInterval(function () {
      "complete" === document.readyState && (window.clearInterval(g), f.init(null));
    }, 10);
})();
(function () {
  var f = com.keyman.Util.prototype;
  f._GetAbsoluteX = f.getAbsoluteX;
  f._GetAbsoluteY = f.getAbsoluteY;
  f._GetAbsolute = f.getAbsolute;
  f.toNzString = f.nzString;
})();
(function () {
  var f = com.keyman.text.KeyboardInterface.prototype,
    g = function (g, r) {
      f[g] = f[r];
    };
  g("KSF", "saveFocus");
  g("KBR", "beepReset");
  g("KT", "insertText");
  g("KR", "registerKeyboard");
  g("KRS", "registerStub");
  g("KC", "context");
  g("KN", "nul");
  g("KCM", "contextMatch");
  g("KFCM", "fullContextMatch");
  g("KIK", "isKeypress");
  g("KKM", "keyMatch");
  g("KSM", "stateMatch");
  g("KKI", "keyInformation");
  g("KDM", "deadkeyMatch");
  g("KB", "beep");
  g("KA", "any");
  g("KDC", "deleteContext");
  g("KO", "output");
  g("KDO", "deadkeyOutput");
  g("KIO", "indexOutput");
  g("KIFS", "ifStore");
  g("KSETS", "setStore");
  g("KLOAD", "loadStore");
  g("KSAVE", "saveStore");
})();
//# sourceMappingURL=keymanweb.js.map
