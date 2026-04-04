export interface Member {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  avatarUrl: string;
}

export const mockMembers: Member[] = [
  {
    id: 'm1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    joinDate: '2023-01-15T00:00:00Z',
    avatarUrl: 'https://i.pravatar.cc/150?u=alice'
  },
  {
    id: 'm2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    joinDate: '2023-05-22T00:00:00Z',
    avatarUrl: 'https://i.pravatar.cc/150?u=bob'
  },
  {
    id: 'm3',
    name: 'Charlie Davis',
    email: 'charlie@example.com',
    joinDate: '2024-02-10T00:00:00Z',
    avatarUrl: 'https://i.pravatar.cc/150?u=charlie'
  }
];
