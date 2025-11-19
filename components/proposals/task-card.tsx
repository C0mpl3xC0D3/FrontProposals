import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { DollarSign, Package, Flag, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

const typeIcons = {
  payment: DollarSign,
  milestone: Flag,
  deliverable: Package,
  review: Clock,
}

const typeColors = {
  payment: 'text-green-500 bg-green-500/10',
  milestone: 'text-blue-500 bg-blue-500/10',
  deliverable: 'text-purple-500 bg-purple-500/10',
  review: 'text-orange-500 bg-orange-500/10',
}

const statusColors = {
  pending: 'bg-muted text-muted-foreground',
  'in-progress': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  completed: 'bg-green-500/10 text-green-500 border-green-500/20',
  blocked: 'bg-red-500/10 text-red-500 border-red-500/20',
}

interface TaskCardProps {
  task: {
    id: string
    title: string
    type: 'payment' | 'milestone' | 'deliverable' | 'review'
    status: 'pending' | 'in-progress' | 'completed' | 'blocked'
    assignee: string
    deadline: string
    amount?: string
  }
  onClick?: () => void
  compact?: boolean
}

export function TaskCard({ task, onClick, compact }: TaskCardProps) {
  const Icon = typeIcons[task.type]

  return (
    <Card 
      className={cn(
        "glass-card hover:border-primary/50 transition-all cursor-pointer",
        compact && "border-l-2 border-l-primary"
      )}
      onClick={onClick}
    >
      <CardContent className={cn("pt-6", compact && "pt-4 pb-4")}>
        <div className="flex items-start gap-3">
          <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center shrink-0", typeColors[task.type])}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-medium leading-tight">{task.title}</h4>
              <Badge 
                variant="outline" 
                className={cn("shrink-0 capitalize", statusColors[task.status])}
              >
                {task.status === 'in-progress' ? 'En progreso' : 
                 task.status === 'pending' ? 'Pendiente' : 
                 task.status === 'completed' ? 'Completada' : 'Bloqueada'}
              </Badge>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Avatar className="h-5 w-5">
                  <AvatarFallback className="text-[10px]">
                    {task.assignee.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span>{task.assignee}</span>
              </div>
              <span>·</span>
              <span>{new Date(task.deadline).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}</span>
              {task.amount && (
                <>
                  <span>·</span>
                  <span className="font-semibold text-green-500">{task.amount}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
