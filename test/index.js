'use strict';

// Load external modules
const Hapi = require('hapi');
const Lab = require('lab');

// Load internal modules
const HapiAwsCloudsearch = require('..');

// Test shortcuts
const lab = exports.lab = Lab.script();
const expect = Lab.assertions.expect;

let server;
let plugin;

lab.describe('HapiAwsCloudsearch', () => {
  lab.describe('register', () => {
    lab.beforeEach((done) => {
      server = new Hapi.Server();
      plugin = {
        register: HapiAwsCloudsearch,
        options: {
          region: 'us-west-1',
          endpoint: 'https://www.ideapod.com'
        }
      };
      done();
    });
    lab.it('registers this hapi plugin', (done) => {
      server.register(plugin, (err) => {
        expect(err).to.not.exist();
        expect(server.plugins['hapi-aws-cloudsearch'].search).to.be.object();
        done();
      });
    });
    lab.it('throws an error if params are invalid', (done) => {
      plugin.options = 0;
      server.register(plugin, (err) => {
        expect(err).to.exist();
        expect(server.plugins['hapi-aws-cloudsearch']).to.not.exist();
        done();
      });
    });
  });
});
