const simpleGit = require("simple-git");
const git = simpleGit();

// Importing the file system module
const fs = require('fs');          
 // Importing the path module
const path = require('path');     

// Define the source directory
const sourceDir = './source';

// Define destination directories for different file types
const featureDestDir = './features';  // Folder for .feature files
const javaDestDir = './step-definitions';        // Folder for .java files

// Get the list of files from the source directory
const files = fs.readdirSync(sourceDir);           // Reads the content of the source directory


async function uploadToGit() {
  
files.forEach((file) => {
  // Check if the file is a .feature file
  if (file.endsWith('.feature')) {
    const sourceFeatureFilePath = path.join(sourceDir, file);
    const destFeatureFilePath = path.join(featureDestDir, file);  // Move to feature destination directory
    
    if (!fs.existsSync(destFeatureFilePath)) {

    // Move the file from source to destination
    fs.renameSync(sourceFeatureFilePath, destFeatureFilePath);           // Synchronous file move
    console.log(`Feature file automatically moved to destination folder: ${file}`);
  } else {
    console.log(`File already exists in destination: ${file}`);
  }
}
  // Check if the file is a .java file
   if (file.endsWith('.java')) {
    const sourceJavaFilePath = path.join(sourceDir, file);
    const destJavaFilePath = path.join(javaDestDir, file);     // Move to java destination directory

    if (!fs.existsSync(destJavaFilePath)) {

    // Move the file from source to destination
    fs.renameSync(sourceJavaFilePath, destJavaFilePath);           // Synchronous file move
    console.log(`Java file automatically moved to destination folder: ${file}`);
  } else {
      console.log(`File already exists in destination: ${file}`);
    }
}
});

await git.add("./*"); // Add all files
await git.commit("Folder commit"); // Commit changes

    // Check if the remote "origin" already exists
    const remotes = await git.getRemotes(true); // List all remotes with detailed info
    const originRemote = remotes.find((remote) => remote.name === "origin");

    // Push to the main branch
    await git.push("origin", "main");
   // console.log("Git Repo updated" + git.log);
}
uploadToGit();