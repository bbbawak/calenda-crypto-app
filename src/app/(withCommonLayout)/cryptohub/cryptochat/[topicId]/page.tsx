"use client";

import { useGetSingleTopicQuery } from "@/redux/features/api/topicApi";
import { usePathname } from "next/navigation";
import { setPaths } from "@/redux/features/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import TopicDetailsPage from "@/components/Cryptohub/TopicDetailsPage";
import Loading from "@/components/Shared/Loading";

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
            <TopicDetailsPage topicId={topicId} />
        </div>
    )
}

export default page
