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
    name: 'Anastasia Petrova',
    role: 'Cook at Cafe «Krispy-Kreme» Bali',
    avatar: '/images/employees/employee-1.png',
  },
  {
    id: '2',
    name: 'Boris Kuznetsov',
    role: 'Waiter Cafe «Krispy-Kreme» Bali',
    avatar: '/images/employees/employee-2.png',
  },
  {
    id: '3',
    name: 'Semyon Sokolov',
    role: 'Waiter Cafe «Krispy-Kreme» Bali',
    avatar: '/images/employees/employee-3.png',
  },
  {
    id: '4',
    name: 'Konstantin Ivanov',
    role: 'Cook Cafe «Krispy-Kreme» Bali',
    avatar: '/images/employees/employee-4.png',
  },
  {
    id: '5',
    name: 'Maria Romanova',
    role: 'Waitress Cafe «Krispy-Kreme» Bali',
    avatar: '/images/employees/employee-5.png',
  },
  {
    id: '6',
    name: 'Anna Petrova',
    role: 'Barista Cafe «Krispy-Kreme» Bali',
    avatar: '/images/employees/employee-6.png',
  },
]
