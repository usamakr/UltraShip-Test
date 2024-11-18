import React, { useState, useEffect, useRef } from "react";
import { IconType } from "react-icons/lib";
import { AnimatePresence, motion } from "framer-motion";
// Icons
import { MdKeyboardArrowRight as RightArrow } from "react-icons/md";
import classNames from "classnames";

interface ButtonProps {
  expandBelow?: boolean;
  title: string;
  icon?: IconType;
  children?: React.ReactNode;
}

function Button({ title, icon: Icon, children, expandBelow = false }: ButtonProps) {
  const [subMenuState, setSubMenuState] = useState<boolean>(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const toggleSubMenu = () => {
    setSubMenuState((prev) => !prev);
  };

  const closeSubMenu = () => {
    setSubMenuState(false);
  };

  // Close submenu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        closeSubMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative z-0" ref={buttonRef}>
      {/* Main Button */}
      <div className="bg-blue-600 p-3 cursor-pointer flex items-center justify-start space-x-2 relative group" onClick={toggleSubMenu}>
        <div className="absolute left-0 bottom-0 w-full h-1 bg-transparent group-hover:bg-blue-300 transition-colors duration-300"></div>
        <p className="text-white text-left font-bold uppercase select-none text-nowrap">{title}</p>
        {Icon && <Icon className="text-white" />}
        {/* {children ? <RightArrow className="text-white absolute right-[4px] opacity-0 group-hover:opacity-100 duration-300" size={30} /> : null} */}
      </div>

      {/* Submenu */}
      <AnimatePresence>
        {subMenuState && (
          <motion.div initial={{ opacity: 0, x: 0 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 0 }} transition={{ duration: 0.1, ease: "easeInOut" }}>
            {children ? (
              <div className={classNames("ml-0.5 absolute  bg-white shadow-md border-r-2", `${expandBelow ? "left-[0px] top-[50px]" : "left-[150px] top-[00px]"}`)}>{children}</div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Button;
