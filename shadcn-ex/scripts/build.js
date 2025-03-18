const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const copyFile = promisify(fs.copyFile);
const mkdir = promisify(fs.mkdir);

const COMPONENTS_JSON_PATH = path.join(__dirname, "../src/components.json");
const SOURCE_DIR = path.join(__dirname, "../../shadcn-ex-templates/src");
const DEST_DIR = path.join(__dirname, "../dist");

async function copyFiles() {
    try {
        // Copy components.json & README.md
        await copyFile(COMPONENTS_JSON_PATH, path.join(DEST_DIR, "components.json"));
        await copyFile(path.join(__dirname, "../README.md"), path.join(DEST_DIR, "README.md"));

        // Read components.json
        const data = JSON.parse(fs.readFileSync(COMPONENTS_JSON_PATH, "utf-8"));
        const filesToCopy = new Set();

        // Collect all files from registry
        data.registry.forEach(component => {
            component.files.forEach(file => filesToCopy.add(file));
        });

        // Copy each file
        for (const file of filesToCopy) {
            const srcPath = path.join(SOURCE_DIR, file);
            const destPath = path.join(DEST_DIR, file);

            if (!fs.existsSync(srcPath)) {
                console.warn(`Warning: File not found: ${srcPath}`);
                continue;
            }

            await mkdir(path.dirname(destPath), { recursive: true });
            await copyFile(srcPath, destPath);
            console.log(`Copied: ${file}`);
        }
    } catch (error) {
        console.error("Error copying files:", error);
    }
}

copyFiles();
