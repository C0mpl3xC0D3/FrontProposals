"use client"

import { use, useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChevronLeft,
  User,
  Calendar,
  DollarSign,
  FileText,
  Edit,
  CheckCircle2,
  XCircle,
  Timer,
  Target,
} from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"

const taskData = {
  t1: {
    id: "t1",
    proposalId: "1",
    proposalTitle: "Q4 Community Meetup & Workshop Series",
    title: "Venue Booking - San Francisco",
    description:
      "Reserve and secure venue for the Q4 community meetup in San Francisco. Capacity for 200+ attendees, with AV equipment and catering facilities.",
    type: "milestone",
    state: "completed",
    priority: "high",
    assignee: {
      name: "Bob Smith",
      wallet: "0xb87e...6678",
      avatar: "BS",
    },
    category: "Logística",
    deadline: "2025-11-01",
    createdAt: "2025-10-15",
    completedAt: "2025-10-28",
    estimatedHours: 20,
    actualHours: 18,
    budgetAllocated: 5000,
    documents: [
      { id: "d1", name: "Venue_Contract.pdf", uploadedAt: "2025-10-20" },
      { id: "d2", name: "Floor_Plan.pdf", uploadedAt: "2025-10-25" },
    ],
    comments: [
      {
        id: "c1",
        user: "Bob Smith",
        avatar: "BS",
        content: "Secured the venue! Contract signed and deposit paid.",
        timestamp: "2025-10-28 14:30",
      },
    ],
  },
}

export default function TaskDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const task = taskData[id as keyof typeof taskData]
  const [comment, setComment] = useState("")

  if (!task) {
    return (
      <MainLayout>
        <div className="p-6">Tarea no encontrada</div>
      </MainLayout>
    )
  }

  const getStateColor = (state: string) => {
    switch (state) {
      case "completed":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "in-progress":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "rejected":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return ""
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "milestone":
        return <Target className="h-4 w-4" />
      case "payment":
        return <DollarSign className="h-4 w-4" />
      case "deliverable":
        return <FileText className="h-4 w-4" />
      default:
        return <CheckCircle2 className="h-4 w-4" />
    }
  }

  return (
    <MainLayout>
      <div className="container mx-auto p-6 max-w-5xl space-y-6">
        {/* Header */}
        <div className="flex items-start gap-4">
          <Link href={`/proposals/${task.proposalId}`}>
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href={`/proposals/${task.proposalId}`} className="hover:text-primary transition-colors">
                {task.proposalTitle}
              </Link>
              <span>/</span>
              <span>Tarea #{task.id}</span>
            </div>
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-3xl font-bold tracking-tight">{task.title}</h1>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Edit className="h-4 w-4" />
                Editar
              </Button>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className={getStateColor(task.state)}>
                {task.state === "completed" && "Completada"}
                {task.state === "in-progress" && "En Progreso"}
                {task.state === "pending" && "Pendiente"}
              </Badge>
              <Badge variant="outline" className="gap-1">
                {getTypeIcon(task.type)}
                {task.type}
              </Badge>
              <Badge
                variant="outline"
                className={
                  task.priority === "high"
                    ? "border-red-500/50 text-red-500"
                    : task.priority === "medium"
                      ? "border-yellow-500/50 text-yellow-500"
                      : "border-green-500/50 text-green-500"
                }
              >
                Prioridad: {task.priority}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Descripción</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{task.description}</p>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="activity" className="space-y-4">
              <TabsList>
                <TabsTrigger value="activity">Actividad</TabsTrigger>
                <TabsTrigger value="documents">Documentos ({task.documents.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="activity" className="space-y-4">
                {/* Comments */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Comentarios</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {task.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{comment.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{comment.user}</span>
                            <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{comment.content}</p>
                        </div>
                      </div>
                    ))}

                    {/* Add Comment */}
                    <div className="pt-4 border-t border-border space-y-3">
                      <Textarea
                        placeholder="Agregar un comentario..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={3}
                      />
                      <div className="flex justify-end">
                        <Button size="sm">Comentar</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="space-y-4">
                <div className="grid gap-3">
                  {task.documents.map((doc) => (
                    <Card key={doc.id} className="glass-card hover:border-primary/50 transition-colors cursor-pointer">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-sm text-muted-foreground">Subido {doc.uploadedAt}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Assignee */}
            <Card className="glass-card">
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>Asignado a</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{task.assignee.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{task.assignee.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">{task.assignee.wallet}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Fecha límite</span>
                  </div>
                  <p className="font-medium">{task.deadline}</p>
                </div>

                {task.budgetAllocated && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <DollarSign className="h-4 w-4" />
                      <span>Presupuesto</span>
                    </div>
                    <p className="font-medium">${task.budgetAllocated.toLocaleString()}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Timer className="h-4 w-4" />
                    <span>Horas</span>
                  </div>
                  <p className="font-medium">
                    {task.actualHours || 0} / {task.estimatedHours}h
                  </p>
                  <Progress value={((task.actualHours || 0) / task.estimatedHours) * 100} className="h-1.5" />
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            {task.state !== "completed" && (
              <Card className="glass-card">
                <CardContent className="pt-6 space-y-2">
                  <Button className="w-full gap-2" variant="default">
                    <CheckCircle2 className="h-4 w-4" />
                    Marcar Completada
                  </Button>
                  <Button className="w-full gap-2 bg-transparent" variant="outline">
                    <XCircle className="h-4 w-4" />
                    Rechazar
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
