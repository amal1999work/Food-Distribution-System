import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Download() {
    const [reviews, setReviews] = useState([]);
    const [isDownloaded, setIsDownloaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3005/donors/viewreview")
            .then((res) => res.json())
            .then((result) => {
                setReviews(result);
            })
            .catch((error) => {
                console.error('Error fetching reviews:', error);
            });
    }, []);

    useEffect(() => {
        if (reviews.length > 0 && !isDownloaded) {
            downloadCSV(reviews);
            setIsDownloaded(true);
        }
    }, [reviews, isDownloaded]);

    const downloadCSV = (reviews) => {
        const csvRows = [
            ['_id', 'review'],  // Header row
            ...reviews.map(review => [review._id, review.review])
        ];

        const csvContent = csvRows.map(row => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', 'testdata.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        navigate(-1);
    };

    return <div>Downloading...</div>; 
}

export default Download;
