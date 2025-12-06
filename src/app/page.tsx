"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "@/i18n/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { 
  ArrowRight, 
  Sparkles, 
  Smartphone, 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  PlayCircle,
  Users,
  Building2,
  ChevronDown,
  TrendingUp,
  Clock,
  QrCode
} from "lucide-react";

const FloatingNav = () => {
  const t = useTranslations("landing");
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <nav className="mx-auto max-w-5xl bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-full px-6 py-3 shadow-lg shadow-slate-200/50 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
            T
          </div>
          <span className="font-heading font-bold text-xl tracking-tight text-slate-900">
            Tipsio
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="#features" className="hover:text-blue-600 transition-colors">Возможности</Link>
          <Link href="#how-it-works" className="hover:text-blue-600 transition-colors">Как это работает</Link>
          <Link href="#faq" className="hover:text-blue-600 transition-colors">FAQ</Link>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link href="/venue/login">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex rounded-full text-slate-600 hover:text-slate-900">
              Вход
            </Button>
          </Link>
          <Link href="/venue/register">
            <Button size="sm" className="rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-md">
              Начать
            </Button>
          </Link>
        </div>
      </nav>
    </motion.header>
  );
};

const HeroSection = () => {
  const t = useTranslations("landing");
  return (
    <section className="relative min-h-screen pt-28 pb-16 px-6 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-100/30 rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Text Content */}
          <div className="text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-6"
            >
              <Sparkles size={14} />
              <span>Tipsio 2.0 уже здесь</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]"
            >
              Чаевые, которые{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500">
                вдохновляют расти
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg"
            >
              {t("heroNew.subheadline")}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/venue/register">
                <Button size="lg" className="h-14 px-8 rounded-full text-base bg-slate-900 text-white hover:bg-slate-800 hover:scale-105 transition-all shadow-xl shadow-slate-900/20">
                  Начать бесплатно <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="h-14 px-8 rounded-full text-base bg-white border-slate-200 hover:bg-slate-50 text-slate-700">
                <PlayCircle className="mr-2 w-5 h-5" /> Смотреть демо
              </Button>
            </motion.div>

            {/* Trust badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-10 flex flex-wrap gap-6 text-sm text-slate-500"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Безопасные платежи
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Настройка за час
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Без комиссии в бете
              </div>
            </motion.div>
          </div>

          {/* Right: Dashboard Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative lg:ml-8"
          >
            <div className="relative rounded-2xl bg-white border border-slate-200 shadow-2xl shadow-slate-300/50 p-3">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 mb-3 px-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-slate-100 rounded-lg h-7 flex items-center px-3">
                  <span className="text-xs text-slate-400">app.tipsio.io/dashboard</span>
                </div>
              </div>
              
              {/* Dashboard content */}
              <div className="bg-slate-50 rounded-xl p-4 min-h-[380px]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">Сегодня</h3>
                    <p className="text-xs text-slate-500">Пятница, 5 декабря</p>
                  </div>
                  <div className="flex gap-1">
                    <div className="px-2 py-1 bg-white rounded text-xs text-slate-600 border border-slate-200">Неделя</div>
                    <div className="px-2 py-1 bg-blue-600 rounded text-xs text-white">Месяц</div>
                  </div>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white rounded-xl p-3 border border-slate-100">
                    <div className="w-7 h-7 rounded-lg bg-green-100 flex items-center justify-center mb-2">
                      <TrendingUp className="w-3.5 h-3.5 text-green-600" />
                    </div>
                    <div className="text-xl font-bold text-slate-900">₽ 24,500</div>
                    <div className="text-xs text-slate-500">Чаевые сегодня</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 border border-slate-100">
                    <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center mb-2">
                      <Users className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    <div className="text-xl font-bold text-slate-900">47</div>
                    <div className="text-xs text-slate-500">Транзакций</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 border border-slate-100">
                    <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center mb-2">
                      <Clock className="w-3.5 h-3.5 text-purple-600" />
                    </div>
                    <div className="text-xl font-bold text-slate-900">₽ 521</div>
                    <div className="text-xs text-slate-500">Средний чек</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 border border-slate-100">
                    <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center mb-2">
                      <QrCode className="w-3.5 h-3.5 text-orange-600" />
                    </div>
                    <div className="text-xl font-bold text-slate-900">8</div>
                    <div className="text-xs text-slate-500">Активных QR</div>
                  </div>
                </div>
                
                {/* Chart */}
                <div className="bg-white rounded-xl p-3 border border-slate-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-slate-900">Динамика</span>
                    <span className="text-xs text-green-600 font-medium">+23%</span>
                  </div>
                  <div className="flex items-end gap-1.5 h-16">
                    {[35, 55, 40, 70, 45, 85, 60, 90, 75, 95, 80, 100].map((h, i) => (
                      <div key={i} className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating notification - right */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 top-16 z-10 hidden sm:block"
            >
              <div className="bg-white p-3 rounded-xl shadow-xl border border-slate-100 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                  <Zap size={14} />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500">Новые чаевые</div>
                  <div className="text-sm font-bold text-slate-900">+ ₽ 500</div>
                </div>
              </div>
            </motion.div>

            {/* Floating notification - left */}
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -left-4 bottom-16 z-10 hidden sm:block"
            >
              <div className="bg-white p-3 rounded-xl shadow-xl border border-slate-100 flex items-center gap-2">
                <div className="flex -space-x-1.5">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold">М</div>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-purple-500 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold">А</div>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 to-pink-500 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold">К</div>
                </div>
                <div className="text-xs font-medium text-slate-900">Команда растёт!</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


const BentoGrid = () => {
  return (
    <section id="features" className="py-24 px-6 bg-white relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-600 border border-blue-100 mb-4">Возможности</span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 text-slate-900">
            Всё, что нужно для роста
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Мы продумали каждую деталь, чтобы вы зарабатывали больше.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
          <div className="md:col-span-2 row-span-1 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl" />
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-6">
                  <Smartphone size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-slate-900">Apple Pay & Google Pay</h3>
                <p className="text-slate-600 max-w-md">Оплата в один клик. Никаких форм карт и SMS. Конверсия выше на 40%.</p>
              </div>
              <div className="flex gap-2 mt-4">
                <div className="px-4 py-2 rounded-lg bg-white shadow-sm text-sm font-semibold text-slate-700"> Pay</div>
                <div className="px-4 py-2 rounded-lg bg-white shadow-sm text-sm font-semibold text-slate-700">G Pay</div>
              </div>
            </div>
          </div>
          <div className="md:col-span-1 row-span-2 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-800 text-white p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/30" />
            <div className="relative z-10 h-full flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 backdrop-blur-md">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Аналитика</h3>
              <p className="text-slate-300 mb-8">Полный контроль над финансами.</p>
              <div className="mt-auto flex items-end gap-2 h-32 opacity-80">
                {[40, 70, 45, 90, 65, 85].map((h, i) => (
                  <div key={i} className="flex-1 bg-blue-500 rounded-t" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>
          <div className="md:col-span-1 row-span-1 rounded-3xl bg-white border border-slate-200 p-8 shadow-sm group hover:shadow-lg hover:border-purple-200 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-900">Мгновенный вывод</h3>
            <p className="text-slate-500 text-sm">Деньги на карте через 30 секунд.</p>
          </div>
          <div className="md:col-span-1 row-span-1 rounded-3xl bg-gradient-to-br from-pink-50 to-orange-50 border border-pink-100 p-8 group hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center mb-6">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-900">Прозрачность</h3>
            <p className="text-slate-500 text-sm">100% чаевых доходят до получателя.</p>
          </div>
        </div>
      </div>
    </section>
  );
};


const ValueTabs = () => {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-slate-50 border-y border-slate-200">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12 text-slate-900">
          Польза для каждого
        </h2>
        <Tabs defaultValue="staff" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-white p-1 rounded-full border border-slate-200 h-auto">
              <TabsTrigger value="staff" className="rounded-full px-8 py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all text-base">
                <Users className="w-4 h-4 mr-2" /> Официантам
              </TabsTrigger>
              <TabsTrigger value="venue" className="rounded-full px-8 py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all text-base">
                <Building2 className="w-4 h-4 mr-2" /> Заведениям
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="staff" className="focus:outline-none">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-3 gap-8 text-left"
            >
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="text-4xl font-bold text-blue-100 mb-4">01</div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">Сканируй QR</h3>
                <p className="text-slate-500 leading-relaxed">Гость сканирует QR-код на столе или чеке</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="text-4xl font-bold text-blue-100 mb-4">02</div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">Получай чаевые</h3>
                <p className="text-slate-500 leading-relaxed">Оплата через Apple Pay или Google Pay за секунды</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="text-4xl font-bold text-blue-100 mb-4">03</div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">Выводи мгновенно</h3>
                <p className="text-slate-500 leading-relaxed">Деньги на карте через 30 секунд</p>
              </div>
            </motion.div>
          </TabsContent>
          <TabsContent value="venue" className="focus:outline-none">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-2 gap-12 items-center text-left"
            >
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                    <Zap size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-slate-900">Рост выручки</h3>
                    <p className="text-slate-500">Довольный персонал работает лучше. Наши клиенты отмечают рост среднего чека на 15%.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-slate-900">Без налоговых рисков</h3>
                    <p className="text-slate-500">Чаевые идут напрямую сотрудникам. Это не выручка заведения.</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Готовы подключиться?</h3>
                <p className="text-slate-300 mb-8">Настройка занимает 15 минут. Первый месяц — бесплатно.</p>
                <Link href="/venue/register">
                  <Button className="w-full bg-white text-slate-900 hover:bg-slate-100">
                    Подключить заведение
                  </Button>
                </Link>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};


const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const t = useTranslations("landing.faq");
  const questions = ["q1", "q2", "q3", "q4", "q5"];

  return (
    <section id="faq" className="py-24 px-6 bg-white">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-3xl font-heading font-bold text-center mb-12 text-slate-900">Частые вопросы</h2>
        <div className="space-y-4">
          {questions.map((q, idx) => (
            <div key={q} className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="font-semibold text-lg text-slate-900">{t(`${q}.question`)}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${openIndex === idx ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100">
                      {t(`${q}.answer`)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const t = useTranslations("landing");
  
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <FloatingNav />
      <HeroSection />
      <BentoGrid />
      <ValueTabs />
      <FaqSection />

      {/* Footer CTA */}
      <section className="py-24 px-6 relative overflow-hidden bg-slate-900">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px]" />
        <div className="container mx-auto max-w-4xl text-center text-white relative z-10">
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8">{t("ctaNew.title")}</h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">{t("ctaNew.subtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/venue/register">
              <Button size="lg" className="h-16 px-10 text-lg rounded-full bg-white text-slate-900 hover:bg-slate-100">
                Начать бесплатно <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-slate-200 bg-slate-50">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-slate-500">© 2025 Tipsio. All rights reserved.</div>
          <div className="flex gap-6">
            <Link href="#" className="text-slate-500 hover:text-slate-900 transition-colors">Terms</Link>
            <Link href="#" className="text-slate-500 hover:text-slate-900 transition-colors">Privacy</Link>
            <Link href="#" className="text-slate-500 hover:text-slate-900 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
