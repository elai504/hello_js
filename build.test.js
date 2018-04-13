const Nightmare = require('nightmare');
const chai = require('chai');
var should = require('chai').should();

describe('Test Email Sender', function () {
    this.timeout('30s');
    var url='http://10.238.129.122:8080/';
    let nightmare = null;

    beforeEach(() => {
        nightmare = new Nightmare()
    });

    it('Should load the home page without error', done => {
        // your actual testing urls will likely be `http://localhost:port/path`
        nightmare.goto()
            .end()
            .then(function (result) {
                done()
            })
            .catch(done)
    });

    it('Should fail if nothing was provided and sumbit', done => {
        nightmare
            .goto(url)
            .on('page', (type, message) => {
                if (type == 'error') done()
            })
            .click('#app > form > button')
            .wait(2000)
            .evaluate(function () {
                return document.querySelectorAll('#app > form > div:nth-child(5) > p');
            }, function (result) {
                result.should.equal('The from is required.');
                done();
            })
            .run();
    });

    it('should fail if no subject was provided', done => {
        // your actual testing urls will likely be `http://localhost:port/path`
        var expected = 'The subject is required.';

        nightmare.goto(url)
            .on('page', (type, message) => {
                if (type === 'error') done()
            })
            .click('#app > form > button')
            .wait(2000)
            .evaluate(function () {
                return document.querySelector('#app > form > div:nth-child(6) > p');
            }, function (element) {
                element.innerText.should.equal(expected);
                done();
            })
            .run()
            .catch(done);
    });

    it('should fail if no From was provided', done => {。。。。。。});
    expected = 'The from is required.';

    it('Should fail if no body was provided', done => {。。。。。。});
    expected = 'The text is required.';

    it('should fail if the from email address is invalid', done => {
        // your actual testing urls will likely be `http://localhost:port/path`
        var expected = 'The from must be a valid email.';

        nightmare.goto(url)
            .on('page', (type, message) => {
                if (type === 'error') done()
            })
            .type('#app > form > div:nth-child(6) > input', 'subjext')
            .type('#app > form > div:nth-child(7) > textarea', 'plain body')
            .type('#app > form > div:nth-child(5) > input', 'gmail.com')
            .click('#app > form > button')
            .wait(2000)
            .evaluate(function () {
                return document.querySelector('#app > form > div.form-group.has-error > p');
            }, function (element) {
                element.innerText.should.equal(expected);
                done();
            })
            .run()
            .catch(done);
    });

    it('Should success if all the mandatory info was provided', done => {
        var expected = 'success';

        nightmare
            .goto(url)
            .type('#app > form > div:nth-child(2) > div > div.multiselect__tags > span', 'to@gmail.com')
            .type('#app > form > div:nth-child(5) > input', 'cc@gmail.com')
            .type('#app > form > div:nth-child(4) > div > div.multiselect__tags > span > span', 'bcc@gmail.com')
            .type('#app > form > div:nth-child(6) > input', 'subjext')
            .type('#app > form > div:nth-child(7) > textarea', 'plain body')
            .click('#app > form > button')
            .wait(2000)
            .evaluate(function () {
                return document.querySelector('#result');
            }, function (element) {
                element.innerText.should.equal(expected);
                done();
            })
            .run();
    });

    it('Should success for mutliple email recipients, CCs and BCCs', done => {。。。。。。});
    it('Should success without CCs', done => {。。。。。。});
    it('Should success without BCCs', done => {。。。。。。});


})