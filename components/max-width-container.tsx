import { cn } from '@/lib/utils';

interface MaxWithContainerProps {
   className?: string;
   children: React.ReactNode;
};

export const MaxWithContainer = ({
   className,
   children,
}: MaxWithContainerProps) => {
   return (
      <div className={cn('h-full max-w-6xl mx-auto px-4 md:px-12 xl:px-4 py-20', className)}>
         {children}
      </div>
   )
};