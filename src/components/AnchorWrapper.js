import { motion } from 'framer-motion'

const button = {
  rest: { scale: 1 },
  hover: { scale: 1.3 },
  pressed: { 
    scale: 2, 
    rotate: 360,
    transition: { duration: 0.4 } }
};

export default function AnchorWrapper ({
  className, style, children, onClick
}) {
  return (
     <motion.div
      variants={button}
      initial="rest"
      whileHover="hover"
      whileTap="pressed"
      onClick={onClick}
      style={style}
      className={`${className} anchor-wrapper`}
    >
      { children }
    </motion.div>
  )
}