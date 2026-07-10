'use strict';

function normalizeHost(value, fallback) {
    const host = typeof value === 'string' ? value.trim() : '';
    return host || fallback;
}

function resolveListenHosts(env) {
    const mqtt = normalizeHost(env.MQTT_HOST, '0.0.0.0');
    return {
        mqtt,
        udp: normalizeHost(env.UDP_HOST, mqtt),
        api: normalizeHost(env.API_HOST, '0.0.0.0')
    };
}

module.exports = { resolveListenHosts };
