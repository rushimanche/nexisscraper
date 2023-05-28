import React, { useState } from "react";
import "./App.css";
import { useArticles } from "./hooks/useArticles";

function App() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { articles, isLoading, error } = useArticles(startDate, endDate);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    if (name === "startDate") {
      setStartDate(value);
    } else if (name === "endDate") {
      setEndDate(value);
    }
  };

  const groupedArticles: { [key: string]: any[] } = {};
  if (Array.isArray(articles)) {
    articles.forEach((article: any) => {
      const company = article.company_name;
      if (!groupedArticles[company]) {
        groupedArticles[company] = [];
      }
      groupedArticles[company].push(article);
    });
  }

  return (
    <main className="min-h-screen flex-col items-center justify-between p-24">
      <div className="">
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={startDate}
          onChange={handleChange}
          className="mr-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={endDate}
          onChange={handleChange}
          className="mr-2 p-2 border border-gray-300 rounded"
        />
      </div>
      {isLoading && <div className="spinner">Loading...</div>}
      {!isLoading && error && <div>Error: {error}</div>}
      {!isLoading && !error && (
        <div className="z-10 w-full max-w-5xl justify-between font-mono text-sm lg:flex">
          {Object.entries(groupedArticles).map(([company, articles]) => (
            <div key={company} className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{company}</h2>

              <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                {articles.map((article: any) => (
                  <div
                    key={article.id}
                    className="w-full max-w-sm block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
                  >
                    <h5 className="mb-2 flex items-center text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                      <span>{article.company_name}</span>
                      <span className="ml-2 text-base text-neutral-600 dark:text-neutral-200">
                        {new Date(article.date_time).toLocaleString()}
                      </span>
                    </h5>
                    <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                      {article.text}
                    </p>
                    <a
                      href={article.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                    >
                      Link to article
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default App;
