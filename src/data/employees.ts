export interface Employee {
  id: string
  name: string
  role: string
  avatar: string
  qrCode?: string
}

export const employees: Employee[] = [
  {
    id: '1',
    name: 'Анастасия Константинопольская',
    role: 'Повар в ООО «Шоколадница»',
    avatar: '/images/employees/employee-1.png',
  },
  {
    id: '2',
    name: 'Алексей Кузнецов',
    role: 'Официант «Шоколадница»',
    avatar: '/images/employees/employee-2.png',
  },
  {
    id: '3',
    name: 'Анна Петрова',
    role: 'Официант «Шоколадница»',
    avatar: '/images/employees/employee-3.png',
  },
  {
    id: '4',
    name: 'Константин Иванов',
    role: 'Повар в «Шоколадница»',
    avatar: '/images/employees/employee-4.png',
  },
  {
    id: '5',
    name: 'Иван Константинов',
    role: 'Официант «Шоколадница»',
    avatar: '/images/employees/employee-5.png',
  },
  {
    id: '6',
    name: 'Константин Петров',
    role: 'Бариста «Шоколадница»',
    avatar: '/images/employees/employee-6.png',
  },
]
