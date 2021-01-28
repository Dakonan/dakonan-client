import { AnimatePresence, motion } from 'framer-motion'

export default function PageWrapper ({ children, key, className, style }) {
  return (
    <AnimatePresence>
      <motion.div
        className={className}
        style={style}
        key={key}
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1, transition: { duration: 0.5 } }}
        exit={{ rotate: 360, opacity: 0 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}