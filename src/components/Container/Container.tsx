import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode[] | ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return <div className="mx-auto max-w-7xl w-full px-4">{children}</div>;
}
