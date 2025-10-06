"use client"
import React, { useEffect } from 'react';


const newTask = () => {

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			title: { value: string };
			description: { value: string };
			dueDate: { value: string };
			assignedTo: { value: string };
		};

		const title = target.title.value;
		const description = target.description.value;
		const dueDate = target.dueDate.value;
		const assignedTo = target.assignedTo.value;
		console.log({ title, description, dueDate, assignedTo });
		const res = fetch('/api/auth/newTask', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title, description, dueDate, assignedTo }),
		});
		res.then(response => {
			if (response.ok) {
				console.log("Task creation successful");
				// Redirect or show success message
			} else {
				return response.json().then(data => {
					console.error("Task creation error:", data.error);
					// Show error message to user
				}
				);
			}
		}).catch(error => {
			console.error("Network error during task creation:", error);
			// Show network error message to user
		}
		);
		target.title.value = '';
		target.description.value = '';
		target.dueDate.value = '';
		target.assignedTo.value = '0';
		console.log("Form reset after submission");
	}

    useEffect(() => {
        const res = fetch('/api/auth/getAllUsers', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        });

        res.then(response=> {
            if(response.ok) {
               return response.json();
            }
        }).then(data => {
            let userDetails = data.userDetails;
            let option;
            let selectBody = document.getElementById("assignedTo");
            if (selectBody && Array.isArray(userDetails)) {
                for (let i=0; i<userDetails.length; i++) {
                    option = document.createElement("option");
                    option.value = userDetails[i].USER_ID;
                    option.textContent = userDetails[i].USERNAME;
                    selectBody?.appendChild(option);
                }
            }
        });

    }, []);

  return (

    <div>
        <form onSubmit={handleSubmit} action="" method="post">
            <h1 className='text-3xl font-bold text-center my-6'>Create New Task</h1>
            <div className='max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg'>
                <div className='mb-4'>
                    <label htmlFor='title' className='block text-gray-700 font-semibold mb-2'>Task Title</label>
                    <input type='text' id='title' name='title' className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' required />
                </div>
                <div className='mb-4'>
                    <label htmlFor='description' className='block text-gray-700 font-semibold mb-2'>Description</label>
                    <textarea id='description' name='description' rows={4} className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' required></textarea>
                </div>
                <div className='mb-4'>
                    <label htmlFor='dueDate' className='block text-gray-700 font-semibold mb-2'>Due Date</label>
                    <input type='date' id='dueDate' name='dueDate' className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' required />
                </div>
                <div className='mb-4'>
                    <label htmlFor='assignedTo' className='block text-gray-700 font-semibold mb-2'>Assign To</label>
                    <select id='assignedTo' name='assignedTo' className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' required>
                        <option value="0">Select a user</option>
                        {/* Add <option> elements here for users */}
                    </select>
                </div>
                <button type='submit' className='w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300'>Create Task</button>
            </div>
        </form>
    </div>
  )
}

export default newTask