import {
  Button,
  Divider,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";
import { Fragment, useCallback, useState } from "react";
import { CardsForToday } from "./CardsForToday";
import { Column } from "./Column";
import { CardSM2 } from "./CardSM2";
import { CardLeitner } from "./CardLeitner";
import { Add } from "@mui/icons-material";
import { cardsData } from "../data";
import { v4 as uuidv4 } from "uuid";

export function Board() {
  const [day, setDay] = useState(1);
  const [algorithm, setAlgorithm] = useState("leitner");
  const [cards, setCards] = useState([
    createCard({ en: "Apple", fa: "سیب" }),
    createCard({ en: "Futile", fa: "بیهوده" }),
  ]);

  const updateCard = useCallback(
    ({ id, reviewStatus }) =>
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === id ? { ...card, reviewStatus } : card
        )
      ),
    []
  );

  function goNextDay() {
    setDay((prev) => prev + 1);
    setCards(
      cards.map((card) => ({
        ...card,
        reviewStatus: {
          ...card.reviewStatus,
          [algorithm]: {
            ...card.reviewStatus[algorithm],
            reviewDay: Math.max(0, card.reviewStatus[algorithm].reviewDay - 1),
          },
        },
      }))
    );
  }

  function addNewCard() {
    if (cardsData.length === 0) {
      return null; // Return null if array is empty
    }

    // Get random index
    const randomIndex = Math.floor(Math.random() * cardsData.length);

    // Remove the item at random index and return it
    const cardData = cardsData.splice(randomIndex, 1)[0];

    setCards([...cards, createCard(cardData)]);
  }

  const columns = cards.reduce((acc, card) => {
    while (card.reviewStatus[algorithm].reviewDay >= acc.length) {
      acc.push([]);
    }
    acc[card.reviewStatus[algorithm].reviewDay].push(card);
    return acc;
  }, []);

  const leitner = useCallback(
    (props) => <CardLeitner {...props} onCardMove={updateCard} />,
    [updateCard]
  );

  const sm2 = useCallback(
    (props) => <CardSM2 {...props} onCardMove={updateCard} />,
    [updateCard]
  );

  const cardComponent = algorithm === "leitner" ? leitner : sm2;

  return (
    <Stack px={1.5} py={2} gap={1}>
      <Stack alignItems="start" direction="row" gap={1.5}>
        <Typography variant="h5">Spaced Repetition Lab</Typography>
        <Divider orientation="vertical" flexItem />
        <FormControl size="small">
          <InputLabel>Algorithm</InputLabel>
          <Select
            label="Algorithm"
            value={algorithm}
            onChange={(event) => setAlgorithm(event.target.value)}
          >
            <MenuItem value="leitner">Leitner</MenuItem>
            <MenuItem value="sm2">SM-2</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={goNextDay}>
          (Day: {day}) Next Day
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<Add />}
          onClick={addNewCard}
        >
          Add Card
        </Button>
      </Stack>
      <Divider />
      <Stack direction={"row"}>
        <CardsForToday cards={columns.at(0)} cardComponent={cardComponent} />
      </Stack>
      <Divider />
      <Stack direction="row" gap={2} flexWrap="wrap">
        {columns.slice(1).map((column, index) => (
          <Fragment key={index}>
            <Column
              index={index}
              column={column}
              cardComponent={cardComponent}
            />
            <Divider orientation="vertical" flexItem />
          </Fragment>
        ))}
      </Stack>
    </Stack>
  );
}

function createCard(data) {
  return {
    id: uuidv4(),
    value: data.en,
    back: data.fa,
    reviewStatus: {
      leitner: {
        box: 0,
        reviewDay: 0,
        lastInterval: 0,
      },
      sm2: {
        ease: 2.5,
        reviewDay: 0,
        repetition: 0,
        lastInterval: 0,
      },
    },
  };
}

/* TODO:
- Add local storage
- Add "Reset" button
- Add "Add X card everyday" input
- Add inputs for "Move X days forward
  with random weighted selection (.9 correct or .5 correct etc.)
  with M max reviews per day"
*/
