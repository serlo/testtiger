import { useEffect } from 'react'

export function Survey() {
  useEffect(() => {
    window.location.href =
      'https://docs.google.com/forms/d/e/1FAIpQLSdx_OM8uvUXLcqE4-9MhM-SHuwxDaht02mk7qNkYZCCyAgwGQ/viewform?usp=pp_url&entry.2057626855=xyzabc'
  }, [])

  return <div>Du wirst gleich weitergeleitet</div>
}
