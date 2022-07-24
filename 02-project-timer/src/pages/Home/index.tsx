import { Play } from 'phosphor-react'
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

export function Home() {
  const { watch, register, handleSubmit, reset } = useForm<formData>({
    resolver: zodResolver(schema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })
  const handleSubmitCreateTask = (data: formData) => {
    console.log(data)
    reset()
  }
  const taskField = watch('task')
  const minutesAmountFiled = watch('minutesAmount')
  const isSubmitDisable = !taskField || !minutesAmountFiled

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleSubmitCreateTask)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
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
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisable} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
