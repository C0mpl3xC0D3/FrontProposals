"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Wallet, Clock, CheckCircle2, XCircle, Copy, Send } from "lucide-react"
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

const invitations = [
  {
    id: "inv1",
    email: "john@example.com",
    wallet: "0xabc...def",
    role: "contributor",
    invitedBy: "Alice Johnson",
    invitedAt: "2025-11-08",
    expiresAt: "2025-11-15",
    status: "pending" as const,
  },
  {
    id: "inv2",
    email: "sarah@example.com",
    role: "viewer",
    invitedBy: "Bob Smith",
    invitedAt: "2025-11-05",
    expiresAt: "2025-11-12",
    status: "accepted" as const,
  },
  {
    id: "inv3",
    email: "mike@example.com",
    wallet: "0x123...456",
    role: "contributor",
    invitedBy: "Alice Johnson",
    invitedAt: "2025-10-20",
    expiresAt: "2025-10-27",
    status: "expired" as const,
  },
]

export default function InvitationsPage() {
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)
  const [inviteMethod, setInviteMethod] = useState<"email" | "wallet">("email")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
        return (
          <Badge variant="outline" className="gap-1 bg-green-500/10 text-green-500 border-green-500/20">
            <CheckCircle2 className="h-3 w-3" />
            Aceptada
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="gap-1 bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
            <Clock className="h-3 w-3" />
            Pendiente
          </Badge>
        )
      case "expired":
        return (
          <Badge variant="outline" className="gap-1 bg-red-500/10 text-red-500 border-red-500/20">
            <XCircle className="h-3 w-3" />
            Expirada
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
            <h1 className="text-3xl font-bold tracking-tight">Invitaciones</h1>
            <p className="text-muted-foreground mt-1">Invita nuevos miembros por email o wallet</p>
          </div>
          <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Send className="h-4 w-4" />
                Nueva Invitación
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Invitar Nuevo Miembro</DialogTitle>
                <DialogDescription>Envía una invitación por email o wallet address</DialogDescription>
              </DialogHeader>
              <div className="space-y-6 pt-4">
                {/* Method Selector */}
                <div className="flex gap-2">
                  <Button
                    variant={inviteMethod === "email" ? "secondary" : "outline"}
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={() => setInviteMethod("email")}
                  >
                    <Mail className="h-4 w-4" />
                    Email
                  </Button>
                  <Button
                    variant={inviteMethod === "wallet" ? "secondary" : "outline"}
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={() => setInviteMethod("wallet")}
                  >
                    <Wallet className="h-4 w-4" />
                    Wallet
                  </Button>
                </div>

                {/* Email Form */}
                {inviteMethod === "email" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" placeholder="ejemplo@email.com" />
                      <p className="text-xs text-muted-foreground">Se enviará un código OTP para verificar el email</p>
                    </div>
                  </div>
                )}

                {/* Wallet Form */}
                {inviteMethod === "wallet" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="wallet">Wallet Address *</Label>
                      <Input id="wallet" placeholder="0x..." className="font-mono text-sm" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email-optional">Email (opcional)</Label>
                      <Input id="email-optional" type="email" placeholder="ejemplo@email.com" />
                      <p className="text-xs text-muted-foreground">Para enviar notificaciones</p>
                    </div>
                  </div>
                )}

                {/* Role Selection */}
                <div className="space-y-2">
                  <Label htmlFor="role">Rol *</Label>
                  <Select defaultValue="contributor">
                    <SelectTrigger id="role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="contributor">Contributor</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setInviteDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button className="gap-2">
                    <Send className="h-4 w-4" />
                    Enviar Invitación
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Info Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pendientes</CardTitle>
              <Clock className="h-5 w-5 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1</div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Aceptadas</CardTitle>
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1</div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Este Mes</CardTitle>
              <Send className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2</div>
            </CardContent>
          </Card>
        </div>

        {/* Invitations Table */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Invitaciones Enviadas</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Destinatario</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Invitado Por</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Expira</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invitations.map((invite) => (
                  <TableRow key={invite.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{invite.email}</span>
                        </div>
                        {invite.wallet && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Wallet className="h-3 w-3" />
                            <code>{invite.wallet}</code>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          invite.role === "admin"
                            ? "bg-purple-500/10 text-purple-500 border-purple-500/20"
                            : invite.role === "contributor"
                              ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                              : "bg-muted text-muted-foreground"
                        }
                      >
                        {invite.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{invite.invitedBy}</TableCell>
                    <TableCell className="text-sm">{invite.invitedAt}</TableCell>
                    <TableCell className="text-sm">{invite.expiresAt}</TableCell>
                    <TableCell>{getStatusBadge(invite.status)}</TableCell>
                    <TableCell className="text-right">
                      {invite.status === "pending" && (
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Copy className="h-3 w-3" />
                          Copiar Link
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
