const GhostAdminAPI = require('@tryghost/admin-api');
const URL_GHOST_API = "http://localhost:2368";
const GHOST_API_KEY = "616fd6fa1c668a248811438d:c7c8d630900c3f148a26d91d9b0a0ce5517b097e187c2b6c7ef9aafd9bfc66fd";
const GHOST_API_VERSION = "v3";

const ghostapi = new GhostAdminAPI({
    url : URL_GHOST_API,
    key : GHOST_API_KEY,
    version : GHOST_API_VERSION
});

module.exports = {ghostapi}