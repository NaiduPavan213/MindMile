import React, { useState } from 'react';
import JobCard from '../feed/JobCard';
import { SearchIcon } from '../icons/PageIcons';

const initialJobListings = [
    { type: 'job', role: 'Frontend Developer Intern', company: 'Google', location: 'Bengaluru, India (Remote)', logoUrl: 'https://picsum.photos/seed/googlelogo/100/100' },
    { type: 'job', role: 'AI/ML Research Intern', company: 'Microsoft', location: 'Hyderabad, India', logoUrl: 'https://picsum.photos/seed/mslogo/100/100' },
    { type: 'job', role: 'Product Design Intern', company: 'Adobe', location: 'Noida, India', logoUrl: 'https://picsum.photos/seed/adobelogo/100/100' },
    { type: 'job', role: 'SDE Intern', company: 'Amazon', location: 'Pune, India (Remote)', logoUrl: 'https://picsum.photos/seed/amazonlogo/100/100' },
    { type: 'job', role: 'Cybersecurity Analyst', company: 'Deloitte', location: 'Mumbai, India', logoUrl: 'https://picsum.photos/seed/deloittelogo/100/100' },
];

const Jobs = ({ setApplyingForJob }) => {
    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState('');
    const [jobListings, setJobListings] = useState(initialJobListings);

    const handleSearch = () => {
        const filtered = initialJobListings.filter(job =>
            job.role.toLowerCase().includes(keyword.toLowerCase()) &&
            job.location.toLowerCase().includes(location.toLowerCase())
        );
        setJobListings(filtered);
    };

    return (
        <div className="space-y-6">
            <div className="card p-4 space-y-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Find Your Next Opportunity</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="Keyword (e.g., React)"
                            className="input-field pl-10"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon />
                        </div>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Location (e.g., Remote)"
                            className="input-field pl-10"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg
                                className="w-5 h-5 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                        <select className="input-field !mt-0 py-2">
                            <option>Internship</option>
                            <option>Full-time</option>
                        </select>
                        <select className="input-field !mt-0 py-2">
                            <option>On-site</option>
                            <option>Remote</option>
                            <option>Hybrid</option>
                        </select>
                    </div>
                    <button onClick={handleSearch} className="btn btn-primary px-6">Search</button>
                </div>
            </div>

            {jobListings.map((job, index) => (
                <JobCard key={index} {...job} onApplyNow={setApplyingForJob} />
            ))}

            {jobListings.length === 0 && (
                <div className="card p-8 text-center text-gray-500 dark:text-gray-400">
                    No jobs found matching your criteria.
                </div>
            )}
        </div>
    );
};

export default Jobs;
