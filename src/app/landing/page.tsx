'use client';

import { useRouter } from 'next/navigation';
import ContentLayout from "@cloudscape-design/components/content-layout";
import Box from "@cloudscape-design/components/box";
import * as HoverCard from '@radix-ui/react-hover-card';
import Pumpjack from '@/pumpjack1_mini.png';
import AltaMLLogo from '@/altaml_landing.png';

// Agent icons
import ProductionIcon from '@/assets/icons/production-agent.svg';
import MaintenanceIcon from '@/assets/icons/maintenance-agent.svg';
import RegulatoryIcon from '@/assets/icons/regulatory-agent.svg';
import PetrophysicsIcon from '@/assets/icons/petrophysics-agent.svg';

interface AgentCardProps {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
}

function AgentCard({ icon, title, description, onClick }: AgentCardProps) {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <button
          onClick={onClick}
          className="bg-white h-[196px] max-w-[480px] relative rounded-[8px] w-full transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00A2C7] focus:ring-offset-2"
        >
          <div className="box-border content-stretch flex flex-col h-[196px] items-start justify-start max-w-inherit overflow-clip p-[12px] relative w-full">
            <div className="content-stretch flex gap-[8px] items-start justify-start relative shrink-0 w-full">
              <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start justify-start min-h-px min-w-px relative shrink-0">
                <div className="bg-[rgba(0,157,177,0.05)] box-border content-stretch flex gap-[10px] items-center justify-start p-[10px] relative rounded-[8px] shrink-0">
                  <div className="bg-[rgba(255,255,255,0)] relative shrink-0 size-[16px]">
                    <img alt="" className="block max-w-none size-full" src={icon} />
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
                      <p className="leading-[20px] text-left">{description}</p>
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

export default function Landing() {
  const router = useRouter();

  const handleAgentClick = () => {
    router.push('/chat');
  };

  const agents = [
    {
      icon: ProductionIcon.src,
      title: 'Production Agent',
      description: 'Monitors well performance, optimizes flow rates, and flags anomalies in production data to maximize output without compromising safety.',
    },
    {
      icon: MaintenanceIcon.src,
      title: 'Maintenance Agent',
      description: 'Tracks equipment health, predicts potential failures, and recommends preventive actions to reduce downtime and maintenance costs.',
    },
    {
      icon: RegulatoryIcon.src,
      title: 'Regulatory Agent',
      description: 'Reviews reports, surfaces relevant regulations, and ensures documentation meets industry compliance standards.',
    },
    {
      icon: PetrophysicsIcon.src,
      title: 'Petrophysics Agent',
      description: 'Analyzes well logs, core samples, and formation data to provide insights into reservoir properties and support better drilling and completion decisions.',
    },
  ];

  return (
    <ContentLayout
      defaultPadding
      disableOverlap
      headerBackgroundStyle={() =>
        `bottom center/cover url(${Pumpjack.src})`
      }
      header={
        <Box padding={{ vertical: "xxxl" }}>
          <div className="backdrop-blur-[5px] backdrop-filter bg-[rgba(255,255,255,0.8)] box-border content-stretch flex flex-col gap-[32px] items-start justify-start pb-[20px] pt-[32px] px-[20px] relative rounded-[8px] max-w-7xl mx-auto">
            <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[8px]" />
            
            {/* Header Section */}
            <div className="content-stretch flex flex-col gap-[8px] items-start justify-start relative shrink-0 w-full">
              <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-start justify-start relative shrink-0">
                <h1 className="font-bold leading-[0] relative shrink-0 text-[#1c2024] text-[28px] text-nowrap tracking-[-0.12px]">
                  <span className="leading-[36px] whitespace-pre">Welcome to Agents4Energy</span>
                </h1>
              </div>
              <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-start justify-start relative shrink-0 w-full">
                <p className="font-normal leading-[0] relative shrink-0 text-[#60646c] text-[18px] text-nowrap tracking-[-0.04px]">
                  <span className="leading-[26px] whitespace-pre">Select a specialized agent designed for the energy sector to get help answering your questions.</span>
                </p>
              </div>
            </div>

            {/* Agent Cards Grid */}
            <div className="content-stretch flex flex-col gap-[16px] items-start justify-start relative shrink-0 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[12px] w-full">
                {agents.map((agent, index) => (
                  <AgentCard
                    key={index}
                    icon={agent.icon}
                    title={agent.title}
                    description={agent.description}
                    onClick={handleAgentClick}
                  />
                ))}
              </div>
              
              {/* Footer Section */}
              <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0 w-full mt-4">
                <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-start justify-start relative shrink-0">
                  <p className="font-normal leading-[0] relative shrink-0 text-[#60646c] text-[14px] text-nowrap">
                    <span className="leading-[20px] whitespace-pre">Solution brought to you by</span>
                  </p>
                </div>
                <div className="content-stretch flex flex-col gap-[10.603px] items-start justify-center relative shrink-0">
                  <div className="h-[32px] overflow-clip relative shrink-0">
                    <img 
                      alt="AltaML" 
                      className="block max-w-none h-full object-contain" 
                      src={AltaMLLogo.src} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      }
    />
  );
}
