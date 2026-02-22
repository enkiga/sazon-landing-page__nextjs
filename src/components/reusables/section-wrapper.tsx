import React from 'react'
import { cn } from '@/lib/utils'

type Props = {
    children: React.ReactNode
    className?: string
}

const SectionWrapper = ({ children, className }: Props) => {
  return (
    <section className={cn('container mx-auto px-8 md:px-10 lg:px-6', className)}>{children}</section>
  )
}

export default SectionWrapper