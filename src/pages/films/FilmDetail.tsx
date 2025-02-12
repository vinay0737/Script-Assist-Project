import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, Title, Table, Loader, Text } from "@mantine/core";
import { motion } from "framer-motion"; // Import Framer Motion
import styles from "./FilmDetail.module.scss";

const FilmDetail = () => {
  const [searchParams] = useSearchParams();
  const filmUrl = searchParams.get("url");
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilmDetails = async () => {
      if (!filmUrl) return;
      try {
        const res = await fetch(filmUrl);
        const data = await res.json();
        setFilm(data);
      } catch (error) {
        console.error("Error fetching film details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilmDetails();
  }, [filmUrl]);

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

  if (!film) return <Text>Error fetching film data.</Text>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className={styles.filmCard}>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Film Details
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Director</th>
                <th>Producer</th>
                <th>Release Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{film.title}</td>
                <td>{film.director}</td>
                <td>{film.producer}</td>
                <td>{film.release_date}</td>
              </tr>
            </tbody>
          </Table>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default FilmDetail;
