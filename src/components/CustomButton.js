import { motion } from 'framer-motion'

const button = {
  rest: { scale: 1 },
  hover: { scale: 1.3 },
  pressed: { scale: 2 }
};

export default function CustomButton ({ style, onClick, children }) {
  return (
    <motion.button
      variants={button}
      initial="rest"
      whileHover="hover"
      whileTap="pressed"
      style={style}
      onClick={onClick}
    >
      { children }
    </motion.button>
  )
}