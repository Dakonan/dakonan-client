import { motion } from 'framer-motion'

export default function RowWrapper ({ children, className }) {
  return (
    <motion.tr
      whileHover={{ scale: 1.04 }}
      initial={{ scale: 1 }}
      className={className}
    >
      { children }
    </motion.tr>
  )
}