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
})({"27Rzb":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "97912cc17f1f5bdf37964fbc8a5bc16d";
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

},{}],"4OAbU":[function(require,module,exports) {
var _componentsNavigation = require('./components/navigation');
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _componentsNavigationDefault = _parcelHelpers.interopDefault(_componentsNavigation);
require('./components/tasklist');
require('./components/timers');
require('./components/readinglist');
require('./components/dictionary');
require('./components/musicplayer');
// Navigation
const links = document.querySelectorAll('.top_nav > ul > li > a');
const pages = document.querySelectorAll('.page_container');
var nav = new _componentsNavigationDefault.default(links, pages);
// nav.getLinks();
nav.links.forEach(function (link) {
  link.addEventListener('click', function () {
    let pageId = nav.getHash(link);
    nav.setPage(pageId);
  });
});
const subLinks = document.querySelectorAll('.sub_nav > ul > li > a');
const subPages = document.querySelectorAll('.sub_page_container');
var subNav = new _componentsNavigationDefault.default(subLinks, subPages);
subNav.links.forEach(link => {
  link.addEventListener('click', function () {
    let pageId = subNav.getHash(link);
    subNav.setPage(pageId);
  });
});

},{"./components/navigation":"2K1cj","./components/tasklist":"Rj9Cl","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y","./components/timers":"1ujtl","./components/readinglist":"2jNHT","./components/dictionary":"2aL5o","./components/musicplayer":"6m8Cd"}],"2K1cj":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
class Navigation {
  constructor(links, pages) {
    this.links = links;
    this.pages = pages;
    this.currentPage = null;
  }
  getLinks() {
    console.log(this.links);
  }
  getHash(link) {
    return link.href.split("#")[1];
  }
  setPage(pageId) {
    this.currentPage = pageId;
    console.log(this.currentPage);
    this.links.forEach(link => {
      link.classList.remove('active');
      if (this.getHash(link) === pageId) {
        link.classList.add('active');
      }
    });
    this.pages.forEach(page => {
      page.style.display = 'none';
    });
    document.getElementById(pageId).style.display = "block";
  }
}
exports.default = Navigation;

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"5gA8y":[function(require,module,exports) {
"use strict";

exports.interopDefault = function (a) {
  return a && a.__esModule ? a : {
    default: a
  };
};

exports.defineInteropFlag = function (a) {
  Object.defineProperty(a, '__esModule', {
    value: true
  });
};

exports.exportAll = function (source, dest) {
  Object.keys(source).forEach(function (key) {
    if (key === 'default' || key === '__esModule') {
      return;
    } // Skip duplicate re-exports when they have the same value.


    if (key in dest && dest[key] === source[key]) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function () {
        return source[key];
      }
    });
  });
  return dest;
};

