import React from 'react'
import { cn } from '@/lib/utils'

type Props = {
    children: React.ReactNode
    className?: string
}

const SectionWrapper = ({ children, className }: Props) => {
  return (
    <section className={cn('container mx-auto', className)}>{children}</section>
  )
}

export default SectionWrapper