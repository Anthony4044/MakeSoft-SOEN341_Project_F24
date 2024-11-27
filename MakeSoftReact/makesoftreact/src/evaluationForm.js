import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Filter } from 'bad-words';
import { Vortex } from './components/ui/vortex';
import { Label } from './components/ui/label';
import { Input } from './components/ui/input';
import { cn } from './utils/cn';
import * as tf from '@tensorflow/tfjs';
import * as toxicity from '@tensorflow-models/toxicity';
import './studentPage.css';

// Set a threshold for toxicity classification
const threshold = 0.9;

// Custom list of bad words for additional profanity filtering
const customBadWords = [
  'dumbass',
  'idiot',
  'stupid',
  'jerk',
  'fool',
  'moron',
  'loser',
  'nitwit',
  'blockhead',
  'knucklehead',
  'bonehead',
  'jackass',
  'dope',
  'imbecile',
  'twit',
  'chump',
];

// Initialize a profanity filter and add custom bad words
const filter = new Filter();
filter.addWords(...customBadWords);

// Reusable BottomGradient Component
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
  return <div className={cn('flex flex-col space-y-2 w-full', className)}>{children}</div>;
};

// Initialize a profanity filter and add custom bad words
const EvaluationForm = ({ student, evaluator , navigate}) => {
  // State to hold evaluation form data
  const handleBack = () => {
    navigate('studentSignin'); // Navigate back
  };
  const [answers, setAnswers] = useState({
    cooperation: '',
    conceptualContribution: '',
    practicalContribution: '',
    workEthic: '',
    commentsCooperation: '',
    commentsConceptual: '',
    commentsPractical: '',
    commentsWorkEthic: '',
  });

  // State to track if the form has been submitted
  const [submitted, setSubmitted] = useState(false);

  // State to hold the loaded toxicity model
  const [toxicityModel, setToxicityModel] = useState(null);

  // Load the toxicity model
  useEffect(() => {
    toxicity.load(threshold).then((model) => {
      setToxicityModel(model);
    });
  }, []);

   // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers((prevAnswers) => ({ ...prevAnswers, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Gather all comments
    const comments = [
      { field: 'Cooperation', text: answers.commentsCooperation },
      { field: 'Conceptual Contribution', text: answers.commentsConceptual },
      { field: 'Practical Contribution', text: answers.commentsPractical },
      { field: 'Work Ethic', text: answers.commentsWorkEthic },
    ];
    
    // Check each comment for profanity and toxicity
    for (let comment of comments) {
      if (comment.text) {
        // Check for inappropriate words
        if (filter.isProfane(comment.text)) {
          alert(
            `Your comment in "${comment.field}" contains inappropriate language. Please revise it before submitting.`
          );
          return; // Prevent submission
        }

        // Check for toxicity using the loaded model
        if (toxicityModel) {
          const predictions = await toxicityModel.classify([comment.text]);

          const isToxic = predictions.some(
            (prediction) =>
              prediction.results[0].match && prediction.probabilities[1] > threshold
          );

          if (isToxic) {
            alert(
              `Your comment in "${comment.field}" contains inappropriate content. Please revise it before submitting.`
            );
            return; // Prevent submission
          }
        }
      }
    }

    // Proceed with submission as normal
    const review = {
      reviewer: {
        email: evaluator.email,
        name: evaluator.name,
        section: evaluator.section,
        studentId: evaluator.studentId,
        password: evaluator.password,
      },
      reviewee: {
        email: student.evaluatedEmail,
        name: student.evaluatedName,
        section: student.evaluatedSection,
        studentId: student.evaluatedStudentId,
      },
      cooperation: parseInt(answers.cooperation),
      cooperationComment: answers.commentsCooperation,
      conceptualContribution: parseInt(answers.conceptualContribution),
      conceptualContributionComment: answers.commentsConceptual,
      practicalContribution: parseInt(answers.practicalContribution),
      practicalContributionComment: answers.commentsPractical,
      workEthic: parseInt(answers.workEthic),
      workEthicComment: answers.commentsWorkEthic,
    };
    console.log('Submitting review:', review);
    try {
      await axios.post('http://localhost:8080/api/reviews', review);
      alert('Evaluation submitted successfully!');
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('There was an issue submitting the evaluation. Please try again.');
    }
  };

  // If the form is submitted, display a confirmation message
  if (submitted) {
    return (
      <div className="dark">
        {/* Vortex Background */}
        <div className="fixed inset-0 z-0">
          <Vortex backgroundColor="black" className="w-full h-full" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl w-full mx-auto p-6 pt-32">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8 outer-wr">
            <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
              Evaluation Submitted!
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 mb-4">
              Thank you for evaluating {student.name}. Your responses have been recorded.
            </p>
            <div className="my-2 bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent h-[1px] w-full" />
            <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 mb-4">
              <li>
                <strong>Cooperation:</strong> {answers.cooperation}
              </li>
              <li>
                <strong>Conceptual Contribution:</strong> {answers.conceptualContribution}
              </li>
              <li>
                <strong>Practical Contribution:</strong> {answers.practicalContribution}
              </li>
              <li>
                <strong>Work Ethic:</strong> {answers.workEthic}
              </li>
            </ul>
          </div>
          <button
            className="relative inline-flex h-12 overflow-hidden rounded-full p-[3px]"
            onClick={handleBack}
          >
            <span className="absolute inset-[-1000%] animate-spin bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                ← Back to Student Page
            </span>
          </button>
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
              <Label htmlFor="cooperation" className="text-xl">
                Cooperation
              </Label>
              <div className="my-2 bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent h-[1px] w-full" />
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
                className="relative w-full px-3 py-2 text-base border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-zinc-800 text-neutral-800 dark:text-neutral-300"
                rows="2"
              />
            </LabelInputContainer>

            {/* Conceptual Contribution */}
            <LabelInputContainer>
              <Label htmlFor="conceptualContribution" className="text-xl">
                Conceptual Contribution
              </Label>
              <div className="my-2 bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent h-[1px] w-full" />
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
                className="relative w-full px-3 py-2 text-base border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-zinc-800 text-neutral-800 dark:text-neutral-300"
                rows="2"
              />
            </LabelInputContainer>

            {/* Practical Contribution */}
            <LabelInputContainer>
              <Label htmlFor="practicalContribution" className="text-xl">
                Practical Contribution
              </Label>
              <div className="my-2 bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent h-[1px] w-full" />
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
                className="relative w-full px-3 py-2 text-base border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-zinc-800 text-neutral-800 dark:text-neutral-300"
                rows="2"
              />
            </LabelInputContainer>

            {/* Work Ethic */}
            <LabelInputContainer>
              <Label htmlFor="workEthic" className="text-xl">
                Work Ethic
              </Label>
              <div className="my-2 bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent h-[1px] w-full" />
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
                className="relative w-full px-3 py-2 text-base border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-zinc-800 text-neutral-800 dark:text-neutral-300"
                rows="2"
              />
            </LabelInputContainer>

            {/* Submit Button */}
            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
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