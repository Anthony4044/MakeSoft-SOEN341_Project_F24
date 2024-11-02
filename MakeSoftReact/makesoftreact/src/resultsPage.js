
import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Vortex } from './components/ui/vortex';
import { Label } from './components/ui/label';
import { Input } from './components/ui/input';
import { cn } from './utils/cn';
import "./resultPage.css"


const ResultsPage = ({ }) => {
    //Arraylist of review objects
    const [reviewMembers, setReviewMembers] = useState([]);
    const [processedReviewMembers, setProcessedReviewMembers] = useState([]);

    // Fetch review members from the API
    const findReviewMembers = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/instructors/reviewMembers`
            );
            setReviewMembers(response.data);

            //alert(reviewMembers[1].reviewee.name);

        } catch (e) {
            console.error("Error fetching review members:", e);
        }
    };


    // Process the review members data when `reviewMembers` is updated
    useEffect(() => {
        if (reviewMembers.length > 0) {
            const processedData = processReviews(reviewMembers);
            setProcessedReviewMembers(processedData);
        }
    }, [reviewMembers]);

    // Process reviews to calculate averages and total reviewers
    function processReviews(reviews) {
        // Create a map to store review data grouped by reviewee name
        const reviewMap = new Map();
    
        // Iterate over each review to populate the reviewMap
        reviews.forEach(review => {
            const revieweeName = review.reviewee.name; // Use reviewee name for grouping
            const revieweeObject = review.reviewee; // Keep a reference to the full reviewee object
    
            // Check if the reviewee name already exists in the map
            if (!reviewMap.has(revieweeName)) {
                // Initialize an entry in the map for this reviewee name
                reviewMap.set(revieweeName, {
                    reviewee: revieweeObject, // Store the full reviewee object
                    cooperation: 0,
                    conceptualContribution: 0,
                    practicalContribution: 0,
                    workEthic: 0,
                    count: 0
                });
            }
    
            // Get the current totals for this reviewee name
            const reviewData = reviewMap.get(revieweeName);
    
            // Update the totals and count
            reviewData.cooperation += review.cooperation;
            reviewData.conceptualContribution += review.conceptualContribution;
            reviewData.practicalContribution += review.practicalContribution;
            reviewData.workEthic += review.workEthic;
            reviewData.count += 1;  // Increment the count of reviews
        });
    
        // Create a new array from the reviewMap
        const processedReviews = Array.from(reviewMap.entries()).map(([name, data]) => {
            // Calculate averages for each aspect
            const avgCooperation = data.cooperation / data.count;
            const avgConceptualContribution = data.conceptualContribution / data.count;
            const avgPracticalContribution = data.practicalContribution / data.count;
            const avgWorkEthic = data.workEthic / data.count;
    
            // Calculate the overall average
            const overallAverage = (avgCooperation + avgConceptualContribution + avgPracticalContribution + avgWorkEthic) / 4;
    
            return {
                reviewee: data.reviewee, // Return the full reviewee object
                cooperation: avgCooperation,
                conceptualContribution: avgConceptualContribution,
                practicalContribution: avgPracticalContribution,
                workEthic: avgWorkEthic,
                count: data.count,  // Total number of same names
                overallAverage: overallAverage // New field for overall average
            };
        });
    
        return processedReviews;
    }

    // Fetch review members on component mount
    useEffect(() => {
        findReviewMembers();
    }, []);



    return (
        <div className="dark">
            <div className="fixed inset-0 z-0">
                <Vortex backgroundColor="black" className="w-full h-full" />
            </div>

            <div className="relative z-10 max-w-7xl w-full mx-auto p-6 pt-32">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8 outer-wr">
                    <h1 className="text-3xl sm:text-4xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
                        Summarized Results
                    </h1>
                    <h2 className="text-xl sm:text-2xl font-semibold text-neutral-800 dark:text-neutral-200 mb-6">
                    </h2>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8 outer-wr">
                    <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
                        <thead>
                            <tr>
                                <th className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-200">Student ID</th>
                                <th className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-200">Last Name</th>
                                <th className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-200">First Name</th>
                                <th className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-200">Team</th>
                                <th className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-200">Cooperation</th>
                                <th className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-200">Conceptual Contribution</th>
                                <th className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-200">Practical Contribution</th>
                                <th className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-200">Work Ethic</th>
                                <th className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-200">Average</th>
                                <th className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-200">Peers Who Responded</th>
                            </tr>
                        </thead>
                        <tbody>
                            {processedReviewMembers.map((student, index) => (
                                <tr key={index} className="even:bg-gray-100 dark:even:bg-gray-700">
                                    <td className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">{student.reviewee.studentId}</td>
                                    <td className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">{student.reviewee.name}</td>
                                    <td className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">{student.reviewee.name}</td>
                                    <td className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">{student.reviewee.team.teamName}</td>
                                    <td className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">{student.cooperation}</td>
                                    <td className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">{student.conceptualContribution}</td>
                                    <td className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">{student.practicalContribution}</td>
                                    <td className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">{student.workEthic}</td>
                                    <td className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">{student.overallAverage}</td>
                                    <td className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">{student.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default ResultsPage;