exports.export = function (dest, destName, get) {
  Object.defineProperty(dest, destName, {
    enumerable: true,
    get: get
  });
};
},{}],"Rj9Cl":[function(require,module,exports) {
var _taskStorageJs = require('./taskStorage.js');
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _taskStorageJsDefault = _parcelHelpers.interopDefault(_taskStorageJs);
var _labelStorageJs = require('./labelStorage.js');
var _labelStorageJsDefault = _parcelHelpers.interopDefault(_labelStorageJs);
var _kanbanStorageJs = require('./kanbanStorage.js');
var _kanbanStorageJsDefault = _parcelHelpers.interopDefault(_kanbanStorageJs);
require('../libraries/jkanban.min.js');
const taskWrapper = document.getElementById("taskWrapper");
const taskAll = document.getElementById("taskgrid");
const form = document.getElementById("taskForm");
const tasks = document.getElementById("taskList");
var taskDescription = document.getElementById("td");
var dueDate = document.getElementById("dd");
var completionTime = document.getElementById("ct");
var priorityRating = document.getElementById("pr");
var estimatedTime = document.getElementById("et");
var labelName = document.getElementById("newLabelInput");
var labelColour = document.getElementById("labelColourInput");
// var completionStatus = document.getElementById("cs");
// var y = priorityRating.options;
// var x = priorityRating.selectedIndex;
// var prIndex = priorityRating.options[priorityRating.selectedIndex].index;
Date.prototype.toDateInputValue = function () {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
};
// dueDate.value = new Date().toDateInputValue();
const addBtn = document.getElementById('addBtn');
const addPage = document.getElementById('addTask');
const uploadBtn = document.getElementById('uploadBtn');
const closeBtn = document.getElementById('closeAdd');
const taskBtn = document.querySelector('.task_btn');
const kanban = document.getElementById('kanban');
let taskOpen = false;
// Event Listener: Task List Open
taskBtn.addEventListener('click', () => {
  if (!taskOpen) {
    taskBtn.classList.add('open');
    taskAll.classList.add('open');
    taskWrapper.classList.add('open');
    kanban.classList.add('open');
    taskOpen = true;
  } else {
    taskBtn.classList.remove('open');
    taskAll.classList.remove('open');
    taskWrapper.classList.remove('open');
    kanban.classList.remove('open');
    taskOpen = false;
  }
});
// close Task List when main page is clicked
kanban.addEventListener('click', function () {
  if (taskOpen) {
    taskBtn.classList.remove('open');
    taskAll.classList.remove('open');
    taskWrapper.classList.remove('open');
    kanban.classList.remove('open');
    taskOpen = false;
  }
});
// document.querySelectorAll('.kanban-board').forEach(element => {
// element.addEventListener('click', function (event){
// event.stopPropagation();
// console.log ('Inner div clicked!');
// });
// })
// close Add Tasks when Task Grid is clicked
taskAll.onclick = function () {
  if (addOpen) {
    addPage.classList.remove('open');
    addBtn.classList.remove('open');
    uploadBtn.classList.remove('open');
    addOpen = false;
  }
};
let addOpen = false;
// Event Listener: Open Add Page
addBtn.addEventListener('click', () => {
  if (!addOpen) {
    addPage.classList.add('open');
    addBtn.classList.add('open');
    uploadBtn.classList.add('open');
    addOpen = true;
  }
});
// Event Listener: Close Add Page
closeBtn.addEventListener('click', () => {
  if (addOpen) {
    addPage.classList.remove('open');
    addBtn.classList.remove('open');
    uploadBtn.classList.remove('open');
    addOpen = false;
  }
});
// Event Listener: Upload Tasks
uploadBtn.addEventListener("click", function (event) {
  if (addOpen) {
    event.preventDefault();
    let td = taskDescription.value;
    let dd = String(dueDate.value);
    let ct = String(completionTime.value);
    let pr = priorityRating.options[priorityRating.selectedIndex].value;
    let prIndex = priorityRating.options[priorityRating.selectedIndex].index;
    let et = estimatedTime.value;
    let cs = false;
    let label = {
      name: labelName.value,
      colour: labelColour.value
    };
    addTask(td, dd, ct, pr, prIndex, et, cs, label);
    console.log(taskList);
  }
});
// var taskList = [];
// localStorage.setItem('tasks', JSON.stringify(taskList));
// Object.keys(localStorage).forEach(function (key) {
// let task = localStorage.getItem(key);
// let taskObj = JSON.parse(task);
// showTask(taskObj);
// });
// Object.keys(localStorage).forEach(function (key) {
// let task = localStorage.getItem(key);
// let taskObj = JSON.parse(task);
// showTask(taskObj);
// });
// Task Storage
const taskStorage = new _taskStorageJsDefault.default();
const taskList = taskStorage.tasks;
// Label Storage
const labelStorage = new _labelStorageJsDefault.default();
const labelList = labelStorage.labels;
taskList.forEach(element => {
  showTask(element);
});
const labelDropdown = document.getElementById('taskLabelDropdown');
function updateLabelDropdown() {
  labelList.forEach(element => {
    let labelSelect = document.createElement('li');
    let labelBtn = document.createElement('button');
    labelBtn.classList.add('btn');
    labelBtn.classList.add('nav_btn');
    labelBtn.classList.add('dropdown-item');
    labelBtn.classList.add('label_btns');
    labelBtn.innerHTML = element.name.toString();
    // add Delete Button for Labels
    let delButton = document.createElement("button");
    delButton.setAttribute('class', "btn-close");
    delButton.classList.add('deleteBtn');
    delButton.addEventListener("click", function (event) {
      event.preventDefault();
      if (confirm('Are you sure you want to delete this label from task labels?')) {
        labelStorage.delete(element);
        labelSelect.remove();
      }
      if (labelList.length > 0) {
        document.getElementById('noLabels').style.display = "none";
      } else {
        document.getElementById('noLabels').style.display = "block";
      }
    });
    labelSelect.appendChild(labelBtn);
    labelSelect.appendChild(delButton);
    labelDropdown.appendChild(labelSelect);
  });
}
updateLabelDropdown();
function addTask(taskDescription, dueDate, completionTime, priorityRating, priorityRatingIndex, estimatedTime, completionStatus, label) {
  let task = {
    id: Date.now(),
    taskDescription,
    dueDate,
    completionTime,
    priorityRating,
    priorityRatingIndex,
    estimatedTime,
    completionStatus,
    label
  };
  if (document.forms["taskForm"]["taskName"].value == "") {
    alert("Task Description must be filled out");
    return false;
  } else {
    let key = task.taskDescription.toString();
    // let value = JSON.stringify(task);
    // if (localStorage.getItem(key) === null) {
    // localStorage.setItem(key, value);
    // showTask(task);
    if (taskStorage.getIndexByName(key) === -1) {
      taskStorage.create(task, key);
      showTask(task);
    } else {
      alert("Task " + key + " is already exists in the list");
    }
  }
  updateLabelDropdown();
  if (labelList.length > 0) {
    document.getElementById('noLabels').style.display = "none";
  }
  closeBtn.click();
}
function updateEmpty() {
  if (taskList.length > 0) {
    document.getElementById('emptyTaskList').style.display = 'none';
  } else {
    document.getElementById('emptyTaskList').style.display = 'block';
  }
}
// Add created labels in LabelStorage to dropdown list
// Event Listener for label buttons in dropdown list
const labelBtns = document.querySelectorAll(".label_btns");
for (let i = 0; i < labelBtns.length; i++) {
  labelBtns[i].addEventListener('click', function (e) {
    let labelTitle = e.currentTarget.innerHTML;
    console.log(labelTitle.toString());
    document.getElementById("newLabelInput").value = labelTitle.toString();
    let colour = labelStorage.getColour(labelTitle.toString());
    document.getElementById("labelColourInput").value = colour;
  });
}
// function updateLabel(label) {
// let labelSelect = document.createElement('li');
// let labelBtn = document.createElement('button');
// labelBtn.classList.add('btn');
// labelBtn.classList.add('nav_btn');
// labelBtn.classList.add('dropdown-item');
// labelBtn.innerHTML = label.name.toString();
// labelSelect.appendChild(labelBtn);
// labelDropdown.appendChild(labelSelect);
// }
// Kanban Storage
const kanbanStorage = new _kanbanStorageJsDefault.default();
const kanbanColumns = kanbanStorage.columns;
function showTask(task) {
  updateEmpty();
  let item = document.createElement("div");
  item.setAttribute('class', 'card');
  item.classList.add('task_item');
  item.setAttribute('data-id', task.id);
  let item_body = document.createElement('div');
  item_body.setAttribute('class', 'card-body');
  let item_top = document.createElement("div");
  item_top.classList.add('item_top');
  let item_title = document.createElement("h5");
  item_title.setAttribute('class', 'card-title');
  item_title.appendChild(document.createTextNode(task.taskDescription));
  // Create a checkbox that moves the task to the Kanban "Done" column
  let doneBtn = document.createElement('button');
  doneBtn.innerHTML = "<i class='fas fa-check fa-xs'></i>";
  doneBtn.setAttribute('type', 'button');
  doneBtn.classList.add('btn');
  doneBtn.classList.add('btn-outline-success');
  doneBtn.classList.add('checkBtn');
  doneBtn.addEventListener('click', () => {
    let element = {
      id: task.taskDescription,
      title: task.taskDescription + "<button type='button' class='btn btn-outline-danger btn-sm kanbanItemBtn' id=" + task.taskDescription + "><i class='fas fa-trash-alt'></i></button>"
    };
    kanbanBoard.addElement("done", element);
    // kanbanStorage.addItem("done", element);
    document.querySelectorAll('.kanbanItemBtn').forEach(button => {
      button.addEventListener("click", () => {
        kanbanBoard.removeElement(button.id);
      });
    });
  });
  item_top.appendChild(doneBtn);
  item_top.appendChild(item_title);
  item_body.appendChild(item_top);
  // Add details only when they exist
  if (task.hasOwnProperty('label') && task['label']) {
    // let lb = document.createElement("div");
    // lb.setAttribute('class', 'task_details');
    // lb.innerHTML = '<i class="fas fa-tag"></i>';
    // if (labelStorage.getIndex(task.label) !== -1) {
    // alert("Choose another label")
    // } else {
    if (task.label.name !== "") {
      labelStorage.create(task.label, task.label.name, task.label.colour);
      let labelName = task.label.name;
      let labelNameString = labelName.toString();
      let item_tag = document.createElement('span');
      item_tag.setAttribute('class', 'badge');
      item_tag.setAttribute('id', labelNameString);
      item_tag.appendChild(document.createTextNode(labelName));
      item_tag.style.backgroundColor = task.label.colour;
      item_body.appendChild(item_tag);
    }
  }
  if (task.hasOwnProperty('dueDate') && task['dueDate']) {
    let dd = document.createElement("div");
    dd.setAttribute('class', 'task_details');
    dd.innerHTML = '<i class="far fa-calendar"></i>';
    let item_dd = document.createElement("p");
    item_dd.setAttribute('class', 'card-text');
    item_dd.appendChild(document.createTextNode(task.dueDate));
    dd.appendChild(item_dd);
    item_body.appendChild(dd);
  }
  if (task.hasOwnProperty('priorityRating') && task['priorityRating']) {
    let pr = document.createElement("div");
    pr.setAttribute('class', 'task_details');
    if (task['priorityRating'] == "Low") {
      pr.classList.add("low_pr");
    } else if (task['priorityRating']) {
      pr.classList.add("medium_pr");
    } else if (task['priorityRating']) {
      pr.classList.add("high_pr");
    }
    pr.innerHTML = '<i class="fas fa-flag"></i>';
    let item_pr = document.createElement("p");
    item_pr.setAttribute('class', 'card-text');
    // item_pr.innerHTML('<i class="fas fa-flag"></i>');
    item_pr.appendChild(document.createTextNode(task.priorityRating));
    pr.appendChild(item_pr);
    item_body.appendChild(pr);
  }
  // add estimated time input when theres an input value
  // let etInput = document.forms["taskForm"]["estimatedTime"].value;
  // if (etInput !== "") {
  // let et = document.createElement("div");
  // et.setAttribute('class', 'task_details');
  // et.innerHTML = '<i class="far fa-clock"></i>';
  // let item_et = document.createElement("p");
  // item_et.setAttribute('class', 'card-text');
  // item_et.appendChild(document.createTextNode(task.estimatedTime + " hours"));
  // et.appendChild(item_et);
  // item_body.appendChild(et);
  // }
  if (task.hasOwnProperty('estimatedTime') && task['estimatedTime']) {
    let et = document.createElement("div");
    et.setAttribute('class', 'task_details');
    et.innerHTML = '<i class="far fa-clock"></i>';
    let item_et = document.createElement("p");
    item_et.setAttribute('class', 'card-text');
    item_et.appendChild(document.createTextNode(task.estimatedTime + " hours"));
    et.appendChild(item_et);
    item_body.appendChild(et);
  }
  item.appendChild(item_body);
  let buttons = document.createElement("div");
  buttons.classList.add("btn-group");
  buttons.classList.add("btn-group-sm");
  buttons.classList.add("task_buttons");
  buttons.setAttribute("role", "group");
  // add Delete Button
  let delButton = document.createElement("button");
  let delButtonText = document.createTextNode("Delete");
  delButton.appendChild(delButtonText);
  delButton.setAttribute('class', "btn btn-outline-danger");
  delButton.classList.add('deleteBtn');
  delButton.addEventListener("click", function (event) {
    event.preventDefault();
    // let id = event.target.parentElement.getAttribute('data-id');
    // let index = taskList.findIndex(task => task.id === Number(id));
    // removeItemFromArray(taskList, index);
    // console.log(taskList);
    if (confirm('Are you sure you want to delete this task from task list?')) {
      // localStorage.removeItem(task.taskDescription.toString());
      taskStorage.delete(task.taskDescription.toString());
      item.remove();
      updateEmpty();
    }
  });
  // Create "Move to Kanban" Button
  let toDoButton = document.createElement("button");
  let toDoButtonText = document.createTextNode("To Do");
  toDoButton.appendChild(toDoButtonText);
  toDoButton.setAttribute('class', "btn btn-outline-primary");
  toDoButton.classList.add("moveBtn");
  toDoButton.addEventListener("click", function (event) {
    event.preventDefault();
    let element = {
      id: task.taskDescription,
      title: task.taskDescription + "<button type='button' class='btn btn-outline-danger btn-sm kanbanItemBtn' id=" + task.taskDescription + "><i class='fas fa-trash-alt'></i></button>"
    };
    kanbanBoard.addElement("toDo", element);
    document.querySelectorAll('.kanbanItemBtn').forEach(button => {
      button.addEventListener("click", () => {
        kanbanBoard.removeElement(button.id);
      });
    });
  });
  buttons.appendChild(toDoButton);
  buttons.appendChild(delButton);
  item.appendChild(buttons);
  tasks.appendChild(item);
  form.reset();
}
// Helper functions
function compareDueDate(a, b) {
  if (a.dueDate < b.dueDate) {
    return -1;
  } else if (a.dueDate > b.dueDate) {
    return 1;
  } else {
    return 0;
  }
}
function comparePriority(a, b) {
  if (a.priorityRatingIndex < b.priorityRatingIndex) {
    return -1;
  } else if (a.priorityRatingIndex > b.priorityRatingIndex) {
    return 1;
  } else {
    return 0;
  }
}
function compareEstimatedTime(a, b) {
  if (a.estimatedTime < b.estimatedTime) {
    return -1;
  } else if (a.estimatedTime > b.estimatedTime) {
    return 1;
  } else {
    return 0;
  }
}
function removeItemFromArray(arr, index) {
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}
// kanbanColumns.forEach((element) => {
// kanbanBoard.addBoards(columns);
// })
var columns = [{
  id: 'toDo',
  title: "To Do",
  item: []
}, {
  id: 'inProgress',
  title: "In Progress",
  item: []
}, {
  id: 'done',
  title: "Done",
  item: []
}];
// for (let i=0; i < columns.length; i++) {
// }
var kanbanBoard = new jKanban({
  element: '#myKanban',
  // selector of the kanban container
  // gutter           : '15px',                                       // gutter of the board
  // widthBoard       : '250px',                                      // width of the board
  responsivePercentage: true,
  // if it is true I use percentage in the width of the boards and it is not necessary gutter and widthBoard
  dragItems: true,
  // if false, all items are not draggable
  boards: columns,
  // json of boards
  dragBoards: true,
  // the boards are draggable, if false only item can be dragged
  itemAddOptions: {
    enabled: false,
    // add a button to board for easy item creation
    content: '+',
    // text or html content of the board button
    class: 'kanban-title-button btn btn-default btn-xs',
    // default class of the button
    footer: false
  },
  itemHandleOptions: {
    enabled: false,
    // if board item handle is enabled or not
    handleClass: "item_handle",
    // css class for your custom item handle
    customCssHandler: "drag_handler",
    // when customHandler is undefined, jKanban will use this property to set main handler class
    customCssIconHandler: "drag_handler_icon",
    // when customHandler is undefined, jKanban will use this property to set main icon handler class. If you want, you can use font icon libraries here
    customHandler: "<span class='item_handle'>+</span> %title% "
  },
  click: function (el) {},
  // callback when any board's item are clicked
  context: function (el, event) {},
  // callback when any board's item are right clicked
  dragEl: function (el, source) {},
  // callback when any board's item are dragged
  dragendEl: function (el) {},
  // callback when any board's item stop drag
  dropEl: function (el, target, source, sibling) {},
  // callback when any board's item drop in a board
  dragBoard: function (el, source) {},
  // callback when any board stop drag
  dragendBoard: function (el) {},
  // callback when any board stop drag
  buttonClick: function (el, boardId) {}
});

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y","./taskStorage.js":"3WapR","./labelStorage.js":"BKomJ","../libraries/jkanban.min.js":"3IAxf","./kanbanStorage.js":"3QfYK"}],"3WapR":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
class TaskStorage {
  constructor() {
    // if item by key `tasks` is not defined JSON.parse return null, so I use `or empty array`
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  }
  create(item, name) {
    item.name = name;
    let index = this.getIndexByName(name);
    if (index === -1) {
      this.tasks.push(item);
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    } else {
      console.log("Task already exist in the list");
    }
  }
  getIndexByName(name) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].name == name) {
        return i;
      }
    }
    return -1;
  }
  update(name) {
    let index = this.getIndexByName(name);
    if (index !== -1) {
      this.tasks[index] = item;
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    } else {
      console.log("Task doesn't exist in the list");
    }
  }
  delete(name) {
    let index = this.getIndexByName(name);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    } else {
      console.log("Task doesn't exist in the list");
    }
  }
}
exports.default = TaskStorage;

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"BKomJ":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
class LabelStorage {
  constructor() {
    // if item by key `tasks` is not defined JSON.parse return null, so I use `or empty array`
    this.labels = JSON.parse(localStorage.getItem('labels')) || [];
  }
  create(label, name, colour) {
    label.name = name;
    label.colour = colour;
    let index = this.getIndex(label);
    if (index === -1) {
      this.labels.push(label);
      localStorage.setItem('labels', JSON.stringify(this.labels));
    } else {
      console.log("Label already exist in the list");
    }
  }
  getIndex(label) {
    for (let i = 0; i < this.labels.length; i++) {
      if (this.labels[i].colour == label.colour) {
        return i;
      } else if (this.labels[i].name == label.name) {
        return i;
      }
    }
    return -1;
  }
  getColour(name) {
    for (let i = 0; i < this.labels.length; i++) {
      if (this.labels[i].name == name) {
        return this.labels[i].colour.toString();
      }
    }
    // return -1;
    console.log("cannot find the label: " + name.toString());
  }
  labelIsNew(label) {
    for (let i = 0; i < this.labels.length; i++) {
      if (this.labels[i].name == label.name) {
        alert("Label name already exists");
        return false;
      } else if (this.labels[i].colour == label.colour) {
        alert("Label colour already exists");
        return false;
      }
    }
    return true;
  }
  update(label) {
    let index = this.getIndex(label);
    if (index !== -1) {
      this.labels[index] = label;
      localStorage.setItem('labels', JSON.stringify(this.labels));
    } else {
      console.log("Label doesn't exist in the list");
    }
  }
  delete(label) {
    let index = this.getIndex(label);
    if (index !== -1) {
      this.labels.splice(index, 1);
      localStorage.setItem('labels', JSON.stringify(this.labels));
    } else {
      console.log("Label doesn't exist in the list");
    }
  }
}
exports.default = LabelStorage;

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"3IAxf":[function(require,module,exports) {
var global = arguments[3];
!(function () {
  return function e(t, n, o) {
    function i(a, c) {
      if (!n[a]) {
        if (!t[a]) {
          var d = "function" == typeof require && require;
          if (!c && d) return d(a, !0);
          if (r) return r(a, !0);
          var s = new Error("Cannot find module '" + a + "'");
          throw (s.code = "MODULE_NOT_FOUND", s);
        }
        var l = n[a] = {
          exports: {}
        };
        t[a][0].call(l.exports, function (e) {
          return i(t[a][1][e] || e);
        }, l, l.exports, e, t, n, o);
      }
      return n[a].exports;
    }
    for (var r = "function" == typeof require && require, a = 0; a < o.length; a++) i(o[a]);
    return i;
  };
})()({
  1: [function (e, t, n) {
    var o = e("dragula");
    !(function () {
      this.jKanban = function () {
        var e = this, t = {
          enabled: !1
        }, n = {
          enabled: !1
        };
        (this._disallowedItemProperties = ["id", "title", "click", "context", "drag", "dragend", "drop", "order"], this.element = "", this.container = "", this.boardContainer = [], this.handlers = [], this.dragula = o, this.drake = "", this.drakeBoard = "", this.itemAddOptions = n, this.itemHandleOptions = t);
        var i = {
          element: "",
          gutter: "15px",
          widthBoard: "250px",
          responsive: "700",
          responsivePercentage: !1,
          boards: [],
          dragBoards: !0,
          dragItems: !0,
          itemAddOptions: n,
          itemHandleOptions: t,
          dragEl: function (e, t) {},
          dragendEl: function (e) {},
          dropEl: function (e, t, n, o) {},
          dragBoard: function (e, t) {},
          dragendBoard: function (e) {},
          dropBoard: function (e, t, n, o) {},
          click: function (e) {},
          context: function (e, t) {},
          buttonClick: function (e, t) {}
        };
        function r(t, n) {
          t.addEventListener("click", function (t) {
            (t.preventDefault(), e.options.click(this), "function" == typeof this.clickfn && this.clickfn(this));
          });
        }
        function a(t, n) {
          t.addEventListener ? t.addEventListener("contextmenu", function (t) {
            (t.preventDefault(), e.options.context(this, t), "function" == typeof this.contextfn && this.contextfn(this, t));
          }, !1) : t.attachEvent("oncontextmenu", function () {
            (e.options.context(this), "function" == typeof this.contextfn && this.contextfn(this), window.event.returnValue = !1);
          });
        }
        function c(t, n) {
          t.addEventListener("click", function (t) {
            (t.preventDefault(), e.options.buttonClick(this, n));
          });
        }
        function d(t) {
          var n = [];
          return (e.options.boards.map(function (e) {
            if (e.id === t) return n.push(e);
          }), n[0]);
        }
        function s(t, n) {
          for (var o in n) e._disallowedItemProperties.indexOf(o) > -1 || t.setAttribute("data-" + o, n[o]);
        }
        function l(t) {
          var n = ("title" in t) ? t.title : "";
          if (e.options.itemHandleOptions.enabled) {
            if (void 0 !== (e.options.itemHandleOptions.customHandler || void 0)) return n = "<div> " + e.options.itemHandleOptions.customHandler.replace(/%([^%]+)%/g, (e, n) => void 0 !== t[n] ? t[n] : "") + " </div>";
            var o = e.options.itemHandleOptions.customCssHandler, i = e.options.itemHandleOptions.customCssIconHandler, r = e.options.itemHandleOptions.customItemLayout;
            (void 0 === (o || void 0) && (o = "drag_handler"), void 0 === (i || void 0) && (i = o + "_icon"), void 0 === (r || void 0) && (r = ""), n = "<div class='item_handle " + o + "'><i class='item_handle " + i + "'></i></div><div>" + n + "</div>");
          }
          return n;
        }
        (arguments[0] && "object" == typeof arguments[0] && (this.options = (function (e, t) {
          var n;
          for (n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
          return e;
        })(i, arguments[0])), this.__getCanMove = function (t) {
          return e.options.itemHandleOptions.enabled ? e.options.itemHandleOptions.handleClass ? t.classList.contains(e.options.itemHandleOptions.handleClass) : t.classList.contains("item_handle") : !!e.options.dragItems;
        }, this.init = function () {
          (!(function () {
            e.element = document.querySelector(e.options.element);
            var t = document.createElement("div");
            (t.classList.add("kanban-container"), e.container = t, document.querySelector(e.options.element).dataset.hasOwnProperty("board") ? (url = document.querySelector(e.options.element).dataset.board, window.fetch(url, {
              method: "GET",
              headers: {
                "Content-Type": "application/json"
              }
            }).then(t => {
              t.json().then(function (t) {
                (e.options.boards = t, e.addBoards(e.options.boards, !0));
              });
            }).catch(e => {
              console.log("Error: ", e);
            })) : e.addBoards(e.options.boards, !0));
            e.element.appendChild(e.container);
          })(), window.innerWidth > e.options.responsive && (e.drakeBoard = e.dragula([e.container], {
            moves: function (t, n, o, i) {
              return !!e.options.dragBoards && (o.classList.contains("kanban-board-header") || o.classList.contains("kanban-title-board"));
            },
            accepts: function (e, t, n, o) {
              return t.classList.contains("kanban-container");
            },
            revertOnSpill: !0,
            direction: "horizontal"
          }).on("drag", function (t, n) {
            (t.classList.add("is-moving"), e.options.dragBoard(t, n), "function" == typeof t.dragfn && t.dragfn(t, n));
          }).on("dragend", function (t) {
            (!(function () {
              for (var t = 1, n = 0; n < e.container.childNodes.length; n++) e.container.childNodes[n].dataset.order = t++;
            })(), t.classList.remove("is-moving"), e.options.dragendBoard(t), "function" == typeof t.dragendfn && t.dragendfn(t));
          }).on("drop", function (t, n, o, i) {
            (t.classList.remove("is-moving"), e.options.dropBoard(t, n, o, i), "function" == typeof t.dropfn && t.dropfn(t, n, o, i));
          }), e.drake = e.dragula(e.boardContainer, {
            moves: function (t, n, o, i) {
              return e.__getCanMove(o);
            },
            revertOnSpill: !0
          }).on("cancel", function (t, n, o) {
            e.enableAllBoards();
          }).on("drag", function (t, n) {
            var o = t.getAttribute("class");
            if ("" !== o && o.indexOf("not-draggable") > -1) e.drake.cancel(!0); else {
              (t.classList.add("is-moving"), e.options.dragEl(t, n));
              var i = d(n.parentNode.dataset.id);
              (void 0 !== i.dragTo && e.options.boards.map(function (t) {
                -1 === i.dragTo.indexOf(t.id) && t.id !== n.parentNode.dataset.id && e.findBoard(t.id).classList.add("disabled-board");
              }), null !== t && "function" == typeof t.dragfn && t.dragfn(t, n));
            }
          }).on("dragend", function (t) {
            (e.options.dragendEl(t), null !== t && "function" == typeof t.dragendfn && t.dragendfn(t));
          }).on("drop", function (t, n, o, i) {
            e.enableAllBoards();
            var r = d(o.parentNode.dataset.id);
            (void 0 !== r.dragTo && -1 === r.dragTo.indexOf(n.parentNode.dataset.id) && n.parentNode.dataset.id !== o.parentNode.dataset.id && e.drake.cancel(!0), null !== t) && (!1 === e.options.dropEl(t, n, o, i) && e.drake.cancel(!0), t.classList.remove("is-moving"), "function" == typeof t.dropfn && t.dropfn(t, n, o, i));
          })));
        }, this.enableAllBoards = function () {
          var e = document.querySelectorAll(".kanban-board");
          if (e.length > 0 && void 0 !== e) for (var t = 0; t < e.length; t++) e[t].classList.remove("disabled-board");
        }, this.addElement = function (t, n) {
          var o = e.element.querySelector('[data-id="' + t + '"] .kanban-drag'), i = document.createElement("div");
          return (i.classList.add("kanban-item"), void 0 !== n.id && "" !== n.id && i.setAttribute("data-eid", n.id), n.class && Array.isArray(n.class) && n.class.forEach(function (e) {
            i.classList.add(e);
          }), i.innerHTML = l(n), i.clickfn = n.click, i.contextfn = n.context, i.dragfn = n.drag, i.dragendfn = n.dragend, i.dropfn = n.drop, s(i, n), r(i), a(i), e.options.itemHandleOptions.enabled && (i.style.cursor = "default"), o.appendChild(i), e);
        }, this.addForm = function (t, n) {
          var o = e.element.querySelector('[data-id="' + t + '"] .kanban-drag'), i = n.getAttribute("class");
          return (n.setAttribute("class", i + " not-draggable"), o.appendChild(n), e);
        }, this.addBoards = function (t, n) {
          if (e.options.responsivePercentage) if ((e.container.style.width = "100%", e.options.gutter = "1%", window.innerWidth > e.options.responsive)) var o = (100 - 2 * t.length) / t.length; else o = 100 - 2 * t.length; else o = e.options.widthBoard;
          var i = e.options.itemAddOptions.enabled, d = e.options.itemAddOptions.content, u = e.options.itemAddOptions.class, f = e.options.itemAddOptions.footer;
          for (var p in t) {
            var v = t[p];
            (n || e.options.boards.push(v), e.options.responsivePercentage || ("" === e.container.style.width ? e.container.style.width = parseInt(o) + 2 * parseInt(e.options.gutter) + "px" : e.container.style.width = parseInt(e.container.style.width) + parseInt(o) + 2 * parseInt(e.options.gutter) + "px"));
            var m = document.createElement("div");
            (m.dataset.id = v.id, m.dataset.order = e.container.childNodes.length + 1, m.classList.add("kanban-board"), e.options.responsivePercentage ? m.style.width = o + "%" : m.style.width = o, m.style.marginLeft = e.options.gutter, m.style.marginRight = e.options.gutter);
            var h = document.createElement("header");
            if ("" !== v.class && void 0 !== v.class) var g = v.class.split(","); else g = [];
            (h.classList.add("kanban-board-header"), g.map(function (e) {
              (e = e.replace(/^[ ]+/g, ""), h.classList.add(e));
            }), h.innerHTML = '<div class="kanban-title-board">' + v.title + "</div>");
            var y = document.createElement("main");
            if ((y.classList.add("kanban-drag"), "" !== v.bodyClass && void 0 !== v.bodyClass)) var b = v.bodyClass.split(","); else b = [];
            for (var w in (b.map(function (e) {
              y.classList.add(e);
            }), e.boardContainer.push(y), v.item)) {
              var E = v.item[w], T = document.createElement("div");
              (T.classList.add("kanban-item"), E.id && (T.dataset.eid = E.id), E.class && Array.isArray(E.class) && E.class.forEach(function (e) {
                T.classList.add(e);
              }), T.innerHTML = l(E), T.clickfn = E.click, T.contextfn = E.context, T.dragfn = E.drag, T.dragendfn = E.dragend, T.dropfn = E.drop, s(T, E), r(T), a(T), e.options.itemHandleOptions.enabled && (T.style.cursor = "default"), y.appendChild(T));
            }
            var x = document.createElement("footer");
            if (i) {
              var C = document.createElement("BUTTON"), O = document.createTextNode(d || "+");
              (C.setAttribute("class", u || "kanban-title-button btn btn-default btn-xs"), C.appendChild(O), f ? x.appendChild(C) : h.appendChild(C), c(C, v.id));
            }
            (m.appendChild(h), m.appendChild(y), m.appendChild(x), e.container.appendChild(m));
          }
          return e;
        }, this.findBoard = function (t) {
          return e.element.querySelector('[data-id="' + t + '"]');
        }, this.getParentBoardID = function (t) {
          return ("string" == typeof t && (t = e.element.querySelector('[data-eid="' + t + '"]')), null === t ? null : t.parentNode.parentNode.dataset.id);
        }, this.moveElement = function (e, t, n) {
          if (e !== this.getParentBoardID(t)) return (this.removeElement(t), this.addElement(e, n));
        }, this.replaceElement = function (t, n) {
          var o = t;
          return ("string" == typeof o && (o = e.element.querySelector('[data-eid="' + t + '"]')), o.innerHTML = l(n), o.clickfn = n.click, o.contextfn = n.context, o.dragfn = n.drag, o.dragendfn = n.dragend, o.dropfn = n.drop, s(o, n), r(o), a(o), e);
        }, this.findElement = function (t) {
          return e.element.querySelector('[data-eid="' + t + '"]');
        }, this.getBoardElements = function (t) {
          return e.element.querySelector('[data-id="' + t + '"] .kanban-drag').childNodes;
        }, this.removeElement = function (t) {
          return ("string" == typeof t && (t = e.element.querySelector('[data-eid="' + t + '"]')), null !== t && ("function" == typeof t.remove ? t.remove() : t.parentNode.removeChild(t)), e);
        }, this.removeBoard = function (t) {
          var n = null;
          ("string" == typeof t && (n = e.element.querySelector('[data-id="' + t + '"]')), null !== n && ("function" == typeof n.remove ? n.remove() : n.parentNode.removeChild(n)));
          for (var o = 0; o < e.options.boards.length; o++) if (e.options.boards[o].id === t) {
            e.options.boards.splice(o, 1);
            break;
          }
          return e;
        }, this.onButtonClick = function (e) {}, this.init());
      };
    })();
  }, {
    dragula: 9
  }],
  2: [function (e, t, n) {
    t.exports = function (e, t) {
      return Array.prototype.slice.call(e, t);
    };
  }, {}],
  3: [function (e, t, n) {
    "use strict";
    var o = e("ticky");
    t.exports = function (e, t, n) {
      e && o(function () {
        e.apply(n || null, t || []);
      });
    };
  }, {
    ticky: 11
  }],
  4: [function (e, t, n) {
    "use strict";
    var o = e("atoa"), i = e("./debounce");
    t.exports = function (e, t) {
      var n = t || ({}), r = {};
      return (void 0 === e && (e = {}), e.on = function (t, n) {
        return (r[t] ? r[t].push(n) : r[t] = [n], e);
      }, e.once = function (t, n) {
        return (n._once = !0, e.on(t, n), e);
      }, e.off = function (t, n) {
        var o = arguments.length;
        if (1 === o) delete r[t]; else if (0 === o) r = {}; else {
          var i = r[t];
          if (!i) return e;
          i.splice(i.indexOf(n), 1);
        }
        return e;
      }, e.emit = function () {
        var t = o(arguments);
        return e.emitterSnapshot(t.shift()).apply(this, t);
      }, e.emitterSnapshot = function (t) {
        var a = (r[t] || []).slice(0);
        return function () {
          var r = o(arguments), c = this || e;
          if ("error" === t && !1 !== n.throws && !a.length) throw 1 === r.length ? r[0] : r;
          return (a.forEach(function (o) {
            (n.async ? i(o, r, c) : o.apply(c, r), o._once && e.off(t, o));
          }), e);
        };
      }, e);
    };
  }, {
    "./debounce": 3,
    atoa: 2
  }],
  5: [function (e, t, n) {
    (function (n) {
      (function () {
        "use strict";
        var o = e("custom-event"), i = e("./eventmap"), r = n.document, a = function (e, t, n, o) {
          return e.addEventListener(t, n, o);
        }, c = function (e, t, n, o) {
          return e.removeEventListener(t, n, o);
        }, d = [];
        function s(e, t, n) {
          var o = (function (e, t, n) {
            var o, i;
            for (o = 0; o < d.length; o++) if ((i = d[o]).element === e && i.type === t && i.fn === n) return o;
          })(e, t, n);
          if (o) {
            var i = d[o].wrapper;
            return (d.splice(o, 1), i);
          }
        }
        (n.addEventListener || (a = function (e, t, o) {
          return e.attachEvent("on" + t, (function (e, t, o) {
            var i = s(e, t, o) || (function (e, t, o) {
              return function (t) {
                var i = t || n.event;
                (i.target = i.target || i.srcElement, i.preventDefault = i.preventDefault || (function () {
                  i.returnValue = !1;
                }), i.stopPropagation = i.stopPropagation || (function () {
                  i.cancelBubble = !0;
                }), i.which = i.which || i.keyCode, o.call(e, i));
              };
            })(e, 0, o);
            return (d.push({
              wrapper: i,
              element: e,
              type: t,
              fn: o
            }), i);
          })(e, t, o));
        }, c = function (e, t, n) {
          var o = s(e, t, n);
          if (o) return e.detachEvent("on" + t, o);
        }), t.exports = {
          add: a,
          remove: c,
          fabricate: function (e, t, n) {
            var a = -1 === i.indexOf(t) ? new o(t, {
              detail: n
            }) : (function () {
              var e;
              r.createEvent ? (e = r.createEvent("Event")).initEvent(t, !0, !0) : r.createEventObject && (e = r.createEventObject());
              return e;
            })();
            e.dispatchEvent ? e.dispatchEvent(a) : e.fireEvent("on" + t, a);
          }
        });
      }).call(this);
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
  }, {
    "./eventmap": 6,
    "custom-event": 7
  }],
  6: [function (e, t, n) {
    (function (e) {
      (function () {
        "use strict";
        var n = [], o = "", i = /^on/;
        for (o in e) i.test(o) && n.push(o.slice(2));
        t.exports = n;
      }).call(this);
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
  }, {}],
  7: [function (e, t, n) {
    (function (e) {
      (function () {
        var n = e.CustomEvent;
        t.exports = (function () {
          try {
            var e = new n("cat", {
              detail: {
                foo: "bar"
              }
            });
            return "cat" === e.type && "bar" === e.detail.foo;
          } catch (e) {}
          return !1;
        })() ? n : "undefined" != typeof document && "function" == typeof document.createEvent ? function (e, t) {
          var n = document.createEvent("CustomEvent");
          return (t ? n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail) : n.initCustomEvent(e, !1, !1, void 0), n);
        } : function (e, t) {
          var n = document.createEventObject();
          return (n.type = e, t ? (n.bubbles = Boolean(t.bubbles), n.cancelable = Boolean(t.cancelable), n.detail = t.detail) : (n.bubbles = !1, n.cancelable = !1, n.detail = void 0), n);
        };
      }).call(this);
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
  }, {}],
  8: [function (e, t, n) {
    "use strict";
    var o = {}, i = "(?:^|\\s)", r = "(?:\\s|$)";
    function a(e) {
      var t = o[e];
      return (t ? t.lastIndex = 0 : o[e] = t = new RegExp(i + e + r, "g"), t);
    }
    t.exports = {
      add: function (e, t) {
        var n = e.className;
        n.length ? a(t).test(n) || (e.className += " " + t) : e.className = t;
      },
      rm: function (e, t) {
        e.className = e.className.replace(a(t), " ").trim();
      }
    };
  }, {}],
  9: [function (e, t, n) {
    (function (n) {
      (function () {
        "use strict";
        var o = e("contra/emitter"), i = e("crossvent"), r = e("./classes"), a = document, c = a.documentElement;
        function d(e, t, o, r) {
          n.navigator.pointerEnabled ? i[t](e, ({
            mouseup: "pointerup",
            mousedown: "pointerdown",
            mousemove: "pointermove"
          })[o], r) : n.navigator.msPointerEnabled ? i[t](e, ({
            mouseup: "MSPointerUp",
            mousedown: "MSPointerDown",
            mousemove: "MSPointerMove"
          })[o], r) : (i[t](e, ({
            mouseup: "touchend",
            mousedown: "touchstart",
            mousemove: "touchmove"
          })[o], r), i[t](e, o, r));
        }
        function s(e) {
          if (void 0 !== e.touches) return e.touches.length;
          if (void 0 !== e.which && 0 !== e.which) return e.which;
          if (void 0 !== e.buttons) return e.buttons;
          var t = e.button;
          return void 0 !== t ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : void 0;
        }
        function l(e, t) {
          return void 0 !== n[t] ? n[t] : c.clientHeight ? c[e] : a.body[e];
        }
        function u(e, t, n) {
          var o, i = (e = e || ({})).className || "";
          return (e.className += " gu-hide", o = a.elementFromPoint(t, n), e.className = i, o);
        }
        function f() {
          return !1;
        }
        function p() {
          return !0;
        }
        function v(e) {
          return e.width || e.right - e.left;
        }
        function m(e) {
          return e.height || e.bottom - e.top;
        }
        function h(e) {
          return e.parentNode === a ? null : e.parentNode;
        }
        function g(e) {
          return "INPUT" === e.tagName || "TEXTAREA" === e.tagName || "SELECT" === e.tagName || (function e(t) {
            if (!t) return !1;
            if ("false" === t.contentEditable) return !1;
            if ("true" === t.contentEditable) return !0;
            return e(h(t));
          })(e);
        }
        function y(e) {
          return e.nextElementSibling || (function () {
            var t = e;
            do {
              t = t.nextSibling;
            } while (t && 1 !== t.nodeType);
            return t;
          })();
        }
        function b(e, t) {
          var n = (function (e) {
            return e.targetTouches && e.targetTouches.length ? e.targetTouches[0] : e.changedTouches && e.changedTouches.length ? e.changedTouches[0] : e;
          })(t), o = {
            pageX: "clientX",
            pageY: "clientY"
          };
          return ((e in o) && !((e in n)) && (o[e] in n) && (e = o[e]), n[e]);
        }
        t.exports = function (e, t) {
          var n, w, E, T, x, C, O, k, S, L, B;
          1 === arguments.length && !1 === Array.isArray(e) && (t = e, e = []);
          var N, I = null, A = t || ({});
          (void 0 === A.moves && (A.moves = p), void 0 === A.accepts && (A.accepts = p), void 0 === A.invalid && (A.invalid = function () {
            return !1;
          }), void 0 === A.containers && (A.containers = e || []), void 0 === A.isContainer && (A.isContainer = f), void 0 === A.copy && (A.copy = !1), void 0 === A.copySortSource && (A.copySortSource = !1), void 0 === A.revertOnSpill && (A.revertOnSpill = !1), void 0 === A.removeOnSpill && (A.removeOnSpill = !1), void 0 === A.direction && (A.direction = "vertical"), void 0 === A.ignoreInputTextSelection && (A.ignoreInputTextSelection = !0), void 0 === A.mirrorContainer && (A.mirrorContainer = a.body));
          var _ = o({
            containers: A.containers,
            start: function (e) {
              var t = j(e);
              t && F(t);
            },
            end: R,
            cancel: W,
            remove: V,
            destroy: function () {
              (P(!0), K({}));
            },
            canMove: function (e) {
              return !!j(e);
            },
            dragging: !1
          });
          return (!0 === A.removeOnSpill && _.on("over", function (e) {
            r.rm(e, "gu-hide");
          }).on("out", function (e) {
            _.dragging && r.add(e, "gu-hide");
          }), P(), _);
          function H(e) {
            return -1 !== _.containers.indexOf(e) || A.isContainer(e);
          }
          function P(e) {
            var t = e ? "remove" : "add";
            (d(c, t, "mousedown", X), d(c, t, "mouseup", K));
          }
          function q(e) {
            d(c, e ? "remove" : "add", "mousemove", Y);
          }
          function M(e) {
            var t = e ? "remove" : "add";
            (i[t](c, "selectstart", D), i[t](c, "click", D));
          }
          function D(e) {
            N && e.preventDefault();
          }
          function X(e) {
            if ((C = e.clientX, O = e.clientY, 1 === s(e) && !e.metaKey && !e.ctrlKey)) {
              var t = e.target, n = j(t);
              n && (N = n, q(), "mousedown" === e.type && (g(t) ? t.focus() : e.preventDefault()));
            }
          }
          function Y(e) {
            if (N) if (0 !== s(e)) {
              if (!(void 0 !== e.clientX && Math.abs(e.clientX - C) <= (A.slideFactorX || 0) && void 0 !== e.clientY && Math.abs(e.clientY - O) <= (A.slideFactorY || 0))) {
                if (A.ignoreInputTextSelection) {
                  var t = b("clientX", e) || 0, o = b("clientY", e) || 0;
                  if (g(a.elementFromPoint(t, o))) return;
                }
                var i = N;
                (q(!0), M(), R(), F(i));
                var u, f = {
                  left: (u = E.getBoundingClientRect()).left + l("scrollLeft", "pageXOffset"),
                  top: u.top + l("scrollTop", "pageYOffset")
                };
                (T = b("pageX", e) - f.left, x = b("pageY", e) - f.top, r.add(L || E, "gu-transit"), (function () {
                  if (!n) {
                    var e = E.getBoundingClientRect();
                    ((n = E.cloneNode(!0)).style.width = v(e) + "px", n.style.height = m(e) + "px", r.rm(n, "gu-transit"), r.add(n, "gu-mirror"), A.mirrorContainer.appendChild(n), d(c, "add", "mousemove", Q), r.add(A.mirrorContainer, "gu-unselectable"), _.emit("cloned", n, E, "mirror"));
                  }
                })(), Q(e));
              }
            } else K({});
          }
          function j(e) {
            if (!(_.dragging && n || H(e))) {
              for (var t = e; h(e) && !1 === H(h(e)); ) {
                if (A.invalid(e, t)) return;
                if (!(e = h(e))) return;
              }
              var o = h(e);
              if (o && !A.invalid(e, t) && A.moves(e, o, t, y(e))) return {
                item: e,
                source: o
              };
            }
          }
          function F(e) {
            var t, n;
            (t = e.item, n = e.source, ("boolean" == typeof A.copy ? A.copy : A.copy(t, n)) && (L = e.item.cloneNode(!0), _.emit("cloned", L, e.item, "copy")), w = e.source, E = e.item, k = S = y(e.item), _.dragging = !0, _.emit("drag", E, w));
          }
          function R() {
            if (_.dragging) {
              var e = L || E;
              z(e, h(e));
            }
          }
          function U() {
            (N = !1, q(!0), M(!0));
          }
          function K(e) {
            if ((U(), _.dragging)) {
              var t = L || E, o = b("clientX", e) || 0, i = b("clientY", e) || 0, r = J(u(n, o, i), o, i);
              r && (L && A.copySortSource || !L || r !== w) ? z(t, r) : A.removeOnSpill ? V() : W();
            }
          }
          function z(e, t) {
            var n = h(e);
            (L && A.copySortSource && t === w && n.removeChild(E), $(t) ? _.emit("cancel", e, w, w) : _.emit("drop", e, t, w, S), G());
          }
          function V() {
            if (_.dragging) {
              var e = L || E, t = h(e);
              (t && t.removeChild(e), _.emit(L ? "cancel" : "remove", e, t, w), G());
            }
          }
          function W(e) {
            if (_.dragging) {
              var t = arguments.length > 0 ? e : A.revertOnSpill, n = L || E, o = h(n), i = $(o);
              (!1 === i && t && (L ? o && o.removeChild(L) : w.insertBefore(n, k)), i || t ? _.emit("cancel", n, w, w) : _.emit("drop", n, o, w, S), G());
            }
          }
          function G() {
            var e = L || E;
            (U(), n && (r.rm(A.mirrorContainer, "gu-unselectable"), d(c, "remove", "mousemove", Q), h(n).removeChild(n), n = null), e && r.rm(e, "gu-transit"), B && clearTimeout(B), _.dragging = !1, I && _.emit("out", e, I, w), _.emit("dragend", e), w = E = L = k = S = B = I = null);
          }
          function $(e, t) {
            var o;
            return (o = void 0 !== t ? t : n ? S : y(L || E), e === w && o === k);
          }
          function J(e, t, n) {
            for (var o = e; o && !i(); ) o = h(o);
            return o;
            function i() {
              if (!1 === H(o)) return !1;
              var i = Z(o, e), r = ee(o, i, t, n);
              return !!$(o, r) || A.accepts(E, o, w, r);
            }
          }
          function Q(e) {
            if (n) {
              e.preventDefault();
              var t = b("clientX", e) || 0, o = b("clientY", e) || 0, i = t - T, r = o - x;
              (n.style.left = i + "px", n.style.top = r + "px");
              var a = L || E, c = u(n, t, o), d = J(c, t, o), s = null !== d && d !== I;
              (s || null === d) && (I && v("out"), I = d, s && v("over"));
              var l = h(a);
              if (d !== w || !L || A.copySortSource) {
                var f, p = Z(d, c);
                if (null !== p) f = ee(d, p, t, o); else {
                  if (!0 !== A.revertOnSpill || L) return void (L && l && l.removeChild(a));
                  (f = k, d = w);
                }
                (null === f && s || f !== a && f !== y(a)) && (S = f, d.insertBefore(a, f), _.emit("shadow", a, d, w));
              } else l && l.removeChild(a);
            }
            function v(e) {
              _.emit(e, a, I, w);
            }
          }
          function Z(e, t) {
            for (var n = t; n !== e && h(n) !== e; ) n = h(n);
            return n === c ? null : n;
          }
          function ee(e, t, n, o) {
            var i, r = "horizontal" === A.direction;
            return t !== e ? (i = t.getBoundingClientRect(), a(r ? n > i.left + v(i) / 2 : o > i.top + m(i) / 2)) : (function () {
              var t, i, a, c = e.children.length;
              for (t = 0; t < c; t++) {
                if ((i = e.children[t], a = i.getBoundingClientRect(), r && a.left + a.width / 2 > n)) return i;
                if (!r && a.top + a.height / 2 > o) return i;
              }
              return null;
            })();
            function a(e) {
              return e ? y(t) : t;
            }
          }
        };
      }).call(this);
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
  }, {
    "./classes": 8,
    "contra/emitter": 4,
    crossvent: 5
  }],
  10: [function (e, t, n) {
    var o, i, r = t.exports = {};
    function a() {
      throw new Error("setTimeout has not been defined");
    }
    function c() {
      throw new Error("clearTimeout has not been defined");
    }
    function d(e) {
      if (o === setTimeout) return setTimeout(e, 0);
      if ((o === a || !o) && setTimeout) return (o = setTimeout, setTimeout(e, 0));
      try {
        return o(e, 0);
      } catch (t) {
        try {
          return o.call(null, e, 0);
        } catch (t) {
          return o.call(this, e, 0);
        }
      }
    }
    !(function () {
      try {
        o = "function" == typeof setTimeout ? setTimeout : a;
      } catch (e) {
        o = a;
      }
      try {
        i = "function" == typeof clearTimeout ? clearTimeout : c;
      } catch (e) {
        i = c;
      }
    })();
    var s, l = [], u = !1, f = -1;
    function p() {
      u && s && (u = !1, s.length ? l = s.concat(l) : f = -1, l.length && v());
    }
    function v() {
      if (!u) {
        var e = d(p);
        u = !0;
        for (var t = l.length; t; ) {
          for ((s = l, l = []); ++f < t; ) s && s[f].run();
          (f = -1, t = l.length);
        }
        (s = null, u = !1, (function (e) {
          if (i === clearTimeout) return clearTimeout(e);
          if ((i === c || !i) && clearTimeout) return (i = clearTimeout, clearTimeout(e));
          try {
            i(e);
          } catch (t) {
            try {
              return i.call(null, e);
            } catch (t) {
              return i.call(this, e);
            }
          }
        })(e));
      }
    }
    function m(e, t) {
      (this.fun = e, this.array = t);
    }
    function h() {}
    (r.nextTick = function (e) {
      var t = new Array(arguments.length - 1);
      if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
      (l.push(new m(e, t)), 1 !== l.length || u || d(v));
    }, m.prototype.run = function () {
      this.fun.apply(null, this.array);
    }, r.title = "browser", r.browser = !0, r.env = {}, r.argv = [], r.version = "", r.versions = {}, r.on = h, r.addListener = h, r.once = h, r.off = h, r.removeListener = h, r.removeAllListeners = h, r.emit = h, r.prependListener = h, r.prependOnceListener = h, r.listeners = function (e) {
      return [];
    }, r.binding = function (e) {
      throw new Error("process.binding is not supported");
    }, r.cwd = function () {
      return "/";
    }, r.chdir = function (e) {
      throw new Error("process.chdir is not supported");
    }, r.umask = function () {
      return 0;
    });
  }, {}],
  11: [function (e, t, n) {
    (function (e) {
      (function () {
        var n;
        (n = "function" == typeof e ? function (t) {
          e(t);
        } : function (e) {
          setTimeout(e, 0);
        }, t.exports = n);
      }).call(this);
    }).call(this, e("timers").setImmediate);
  }, {
    timers: 12
  }],
  12: [function (e, t, n) {
    (function (t, o) {
      (function () {
        var i = e("process/browser.js").nextTick, r = Function.prototype.apply, a = Array.prototype.slice, c = {}, d = 0;
        function s(e, t) {
          (this._id = e, this._clearFn = t);
        }
        (n.setTimeout = function () {
          return new s(r.call(setTimeout, window, arguments), clearTimeout);
        }, n.setInterval = function () {
          return new s(r.call(setInterval, window, arguments), clearInterval);
        }, n.clearTimeout = n.clearInterval = function (e) {
          e.close();
        }, s.prototype.unref = s.prototype.ref = function () {}, s.prototype.close = function () {
          this._clearFn.call(window, this._id);
        }, n.enroll = function (e, t) {
          (clearTimeout(e._idleTimeoutId), e._idleTimeout = t);
        }, n.unenroll = function (e) {
          (clearTimeout(e._idleTimeoutId), e._idleTimeout = -1);
        }, n._unrefActive = n.active = function (e) {
          clearTimeout(e._idleTimeoutId);
          var t = e._idleTimeout;
          t >= 0 && (e._idleTimeoutId = setTimeout(function () {
            e._onTimeout && e._onTimeout();
          }, t));
        }, n.setImmediate = "function" == typeof t ? t : function (e) {
          var t = d++, o = !(arguments.length < 2) && a.call(arguments, 1);
          return (c[t] = !0, i(function () {
            c[t] && (o ? e.apply(null, o) : e.call(null), n.clearImmediate(t));
          }), t);
        }, n.clearImmediate = "function" == typeof o ? o : function (e) {
          delete c[e];
        });
      }).call(this);
    }).call(this, e("timers").setImmediate, e("timers").clearImmediate);
  }, {
    "process/browser.js": 10,
    timers: 12
  }]
}, {}, [1]);

},{}],"3QfYK":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
class KanbanStorage {
  constructor() {
    // if item by key `tasks` is not defined JSON.parse return null, so I use `or empty array`
    this.columns = JSON.parse(localStorage.getItem('kanban')) || [];
  }
  updateColumn(column) {
    let index = this.getIndex(column);
    if (index !== -1) {
      this.columns[index] = column;
      localStorage.setItem('kanban', JSON.stringify(this.columns));
    } else {
      console.log("Column doesn't exist in the list");
    }
  }
  getColumnIndex(column) {
    for (let i = 0; i < this.columns.length; i++) {
      if (this.columns[i].id == column.id) {
        return i;
      }
    }
    return -1;
  }
  getItemIndex(item, column) {
    let columnIndex = this.getColumnIndex(column);
    if (columnIndex === -1) {
      console.log("column doesn't exist");
    } else {
      for (let i = 0; i < this.columns[columnIndex].length; i++) {
        if (this.columns[columnIndex][i].id == item.id) {
          return i;
        }
      }
      return -1;
    }
  }
  addItem(item, column) {
    let columnIndex = this.getColumnIndex(column);
    let itemIndex = this.getItemIndex(item, column);
    if (itemIndex !== -1 && columnIndex !== -1) {
      this.columns[columnIndex].push(item);
      this.updateColumn(column);
    } else {
      console.log("Column doesn't exist or item already exists");
    }
  }
  removeItem(item) {
    // let columnIndex = this.getColumnIndex(column);
    // let itemIndex = this.getItemIndex(item, column);
    // if (itemIndex !== -1 && columnIndex !== -1) {
    // this.columns[columnIndex].remove(item);
    // this.updateColumn(column);
    // } else {
    // console.log("Column doesn't exist or item doesn't exists");
    // }
    for (let i = 0; i < this.columns.length; i++) {
      if (this.getItemIndex()) {
        return i;
      }
    }
    return -1;
  }
  addColumn(column) {
    let index = this.getIndex(column);
    if (index === -1) {
      this.columns.push(column);
      localStorage.setItem('kanban', JSON.stringify(this.columns));
    } else {
      console.log("Column already exist in the list");
    }
  }
  deleteColumn(column) {
    let index = this.getIndex(column);
    if (index !== -1) {
      this.columns.splice(index, 1);
      localStorage.setItem('kanban', JSON.stringify(this.columns));
    } else {
      console.log("Column doesn't exist in the list");
    }
  }
}
exports.default = KanbanStorage;

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"1ujtl":[function(require,module,exports) {
require('../libraries/easytimer.js/dist/easytimer.min.js');
// MIT License
// Copyright (c) 2018 Albert González
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
$(document).ready(function () {
  $('input[id="tabP"]').click(function () {
    timerP.classList.add("active");
    timerS.classList.remove('active');
  });
  $('input[id="tabS"]').click(function () {
    timerP.classList.remove("active");
    timerS.classList.add('active');
  });
});
const tabP = document.getElementById('tabP');
const tabS = document.getElementById('tabS');
const timerP = document.getElementById('timers_p');
const timerS = document.getElementById('timers_s');
const pomoStartBtn = document.getElementById("pomo-startBtn");
const pomoPauseBtn = document.getElementById("pomo-pauseBtn");
const pomoStopBtn = document.getElementById("pomo-stopBtn");
const pomoResetBtn = document.getElementById("pomo-resetBtn");
const swStartBtn = document.getElementById("sw-startBtn");
const swPauseBtn = document.getElementById("sw-pauseBtn");
const swStopBtn = document.getElementById("sw-stopBtn");
const swResetBtn = document.getElementById("sw-resetBtn");
const swLapBtn = document.getElementById("sw-lapBtn");
const lapList = document.getElementById("lapTimeList");
const pomodoroDisplay = document.getElementById("pomodoroTime");
const stopwatchDisplay = document.getElementById("stopwatchTime");
var {Timer} = require('../libraries/easytimer.js/dist/easytimer');
// Stopwatch
var stopWatch = new Timer();
$('#sw-startBtn').click(function () {
  stopWatch.start({
    precision: 'seconds'
  });
  swResetBtn.classList.remove("running");
  swLapBtn.classList.add("running");
  swStartBtn.classList.remove("running");
  swPauseBtn.classList.add("running");
});
$('#sw-pauseBtn').click(function () {
  stopWatch.pause();
  swResetBtn.classList.add("running");
  swLapBtn.classList.remove("running");
  swPauseBtn.classList.remove("running");
  swStartBtn.classList.add("running");
});
$('#sw-stopBtn').click(function () {
  stopWatch.stop();
  swResetBtn.classList.add("running");
  swLapBtn.classList.remove("running");
  swPauseBtn.classList.remove("running");
  swStartBtn.classList.add("running");
});
$('#sw-resetBtn').click(function () {
  stopWatch.reset();
  stopWatch.pause();
  swResetBtn.classList.add("running");
  swLapBtn.classList.remove("running");
  lapList.innerHTML = "";
  lapNum = 1;
});
var lapNum = 1;
$('#sw-lapBtn').click(function () {
  let time = stopWatch.getTimeValues().toString(['minutes', 'seconds']);
  let lap = document.createElement('li');
  lap.innerHTML = "Lap " + lapNum + " " + time;
  lapList.appendChild(lap);
  lapNum = lapNum + 1;
});
stopWatch.addEventListener('secondsUpdated', function (e) {
  $('#stopwatchTime').html(stopWatch.getTimeValues().toString(['minutes', 'seconds']));
});
stopWatch.addEventListener('started', function (e) {
  $('#stopwatchTime').html(stopWatch.getTimeValues().toString(['minutes', 'seconds']));
});
stopWatch.addEventListener('reset', function (e) {
  $('#stopwatchTime').html(stopWatch.getTimeValues().toString(['minutes', 'seconds']));
});
// var study = 25;
var study = 10;
var shortBreak = 5;
var longBreak = 15;
var loop = 1;
var pomodoroLoop = 4;
var isBreak = false;
// study: mode 0, short break: mode 1, long break: mode 2
// Pomodoro
var pomodoro = new Timer();
$('#pomo-startBtn').click(function () {
  pomodoro.start({
    countdown: true,
    startValues: {
      seconds: study
    },
    target: {
      minutes: 0
    }
  });
  pomoStartBtn.classList.remove("running");
  pomoPauseBtn.classList.add("running");
});
$('#pomo-pauseBtn').click(function () {
  pomodoro.pause();
  pomoPauseBtn.classList.remove("running");
  pomoStartBtn.classList.add("running");
});
$('#pomo-resetBtn').click(function () {
  loop = 1;
  isBreak = false;
  pomodoro.reset();
  pomodoro.pause();
  pomoPauseBtn.classList.remove("running");
  pomoStartBtn.classList.add("running");
});
$('#pomo-stopBtn').click(function () {
  pomodoro.stop();
  pomoPauseBtn.classList.remove("running");
  pomoStartBtn.classList.add("running");
});
pomodoro.addEventListener('secondsUpdated', function (e) {
  $('#pomodoroTime .minutes').html(pomodoro.getTimeValues().minutes);
  $('#pomodoroTime .seconds').html(pomodoro.getTimeValues().seconds);
  $('#pomodoroLoop').html(loop);
});
pomodoro.addEventListener('started', function (e) {
  $('#pomodoroTime .minutes').html(pomodoro.getTimeValues().minutes);
  $('#pomodoroTime .seconds').html(pomodoro.getTimeValues().seconds);
  $('#pomodoroLoop').html(loop);
});
pomodoro.addEventListener('reset', function (e) {
  $('#pomodoroTime .minutes').html(pomodoro.getTimeValues().minutes);
  $('#pomodoroTime .seconds').html(pomodoro.getTimeValues().seconds);
  $('#pomodoroLoop').html(loop);
});
pomodoro.addEventListener('targetAchieved', function (e) {
  if (isBreak) {
    loop = loop + 1;
    pomodoro.start({
      countdown: true,
      startValues: {
        seconds: study
      },
      target: {
        minutes: 0
      }
    });
    isBreak = false;
  } else {
    if (loop % pomodoroLoop === 0) {
      pomodoro.start({
        countdown: true,
        startValues: {
          seconds: longBreak
        },
        target: {
          minutes: 0
        }
      });
      isBreak = true;
    } else {
      pomodoro.start({
        countdown: true,
        startValues: {
          seconds: shortBreak
        },
        target: {
          minutes: 0
        }
      });
      isBreak = true;
    }
  }
});

},{"../libraries/easytimer.js/dist/easytimer.min.js":"4Dhzm","../libraries/easytimer.js/dist/easytimer":"2zh7Q"}],"4Dhzm":[function(require,module,exports) {
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

},{}],"2zh7Q":[function(require,module,exports) {
var define;
/**
* easytimer.js
* Generated: 2021-03-16
* Version: 4.3.4
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.easytimer = {}));
})(this, function (exports) {
  "use strict";
  function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }
    return _typeof(obj);
  }
  function _defineProperty(obj, key, value) {
    if ((key in obj)) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }
    return target;
  }
  function leftPadding(string, padLength, character) {
    var i;
    var characters = '';
    string = typeof string === 'number' ? String(string) : string;
    if (string.length > padLength) {
      return string;
    }
    for (i = 0; i < padLength; i = i + 1) {
      characters += String(character);
    }
    return (characters + string).slice(-characters.length);
  }
  function TimeCounter() {
    this.reset();
  }
  /**
  * [toString convert the counted values on a string]
  * @param  {array} units           [array with the units to display]
  * @param  {string} separator       [separator of the units]
  * @param  {number} leftZeroPadding [number of zero padding]
  * @return {string}                 [result string]
  */
  TimeCounter.prototype.toString = function () {
    var units = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['hours', 'minutes', 'seconds'];
    var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ':';
    var leftZeroPadding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
    units = units || ['hours', 'minutes', 'seconds'];
    separator = separator || ':';
    leftZeroPadding = leftZeroPadding || 2;
    var arrayTime = [];
    var i;
    for (i = 0; i < units.length; i = i + 1) {
      if (this[units[i]] !== undefined) {
        if (units[i] === 'secondTenths') {
          arrayTime.push(this[units[i]]);
        } else {
          arrayTime.push(leftPadding(this[units[i]], leftZeroPadding, '0'));
        }
      }
    }
    return arrayTime.join(separator);
  };
  /**
  * [reset reset counter]
  */
  TimeCounter.prototype.reset = function () {
    this.secondTenths = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.days = 0;
  };
  function EventEmitter() {
    this.events = {};
  }
  EventEmitter.prototype.on = function (event, listener) {
    var _this = this;
    if (!Array.isArray(this.events[event])) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
    return function () {
      return _this.removeListener(event, listener);
    };
  };
  EventEmitter.prototype.removeListener = function (event, listener) {
    if (Array.isArray(this.events[event])) {
      var eventIndex = this.events[event].indexOf(listener);
      if (eventIndex > -1) {
        this.events[event].splice(eventIndex, 1);
      }
    }
  };
  EventEmitter.prototype.emit = function (event) {
    var _this2 = this;
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    if (Array.isArray(this.events[event])) {
      this.events[event].forEach(function (listener) {
        return listener.apply(_this2, args);
      });
    }
  };
  /*
  * General functions, variables and constants
  */
  var SECOND_TENTHS_PER_SECOND = 10;
  var SECONDS_PER_MINUTE = 60;
  var MINUTES_PER_HOUR = 60;
  var HOURS_PER_DAY = 24;
  var SECOND_TENTHS_POSITION = 0;
  var SECONDS_POSITION = 1;
  var MINUTES_POSITION = 2;
  var HOURS_POSITION = 3;
  var DAYS_POSITION = 4;
  var SECOND_TENTHS = 'secondTenths';
  var SECONDS = 'seconds';
  var MINUTES = 'minutes';
  var HOURS = 'hours';
  var DAYS = 'days';
  var VALID_INPUT_VALUES = [SECOND_TENTHS, SECONDS, MINUTES, HOURS, DAYS];
  var unitsInMilliseconds = {
    secondTenths: 100,
    seconds: 1000,
    minutes: 60000,
    hours: 3600000,
    days: 86400000
  };
  var groupedUnits = {
    secondTenths: SECOND_TENTHS_PER_SECOND,
    seconds: SECONDS_PER_MINUTE,
    minutes: MINUTES_PER_HOUR,
    hours: HOURS_PER_DAY
  };
  function mod(number, module) {
    return (number % module + module) % module;
  }
  /**
  * [Timer Timer/Chronometer/Countdown compatible with AMD and NodeJS.
  * Can update time values with different time intervals: tenth of seconds,
  * seconds, minutes and hours.]
  */
  function Timer() {
    var defaultParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    /*
    * PRIVATE variables and Functions
    */
    var counters = new TimeCounter();
    var totalCounters = new TimeCounter();
    var intervalId;
    var eventEmitter = new EventEmitter();
    var running = false;
    var paused = false;
    var precision;
    var timerTypeFactor;
    var customCallback;
    var timerConfig = {};
    var currentParams;
    var targetValues;
    var startValues;
    var countdown;
    var startingDate;
    var targetDate;
    var eventData = {
      detail: {
        timer: this
      }
    };
    setParams(defaultParams);
    function updateCounters(precision, roundedValue) {
      var unitsPerGroup = groupedUnits[precision];
      totalCounters[precision] = roundedValue;
      if (precision === DAYS) {
        counters[precision] = Math.abs(roundedValue);
      } else if (roundedValue >= 0) {
        counters[precision] = mod(roundedValue, unitsPerGroup);
      } else {
        counters[precision] = mod(unitsPerGroup - mod(roundedValue, unitsPerGroup), unitsPerGroup);
      }
    }
    function updateDays(value) {
      return updateUnitByPrecision(value, DAYS);
    }
    function updateHours(value) {
      return updateUnitByPrecision(value, HOURS);
    }
    function updateMinutes(value) {
      return updateUnitByPrecision(value, MINUTES);
    }
    function updateSeconds(value) {
      return updateUnitByPrecision(value, SECONDS);
    }
    function updateSecondTenths(value) {
      return updateUnitByPrecision(value, SECOND_TENTHS);
    }
    function updateUnitByPrecision(value, precision) {
      var previousValue = totalCounters[precision];
      updateCounters(precision, calculateIntegerUnitQuotient(value, unitsInMilliseconds[precision]));
      return totalCounters[precision] !== previousValue;
    }
    function stopTimerAndResetCounters() {
      stopTimer();
      resetCounters();
    }
    function stopTimer() {
      clearInterval(intervalId);
      intervalId = undefined;
      running = false;
      paused = false;
    }
    function setParamsAndStartTimer(params) {
      if (!isPaused()) {
        setParams(params);
      } else {
        startingDate = calculateStartingDate();
        targetValues = setTarget(currentParams.target);
      }
      startTimer();
    }
    function startTimer() {
      var interval = unitsInMilliseconds[precision];
      if (isTargetAchieved(roundTimestamp(Date.now()))) {
        return;
      }
      intervalId = setInterval(updateTimerAndDispatchEvents, interval);
      running = true;
      paused = false;
    }
    function calculateStartingDate() {
      return roundTimestamp(Date.now()) - totalCounters.secondTenths * unitsInMilliseconds[SECOND_TENTHS] * timerTypeFactor;
    }
    function updateTimerAndDispatchEvents() {
      var currentTime = roundTimestamp(Date.now());
      var valuesUpdated = updateTimer();
      dispatchEvents(valuesUpdated);
      customCallback(eventData.detail.timer);
      if (isTargetAchieved(currentTime)) {
        stop();
        dispatchEvent('targetAchieved', eventData);
      }
    }
    function updateTimer() {
      var currentTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : roundTimestamp(Date.now());
      var elapsedTime = timerTypeFactor > 0 ? currentTime - startingDate : startingDate - currentTime;
      var valuesUpdated = {};
      valuesUpdated[SECOND_TENTHS] = updateSecondTenths(elapsedTime);
      valuesUpdated[SECONDS] = updateSeconds(elapsedTime);
      valuesUpdated[MINUTES] = updateMinutes(elapsedTime);
      valuesUpdated[HOURS] = updateHours(elapsedTime);
      valuesUpdated[DAYS] = updateDays(elapsedTime);
      return valuesUpdated;
    }
    function roundTimestamp(timestamp) {
      return Math.floor(timestamp / unitsInMilliseconds[precision]) * unitsInMilliseconds[precision];
    }
    function dispatchEvents(valuesUpdated) {
      if (valuesUpdated[SECOND_TENTHS]) {
        dispatchEvent('secondTenthsUpdated', eventData);
      }
      if (valuesUpdated[SECONDS]) {
        dispatchEvent('secondsUpdated', eventData);
      }
      if (valuesUpdated[MINUTES]) {
        dispatchEvent('minutesUpdated', eventData);
      }
      if (valuesUpdated[HOURS]) {
        dispatchEvent('hoursUpdated', eventData);
      }
      if (valuesUpdated[DAYS]) {
        dispatchEvent('daysUpdated', eventData);
      }
    }
    function isTargetAchieved(currentDate) {
      return targetValues instanceof Array && currentDate >= targetDate;
    }
    function resetCounters() {
      counters.reset();
      totalCounters.reset();
    }
    function setParams(params) {
      params = params || ({});
      precision = checkPrecision(params.precision);
      customCallback = typeof params.callback === 'function' ? params.callback : function () {};
      countdown = params.countdown === true;
      timerTypeFactor = countdown === true ? -1 : 1;
      if (_typeof(params.startValues) === 'object') {
        setStartValues(params.startValues);
      } else {
        startValues = null;
      }
      startingDate = calculateStartingDate();
      updateTimer();
      if (_typeof(params.target) === 'object') {
        targetValues = setTarget(params.target);
      } else if (countdown) {
        params.target = {
          seconds: 0
        };
        targetValues = setTarget(params.target);
      } else {
        targetValues = null;
      }
      timerConfig = {
        precision: precision,
        callback: customCallback,
        countdown: _typeof(params) === 'object' && params.countdown === true,
        target: targetValues,
        startValues: startValues
      };
      currentParams = params;
    }
    function checkPrecision(precision) {
      precision = typeof precision === 'string' ? precision : SECONDS;
      if (!isValidInputValue(precision)) {
        throw new Error(("Error in precision parameter: ").concat(precision, " is not a valid value"));
      }
      return precision;
    }
    function isValidInputValue(value) {
      return VALID_INPUT_VALUES.indexOf(value) >= 0;
    }
    function configInputValues(inputValues) {
      var values;
      if (_typeof(inputValues) === 'object') {
        if (inputValues instanceof Array) {
          if (inputValues.length !== 5) {
            throw new Error('Array size not valid');
          }
          values = inputValues;
        } else {
          for (var value in inputValues) {
            if (VALID_INPUT_VALUES.indexOf(value) < 0) {
              throw new Error(("Error in startValues or target parameter: ").concat(value, " is not a valid input value"));
            }
          }
          values = [inputValues.secondTenths || 0, inputValues.seconds || 0, inputValues.minutes || 0, inputValues.hours || 0, inputValues.days || 0];
        }
      }
      var secondTenths = values[SECOND_TENTHS_POSITION];
      var seconds = values[SECONDS_POSITION] + calculateIntegerUnitQuotient(secondTenths, SECOND_TENTHS_PER_SECOND);
      var minutes = values[MINUTES_POSITION] + calculateIntegerUnitQuotient(seconds, SECONDS_PER_MINUTE);
      var hours = values[HOURS_POSITION] + calculateIntegerUnitQuotient(minutes, MINUTES_PER_HOUR);
      var days = values[DAYS_POSITION] + calculateIntegerUnitQuotient(hours, HOURS_PER_DAY);
      values[SECOND_TENTHS_POSITION] = secondTenths % SECOND_TENTHS_PER_SECOND;
      values[SECONDS_POSITION] = seconds % SECONDS_PER_MINUTE;
      values[MINUTES_POSITION] = minutes % MINUTES_PER_HOUR;
      values[HOURS_POSITION] = hours % HOURS_PER_DAY;
      values[DAYS_POSITION] = days;
      return values;
    }
    function calculateIntegerUnitQuotient(unit, divisor) {
      var quotient = unit / divisor;
      return quotient < 0 ? Math.ceil(quotient) : Math.floor(quotient);
    }
    function setTarget(inputTarget) {
      if (!inputTarget) {
        return;
      }
      targetValues = configInputValues(inputTarget);
      var targetCounter = calculateTotalCounterFromValues(targetValues);
      targetDate = startingDate + targetCounter.secondTenths * unitsInMilliseconds[SECOND_TENTHS] * timerTypeFactor;
      return targetValues;
    }
    function setStartValues(inputStartValues) {
      startValues = configInputValues(inputStartValues);
      counters.secondTenths = startValues[SECOND_TENTHS_POSITION];
      counters.seconds = startValues[SECONDS_POSITION];
      counters.minutes = startValues[MINUTES_POSITION];
      counters.hours = startValues[HOURS_POSITION];
      counters.days = startValues[DAYS_POSITION];
      totalCounters = calculateTotalCounterFromValues(startValues, totalCounters);
    }
    function calculateTotalCounterFromValues(values, outputCounter) {
      var total = outputCounter || ({});
      total.days = values[DAYS_POSITION];
      total.hours = total.days * HOURS_PER_DAY + values[HOURS_POSITION];
      total.minutes = total.hours * MINUTES_PER_HOUR + values[MINUTES_POSITION];
      total.seconds = total.minutes * SECONDS_PER_MINUTE + values[SECONDS_POSITION];
      total.secondTenths = total.seconds * SECOND_TENTHS_PER_SECOND + values[[SECOND_TENTHS_POSITION]];
      return total;
    }
    /*
    * PUBLIC functions
    */
    /**
    * [stop stops the timer and resets the counters. Dispatch stopped event]
    */
    function stop() {
      stopTimerAndResetCounters();
      dispatchEvent('stopped', eventData);
    }
    /**
    * [stop stops and starts the timer. Dispatch stopped event]
    */
    function reset() {
      stopTimerAndResetCounters();
      setParamsAndStartTimer(currentParams);
      dispatchEvent('reset', eventData);
    }
    /**
    * [start starts the timer configured by the params object. Dispatch started event]
    * @param  {object} params [Configuration parameters]
    */
    function start() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      params = _objectSpread2(_objectSpread2({}, defaultParams), params);
      if (isRunning()) {
        return;
      }
      setParamsAndStartTimer(params);
      dispatchEvent('started', eventData);
    }
    /**
    * [pause stops the timer without resetting the counters. The timer it can be restarted with start function.
    * Dispatch paused event]
    * @return {type} [description]
    */
    function pause() {
      stopTimer();
      paused = true;
      dispatchEvent('paused', eventData);
    }
    /**
    * [addEventListener Adds event listener to the timer]
    * @param {string} eventType      [event to listen]
    * @param {function} listener   [the event listener function]
    */
    function addEventListener(eventType, listener) {
      eventEmitter.on(eventType, listener);
    }
    /**
    * [removeEventListener Removes event listener to the timer]
    * @param  {string} eventType    [event to remove listener]
    * @param  {function} listener [listener to remove]
    */
    function removeEventListener(eventType, listener) {
      eventEmitter.removeListener(eventType, listener);
    }
    /**
    * [dispatchEvent dispatches an event]
    * @param  {string} eventType [event to dispatch]
    * @param data
    */
    function dispatchEvent(eventType, data) {
      eventEmitter.emit(eventType, data);
    }
    /**
    * [isRunning return true if the timer is running]
    * @return {Boolean}
    */
    function isRunning() {
      return running;
    }
    /**
    * [isPaused returns true if the timer is paused]
    * @return {Boolean}
    */
    function isPaused() {
      return paused;
    }
    /**
    * [getTimeValues returns the counter with the current timer values]
    * @return {TimeCounter}
    */
    function getTimeValues() {
      return counters;
    }
    /**
    * [getTotalTimeValues returns the counter with the current timer total values]
    * @return {TimeCounter}
    */
    function getTotalTimeValues() {
      return totalCounters;
    }
    /**
    * [getConfig returns the configuration parameters]
    * @return {type}
    */
    function getConfig() {
      return timerConfig;
    }
    /**
    * Public API
    * Definition of Timer instance public functions
    */
    if (typeof this !== 'undefined') {
      this.start = start;
      this.pause = pause;
      this.stop = stop;
      this.reset = reset;
      this.isRunning = isRunning;
      this.isPaused = isPaused;
      this.getTimeValues = getTimeValues;
      this.getTotalTimeValues = getTotalTimeValues;
      this.getConfig = getConfig;
      this.addEventListener = addEventListener;
      this.on = addEventListener;
      this.removeEventListener = removeEventListener;
      this.off = removeEventListener;
    }
  }
  exports.Timer = Timer;
  exports.default = Timer;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});

},{}],"2jNHT":[function(require,module,exports) {

},{}],"2aL5o":[function(require,module,exports) {

},{}],"6m8Cd":[function(require,module,exports) {

},{}]},["27Rzb","4OAbU"], "4OAbU", "parcelRequiref77e")

//# sourceMappingURL=index.8a5bc16d.js.map
