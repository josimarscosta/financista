export interface MissionData {
  id: number;
  icon: string;
  title: string;
  level: 'PROCEDURAL' | 'ANALÍTICO' | 'ESTRATÉGICO' | 'CRIATIVO';
  description: string;
  prerequisite?: number;
  modelAnswer: string;
}

export interface CompanyData {
  // Existing fields for summary
  ativoCirculante: number;
  estoques?: number;
  passivoCirculante: number;
  ativoTotal: number;
  passivoTotal: number;
  patrimonioLiquido: number;
  receitaLiquida: number;
  lucroLiquido: number;
  lucroBruto?: number;

  // New detailed fields for InovaTech case
  detalhes?: {
    balanco: {
      caixa: number;
      contasAReceber: number;
      estoques: number;
      ativoNaoCirculante: number;
      contasAPagar: number;
      emprestimosCP: number; // Curto Prazo
      passivoNaoCirculante: number;
    },
    dre: {
      receitaBruta: number;
      custos: number;
      despesasOperacionais: number;
      juros: number;
      impostos: number;
    }
  }
}


export interface Company {
  name: string;
  sector: string;
  data: CompanyData;
  analystNote: string;
}

export interface Indicator {
  key: string;
  name: string;
  category: 'Liquidez' | 'Endividamento' | 'Rentabilidade' | 'Atividade';
  formula: string;
  unit: '' | '%';
  calculate: (data: CompanyData) => number;
}

export type MissionStatus = 'LOCKED' | 'AVAILABLE' | 'COMPLETED';