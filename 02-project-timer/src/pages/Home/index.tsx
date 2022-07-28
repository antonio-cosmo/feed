import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'
import { Play, HandPalm } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  Separator,
  MinutesAmountInput,
  StartCountdownButton,
  InterruptCountdownButton,
  TaskInput,
} from './styles'

const schema = z.object({
  task: z.string().min(1, 'Informe a tarefa'),
  minutesAmount: z
    .number()
    .step(5)
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
})

type formData = z.infer<typeof schema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date
  finishedDate?: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const { watch, register, handleSubmit, reset } = useForm<formData>({
    resolver: zodResolver(schema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const taskField = watch('task')
  const minutesAmountFiled = watch('minutesAmount')
  const isSubmitDisable = !taskField || !minutesAmountFiled

  const isActiveCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const totalSeconds = isActiveCycle ? isActiveCycle.minutesAmount * 60 : 0
  useEffect(() => {
    let interval: number
    if (isActiveCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          isActiveCycle.startDate,
        )

        if (secondsDifference >= totalSeconds) {
          setCycles((state) => {
            return state.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
              }
              return cycle
            })
          })
          setAmountSecondsPassed(totalSeconds)
          setActiveCycleId(null)
          clearInterval(interval)
        } else {
          setAmountSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [isActiveCycle, activeCycleId, totalSeconds])

  const handleSubmitCreateCycle = (data: formData) => {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0)

    reset()
  }

  const handleInterruptCycle = () => {
    setCycles((state) => {
      return state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptDate: new Date() }
        }
        return cycle
      })
    })
    setActiveCycleId(null)
  }

  const currentSeconds = isActiveCycle ? totalSeconds - amountSecondsPassed : 0
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    document.title = `Pomodoro ${minutes}:${seconds}`
  }, [minutes, seconds])

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleSubmitCreateCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            disabled={!!activeCycleId}
            {...register('task')}
          />
          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
          </datalist>
          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            disabled={!!activeCycleId}
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', {
              valueAsNumber: true,
            })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        {isActiveCycle ? (
          <InterruptCountdownButton
            onClick={handleInterruptCycle}
            type="button"
          >
            <HandPalm size={24} />
            Interromper
          </InterruptCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisable} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
