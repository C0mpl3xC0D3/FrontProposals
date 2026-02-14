"use client";

import type { Dao } from "@/lib/vetra/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { truncateId, formatDate } from "@/lib/format";

export interface DaoBoardHeaderProps {
  dao: Dao | null;
}

export function DaoBoardHeader({ dao }: DaoBoardHeaderProps) {
  if (!dao) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>DAO not found</CardTitle>
          <CardDescription>
            We couldn&apos;t load this DAO&apos;s data from Vetra.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <CardTitle className="flex items-center gap-3">
            {dao.name}
            <Badge variant="default">
              DAO
            </Badge>
          </CardTitle>
          <CardDescription className="text-sm leading-relaxed">
            {dao.description ?? "DAO without description"}
          </CardDescription>
        </div>
        <div className="flex flex-col gap-2 text-xs text-muted-foreground sm:items-end">
          <span className="font-mono text-primary">
            {truncateId(dao.id)}
          </span>
          {dao.createdAt && (
            <span>{formatDate(dao.createdAt)}</span>
          )}
          {dao.ownerUserId && (
            <span className="font-mono text-primary/80">
              {truncateId(dao.ownerUserId)}
            </span>
          )}
          {dao.members.length > 0 && (
            <span className="font-medium">
              {dao.members.length}{" "}
              {dao.members.length === 1 ? "member" : "members"}
            </span>
          )}
        </div>
      </CardHeader>
    </Card>
  );
}
