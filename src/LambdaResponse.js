"use strict";

const err = msg => {
  throw new Error(msg);
};

class LambdaResponse {
  constructor({ callback } = {}) {
    if (!callback) err("options.callback is not defined");
    else if (typeof callback !== "function")
      throw new Error("options.callback is not a function");

    this._callback = callback;
  }

  success({headers, body } = {}){
    return this._send({ status: 200, headers, body})
  }

  error({headers, body } = {}){
    return this._send({ status: 500, headers, body})
  }

  custom({status, headers, body } = {}){
    return this._send({ status, headers, body})
  }

  _send({ status, headers, body } = {}) {
    if (!status) throw new Error("options.status is not defined");
    else if (typeof status !== "number")
      throw new Error("options.status is not a number");

    let gatewayObject = { statusCode: status };

    if (headers) gatewayObject.headers = headers;

    if (body)
      if (typeof body !== "string") gatewayObject.body = JSON.stringify(body);
      else gatewayObject.body = body;

    return new Promise((resolve) => {
      this._callback(null, gatewayObject);
      resolve();
    });
  }
}

module.exports = LambdaResponse;
