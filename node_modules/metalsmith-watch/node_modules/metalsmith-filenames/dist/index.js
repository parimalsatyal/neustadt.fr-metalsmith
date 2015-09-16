"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function () {
  return function (files) {
    Object.keys(files).forEach(function (filename) {
      if (!files[filename].filename) {
        files[filename].filename = filename;
      }
    });
  };
};

module.exports = exports["default"];