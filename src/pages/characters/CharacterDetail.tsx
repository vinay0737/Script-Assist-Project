import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Title, Text, Loader } from "@mantine/core";
import { motion } from "framer-motion"; // Import Framer Motion
import styles from "./CharacterDetail.module.scss";

const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        const res = await fetch(`https://swapi.dev/api/people/${id}/`);
        const data = await res.json();
        setCharacter(data);
      } catch (error) {
        console.error("Error fetching character details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterDetails();
  }, [id]);

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

  if (!character) return <Text>Error fetching character data.</Text>;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <Card className={styles.characterCard}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Title>{character.name}</Title>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Text>Height: {character.height}</Text>
          <Text>Mass: {character.mass}</Text>
          <Text>Birth Year: {character.birth_year}</Text>
          <Text>Eye Color: {character.eye_color}</Text>
          <Text>Skin Color: {character.skin_color}</Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <Title order={3} mt="md">
            Related Links:
          </Title>
          <ul>
            <motion.li
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link
                to={`/homeworld?url=${encodeURIComponent(character.homeworld)}`}
              >
                Homeworld
              </Link>
            </motion.li>
            {character.films.map((film, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link to={`/film?url=${encodeURIComponent(film)}`}>
                  Film {index + 1}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default CharacterDetail;
