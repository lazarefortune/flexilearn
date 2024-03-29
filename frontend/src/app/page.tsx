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
                <div className="flex items-center justify-center">
                    <h1 className="text-4xl text-slate-900 font-bold text-center mt-10">
                        Welcome to FlexiLearn <span role="img" aria-label="emoji">🚀</span>
                    </h1>
                    <span className="text-yellow-600 text-sm font-bold bg-yellow-50 border border-yellow-600 px-2 py-1 rounded-full uppercase ml-2">BETA</span>
                </div>
                <h2 className="font-bold text-center block text-2xl text-slate-500">Apprenez à votre rythme</h2>
                <p className="text-lg text-slate-500 text-center mb-10">Des cours adaptés entièrement à vos besoins, à
                    votre rythme, et à votre niveau.</p>
                <CourseListServer/>
            </main>
        </>
    );
}
