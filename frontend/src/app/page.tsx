import React from 'react';
import { CourseListServer } from './course-list.server';
import Head from "next/head";

export const metadata = {
    title: 'Accueil - FlexiLearn',
}
export default function Home() {
    return (
        <>
            <main className="min-h-screen max-w-5xl mx-auto">
                <h1 className="text-4xl text-slate-900 font-bold text-center mt-10">Welcome to FlexiLearn</h1>
                <p className="text-lg text-slate-500 text-center mb-10">Des cours adaptés entièrement à vos besoins, à votre rythme, et à votre niveau.</p>
                <CourseListServer />
            </main>
        </>
    );
}
