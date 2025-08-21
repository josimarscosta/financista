import { MissionData } from '../types';

export const MISSIONS_DATA: MissionData[] = [
  {
    id: 1,
    icon: "🔬",
    title: "Análise Comparativa",
    level: "PROCEDURAL",
    description: "Compare indicadores-chave de empresas concorrentes. Desenvolva sua capacidade de avaliar a performance relativa e identificar destaques.",
    modelAnswer: `**Análise Padrão do Especialista:**

1.  **Rentabilidade (ROE):** Ambev (13.6%) e Localiza (13.3%) são as mais rentáveis para o acionista, superando de longe a Magazine Luiza (3.3%), que sofre com margens apertadas no varejo.

2.  **Endividamento Geral:** Localiza (70%) e Magazine Luiza (66.7%) operam com alta alavancagem, o que potencializa os retornos, mas também aumenta o risco. A Ambev (38.9%) possui uma estrutura de capital muito mais conservadora.

3.  **Composição do Endividamento:** Este é um diferencial crucial. Magazine Luiza tem uma dívida de altíssimo risco, com 73.3% vencendo no curto prazo. Em contraste, Ambev (45.7%) e, principalmente, Localiza (28.6%) possuem dívidas mais saudáveis e alongadas, alinhadas aos seus investimentos de longo prazo.

4.  **Liquidez (Corrente):** Todas apresentam liquidez corrente acima de 1. No entanto, a alta concentração de dívida de curto prazo da Magazine Luiza torna seu indicador de 1.27 mais arriscado do que o 1.25 da Ambev.

**Conclusão:** Ambev é a empresa mais sólida. Localiza oferece alta rentabilidade com uma dívida bem gerenciada para seu setor. Magazine Luiza enfrenta os maiores desafios de rentabilidade e possui um perfil de dívida de maior risco, com alta concentração no curto prazo.`
  },
  {
    id: 2,
    icon: "🏥",
    title: "Sala de Situação: Hospital Financeiro",
    level: "ANALÍTICO",
    description: "Receba um estudo de caso de uma empresa 'paciente'. Analise as demonstrações financeiras e submeta seu diagnóstico completo.",
    prerequisite: 1,
    modelAnswer: `**Diagnóstico do Especialista:**

**Problema Central:** A InovaTech sofre de uma grave crise no **Ciclo de Conversão de Caixa**. A empresa é lucrativa no papel (Lucro Líquido de R$25k), mas não consegue converter esse lucro em caixa, levando a uma situação de insolvência iminente.

**Indicadores-Chave:**
*   **Liquidez Corrente (1.20):** Parece aceitável, mas é mascarada pelo altíssimo volume de Contas a Receber (R$140k).
*   **Prazo Médio de Recebimento (102 dias):** Crítico. A empresa leva mais de 3 meses para receber de seus clientes, enquanto precisa pagar fornecedores e despesas.
*   **Capital de Giro:** O capital circulante líquido é positivo, mas de baixa qualidade, pois está "preso" em contas a receber de longo prazo.

**Recomendações Corretivas:**
1.  **Revisão Imediata da Política de Crédito:** Reduzir os prazos de pagamento para novos clientes (e.g., para 30-45 dias) e criar um sistema de incentivos (descontos) para pagamentos antecipados.
2.  **Gestão de Contas a Pagar:** Negociar prazos mais longos com fornecedores estratégicos para alinhar melhor as saídas de caixa com as entradas, aliviando a pressão sobre o caixa no curto prazo.`
  },
  {
    id: 3,
    icon: "📈",
    title: "Mesa de Operações: Investidor Inteligente",
    level: "ESTRATÉGICO",
    description: "Compare o desempenho de concorrentes diretos, tome uma decisão de investimento e justifique sua escolha com base em dados.",
    prerequisite: 2,
    modelAnswer: `**Estratégia Padrão do Gestor de Portfólio:**

Uma estratégia balanceada e prudente seria:

*   **Alocação Principal - Ambev (50% - R$ 500.000):** Constitui o núcleo ("core") do portfólio. Sua alta rentabilidade, baixo endividamento e forte geração de caixa oferecem segurança e um retorno consistente. É a escolha defensiva que ancora a carteira.

*   **Alocação Satélite - Localiza (30% - R$ 300.000):** Representa a aposta em crescimento. Apesar do endividamento elevado, a empresa é líder de mercado e extremamente rentável. A alocação menor reflete o risco mais alto, mas captura o potencial de valorização.

*   **Alocação Tática - Magazine Luiza (20% - R$ 200.000):** É uma posição menor e mais especulativa. A empresa enfrenta desafios, mas possui um ecossistema digital forte. O investimento se justifica por um potencial de recuperação ("turnaround") caso as condições de mercado e as margens melhorem.

**Justificativa:** Esta estratégia **Core-Satélite** equilibra a segurança e a previsibilidade da Ambev com o potencial de crescimento de maior risco da Localiza e da Magazine Luiza, resultando em um portfólio diversificado e com risco ponderado.`
  },
  {
    id: 4,
    icon: "💼",
    title: "Sala da Diretoria: Financial Storytelling",
    level: "CRIATIVO",
    description: "Transforme sua análise técnica em uma narrativa persuasiva. Comunique seus insights de forma clara e estratégica para a alta gestão.",
    prerequisite: 3,
    modelAnswer: `**Apresentação Padrão do Consultor:**

**(Slide 1: Título Impactante)**
"Senhores, a InovaTech está crescendo rápido, mas está 'morrendo de sede'. Somos uma empresa lucrativa que corre o risco de ficar sem caixa para operar."

**(Slide 2: O Diagnóstico em Dados)**
"Nosso problema é simples: nosso sucesso em vendas não está se traduzindo em dinheiro no banco. Levamos em média 102 dias para receber, um prazo insustentável que está drenando nosso caixa e nos forçando a buscar empréstimos caros para pagar as contas do dia a dia. Nossa liquidez, embora pareça positiva, é uma miragem; está toda presa nas mãos de nossos clientes."

**(Slide 3: Plano de Ação Estratégico)**
"Minhas duas recomendações são focadas em 'estancar a sangria' e fortalecer nossa saúde financeira:
1.  **Inteligência de Crédito:** Vamos reestruturar nossa política comercial, oferecendo descontos para pagamentos em até 30 dias e sendo mais rigorosos com prazos longos. Precisamos vender com lucro E com caixa.
2.  **Parceria com Fornecedores:** Vamos renegociar prazos com nossos principais fornecedores, alinhando nossas obrigações de pagamento ao nosso novo ciclo de recebimento."

**(Slide 4: O Futuro em 6 Meses)**
"Com estas ações, projetamos uma redução do prazo de recebimento para menos de 60 dias e um aumento da nossa Liquidez Corrente para mais de 1.5, nos dando o fôlego necessário para financiar nosso crescimento de forma sustentável e com recursos próprios."`
  },
];