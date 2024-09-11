import { Exercise } from '@/data/types'
import { exercise201 } from './implementations/NRW-MSA/201-2023-1-zahlen-ordnen'
import { exercise202 } from './implementations/NRW-MSA/202-2023-2-volumen-berechnen'

export const exercisesData: { [key: number]: Exercise<any> } = {
  201: exercise201,
  202: exercise202,
}
