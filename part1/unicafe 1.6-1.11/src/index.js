import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// use Statistic component to display single statistic
const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}:</td>
      <td>{value}{text === 'positive' ? '%':'' }</td>
    </tr>
  );
};

const Statistics = (props) => {
  const { good, neutral, bad } = props;
  if (good || neutral || bad) {
    return (
      <>
      <table>
        <tbody>
          <Statistic text='good' value={good} />
          <Statistic text='neutral' value={neutral} />
          <Statistic text='bad' value={bad} />
          <Statistic text='all' value={good+neutral+bad} />
          <Statistic text='average' value={(good - bad)/(good + neutral + bad)} />
          <Statistic text='positive' value={good/(good + neutral + bad)*100} />
        </tbody>
      </table>
      </>
    )
  } else return <div>No feedback given</div>;
};

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  // use serepate state to manage each button
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);
  

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' onClick={handleGoodClick} />
      <Button text='neutral' onClick={handleNeutralClick} />
      <Button text='bad' onClick={handleBadClick} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};


ReactDOM.render(
  <App />,
  document.getElementById('root')
);






