import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { CommissionToggle } from '@/components/common/CommissionToggle'
import { PageFooter } from '@/components/layout/PageFooter'
import { PageHeader } from '@/components/layout/PageHeader'
import { employees } from '@/data/employees'

export const EmployeeSelection = () => {
  const navigate = useNavigate()
  const [coverCommission, setCoverCommission] = useState(true)

  const handleEmployeeClick = (employeeId: string) => {
    navigate(`/employee/${employeeId}`)
  }

  return (
    <div className="flex min-h-screen flex-col bg-white text-[#333333]">
      <PageHeader />

      <main className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col gap-10 px-4 py-10 font-inter lg:px-8">
        <section className="flex flex-wrap items-center justify-between gap-6 rounded-[32px] border border-[#E8EFED] bg-[#F7FFFA] px-6 py-6">
          <div>
            <p className="font-jost text-3xl text-[#333333]">Cafe «Surf Coffee»</p>
            <p className="font-inter text-lg text-[#808080]">Bali</p>
          </div>
          <div className="flex h-24 w-24 items-center justify-center rounded-[32px] bg-[#00B22D] font-jost text-4xl text-white">
            A
          </div>
        </section>

        <section className="space-y-6">
          <p className="font-jost text-2xl">Кого хотите поблагодарить?</p>
          <CommissionToggle
            checked={coverCommission}
            onChange={setCoverCommission}
            label="Оплачу комиссию 50 ₽, а сотрудник получит всю сумму."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {employees.map((employee, index) => (
              <button
                key={employee.id}
                type="button"
                onClick={() => handleEmployeeClick(employee.id)}
                className="group flex items-center justify-between rounded-[32px] border border-[#E8EFED] bg-white px-6 py-5 text-left transition hover:-translate-y-1 hover:border-[#00B22D] hover:shadow-lg"
              >
                <div className="space-y-1 pr-4 font-inter">
                  <p className="text-lg font-semibold leading-tight text-[#333333]">
                    {employee.name}
                  </p>
                  <p className="text-sm text-[#808080]">{employee.role}</p>
                </div>
                <div
                  className={`h-20 w-20 overflow-hidden rounded-[28px] border border-[#E8EFED] bg-[#F2F2F2] transition group-hover:border-[#00B22D] ${
                    index % 3 === 1 ? 'bg-[#E8EFED]' : ''
                  }`}
                >
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
              </button>
            ))}
          </div>

          {employees.length === 0 && (
            <div className="rounded-3xl border border-dashed border-[#E8EFED] px-6 py-12 text-center text-[#808080]">
              Сотрудники не найдены
            </div>
          )}
        </section>
      </main>

      <PageFooter />
    </div>
  )
}
