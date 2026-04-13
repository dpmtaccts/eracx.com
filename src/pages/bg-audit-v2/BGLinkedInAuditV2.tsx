import { useEffect } from 'react'
import AuditReport from './AuditReport'
import data from './audit-data.json'

export default function BGLinkedInAuditV2() {
  useEffect(() => {
    document.title = 'LinkedIn Audit — Brian Gonsalves'
  }, [])

  // The JSON shape matches AuditReportProps['data']; cast through unknown to satisfy TS
  return <AuditReport data={data as unknown as Parameters<typeof AuditReport>[0]['data']} />
}
