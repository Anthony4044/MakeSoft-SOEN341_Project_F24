import React, { useState } from 'react';
import axios from 'axios';

const EvaluationForm = ({ student , evaluator}) => {
  const [answers, setAnswers] = useState({
    cooperation: '',
    contribution: '',
    communication: '',
    workEthic: '',
    comments: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers((prevAnswers) => ({ prevAnswers, [name]: value }));
  };
  const handleSubmit = (e) => {
    //If dont want page to refresh to home page add 
    // Here you can handle the submission, e.g., send the data to a server or display a confirmation
    console.log('Evaluation submitted:', answers);
    alert('Thank you for submitting the evaluation!');
  };

  return (
    <div>
      <h1>Evaluation Form</h1>
      <h2> {student.name} is currently being evaluated by {evaluator.evaluatorName} </h2>
      <form onSubmit={handleSubmit}>
        <br></br>
        <label>
          <strong>Cooperation: </strong>
          How well did this student cooperate with the team?
          <select
            name="cooperation"
            value={answers.cooperation}
            onChange={handleChange}
            required
          >
            <option value="">Select a rating</option>
            <option value="1">1 - Very Poor</option>
            <option value="2">2 - Poor</option>
            <option value="3">3 - Fair</option>
            <option value="4">4 - Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </label>
        <br></br>
        <label>
          <strong>Contribution: </strong>
          How much did this student contribute to the project?
          <select
            name="contribution"
            value={answers.contribution}
            onChange={handleChange}
            required
          >
            <option value="">Select a rating</option>
            <option value="1">1 - Very Poor</option>
            <option value="2">2 - Poor</option>
            <option value="3">3 - Fair</option>
            <option value="4">4 - Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </label>
        <br></br>
        <label>
          <strong>Communication: </strong>
          How well did this student communicate with the team?
          <select
            name="communication"
            value={answers.communication}
            onChange={handleChange}
            required
          >
            <option value="">Select a rating</option>
            <option value="1">1 - Very Poor</option>
            <option value="2">2 - Poor</option>
            <option value="3">3 - Fair</option>
            <option value="4">4 - Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </label>
        <br></br>
        <label>
          <strong>Work Ethic: </strong>
          How would you rate this student’s work ethic?
          <select
            name="workEthic"
            value={answers.workEthic}
            onChange={handleChange}
            required
          >
            <option value="">Select a rating</option>
            <option value="1">1 - Very Poor</option>
            <option value="2">2 - Poor</option>
            <option value="3">3 - Fair</option>
            <option value="4">4 - Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </label>
        <br></br>
        <label>
          <strong>Additional Comments: </strong>
          Any additional comments or feedback?
          <textarea
            name="comments"
            value={answers.comments}
            onChange={handleChange}
            rows="4"
            placeholder="Write your comments here"
          />
        </label>
        <br></br>
        {/* Submit Button */}
        <button type="submit" style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>
          Submit Evaluation
        </button>
      </form>
      
    </div>
  );
};

export default EvaluationForm;
