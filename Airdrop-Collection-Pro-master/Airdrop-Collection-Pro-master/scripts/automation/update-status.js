const fs = require('fs');
const path = require('path');
const { DateTime } = require('luxon');

function updateAllAirdrops() {
  const airdropDirs = [
    'active',
    'upcoming'
  ];

  airdropDirs.forEach(dir => {
    const airdropsPath = path.join(__dirname, '..', 'airdrops', dir);
    const airdrops = fs.readdirSync(airdropsPath);

    airdrops.forEach(airdrop => {
      const configPath = path.join(airdropsPath, airdrop, 'config.json');
      if (fs.existsSync(configPath)) {
        const config = JSON.parse(fs.readFileSync(configPath));
        const now = DateTime.now();
        const endDate = DateTime.fromISO(config.endDate);

        if (now > endDate) {
          // Move to completed
          const newPath = path.join(__dirname, '..', 'airdrops', 'completed', airdrop);
          fs.renameSync(
            path.join(airdropsPath, airdrop),
            newPath
          );

          // Update status
          config.status = 'completed';
          fs.writeFileSync(
            path.join(newPath, 'config.json'),
            JSON.stringify(config, null, 2)
          );
        }
      }
    });
  });
}

updateAllAirdrops();
