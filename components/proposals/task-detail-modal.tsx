import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { DollarSign, Package, Flag, Clock, ExternalLink, Calendar, User, Wallet, CheckCircle2 } from 'lucide-react'

const typeIcons = {
  payment: DollarSign,
  milestone: Flag,
  deliverable: Package,
  review: Clock,
}

interface TaskDetailModalProps {
  task: {
    id: string
    title: string
    type: 'payment' | 'milestone' | 'deliverable' | 'review'
    status: 'pending' | 'in-progress' | 'completed' | 'blocked'
    assignee: string
    assigneeWallet?: string
    deadline: string
    amount?: string
    txHash?: string
  }
  open: boolean
  onClose: () => void
}

export function TaskDetailModal({ task, open, onClose }: TaskDetailModalProps) {
  const Icon = typeIcons[task.type]
  const isPaymentTask = task.type === 'payment'

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-xl">{task.title}</DialogTitle>
              <p className="text-sm text-muted-foreground capitalize mt-1">
                {task.type === 'payment' ? 'Pago' : 
                 task.type === 'milestone' ? 'Hito' : 
                 task.type === 'deliverable' ? 'Entregable' : 'Revisión'}
              </p>
            </div>
            <Badge 
              variant="outline" 
              className="capitalize"
            >
              {task.status === 'in-progress' ? 'En progreso' : 
               task.status === 'pending' ? 'Pendiente' : 
               task.status === 'completed' ? 'Completada' : 'Bloqueada'}
            </Badge>
          </div>
        </DialogHeader>

        <Separator />

        <div className="space-y-6">
          {/* Task Info */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-muted-foreground flex items-center gap-2">
                <User className="h-4 w-4" />
                Asignado a
              </Label>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">
                    {task.assignee.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">{task.assignee}</span>
              </div>
              {task.assigneeWallet && (
                <p className="text-sm text-muted-foreground font-mono">
                  {task.assigneeWallet}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Fecha límite
              </Label>
              <p className="font-medium">
                {new Date(task.deadline).toLocaleDateString('es-ES', { 
                  year: 'numeric',
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>

          {/* Payment Details */}
          {isPaymentTask && task.amount && (
            <div className="space-y-4 p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <div className="flex items-center justify-between">
                <Label className="text-muted-foreground flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Monto del Pago
                </Label>
                <p className="text-2xl font-bold text-green-500">{task.amount}</p>
              </div>

              {task.txHash && (
                <div className="space-y-2">
                  <Label className="text-muted-foreground flex items-center gap-2">
                    <Wallet className="h-4 w-4" />
                    Transaction Hash
                  </Label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 px-3 py-2 rounded bg-muted text-sm font-mono truncate">
                      {task.txHash}
                    </code>
                    <Button variant="outline" size="icon" asChild>
                      <a 
                        href={`https://scrollscan.com/tx/${task.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea 
              id="description"
              placeholder="Agregar descripción de la tarea..."
              rows={4}
            />
          </div>

          {/* Comments */}
          <div className="space-y-2">
            <Label>Comentarios</Label>
            <div className="p-4 rounded-lg bg-muted/50 text-center text-sm text-muted-foreground">
              No hay comentarios aún
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            {task.status !== 'completed' && (
              <Button className="flex-1 gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Marcar como Completada
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>
              Cerrar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
