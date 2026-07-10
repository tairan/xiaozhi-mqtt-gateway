'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const { resolveListenHosts } = require('../utils/listen-hosts');

test('preserves all-interface defaults for existing deployments', () => {
    assert.deepEqual(resolveListenHosts({}), {
        mqtt: '0.0.0.0',
        udp: '0.0.0.0',
        api: '0.0.0.0'
    });
});

test('supports independent TCP, UDP, and management API bind addresses', () => {
    assert.deepEqual(resolveListenHosts({
        MQTT_HOST: '127.0.0.1',
        UDP_HOST: '192.0.2.10',
        API_HOST: '127.0.0.1'
    }), {
        mqtt: '127.0.0.1',
        udp: '192.0.2.10',
        api: '127.0.0.1'
    });
});

test('UDP inherits the MQTT bind address when it is not configured', () => {
    assert.equal(resolveListenHosts({ MQTT_HOST: '127.0.0.1' }).udp, '127.0.0.1');
});
