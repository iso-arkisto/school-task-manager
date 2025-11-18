const SUBJECT_TRANSLATIONS: Record<string, { ru: string; en: string }> = {
  'Mathematics': { ru: 'Математика', en: 'Mathematics' },
  'Математика': { ru: 'Математика', en: 'Mathematics' },
  'Physics': { ru: 'Физика', en: 'Physics' },
  'Физика': { ru: 'Физика', en: 'Physics' },
  'Chemistry': { ru: 'Химия', en: 'Chemistry' },
  'Химия': { ru: 'Химия', en: 'Chemistry' },
  'Computer Science': { ru: 'Информатика', en: 'Computer Science' },
  'Информатика': { ru: 'Информатика', en: 'Computer Science' },
  'Russian Language': { ru: 'Русский язык', en: 'Russian Language' },
  'Русский язык': { ru: 'Русский язык', en: 'Russian Language' },
  'Literature': { ru: 'Литература', en: 'Literature' },
  'Литература': { ru: 'Литература', en: 'Literature' },
  'History': { ru: 'История', en: 'History' },
  'История': { ru: 'История', en: 'History' },
  'English Language': { ru: 'Английский язык', en: 'English Language' },
  'Английский язык': { ru: 'Английский язык', en: 'English Language' },
  'Biology': { ru: 'Биология', en: 'Biology' },
  'Биология': { ru: 'Биология', en: 'Biology' },
  'Geography': { ru: 'География', en: 'Geography' },
  'География': { ru: 'География', en: 'Geography' },
  'General': { ru: 'Общее', en: 'General' },
  'Общее': { ru: 'Общее', en: 'General' }
}

export const getSubjectColor = (subject: string) => {
  const colorMap: { [key: string]: string } = {
    'математика': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'mathematics': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'физика': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'physics': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'химия': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'chemistry': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'информатика': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    'computer science': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    'русский язык': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    'russian language': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    'литература': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    'literature': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    'история': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'history': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'английский язык': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    'english language': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    'биология': 'bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-200',
    'biology': 'bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-200',
    'география': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
    'geography': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
    'общее': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    'general': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  }
  
  const normalizedSubject = subject.toLowerCase().trim()
  return colorMap[normalizedSubject] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
}

export const translateSubject = (subject: string, language: 'ru' | 'en'): string => {
  const translation = SUBJECT_TRANSLATIONS[subject]
  return translation ? translation[language] : subject
}

export const isTaskUrgent = (deadline: string): boolean => {
  const today = new Date()
  const taskDate = new Date(deadline)
  const diffTime = taskDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays <= 3 && diffDays >= 0
}

export const formatDeadline = (deadline: string, language: 'ru' | 'en'): string => {
  const today = new Date()
  const taskDate = new Date(deadline)
  const diffTime = taskDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (language === 'ru') {
    if (diffDays === 0) return 'Сегодня'
    if (diffDays === 1) return 'Завтра'
    if (diffDays === -1) return 'Вчера'
    if (diffDays < 0) return `Просрочено на ${Math.abs(diffDays)} д.`
    if (diffDays <= 3) return `Через ${diffDays} д.`
  } else {
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Tomorrow'
    if (diffDays === -1) return 'Yesterday'
    if (diffDays < 0) return `Overdue by ${Math.abs(diffDays)} d.`
    if (diffDays <= 3) return `In ${diffDays} d.`
  }
  
  return taskDate.toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US')
}

export const setupNotifications = (onPermissionGranted: () => void) => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications')
    return
  }

  if (Notification.permission === 'default') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        onPermissionGranted()
      }
    })
  } else if (Notification.permission === 'granted') {
    onPermissionGranted()
  }
}

export const showNotification = (title: string, body: string) => {
  if (Notification.permission === 'granted') {
    new Notification(title, { body, icon: '/vite.svg' })
  }
}

export const getWeeklyStats = (tasks: any[]) => {
  const now = new Date()
  const startOfWeek = new Date(now)
  startOfWeek.setDate(now.getDate() - now.getDay())
  startOfWeek.setHours(0, 0, 0, 0)
  
  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 6)
  endOfWeek.setHours(23, 59, 59, 999)
  
  const weeklyTasks = tasks.filter((task: any) => {
    const taskDate = new Date(task.createdAt)
    return taskDate >= startOfWeek && taskDate <= endOfWeek
  })
  
  return {
    completed: weeklyTasks.filter((t: any) => t.completed).length,
    total: weeklyTasks.length
  }
}