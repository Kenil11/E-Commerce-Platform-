const env = require("../constant/env");
const { MailtrapClient } = require("mailtrap");

const mailtrap = new MailtrapClient({
  token: env.MAILTRAP_API_KEY,
});

module.exports = mailtrap;