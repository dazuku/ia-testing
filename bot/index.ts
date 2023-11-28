import dotenv from 'dotenv'
import { initializeAgentExecutorWithOptions } from 'langchain/agents'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { DynamicTool } from 'langchain/tools'
import { askUser } from './ask-user'

dotenv.config()

const model = new ChatOpenAI({ temperature: 0, modelName: 'gpt-4' })
const port = process.env.PORT || 3000

const tools = [
  new DynamicTool({
    name: "Obtener información de colaborador",
    description: "Obtener información de colaborador. Requiere un termino de busqueda.",
    func: async (searchTerm: string) => {
      const response = await fetch(`localhost:${port}/user/${searchTerm}`)
      const data = await response.json()

      return JSON.stringify(data)
    }
  }),
  new DynamicTool({
    name: "Cambiar colaborador de equipo",
    description: "Cambiar colaborador de equipo. Requiere un objeto json con id y team. El equipo debe ser proporcionado por el usuario.",
    func: async (input) => {
      try {
        const body = JSON.parse(input)
        const response = await fetch(`localhost:${port}/user`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: input,
        })
        const data = await response.json()
        if (response.status === 200) {
          return 'Exitosamente cambiado de equipo'
        }

        return `Ocurrio un error: ${JSON.stringify(data)}`
      } catch (error) {
        return `Ocurrio un error: ${error.message}`
      }
    }
  })
];

const executor = await initializeAgentExecutorWithOptions(tools, model, {
  agentType: 'chat-conversational-react-description',
  verbose: false,
});

await executor.call({ input: "Muestra respeto respondiendo solo en español"});

await askUser(executor);