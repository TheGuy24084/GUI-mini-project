export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  isAvailable: boolean;
}

export const mockBooks: Book[] = [
  { id: '1', title: 'The Pragmatic Programmer', author: 'Andrew Hunt, David Thomas', category: 'Software Engineering', isAvailable: true },
  { id: '2', title: 'Clean Architecture', author: 'Robert C. Martin', category: 'Software Engineering', isAvailable: false },
  { id: '3', title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', category: 'Data Engineering', isAvailable: true },
  { id: '4', title: 'Refactoring', author: 'Martin Fowler', category: 'Software Engineering', isAvailable: true },
  { id: '5', title: 'Domain-Driven Design', author: 'Eric Evans', category: 'Architecture', isAvailable: false },
  { id: '6', title: 'Building Microservices', author: 'Sam Newman', category: 'Architecture', isAvailable: true },
  { id: '7', title: 'Site Reliability Engineering', author: 'Niall Richard Murphy et al.', category: 'DevOps', isAvailable: true },
  { id: '8', title: 'Grokking Algorithms', author: 'Aditya Bhargava', category: 'Computer Science', isAvailable: true },
  { id: '9', title: 'Design Patterns', author: 'Erich Gamma et al.', category: 'Software Engineering', isAvailable: false },
  { id: '10', title: 'Introduction to Algorithms', author: 'Thomas H. Cormen et al.', category: 'Computer Science', isAvailable: true },
];
