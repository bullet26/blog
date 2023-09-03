import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog App | Posts',
    description: 'Generated by create next app',
};

export default function PostsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
