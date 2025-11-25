import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Plus } from 'lucide-react'

import { CommissionToggle } from '@/components/common/CommissionToggle'
import { PageFooter } from '@/components/layout/PageFooter'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/button'
import { employees } from '@/data/employees'

const presetAmounts = [50, 99, 150]
const moodOptions = ['😐', '🙂', '😀', '😍']
const MESSAGE_LIMIT = 99

export const PaymentPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [coverCommission, setCoverCommission] = useState(false)
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [message, setMessage] = useState('')

  const employee = useMemo(
    () => employees.find((emp) => emp.id === id),
    [id]
  )

  const finalAmount = customAmount ? parseInt(customAmount, 10) : selectedAmount
  const canSubmit = Boolean(finalAmount && finalAmount > 0)

  if (!employee) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7FFFA] px-4">
        <div className="max-w-md rounded-[32px] border border-[#E8EFED] bg-white px-8 py-10 text-center">
          <h2 className="mb-3 font-jost text-2xl text-[#1E5F4B]">
            Сотрудник не найден
          </h2>
          <p className="mb-6 text-[#808080]">
            Запрошенный сотрудник не существует или был удалён
          </p>
          <Button onClick={() => navigate('/employees')}>
            Вернуться к списку
          </Button>
        </div>
      </div>
    )
  }

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount('')
  }

  const handleCustomAmountChange = (value: string) => {
    const numericValue = value.replace(/[^\d]/g, '')
    setCustomAmount(numericValue)
    setSelectedAmount(null)
  }

  return (
    <div className="flex min-h-screen flex-col bg-white text-[#333333]">
      <PageHeader>
        <button
          type="button"
          onClick={() => navigate('/employees')}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E8EFED] text-[#1E5F4B] transition hover:border-[#00B22D] hover:text-[#00B22D]"
          aria-label="Вернуться назад"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      </PageHeader>

      <main className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col gap-8 px-4 py-10 font-inter lg:px-8">
        <div className="rounded-[32px] border border-[#E8EFED] bg-white px-6 py-8 shadow-sm lg:px-10">
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <div className="h-20 w-20 overflow-hidden rounded-[32px] border border-[#E8EFED] bg-[#F2F2F2]">
              <img
                src={employee.avatar}
                alt={employee.name}
                className="h-full w-full object-cover"
                onError={(event) => {
                  const target = event.target as HTMLImageElement
                  target.src =
                    'https://placehold.co/120x120/CCF0D5/1E5F4B?text=?'
                }}
              />
            </div>
            <div>
              <p className="text-sm text-[#808080]">Чаевые для</p>
              <p className="font-jost text-2xl">{employee.name}</p>
              <p className="text-sm text-[#808080]">{employee.role}</p>
            </div>
          </div>

          <CommissionToggle
            checked={coverCommission}
            onChange={setCoverCommission}
            label="Оплачу комиссию 50 ₽, а сотрудник получит всю сумму."
            className="mb-8"
          />

          <div className="space-y-4">
            <p className="font-jost text-2xl">Сумма чаевых</p>
            <div className="flex flex-wrap gap-3">
              {presetAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => handleAmountSelect(amount)}
                  className={`rounded-[12px] px-6 py-4 text-2xl font-jost transition ${
                    selectedAmount === amount
                      ? 'bg-[#1E5F4B] text-white'
                      : 'bg-[#CCF0D5] text-[#00B22D]'
                  }`}
                >
                  {amount}
                  <span className="font-inter text-base"> ₽</span>
                </button>
              ))}
            </div>
            <div>
              <p className="mb-2 text-sm text-[#808080]">Или введите сумму</p>
              <div className="relative">
                <input
                  type="text"
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  placeholder="Сумма"
                  className="w-full rounded-[12px] border border-[#E8EFED] px-5 py-4 text-lg outline-none transition focus:border-[#00B22D]"
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#808080]">
                  ₽
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <p className="font-jost text-2xl">Ваши впечатления</p>
            <div className="flex flex-wrap gap-3">
              {moodOptions.map((mood) => (
                <button
                  key={mood}
                  type="button"
                  onClick={() => setSelectedMood(mood)}
                  className={`flex h-14 w-14 items-center justify-center rounded-[12px] text-2xl transition ${
                    selectedMood === mood
                      ? 'bg-[#1E5F4B] text-white'
                      : 'bg-[#CCF0D5]'
                  }`}
                >
                  {mood}
                </button>
              ))}
              <button
                type="button"
                className="flex h-14 w-14 items-center justify-center rounded-[12px] border border-dashed border-[#E8EFED] text-[#808080]"
                aria-label="Добавить другое впечатление"
              >
                <Plus className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <p className="font-jost text-2xl">Пожелания</p>
            <textarea
              value={message}
              onChange={(event) => {
                const value = event.target.value.slice(0, MESSAGE_LIMIT)
                setMessage(value)
              }}
              placeholder="Напишите пару тёплых слов"
              className="min-h-[120px] w-full rounded-[12px] border border-[#E8EFED] bg-[#F2F2F2] p-4 text-base text-[#333333] outline-none transition focus:border-[#00B22D]"
            />
            <div className="text-right text-sm text-[#808080]">
              {MESSAGE_LIMIT - message.length}
            </div>
          </div>
        </div>

        <div className="text-sm text-[#808080]">
          <p>TIPS – сервис для получения благодарности, подарков или чаевых безналично.</p>
          <p className="text-[#00B22D]">Начать пользоваться</p>
        </div>

        <Button
          size="lg"
          className="w-full rounded-[16px] bg-[#1E5F4B] text-lg font-semibold text-white transition hover:bg-[#154737]"
          disabled={!canSubmit}
        >
          Поблагодарить {canSubmit ? `${finalAmount} ₽` : ''}
        </Button>
      </main>

      <PageFooter />
    </div>
  )
}
