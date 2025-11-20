"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, Save, ExternalLink, Plus, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function NewProposalPage() {
  const [categories, setCategories] = useState<string[]>(["Desarrollo"])

  const addCategory = () => {
    setCategories([...categories, ""])
  }

  const removeCategory = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index))
  }

  return (
    <MainLayout>
      <div className="container mx-auto p-6 max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Nueva Proposal</h1>
            <p className="text-muted-foreground mt-1">Crea una propuesta para dar seguimiento</p>
          </div>
        </div>

        {/* Basic Info */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Información Básica</CardTitle>
            <CardDescription>Datos principales de la proposal</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Título de la Proposal *</Label>
              <Input id="title" placeholder="ej: Q4 Community Meetup & Workshop Series" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción *</Label>
              <Textarea id="description" placeholder="Describe los objetivos y alcance de la proposal..." rows={5} />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="start-date">Fecha de Inicio</Label>
                <Input id="start-date" type="date" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="end-date">Fecha Estimada de Fin</Label>
                <Input id="end-date" type="date" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Snapshot Connection */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Conexión con Snapshot</CardTitle>
            <CardDescription>Vincula esta proposal con Snapshot</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="snapshot-id">ID de Snapshot</Label>
              <Input id="snapshot-id" placeholder="ej: 0x123abc..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="snapshot-url">URL de Snapshot</Label>
              <div className="flex gap-2">
                <Input id="snapshot-url" placeholder="https://snapshot.org/#/..." />
                <Button variant="outline" size="icon">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Budget */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Presupuesto</CardTitle>
            <CardDescription>Define el presupuesto total aprobado</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Presupuesto Total (USD) *</Label>
              <Input id="budget" type="number" placeholder="50000" />
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Categorías</CardTitle>
                <CardDescription>Organiza la proposal por áreas</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={addCategory}>
                <Plus className="h-4 w-4" />
                Agregar
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {categories.map((category, index) => (
              <div key={index} className="flex items-center gap-2">
                <Select defaultValue={category}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Selecciona categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Desarrollo">Desarrollo</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Comunidad">Comunidad</SelectItem>
                    <SelectItem value="Operaciones">Operaciones</SelectItem>
                    <SelectItem value="Legal">Legal</SelectItem>
                  </SelectContent>
                </Select>
                {categories.length > 1 && (
                  <Button variant="ghost" size="icon" onClick={() => removeCategory(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Link href="/dashboard">
            <Button variant="outline">Cancelar</Button>
          </Link>
          <Button className="gap-2">
            <Save className="h-4 w-4" />
            Crear Proposal
          </Button>
        </div>
      </div>
    </MainLayout>
  )
}
