"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tag, Plus, Edit, Trash2, FolderOpen } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"

const categories = [
  {
    id: "cat1",
    name: "Desarrollo",
    description: "Tareas relacionadas con desarrollo de software y smart contracts",
    color: "#3b82f6",
    taskCount: 12,
  },
  {
    id: "cat2",
    name: "Marketing",
    description: "Campañas, contenido y comunicaciones",
    color: "#f59e0b",
    taskCount: 8,
  },
  {
    id: "cat3",
    name: "Comunidad",
    description: "Eventos, meetups y engagement",
    color: "#8b5cf6",
    taskCount: 15,
  },
  {
    id: "cat4",
    name: "Operaciones",
    description: "Gestión administrativa y logística",
    color: "#10b981",
    taskCount: 6,
  },
  {
    id: "cat5",
    name: "Legal",
    description: "Asuntos legales y compliance",
    color: "#ef4444",
    taskCount: 3,
  },
]

const taskTypes = [
  {
    id: "type1",
    name: "Milestone",
    description: "Hitos importantes del proyecto",
    icon: "🎯",
  },
  {
    id: "type2",
    name: "Deliverable",
    description: "Entregables específicos",
    icon: "📦",
  },
  {
    id: "type3",
    name: "Payment",
    description: "Pagos y transacciones",
    icon: "💰",
  },
  {
    id: "type4",
    name: "Review",
    description: "Revisiones y aprobaciones",
    icon: "✅",
  },
]

export default function CategoriesPage() {
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState("#3b82f6")

  const colorOptions = [
    "#3b82f6", // blue
    "#8b5cf6", // purple
    "#f59e0b", // amber
    "#10b981", // green
    "#ef4444", // red
    "#06b6d4", // cyan
    "#ec4899", // pink
    "#84cc16", // lime
  ]

  return (
    <MainLayout>
      <div className="container mx-auto p-6 space-y-8">
        {/* Categories Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Categorías y Tipos</h1>
              <p className="text-muted-foreground mt-1">Organiza las tareas y proposals de tu DAO</p>
            </div>
            <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Nueva Categoría
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Crear Categoría</DialogTitle>
                  <DialogDescription>Define una nueva categoría para organizar tareas</DialogDescription>
                </DialogHeader>
                <div className="space-y-6 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="category-name">Nombre *</Label>
                    <Input id="category-name" placeholder="ej: Desarrollo, Marketing..." />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category-description">Descripción</Label>
                    <Input id="category-description" placeholder="Describe el propósito de la categoría..." />
                  </div>

                  <div className="space-y-2">
                    <Label>Color</Label>
                    <div className="flex gap-2 flex-wrap">
                      {colorOptions.map((color) => (
                        <button
                          key={color}
                          className={`h-10 w-10 rounded-lg border-2 transition-all ${
                            selectedColor === color ? "border-primary scale-110" : "border-transparent"
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => setSelectedColor(color)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={() => setCategoryDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button>Crear Categoría</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Card key={category.id} className="glass-card hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-10 w-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${category.color}20` }}
                      >
                        <Tag className="h-5 w-5" style={{ color: category.color }} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                        <Badge variant="outline" className="mt-1">
                          {category.taskCount} tareas
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Task Types Section */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Tipos de Tarea</h2>
            <p className="text-muted-foreground mt-1">Tipos predefinidos para clasificar tareas</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {taskTypes.map((type) => (
              <Card key={type.id} className="glass-card">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{type.icon}</div>
                    <CardTitle className="text-lg">{type.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{type.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Info Card */}
        <Card className="glass-card border-primary/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5 text-primary" />
              <CardTitle>Organización Inteligente</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Las categorías te ayudan a organizar tareas por área funcional, mientras que los tipos definen la
              naturaleza del trabajo. Usa ambos para mantener tu DAO bien estructurada y facilitar el seguimiento de
              proyectos complejos.
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
