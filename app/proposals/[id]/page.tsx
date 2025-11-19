'use client'

import { use } from 'react'
import { MainLayout } from '@/components/layout/main-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Clock, DollarSign, FileText, Plus, MoreVertical, CheckCircle2, Circle, AlertCircle } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TaskCard } from '@/components/proposals/task-card'
import { TaskDetailModal } from '@/components/proposals/task-detail-modal'
import { useState } from 'react'

const proposalData = {
  '1': {
    id: '1',
    title: 'Q4 Community Meetup & Workshop Series',
    description: 'Organize quarterly community meetups and educational workshops across major cities to increase DAO awareness and onboard new contributors.',
    dao: 'MetaDAO',
    status: 'in-progress',
    progress: 65,
    budgetUsed: 15000,
    budgetTotal: 50000,
    snapshotId: 'proposal-123',
    snapshotUrl: 'https://snapshot.org/#/metadao.eth/proposal/0x123',
    tasks: [
      {
        id: 't1',
        title: 'Venue Booking - San Francisco',
        type: 'milestone',
        status: 'completed',
        assignee: 'Bob Smith',
        assigneeWallet: '0xb8...6678',
        deadline: '2025-11-01',
      },
      {
        id: 't2',
        title: 'Speaker Payment - Workshop Lead',
        type: 'payment',
        status: 'in-progress',
        assignee: 'Carol Williams',
        assigneeWallet: '0xba...ef12',
        deadline: '2025-11-15',
        amount: '$5,000',
        txHash: '0x1234...5678',
      },
      {
        id: 't3',
        title: 'Marketing Campaign Launch',
        type: 'deliverable',
        status: 'pending',
        assignee: 'David Brown',
        assigneeWallet: '0x12...3678',
        deadline: '2025-12-01',
      },
    ],
    documents: [
      { id: 'd1', name: 'Event_Proposal.pdf', size: '2.3 MB', uploadedAt: '2025-11-01' },
      { id: 'd2', name: 'Budget_Breakdown.xlsx', size: '1.1 MB', uploadedAt: '2025-11-05' },
    ],
  },
}

export default function ProposalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const proposal = proposalData[id as keyof typeof proposalData]
  const [selectedTask, setSelectedTask] = useState<typeof proposal.tasks[0] | null>(null)
  const [view, setView] = useState<'list' | 'kanban'>('list')

  if (!proposal) {
    return <MainLayout><div className="p-6">Proposal not found</div></MainLayout>
  }

  const tasksByStatus = {
    pending: proposal.tasks.filter(t => t.status === 'pending'),
    'in-progress': proposal.tasks.filter(t => t.status === 'in-progress'),
    completed: proposal.tasks.filter(t => t.status === 'completed'),
  }

  return (
    <MainLayout>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="gap-1">
                  <Clock className="h-3 w-3" />
                  In Progress
                </Badge>
                <a 
                  href={proposal.snapshotUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
                >
                  Ver en Snapshot
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <h1 className="text-3xl font-bold tracking-tight">{proposal.title}</h1>
              <p className="text-muted-foreground">{proposal.description}</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Editar Proposal</DropdownMenuItem>
                <DropdownMenuItem>Exportar Reporte</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Cancelar Proposal</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Progress Card */}
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">{proposal.progress}%</span>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Progreso General</p>
                      <p className="text-xs text-muted-foreground">
                        {proposal.tasks.filter(t => t.status === 'completed').length} de {proposal.tasks.length} tareas completadas
                      </p>
                    </div>
                  </div>
                  <Progress value={proposal.progress} className="h-2 mt-2" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Presupuesto</p>
                      <p className="font-semibold">
                        ${proposal.budgetUsed.toLocaleString()} / ${proposal.budgetTotal.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Progress 
                    value={(proposal.budgetUsed / proposal.budgetTotal) * 100} 
                    className="h-2 mt-2"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Documentos</p>
                      <p className="font-semibold">{proposal.documents.length} archivos</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="tasks" className="space-y-6">
          <TabsList>
            <TabsTrigger value="tasks">Tareas</TabsTrigger>
            <TabsTrigger value="documents">Documentos</TabsTrigger>
            <TabsTrigger value="activity">Actividad</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant={view === 'list' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setView('list')}
                >
                  Lista
                </Button>
                <Button
                  variant={view === 'kanban' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setView('kanban')}
                >
                  Kanban
                </Button>
              </div>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nueva Tarea
              </Button>
            </div>

            {view === 'list' ? (
              <div className="space-y-3">
                {proposal.tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onClick={() => setSelectedTask(task)}
                  />
                ))}
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-3">
                {(['pending', 'in-progress', 'completed'] as const).map((status) => (
                  <div key={status} className="space-y-3">
                    <div className="flex items-center gap-2 pb-2">
                      {status === 'pending' && <Circle className="h-4 w-4 text-muted-foreground" />}
                      {status === 'in-progress' && <AlertCircle className="h-4 w-4 text-blue-500" />}
                      {status === 'completed' && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                      <h3 className="font-semibold capitalize">
                        {status === 'pending' && 'Pendiente'}
                        {status === 'in-progress' && 'En Progreso'}
                        {status === 'completed' && 'Completadas'}
                      </h3>
                      <Badge variant="secondary" className="ml-auto">
                        {tasksByStatus[status].length}
                      </Badge>
                    </div>
                    {tasksByStatus[status].map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onClick={() => setSelectedTask(task)}
                        compact
                      />
                    ))}
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                {proposal.documents.length} documentos adjuntos
              </p>
              <Button variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Subir Documento
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {proposal.documents.map((doc) => (
                <Card key={doc.id} className="glass-card hover:border-primary/50 transition-colors cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {doc.size} · Subido {doc.uploadedAt}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <Card className="glass-card">
              <CardContent className="pt-6">
                <p className="text-muted-foreground text-center py-8">
                  No hay actividad reciente
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          open={!!selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </MainLayout>
  )
}
