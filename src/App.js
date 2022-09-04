import { useState } from 'react';
import './index.scss';

const questions = [
  {
    title: 'React - это ... ?',
    variants: ['библиотека', 'фреймворк', 'приложение'],
    correct: 0,
  },
  {
    title: 'Компонент - это ... ',
    variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
    correct: 1,
  },
  {
    title: 'Что такое JSX?',
    variants: [
      'Это простой HTML',
      'Это функция',
      'Это тот же HTML, но с возможностью выполнять JS-код',
    ],
    correct: 2,
  },
  {
    title: 'Какая компания создала React?',
    variants: [
      'Facebook',
      'Microsoft',
      'Apple',
      'Google',
    ],
    correct: 0,
  },
  {
    title: 'Что такое пропсы(props)?',
    variants: [
      'Функции, которые обновляют состояние',
      'Объект из всех атрибутов, переданных в компонент',
      'Не знаю',
    ],
    correct: 1,
  },
];

function Result({ correct }) {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>Вы отгадали {correct}/{questions.length}</h2>
      <a href="/">
        <button>Попробовать снова</button>
      </a>
    </div>
  );
}

function Game({ question, onClickVariant, step, correct, setCorrect }) {
  const percentage  = Math.round(step / questions.length * 100) + '%';

  const onItemClick = (index) => {
    if (question.correct === index) setCorrect(correct + 1);
    onClickVariant(index);
  };

  return (
    <>
      <div className="progress">
        <div style={{ width: percentage }} className="progress__inner"></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {question.variants.map((variant, index) => (
          <li onClick={() => onItemClick(index)} key={`${index}_${variant}`}>{variant}</li>
        ))}
      </ul>
    </>
  );
}

function App() {

  const [step, setStep] = useState(0);
  const [correct, setCorrect] = useState(0);
  const question = questions[step];

  const onClickVariant = (index) => {
    setStep(step + 1);
  };

  console.log(correct)

  return (
    <div className="App">
      {step === questions.length ? <Result correct={correct}/> : (
        <Game 
          step={step} 
          question={question} 
          onClickVariant={onClickVariant} 
          correct={correct} 
          setCorrect={setCorrect}/>
      )}
    </div>
  );
}

export default App;
