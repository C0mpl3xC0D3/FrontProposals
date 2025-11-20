"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DollarSign, Clock, CheckCircle2, XCircle, AlertCircle, ExternalLink, Plus, Search } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const payments = [
  {
    id: "p1",
    proposalTitle: "Q4 Community Meetup",
    taskTitle: "Speaker Payment - Workshop Lead",
    amount: 5000,
    currency: "USDC",
    recipient: {
      name: "Carol Williams",
      wallet: "0xba8c...ef12",
      avatar: "CW",
    },
    status: "completed" as const,
    txHash: "0x1234567890abcdef...",
    requestedBy: "Alice Johnson",
    approvedBy: "Alice Johnson",
    requestedAt: "2025-11-05 10:00",
    completedAt: "2025-11-05 14:30",
  },
  {
    id: "p2",
    proposalTitle: "Q4 Community Meetup",
    taskTitle: "Marketing Materials",
    amount: 2500,
    currency: "USDC",
    recipient: {
      name: "David Brown",
      wallet: "0x1234...3678",
      avatar: "DB",
    },
    status: "pending" as const,
    requestedBy: "Bob Smith",
    requestedAt: "2025-11-08 09:00",
  },
  {
    id: "p3",
    proposalTitle: "Treasury Diversification",
    taskTitle: "Audit Services",
    amount: 15000,
    currency: "USDC",
    recipient: {
      name: "External Auditor",
      wallet: "0xabcd...5678",
      avatar: "EA",
    },
    status: "processing" as const,
    requestedBy: "Alice Johnson",
    approvedBy: "Alice Johnson",
    requestedAt: "2025-11-10 11:00",
  },
]

const stats = [
  {
    title: "Total Pagado",
    value: "$5,000",
    icon: CheckCircle2,
    color: "text-green-500",
  },
  {
    title: "Pendiente",
    value: "$17,500",
    icon: Clock,
    color: "text-yellow-500",
  },
  {
    title: "Este Mes",
    value: "3",
    icon: DollarSign,
    color: "text-primary",
  },
]

export default function PaymentsPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="gap-1 bg-green-500/10 text-green-500 border-green-500/20">
            <CheckCircle2 className="h-3 w-3" />
            Completado
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="outline" className="gap-1 bg-blue-500/10 text-blue-500 border-blue-500/20">
            <Clock className="h-3 w-3" />
            Procesando
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="gap-1 bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
            <AlertCircle className="h-3 w-3" />
            Pendiente
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="outline" className="gap-1 bg-red-500/10 text-red-500 border-red-500/20">
            <XCircle className="h-3 w-3" />
            Fallido
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <MainLayout>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Pagos</h1>
            <p className="text-muted-foreground mt-1">Gestiona pagos asociados a tareas</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Solicitar Pago
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.title} className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar pagos..." className="pl-9" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="pending">Pendientes</SelectItem>
                  <SelectItem value="processing">Procesando</SelectItem>
                  <SelectItem value="completed">Completados</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Payments Table */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Historial de Pagos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tarea</TableHead>
                  <TableHead>Destinatario</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead className="text-right">TX</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">{payment.taskTitle}</p>
                        <p className="text-sm text-muted-foreground">{payment.proposalTitle}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{payment.recipient.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{payment.recipient.name}</p>
                          <p className="text-xs text-muted-foreground font-mono">{payment.recipient.wallet}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-semibold">${payment.amount.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">{payment.currency}</p>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{payment.requestedAt}</p>
                        {payment.completedAt && (
                          <p className="text-xs text-muted-foreground">Completado: {payment.completedAt}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {payment.txHash ? (
                        <Button variant="ghost" size="sm" className="gap-1">
                          <ExternalLink className="h-3 w-3" />
                          Ver
                        </Button>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
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
