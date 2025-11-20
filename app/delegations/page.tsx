"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserCheck, Users, Plus, Clock, CheckCircle2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"

const delegations = [
  {
    id: "d1",
    delegatorWallet: "0x742d...b4b4",
    delegatorName: "Alice Johnson",
    delegateWallet: "0xb87e...6678",
    delegateName: "Bob Smith",
    scope: "voting" as const,
    startDate: "2025-11-01",
    endDate: "2025-12-31",
    isActive: true,
  },
  {
    id: "d2",
    delegatorWallet: "0x1234...3678",
    delegatorName: "David Brown",
    delegateWallet: "0x742d...b4b4",
    delegateName: "Alice Johnson",
    scope: "full" as const,
    startDate: "2025-10-15",
    endDate: "2025-11-30",
    isActive: true,
  },
  {
    id: "d3",
    delegatorWallet: "0xba8c...ef12",
    delegatorName: "Carol Williams",
    delegateWallet: "0xb87e...6678",
    delegateName: "Bob Smith",
    scope: "proposals" as const,
    startDate: "2025-09-01",
    endDate: "2025-10-31",
    isActive: false,
  },
]

export default function DelegationsPage() {
  const [delegateDialogOpen, setDelegateDialogOpen] = useState(false)

  const getScopeBadge = (scope: string) => {
    const colors: Record<string, string> = {
      full: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      voting: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      proposals: "bg-green-500/10 text-green-500 border-green-500/20",
    }

    const labels: Record<string, string> = {
      full: "Completo",
      voting: "Votación",
      proposals: "Proposals",
    }

    return (
      <Badge variant="outline" className={colors[scope] || ""}>
        {labels[scope] || scope}
      </Badge>
    )
  }

  return (
    <MainLayout>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Delegaciones</h1>
            <p className="text-muted-foreground mt-1">Gestiona delegaciones de permisos y votación</p>
          </div>
          <Dialog open={delegateDialogOpen} onOpenChange={setDelegateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nueva Delegación
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Crear Delegación</DialogTitle>
                <DialogDescription>Delega permisos a otro miembro de la DAO</DialogDescription>
              </DialogHeader>
              <div className="space-y-6 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="delegate-wallet">Wallet del Delegado *</Label>
                  <Input id="delegate-wallet" placeholder="0x..." className="font-mono text-sm" />
                  <p className="text-xs text-muted-foreground">La persona que recibirá los permisos delegados</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="scope">Alcance de la Delegación *</Label>
                  <Select defaultValue="voting">
                    <SelectTrigger id="scope">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">Completo - Todos los permisos</SelectItem>
                      <SelectItem value="voting">Votación - Solo votar en Snapshot</SelectItem>
                      <SelectItem value="proposals">Proposals - Gestión de proposals</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Fecha de Inicio *</Label>
                    <Input id="start-date" type="date" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="end-date">Fecha de Fin</Label>
                    <Input id="end-date" type="date" />
                    <p className="text-xs text-muted-foreground">Opcional - Sin fin si se deja vacío</p>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setDelegateDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button>Crear Delegación</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Delegaciones Activas</CardTitle>
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2</div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Delegados</CardTitle>
              <Users className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2</div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Delegantes</CardTitle>
              <UserCheck className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">3</div>
            </CardContent>
          </Card>
        </div>

        {/* Info Card */}
        <Card className="glass-card border-primary/50">
          <CardHeader>
            <CardTitle className="text-lg">¿Qué son las delegaciones?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Las delegaciones permiten a los miembros de la DAO transferir temporalmente sus permisos de votación o
              gestión a otros miembros de confianza. Esto es útil cuando no puedes participar activamente pero quieres
              que tus intereses estén representados.
            </p>
          </CardContent>
        </Card>

        {/* Delegations Table */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Delegaciones Registradas</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Delegante</TableHead>
                  <TableHead>Delegado</TableHead>
                  <TableHead>Alcance</TableHead>
                  <TableHead>Período</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {delegations.map((delegation) => (
                  <TableRow key={delegation.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-sm">{delegation.delegatorName}</p>
                        <code className="text-xs text-muted-foreground">{delegation.delegatorWallet}</code>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-sm">{delegation.delegateName}</p>
                        <code className="text-xs text-muted-foreground">{delegation.delegateWallet}</code>
                      </div>
                    </TableCell>
                    <TableCell>{getScopeBadge(delegation.scope)}</TableCell>
                    <TableCell>
                      <div className="text-sm space-y-1">
                        <p>{delegation.startDate}</p>
                        {delegation.endDate && (
                          <p className="text-xs text-muted-foreground">hasta {delegation.endDate}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {delegation.isActive ? (
                        <Badge variant="outline" className="gap-1 bg-green-500/10 text-green-500 border-green-500/20">
                          <CheckCircle2 className="h-3 w-3" />
                          Activa
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="gap-1 bg-gray-500/10 text-gray-500 border-gray-500/20">
                          <Clock className="h-3 w-3" />
                          Expirada
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {delegation.isActive && (
                        <Button variant="ghost" size="sm" className="text-destructive">
                          Revocar
                        </Button>
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
