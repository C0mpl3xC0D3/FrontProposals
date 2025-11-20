export type UserRole = "owner" | "admin" | "contributor" | "viewer"
export type ProposalState = "initiated" | "in-progress" | "completed" | "cancelled"
export type TaskState = "pending" | "in-progress" | "completed" | "rejected"
export type TaskType = "milestone" | "deliverable" | "payment" | "review"
export type PaymentStatus = "pending" | "processing" | "completed" | "failed"
export type DocumentStatus = "uploading" | "uploaded" | "failed"

export interface DAO {
  id: string
  name: string
  description?: string
  website?: string
  snapshotSpace?: string
  logo?: string
  createdAt: string
  settings: DAOSettings
}

export interface DAOSettings {
  requireTaskApproval: boolean
  allowContributorInvites: boolean
  budgetEditingAdminOnly: boolean
  publicProposals: boolean
  publicDocuments: boolean
  publicBudget: boolean
  snapshotAutoSync: boolean
  discordWebhook?: string
}

export interface User {
  id: string
  name: string
  email: string
  wallet: string
  role: UserRole
  avatar?: string
  joinedAt: string
  lastActive: string
  invitedBy?: string
}

export interface Proposal {
  id: string
  daoId: string
  title: string
  description: string
  snapshotId?: string
  snapshotUrl?: string
  state: ProposalState
  budgetTotal: number
  budgetUsed: number
  progress: number
  createdBy: string
  createdAt: string
  startDate?: string
  endDate?: string
  categories: string[]
}

export interface Task {
  id: string
  proposalId: string
  title: string
  description?: string
  type: TaskType
  state: TaskState
  categoryId?: string
  assigneeId?: string
  assigneeWallet?: string
  deadline?: string
  estimatedHours?: number
  actualHours?: number
  budgetAllocated?: number
  priority: "low" | "medium" | "high"
  createdBy: string
  createdAt: string
  completedAt?: string
}

export interface Category {
  id: string
  daoId: string
  name: string
  description?: string
  color: string
  icon?: string
}

export interface Document {
  id: string
  proposalId?: string
  taskId?: string
  name: string
  description?: string
  ipfsHash: string
  size: number
  mimeType: string
  uploadedBy: string
  uploadedAt: string
  isPublic: boolean
  status: DocumentStatus
}

export interface Payment {
  id: string
  taskId: string
  proposalId: string
  amount: number
  currency: string
  recipientWallet: string
  status: PaymentStatus
  txHash?: string
  description?: string
  requestedBy: string
  approvedBy?: string
  requestedAt: string
  completedAt?: string
}

export interface Delegation {
  id: string
  daoId: string
  delegatorWallet: string
  delegateWallet: string
  scope: "full" | "voting" | "proposals"
  startDate: string
  endDate?: string
  isActive: boolean
}

export interface AdminLog {
  id: string
  daoId: string
  userId: string
  action: string
  entityType: "proposal" | "task" | "user" | "payment" | "setting" | "document"
  entityId: string
  changes?: Record<string, any>
  timestamp: string
  ipAddress?: string
}

export interface OTP {
  id: string
  email: string
  code: string
  purpose: "invite" | "login" | "verify"
  expiresAt: string
  used: boolean
}

export interface Invitation {
  id: string
  daoId: string
  email: string
  wallet?: string
  role: UserRole
  invitedBy: string
  invitedAt: string
  expiresAt: string
  status: "pending" | "accepted" | "expired"
  otpId?: string
}
