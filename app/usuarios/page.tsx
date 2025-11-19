'use client'

import { MainLayout } from '@/components/layout/main-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { UserPlus, Users, Shield, Eye, MoreVertical } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const users = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@dao.com',
    wallet: '0x742d...b4b4',
    role: 'admin',
    avatar: 'AJ',
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@dao.com',
    wallet: '0xb87e...6678',
    role: 'contributor',
    avatar: 'BS',
  },
  {
    id: '3',
    name: 'Carol Williams',
    email: 'carol@dao.com',
    wallet: '0xba8c...ef12',
    role: 'contributor',
    avatar: 'CW',
  },
  {
    id: '4',
    name: 'David Brown',
    email: 'david@dao.com',
    wallet: '0x1234...3678',
    role: 'viewer',
    avatar: 'DB',
  },
]

const roleInfo = [
  {
    role: 'admin',
    title: 'Admin',
    description: 'Acceso completo: puede crear proposals, gestionar tareas, usuarios y configuración.',
    color: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  },
  {
    role: 'contributor',
    title: 'Contributor',
    description: 'Puede crear y editar tareas, subir documentos y participar activamente.',
    color: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  },
  {
    role: 'viewer',
    title: 'Viewer',
    description: 'Solo lectura: puede ver proposals, tareas y documentos sin editar.',
    color: 'bg-muted text-muted-foreground',
  },
]

const stats = [
  { title: 'Total Usuarios', value: '4', icon: Users },
  { title: 'Admins', value: '1', icon: Shield },
  { title: 'Contributors', value: '2', icon: Users },
]

export default function UsuariosPage() {
  return (
    <MainLayout>
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h1>
            <p className="text-muted-foreground mt-1">
              Administra los miembros y roles de tu DAO
            </p>
          </div>
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" />
            Invitar Usuario
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.title} className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Users Table */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Usuarios</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Wallet</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{user.avatar}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell>
                      <code className="text-sm font-mono">{user.wallet}</code>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={
                          user.role === 'admin' 
                            ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' 
                            : user.role === 'contributor'
                            ? 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                            : 'bg-muted text-muted-foreground'
                        }
                      >
                        {user.role === 'admin' ? 'Admin' : user.role === 'contributor' ? 'Contributor' : 'Viewer'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Editar Rol</DropdownMenuItem>
                          <DropdownMenuItem>Ver Perfil</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Remover Usuario
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Role Information */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Información de Roles</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {roleInfo.map((info) => (
              <Card key={info.role} className="glass-card">
                <CardHeader>
                  <Badge variant="outline" className={info.color}>
                    {info.title}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {info.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
