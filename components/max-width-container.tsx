import { cn } from '@/lib/utils';

interface MaxWidthContainer {
   className?: string;
   children: React.ReactNode;
};

export const MaxWidthContainer = ({
   className,
   children,
}: MaxWidthContainer) => {
   return (
      <div className={cn('h-full max-w-6xl mx-auto px-4 md:px-12 xl:px-4 py-20', className)}>
         {children}
      </div>
   )
};