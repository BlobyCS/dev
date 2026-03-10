import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springX = useSpring(cursorX, { stiffness: 800, damping: 40 })
  const springY = useSpring(cursorY, { stiffness: 800, damping: 40 })

  const isDown = useRef(false)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    const down = () => { isDown.current = true }
    const up   = () => { isDown.current = false }

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 6, height: 6,
          borderRadius: '50%',
          background: 'var(--green)',
          boxShadow: '0 0 8px var(--green)',
          pointerEvents: 'none',
          zIndex: 99999,
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      {/* Ring */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 28, height: 28,
          borderRadius: '50%',
          border: '1.5px solid rgba(127,255,0,0.6)',
          boxShadow: '0 0 12px rgba(127,255,0,0.2)',
          pointerEvents: 'none',
          zIndex: 99998,
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        whileTap={{ scale: 0.6 }}
      />
    </>
  )
}
