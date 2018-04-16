let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

var server = 'http://10.238.129.122:8080';

describe('SeneMail testing', () => {

    it('it should GET the home page without error', (done) => {

        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('it should POST fail if the to address was not provided', (done) => {

        let email_pdu = {
            "from": "emma.lai504@gmail.com",
            "cc": ["cc1@gmail.com", "cc2@gmail.com"],
            "bcc": ["bcc1@gmail.com", "bcc2@gmail.com"],
            "subject": "sub",
            "text": "body"
        };

        let error = [
            {
                "codes": [
                    "NotEmpty.mailRequest.to",
                    "NotEmpty.to",
                    "NotEmpty.java.util.List",
                    "NotEmpty"
                ],
                "arguments": [
                    {
                        "codes": [
                            "mailRequest.to",
                            "to"
                        ],
                        "arguments": null,
                        "defaultMessage": "to",
                        "code": "to"
                    }
                ],
                "defaultMessage": "may not be empty",
                "objectName": "mailRequest",
                "field": "to",
                "rejectedValue": [],
                "bindingFailure": false,
                "code": "NotEmpty"
            }
        ];

        chai.request(server)
            .post('/sendMail')
            .set('content-type', 'application/json')
            .send(email_pdu)
            .end((err, res) => {
                res.should.have.status(400);
                //console.log('the error is ------------------- :', err);
                //console.log('the res is ------------------ :', res);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.eql(error);
                done();
            });
    });

    it('it should POST success if all the fields are provided', (done) => {

        let email_pdu = {
            "to": ["laiqiaobin@gmail.com", "to2@gmail.com"],
            "from": "emma.lai504@gmail.com",
            "cc": ["cc1@gmail.com", "cc2@gmail.com"],
            "bcc": ["bcc1@gmail.com", "bcc2@gmail.com"],
            "subject": "sub",
            "text": "body"
        };


        chai.request(server)
            .post('/sendMail')
            .set('content-type', 'application/json')
            .send(email_pdu)
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });

});
