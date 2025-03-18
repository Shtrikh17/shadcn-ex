const { execSync } = require("child_process");
const path = require("path");

// Get the argument from command line (default to 'patch')
const versionType = process.argv[2] || "patch";
const validTypes = ["patch", "minor", "major"];

if (!validTypes.includes(versionType)) {
    console.error("Invalid version type. Use 'patch', 'minor', or 'major'.");
    process.exit(1);
}

try {
    console.log(`Bumping version (${versionType})...`);
    execSync(`npm version ${versionType}`, { stdio: "inherit" });

    console.log("Building project...");
    execSync(`node ${path.join(__dirname, "./build.js")}`, { stdio: "inherit" });

    console.log("Publishing to npm...");
    execSync("npm publish --access public", { stdio: "inherit"});

    console.log("✅ Published successfully!");
} catch (error) {
    console.error("❌ Error occurred:", error);
    process.exit(1);
}