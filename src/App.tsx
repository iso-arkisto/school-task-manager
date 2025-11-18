import { Header } from './components/Header'
import { TaskForm } from './components/TaskForm'
import { TaskList } from './components/TaskList'
import { LanguageProvider } from './i18n/LanguageContext'

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <TaskForm />
            <TaskList />
          </div>
        </main>
      </div>
    </LanguageProvider>
  )
}

export default App