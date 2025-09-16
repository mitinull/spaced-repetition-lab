import {
  Button,
  ButtonGroup,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export function Item({ item, onCardMove }) {
  const [newDay, setNewDay] = useState("");
  const [newEase, setNewEase] = useState("");
  const [newRepetition, setNewRepetition] = useState("");

  const handleSubmit = () => {
    onCardMove(item.id, +newDay, +newEase, +newRepetition);
  };

  function handleSuperMemo(quality) {
    if (item.repetition === 0 || quality < 3) {
      // I(1):=1
      setNewDay(1 + 1);
    } else if (item.repetition === 1) {
      // I(2):=6
      setNewDay(1 + 6);
    } else {
      // for n>2: I(n):=I(n-1)*EF
      setNewDay(1 + Math.floor(item.lastInterval * item.ease));
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
    <Paper sx={{ p: 1 }}>
      <Stack gap={1}>
        <Typography>{item.value}</Typography>
        <Divider />
        <Stack>
          <Typography>repetition: {item.repetition}</Typography>
          <Typography>ease: {item.ease.toFixed(2)}</Typography>
          <Typography>last interval: {item.lastInterval}</Typography>
        </Stack>
        <Divider />
        <Stack gap={1}>
          <ButtonGroup fullWidth>
            <Button size="small" onClick={() => handleSuperMemo(0)}>
              0
            </Button>
            <Button size="small" onClick={() => handleSuperMemo(1)}>
              1
            </Button>
            <Button size="small" onClick={() => handleSuperMemo(2)}>
              2
            </Button>
          </ButtonGroup>
          <ButtonGroup fullWidth>
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
          <TextField
            type="number"
            size="small"
            value={newDay}
            onChange={(e) => setNewDay(e.target.value)}
          />
          <TextField
            type="number"
            size="small"
            value={newEase}
            onChange={(e) => setNewEase(e.target.value)}
          />
          <TextField
            disabled
            type="number"
            size="small"
            value={newRepetition}
          />
          <Button size="small" onClick={handleSubmit}>
            GO!
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
