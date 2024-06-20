const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

const dirCodes = path.join(__dirname, 'codes');

if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = async (format, content) => {
    if (content === undefined) {
        throw new Error('Content is undefined');
    }

    const jobID = uuid();
    const filename = `${jobID}.${format}`;
    const filePath = path.join(dirCodes, filename);
    // console.log(filePath);
    await fs.writeFileSync(filePath, content);
    // console.log(filePath);
    return filePath;
};

module.exports = {
    generateFile
};
