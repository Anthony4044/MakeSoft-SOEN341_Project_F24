import React, { useState } from 'react';
import axios from 'axios';
import { Vortex } from './components/ui/vortex';
import "./resultPage.css";

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Spinner } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { FiChevronDown } from 'react-icons/fi';
import { color } from 'framer-motion';

const ResultsPage = ({ instructor }) => {
    const [isLoading, setIsLoading] = useState(true);

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

    let list = useAsyncList({
        async load({ signal }) {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/instructors/${instructor.section}/reviewMembers`,
                    { signal }
                );
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

  return (
    <div className="dark">
      <div className="fixed inset-0 z-0">
        <Vortex backgroundColor="black" className="w-full h-full" />
      </div>

      <div className="relative z-10 max-w-7xl w-full mx-auto p-6 pt-32">
        <div className="">
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
            Summarized Results
          </h1>
          <div className=" bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </div>
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
                  className={`pt-3 sortable-column ${
                    list.sortDescriptor?.column === column.key
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
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;