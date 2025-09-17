import {
  Button,
  Divider,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Fragment, useState } from "react";
import { CardsForToday } from "./CardsForToday";
import { Column } from "./Column";
import { CardSM2 } from "./CardSM2";

export function Board() {
  const [algorithm, setAlgorithm] = useState("Leitner");
  const [cards, setCards] = useState([
    {
      id: 1,
      value: "apple",
      currentDay: 0,
      ease: 2.5,
      repetition: 0,
      lastInterval: 0,
    },
    {
      id: 2,
      value: "banana",
      currentDay: 2,
      ease: 2.5,
      repetition: 0,
      lastInterval: 0,
    },
    {
      id: 3,
      value: "carrot",
      currentDay: 2,
      ease: 2.5,
      repetition: 0,
      lastInterval: 0,
    },
  ]);

  function updateCardSM2({ cardId, newInterval, newEase, newRepetition }) {
    setCards(
      cards.map((card) =>
        card.id === cardId
          ? {
              ...card,
              ease: newEase,
              currentDay: newInterval,
              lastInterval: newInterval,
              repetition: newRepetition,
            }
          : card
      )
    );
  }

  const columns = cards.reduce((acc, card) => {
    while (card.currentDay >= acc.length) {
      acc.push([]);
    }
    acc[card.currentDay].push(card);
    return acc;
  }, []);

  function goNextDay() {
    setCards(
      cards.map((card) => ({
        ...card,
        currentDay: Math.max(0, card.currentDay - 1),
      }))
    );
  }

  return (
    <Stack gap={1}>
      <Stack alignItems="start" direction="row" gap={1}>
        <Button variant="contained" onClick={goNextDay}>
          Next Day
        </Button>
        <ToggleButtonGroup
          exclusive
          size="small"
          color="primary"
          variant="contained"
          value={algorithm}
          onChange={(_, value) => setAlgorithm(value)}
        >
          <ToggleButton value="Leitner">Leitner</ToggleButton>
          <ToggleButton value="SM-2">SM-2</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      <Divider />
      <Stack direction={"row"}>
        <CardsForToday
          cards={columns.at(0)}
          cardComponent={(props) => (
            <CardSM2 {...props} onCardMove={updateCardSM2} />
          )}
        />
      </Stack>
      <Divider />
      <Stack direction="row" gap={2} flexWrap="wrap">
        {columns.slice(1).map((column, index) => (
          <Fragment key={index}>
            <Column index={index} column={column} />
            <Divider orientation="vertical" flexItem />
          </Fragment>
        ))}
      </Stack>
    </Stack>
  );
}
