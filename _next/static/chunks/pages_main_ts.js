/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([["pages_main_ts"],{

/***/ "./pages/main.ts":
/*!***********************!*\
  !*** ./pages/main.ts ***!
  \***********************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Anything; }\n/* harmony export */ });\n/* module decorator */ module = __webpack_require__.hmd(module);\nvar isBrowser = function isBrowser() {\n  return true;\n};\n\nvar innerWidth = 800;\nvar innerHeight = 800;\nvar canvas;\nvar context;\n\nif (isBrowser()) {\n  innerWidth = window.innerWidth;\n  innerHeight = window.innerHeight;\n  canvas = document.querySelector(\"canvas\");\n  context = canvas.getContext(\"2d\"); // window.onresize = resize;\n\n  canvas.onmousemove = onMouseMove;\n  canvas.ontouchmove = onTouchMove;\n  canvas.ontouchend = onMouseLeave;\n  document.onmouseleave = onMouseLeave;\n}\n\nvar STAR_COUNT = (innerWidth + innerHeight) / 8;\nvar STAR_SIZE = 3;\nvar STAR_MIN_SCALE = 0.2;\nvar OVERFLOW_THRESHOLD = 50;\nvar scale = 1,\n    // device pixel ratio\nwidth,\n    height;\nvar stars = [];\nvar pointerX, pointerY;\nvar velocity = {\n  x: 0,\n  y: 0,\n  tx: 0,\n  ty: 0,\n  z: 0.0005\n};\nvar touchInput = false;\ngenerate();\nresize();\nstep();\n\nfunction generate() {\n  for (var i = 0; i < STAR_COUNT; i++) {\n    stars.push({\n      x: 0,\n      y: 0,\n      z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE)\n    });\n  }\n}\n\nfunction placeStar(star) {\n  star.x = Math.random() * width;\n  star.y = Math.random() * height;\n}\n\nfunction recycleStar(star) {\n  var direction = \"z\";\n  var vx = Math.abs(velocity.x),\n      vy = Math.abs(velocity.y);\n\n  if (vx > 1 || vy > 1) {\n    var axis;\n\n    if (vx > vy) {\n      axis = Math.random() < vx / (vx + vy) ? \"h\" : \"v\";\n    } else {\n      axis = Math.random() < vy / (vx + vy) ? \"v\" : \"h\";\n    }\n\n    if (axis === \"h\") {\n      direction = velocity.x > 0 ? \"l\" : \"r\";\n    } else {\n      direction = velocity.y > 0 ? \"t\" : \"b\";\n    }\n  }\n\n  star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);\n\n  if (direction === \"z\") {\n    star.z = 0.1;\n    star.x = Math.random() * width;\n    star.y = Math.random() * height;\n  } else if (direction === \"l\") {\n    star.x = -OVERFLOW_THRESHOLD;\n    star.y = height * Math.random();\n  } else if (direction === \"r\") {\n    star.x = width + OVERFLOW_THRESHOLD;\n    star.y = height * Math.random();\n  } else if (direction === \"t\") {\n    star.x = width * Math.random();\n    star.y = -OVERFLOW_THRESHOLD;\n  } else if (direction === \"b\") {\n    star.x = width * Math.random();\n    star.y = height + OVERFLOW_THRESHOLD;\n  }\n}\n\nfunction resize() {\n  scale = isBrowser() ? window.devicePixelRatio || 1 : 1;\n  width = innerWidth * scale;\n  height = innerHeight * scale;\n  canvas.width = width;\n  canvas.height = height;\n  stars.forEach(placeStar);\n}\n\nfunction step() {\n  context.clearRect(0, 0, width, height);\n  update();\n  render();\n  requestAnimationFrame(step);\n}\n\nfunction update() {\n  velocity.tx *= 0.96;\n  velocity.ty *= 0.96;\n  velocity.x += (velocity.tx - velocity.x) * 0.8;\n  velocity.y += (velocity.ty - velocity.y) * 0.8;\n  stars.forEach(function (star) {\n    star.x += velocity.x * star.z;\n    star.y += velocity.y * star.z;\n    star.x += (star.x - width / 2) * velocity.z * star.z;\n    star.y += (star.y - height / 2) * velocity.z * star.z;\n    star.z += velocity.z; // recycle when out of bounds\n\n    if (star.x < -OVERFLOW_THRESHOLD || star.x > width + OVERFLOW_THRESHOLD || star.y < -OVERFLOW_THRESHOLD || star.y > height + OVERFLOW_THRESHOLD) {\n      recycleStar(star);\n    }\n  });\n}\n\nfunction render() {\n  stars.forEach(function (star) {\n    context.beginPath();\n    context.lineCap = \"round\";\n    context.lineWidth = STAR_SIZE * star.z * scale;\n    context.strokeStyle = \"rgba(255,255,255,\" + (0.5 + 0.5 * Math.random()) + \")\";\n    context.beginPath();\n    context.moveTo(star.x, star.y);\n    var tailX = velocity.x * 2,\n        tailY = velocity.y * 2; // stroke() wont work on an invisible line\n\n    if (Math.abs(tailX) < 0.1) tailX = 0.5;\n    if (Math.abs(tailY) < 0.1) tailY = 0.5;\n    context.lineTo(star.x + tailX, star.y + tailY);\n    context.stroke();\n  });\n}\n\nfunction movePointer(x, y) {\n  if (Number.isFinite(pointerX) && Number.isFinite(pointerY)) {\n    var ox = x - pointerX,\n        oy = y - pointerY;\n    velocity.tx = velocity.tx + ox / 8 * scale * (touchInput ? 1 : -1);\n    velocity.ty = velocity.ty + oy / 8 * scale * (touchInput ? 1 : -1);\n  }\n\n  pointerX = x;\n  pointerY = y;\n}\n\nfunction onMouseMove(event) {\n  touchInput = false;\n  movePointer(event.clientX, event.clientY);\n}\n\nfunction onTouchMove(event) {\n  touchInput = true;\n  movePointer(event.touches[0].clientX, event.touches[0].clientY);\n  event.preventDefault();\n}\n\nfunction onMouseLeave() {\n  pointerX = NaN;\n  pointerY = NaN;\n}\n\nfunction Anything() {\n  return null;\n}\n_c = Anything;\n\nvar _c;\n\n$RefreshReg$(_c, \"Anything\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvbWFpbi50cz9kZmQwIl0sIm5hbWVzIjpbImlzQnJvd3NlciIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsImNhbnZhcyIsImNvbnRleHQiLCJ3aW5kb3ciLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJnZXRDb250ZXh0Iiwib25tb3VzZW1vdmUiLCJvbk1vdXNlTW92ZSIsIm9udG91Y2htb3ZlIiwib25Ub3VjaE1vdmUiLCJvbnRvdWNoZW5kIiwib25Nb3VzZUxlYXZlIiwib25tb3VzZWxlYXZlIiwiU1RBUl9DT1VOVCIsIlNUQVJfU0laRSIsIlNUQVJfTUlOX1NDQUxFIiwiT1ZFUkZMT1dfVEhSRVNIT0xEIiwic2NhbGUiLCJ3aWR0aCIsImhlaWdodCIsInN0YXJzIiwicG9pbnRlclgiLCJwb2ludGVyWSIsInZlbG9jaXR5IiwieCIsInkiLCJ0eCIsInR5IiwieiIsInRvdWNoSW5wdXQiLCJnZW5lcmF0ZSIsInJlc2l6ZSIsInN0ZXAiLCJpIiwicHVzaCIsIk1hdGgiLCJyYW5kb20iLCJwbGFjZVN0YXIiLCJzdGFyIiwicmVjeWNsZVN0YXIiLCJkaXJlY3Rpb24iLCJ2eCIsImFicyIsInZ5IiwiYXhpcyIsImRldmljZVBpeGVsUmF0aW8iLCJmb3JFYWNoIiwiY2xlYXJSZWN0IiwidXBkYXRlIiwicmVuZGVyIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiYmVnaW5QYXRoIiwibGluZUNhcCIsImxpbmVXaWR0aCIsInN0cm9rZVN0eWxlIiwibW92ZVRvIiwidGFpbFgiLCJ0YWlsWSIsImxpbmVUbyIsInN0cm9rZSIsIm1vdmVQb2ludGVyIiwiTnVtYmVyIiwiaXNGaW5pdGUiLCJveCIsIm95IiwiZXZlbnQiLCJjbGllbnRYIiwiY2xpZW50WSIsInRvdWNoZXMiLCJwcmV2ZW50RGVmYXVsdCIsIk5hTiIsIkFueXRoaW5nIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBLElBQU1BLFNBQVMsR0FBRyxTQUFaQSxT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QVc5QyxLQUFYLElBQW9CWSxVQUFVLEdBQUcsQ0FBSCxHQUFPLENBQUMsQ0FBdEMsQ0FBNUI7QUFDQU4sWUFBUSxDQUFDSSxFQUFULEdBQWNKLFFBQVEsQ0FBQ0ksRUFBVCxHQUFlcUMsRUFBRSxHQUFHLENBQU4sR0FBVy9DLEtBQVgsSUFBb0JZLFVBQVUsR0FBRyxDQUFILEdBQU8sQ0FBQyxDQUF0QyxDQUE1QjtBQUNEOztBQUVEUixVQUFRLEdBQUdHLENBQVg7QUFDQUYsVUFBUSxHQUFHRyxDQUFYO0FBQ0Q7O0FBRUQsU0FBU2xCLFdBQVQsQ0FBcUIwRCxLQUFyQixFQUF3QztBQUN0Q3BDLFlBQVUsR0FBRyxLQUFiO0FBRUErQixhQUFXLENBQUNLLEtBQUssQ0FBQ0MsT0FBUCxFQUFnQkQsS0FBSyxDQUFDRSxPQUF0QixDQUFYO0FBQ0Q7O0FBRUQsU0FBUzFELFdBQVQsQ0FBcUJ3RCxLQUFyQixFQUF3QztBQUN0Q3BDLFlBQVUsR0FBRyxJQUFiO0FBRUErQixhQUFXLENBQUNLLEtBQUssQ0FBQ0csT0FBTixDQUFjLENBQWQsRUFBaUJGLE9BQWxCLEVBQTJCRCxLQUFLLENBQUNHLE9BQU4sQ0FBYyxDQUFkLEVBQWlCRCxPQUE1QyxDQUFYO0FBRUFGLE9BQUssQ0FBQ0ksY0FBTjtBQUNEOztBQUVELFNBQVMxRCxZQUFULEdBQXdCO0FBQ3RCVSxVQUFRLEdBQUdpRCxHQUFYO0FBQ0FoRCxVQUFRLEdBQUdnRCxHQUFYO0FBQ0Q7O0FBRWMsU0FBU0MsUUFBVCxHQUFvQjtBQUNqQyxTQUFPLElBQVA7QUFDRDtLQUZ1QkEsUSIsImZpbGUiOiIuL3BhZ2VzL21haW4udHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBpc0Jyb3dzZXIgPSAoKSA9PiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiO1xuXG5sZXQgaW5uZXJXaWR0aCA9IDgwMDtcbmxldCBpbm5lckhlaWdodCA9IDgwMDtcbmxldCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xubGV0IGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbmlmIChpc0Jyb3dzZXIoKSkge1xuICBpbm5lcldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gIGlubmVySGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiY2FudmFzXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKSBhcyBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gIC8vIHdpbmRvdy5vbnJlc2l6ZSA9IHJlc2l6ZTtcbiAgY2FudmFzLm9ubW91c2Vtb3ZlID0gb25Nb3VzZU1vdmU7XG4gIGNhbnZhcy5vbnRvdWNobW92ZSA9IG9uVG91Y2hNb3ZlO1xuICBjYW52YXMub250b3VjaGVuZCA9IG9uTW91c2VMZWF2ZTtcbiAgZG9jdW1lbnQub25tb3VzZWxlYXZlID0gb25Nb3VzZUxlYXZlO1xufVxuXG5jb25zdCBTVEFSX0NPVU5UID0gKGlubmVyV2lkdGggKyBpbm5lckhlaWdodCkgLyA4O1xuY29uc3QgU1RBUl9TSVpFID0gMztcbmNvbnN0IFNUQVJfTUlOX1NDQUxFID0gMC4yO1xuY29uc3QgT1ZFUkZMT1dfVEhSRVNIT0xEID0gNTA7XG5cbmxldCBzY2FsZSA9IDEsIC8vIGRldmljZSBwaXhlbCByYXRpb1xuICB3aWR0aDogbnVtYmVyLFxuICBoZWlnaHQ6IG51bWJlcjtcblxudHlwZSBTdGFyID0ge1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbiAgejogbnVtYmVyO1xufTtcbmNvbnN0IHN0YXJzOiBTdGFyW10gPSBbXTtcblxubGV0IHBvaW50ZXJYOiBudW1iZXIsIHBvaW50ZXJZOiBudW1iZXI7XG5cbmxldCB2ZWxvY2l0eSA9IHsgeDogMCwgeTogMCwgdHg6IDAsIHR5OiAwLCB6OiAwLjAwMDUgfTtcblxubGV0IHRvdWNoSW5wdXQgPSBmYWxzZTtcblxuZ2VuZXJhdGUoKTtcbnJlc2l6ZSgpO1xuc3RlcCgpO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZSgpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBTVEFSX0NPVU5UOyBpKyspIHtcbiAgICBzdGFycy5wdXNoKHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwLFxuICAgICAgejogU1RBUl9NSU5fU0NBTEUgKyBNYXRoLnJhbmRvbSgpICogKDEgLSBTVEFSX01JTl9TQ0FMRSksXG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGxhY2VTdGFyKHN0YXI6IFN0YXIpIHtcbiAgc3Rhci54ID0gTWF0aC5yYW5kb20oKSAqIHdpZHRoO1xuICBzdGFyLnkgPSBNYXRoLnJhbmRvbSgpICogaGVpZ2h0O1xufVxuXG5mdW5jdGlvbiByZWN5Y2xlU3RhcihzdGFyOiBTdGFyKSB7XG4gIGxldCBkaXJlY3Rpb24gPSBcInpcIjtcblxuICBsZXQgdnggPSBNYXRoLmFicyh2ZWxvY2l0eS54KSxcbiAgICB2eSA9IE1hdGguYWJzKHZlbG9jaXR5LnkpO1xuXG4gIGlmICh2eCA+IDEgfHwgdnkgPiAxKSB7XG4gICAgbGV0IGF4aXM7XG5cbiAgICBpZiAodnggPiB2eSkge1xuICAgICAgYXhpcyA9IE1hdGgucmFuZG9tKCkgPCB2eCAvICh2eCArIHZ5KSA/IFwiaFwiIDogXCJ2XCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF4aXMgPSBNYXRoLnJhbmRvbSgpIDwgdnkgLyAodnggKyB2eSkgPyBcInZcIiA6IFwiaFwiO1xuICAgIH1cblxuICAgIGlmIChheGlzID09PSBcImhcIikge1xuICAgICAgZGlyZWN0aW9uID0gdmVsb2NpdHkueCA+IDAgPyBcImxcIiA6IFwiclwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXJlY3Rpb24gPSB2ZWxvY2l0eS55ID4gMCA/IFwidFwiIDogXCJiXCI7XG4gICAgfVxuICB9XG5cbiAgc3Rhci56ID0gU1RBUl9NSU5fU0NBTEUgKyBNYXRoLnJhbmRvbSgpICogKDEgLSBTVEFSX01JTl9TQ0FMRSk7XG5cbiAgaWYgKGRpcmVjdGlvbiA9PT0gXCJ6XCIpIHtcbiAgICBzdGFyLnogPSAwLjE7XG4gICAgc3Rhci54ID0gTWF0aC5yYW5kb20oKSAqIHdpZHRoO1xuICAgIHN0YXIueSA9IE1hdGgucmFuZG9tKCkgKiBoZWlnaHQ7XG4gIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcImxcIikge1xuICAgIHN0YXIueCA9IC1PVkVSRkxPV19USFJFU0hPTEQ7XG4gICAgc3Rhci55ID0gaGVpZ2h0ICogTWF0aC5yYW5kb20oKTtcbiAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IFwiclwiKSB7XG4gICAgc3Rhci54ID0gd2lkdGggKyBPVkVSRkxPV19USFJFU0hPTEQ7XG4gICAgc3Rhci55ID0gaGVpZ2h0ICogTWF0aC5yYW5kb20oKTtcbiAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IFwidFwiKSB7XG4gICAgc3Rhci54ID0gd2lkdGggKiBNYXRoLnJhbmRvbSgpO1xuICAgIHN0YXIueSA9IC1PVkVSRkxPV19USFJFU0hPTEQ7XG4gIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcImJcIikge1xuICAgIHN0YXIueCA9IHdpZHRoICogTWF0aC5yYW5kb20oKTtcbiAgICBzdGFyLnkgPSBoZWlnaHQgKyBPVkVSRkxPV19USFJFU0hPTEQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVzaXplKCkge1xuICBzY2FsZSA9IGlzQnJvd3NlcigpID8gKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDEpIDogMTtcblxuICB3aWR0aCA9IGlubmVyV2lkdGggKiBzY2FsZTtcbiAgaGVpZ2h0ID0gaW5uZXJIZWlnaHQgKiBzY2FsZTtcblxuICBjYW52YXMud2lkdGggPSB3aWR0aDtcbiAgY2FudmFzLmhlaWdodCA9IGhlaWdodDtcblxuICBzdGFycy5mb3JFYWNoKHBsYWNlU3Rhcik7XG59XG5cbmZ1bmN0aW9uIHN0ZXAoKSB7XG4gIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuXG4gIHVwZGF0ZSgpO1xuICByZW5kZXIoKTtcblxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RlcCk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgdmVsb2NpdHkudHggKj0gMC45NjtcbiAgdmVsb2NpdHkudHkgKj0gMC45NjtcblxuICB2ZWxvY2l0eS54ICs9ICh2ZWxvY2l0eS50eCAtIHZlbG9jaXR5LngpICogMC44O1xuICB2ZWxvY2l0eS55ICs9ICh2ZWxvY2l0eS50eSAtIHZlbG9jaXR5LnkpICogMC44O1xuXG4gIHN0YXJzLmZvckVhY2goKHN0YXIpID0+IHtcbiAgICBzdGFyLnggKz0gdmVsb2NpdHkueCAqIHN0YXIuejtcbiAgICBzdGFyLnkgKz0gdmVsb2NpdHkueSAqIHN0YXIuejtcblxuICAgIHN0YXIueCArPSAoc3Rhci54IC0gd2lkdGggLyAyKSAqIHZlbG9jaXR5LnogKiBzdGFyLno7XG4gICAgc3Rhci55ICs9IChzdGFyLnkgLSBoZWlnaHQgLyAyKSAqIHZlbG9jaXR5LnogKiBzdGFyLno7XG4gICAgc3Rhci56ICs9IHZlbG9jaXR5Lno7XG5cbiAgICAvLyByZWN5Y2xlIHdoZW4gb3V0IG9mIGJvdW5kc1xuICAgIGlmIChcbiAgICAgIHN0YXIueCA8IC1PVkVSRkxPV19USFJFU0hPTEQgfHxcbiAgICAgIHN0YXIueCA+IHdpZHRoICsgT1ZFUkZMT1dfVEhSRVNIT0xEIHx8XG4gICAgICBzdGFyLnkgPCAtT1ZFUkZMT1dfVEhSRVNIT0xEIHx8XG4gICAgICBzdGFyLnkgPiBoZWlnaHQgKyBPVkVSRkxPV19USFJFU0hPTERcbiAgICApIHtcbiAgICAgIHJlY3ljbGVTdGFyKHN0YXIpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgc3RhcnMuZm9yRWFjaCgoc3RhcikgPT4ge1xuICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgY29udGV4dC5saW5lQ2FwID0gXCJyb3VuZFwiO1xuICAgIGNvbnRleHQubGluZVdpZHRoID0gU1RBUl9TSVpFICogc3Rhci56ICogc2NhbGU7XG4gICAgY29udGV4dC5zdHJva2VTdHlsZSA9XG4gICAgICBcInJnYmEoMjU1LDI1NSwyNTUsXCIgKyAoMC41ICsgMC41ICogTWF0aC5yYW5kb20oKSkgKyBcIilcIjtcblxuICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgY29udGV4dC5tb3ZlVG8oc3Rhci54LCBzdGFyLnkpO1xuXG4gICAgdmFyIHRhaWxYID0gdmVsb2NpdHkueCAqIDIsXG4gICAgICB0YWlsWSA9IHZlbG9jaXR5LnkgKiAyO1xuXG4gICAgLy8gc3Ryb2tlKCkgd29udCB3b3JrIG9uIGFuIGludmlzaWJsZSBsaW5lXG4gICAgaWYgKE1hdGguYWJzKHRhaWxYKSA8IDAuMSkgdGFpbFggPSAwLjU7XG4gICAgaWYgKE1hdGguYWJzKHRhaWxZKSA8IDAuMSkgdGFpbFkgPSAwLjU7XG5cbiAgICBjb250ZXh0LmxpbmVUbyhzdGFyLnggKyB0YWlsWCwgc3Rhci55ICsgdGFpbFkpO1xuXG4gICAgY29udGV4dC5zdHJva2UoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG1vdmVQb2ludGVyKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gIGlmIChOdW1iZXIuaXNGaW5pdGUocG9pbnRlclgpICYmIE51bWJlci5pc0Zpbml0ZShwb2ludGVyWSkpIHtcbiAgICBsZXQgb3ggPSB4IC0gcG9pbnRlclgsXG4gICAgICBveSA9IHkgLSBwb2ludGVyWTtcblxuICAgIHZlbG9jaXR5LnR4ID0gdmVsb2NpdHkudHggKyAob3ggLyA4KSAqIHNjYWxlICogKHRvdWNoSW5wdXQgPyAxIDogLTEpO1xuICAgIHZlbG9jaXR5LnR5ID0gdmVsb2NpdHkudHkgKyAob3kgLyA4KSAqIHNjYWxlICogKHRvdWNoSW5wdXQgPyAxIDogLTEpO1xuICB9XG5cbiAgcG9pbnRlclggPSB4O1xuICBwb2ludGVyWSA9IHk7XG59XG5cbmZ1bmN0aW9uIG9uTW91c2VNb3ZlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gIHRvdWNoSW5wdXQgPSBmYWxzZTtcblxuICBtb3ZlUG9pbnRlcihldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKTtcbn1cblxuZnVuY3Rpb24gb25Ub3VjaE1vdmUoZXZlbnQ6IFRvdWNoRXZlbnQpIHtcbiAgdG91Y2hJbnB1dCA9IHRydWU7XG5cbiAgbW92ZVBvaW50ZXIoZXZlbnQudG91Y2hlc1swXS5jbGllbnRYLCBldmVudC50b3VjaGVzWzBdLmNsaWVudFkpO1xuXG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG59XG5cbmZ1bmN0aW9uIG9uTW91c2VMZWF2ZSgpIHtcbiAgcG9pbnRlclggPSBOYU47XG4gIHBvaW50ZXJZID0gTmFOO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBbnl0aGluZygpIHtcbiAgcmV0dXJuIG51bGw7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/main.ts\n");

/***/ })

}]);