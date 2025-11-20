"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { FileText, Users, Settings, DollarSign, Clock, Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const auditLogs = [
  {
    id: "log1",
    user: {
      name: "Alice Johnson",
      avatar: "AJ",
    },
    action: "Creó una nueva proposal",
    entityType: "proposal" as const,
    entityId: "Q4 Community Meetup",
    timestamp: "2025-11-10 14:30",
    ipAddress: "192.168.1.1",
    changes: {
      title: "Q4 Community Meetup & Workshop Series",
      budget: 50000,
    },
  },
  {
    id: "log2",
    user: {
      name: "Bob Smith",
      avatar: "BS",
    },
    action: "Completó una tarea",
    entityType: "task" as const,
    entityId: "Venue Booking - San Francisco",
    timestamp: "2025-11-10 12:15",
    ipAddress: "192.168.1.2",
    changes: {
      status: "completed",
      actualHours: 18,
    },
  },
  {
    id: "log3",
    user: {
      name: "Alice Johnson",
      avatar: "AJ",
    },
    action: "Invitó un nuevo usuario",
    entityType: "user" as const,
    entityId: "john@example.com",
    timestamp: "2025-11-09 16:45",
    ipAddress: "192.168.1.1",
    changes: {
      role: "contributor",
    },
  },
  {
    id: "log4",
    user: {
      name: "Alice Johnson",
      avatar: "AJ",
    },
    action: "Aprobó un pago",
    entityType: "payment" as const,
    entityId: "$5,000 a Carol Williams",
    timestamp: "2025-11-09 10:20",
    ipAddress: "192.168.1.1",
    changes: {
      status: "approved",
      amount: 5000,
    },
  },
  {
    id: "log5",
    user: {
      name: "Bob Smith",
      avatar: "BS",
    },
    action: "Subió un documento",
    entityType: "document" as const,
    entityId: "Budget_Breakdown.xlsx",
    timestamp: "2025-11-08 09:30",
    ipAddress: "192.168.1.2",
  },
  {
    id: "log6",
    user: {
      name: "Alice Johnson",
      avatar: "AJ",
    },
    action: "Actualizó configuración",
    entityType: "setting" as const,
    entityId: "Permisos de la DAO",
    timestamp: "2025-11-07 15:00",
    ipAddress: "192.168.1.1",
    changes: {
      requireTaskApproval: true,
    },
  },
]

export default function AuditPage() {
  const getEntityIcon = (type: string) => {
    switch (type) {
      case "proposal":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "task":
        return <Clock className="h-4 w-4 text-purple-500" />
      case "user":
        return <Users className="h-4 w-4 text-green-500" />
      case "payment":
        return <DollarSign className="h-4 w-4 text-yellow-500" />
      case "document":
        return <FileText className="h-4 w-4 text-orange-500" />
      case "setting":
        return <Settings className="h-4 w-4 text-gray-500" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getEntityBadge = (type: string) => {
    const colors: Record<string, string> = {
      proposal: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      task: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      user: "bg-green-500/10 text-green-500 border-green-500/20",
      payment: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      document: "bg-orange-500/10 text-orange-500 border-orange-500/20",
      setting: "bg-gray-500/10 text-gray-500 border-gray-500/20",
    }

    return (
      <Badge variant="outline" className={`gap-1 ${colors[type] || ""}`}>
        {getEntityIcon(type)}
        {type}
      </Badge>
    )
  }

  return (
    <MainLayout>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Auditoría</h1>
          <p className="text-muted-foreground mt-1">Registro completo de actividad administrativa</p>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Eventos</CardTitle>
              <Clock className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">156</div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Hoy</CardTitle>
              <Clock className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Esta Semana</CardTitle>
              <Clock className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">47</div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Usuarios Activos</CardTitle>
              <Users className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">4</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar en el registro..." className="pl-9" />
              </div>
              <Select defaultValue="all-types">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-types">Todos los tipos</SelectItem>
                  <SelectItem value="proposal">Proposals</SelectItem>
                  <SelectItem value="task">Tareas</SelectItem>
                  <SelectItem value="user">Usuarios</SelectItem>
                  <SelectItem value="payment">Pagos</SelectItem>
                  <SelectItem value="document">Documentos</SelectItem>
                  <SelectItem value="setting">Configuración</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all-users">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-users">Todos los usuarios</SelectItem>
                  <SelectItem value="alice">Alice Johnson</SelectItem>
                  <SelectItem value="bob">Bob Smith</SelectItem>
                  <SelectItem value="carol">Carol Williams</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Audit Logs Table */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Registro de Actividad</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Acción</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Entidad</TableHead>
                  <TableHead>Fecha y Hora</TableHead>
                  <TableHead>IP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{log.user.avatar}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-sm">{log.user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{log.action}</span>
                    </TableCell>
                    <TableCell>{getEntityBadge(log.entityType)}</TableCell>
                    <TableCell>
                      <span className="text-sm font-medium">{log.entityId}</span>
                      {log.changes && (
                        <div className="text-xs text-muted-foreground mt-1">
                          {Object.entries(log.changes).map(([key, value]) => (
                            <div key={key}>
                              {key}: {JSON.stringify(value)}
                            </div>
                          ))}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{log.timestamp}</span>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs text-muted-foreground">{log.ipAddress}</code>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
