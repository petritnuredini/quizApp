import React, { useEffect, useState } from 'react';
import useStateContext from '../hooks/useStateContext';
import { createAPIEndpoint } from '../api';
import { ENDPOINTS } from '../api';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';
import { getFormatedTime } from '../helper';

function Quiz() {
  const [qns, setQns] = useState([]);
  const [qnIndex, setQnIndex] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  let timer;

  const startTimer = () => {
    timer = setInterval(() => {
      setTimeTaken((prev) => prev + 1);
    }, [1000]);
  };

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.question)
      .fetch()
      .then((res) => {
        setQns(res.data);
        startTimer();
      });

    return () => {
      clearInterval(timer);
    };
  }, []);

  console.log('questions,', qns);
  return qns.length != 0 ? (
    <Card
      sx={{
        maxWidth: 640,
        mx: 'auto',
        mt: 5,
        '& .MuiCardHeader-action': { m: 0, alignSelf: 'center' },
      }}
    >
      <CardHeader
        title={'Question ' + (qnIndex + 1) + ' of 5'}
        action={<Typography>{getFormatedTime(timeTaken)}</Typography>}
      />
      <Box>
        <LinearProgress
          variant='determinate'
          value={((qnIndex + 1) * 100) / 5}
        />
      </Box>
      <CardContent>
        <Typography variant='h6'>{qns[qnIndex].qnInWords}</Typography>
        <List>
          {qns[qnIndex].options.map((item, index) => (
            <ListItemButton disableRipple key={index}>
              <div>
                <b>{String.fromCharCode(65 + index) + ' . '}</b> {item}
              </div>
            </ListItemButton>
          ))}
        </List>
      </CardContent>
    </Card>
  ) : null;
}

export default Quiz;
