import type { Task } from '../store/taskStore'
import { getSubjectColor, isTaskUrgent, formatDeadline, translateSubject } from '../utils'
import { useLanguage } from '../i18n/LanguageContext'

interface TaskItemProps {
  task: Task
  onDelete: (id: number) => void
  onToggle: (id: number) => void
}

export const TaskItem = ({ task, onDelete, onToggle }: TaskItemProps) => {
  const { t, language } = useLanguage()

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'high': 
        return { class: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' }
      case 'medium': 
        return { class: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' }
      case 'low': 
        return { class: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' }
      default: 
        return { class: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' }
    }
  }

  const priorityConfig = getPriorityConfig(task.priority)
  const isUrgent = isTaskUrgent(task.deadline)
  const translatedSubject = translateSubject(task.subject, language)
  const subjectColor = getSubjectColor(translatedSubject)

  const getTranslatedPriority = (priority: string) => {
    return t(`taskForm.priorities.${priority}`)
  }

  return (
    <div className={`bg-white dark:bg-gray-800 p-4 rounded-xl border transition-all duration-200 group ${
      isUrgent ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20' : 'border-gray-200 dark:border-gray-700'
    } ${task.completed ? 'opacity-60' : ''}`}>
      <div className="flex justify-between items-start gap-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <button
            onClick={() => onToggle(task.id)}
            className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition ${
              task.completed 
                ? 'bg-green-500 border-green-500 text-white' 
                : 'border-gray-300 dark:border-gray-600 hover:border-green-500'
            }`}
          >
            {task.completed && '✓'}
          </button>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <h3 className={`font-semibold text-lg wrap-break-word ${
                task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'
              }`}>
                {task.title}
              </h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${priorityConfig.class} shrink-0`}>
                {getTranslatedPriority(task.priority)}
              </span>
            </div>
            
            <div className="flex items-center gap-3 text-sm flex-wrap">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${subjectColor}`}>
                {translatedSubject}
              </span>
              
              <span className={`flex items-center gap-1 px-2 py-1 rounded ${
                isUrgent 
                  ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 font-medium' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}>
                📅 {formatDeadline(task.deadline, language)}
                {isUrgent && ' ⚠️'}
              </span>

              <span className="text-xs text-gray-500 dark:text-gray-400">
                {language === 'ru' ? 'Создано:' : 'Created:'} {new Date(task.createdAt).toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US')}
              </span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => onDelete(task.id)}
          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900 p-2 rounded-lg transition-all duration-200"
          title={language === 'ru' ? 'Удалить задачу' : 'Delete task'}
        >
          <span className="text-lg">🗑️</span>
        </button>
      </div>
    </div>
  )
}