const { exec } = require('child_process');

// Command to run the Python script
const pythonCommand = './venv/bin/python3 generate_text.py'; // Use 'python3' instead of 'python' if you are on macOS/Linux

// Execute the Python command
exec(pythonCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing Python script: ${error.message}`);
    return;
  }
 
  if (stderr) {
    console.error(`Python script error: ${stderr}`);
    return;
  }

  console.log(`Python script output: ${stdout}`);
});
