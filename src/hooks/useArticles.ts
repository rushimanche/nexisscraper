import { useState, useEffect, useCallback } from "react";

export const useArticles = (startDate: any, endDate: any) => {
  const [articles, setArticles] = useState([] as any);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

    const updateArticles = useCallback((data: any) => {
        setArticles(data);
        setLoading(false);
        setError("");
      }, []);

      useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true);
            const apiUrl = new URL(`${process.env.REACT_APP_API}data`);
            if (startDate && endDate) {
              apiUrl.searchParams.set("startDate", startDate);
              apiUrl.searchParams.set("endDate", endDate);
            }
            const response = await fetch(apiUrl.toString());
            const isJsonResponse = response.headers
              ?.get("content-type")
              ?.includes("application/json");
            const responseData = isJsonResponse && (await response.json());
            console.log(responseData)    
              setArticles(responseData);
              setLoading(false);
              setError("");
          } catch (error: any) {
            setLoading(false);
            setError(error.message || "Something went wrong");
    
      
          }
        };
    
        fetchData();
    
    }, [endDate, updateArticles]);

    return {
        articles,
        isLoading,
        error,
        setLoading,
      };
    };