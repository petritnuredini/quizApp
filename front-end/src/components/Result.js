import React, { useEffect, useState } from 'react';
import useStateContext from '../hooks/useStateContext';
import { createAPIEndpoint } from '../api';
import { ENDPOINTS } from '../api';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { getFormatedTime } from '../helper';
import { useNavigate } from 'react-router-dom';

function Result() {
  const { context, setContext } = useStateContext();
  const [score, setScore] = useState(0);
  const [qnAnswers, setQnAnswers] = useState([]);
  const navigate = useNavigate();

  console.log('context', context);
  useEffect(() => {
    const ids = context.selectedOptions.map((x) => x.qnId);

    createAPIEndpoint(ENDPOINTS.getAnswers)
      .post(ids)
      .then((res) => {
        const qna = context.selectedOptions.map((x) => ({
          ...x,
          ...res.data.find((y) => y.qnId === x.qnId),
        }));

        setQnAnswers(qna);
        calculateScore(qna);
      })
      .catch((err) => console.log('ERR here', err));
  }, []);

  const calculateScore = (qna) => {
    let tempScore = qna.reduce((acc, curr) => {
      return curr.answer == curr.selected ? acc + 1 : acc;
    }, 0);

    setScore(tempScore);
  };

  const restart = () => {
    setContext({
      timeTaken: 0,
      selectedOptions: [],
    });
    navigate('/quiz');
  };

  return (
    <Card
      sx={{ mt: 5, display: 'flex', width: '100%', maxWidth: 640, mx: 'auto' }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <CardContent sx={{ flex: '1 0 auto', textAlign: 'center' }}>
          <Typography variant='h4'>Congratulations!</Typography>
          <Typography variant='h6'>Your Score</Typography>
          <Typography variant='h5' sx={{ fontWeight: 600 }}>
            <Typography variant='span'>{score}</Typography>/5
          </Typography>

          <Typography variant='h6'>
            Took {getFormatedTime(context.timeTaken) + ' mins'}
          </Typography>
          <Button variant='contained' sx={{ mx: 1 }} size='small'>
            Submit
          </Button>
          <Button
            variant='contained'
            sx={{ mx: 1 }}
            size='small'
            onClick={restart}
          >
            Try Again
          </Button>
        </CardContent>
      </Box>
      <CardMedia component={'img'} sx={{ width: 220 }} image='./result.png' />
    </Card>
  );
}

export default Result;
