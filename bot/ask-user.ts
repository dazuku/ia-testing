import { AgentExecutor } from 'langchain/agents'
import * as readline from 'readline'

export async function askUser(executor: AgentExecutor) {
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
   })
   
   let response = '';
   while (response != "salir") {
    response = await new Promise((resolve, reject) => {
     rl.question("Usuario: ", async userInput => {
     if (userInput == "salir") {
      resolve("salir")
     } else {
       const response = await executor.call({ input: userInput })
       console.log("Bot: " + response.output)
       resolve('')
     }
    })
   })
   }

   rl.close()
}