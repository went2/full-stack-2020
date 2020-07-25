import React from 'react';

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
};

const Total = ({ course }) => {
  // use reduce to get sum
  const getSum = (acc, cur) => acc + cur.exercises;
  const sum = course.parts.reduce(getSum, 0);

  return(
    <h4>total of {sum} exericses</h4>
  ) 
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>    
  )
};

const Content = ({ course }) => {
  return (
    <div>
      {
        course.parts.map((part)=> {
          return <Part part={part} key={part.id}/>
        })
      }
    </div>
  )
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course} />
    </div>
  )
};

export default Course;