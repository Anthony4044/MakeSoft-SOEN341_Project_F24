import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Vortex } from './components/ui/vortex';
import "./resultPage.css";

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Spinner } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { FiChevronDown } from 'react-icons/fi';
import { color } from 'framer-motion';

const ResultsPage = ({ instructor, navigate }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isDetailedView, setIsDetailedView] = useState(false);
    const [reviewMembers, setReviewMembers] = useState([]);
    
    useEffect(() => {
      // Fetch reviews or other data here
      fetchReviews();
  }, []);

  const fetchReviews = async () => {
      try {

          const response = await fetch('/api/reviews'); 
          const data = await response.json();
          processReviews(data);
          setIsLoading(false);
      } catch (error) {
          console.error('Error fetching reviews:', error);
          setIsLoading(false);
      }
  };

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

            const overallAverage = (
                (parseFloat(avgCooperation) +
                    parseFloat(avgConceptualContribution) +
                    parseFloat(avgPracticalContribution) +
                    parseFloat(avgWorkEthic)) /
                4
            ).toFixed(2);


            return {
                studentId: data.reviewee.studentId,
                lastName: data.reviewee.name.split(' ').slice(-1).join(' '),
                firstName: data.reviewee.name.split(' ').slice(0, -1).join(' '),
                teamName: data.reviewee.team.teamName,
                cooperation: parseFloat(avgCooperation),
                conceptualContribution: parseFloat(avgConceptualContribution),
                practicalContribution: parseFloat(avgPracticalContribution),
                workEthic: parseFloat(avgWorkEthic),
                overallAverage: parseFloat(overallAverage),
                count: data.count
            };
        });

        return processedReviews;
    }

    const toggleDetailedResults = () => {
        setIsDetailedView(!isDetailedView); // Toggle between views
    };

    let list = useAsyncList({
        async load({ signal }) {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/instructors/${instructor.section}/reviewMembers`,
                    { signal }
                );
                setReviewMembers(response.data);
                const reviewMembers = response.data;
                const processedData = processReviews(reviewMembers);
                setIsLoading(false);
                return { items: processedData };
            } catch (e) {
                console.error("Error fetching review members:", e);
                setIsLoading(false);
                return { items: [] };
            }
        },
        sort({ items, sortDescriptor }) {
            const { column, direction } = sortDescriptor;
            let sortedItems = [...items].sort((a, b) => {
                let first = a[column];
                let second = b[column];

                let cmp;
                if (typeof first === 'number' && typeof second === 'number') {
                    cmp = first - second;
                } else if (!isNaN(parseFloat(first)) && !isNaN(parseFloat(second))) {
                    cmp = parseFloat(first) - parseFloat(second);
                } else {
                    cmp = ('' + first).localeCompare('' + second);
                }
                if (direction === 'descending') {
                    cmp *= -1;
                }
                return cmp;
            });
            return { items: sortedItems };
        }
    });
    // Define the columns with their labels and keys
    const columns = [
        { key: 'studentId', label: 'Student ID' },
        { key: 'lastName', label: 'Last Name' },
        { key: 'firstName', label: 'First Name' },
        { key: 'teamName', label: 'Team' },
        { key: 'cooperation', label: 'Cooperation', isGrade: true },
        { key: 'conceptualContribution', label: 'Conceptual Contribution', isGrade: true },
        { key: 'practicalContribution', label: 'Practical Contribution', isGrade: true },
        { key: 'workEthic', label: 'Work Ethic', isGrade: true },
        { key: 'overallAverage', label: 'Average', isGrade: true },
        { key: 'count', label: 'Peers Who Responded' },
    ];

    // Function to get the className based on the grade value
    const getGradeColorStyle = (value) => {
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue)) {
            if (numericValue > 4.0) {
                return 'bg-gradient-to-r from-transparent via-green-300 dark:via-green-700 to-transparent my-2 h-[1px] w-full';
            } else if (numericValue >= 2.5) {
                return 'bg-gradient-to-r from-transparent via-yellow-300 dark:via-yellow-700 to-transparent my-2 h-[1px] w-full';
            } else {
                return 'bg-gradient-to-r from-transparent via-red-300 dark:via-red-700 to-transparent my-2 h-[1px] w-full';
            }
        }
        return '';
    };
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

    const handleBack = () => {
      navigate('instructor'); // Navigate back to Instructor Page by setting currentComponent
    };

    return (
                
                <div className="dark">
                    <div className="fixed inset-0 z-0">
                        <Vortex backgroundColor="black" className="w-full h-full" />
                    </div>

                    <div className="relative z-10 max-w-7xl w-full mx-auto p-6 pt-32">
                        <div className="">
                            <div className="text-3xl sm:text-4xl font-bold text-neutral-800 dark:text-neutral-200 mb-4 ">
                                {isDetailedView ? "Detailed Results" : "Summarized Results"} <br/><br/>

                                <div className='flex justify-between items-center px-10'>
                            {/* "Back to Instructor Page" Button */}
                            {!isDetailedView && (
                                <button
                                    className="relative inline-flex h-12 overflow-hidden rounded-full p-[3px]"
                                    onClick={handleBack}
                                >
                                    <span className="absolute inset-[-1000%] animate-spin bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                                    <span className="flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                                        ← Back to Instructor Page
                                    </span>
                                </button>
                            )}

                            {/* "View Detailed Results" Button */}
                            <button
                                className="relative inline-flex h-12 overflow-hidden rounded-full p-[3px]"
                                onClick={toggleDetailedResults}
                            >
                                <span className="absolute inset-[-1000%] animate-spin bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                                <span className="flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                                    {isDetailedView ? "← Back to Summary" : "View Detailed Results →"}
                                </span>
                            </button>
                        </div>
                                {/* <button
                                    className="relative groupbtn bg-zinc-800 text-white rounded-md h-10 font-medium px-4 py-1 flex justify-start text-xl"
                                    onClick={toggleDetailedResults}
                                >
                                    {isDetailedView ? "← Back to Summary" : "View Detailed Results"}
                                </button> */}

                            </div>
                            <div className=" bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
                        </div>


            {!isDetailedView ? (
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-0 mb-8 outer-wr table-wrapper">
                            <Table
                                aria-label="Results Table"
                                sortDescriptor={list.sortDescriptor}
                                onSortChange={list.sort}
                                classNames={{
                                    table: 'min-h-[400px]',
                                }}
                                className="sortable-table"
                            >
                                <TableHeader >
                                    {columns.map((column) => (
                                        <TableColumn
                                            key={column.key}
                                            allowsSorting
                                            className={`pt-3 sortable-column ${list.sortDescriptor?.column === column.key
                                                    ? `sorted-${list.sortDescriptor.direction}`
                                                    : ''
                                                }`}
                                        >
                                            <div className="header-content">
                                                {column.label}
                                                <FiChevronDown className="sort-icon" />
                                            </div>
                                        </TableColumn>
                                    ))}
                                </TableHeader>
                                <TableBody
                                    items={list.items}
                                    isLoading={isLoading}
                                    loadingContent={<Spinner label="Loading..." />}
                                >
                                    {(item) => (
                                        <TableRow key={item.studentId}>
                                            {(columnKey) => {
                                                const column = columns.find((col) => col.key === columnKey);
                                                const cellValue = item[columnKey];
                                                let underlineClass = "";
                                                // Apply conditional class if it's a grade column
                                                let cellContent = cellValue;
                                                if (column.isGrade) {
                                                    underlineClass = getGradeColorStyle(cellValue);
                                                    //   cellContent = (
                                                    //     <span className={underlineClass}>{cellValue}</span>
                                                    //   );
                                                }

                                                return (
                                                    <TableCell key={columnKey}>{cellContent}
                                                        <div className={underlineClass}>
                                                        </div></TableCell>

                                                );

                                            }}
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>):(


// Detailed Results View ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          <div>
            {groupedArray.map(([teamName, teamReviews], index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8 outer-wr pt-0"
              >
                <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-800  bg-neutral-200 w-full h-full rounded-lg" >
                  Team Name: {teamName}
                </h1>
                {Array.from(
                  new Set(teamReviews.map((review) => review.reviewee.name))
                ).map((revieweeName, revieweeIndex) => {
                  // Filter reviews for this specific reviewee
                  const revieweeReviews = teamReviews.filter(
                    (review) => review.reviewee.name === revieweeName
                  );

                  return (
                    
                    <div key={revieweeIndex} className="mb-6">
                        
                      <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200 mb-2 text-left  pt-6">
                        <div className='text-left'>
                            <span className='text-neutral-500'>Student Name:</span> {revieweeName}
                        </div>
                      </h2>
                      <div className="table-wrapper">
                        <Table
                          aria-label={`Detailed Results for ${revieweeName}`}
                          className="sortable-table"
                        >
                          <TableHeader>
                            <TableColumn>Member</TableColumn>
                            <TableColumn>Cooperation</TableColumn>
                            <TableColumn>Conceptual</TableColumn>
                            <TableColumn>Practical</TableColumn>
                            <TableColumn>Work Ethic</TableColumn>
                            <TableColumn>Average Across All</TableColumn>
                          </TableHeader>
                          <TableBody>
                            {revieweeReviews.map((review, reviewIndex) => {
                              const average = (
                                (review.cooperation +
                                  review.conceptualContribution +
                                  review.practicalContribution +
                                  review.workEthic) /
                                4
                              ).toFixed(2);

                              return (
                                <TableRow key={reviewIndex}>
                                  <TableCell>{review.reviewer.name}</TableCell>
                                  <TableCell>{review.cooperation}</TableCell>
                                  <TableCell>{review.conceptualContribution}</TableCell>
                                  <TableCell>{review.practicalContribution}</TableCell>
                                  <TableCell>{review.workEthic}</TableCell>
                                  <TableCell>{average}</TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </div>
                      {/* Comments Section */}
                      <div className="text-lg font-medium text-neutral-800 dark:text-neutral-200 mt-4 text-xl">
                        Comments:
                      </div>
                      {revieweeReviews.map((review, reviewIndex) => {
                        const hasComments =
                          review.cooperationComment ||
                          review.conceptualContributionComment ||
                          review.practicalContributionComment ||
                          review.workEthicComment;
                          const comments = [
                            review.cooperationComment && { label: '- Cooperation:', text: review.cooperationComment },
                            review.conceptualContributionComment && { label: '- Conceptual:', text: review.conceptualContributionComment },
                            review.practicalContributionComment && { label: '- Practical:', text: review.practicalContributionComment },
                            review.workEthicComment && { label: '- Work Ethic:', text: review.workEthicComment },
                          ].filter(Boolean);
                          
                          return (
                            <div key={reviewIndex} className="text-neutral-800 dark:text-neutral-200 text-left px-16">
                              <div className="py-2 font-bold text-l">
                              <span className="text-violet-300 pr-2">●</span> {review.reviewer.name} <span className="text-neutral-300">commented:</span>
                              </div>
                              <div className="px-20">
                                {comments.map((comment, i) => (
                                  <React.Fragment key={i}>
                                    <span className="font-semibold text-neutral-400">{comment.label}</span> {comment.text}
                                    <br />
                                  </React.Fragment>
                                ))}
                              </div>
                            </div>
                          );
                      })}
                      <div className=" bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-4 h-[1px] w-full" />
                    </div>
                  );
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