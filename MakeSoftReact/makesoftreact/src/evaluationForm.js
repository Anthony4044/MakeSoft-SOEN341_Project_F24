import React, { useState } from 'react';
import axios from 'axios';

const EvaluationForm = ({ student, evaluator }) => {
  const [answers, setAnswers] = useState({
    cooperation: '',
    conceptualContribution: '',
    practicalContribution: '',
    workEthic: '',
    commentsCooperation: '',
    commentsConceptual: '',
    commentsPractical: '',
    commentsWorkEthic: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers((prevAnswers) => ({ ...prevAnswers, [name]: value }));
  };

  const handleSubmit = (e) => {
    //If dont want page to refresh to home page add e.preventDefault();
    console.log('Evaluation submitted:', answers);
    // Simulate submission to the server (or you can use axios to send the data)
    setSubmitted(true); // Show confirmation page
    alert('Thank you for submitting the evaluation!');
  };

  if (submitted) {
    return (
      <div>
        <h2>Evaluation Submitted!</h2>
        <p>Thank you for evaluating {student.name}. Your responses have been recorded.</p>
        <p><strong>Cooperation:</strong> {answers.cooperation}</p>
        <p><strong>Conceptual Contribution:</strong> {answers.conceptualContribution}</p>
        <p><strong>Practical Contribution:</strong> {answers.practicalContribution}</p>
        <p><strong>Work Ethic:</strong> {answers.workEthic}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Peer Evaluation Form</h1>
      <h2>{student.name} is being evaluated by {evaluator.evaluatorName}</h2>
      <form onSubmit={handleSubmit}>
        <br></br>
        {/* Cooperation */}
        <label>
          <strong>Cooperation:</strong> How well did this student cooperate with the team?
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
          Additional Comments:
          <textarea
            name="commentsCooperation"
            value={answers.commentsCooperation}
            onChange={handleChange}
            rows="2"
            placeholder="Optional comments"
          />
        </label>
        <br></br>

        {/* Conceptual Contribution */}
        <label>
          <strong>Conceptual Contribution:</strong> How well did this student contribute conceptually?
          <select
            name="conceptualContribution"
            value={answers.conceptualContribution}
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
          Additional Comments:
          <textarea
            name="commentsConceptual"
            value={answers.commentsConceptual}
            onChange={handleChange}
            rows="2"
            placeholder="Optional comments"
          />
        </label>
        <br></br>

        {/* Practical Contribution */}
        <label>
          <strong>Practical Contribution:</strong> How well did this student contribute practically?
          <select
            name="practicalContribution"
            value={answers.practicalContribution}
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
          Additional Comments:
          <textarea
            name="commentsPractical"
            value={answers.commentsPractical}
            onChange={handleChange}
            rows="2"
            placeholder="Optional comments"
          />
        </label>
        <br></br>

        {/* Work Ethic */}
        <label>
          <strong>Work Ethic:</strong> How would you rate this student’s work ethic?
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
          Additional Comments:
          <textarea
            name="commentsWorkEthic"
            value={answers.commentsWorkEthic}
            onChange={handleChange}
            rows="2"
            placeholder="Optional comments"
          />
        </label>
        <br></br>

        {/* Submit Button */}
        <button
          type="submit"
          style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}
        >
          Submit Evaluation
        </button>
      </form>
    </div>
  );
};

export default EvaluationForm;
