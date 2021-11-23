const { exec } = require("child_process");

exec("ls -l",(error, stdout,stderr)=>{
    console.log(`All files in this directory = ${stdout}`)
    if(error){
        console.log("Command not found: " + error.message)
    }
})

exec("pwd",(error, stdout,stderr)=>{
    console.log(`Present working directory = ${stdout}`)
})
