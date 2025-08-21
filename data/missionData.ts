import { MissionData } from '../types';

export const MISSIONS_DATA: MissionData[] = [
  {
    id: 1,
    icon: "🔬",
    title: "Análise Comparativa",
    level: "PROCEDURAL",
    description: "Compare indicadores-chave de empresas concorrentes. Desenvolva sua capacidade de avaliar a performance relativa e identificar destaques.",
  },
  {
    id: 2,
    icon: "🏥",
    title: "Sala de Situação: Hospital Financeiro",
    level: "ANALÍTICO",
    description: "Receba um estudo de caso de uma empresa 'paciente'. Analise as demonstrações financeiras e submeta seu diagnóstico completo.",
    prerequisite: 1,
  },
  {
    id: 3,
    icon: "📈",
    title: "Mesa de Operações: Investidor Inteligente",
    level: "ESTRATÉGICO",
    description: "Compare o desempenho de concorrentes diretos, tome uma decisão de investimento e justifique sua escolha com base em dados.",
    prerequisite: 2,
  },
  {
    id: 4,
    icon: "💼",
    title: "Sala da Diretoria: Financial Storytelling",
    level: "CRIATIVO",
    description: "Transforme sua análise técnica em uma narrativa persuasiva. Comunique seus insights de forma clara e estratégica para a alta gestão.",
    prerequisite: 3,
  },
];