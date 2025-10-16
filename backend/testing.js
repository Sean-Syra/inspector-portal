const { ConfidentialClientApplication } = require("@azure/msal-node");
require("dotenv").config();

const cca = new ConfidentialClientApplication({
  auth: {
    clientId: process.env.AZURE_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`,
    clientSecret: process.env.AZURE_CLIENT_SECRET
  }
});

cca.acquireTokenByClientCredential({
  scopes: ["https://graph.microsoft.com/.default"]
}).then(token => {
  console.log("✅ Token acquired");
  console.log(token.accessToken);
}).catch(err => console.error(err));
