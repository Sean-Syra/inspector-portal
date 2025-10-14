const { ConfidentialClientApplication } = require('@azure/msal-node');
const { Client } = require('@microsoft/microsoft-graph-client');
require('isomorphic-fetch');
require('dotenv').config();

const msalConfig = {
  auth: {
    clientId: process.env.AZURE_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`,
    clientSecret: process.env.AZURE_CLIENT_SECRET,
  }
};

const cca = new ConfidentialClientApplication(msalConfig);

async function getAppToken() {
  const tokenResponse = await cca.acquireTokenByClientCredential({
    scopes: [process.env.GRAPH_SCOPES]
  });
  return tokenResponse.accessToken;
}

function getAuthenticatedClient() {
  const client = Client.init({
    authProvider: async (done) => {
      try {
        const token = await getAppToken();
        done(null, token);
      } catch (err) {
        done(err, null);
      }
    }
  });
  return client;
}

module.exports = { getAuthenticatedClient };
