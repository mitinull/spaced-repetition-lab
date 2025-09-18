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
import { CardLeitner } from "./CardLeitner";

export function Board() {
  const [algorithm, setAlgorithm] = useState("leitner");
  const [cards, setCards] = useState([
    {
      id: 1,
      value: "apple",
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
    },
    {
      id: 2,
      value: "banana",
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
    },
    {
      id: 3,
      value: "carrot",
      reviewStatus: {
        leitner: {
          box: 0,
          reviewDay: 2,
          lastInterval: 0,
        },
        sm2: {
          ease: 2.5,
          reviewDay: 3,
          repetition: 0,
          lastInterval: 0,
        },
      },
    },
  ]);

  const columns = cards.reduce((acc, card) => {
    while (card.reviewStatus[algorithm].reviewDay >= acc.length) {
      acc.push([]);
    }
    acc[card.reviewStatus[algorithm].reviewDay].push(card);
    return acc;
  }, []);

  function updateCard({ id, reviewStatus }) {
    setCards(
      cards.map((card) => (card.id === id ? { ...card, reviewStatus } : card))
    );
  }

  function goNextDay() {
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

  const leitner = (props) => <CardLeitner {...props} onCardMove={updateCard} />;

  const sm2 = (props) => <CardSM2 {...props} onCardMove={updateCard} />;

  const cardComponent = algorithm === "leitner" ? leitner : sm2;

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
          <ToggleButton value="leitner">Leitner</ToggleButton>
          <ToggleButton value="sm2">SM-2</ToggleButton>
        </ToggleButtonGroup>
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
