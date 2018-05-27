const sinon = require("sinon");
const chai = require("chai");
const chaiAsPromised = require('chai-as-promised');

const expect = chai.expect;
chai.use(chaiAsPromised);

describe("LambdaResponse", () => {
  const LambdaResponse = require("../src/LambdaResponse");

  let callback = sinon.stub();

  afterEach(() => {
    callback.resetHistory();
  });

  it("throw error when options is not defined", () => {
    expect(() => new LambdaResponse()).to.throw();
  });

  it("throw error when options is not an object", () => {
    expect(() => new LambdaResponse()).to.throw();
  });

  it("throw error when options.callback is not defined", () => {
    expect(() => new LambdaResponse({}))
      .to.throw()
      .and.have.property("message", "options.callback is not defined");
  });

  it("<instance>._callback is a function after the object is built", () => {
    const res = new LambdaResponse({
      callback
    });
    expect(res._callback).to.be.a("function");
  });

  it("throw error when <instance>._callback is not a function", () => {
    expect(
        () =>
        new LambdaResponse({
          callback: "test error"
        })
      )
      .to.throw()
      .and.have.property("message", "options.callback is not a function");
  });

  describe("function", () => {
    describe("_send", () => {
      it("throw error if status is not defined", () => {
        let res = new LambdaResponse({
          callback
        });
        expect(() => res._send())
          .to.throw()
          .and.have.property("message", "options.status is not defined");
      });
      it("throw error if status is not a number", () => {
        let res = new LambdaResponse({
          callback
        });
        expect(() => res._send({
            status: "test"
          }))
          .to.throw()
          .and.have.property("message", "options.status is not a number");
      });
      it("returns Promise", () => {
        const res = new LambdaResponse({
          callback
        });
        expect(res._send({
          status: 200
        })).to.be.a("promise");
      });
      it("<instance>._callback is called", () => {
        const res = new LambdaResponse({
          callback
        })._send({
          status: 200
        });
        expect(callback.called).to.equal(true);
      });
      it("<instance>._callback is called and the promise is resolved", () => {
        let status = 999;
        let res = new LambdaResponse({
          callback
        });
        return expect(res._send({
          status
        })).to.eventually.equal();
      });
      it("<instance>._callback return gateway object with only test status", () => {
        let status = 999;
        const res = new LambdaResponse({
          callback
        })._send({
          status
        });
        expect(callback.getCall(0).args[0]).to.deep.equal(null);
        expect(callback.getCall(0).args[1]).to.deep.equal({
          statusCode: status
        });
      });
      it("<instance>._callback return gateway object with only test status and headers", () => {
        let status = 999;

        let headers = {
          "Content-Type": "application/json"
        };

        const res = new LambdaResponse({
          callback
        })._send({
          status,
          headers
        });
        expect(callback.getCall(0).args[0]).to.deep.equal(null);
        expect(callback.getCall(0).args[1]).to.deep.equal({
          statusCode: status,
          headers
        });
      });

      it("<instance>._callback return gateway object with only test status, headers and object body", () => {
        let status = 999;

        let headers = {
          "Content-Type": "application/json"
        };

        let body = {
          data: "test"
        };

        const res = new LambdaResponse({
          callback
        })._send({
          status,
          headers,
          body
        });
        expect(callback.getCall(0).args[0]).to.deep.equal(null);
        expect(callback.getCall(0).args[1]).to.deep.equal({
          statusCode: status,
          headers,
          body: JSON.stringify(body)
        });
      });
      it("<instance>._callback return gateway object with only test status, headers and string body", () => {
        let status = 999;

        let headers = {
          "Content-Type": "application/json"
        };

        let body = "test";

        const res = new LambdaResponse({
          callback
        })._send({
          status,
          headers,
          body
        });
        expect(callback.getCall(0).args[0]).to.deep.equal(null);
        expect(callback.getCall(0).args[1]).to.deep.equal({
          statusCode: status,
          headers,
          body
        });
      });

      it("<instance>._callback return gateway object with only test status, headers and object body", () => {
        let status = 999;

        let headers = {
          "Content-Type": "application/json"
        };

        let body = {
          data: "test"
        };

        const res = new LambdaResponse({
          callback
        })._send({
          status,
          headers,
          body
        });
        expect(callback.getCall(0).args[0]).to.deep.equal(null);
        expect(callback.getCall(0).args[1]).to.deep.equal({
          statusCode: status,
          headers,
          body: JSON.stringify(body)
        });
      });
    });
    describe('success', () => {
      it("<instance>._callback return success gateway object with only status", () => {
        const res = new LambdaResponse({
          callback
        }).success();

        expect(callback.getCall(0).args[0]).to.deep.equal(null);
        expect(callback.getCall(0).args[1]).to.deep.equal({
          statusCode: 200
        });
      });

      it("<instance>._callback return success gateway object with status and headers", () => {
        let headers = {
          "Content-Type": "application/json"
        };

        const res = new LambdaResponse({
          callback
        }).success({
          headers
        });
        expect(callback.getCall(0).args[0]).to.deep.equal(null);
        expect(callback.getCall(0).args[1]).to.deep.equal({
          statusCode: 200,
          headers
        });
      });

      it("<instance>._callback return success gateway object with status, headers and object body", () => {
        let headers = {
          "Content-Type": "application/json"
        };

        let body = {
          data: 'test'
        };

        const res = new LambdaResponse({
          callback
        }).success({
          headers,
          body
        });
        expect(callback.getCall(0).args[0]).to.deep.equal(null);
        expect(callback.getCall(0).args[1]).to.deep.equal({
          statusCode: 200,
          headers,
          body: JSON.stringify(body)
        });
      });

      it("<instance>._callback return success gateway object with status, headers and string body", () => {
        let headers = {
          "Content-Type": "application/json"
        };

        let body = 'test';

        const res = new LambdaResponse({
          callback
        }).success({
          headers,
          body
        });
        expect(callback.getCall(0).args[0]).to.deep.equal(null);
        expect(callback.getCall(0).args[1]).to.deep.equal({
          statusCode: 200,
          headers,
          body
        });
      });
    });
    describe('error', () => {
      it("<instance>._callback return success gateway object with only status", () => {
        const res = new LambdaResponse({
          callback
        }).error();

        expect(callback.getCall(0).args[0]).to.deep.equal(null);
        expect(callback.getCall(0).args[1]).to.deep.equal({
          statusCode: 500
        });
      });

      it("<instance>._callback return success gateway object with status and headers", () => {
        let headers = {
          "Content-Type": "application/json"
        };

        const res = new LambdaResponse({
          callback
        }).error({
          headers
        });
        expect(callback.getCall(0).args[0]).to.deep.equal(null);
        expect(callback.getCall(0).args[1]).to.deep.equal({
          statusCode: 500,
          headers
        });
      });

      it("<instance>._callback return success gateway object with status, headers and object body", () => {
        let headers = {
          "Content-Type": "application/json"
        };

        let body = {
          data: 'test'
        };

        const res = new LambdaResponse({
          callback
        }).error({
          headers,
          body
        });
        expect(callback.getCall(0).args[0]).to.deep.equal(null);
        expect(callback.getCall(0).args[1]).to.deep.equal({
          statusCode: 500,
          headers,
          body: JSON.stringify(body)
        });
      });

      it("<instance>._callback return success gateway object with status, headers and string body", () => {
        let headers = {
          "Content-Type": "application/json"
        };

        let body = 'test';

        const res = new LambdaResponse({
          callback
        }).error({
          headers,
          body
        });
        expect(callback.getCall(0).args[0]).to.deep.equal(null);
        expect(callback.getCall(0).args[1]).to.deep.equal({
          statusCode: 500,
          headers,
          body
        });
      });
    });
    describe('custom', () => {
      it("<instance>._callback return success gateway object with only status", () => {
        const res = new LambdaResponse({
          callback
        }).custom({
          status: 999
        });

        expect(callback.getCall(0).args[0]).to.deep.equal(null);
        expect(callback.getCall(0).args[1]).to.deep.equal({
          statusCode: 999
        });
      });

      it("<instance>._callback return success gateway object with status and headers", () => {
        let headers = {
          "Content-Type": "application/json"
        };

        const res = new LambdaResponse({
          callback
        }).custom({
          status: 999,
          headers
        });
        expect(callback.getCall(0).args[0]).to.deep.equal(null);
        expect(callback.getCall(0).args[1]).to.deep.equal({
          statusCode: 999,
          headers
        });
      });

      it("<instance>._callback return success gateway object with status, headers and object body", () => {
        let headers = {
          "Content-Type": "application/json"
        };

        let body = {
          data: 'test'
        };

        const res = new LambdaResponse({
          callback
        }).custom({
          status: 999,
          headers,
          body
        });
        expect(callback.getCall(0).args[0]).to.deep.equal(null);
        expect(callback.getCall(0).args[1]).to.deep.equal({
          statusCode: 999,
          headers,
          body: JSON.stringify(body)
        });
      });

      it("<instance>._callback return success gateway object with status, headers and string body", () => {
        let headers = {
          "Content-Type": "application/json"
        };

        let body = 'test';

        const res = new LambdaResponse({
          callback
        }).custom({
          status: 999,
          headers,
          body
        });
        expect(callback.getCall(0).args[0]).to.deep.equal(null);
        expect(callback.getCall(0).args[1]).to.deep.equal({
          statusCode: 999,
          headers,
          body
        });
      });
    });
  });
});