const { expect } = require('chai');
let LambdaResponse = require('../index');

describe('index', () => {

    let res;

    before(() => {
        res = new LambdaResponse({
            callback: () => {}
        });
    });

    it('import success function', () => expect(res.success).to.be.a('function'));
    it('import error function', () => expect(res.error).to.be.a('function'));
    it('import custom function', () => expect(res.custom).to.be.a('function'));
    it('import _send function', () => expect(res._send).to.be.a('function'));
});