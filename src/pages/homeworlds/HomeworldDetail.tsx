import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, Title, Table, Loader, Text } from "@mantine/core";
import { motion } from "framer-motion"; // Import Framer Motion
import styles from "./HomeworldDetail.module.scss";

const HomeworldDetail = () => {
  const [searchParams] = useSearchParams();
  const homeworldUrl = searchParams.get("url");
  const [homeworld, setHomeworld] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeworldDetails = async () => {
      if (!homeworldUrl) return;
      try {
        const res = await fetch(homeworldUrl);
        const data = await res.json();
        setHomeworld(data);
      } catch (error) {
        console.error("Error fetching homeworld details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeworldDetails();
  }, [homeworldUrl]);

  if (loading)
    return (
      <motion.div
        className={styles.loaderContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Loader size="lg" />
      </motion.div>
    );

  if (!homeworld) return <Text>Error fetching homeworld data.</Text>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className={styles.homeworldCard}>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Homeworld Details
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Table>
            <thead>
              <motion.tr
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <th>Name</th>
                <th>Diameter</th>
                <th>Climate</th>
                <th>Population</th>
              </motion.tr>
            </thead>
            <tbody>
              <motion.tr
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <td>{homeworld.name}</td>
                <td>{homeworld.diameter}</td>
                <td>{homeworld.climate}</td>
                <td>{homeworld.population}</td>
              </motion.tr>
            </tbody>
          </Table>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default HomeworldDetail;
