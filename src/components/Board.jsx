import { Divider, Stack, Button } from "@mui/material";
import { useState } from "react";
import { Column } from "./Column";

export function Board() {
  const [cards, setCards] = useState([
    { id: 1, value: "a", columnNumber: 0, ease: 1.3 },
    { id: 2, value: "b", columnNumber: 2, ease: 1.3 },
    { id: 3, value: "c", columnNumber: 2, ease: 1.3 },
  ]);

  function moveCardToColumn(cardId, columnNumber) {
    setCards(
      cards.map((card) =>
        card.id === cardId ? { ...card, columnNumber: columnNumber - 1 } : card
      )
    );
  }

  const columns = cards.reduce((acc, card) => {
    while (card.columnNumber >= acc.length) {
      acc.push([]);
    }
    acc[card.columnNumber].push(card);
    return acc;
  }, []);

  console.log({ columns });

  function goNextDay() {
    setCards(
      cards.map((card) => ({
        ...card,
        columnNumber: Math.max(0, card.columnNumber - 1),
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
              onCardMove={moveCardToColumn}
            />
            <Divider orientation="vertical" flexItem />
          </>
        ))}
      </Stack>
    </Stack>
  );
}
