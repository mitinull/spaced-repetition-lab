import { Loop } from "@mui/icons-material";
import {
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  Paper,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export function CardSM2({ card, onCardMove, editable }) {
  const [newInterval, setNewInterval] = useState("");
  const [newEase, setNewEase] = useState("");
  const [newRepetition, setNewRepetition] = useState("");

  const handleSubmit = () => {
    if (!newInterval || !newEase || !newRepetition) return;

    onCardMove({
      id: card.id,
      reviewStatus: {
        ...card.reviewStatus,
        sm2: {
          ease: +newEase,
          reviewDay: +newInterval,
          repetition: +newRepetition,
          lastInterval: +newInterval,
        },
      },
    });
  };

  function handleSuperMemo(quality) {
    if (card.reviewStatus.sm2.repetition === 0 || quality < 3) {
      // I(1):=1
      setNewInterval(1);
    } else if (card.reviewStatus.sm2.repetition === 1) {
      // I(2):=6
      setNewInterval(6);
    } else {
      // for n>2: I(n):=I(n-1)*EF
      setNewInterval(
        Math.floor(
          card.reviewStatus.sm2.lastInterval * card.reviewStatus.sm2.ease
        )
      );
    }

    // EF':=EF-0.8+0.28*q-0.02*q*q
    const ef =
      card.reviewStatus.sm2.ease -
      0.8 +
      0.28 * quality -
      0.02 * quality * quality;
    setNewEase(Math.max(ef, 1.3)); // ef should not be less that 1.3

    if (quality < 3) {
      setNewRepetition(0);
    } else {
      setNewRepetition(card.reviewStatus.sm2.repetition + 1);
    }
  }

  return (
    <Paper sx={{ p: 1, minWidth: 100 }}>
      {!editable ? (
        <CardInfoSM2 card={card} />
      ) : (
        <Stack gap={1}>
          <Stack direction="row" gap={1}>
            <CardInfoSM2 card={card} />
            <Divider flexItem orientation="vertical" />
            <Stack gap={1.5} flex={1}>
              <StyledTextField
                disabled
                label="New Repetition"
                type="number"
                size="small"
                value={newRepetition}
              />
              <StyledTextField
                label="New Ease"
                type="number"
                size="small"
                value={newEase}
                onChange={(e) => setNewEase(e.target.value)}
              />
              <StyledTextField
                label="New Interval (days)"
                type="number"
                size="small"
                value={newInterval}
                onChange={(e) => setNewInterval(e.target.value)}
              />
            </Stack>
          </Stack>
          <Divider />
          <Stack gap={1}>
            <ButtonGroup fullWidth size="small">
              <Button size="small" onClick={() => handleSuperMemo(0)}>
                0
              </Button>
              <Button size="small" onClick={() => handleSuperMemo(1)}>
                1
              </Button>
              <Button size="small" onClick={() => handleSuperMemo(2)}>
                2
              </Button>
              <Button size="small" onClick={() => handleSuperMemo(3)}>
                3
              </Button>
              <Button size="small" onClick={() => handleSuperMemo(4)}>
                4
              </Button>
              <Button size="small" onClick={() => handleSuperMemo(5)}>
                5
              </Button>
            </ButtonGroup>
          </Stack>
          <Divider />
          <Stack gap={1}>
            <Button size="small" onClick={handleSubmit}>
              submit!
            </Button>
          </Stack>
        </Stack>
      )}
    </Paper>
  );
}

const StyledTextField = styled(TextField)({
  "& .MuiInputBase-input": { fontSize: 12, height: 6, padding: 12 },
  "& .MuiFormLabel-root": { fontSize: 12, padding: 0, lineHeight: 1 },
});

function CardInfoSM2({ card }) {
  const [showBack, setShowBack] = useState(false);

  return (
    <Stack gap={1} flex={1}>
      <Typography variant="h5">
        {!showBack ? card.value : card.back}
        <IconButton onClick={() => setShowBack((prev) => !prev)}>
          <Loop />
        </IconButton>
      </Typography>
      <Divider />
      <Stack>
        <Typography variant="caption">
          repetition: {card.reviewStatus.sm2.repetition}
        </Typography>
        <Typography variant="caption">
          ease: {card.reviewStatus.sm2.ease.toFixed(2)}
        </Typography>
        <Typography variant="caption">
          last interval: {card.reviewStatus.sm2.lastInterval}
        </Typography>
      </Stack>
    </Stack>
  );
}
