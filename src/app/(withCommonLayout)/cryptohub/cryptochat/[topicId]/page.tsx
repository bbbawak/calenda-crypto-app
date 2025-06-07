"use client";

import TopicDetails from '@/components/Cryptohub/TopicDetails';
import React from 'react'

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
