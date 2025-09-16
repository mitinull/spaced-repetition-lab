import {
  Button,
  ButtonGroup,
  Divider,
  Paper,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export function CardItem({ item, onCardMove, active }) {
  const [newInterval, setNewInterval] = useState("");
  const [newEase, setNewEase] = useState("");
  const [newRepetition, setNewRepetition] = useState("");

  const handleSubmit = () => {
    onCardMove({
      cardId: item.id,
      newEase: +newEase,
      newInterval: +newInterval,
      newRepetition: +newRepetition,
    });
  };

  function handleSuperMemo(quality) {
    if (item.repetition === 0 || quality < 3) {
      // I(1):=1
      setNewInterval(1);
    } else if (item.repetition === 1) {
      // I(2):=6
      setNewInterval(6);
    } else {
      // for n>2: I(n):=I(n-1)*EF
      setNewInterval(Math.floor(item.lastInterval * item.ease));
    }

    // EF':=EF-0.8+0.28*q-0.02*q*q
    const ef = item.ease - 0.8 + 0.28 * quality - 0.02 * quality * quality;
    setNewEase(Math.max(ef, 1.3)); // ef should not be less that 1.3

    if (quality < 3) {
      setNewRepetition(0);
    } else {
      setNewRepetition(item.repetition + 1);
    }
  }

  return (
    <Paper sx={{ p: 1, minWidth: 100 }}>
      {!active ? (
        <CardInfo item={item} />
      ) : (
        <Stack gap={1}>
          <Stack direction="row" gap={1}>
            <CardInfo item={item} />
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

function CardInfo({ item }) {
  return (
    <Stack gap={1} flex={1}>
      <Typography variant="h5">{item.value}</Typography>
      <Divider />
      <Stack>
        <Typography variant="caption">repetition: {item.repetition}</Typography>
        <Typography variant="caption">ease: {item.ease.toFixed(2)}</Typography>
        <Typography variant="caption">
          last interval: {item.lastInterval}
        </Typography>
      </Stack>
    </Stack>
  );
}
