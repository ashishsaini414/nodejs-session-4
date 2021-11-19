

const buff = Buffer.from("this is an example of buffer")
console.log(buff)
console.log(buff.toString())
console.log("------------------------------------------------------")

const buff2 = Buffer.alloc(10)
buff2.write("ashish")
console.log(buff2)
console.log(buff2.toString())
