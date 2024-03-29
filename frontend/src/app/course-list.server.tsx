import React from 'react';

interface Course {
    id: number;
    title: string;
    content: string;
    authorId: number;
}

export async function CourseListServer(): Promise<JSX.Element> {

    const res = await fetch('http://localhost:4002/api/courses');
    const response = await res.json();
    const courses: Course[] = response.data?.courses || [];

    const truncateContent = (content: string, maxLength: number = 100) => {
        if (content.length <= maxLength) return content;
        return `${content.substring(0, maxLength)}...`;
    };

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
                <div key={course.id}
                     className="flex flex-col max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex-grow">
                        <a href="">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{course.title}</h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{course.content.length > 100 ? truncateContent(course.content) : course.content}</p>
                    </div>
                    <a href=""
                       className="px-6 py-3 mt-3 text-sm font-medium text-center text-white bg-slate-900 rounded-md hover:bg-slate-800 focus:ring-2 focus:outline-none focus:ring-slate-300">
                        Obtenir une explication
                    </a>
                </div>
            ))}
        </div>
    );
}
