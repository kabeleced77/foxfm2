import { ReactNode } from 'react'

export default function Section({ children }: { children: ReactNode }) {
  return <section className="w3-section">{children}</section>
}
