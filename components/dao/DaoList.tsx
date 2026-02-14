// components/dao/DaoList.tsx
"use client";

import Link from "next/link";
import type { Dao } from "@/lib/vetra/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Building2 } from "lucide-react";
import { truncateId, formatDate } from "@/lib/format";
import { SectionHeader } from "@/components/common/SectionHeader";

export interface DaoListProps {
  daos: Dao[];
  loading: boolean;
  error: string | null;
  onReload?: () => void | Promise<void>;
}

export function DaoList({ daos, loading, error, onReload }: DaoListProps) {
  return (
    <div>
      <SectionHeader
        title="Existing DAOs"
        description={!loading ? `${daos.length} ${daos.length === 1 ? 'DAO' : 'DAOs'} stored in Vetra` : undefined}
        variant="list"
      />
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            All DAOs
          </CardTitle>
        </CardHeader>

      <CardContent className="space-y-4">
        {loading && (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-lg border bg-card p-4"
              >
                <Skeleton className="mb-3 h-5 w-2/3" />
                <Skeleton className="mb-2 h-4 w-full" />
                <div className="flex gap-3">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-28" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <p className="text-sm text-destructive">Error loading DAOs: {error}</p>
        )}

        {!loading && !error && daos.length === 0 && (
          <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-border/60 py-16 text-center">
            <div className="rounded-full bg-primary/10 p-4">
              <Building2 className="size-8 text-primary" />
            </div>
            <div className="space-y-2">
              <p className="text-base font-semibold text-foreground">No DAOs yet</p>
              <p className="text-sm text-muted-foreground max-w-sm">
                Create your first DAO using the form to get started.
              </p>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {daos.map((dao) => (
            <div
              key={dao.id}
              className="rounded-lg border border-border/60 bg-card p-5 transition-all hover:border-border hover:shadow-md"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-foreground text-base">
                      {dao.name}
                    </span>
                    <Badge variant="default">
                      DAO
                    </Badge>
                  </div>

                  {dao.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {dao.description}
                    </p>
                  )}

                  <div className="flex items-center gap-4 flex-wrap text-xs text-muted-foreground">
                    {dao.ownerUserId && (
                      <span className="font-mono text-primary/90">
                        {truncateId(dao.ownerUserId)}
                      </span>
                    )}
                    {dao.members.length > 0 && (
                      <span className="font-medium">
                        {dao.members.length}{" "}
                        {dao.members.length === 1 ? "member" : "members"}
                      </span>
                    )}
                    {dao.createdAt && (
                      <span>
                        {formatDate(dao.createdAt)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-start justify-end sm:pt-1">
                  <Button asChild variant="default" size="default">
                    <Link href={`/daos/${dao.id}`}>View board</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      </Card>
    </div>
  );
}
