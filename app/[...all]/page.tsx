import dynamic from 'next/dynamic'
import { lists } from '../../mock'

const App = dynamic(() => import('../../components/AppShell'), {
  ssr: false,
})

export async function generateStaticParams() {
  return [
    { all: ['onboarding'] },
    { all: ['name'] },
    { all: ['schoolform'] },
    { all: ['federal'] },
    { all: ['focus'] },
    { all: ['ready'] },
    { all: ['app'] },
    { all: ['app', 'home'] },
    { all: ['app', 'superskills'] },
    { all: ['app', 'search'] },
    { all: ['app', 'participate'] },
    { all: ['app', 'profile'] },
    { all: ['feed'] },
    { all: ['lists'] },
    ...lists.map(list => ({ all: ['lists', list.id] })),
    { all: ['settings'] },
  ]
}

export default function Page() {
  return <App />
}
