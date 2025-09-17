'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import Pumpjack from '@/pumpjack_blobs_mini.png';
import AltaMLLogo from '@/altaml_landing.png';

// Amplify imports for chat session creation
import type { Schema } from '@/../amplify/data/resource';
import { amplifyClient } from '@/utils/amplify-utils';
import { defaultAgents, BedrockAgent } from '@/utils/config';

// Components
import AgentCard from '@/components/AgentCard';

// Agent icons
import ProductionIcon from '@/assets/icons/production-agent.svg';
import MaintenanceIcon from '@/assets/icons/maintenance-agent.svg';
import RegulatoryIcon from '@/assets/icons/regulatory-agent.svg';
import PetrophysicsIcon from '@/assets/icons/petrophysics-agent.svg';

// Agent mapping from card titles to defaultAgents keys
const agentMapping: { [key: string]: string } = {
  'Production Agent': 'PlanAndExecuteAgent',
  'Maintenance Agent': 'MaintenanceAgent',
  'Regulatory Agent': 'RegulatoryAgent',
  'Petrophysics Agent': 'PetrophysicsAgent'
};

export default function Landing() {
  const router = useRouter();
  const [loadingAgent, setLoadingAgent] = useState<string | null>(null);

  const handleAgentClick = async (agentTitle: string) => {
    setLoadingAgent(agentTitle);
    
    try {
      const agentId = agentMapping[agentTitle];
      const agentInfo = defaultAgents[agentId];
      
      if (!agentInfo) {
        console.error(`Agent not found for title: ${agentTitle}`);
        router.push('/chat');
        return;
      }

      // Create chat session with the selected agent
      const chatSession: Schema['ChatSession']['createType'] = {
        aiBotInfo: {
          aiBotName: agentInfo.name,
          aiBotId: agentInfo.source === 'bedrockAgent' 
            ? (agentInfo as BedrockAgent).agentId 
            : agentId, // Use actual AWS agent ID for Bedrock agents, config key for others
          aiBotAliasId: 'agentAliasId' in agentInfo ? agentInfo.agentAliasId : undefined,
          aiBotVersion: undefined
        }
      };

      const { data: newChatSession } = await amplifyClient.models.ChatSession.create(chatSession);
      
      if (newChatSession) {
        router.push(`/chat/${newChatSession.id}`);
      } else {
        throw new Error('Failed to create chat session');
      }
    } catch (error) {
      console.error('Error creating chat session:', error);
      // Fallback to general chat page
      router.push('/chat');
    } finally {
      setLoadingAgent(null);
    }
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
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${Pumpjack.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'bottom center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="backdrop-blur-[5px] backdrop-filter bg-[rgba(255,255,255,0.85)] box-border content-stretch flex flex-col gap-[32px] items-start justify-start pb-[20px] pt-[32px] px-[20px] relative rounded-[8px] max-w-7xl mx-auto w-full">
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
                onClick={() => handleAgentClick(agent.title)}
                isLoading={loadingAgent === agent.title}
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
                <Image 
                  alt="AltaML" 
                  className="block max-w-none h-full object-contain" 
                  src={AltaMLLogo}
                  width={100}
                  height={32}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
