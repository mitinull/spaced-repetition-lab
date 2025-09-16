import { Button, Divider, Stack } from "@mui/material";
import { useState } from "react";
import { Column } from "./Column";

export function Board() {
  const [cards, setCards] = useState([
    { id: 1, value: "a", day: 0, ease: 2.5, repetition: 0, lastInterval: 0 },
    { id: 2, value: "b", day: 2, ease: 2.5, repetition: 0, lastInterval: 0 },
    { id: 3, value: "c", day: 2, ease: 2.5, repetition: 0, lastInterval: 0 },
  ]);

  function updateCard(cardId, newDay, newEase, newRepetition) {
    setCards(
      cards.map((card) =>
        card.id === cardId
          ? {
              ...card,
              ease: newEase,
              day: newDay - 1,
              lastInterval: newDay - 1,
              repetition: newRepetition,
            }
          : card
      )
    );
  }

  const columns = cards.reduce((acc, card) => {
    while (card.day >= acc.length) {
      acc.push([]);
    }
    acc[card.day].push(card);
    return acc;
  }, []);

  console.log({ columns });

  function goNextDay() {
    setCards(
      cards.map((card) => ({
        ...card,
        day: Math.max(0, card.day - 1),
      }))
    );
  }

  return (
    <Stack gap={2}>
      <Stack alignItems="start">
        <Button variant="contained" onClick={goNextDay}>
          Next Day
        </Button>
      </Stack>
      <Divider />
      <Stack direction="row" gap={2} flexWrap="wrap">
        {columns.map((column, index) => (
          <>
            <Column
              key={index}
              index={index}
              column={column}
              onCardMove={updateCard}
            />
            <Divider orientation="vertical" flexItem />
          </>
        ))}
      </Stack>
    </Stack>
  );
}
