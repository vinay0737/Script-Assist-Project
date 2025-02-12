import { useEffect, useState } from "react";
import { Table, Button, Select } from "@mantine/core";
import { useAppStore } from "../../store/app.store";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion
import styles from "./Characters.module.scss";

const Characters = () => {
  const { characters, fetchCharacters } = useAppStore();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<"height" | "mass" | null>(null);

  useEffect(() => {
    fetchCharacters(page);
  }, [page]);

  const sortedCharacters = [...characters].sort((a, b) => {
    if (!sortBy) return 0;
    return parseInt(a[sortBy]) - parseInt(b[sortBy]);
  });

  return (
    <motion.div
      className={styles.charactersContainer}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Star Wars Characters
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Select
          className={styles.sortSelect}
          label="Sort by"
          placeholder="Select"
          data={[
            { value: "height", label: "Height" },
            { value: "mass", label: "Mass" },
          ]}
          onChange={(value) => setSortBy(value as "height" | "mass")}
        />
      </motion.div>

      <motion.table
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className={styles.characterTable}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Height</th>
            <th>Mass</th>
            <th>Birth Year</th>
          </tr>
        </thead>
        <tbody>
          {sortedCharacters.map((char, index) => {
            const characterId = char.url.split("/").filter(Boolean).pop();
            return (
              <motion.tr
                key={char.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <td>
                  <Link to={`/characters/${characterId}`}>{char.name}</Link>
                </td>
                <td>{char.height}</td>
                <td>{char.mass}</td>
                <td>{char.birth_year}</td>
              </motion.tr>
            );
          })}
        </tbody>
      </motion.table>

      <motion.div
        className={styles.pagination}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setPage(page + 1)}
        >
          Next
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Characters;
