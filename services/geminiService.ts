import { GoogleGenAI } from "@google/genai";
import { Company, Indicator } from '../types';

const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;
if (API_KEY) {
    ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
    console.warn("API_KEY environment variable not set. AI features will be disabled.");
}

const getAi = () => {
    if (!ai) {
        throw new Error("O serviço de IA não está disponível. Verifique a configuração da API_KEY.");
    }
    return ai;
}

export const getIndicatorAnalysis = async (company: Company, indicator: Indicator, value: number): Promise<string> => {
  const prompt = `
    Você é um analista financeiro sênior (CFA) fazendo mentoring de um analista júnior.
    A empresa em análise é a ${company.name}, do setor de ${company.sector}.

    O analista júnior calculou o seguinte indicador:
    - **Indicador:** ${indicator.name}
    - **Valor Calculado:** ${value.toFixed(2)}${indicator.unit}
    - **Fórmula:** ${indicator.formula}

    Forneça uma análise em 3 parágrafos concisos (formato markdown) para o analista júnior:
    1.  **Contextualização:** Explique o que este indicador mede e sua importância específica para uma empresa no setor de ${company.sector}.
    2.  **Diagnóstico:** Com base no valor de ${value.toFixed(2)}, qual é a sua interpretação inicial? Compare brevemente com benchmarks gerais do setor (seja qualitativo, e.g., "geralmente considerado saudável", "pode indicar um risco de...").
    3.  **Próximo Passo:** Qual pergunta estratégica este indicador levanta? Que outro indicador o analista júnior deveria investigar para aprofundar a análise?
    `;

  try {
    const response = await getAi().models.generateContent({ model: "gemini-2.5-flash", contents: prompt });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Ocorreu um erro ao gerar a análise. Verifique o console para mais detalhes.";
  }
};

export const evaluateSituationRoomDiagnosis = async (caseText: string, userDiagnosis: string): Promise<string> => {
    const prompt = `
    Você é um professor PhD em Finanças Corporativas, avaliando o trabalho de um aluno de graduação em Administração.
    O aluno recebeu o seguinte estudo de caso: "${caseText}"
    
    O aluno submeteu o seguinte diagnóstico:
    ---
    ${userDiagnosis}
    ---

    Sua tarefa é fornecer um feedback construtivo e detalhado em 3 seções, formatado em markdown:

    1.  **Nível Procedimental (Análise):** Avalie a aplicação dos conceitos. O aluno identificou os problemas centrais? Os indicadores financeiros implícitos no texto foram corretamente interpretados e conectados? A análise é superficial ou profunda?

    2.  **Nível Atitudinal (Avaliação):** Analise a qualidade do julgamento. O diagnóstico é coerente e bem fundamentado? O aluno ponderou diferentes perspectivas ou trade-offs (e.g., crescimento vs. risco)? As recomendações estratégicas são lógicas e derivam diretamente da análise?

    3.  **Plano de Desenvolvimento:** Ofereça 2 sugestões claras para o aluno aprimorar sua capacidade analítica. Exemplo: "Da próxima vez, tente quantificar o impacto de suas recomendações" ou "Considere analisar a evolução histórica dos indicadores para identificar tendências".

    Seja encorajador, mas rigoroso. Seu objetivo é desenvolver o pensamento crítico do aluno, não apenas dar a resposta certa.
    `;

    try {
        const response = await getAi().models.generateContent({ model: "gemini-2.5-flash", contents: prompt });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "Ocorreu um erro ao avaliar o diagnóstico. Verifique o console para mais detalhes.";
    }
}

export const evaluateInvestmentRationale = async (companies: Company[], chosenCompany: string, rationale: string): Promise<string> => {
    const prompt = `
    Você é um gestor de portfólio experiente avaliando a tese de investimento de um analista.
    O analista teve que escolher uma empresa para investir entre as seguintes opções do setor de ${companies[0].sector}: ${companies.map(c => c.name).join(', ')}.

    Ele escolheu a **${chosenCompany}** e apresentou a seguinte justificativa:
    ---
    ${rationale}
    ---

    Sua tarefa é avaliar esta justificativa, focando no raciocínio estratégico. Forneça seu feedback em markdown:

    - **Pontos Fortes da Análise:** Identifique 1-2 pontos onde o analista demonstrou bom raciocínio (e.g., "Você corretamente identificou a alta rentabilidade da ${chosenCompany} como um diferencial competitivo.").
    - **Contrapontos e Riscos:** Apresente 1-2 contrapontos ou riscos que o analista pode ter negligenciado. Use uma abordagem socrática. (e.g., "Sua análise focou na rentabilidade, mas como você avalia o nível de endividamento da ${chosenCompany} em comparação com seus pares? Isso poderia ser um risco?").
    - **Sugestão de Aprofundamento:** Recomende uma área para investigação adicional que fortaleceria a tese de investimento. (e.g., "Para validar sua tese, seria interessante analisar o ciclo de conversão de caixa da empresa.").
    `;

     try {
        const response = await getAi().models.generateContent({ model: "gemini-2.5-flash", contents: prompt });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "Ocorreu um erro ao avaliar a justificativa. Verifique o console para mais detalhes.";
    }
}
