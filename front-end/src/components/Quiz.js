import React from 'react';
import useStateContext from '../hooks/useStateContext';

function Quiz() {
  const { context, setContext } = useStateContext();
  console.log('context1', context);
  return <div>Quiz</div>;
}

export default Quiz;
