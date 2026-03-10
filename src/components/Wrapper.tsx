import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  style?: React.CSSProperties
}

export default function PageWrapper({ children, style }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '3rem clamp(1rem,4vw,2.5rem) 6rem',
        ...style,
      }}
    >
      {children}
    </motion.div>
  )
}