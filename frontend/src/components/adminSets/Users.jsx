import React, { useEffect, useState } from 'react';
import { getusers } from '../../services/operations/authAPI';


const Users = () => {
    const [users, setUsers] = useState([]);

    const getAllUsers = async () => {
        try {
            const response = await getusers();
            setUsers(response);
        } catch (error) {
            console.error('Unable to fetch all users:', error); // More informative error handling
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    // Filter students from the users array
    const students = users.filter(user => user.accountType === 'Student');

    return (
        <div className="h-full bg-gradient-to-br from-pink-500 to-purple-500 py-8">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold text-white mb-8">All Students</h1>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* Map through the students array and display each student */}
                    {students.map(student => (
                        <li key={student._id} className="bg-white rounded-lg shadow-md p-4">
                            <img src={student.image} alt={`${student.firstName} ${student.lastName}`} className="w-32 h-auto mx-auto rounded-md mb-4" />
                            <h2 className="text-xl font-semibold text-purple-800 text-center">{student.firstName} {student.lastName}</h2>
                            <p className="text-gray-600 font-bold text-center">Student ID: {student._id}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Users;
