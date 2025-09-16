import * as HoverCard from '@radix-ui/react-hover-card';

interface AgentCardProps {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
  isLoading: boolean;
}

export default function AgentCard({ icon, title, description, onClick, isLoading }: AgentCardProps) {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <button
          onClick={onClick}
          disabled={isLoading}
          className="bg-white h-[196px] max-w-[480px] relative rounded-[8px] w-full transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00A2C7] focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <div className="box-border content-stretch flex flex-col h-[196px] items-start justify-start max-w-inherit overflow-clip p-[12px] relative w-full">
            <div className="content-stretch flex gap-[8px] items-start justify-start relative shrink-0 w-full">
              <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start justify-start min-h-px min-w-px relative shrink-0">
                <div className="bg-[rgba(0,157,177,0.05)] box-border content-stretch flex gap-[10px] items-center justify-start p-[10px] relative rounded-[8px] shrink-0">
                  <div className="bg-[rgba(255,255,255,0)] relative shrink-0 size-[16px]">
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#0797b9] border-t-transparent"></div>
                    ) : (
                      <img alt="" className="block max-w-none size-full" src={icon} />
                    )}
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[4px] items-start justify-start relative shrink-0 w-full">
                  <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-start justify-start relative shrink-0">
                    <div className="font-bold leading-[0] relative shrink-0 text-[#1c2024] text-[16px] text-nowrap">
                      <p className="leading-[24px] whitespace-pre text-left">{title}</p>
                    </div>
                  </div>
                  <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-start justify-start relative shrink-0 w-full">
                    <div className="basis-0 font-normal grow leading-[0] min-h-px min-w-px relative shrink-0 text-[14px] text-[rgba(0,7,20,0.62)]">
                      <p className="leading-[20px] text-left">
                        {isLoading ? 'Starting chat session...' : description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border border-[rgba(0,0,47,0.15)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_12px_32px_-16px_rgba(0,0,51,0.06),0px_8px_40px_0px_rgba(0,0,0,0.05)]" />
        </button>
      </HoverCard.Trigger>
    </HoverCard.Root>
  );
}
