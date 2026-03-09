import { ReactNode } from 'react';

export default function ConditionalWrapper({
  conditional,
  children,
}: {
  conditional?: boolean;
  children: ReactNode;
}) {
  if (conditional) return children;

  return null;
}
