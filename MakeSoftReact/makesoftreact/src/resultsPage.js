import React, { useState } from 'react';
import axios from 'axios';
import { Vortex } from './components/ui/vortex';
import { Label } from './components/ui/label';
import { Input } from './components/ui/input';
import { cn } from './utils/cn';
import "./resultPage.css"


const ResultsPage = ({ }) => {
    //Arraylist of review objects
    const [reviewMembers, setReviewMembers] = useState([]);

    const findReviewMembers = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/instructors/reviewMembers`
            );
            setReviewMembers(response.data);
            alert(response.data);
        } catch (e) {
        }
    };

    findReviewMembers();

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
                            {reviewMembers.map((student, index) => (
                                <tr key={index} className="even:bg-gray-100 dark:even:bg-gray-700">
                                    <td className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">{student.studentId}</td>
                                    <td className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">{student.lastName}</td>
                                    <td className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">{student.firstName}</td>
                                    <td className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">{student.team}</td>
                                    <td className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">{student.cooperation}</td>
                                    <td className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">{student.conceptualContribution}</td>
                                    <td className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">{student.practicalContribution}</td>
                                    <td className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">{student.workEthic}</td>
                                    <td className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">{student.average}</td>
                                    <td className="border-b border-gray-300 dark:border-gray-700 px-4 py-2 text-sm text-gray-800 dark:text-gray-300">{student.peersResponded}</td>
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