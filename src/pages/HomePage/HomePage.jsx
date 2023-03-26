import React, { useEffect, useState } from "react";

import PageLoader from "../../components/PageLoader/PageLoader";

import styles from "./HomePage.module.scss";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  return isLoading ? <PageLoader /> : (
    <section>
      <h1>Home Page</h1>
    </section>
  );
};

export default HomePage;
