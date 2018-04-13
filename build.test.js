const Nightmare = require('nightmare')
const assert = require('assert')


describe('retries', function() {
    // Retry all tests in this suite up to 4 times
    this.retries(4);

    beforeEach(function () {
        //browser.get('http://10.238.129.122:8080/');
        // initialize the browser using the same port as the test application
        this.browser = browser.get('http://10.238.129.122:8080/');
    });

    //it('should succeed on the 3rd try', function () {
    //    // Specify this test to only retry up to 2 times
    //    this.retries(2);
    //    expect($('.foo').isDisplayed()).to.eventually.be.true;
    //});


    it('should show contact a form', function() {
        assert.ok(this.browser.success);
        assert.equal(this.browser.text('h1'), 'Contact');
        assert.equal(this.browser.text('form label'), 'First NameLast NameEmailMessage');
    });

});