import { useTaskStore } from '../store/taskStore'
import { TaskItem } from './TaskItem'
import { useLanguage } from '../i18n/LanguageContext'
import { setupNotifications, showNotification } from '../utils'
import { useEffect } from 'react'

export const TaskList = () => {
  const { 
    getFilteredTasks, 
    deleteTask, 
    toggleTask, 
    filter, 
    setFilter,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    getWeeklyStats,
    getUpcomingDeadlines
  } = useTaskStore()
  
  const { t, language } = useLanguage()
  const tasks = getFilteredTasks()
  const allTasks = useTaskStore((state) => state.tasks)
  const completedCount = allTasks.filter(t => t.completed).length
  const activeCount = allTasks.filter(t => !t.completed).length
  const weeklyStats = getWeeklyStats()

  useEffect(() => {
    setupNotifications(() => {
      const upcoming = getUpcomingDeadlines()
      if (upcoming.length > 0) {
        upcoming.forEach(task => {
          showNotification(
            t('notifications.reminder'),
            `${task.title} - ${new Date(task.deadline).toLocaleDateString()}`
          )
        })
      }
    })
  }, [getUpcomingDeadlines, t])

  const showNoResults = searchQuery.trim() !== '' && tasks.length === 0
  const showEmptyState = searchQuery.trim() === '' && tasks.length === 0

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            {t('taskList.title')}
          </h2>
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
            {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
          </span>
        </div>
        
        <div className="flex-1 max-w-md">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
            <span>{t('stats.thisWeek')}</span>
            <span>{weeklyStats.completed}/{weeklyStats.total}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: weeklyStats.total > 0 
                  ? `${(weeklyStats.completed / weeklyStats.total) * 100}%` 
                  : '0%' 
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('taskList.search')}
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('taskList.searchPlaceholder')}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('taskList.sort')}
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          >
            <option value="createdAt">{t('taskList.sortOptions.createdAt')}</option>
            <option value="deadline">{t('taskList.sortOptions.deadline')}</option>
            <option value="priority">{t('taskList.sortOptions.priority')}</option>
          </select>
        </div>
      </div>

      <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg mb-6">
        {([
          { key: 'all' as const, count: allTasks.length },
          { key: 'active' as const, count: activeCount },
          { key: 'completed' as const, count: completedCount }
        ]).map(({ key, count }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition ${
              filter === key
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {t(`filters.${key}`)} ({count})
          </button>
        ))}
      </div>
      
      {showNoResults && (
        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-6xl mb-4 opacity-60">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {language === 'ru' ? 'Ничего не найдено' : 'No results found'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {language === 'ru' 
              ? `По запросу "${searchQuery}" задач не найдено` 
              : `No tasks found for "${searchQuery}"`
            }
          </p>
        </div>
      )}
      
      {showEmptyState && (
        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-6xl mb-4 opacity-60">📝</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {t(`taskList.empty.${filter}`)}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {t(`taskList.emptyDescription.${filter}`)}
          </p>
        </div>
      )}
      
      {!showNoResults && !showEmptyState && (
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onDelete={deleteTask}
              onToggle={toggleTask}
            />
          ))}
        </div>
      )}
      
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>{t('stats.total')}: {allTasks.length}</span>
          <span>{t('stats.completed')}: {completedCount} ({allTasks.length > 0 ? Math.round((completedCount / allTasks.length) * 100) : 0}%)</span>
        </div>
      </div>
    </div>
  )
}