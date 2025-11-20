"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Upload,
  FileText,
  ImageIcon,
  File,
  Search,
  Download,
  MoreVertical,
  FolderOpen,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const documents = [
  {
    id: "1",
    name: "Q4_Proposal_Final.pdf",
    type: "application/pdf",
    size: "2.3 MB",
    uploadedBy: "Alice Johnson",
    uploadedAt: "2025-11-01",
    ipfsHash: "QmX7Yx...abc123",
    status: "uploaded" as const,
    isPublic: true,
    proposalTitle: "Q4 Community Meetup",
  },
  {
    id: "2",
    name: "Budget_Breakdown.xlsx",
    type: "application/xlsx",
    size: "1.1 MB",
    uploadedBy: "Bob Smith",
    uploadedAt: "2025-11-05",
    ipfsHash: "QmY8Zz...def456",
    status: "uploaded" as const,
    isPublic: false,
    proposalTitle: "Q4 Community Meetup",
  },
  {
    id: "3",
    name: "Event_Photos.zip",
    type: "application/zip",
    size: "45.2 MB",
    uploadedBy: "Carol Williams",
    uploadedAt: "2025-11-10",
    ipfsHash: "QmZ9Aa...ghi789",
    status: "uploading" as const,
    isPublic: true,
    proposalTitle: "Q4 Community Meetup",
  },
]

const stats = [
  { title: "Total Documentos", value: "12", icon: FileText },
  { title: "Almacenamiento", value: "142 MB", icon: FolderOpen },
  { title: "Este Mes", value: "5", icon: Upload },
]

export default function DocumentsPage() {
  const getFileIcon = (type: string) => {
    if (type.includes("pdf")) return <FileText className="h-5 w-5 text-red-500" />
    if (type.includes("image")) return <ImageIcon className="h-5 w-5 text-blue-500" />
    return <File className="h-5 w-5 text-muted-foreground" />
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "uploaded":
        return (
          <Badge variant="outline" className="gap-1 bg-green-500/10 text-green-500 border-green-500/20">
            <CheckCircle2 className="h-3 w-3" />
            Subido
          </Badge>
        )
      case "uploading":
        return (
          <Badge variant="outline" className="gap-1 bg-blue-500/10 text-blue-500 border-blue-500/20">
            <Clock className="h-3 w-3" />
            Subiendo
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="outline" className="gap-1 bg-red-500/10 text-red-500 border-red-500/20">
            <AlertCircle className="h-3 w-3" />
            Error
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
            <h1 className="text-3xl font-bold tracking-tight">Documentos</h1>
            <p className="text-muted-foreground mt-1">Gestiona archivos almacenados en IPFS</p>
          </div>
          <Button className="gap-2">
            <Upload className="h-4 w-4" />
            Subir Documento
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.title} className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <stat.icon className="h-5 w-5 text-primary" />
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
                <Input placeholder="Buscar documentos..." className="pl-9" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="image">Imágenes</SelectItem>
                  <SelectItem value="other">Otros</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all-proposals">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-proposals">Todas las proposals</SelectItem>
                  <SelectItem value="q4-meetup">Q4 Community Meetup</SelectItem>
                  <SelectItem value="treasury">Treasury Diversification</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Documents List */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="public">Públicos</TabsTrigger>
            <TabsTrigger value="private">Privados</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3">
            {documents.map((doc) => (
              <Card key={doc.id} className="glass-card hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      {getFileIcon(doc.type)}
                    </div>
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h3 className="font-medium truncate">{doc.name}</h3>
                          <p className="text-sm text-muted-foreground">{doc.proposalTitle}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {getStatusBadge(doc.status)}
                          <Badge variant="outline">{doc.isPublic ? "Público" : "Privado"}</Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Descargar
                              </DropdownMenuItem>
                              <DropdownMenuItem>Ver en IPFS</DropdownMenuItem>
                              <DropdownMenuItem>Copiar Hash</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Eliminar</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span>Subido por {doc.uploadedBy}</span>
                        <span>•</span>
                        <span>{doc.uploadedAt}</span>
                      </div>
                      <div className="font-mono text-xs text-muted-foreground">IPFS: {doc.ipfsHash}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="public">
            <Card className="glass-card">
              <CardContent className="pt-6 text-center text-muted-foreground py-8">
                Mostrando solo documentos públicos
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="private">
            <Card className="glass-card">
              <CardContent className="pt-6 text-center text-muted-foreground py-8">
                Mostrando solo documentos privados
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
