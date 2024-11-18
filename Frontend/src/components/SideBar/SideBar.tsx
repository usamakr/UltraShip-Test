import React from "react";
import { AnimatePresence, motion } from "framer-motion";

interface SideBarProps {
  open: boolean;
}

function SideBar({ open }: SideBarProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: -250 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -250 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-slate-300 w-64 h-full fixed left-0 top-0 z-10 p-2 flex flex-col items-center justify-between border-r-2 border-slate-600 shadow-inner inset-5"
        >
          <div>
            <p className="text-slate-600 font-bold text-2xl">Menu</p>
          </div>
          <div className="w-full h-full p-5">
            <p className="text-right pr-2 text-slate-600 font-bold text-lg hover:text-white">Menu option 1</p>
            <p className="text-right pr-2 text-slate-600 font-bold text-lg hover:text-white">Menu option 2</p>
            <p className="text-right pr-2 text-slate-600 font-bold text-lg hover:text-white">Menu option 3</p>
            <p className="text-right pr-2 text-slate-600 font-bold text-lg hover:text-white">Menu option 4</p>
            <p className="text-right pr-2 text-slate-600 font-bold text-lg hover:text-white">Menu option 5</p>
          </div>
          <div className="grid grid-cols-1 gap-2 w-full">
            <button className="bg-slate-200 text-black p-2 w-full font-bold rounded-md">Login</button>
            <button className="bg-blue-600 text-white p-2 w-full font-bold  rounded-md">Signup</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SideBar;
