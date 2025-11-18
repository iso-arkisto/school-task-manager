import { useState } from 'react'
import { useTaskStore } from '../store/taskStore'
import { useLanguage } from '../i18n/LanguageContext'

const SUBJECTS = {
  ru: [
    'Математика', 'Физика', 'Химия', 'Информатика', 
    'Русский язык', 'Литература', 'История', 
    'Английский язык', 'Биология', 'География', 'Общее'
  ],
  en: [
    'Mathematics', 'Physics', 'Chemistry', 'Computer Science',
    'Russian Language', 'Literature', 'History',
    'English Language', 'Biology', 'Geography', 'General'
  ]
}

export const TaskForm = () => {
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [deadline, setDeadline] = useState('')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')
  
  const addTask = useTaskStore((state) => state.addTask)
  const { t, language } = useLanguage()

  useState(() => {
    setSubject(language === 'ru' ? 'Общее' : 'General')
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim()) return
    
    addTask({
      title: title.trim(),
      subject: subject.trim(),
      deadline: deadline || new Date().toISOString().split('T')[0],
      priority,
      completed: false
    })
    
    setTitle('')
    setSubject(language === 'ru' ? 'Общее' : 'General')
    setDeadline('')
    setPriority('medium')
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        {t('taskForm.title')}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('taskForm.taskName')}
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t('taskForm.taskPlaceholder')}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('taskForm.subject')}
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            >
              {SUBJECTS[language].map((subj) => (
                <option key={subj} value={subj}>{subj}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('taskForm.deadline')}
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              lang={language}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('taskForm.priority')}
          </label>
          <div className="flex gap-2">
            {([
              { value: 'low', color: 'bg-green-500' },
              { value: 'medium', color: 'bg-yellow-500' },
              { value: 'high', color: 'bg-red-500' }
            ] as const).map(({ value, color }) => (
              <button
                key={value}
                type="button"
                onClick={() => setPriority(value)}
                className={`flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-600 transition ${
                  priority === value 
                    ? `${color} text-white border-transparent` 
                    : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
              >
                {t(`taskForm.priorities.${value}`)}
              </button>
            ))}
          </div>
        </div>
        
        <button 
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition duration-200 font-medium shadow-sm"
        >
          {t('taskForm.addButton')}
        </button>
      </form>
    </div>
  )
}