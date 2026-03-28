export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  coverImage: string;
  isAvailable: boolean;
}

export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt, David Thomas',
    category: 'Software Engineering',
    coverImage: 'https://covers.openlibrary.org/b/isbn/9780135957059-L.jpg',
    isAvailable: true,
  },
  {
    id: '2',
    title: 'Clean Architecture',
    author: 'Robert C. Martin',
    category: 'Software Engineering',
    coverImage: 'https://covers.openlibrary.org/b/isbn/9780134494166-L.jpg',
    isAvailable: false,
  },
  {
    id: '3',
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    category: 'Data Engineering',
    coverImage: 'https://covers.openlibrary.org/b/isbn/9781449373320-L.jpg',
    isAvailable: true,
  },
  {
    id: '4',
    title: 'Refactoring',
    author: 'Martin Fowler',
    category: 'Software Engineering',
    coverImage: 'https://covers.openlibrary.org/b/isbn/9780134757599-L.jpg',
    isAvailable: true,
  },
  {
    id: '5',
    title: 'Domain-Driven Design',
    author: 'Eric Evans',
    category: 'Architecture',
    coverImage: 'https://covers.openlibrary.org/b/isbn/9780321125217-L.jpg',
    isAvailable: false,
  },
  {
    id: '6',
    title: 'Building Microservices',
    author: 'Sam Newman',
    category: 'Architecture',
    coverImage: 'https://covers.openlibrary.org/b/isbn/9781492034025-L.jpg',
    isAvailable: true,
  },
  {
    id: '7',
    title: 'Site Reliability Engineering',
    author: 'Niall Richard Murphy et al.',
    category: 'DevOps',
    coverImage: 'https://covers.openlibrary.org/b/isbn/9781491929124-L.jpg',
    isAvailable: true,
  },
  {
    id: '8',
    title: 'Grokking Algorithms',
    author: 'Aditya Bhargava',
    category: 'Computer Science',
    coverImage: 'https://covers.openlibrary.org/b/isbn/9781617292231-L.jpg',
    isAvailable: true,
  },
  {
    id: '9',
    title: 'Design Patterns',
    author: 'Erich Gamma et al.',
    category: 'Software Engineering',
    coverImage: 'https://covers.openlibrary.org/b/isbn/9780201633610-L.jpg',
    isAvailable: false,
  },
  {
    id: '10',
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen et al.',
    category: 'Computer Science',
    coverImage: 'https://covers.openlibrary.org/b/isbn/9780262033848-L.jpg',
    isAvailable: true,
  },
];
