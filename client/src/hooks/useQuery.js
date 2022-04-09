import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { DEFAULT_OPTION } from "../constrains/Products";
import { useMyContext } from "../context/Store";

const useQuery = (url, opt) => {
  const option = { ...DEFAULT_OPTION, ...opt };
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const { cache } = useMyContext();

  const clearCache = useCallback(() => {
    if (Object.keys(cache).length > option.sizeCache) {
      return (cache.current = {});
    }
  }, [cache, option.sizeCache]);

  useEffect(() => {
    // Kiểm tra trong cache đã tồn tại url được lưu trước đó hay chưa
    if (cache.current[url]) {
      setData(cache.current[url]);
    }

    let here = true;

    const delayDebounce = setTimeout(
      () => {
        axios
          .get(url)
          .then((response) => {
            if (here) {
              setData(response.data);

              if (option.saveCache) {
                // Thêm sản dữ liệu vào trong cache
                cache.current[url] = response.data;
              }
            }
          })
          .catch((err) => {
            if (here) {
              setError(err);
            }
          });
      },
      cache.current[url] ? option.refreshInterval : 0
    );

    clearCache();

    return () => {
      here = false;
      clearTimeout(delayDebounce);
    };
  }, [url, cache, clearCache, option.refreshInterval, option.saveCache]);

  return { data, loading, error };
};

export default useQuery;
