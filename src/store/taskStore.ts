import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Task {
  id: number
  title: string
  subject: string
  deadline: string
  priority: 'low' | 'medium' | 'high'
  completed: boolean
  createdAt: number
}

interface TaskStore {
  tasks: Task[]
  filter: 'all' | 'active' | 'completed'
  searchQuery: string
  sortBy: 'createdAt' | 'deadline' | 'priority'
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void
  deleteTask: (id: number) => void
  toggleTask: (id: number) => void
  editTask: (id: number, updates: Partial<Task>) => void
  setFilter: (filter: 'all' | 'active' | 'completed') => void
  setSearchQuery: (query: string) => void
  setSortBy: (sortBy: 'createdAt' | 'deadline' | 'priority') => void
  getFilteredTasks: () => Task[]
  getWeeklyStats: () => { completed: number; total: number }
  getUpcomingDeadlines: () => Task[]
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      filter: 'all',
      searchQuery: '',
      sortBy: 'createdAt',
      
      addTask: (task) => set((state) => ({
        tasks: [...state.tasks, { ...task, id: Date.now(), createdAt: Date.now() }]
      })),
      
      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter(task => task.id !== id)
      })),
      
      toggleTask: (id) => set((state) => ({
        tasks: state.tasks.map(task => 
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      })),
      
      editTask: (id, updates) => set((state) => ({
        tasks: state.tasks.map(task => 
          task.id === id ? { ...task, ...updates } : task
        )
      })),
      
      setFilter: (filter) => set({ filter }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSortBy: (sortBy) => set({ sortBy }),
      
      getFilteredTasks: () => {
        const { tasks, filter, searchQuery, sortBy } = get()
        
        let filtered = tasks.filter(task => {
          const matchesFilter = filter === 'all' || 
            (filter === 'active' && !task.completed) || 
            (filter === 'completed' && task.completed)
          
          const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase())
          
          return matchesFilter && matchesSearch
        })

        filtered.sort((a, b) => {
          switch (sortBy) {
            case 'createdAt':
              return b.createdAt - a.createdAt
            case 'deadline':
              return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
            case 'priority':
              const priorityOrder = { high: 3, medium: 2, low: 1 }
              return priorityOrder[b.priority] - priorityOrder[a.priority]
            default:
              return 0
          }
        })

        return filtered
      },
      
      getWeeklyStats: () => {
        const { tasks } = get()
        const now = new Date()
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()))
        const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6))
        
        const weeklyTasks = tasks.filter(task => {
          const taskDate = new Date(task.createdAt)
          return taskDate >= startOfWeek && taskDate <= endOfWeek
        })
        
        return {
          completed: weeklyTasks.filter(t => t.completed).length,
          total: weeklyTasks.length
        }
      },
      
      getUpcomingDeadlines: () => {
        const { tasks } = get()
        const now = new Date()
        const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)
        
        return tasks.filter(task => {
          if (task.completed) return false
          
          const taskDeadline = new Date(task.deadline)
          return taskDeadline <= threeDaysFromNow && taskDeadline >= now
        })
      }
    }),
    {
      name: 'task-storage',
    }
  )
)