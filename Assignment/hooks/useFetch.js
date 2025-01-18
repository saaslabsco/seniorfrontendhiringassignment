import { useState, useEffect } from "react";

export const useFetch = (api) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const jsonResponse = await fetch(api);
        const result = await jsonResponse.json();
        setData(result);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [api]);

  return { data, error, loading };
};
