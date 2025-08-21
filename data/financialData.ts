import { Company, Indicator, CompanyData } from '../types';

export const COMPANIES: Company[] = [
  {
    name: 'Magazine Luiza',
    sector: 'Varejo',
    data: {
      ativoCirculante: 28000,
      estoques: 13000,
      passivoCirculante: 22000,
      ativoTotal: 45000,
      passivoTotal: 30000,
      patrimonioLiquido: 15000,
      receitaLiquida: 35000,
      lucroLiquido: 500,
      lucroBruto: 8750,
    },
    analystNote: "Forte presença no e-commerce e ecossistema em expansão, mas enfrenta alta competição e margens pressionadas. O endividamento elevado é um ponto de atenção."
  },
  {
    name: 'Ambev',
    sector: 'Bebidas',
    data: {
      ativoCirculante: 40000,
      estoques: 8000,
      passivoCirculante: 32000,
      ativoTotal: 180000,
      passivoTotal: 70000,
      patrimonioLiquido: 110000,
      receitaLiquida: 75000,
      lucroLiquido: 15000,
      lucroBruto: 41250,
    },
    analystNote: "Líder de mercado com forte geração de caixa e rentabilidade consistente. Considerada uma ação mais defensiva, porém com menor potencial de crescimento explosivo."
  },
   {
    name: 'Localiza',
    sector: 'Serviços (Aluguel de Veículos)',
    data: {
      ativoCirculante: 15000,
      passivoCirculante: 10000,
      ativoTotal: 50000,
      passivoTotal: 35000,
      patrimonioLiquido: 15000,
      receitaLiquida: 12000,
      lucroLiquido: 2000,
      lucroBruto: 4800,
    },
    analystNote: "Atuação dominante no setor de aluguel e gestão de frotas. Modelo de negócio intensivo em capital, sensível a taxas de juros, mas com histórico de crescimento sólido."
  }
];

export const INNOTECH_CASE_DATA: CompanyData = {
    ativoCirculante: 180,
    estoques: 30,
    passivoCirculante: 150,
    ativoTotal: 300,
    passivoTotal: 220,
    patrimonioLiquido: 80,
    receitaLiquida: 500,
    lucroLiquido: 25,
    detalhes: {
        balanco: {
            caixa: 10,
            contasAReceber: 140,
            estoques: 30,
            ativoNaoCirculante: 120,
            contasAPagar: 90,
            emprestimosCP: 60,
            passivoNaoCirculante: 70,
        },
        dre: {
            receitaBruta: 500,
            custos: 300,
            despesasOperacionais: 150,
            juros: 20,
            impostos: 5,
        }
    }
};

export const INNOTECH_CASE: Company = {
    name: 'InovaTech Soluções',
    sector: 'Software',
    data: INNOTECH_CASE_DATA,
    analystNote: ''
};


export const INDICATORS: Indicator[] = [
  // Liquidez
  {
    key: 'liquidezCorrente',
    name: 'Liquidez Corrente',
    category: 'Liquidez',
    formula: 'Ativo Circulante / Passivo Circulante',
    unit: '',
    calculate: (d) => d.passivoCirculante > 0 ? d.ativoCirculante / d.passivoCirculante : 0,
  },
  {
    key: 'liquidezSeca',
    name: 'Liquidez Seca',
    category: 'Liquidez',
    formula: '(Ativo Circulante - Estoques) / Passivo Circulante',
    unit: '',
    calculate: (d) => d.passivoCirculante > 0 && d.estoques !== undefined ? (d.ativoCirculante - d.estoques) / d.passivoCirculante : 0,
  },
  // Endividamento
  {
    key: 'endividamentoGeral',
    name: 'Endividamento Geral',
    category: 'Endividamento',
    formula: '(Passivo Total / Ativo Total) * 100',
    unit: '%',
    calculate: (d) => d.ativoTotal > 0 ? (d.passivoTotal / d.ativoTotal) * 100 : 0,
  },
   {
    key: 'endividamentoPL',
    name: 'Endividamento sobre PL',
    category: 'Endividamento',
    formula: 'Passivo Total / Patrimônio Líquido',
    unit: '',
    calculate: (d) => d.patrimonioLiquido > 0 ? d.passivoTotal / d.patrimonioLiquido : 0,
  },
  // Rentabilidade
  {
    key: 'margemLiquida',
    name: 'Margem Líquida',
    category: 'Rentabilidade',
    formula: '(Lucro Líquido / Receita Líquida) * 100',
    unit: '%',
    calculate: (d) => d.receitaLiquida > 0 ? (d.lucroLiquido / d.receitaLiquida) * 100 : 0,
  },
  {
    key: 'roe',
    name: 'ROE (Retorno sobre PL)',
    category: 'Rentabilidade',
    formula: '(Lucro Líquido / Patrimônio Líquido) * 100',
    unit: '%',
    calculate: (d) => d.patrimonioLiquido > 0 ? (d.lucroLiquido / d.patrimonioLiquido) * 100 : 0,
  },
  {
    key: 'roa',
    name: 'ROA (Retorno sobre Ativo)',
    category: 'Rentabilidade',
    formula: '(Lucro Líquido / Ativo Total) * 100',
    unit: '%',
    calculate: (d) => d.ativoTotal > 0 ? (d.lucroLiquido / d.ativoTotal) * 100 : 0,
  },
];