import { useEffect } from 'react'
import {
  PlayerProfileStore,
  syncProfileWithBackend,
  updatePlayerProfileStore,
} from '../../store/player-profile-store'
import { backendHost } from '@/helper/make-post'

export function Survey() {
  useEffect(() => {
    async function connect() {
      if (!PlayerProfileStore.getRawState().key) {
        PlayerProfileStore.update(s => {
          s.key = 'pending'
        })
        const key = await (await fetch(`${backendHost}/newkey`)).text()
        if (key) {
          updatePlayerProfileStore(s => {
            s.key = key
          })
        }
      }
      await syncProfileWithBackend()
      const key = PlayerProfileStore.getRawState().key
      if (key !== 'pending') {
        const hash = window.location.hash
        if (hash === '#t1') {
          window.location.href =
            'https://docs.google.com/forms/d/e/1FAIpQLSdRRuGo-srifTkUsWa4vV6j0gJTcT9ckttZO9Afg2gPK1KRSw/viewform?usp=pp_url&entry.1646670068=' +
            key
        }
        if (hash === '#t2') {
          window.location.href =
            'https://docs.google.com/forms/d/e/1FAIpQLSe7AQaWI9e3WkYieGppWVjtJ41KsVSeSeuWGaNDqnV4d9xbOQ/viewform?usp=pp_url&entry.1695858332=' +
            key
        }
        if (hash === '#t3') {
          window.location.href =
            'https://docs.google.com/forms/d/e/1FAIpQLSfBFzMbFMvRZk1-fXo0Bs5TUF9UNyv17TQ3o_YsPgTEbmv8Rg/viewform?usp=pp_url&entry.468544013=' +
            key
        }
      }
    }
    connect()
  }, [])

  return <div>Du wirst gleich weitergeleitet</div>
}
