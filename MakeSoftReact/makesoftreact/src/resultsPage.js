import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Vortex } from './components/ui/vortex';
import { Label } from './components/ui/label';
import { Input } from './components/ui/input';
import { cn } from './utils/cn';
import "./resultPage.css"


const ResultsPage = ({ instructor }) => {
    const [reviewMembers, setReviewMembers] = useState([]);
    const [processedReviewMembers, setProcessedReviewMembers] = useState([]);
    const [isDetailedView, setIsDetailedView] = useState(false);


    const findReviewMembers = async () => {
        try {
            //alert(instructor.section);
            //POST FOR MARK 
            const response = await axios.get(
                `http://localhost:8080/api/instructors/${instructor.section}/reviewMembers`
            );
            setReviewMembers(response.data);
        } catch (e) {
            console.error("Error fetching review members:", e);
        }
    };

    const toggleDetailedResults = () => {
        setIsDetailedView(!isDetailedView); // Toggle between views
    };


    useEffect(() => {
        if (reviewMembers.length > 0) {
            const processedData = processReviews(reviewMembers);
            setProcessedReviewMembers(processedData);
        }
    }, [reviewMembers]);

    function processReviews(reviews) {
        const reviewMap = new Map();

        reviews.forEach(review => {
            const revieweeName = review.reviewee.name;
            const revieweeObject = review.reviewee;

            if (!reviewMap.has(revieweeName)) {
                reviewMap.set(revieweeName, {
                    reviewee: revieweeObject,
                    cooperation: 0,
                    conceptualContribution: 0,
                    practicalContribution: 0,
                    workEthic: 0,
                    count: 0
                });
            }
            const reviewData = reviewMap.get(revieweeName);
            reviewData.cooperation += review.cooperation;
            reviewData.conceptualContribution += review.conceptualContribution;
            reviewData.practicalContribution += review.practicalContribution;
            reviewData.workEthic += review.workEthic;
            reviewData.count += 1;
        });


        const processedReviews = Array.from(reviewMap.entries()).map(([name, data]) => {

            const avgCooperation = (data.cooperation / data.count).toFixed(2);
            const avgConceptualContribution = (data.conceptualContribution / data.count).toFixed(2);
            const avgPracticalContribution = (data.practicalContribution / data.count).toFixed(2);
            const avgWorkEthic = (data.workEthic / data.count).toFixed(2);

            const overallAverage = ((parseFloat(avgCooperation) + parseFloat(avgConceptualContribution) + parseFloat(avgPracticalContribution) + parseFloat(avgWorkEthic)) / 4).toFixed(2);


            return {
                reviewee: data.reviewee,
                cooperation: avgCooperation,
                conceptualContribution: avgConceptualContribution,
                practicalContribution: avgPracticalContribution,
                workEthic: avgWorkEthic,
                count: data.count,
                overallAverage: overallAverage
            };
        });

        return processedReviews;
    }


    useEffect(() => {
        findReviewMembers();
    }, []);

    const groupReviewsByTeam = (reviews) => {
        const grouped = {};
        reviews.forEach((review) => {
            const teamName = review.reviewee.team.teamName; // Access the teamName from reviewee
            if (!grouped[teamName]) {
                grouped[teamName] = [];
            }
            grouped[teamName].push(review);
        });
        return grouped;
    };

    // Call the grouping function
    const groupedReviews = groupReviewsByTeam(reviewMembers);

    // Convert the grouped object to an array for rendering
    const groupedArray = Object.entries(groupedReviews);
    return (
        <div className="dark">
            <div className="fixed inset-0 z-0">
                <Vortex backgroundColor="black" className="w-full h-full" />
            </div>

            <div className="relative z-10 max-w-7xl w-full mx-auto p-6 pt-32">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8 outer-wr">
                    <h1 className="text-3xl sm:text-4xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
                        {isDetailedView ? "Detailed Results" : "Summarized Results"} <br></br><br></br>
                        <button
                            className="relative group/btn bg-zinc-800 text-white rounded-md h-10 font-medium px-4"
                            onClick={toggleDetailedResults}
                        >
                            {isDetailedView ? "Back to Summary" : "View Detailed Results"}
                        </button>
                    </h1>
                    <h2 className="text-xl sm:text-2xl font-semibold text-neutral-800 dark:text-neutral-200 mb-6">
                    </h2>
                </div>
                {!isDetailedView ? (
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
                    </div>) : (<div>
                        {groupedArray.map(([teamName, processedReviewMembers], index) => (
                            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8 outer-wr">
                                <h1 className="text-white">Team Name: {teamName}</h1>
                                <h2 className="text-white">Reviewees:</h2>
                                {/* Create a Set to hold unique reviewee names */}
                                {Array.from(new Set(processedReviewMembers.map(review => review.reviewee.name))).map((revieweeName, revieweeIndex) => {
                                    // Filter reviews for this specific reviewee
                                    const revieweeReviews = processedReviewMembers.filter(
                                        (review) => review.reviewee.name === revieweeName
                                    );

                                    return (
                                        <div key={revieweeIndex} className="mb-4">
                                            <h3 className="text-white">{revieweeName}</h3>
                                            <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
                                                <thead>
                                                    <tr>
                                                        <th className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-200">Reviewer</th>
                                                        <th className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-200">Cooperation</th>
                                                        <th className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-200">Conceptual Contribution</th>
                                                        <th className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-200">Practical Contribution</th>
                                                        <th className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-200">Work Ethic</th>
                                                        <th className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-200">Average</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {revieweeReviews.map((review, reviewIndex) => (
                                                        <tr key={reviewIndex} className="even:bg-gray-100 dark:even:bg-gray-700">
                                                            <td className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">{review.reviewer.name}</td>
                                                            <td className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">{review.cooperation}</td>
                                                            <td className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">{review.conceptualContribution}</td>
                                                            <td className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">{review.practicalContribution}</td>
                                                            <td className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">{review.workEthic}</td>
                                                            <td className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">{((review.cooperation + review.conceptualContribution + review.practicalContribution + review.workEthic) / 4).toFixed(2)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    );
                                })}
                                {/* Now display comments for all reviewees at the bottom */}
                                {processedReviewMembers.map((review, reviewIndex) => {
                                    const hasComments = review.cooperationComment || review.conceptualContributionComment || review.practicalContributionComment || review.workEthicComment;
                                    return hasComments ? (
                                        <p key={reviewIndex} className="text-white">
                                            {review.reviewer.name} commented:
                                            {review.cooperationComment} ,
                                            {review.conceptualContributionComment} ,
                                            {review.practicalContributionComment} ,
                                            {review.workEthicComment}.
                                        </p>
                                    ) : null;
                                })}
                            </div>
                        ))}
                    </div>
                )
                }
            </div>

        </div>
    );
};




export default ResultsPage;