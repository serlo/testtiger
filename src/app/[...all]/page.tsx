import dynamic from 'next/dynamic'
import { lists } from '../../../mock'
import { exercisesData } from '@/content/exercises'
import { navigationData } from '@/content/navigations'

const App = dynamic(() => import('../../components/AppShell'), {
  ssr: false,
})

export async function generateStaticParams() {
  return [
    { all: ['ki-test'] },
    { all: ['onboarding'] },
    { all: ['name'] },
    { all: ['schoolform'] },
    { all: ['federal'] },
    { all: ['focus'] },
    { all: ['ready'] },
    { all: ['app'] },
    { all: ['app', 'home'] },
    { all: ['app', 'listOfAllExercises'] },
    { all: ['app', 'topicsOverview'] },
    { all: ['app', 'profile'] },
    { all: ['feed'] },
    { all: ['contact'] },
    { all: ['privacy'] },
    { all: ['feedback'] },
    { all: ['video'] },
    { all: ['lists'] },
    { all: ['survey'] },
    { all: ['exercise', '123456'] },
    ...lists.map(list => ({ all: ['lists', list.id] })),
    { all: ['settings'] },
    ...[1, 2, 3, 4, 5, 6].map(t => ({ all: ['topic', t.toString()] })),
    ...Array.from({ length: navigationData[2].topics.length }).map((_, i) => ({
      all: ['topic', (101 + i).toString()],
    })),
    ...Array.from({ length: navigationData[3].topics.length }).map((_, i) => ({
      all: ['topic', (201 + i).toString()],
    })),
    ...Object.keys(exercisesData).map(id => ({
      all: ['exercise', id],
    })),
  ]
}

export default function Page() {
  return <App />
}
