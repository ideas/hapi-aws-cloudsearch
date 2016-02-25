'use strict';

// Load external modules
const Hapi = require('hapi');
const Lab = require('lab');

// Load internal modules
const HapiAwsCloudsearch = require('..');

// Test shortcuts
const lab = exports.lab = Lab.script();
const expect = Lab.assertions.expect;


lab.describe('HapiAwsCloudsearch', () => {
  lab.describe('register', () => {
    lab.it('registers this hapi plugin', (done) => {
      const server = new Hapi.Server();
      const plugin = {
        register: HapiAwsCloudsearch,
        options: {
          region: 'us-west-1',
          endpoint: 'http://ec2.us-west-1.amazonaws.com'
        }
      };
      server.register(plugin, (err) => {
        expect(err).to.not.exist();
        expect(server.plugins['hapi-aws-cloudsearch'].search).to.be.object();
        done();
      });
    });

    lab.it('throws an error if params are invalid', (done) => {
      const server = new Hapi.Server();
      const plugin = {
        register: HapiAwsCloudsearch,
        options: 0
      };
      server.register(plugin, (err) => {
        expect(err).to.exist();
        expect(server.plugins['hapi-aws-cloudsearch']).to.not.exist();
        done();
      });
    });
  });
});
