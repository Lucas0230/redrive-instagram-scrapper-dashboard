import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { RedriveQueueTask } from "../types"
import { CheckIcon, Cross2Icon, PauseIcon } from "@radix-ui/react-icons"

type TaskStatus = RedriveQueueTask['status'];

type Props = {
  status: TaskStatus
}

export function TaskStatus({ status }: Props) {

  const CONTENT: { [k in TaskStatus]: string } = {
    'WAITING': 'Aguardando para entrar na fila do redrive...',
    'FINISHED': 'Finalizado',
    'FAILED': 'Essa busca falhou',
    'RUNNING': 'Coletando...',
    'PENDING': 'Aguardando na fila do redrive...',
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger >

          {status == 'FAILED' && (
            <div className="w-fit p-0.5 bg-red-400 rounded-md flex items-center justify-center">
              <Cross2Icon className="w-4 h-4 text-white" />
            </div>
          )}

          {status == 'WAITING' && (
            <div className="w-fit p-0.5 bg-yellow-400 rounded-md flex items-center justify-center">
              <PauseIcon className="w-4 h-4 text-white" />
            </div>
          )}

          {status == 'PENDING' && (
            <div className="w-fit p-0.5 bg-orange-400 rounded-md flex items-center justify-center">
              <PauseIcon className="w-4 h-4 text-white" />
            </div>
          )}

          {status == 'FINISHED' && (
            <div className="w-fit p-0.5 bg-green-400 rounded-md flex items-center justify-center">
              <CheckIcon className="w-4 h-4 text-white" />
            </div>
          )}

          {status == 'RUNNING' && (
            <div className="w-fit p-1 bg-sky-500 rounded-md flex items-center justify-center">
              <svg
                className="animate-spin text-white w-3 h-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            </div>
          )}

        </TooltipTrigger>

        <TooltipContent >
          <p>{CONTENT[status]}</p>
        </TooltipContent>

      </Tooltip>
    </TooltipProvider>
  )
}
