const assert = require('assert');
const ServerMock = require('mock-http-server');

describe('send-json', function() {
    const server = new ServerMock({ host: 'localhost', port: 9000 });
    const sendJson = require('../');
 
    beforeEach(function(done) {
        server.start(done);

        server.on({
            method: 'GET',
            path: '/resource',
            reply: {
                status: 200,
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ hello: 'world' })
            }
        });
    });
 
    afterEach(function(done) {
        server.stop(done);
    });

    it('can get resource', async function() {
        assert.deepEqual(await sendJson('GET', 'http://localhost:9000/resource'), { hello: 'world' });
    });
});
