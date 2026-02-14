"use client";

import type { Proposal, ProposalStatus } from "@/lib/vetra/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, ArrowRight } from "lucide-react";
import {
  getStatusVariant,
  getStatusLabel,
  getNextProposalStatus,
  getStatusActionLabel,
} from "@/lib/status";
import { truncateId, formatDate } from "@/lib/format";

export interface ProposalListProps {
  proposals: Proposal[];
  loading: boolean;
  error: string | null;
  selectedProposalKey: string | null;
  onSelectProposal: (proposalKey: string) => void;
  onReload?: () => void | Promise<void>;
  taskCountByProposal?: Record<string, number>;
  onStatusChange?: (
    proposalId: string,
    newStatus: ProposalStatus,
  ) => Promise<void>;
}

export function ProposalList({
  proposals,
  loading,
  error,
  selectedProposalKey,
  onSelectProposal,
  onReload,
  taskCountByProposal,
  onStatusChange,
}: ProposalListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Proposals{!loading && ` (${proposals.length})`}
        </CardTitle>
        <CardDescription>
          Operational proposals and decisions stored in Vetra.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {loading && (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-lg border bg-muted/30 p-4"
              >
                <Skeleton className="mb-2 h-5 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <p className="text-sm text-destructive">
            Error loading proposals: {error}
          </p>
        )}

        {!loading && !error && proposals.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <FileText className="size-10 text-muted-foreground/50" />
            <p className="text-base font-medium text-muted-foreground">No proposals yet</p>
            <p className="text-sm text-muted-foreground/70">
              Create one using the form on the left to get started.
            </p>
          </div>
        )}

        <div className="space-y-3">
          {proposals.map((proposal, index) => {
            const isSelected = proposal.id === selectedProposalKey;
            const taskCount = taskCountByProposal?.[proposal.id] ?? 0;
            const status = proposal.status ?? "DRAFT";
            const nextStatus = getNextProposalStatus(status);
            const actionLabel = getStatusActionLabel(status);

            return (
              <div key={`${proposal.id}-${index}`} className="space-y-2">
                <button
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => onSelectProposal(proposal.id)}
                  className={[
                    "w-full rounded-lg border px-4 py-3 text-left transition-all",
                    isSelected
                      ? "border-primary bg-primary/10 shadow-sm"
                      : "border-border/60 bg-card hover:border-primary/50 hover:bg-muted/30 hover:shadow-sm",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-foreground truncate text-sm">
                          {proposal.title}
                        </span>
                        <Badge
                          variant={
                            getStatusVariant(status) as
                              | "status-draft"
                              | "status-open"
                              | "status-closed"
                              | "status-archived"
                          }
                        >
                          {getStatusLabel(status)}
                        </Badge>
                      </div>

                      {proposal.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                          {proposal.description}
                        </p>
                      )}

                      <div className="flex items-center gap-3 flex-wrap text-xs text-muted-foreground">
                        <span className="font-mono text-primary/90">
                          {truncateId(proposal.id)}
                        </span>
                        {proposal.createdAt && (
                          <span>
                            {formatDate(proposal.createdAt)}
                          </span>
                        )}
                        <span className="font-medium">
                          {taskCount} {taskCount === 1 ? "task" : "tasks"}
                        </span>
                      </div>
                    </div>

                    {proposal.budget != null && (
                      <div className="text-right text-xs text-muted-foreground">
                        <div className="text-[10px] uppercase tracking-wider mb-1">Budget</div>
                        <div className="text-base font-semibold text-primary">
                          {proposal.budget}
                        </div>
                      </div>
                    )}
                  </div>
                </button>

                {/* Status action button - only show on selected proposal if there's a next status */}
                {isSelected && nextStatus && actionLabel && onStatusChange && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onStatusChange(proposal.id, nextStatus);
                    }}
                    className="w-full"
                  >
                    <ArrowRight className="mr-2 size-4" />
                    {actionLabel}
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
