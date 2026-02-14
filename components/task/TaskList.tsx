"use client";

import type { Task, TaskStatus } from "@/lib/vetra/types";
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
import { ListTodo, MousePointerClick, ArrowRight } from "lucide-react";
import {
  getStatusVariant,
  getStatusLabel,
  getNextTaskStatus,
  getStatusActionLabel,
} from "@/lib/status";
import { truncateId, formatDate } from "@/lib/format";
import { SectionHeader } from "@/components/common/SectionHeader";

export interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  selectedProposalKey?: string | null;
  onStatusChange?: (taskId: string, newStatus: TaskStatus) => Promise<void>;
}

export function TaskList({
  tasks,
  loading,
  error,
  selectedProposalKey,
  onStatusChange,
}: TaskListProps) {
  return (
    <div>
      <SectionHeader
        title="Tasks"
        description={!loading && selectedProposalKey ? `${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'} for this proposal` : undefined}
        variant="list"
      />
      <Card>
        <CardHeader>
          <CardTitle>
            All Tasks
          </CardTitle>
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
                <Skeleton className="h-4 w-1/3" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <p className="text-sm text-destructive">Error loading tasks: {error}</p>
        )}

        {!loading && !error && !selectedProposalKey && (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <MousePointerClick className="size-10 text-muted-foreground/50" />
            <p className="text-base font-medium text-muted-foreground">Select a proposal</p>
            <p className="text-sm text-muted-foreground/70">
              Choose a proposal to view its tasks.
            </p>
          </div>
        )}

        {!loading && !error && selectedProposalKey && tasks.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <ListTodo className="size-10 text-muted-foreground/50" />
            <p className="text-base font-medium text-muted-foreground">No tasks yet</p>
            <p className="text-sm text-muted-foreground/70">
              Add tasks below to break down this proposal.
            </p>
          </div>
        )}

        <div className="space-y-3">
          {tasks.map((task, index) => {
            const status = task.status ?? "TODO";
            const nextStatus = getNextTaskStatus(status);
            const actionLabel = getStatusActionLabel(status);

            return (
              <div key={`${task.id}-${index}`} className="space-y-2">
                <div className="rounded-lg border border-border/60 bg-card p-4 transition-all hover:border-border hover:shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-foreground truncate text-sm">
                          {task.title}
                        </span>
                        <Badge
                          variant={
                            getStatusVariant(status) as
                              | "status-todo"
                              | "status-progress"
                              | "status-done"
                          }
                        >
                          {getStatusLabel(status)}
                        </Badge>
                      </div>

                      {task.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {task.description}
                        </p>
                      )}

                      <div className="flex items-center gap-3 flex-wrap text-xs text-muted-foreground">
                        <span className="font-mono text-primary/90">
                          {truncateId(task.id)}
                        </span>
                        {task.createdAt && (
                          <span>
                            {formatDate(task.createdAt)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status action button - show if there's a next status */}
                {nextStatus && actionLabel && onStatusChange && (
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onStatusChange(task.id, nextStatus);
                      }}
                    >
                      <ArrowRight className="mr-2 size-4" />
                      {actionLabel}
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
      </Card>
    </div>
  );
}
