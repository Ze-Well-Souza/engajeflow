
import React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import NavigationItem from "./NavigationItem";

type NavigationGroupProps = {
  title: string;
  icon?: React.ElementType;
  children?: React.ReactNode;
  defaultOpen?: boolean;
};

const NavigationGroup = ({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
}: NavigationGroupProps) => {
  return (
    <Collapsible defaultOpen={defaultOpen}>
      <CollapsibleTrigger
        className={cn(
          "flex w-full items-center justify-between rounded-md px-3 py-2",
          "text-muted-foreground hover:bg-accent hover:text-foreground"
        )}
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="h-4 w-4" />}
          <span className="text-sm font-medium">{title}</span>
        </div>
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 ui-open:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-3 pt-1">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default NavigationGroup;
