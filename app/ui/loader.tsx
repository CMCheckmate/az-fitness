'use client';

import { motion } from 'framer-motion';

export default function Loader({ component }: { component: React.ReactNode }) {
    return (
        <motion.div initial='hidden' animate='visible' variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.5 } } }}>
            {component}
        </motion.div>
    );
}
