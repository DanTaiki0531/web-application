"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatePresence, motion } from 'framer-motion'
import { BarChart2, Briefcase, Clock, PlusCircle, Users, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type Task = {
  id: number
  name: string
  weight: number
  status: 'Pending' | 'In Progress' | 'Completed'
  assignee: string
  bestFor: string[]
}

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8']

const lineChartData = [
  { name: 'Mon', tasks: 4 },
  { name: 'Tue', tasks: 3 },
  { name: 'Wed', tasks: 5 },
  { name: 'Thu', tasks: 7 },
  { name: 'Fri', tasks: 6 },
  { name: 'Sat', tasks: 4 },
  { name: 'Sun', tasks: 3 },
]

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: 'Develop Frontend', weight: 30, status: 'In Progress', assignee: 'Alice Johnson', bestFor: ['UI/UX Designer', 'Frontend Developer'] },
    { id: 2, name: 'Backend Integration', weight: 25, status: 'Pending', assignee: 'Bob Smith', bestFor: ['Backend Developer', 'DevOps Engineer'] },
    { id: 3, name: 'User Testing', weight: 20, status: 'Completed', assignee: 'Charlie Brown', bestFor: ['QA Tester', 'UX Researcher'] },
    { id: 4, name: 'Documentation', weight: 15, status: 'In Progress', assignee: 'Diana Prince', bestFor: ['Technical Writer', 'Product Manager'] },
    { id: 5, name: 'Deployment', weight: 10, status: 'Pending', assignee: 'Ethan Hunt', bestFor: ['DevOps Engineer', 'System Administrator'] },
  ])
  const [newTaskName, setNewTaskName] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  const [showAllButtonsPressed, setShowAllButtonsPressed] = useState(false)
  const [pressedButtons, setPressedButtons] = useState<string[]>([])

  const addTask = () => {
    if (newTaskName.trim()) {
      const newTask: Task = {
        id: tasks.length + 1,
        name: newTaskName,
        weight: 10,
        status: 'Pending',
        assignee: 'Unassigned',
        bestFor: ['Team Member']
      }
      setTasks([...tasks, newTask])
      setNewTaskName('')
    }
  }

  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.status === 'Completed').length
  const inProgressTasks = tasks.filter(task => task.status === 'In Progress').length

  const handleButtonPress = (buttonName: string) => {
    if (pressedButtons.includes(buttonName)) {
      setPressedButtons(pressedButtons.filter(btn => btn !== buttonName))
    } else {
      setPressedButtons([...pressedButtons, buttonName])
    }
  }

  useEffect(() => {
    if (pressedButtons.length === 4) {
      setShowAllButtonsPressed(true)
    } else {
      setShowAllButtonsPressed(false)
    }
  }, [pressedButtons])

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-64 bg-white shadow-md"
      >
        <div className="p-4">
          <h1 className="text-2xl font-bold text-pink-600">Nexus Task Sphere</h1>
        </div>
        <nav className="mt-4">
          {['Dashboard', 'Projects', 'Tasks', 'Team', 'Reports', 'Settings'].map((item) => (
            <a key={item} href="#" className="block py-2 px-4 text-gray-600 hover:bg-pink-100 hover:text-pink-600 transition-colors duration-200">
              {item}
            </a>
          ))}
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard title="Total Tasks" value={totalTasks} icon={<Briefcase className="h-6 w-6" />} color="bg-pink-500" onPress={() => handleButtonPress('Total Tasks')} />
              <StatsCard title="Completed" value={completedTasks} icon={<BarChart2 className="h-6 w-6" />} color="bg-purple-500" onPress={() => handleButtonPress('Completed')} />
              <StatsCard title="In Progress" value={inProgressTasks} icon={<Clock className="h-6 w-6" />} color="bg-blue-500" onPress={() => handleButtonPress('In Progress')} />
              <StatsCard title="Team Members" value={5} icon={<Users className="h-6 w-6" />} color="bg-orange-500" onPress={() => handleButtonPress('Team Members')} />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Task Completion Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={lineChartData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="tasks" stroke="#FF6B6B" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Task Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={tasks}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="weight"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {tasks.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tasks">
            <Card>
              <CardHeader>
                <CardTitle>Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2 mb-4">
                  <Input
                    placeholder="New task name"
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                    className="flex-grow"
                  />
                  <Button onClick={addTask} className="bg-pink-600 hover:bg-pink-700">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Task
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task</TableHead>
                      <TableHead>Weight</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assignee</TableHead>
                      <TableHead>Best For</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell className="font-medium">{task.name}</TableCell>
                        <TableCell>{task.weight}%</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold
                            ${task.status === 'Completed' ? 'bg-green-200 text-green-800' :
                              task.status === 'In Progress' ? 'bg-blue-200 text-blue-800' :
                                'bg-yellow-200 text-yellow-800'}`}>
                            {task.status}
                          </span>
                        </TableCell>
                        <TableCell>{task.assignee}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {task.bestFor.map((role, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-200 text-gray-800 rounded-full text-xs">
                                {role}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team">
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Tasks Assigned</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Prince', 'Ethan Hunt'].map((name, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{name}</TableCell>
                        <TableCell>{['UI/UX Designer', 'Backend Developer', 'QA Tester', 'Technical Writer', 'DevOps Engineer'][index]}</TableCell>
                        <TableCell>{Math.floor(Math.random() * 5) + 1}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* All Buttons Pressed Display */}
      <AnimatePresence>
        {showAllButtonsPressed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">All Buttons Pressed!</h2>
                <button onClick={() => setPressedButtons([])} className="text-gray-500 hover:text-gray-700">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <p className="text-gray-600 mb-4">Congratulations! You've activated all dashboard features.</p>
              <ul className="list-disc list-inside mb-4 text-gray-600">
                <li>Total Tasks: {totalTasks}</li>
                <li>Completed Tasks: {completedTasks}</li>
                <li>In Progress Tasks: {inProgressTasks}</li>
                <li>Team Members: 5</li>
              </ul>
              <Button onClick={() => setPressedButtons([])} className="w-full bg-pink-600 hover:bg-pink-700">
                Close
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function StatsCard({ title, value, icon, color, onPress }: { title: string, value: number, icon: React.ReactNode, color: string, onPress: () => void }) {
  return (
    <Card>
      <CardContent className="p-6">
        <button 
          onClick={onPress}
          className="w-full text-left focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-lg transition-shadow duration-200"
        >
          <div className="flex items-center">
            <div className={`rounded-full p-3 ${color}`}>
              {icon}
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{title}</p>
              <p className="text-2xl font-semibold text-gray-900">{value}</p>
            </div>
          </div>
        </button>
      </CardContent>
    </Card>
  )
}