import { ReactNode } from 'react';

export default function ConditionalWrapper({
  conditional,
  children,
}: {
  conditional?: boolean;
  children: ReactNode | undefined;
}) {
  if (conditional) return children;

  return undefined;
}
