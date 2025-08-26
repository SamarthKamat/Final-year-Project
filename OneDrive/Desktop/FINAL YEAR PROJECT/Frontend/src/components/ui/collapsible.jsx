"use client";

import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

const Collapsible = React.forwardRef(function Collapsible(props, ref) {
  return <CollapsiblePrimitive.Root ref={ref} data-slot="collapsible" {...props} />;
});

const CollapsibleTrigger = React.forwardRef(function CollapsibleTrigger(props, ref) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      ref={ref}
      data-slot="collapsible-trigger"
      {...props}
    />
  );
});

const CollapsibleContent = React.forwardRef(function CollapsibleContent(props, ref) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      ref={ref}
      data-slot="collapsible-content"
      {...props}
    />
  );
});

export { Collapsible, CollapsibleTrigger, CollapsibleContent };






