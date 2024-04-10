// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";

// Custom hook to get the dimensions of a DOM element referenced by a ref
const useRefDimensions = (ref) => {
  // State to store the dimensions of the element
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Use a callback ref to ensure that the ref is up-to-date
    if (ref.current) {
      const { current } = ref;
      // Get the bounding rectangle of the element
      const boundingRect = current.getBoundingClientRect();
      const { width, height } = boundingRect;
      // Round the dimensions to integers
      const newWidth = Math.round(width);
      const newHeight = Math.round(height);

      // Update the dimensions in the state only if they have changed
      if (newWidth !== dimensions.width || newHeight !== dimensions.height) {
        setDimensions({ width: newWidth, height: newHeight });
      }
    }
  }, [ref, dimensions]); // Update the effect when the ref or dimensions change

  return dimensions;
};

export default useRefDimensions;
