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
    name: 'Анна Иванова',
    role: 'Официант',
    avatar: '/images/waitress.png',
  },
  {
    id: '2',
    name: 'Мария Петрова',
    role: 'Мастер маникюра',
    avatar: '/images/manicure.png',
  },
  {
    id: '3',
    name: 'Елена Сидорова',
    role: 'Блогер',
    avatar: '/images/blogger.png',
  },
  {
    id: '4',
    name: 'Дмитрий Козлов',
    role: 'Заправщик',
    avatar: '/images/gas-station.png',
  },
  {
    id: '5',
    name: 'Алексей Смирнов',
    role: 'Курьер',
    avatar: '/images/courier.png',
  },
  {
    id: '6',
    name: 'Ольга Новикова',
    role: 'Консультант',
    avatar: '/images/anyone.png',
  },
]
