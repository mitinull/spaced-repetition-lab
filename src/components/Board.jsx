import { Button, Divider, Stack } from "@mui/material";
import { useState } from "react";
import { CardsForToday } from "./CardsForToday";
import { Column } from "./Column";

export function Board() {
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

  function updateCard({ cardId, newInterval, newEase, newRepetition }) {
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

  console.log({ columns });

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
      <Stack alignItems="start">
        <Button variant="contained" onClick={goNextDay}>
          Next Day
        </Button>
      </Stack>
      <Divider />
      <Stack direction={"row"}>
        <CardsForToday cards={columns.at(0)} onCardMove={updateCard} />
      </Stack>
      <Divider />
      <Stack direction="row" gap={2} flexWrap="wrap">
        {columns.slice(1).map((column, index) => (
          <>
            <Column key={index} index={index} column={column} />
            <Divider orientation="vertical" flexItem />
          </>
        ))}
      </Stack>
    </Stack>
  );
}
