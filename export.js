const fs = require("fs");

const { GROUP_NAMES, EXPORT_DIR } = require("./constants");
const { GROUPS } = require("./grouping");

const exportData = (data, totalMined) => {
  if (!fs.existsSync(`${EXPORT_DIR}`)) {
    fs.mkdirSync(`${EXPORT_DIR}`, { recursive: true });
  }

  data.forEach((groupData, i) => {
    const group = GROUPS[i];
    const groupName = GROUP_NAMES[group];

    Object.entries(groupData).forEach(([key, processedData]) => {
      console.log(`Saving to ${EXPORT_DIR}/${key}/${groupName}.json...`);
      if (!fs.existsSync(`${EXPORT_DIR}/${key}`)) {
        fs.mkdirSync(`${EXPORT_DIR}/${key}`, { recursive: true });
      }

      fs.writeFileSync(
        `${EXPORT_DIR}/${key}/${groupName}.json`,
        JSON.stringify(processedData)
      );
    });
  });

  console.log(`Saving to ${EXPORT_DIR}/totalMined.json...`);
  fs.writeFileSync(`${EXPORT_DIR}/totalMined.json`, totalMined);
};

module.exports = { exportData };
