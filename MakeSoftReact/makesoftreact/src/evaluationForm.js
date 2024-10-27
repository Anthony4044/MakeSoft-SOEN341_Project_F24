import React, { useState } from 'react';
import axios from 'axios';
import { Vortex } from './components/ui/vortex';
import { Label } from './components/ui/label';
import { Input } from './components/ui/input';
import { cn } from './utils/cn';
import './studentPage.css';

// Reusable BottomGradient Component (Declared Once)
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition-opacity duration-500 opacity-0 absolute h-px w-full -bottom-px left-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition-opacity duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px left-1/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

// Reusable LabelInputContainer Component
const LabelInputContainer = ({ children, className }) => {
  return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
};

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
    e.preventDefault();
    console.log('Evaluation submitted:', answers);
    setSubmitted(true);
    alert('Thank you for submitting the evaluation!');
  };

  if (submitted) {
    return (
      <div className="dark">
        <div className="fixed inset-0 z-0">
          <Vortex backgroundColor="black" className="w-full h-full" />
        </div>
        <div className="relative z-10 max-w-7xl w-full mx-auto p-6 pt-32">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8 outer-wr">
            <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
              Evaluation Submitted!
            </h2>
            
            <p className="text-neutral-700 dark:text-neutral-300 mb-4">
              Thank you for evaluating {student.name}. Your responses have been recorded.
            </p>
            <div className=" my-2 bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
            <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 mb-4">
              <li><strong>Cooperation:</strong> {answers.cooperation}</li>
              <li><strong>Conceptual Contribution:</strong> {answers.conceptualContribution}</li>
              <li><strong>Practical Contribution:</strong> {answers.practicalContribution}</li>
              <li><strong>Work Ethic:</strong> {answers.workEthic}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dark">
      {/* Vortex Background */}
      <div className="fixed inset-0 z-0">
        <Vortex backgroundColor="black" className="w-full h-full" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl w-full mx-auto p-6 pt-32">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8 outer-wr">
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
            Peer Evaluation Form
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-neutral-800 dark:text-neutral-200 mb-6">
            {student.name} is being evaluated by {evaluator.evaluatorName}
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Cooperation */}
            <LabelInputContainer>
              <Label htmlFor="cooperation" className="text-xl">Cooperation</Label>
              <div className=" my-2 bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
              <select
                id="cooperation"
                name="cooperation"
                value={answers.cooperation}
                onChange={handleChange}
                required
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white dark:bg-zinc-800 text-neutral-800 dark:text-neutral-300 sel-wr"
              >
                <option value="">Select a rating</option>
                <option value="1">1 - Very Poor</option>
                <option value="2">2 - Poor</option>
                <option value="3">3 - Fair</option>
                <option value="4">4 - Good</option>
                <option value="5">5 - Excellent</option>
              </select>
              <Input
                name="commentsCooperation"
                value={answers.commentsCooperation}
                onChange={handleChange}
                placeholder="Optional comments"
                className="relative group/btn bg-gradient-to-br from-black to-neutral-600 dark:from-zinc-900 dark:to-zinc-900 w-full text-white rounded-md h-10 font-medium"
                rows="2"
              />
            </LabelInputContainer>

            {/* Conceptual Contribution */}
            <LabelInputContainer>
              <Label htmlFor="conceptualContribution " className="text-xl">Conceptual Contribution</Label>
              <div className=" my-2 bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
              <select
                id="conceptualContribution"
                name="conceptualContribution"
                value={answers.conceptualContribution}
                onChange={handleChange}
                required
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white dark:bg-zinc-800 text-neutral-800 dark:text-neutral-300 sel-wr"
              >
                <option value="">Select a rating</option>
                <option value="1">1 - Very Poor</option>
                <option value="2">2 - Poor</option>
                <option value="3">3 - Fair</option>
                <option value="4">4 - Good</option>
                <option value="5">5 - Excellent</option>
              </select>
              <Input
                name="commentsConceptual"
                value={answers.commentsConceptual}
                onChange={handleChange}
                placeholder="Optional comments"
                className="relative group/btn bg-gradient-to-br from-black to-neutral-600 dark:from-zinc-900 dark:to-zinc-900 w-full text-white rounded-md h-10 font-medium"
                rows="2"
              />
            </LabelInputContainer>

            {/* Practical Contribution */}
            <LabelInputContainer>
              <Label htmlFor="practicalContribution" className="text-xl">Practical Contribution</Label>
              <div className=" my-2 bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
              <select
                id="practicalContribution"
                name="practicalContribution"
                value={answers.practicalContribution}
                onChange={handleChange}
                required
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white dark:bg-zinc-800 text-neutral-800 dark:text-neutral-300 sel-wr"
              >
                <option value="">Select a rating</option>
                <option value="1">1 - Very Poor</option>
                <option value="2">2 - Poor</option>
                <option value="3">3 - Fair</option>
                <option value="4">4 - Good</option>
                <option value="5">5 - Excellent</option>
              </select>
              <Input
                name="commentsPractical"
                value={answers.commentsPractical}
                onChange={handleChange}
                placeholder="Optional comments"
                className="relative group/btn bg-gradient-to-br from-black to-neutral-600 dark:from-zinc-900 dark:to-zinc-900 w-full text-white rounded-md h-10 font-medium"
                rows="2"
              />
            </LabelInputContainer>

            {/* Work Ethic */}
            <LabelInputContainer>
              <Label htmlFor="workEthic" className="text-xl">Work Ethic</Label>
              <div className=" my-2 bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
              <select
                id="workEthic"
                name="workEthic"
                value={answers.workEthic}
                onChange={handleChange}
                required
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white dark:bg-zinc-800 text-neutral-800 dark:text-neutral-300 sel-wr"
              >
                <option value="">Select a rating</option>
                <option value="1">1 - Very Poor</option>
                <option value="2">2 - Poor</option>
                <option value="3">3 - Fair</option>
                <option value="4">4 - Good</option>
                <option value="5">5 - Excellent</option>
              </select>
              <Input
                name="commentsWorkEthic"
                value={answers.commentsWorkEthic}
                onChange={handleChange}
                placeholder="Optional comments"
                className="relative group/btn bg-gradient-to-br from-black to-neutral-600 dark:from-zinc-900 dark:to-zinc-900 w-full text-white rounded-md h-10 font-medium"
                rows="2"
              />
            </LabelInputContainer>

            {/* Submit Button */}
            <div className=" bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
            <button
              type="submit"
              className="relative group/btn bg-gradient-to-br from-black to-neutral-600 dark:from-zinc-900 dark:to-zinc-900 w-full text-white rounded-md h-10 font-medium"
            >
              
              Submit Evaluation &rarr;
              <BottomGradient />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EvaluationForm;
