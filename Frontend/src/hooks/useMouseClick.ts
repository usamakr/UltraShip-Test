import { useEffect } from "react";

function useMouseClick() {
  useEffect(() => {
    const handleMouseDown = (ev: MouseEvent) => {
      const clickedId = (ev.target as HTMLElement).id;
      const hasChildNodes = (ev.target as HTMLElement).hasChildNodes();
      console.log(`Mouse down on element with id: ${clickedId || "no id"}, and it ${hasChildNodes ? " has " : " does not have"} child nodes`);
    };

    const handleMouseUp = (ev: MouseEvent) => {
      const releasedId = (ev.target as HTMLElement).id;
      const hasChildNodes = (ev.target as HTMLElement).hasChildNodes();

      console.log(`Mouse up on element with id: ${releasedId || "no id"}, and it ${hasChildNodes ? " has " : " does not have"} child nodes`);
    };

    // Attach event listeners
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // Cleanup function to remove event listeners
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []); // Empty dependency array ensures this runs only once

  return 99; // Arbitrary return value for your example
}

export default useMouseClick;
