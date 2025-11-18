export const translations = {
  ru: {
    header: {
      title: "📚 School Task Manager",
      subtitle: "Организуй свои учебные задания"
    },
    taskForm: {
      title: "➕ Новая задача",
      taskName: "Задача *",
      taskPlaceholder: "Что нужно сделать?",
      subject: "Предмет",
      deadline: "Срок выполнения",
      priority: "Приоритет",
      priorities: {
        low: "✅ Низкий",
        medium: "⚠️ Средний",
        high: "🔥 Высокий"
      },
      addButton: "📌 Добавить задачу"
    },
    taskList: {
      title: "📋 Мои задачи",
      empty: {
        all: "Задач пока нет",
        active: "Все задачи выполнены! 🎉",
        completed: "Нет выполненных задач"
      },
      emptyDescription: {
        all: "Добавьте первую задачу используя форму выше",
        active: "Вы выполнили все задачи на этой неделе",
        completed: "У вас нет выполненных задач"
      },
      search: "🔍 Поиск задач",
      searchPlaceholder: "Название задачи...",
      sort: "📊 Сортировка",
      sortOptions: {
        createdAt: "По дате создания",
        deadline: "По сроку выполнения", 
        priority: "По приоритету"
      }
    },
    filters: {
      all: "Все",
      active: "Активные",
      completed: "Выполненные"
    },
    stats: {
      total: "Всего задач",
      completed: "Выполнено",
      thisWeek: "На этой неделе"
    },
    dates: {
      today: "Сегодня",
      tomorrow: "Завтра",
      yesterday: "Вчера",
      overdue: "Просрочено",
      days: "д."
    },
    notifications: {
      permission: "Разрешить уведомления о дедлайнах?",
      reminder: "Напоминание о дедлайне"
    },
    theme: {
      light: "🌞 Светлая",
      dark: "🌙 Тёмная",
      system: "⚙️ Системная"
    }
  },
  en: {
    header: {
      title: "📚 School Task Manager",
      subtitle: "Organize your study tasks"
    },
    taskForm: {
      title: "➕ New Task",
      taskName: "Task *",
      taskPlaceholder: "What needs to be done?",
      subject: "Subject",
      deadline: "Deadline",
      priority: "Priority",
      priorities: {
        low: "✅ Low",
        medium: "⚠️ Medium", 
        high: "🔥 High"
      },
      addButton: "📌 Add Task"
    },
    taskList: {
      title: "📋 My Tasks",
      empty: {
        all: "No tasks yet",
        active: "All tasks completed! 🎉",
        completed: "No completed tasks"
      },
      emptyDescription: {
        all: "Add your first task using the form above",
        active: "You've completed all tasks for this week",
        completed: "You don't have any completed tasks"
      },
      search: "🔍 Search tasks",
      searchPlaceholder: "Task title...",
      sort: "📊 Sort by",
      sortOptions: {
        createdAt: "By creation date",
        deadline: "By deadline",
        priority: "By priority"
      }
    },
    filters: {
      all: "All",
      active: "Active",
      completed: "Completed"
    },
    stats: {
      total: "Total tasks",
      completed: "Completed", 
      thisWeek: "This week"
    },
    dates: {
      today: "Today",
      tomorrow: "Tomorrow",
      yesterday: "Yesterday",
      overdue: "Overdue",
      days: "d."
    },
    notifications: {
      permission: "Allow deadline notifications?",
      reminder: "Deadline reminder"
    },
    theme: {
      light: "🌞 Light",
      dark: "🌙 Dark", 
      system: "⚙️ System"
    }
  }
}

export type Language = 'ru' | 'en'
export type TranslationKey = keyof typeof translations.ru