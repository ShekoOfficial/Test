const status = require("../assets/json/status.json");

module.exports = client => {
  console.log(`${client.user.tag} GoGoGo 1!1!11!`);
  setInterval(() => client.updateStats(), 1000 * 60);
  client.user.setActivity("r!help, Marry Chritsmas! 🐇", { type: "PLAYING" }, { status: "idle" });
  client.moeJP.connect();
  client.moeKR.connect();
};
