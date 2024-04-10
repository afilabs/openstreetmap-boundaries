import React, { useMemo, useRef, useState } from "react";
import { Select, Spin } from "antd";
import debounce from "lodash/debounce";

const DebounceSelect = ({ fetchOptions, debounceTimeout = 800, ...props }) => {
  // State to track fetching status and options
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  // Reference to track the current fetch request
  const fetchRef = useRef(0);

  // Debounce function to limit the rate of calls to fetchOptions
  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      // Increment fetchRef to create a new fetchId
      fetchRef.current += 1;
      const fetchId = fetchRef.current;

      // Reset options and set fetching status
      setOptions([]);
      setFetching(true);

      // Call fetchOptions and update options and fetching status
      fetchOptions(value).then((newOptions) => {
        // Check if the fetchId is still the same as the current fetchId
        if (fetchId !== fetchRef.current) {
          // If not, it means a new fetch has been initiated, so return early
          return;
        }
        // Update options and fetching status
        setOptions(newOptions);
        setFetching(false);
      });
    };

    // Debounce the loadOptions function to limit the rate of calls
    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  // Render the Select component with debounced search, loading spinner, and options
  return (
    <Select
      showSearch
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
};

export default DebounceSelect;
