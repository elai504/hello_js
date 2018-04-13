Requirements:

npm/yarn (https://nodejs.org/en/download/) (https://yarnpkg.com/lang/en/docs/install/)；
mocha；
chai；
ngihtmare；

-------------------------


To Run test:
command ---   mocha build.test.js


-------------------------
simulate mailserver failover:


java -jar build/libs/siteminder-test-0.1.0.jar --mailgun.apiKey = <INSERT MAILGUN API KEY>   --sendgrid.apiKey = <INSERT SENDGRID API KEY HERE>

To simulate mailserver failover, we could run the backend with fake maigun api key or fake sendgrid api key.
