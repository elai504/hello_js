const Nightmare = require('nightmare');
var should = require('chai').should();


describe('Test Email Sender', function () {
    this.timeout('30s');

    var url = 'http://10.238.129.122:8080/';
    var to_selector = '#app > form > div:nth-child(2) > div > div.multiselect__tags > span > span';
    var cc_selector = '#app > form > div:nth-child(3) > div > div.multiselect__tags > input';
    var bcc_selector = '#app > form > div:nth-child(4) > div > div.multiselect__tags > input';
    var from_selector = '#app > form > div:nth-child(5) > input';
    var subject_selector = '#app > form > div:nth-child(6) > input';
    var body_selector = '#app > form > div:nth-child(7) > textarea';
    var submit_selector = '#app > form > button';

    let nightmare = null;

    beforeEach(() => {
        nightmare = new Nightmare()
    });

    afterEach(function () {
        //console.log("afterEach: test finished");
    });

    it('Should load the home page without error', done => {
        nightmare.goto(url)
            .end()
            .then(function (result) {
                done()
            })
            .catch(done)
    });

    it('should fail if no subject was provided', done => {
        // your actual testing urls will likely be `http://localhost:port/path`
        var expected = 'The subject is required.';

        nightmare.goto(url)
            .type(from_selector, 'from@gmail.com')
            .type(body_selector, 'plain body')
            .click(submit_selector)
            .wait()
            .evaluate(() => document.querySelector('#app > form > div.form-group.has-error > p').innerText)
            .end()
            .then(element => {
                element.should.equal(expected);
                done();
            })
    });

    it('should fail if no content was provided', done => {
        // your actual testing urls will likely be `http://localhost:port/path`
        var expected = 'The text is required.';

        nightmare.goto(url)
            .type(from_selector, 'from@gmail.com')
            .type(subject_selector, 'subject')
            .click(submit_selector)
            .wait()
            .evaluate(() => document.querySelector('#app > form > div.form-group.has-error > p').innerText)
            .end()
            .then(element => {
                element.should.equal(expected);
                done();
            })
    });

    it('should fail if the from email address is invalid', done => {
        // your actual testing urls will likely be `http://localhost:port/path`
        var expected = 'The from must be a valid email.';

        nightmare.goto(url)
            .on('page', (type, message) => {
                if (type === 'error') done()
            })
            .type(subject_selector, 'subjext')
            .type(body_selector, 'plain body')
            .type(from_selector, 'gmail.com')
            .click(submit_selector)
            .wait()
            .evaluate(() => document.querySelector('#app > form > div.form-group.has-error > p').innerText)
            .end()
            .then(element => {
                element.should.equal(expected);
                done();
            });
    });

    it('Should fail if nothing was provided and sumbit', done => {
        var expected = 'The text is required.';

        nightmare
            .goto(url)
            .on('page', (type, message) => {
                if (type == 'error') done()
            })
            .click(submit_selector)
            .wait(2000)
            .evaluate(() => document.querySelector('#app > form > div:nth-child(7) > p').innerText)
            .end()
            .then(element => {
                element.should.equal(expected);
                done();
            });
    });

    it('should fail if the to address is not provided', done => {
        // your actual testing urls will likely be `http://localhost:port/path`
        var expected = 'Please add someone to mail to.';

        nightmare.goto(url)
            .on('page', (type, message) => {
                cosole.log(message)
                if (type === 'error') done()
            })
            .type(subject_selector, 'subjext')
            .type(body_selector, 'plain body')
            .type(from_selector, 'from@gmail.com')
            .click(submit_selector)
            .wait()
            .evaluate(() => document.querySelector('#easy-toast-default > span').innerText)
            .end()
            .then(element => {
                element.should.equal(expected);
                done();
            });
    });

    it('Should success if all the mandatory info was provided', done => {
        var expected = 'success';

        nightmare
            .goto(url)
            .type(to_selector, 'to1@gmail.com')
            .type(to_selector, '\u000d')
            .type(to_selector, 'to2@gmail.com')
            .type(to_selector, '\u000d')
            .type(cc_selector, 'cc1@gmail.com')
            .type(to_selector, '\u000d')
            .type(cc_selector, 'cc2@gmail.com')
            .type(to_selector, '\u000d')
            .type(bcc_selector, 'bcc1@gmail.com')
            .type(to_selector, '\u000d')
            .type(bcc_selector, 'bcc2@gmail.com')
            .type(to_selector, '\u000d')
            .type(from_selector, 'from@gmail.com')
            .type(subject_selector, 'subject')
            .type(body_selector, 'plain body')
            .click(submit_selector)
            .wait()
            .evaluate(() => document.querySelector('#easy-toast-default > span').innerText)
            .end()
            .then(element => {
                element.should.equal(expected);
                done();
            });
    });
})