// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"2XRPf":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "366bdd869d4680a051b3dad358c0016d";
// @flow
/*global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE*/
/*::
import type {
HMRAsset,
HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
(string): mixed;
cache: {|[string]: ParcelModule|};
hotData: mixed;
Module: any;
parent: ?ParcelRequire;
isParcelRequire: true;
modules: {|[string]: [Function, {|[string]: string|}]|};
HMR_BUNDLE_ID: string;
root: ParcelRequire;
}
interface ParcelModule {
hot: {|
data: mixed,
accept(cb: (Function) => void): void,
dispose(cb: (mixed) => void): void,
// accept(deps: Array<string> | string, cb: (Function) => void): void,
// decline(): void,
_acceptCallbacks: Array<(Function) => void>,
_disposeCallbacks: Array<(mixed) => void>,
|};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || (function () {}));
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, /*: {|[string]: boolean|}*/
acceptedAssets, /*: {|[string]: boolean|}*/
/*: {|[string]: boolean|}*/
assetsToAccept;
function getHostname() {
  return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
  return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = getHostname();
  var port = getPort();
  var protocol = HMR_SECURE || location.protocol == 'https:' && !(/localhost|127.0.0.1|0.0.0.0/).test(hostname) ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
  // $FlowFixMe
  ws.onmessage = function (event) /*: {data: string, ...}*/
  {
    checkedAssets = {
      /*: {|[string]: boolean|}*/
    };
    acceptedAssets = {
      /*: {|[string]: boolean|}*/
    };
    assetsToAccept = [];
    var data = /*: HMRMessage*/
    JSON.parse(event.data);
    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH);
      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        if (didAccept) {
          handled = true;
        }
      });
      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(module.bundle.root, asset);
        });
        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }
    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      }
      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      // $FlowFixMe
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function (e) {
    console.error(e.message);
  };
  ws.onclose = function (e) {
    if (undefined !== 'test') {
      console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}
function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }
  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]>*/
{
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    if (link.parentNode !== null) {
      // $FlowFixMe
      link.parentNode.removeChild(link);
    }
  };
  newLink.setAttribute('href', // $FlowFixMe
  link.getAttribute('href').split('?')[0] + '?' + Date.now());
  // $FlowFixMe
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      // $FlowFixMe[incompatible-type]
      var href = /*: string*/
      links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
      var absolute = (/^https?:\/\//i).test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
      if (!absolute) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
function hmrApply(bundle, /*: ParcelRequire*/
asset) /*:  HMRAsset*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (asset.type === 'css') {
    reloadCSS();
    return;
  }
  let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
  if (deps) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, /*: ParcelRequire*/
id, /*: ParcelRequire*/
/*: string*/
depsByBundle) /*: ?{ [string]: { [string]: string } }*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
    // If we reached the root bundle without finding where the asset should go,
    // there's nothing to do. Mark as "accepted" so we don't reload the page.
    if (!bundle.parent) {
      return true;
    }
    return hmrAcceptCheck(bundle.parent, id, depsByBundle);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(module.bundle.root, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1], null);
  });
}
function hmrAcceptRun(bundle, /*: ParcelRequire*/
id) /*: string*/
{
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(module.bundle.root, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}],"4Dhzm":[function(require,module,exports) {
var define;
/**
* easytimer.js
* Generated: 2021-03-16
* Version: 4.3.4
*/
!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = "undefined" != typeof globalThis ? globalThis : t || self).easytimer = {});
})(this, function (t) {
  "use strict";
  function C(t) {
    return (C = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
      return typeof t;
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
    })(t);
  }
  function e(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      (t && (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), n.push.apply(n, r));
    }
    return n;
  }
  function R(o) {
    for (var t = 1; t < arguments.length; t++) {
      var i = null != arguments[t] ? arguments[t] : {};
      t % 2 ? e(Object(i), !0).forEach(function (t) {
        var e, n, r;
        (e = o, r = i[n = t], (n in e) ? Object.defineProperty(e, n, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }) : e[n] = r);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(i)) : e(Object(i)).forEach(function (t) {
        Object.defineProperty(o, t, Object.getOwnPropertyDescriptor(i, t));
      });
    }
    return o;
  }
  function i(t, e, n) {
    var r, o = "";
    if ((t = "number" == typeof t ? String(t) : t).length > e) return t;
    for (r = 0; r < e; r += 1) o += String(n);
    return (o + t).slice(-o.length);
  }
  function q() {
    this.reset();
  }
  function B() {
    this.events = {};
  }
  (q.prototype.toString = function () {
    var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : ["hours", "minutes", "seconds"], e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : ":", n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 2;
    (t = t || ["hours", "minutes", "seconds"], e = e || ":", n = n || 2);
    var r, o = [];
    for (r = 0; r < t.length; r += 1) void 0 !== this[t[r]] && ("secondTenths" === t[r] ? o.push(this[t[r]]) : o.push(i(this[t[r]], n, "0")));
    return o.join(e);
  }, q.prototype.reset = function () {
    (this.secondTenths = 0, this.seconds = 0, this.minutes = 0, this.hours = 0, this.days = 0);
  }, B.prototype.on = function (t, e) {
    var n = this;
    return (Array.isArray(this.events[t]) || (this.events[t] = []), this.events[t].push(e), function () {
      return n.removeListener(t, e);
    });
  }, B.prototype.removeListener = function (t, e) {
    if (Array.isArray(this.events[t])) {
      var n = this.events[t].indexOf(e);
      -1 < n && this.events[t].splice(n, 1);
    }
  }, B.prototype.emit = function (t) {
    for (var e = this, n = arguments.length, r = new Array(1 < n ? n - 1 : 0), o = 1; o < n; o++) r[o - 1] = arguments[o];
    Array.isArray(this.events[t]) && this.events[t].forEach(function (t) {
      return t.apply(e, r);
    });
  });
  var F = "secondTenths", G = "seconds", H = "minutes", J = "hours", K = "days", N = [F, G, H, J, K], Q = {
    secondTenths: 100,
    seconds: 1e3,
    minutes: 6e4,
    hours: 36e5,
    days: 864e5
  }, W = {
    secondTenths: 10,
    seconds: 60,
    minutes: 60,
    hours: 24
  };
  function X(t, e) {
    return (t % e + e) % e;
  }
  function n() {
    var e, n, o, r, i, s, u, c, a, f, h = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, d = new q(), l = new q(), p = new B(), v = !1, y = !1, m = {}, b = {
      detail: {
        timer: this
      }
    };
    function g(t, e) {
      var n, r, o, i = l[e];
      return (r = x(t, Q[n = e]), o = W[n], l[n] = r, d[n] = n === K ? Math.abs(r) : X(0 <= r ? r : o - X(r, o), o), l[e] !== i);
    }
    function t() {
      (w(), d.reset(), l.reset());
    }
    function w() {
      (clearInterval(e), e = void 0, y = v = !1);
    }
    function O(t) {
      (z() ? (a = j(), s = V(i.target)) : S(t), (function () {
        var t = Q[n];
        if (E(P(Date.now()))) return;
        (e = setInterval(T, t), v = !0, y = !1);
      })());
    }
    function j() {
      return P(Date.now()) - l.secondTenths * Q[F] * o;
    }
    function T() {
      var t = P(Date.now());
      (!(function (t) {
        t[F] && I("secondTenthsUpdated", b);
        t[G] && I("secondsUpdated", b);
        t[H] && I("minutesUpdated", b);
        t[J] && I("hoursUpdated", b);
        t[K] && I("daysUpdated", b);
      })(A()), r(b.detail.timer), E(t) && (M(), I("targetAchieved", b)));
    }
    function A(t) {
      var e = 0 < arguments.length && void 0 !== t ? t : P(Date.now()), n = 0 < o ? e - a : a - e, r = {};
      return (r[F] = g(n, F), r[G] = g(n, G), r[H] = g(n, H), r[J] = g(n, J), r[K] = g(n, K), r);
    }
    function P(t) {
      return Math.floor(t / Q[n]) * Q[n];
    }
    function E(t) {
      return s instanceof Array && f <= t;
    }
    function S(t) {
      var e;
      (n = (function (t) {
        if ((function (t) {
          return 0 <= N.indexOf(t);
        })(t = typeof t === "string" ? t : G)) return t;
        throw new Error(("Error in precision parameter: ").concat(t, " is not a valid value"));
      })((t = t || ({})).precision), r = "function" == typeof t.callback ? t.callback : function () {}, c = !0 === t.countdown, o = !0 == c ? -1 : 1, "object" === C(t.startValues) ? (e = t.startValues, u = D(e), d.secondTenths = u[0], d.seconds = u[1], d.minutes = u[2], d.hours = u[3], d.days = u[4], l = L(u, l)) : u = null, a = j(), A(), s = "object" === C(t.target) ? V(t.target) : c ? (t.target = {
        seconds: 0
      }, V(t.target)) : null, m = {
        precision: n,
        callback: r,
        countdown: "object" === C(t) && !0 === t.countdown,
        target: s,
        startValues: u
      }, i = t);
    }
    function D(t) {
      var e;
      if ("object" === C(t)) if (t instanceof Array) {
        if (5 !== t.length) throw new Error("Array size not valid");
        e = t;
      } else {
        for (var n in t) if (N.indexOf(n) < 0) throw new Error(("Error in startValues or target parameter: ").concat(n, " is not a valid input value"));
        e = [t.secondTenths || 0, t.seconds || 0, t.minutes || 0, t.hours || 0, t.days || 0];
      }
      var r = e[0], o = e[1] + x(r, 10), i = e[2] + x(o, 60), s = e[3] + x(i, 60), u = e[4] + x(s, 24);
      return (e[0] = r % 10, e[1] = o % 60, e[2] = i % 60, e[3] = s % 24, e[4] = u, e);
    }
    function x(t, e) {
      var n = t / e;
      return n < 0 ? Math.ceil(n) : Math.floor(n);
    }
    function V(t) {
      if (t) {
        var e = L(s = D(t));
        return (f = a + e.secondTenths * Q[F] * o, s);
      }
    }
    function L(t, e) {
      var n = e || ({});
      return (n.days = t[4], n.hours = 24 * n.days + t[3], n.minutes = 60 * n.hours + t[2], n.seconds = 60 * n.minutes + t[1], n.secondTenths = 10 * n.seconds + t[[0]], n);
    }
    function M() {
      (t(), I("stopped", b));
    }
    function U(t, e) {
      p.on(t, e);
    }
    function k(t, e) {
      p.removeListener(t, e);
    }
    function I(t, e) {
      p.emit(t, e);
    }
    function _() {
      return v;
    }
    function z() {
      return y;
    }
    (S(h), void 0 !== this && (this.start = function () {
      var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
      (t = R(R({}, h), t), _() || (O(t), I("started", b)));
    }, this.pause = function () {
      (w(), y = !0, I("paused", b));
    }, this.stop = M, this.reset = function () {
      (t(), O(i), I("reset", b));
    }, this.isRunning = _, this.isPaused = z, this.getTimeValues = function () {
      return d;
    }, this.getTotalTimeValues = function () {
      return l;
    }, this.getConfig = function () {
      return m;
    }, this.addEventListener = U, this.on = U, this.removeEventListener = k, this.off = k));
  }
  (t.Timer = n, t.default = n, Object.defineProperty(t, "__esModule", {
    value: !0
  }));
});

},{}]},["2XRPf","4Dhzm"], "4Dhzm", "parcelRequiref77e")

//# sourceMappingURL=index.58c0016d.js.map
