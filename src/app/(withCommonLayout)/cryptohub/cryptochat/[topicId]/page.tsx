"use client";

import TopicDetails from '@/components/Cryptohub/TopicDetails';
import React from 'react'

export async function generateStaticParams() {
  return [
    { topicId: '1' },
    { topicId: '2' },
    { topicId: '3' },
    { topicId: 'dummy-1' },
    { topicId: 'dummy-2' },
    { topicId: 'dummy-3' },
    { topicId: 'dummy-4' }
  ];
}

interface PageProps {
    params: {
        topicId: string;
    }
}

const page = ({ params: { topicId } }: PageProps) => {
    return (
        <div>
            <TopicDetails topicId={topicId} />
        </div>
    )
}

export default page
