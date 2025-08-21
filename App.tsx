import React, { useState, useEffect } from 'react';
import { MissionData, MissionStatus, Company, Indicator, CompanyData } from './types';
import { MISSIONS_DATA } from './data/missionData';
import { COMPANIES, INDICATORS, INNOTECH_CASE } from './data/financialData';

// --- HELPER & GENERIC COMPONENTS ---

const ActionButton = ({ children, onClick, className = '', disabled = false, variant = 'primary' }: { children: React.ReactNode; onClick: () => void; className?: string; disabled?: boolean; variant?: 'primary' | 'secondary' }) => {
    const variants = {
        primary: 'from-brand-amber-400 to-brand-amber-500 text-brand-900 shadow-brand-amber-900/40 hover:shadow-brand-amber-800/60',
        secondary: 'from-slate-600 to-slate-700 text-slate-100 shadow-slate-900/40 hover:shadow-slate-800/60'
    };
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`bg-gradient-to-r px-8 py-4 font-bold rounded-full cursor-pointer shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-brand-amber-500/50 text-base uppercase tracking-wider ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {children}
        </button>
    );
};

const MissionContainer = ({ children, title }: { children: React.ReactNode, title: string }) => (
    <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-brand-gold-500/30 rounded-2xl p-6 md:p-10 shadow-xl dark:shadow-black/40 shadow-slate-300/50">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-800 dark:text-brand-gold-300 mb-8 text-center">{title}</h2>
        {children}
    </div>
);

const FinancialStatement = ({ title, data }: { title: string, data: { [key: string]: number | string } }) => (
    <div className="bg-slate-100 dark:bg-slate-900/50 p-4 rounded-lg">
        <h4 className="font-bold text-lg text-slate-700 dark:text-brand-gold-300 mb-3 border-b border-slate-300 dark:border-slate-700 pb-2">{title}</h4>
        <table className="w-full text-base">
            <tbody>
                {Object.entries(data).map(([key, value]) => (
                    <tr key={key} className="border-b border-slate-200 dark:border-slate-800 last:border-b-0">
                        <td className="py-2 text-slate-600 dark:text-slate-400">{key}</td>
                        <td className="py-2 text-right font-mono text-slate-800 dark:text-slate-200">{typeof value === 'number' ? value.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : value}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);


// --- MISSION 1: Laboratório de Diagnóstico Comparativo ---
const Mission1_DiagnosticLab = ({ onSubmit }: { onSubmit: (missionId: number, answer: string) => void }) => {
    const [selectedIndicators, setSelectedIndicators] = useState<Set<string>>(new Set(['liquidezCorrente', 'endividamentoGeral', 'roe']));
    const [studentAnalysis, setStudentAnalysis] = useState('');

    const toggleIndicator = (key: string) => {
        const newSet = new Set(selectedIndicators);
        if (newSet.has(key)) {
            newSet.delete(key);
        } else {
            newSet.add(key);
        }
        setSelectedIndicators(newSet);
    };

    const visibleIndicators = INDICATORS.filter(ind => selectedIndicators.has(ind.key));

    return (
        <MissionContainer title="Missão 1: Análise Comparativa">
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Indicator Selector */}
                <div className="lg:col-span-1 bg-slate-100 dark:bg-slate-900/50 p-4 rounded-lg">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-brand-gold-300 mb-3">Selecione os Indicadores</h3>
                    <div className="space-y-2">
                        {INDICATORS.map(ind => (
                            <label key={ind.key} className="flex items-center space-x-3 p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedIndicators.has(ind.key)}
                                    onChange={() => toggleIndicator(ind.key)}
                                    className="h-5 w-5 rounded border-gray-300 text-brand-amber-600 focus:ring-brand-amber-500"
                                />
                                <span className="text-base text-slate-700 dark:text-slate-300">{ind.name}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Comparison Table */}
                <div className="lg:col-span-2">
                    <div className="overflow-x-auto">
                        <table className="w-full text-base text-left">
                            <thead className="bg-slate-100 dark:bg-slate-900/50">
                                <tr>
                                    <th className="p-4 font-semibold text-slate-600 dark:text-slate-300 rounded-l-lg">Indicador</th>
                                    {COMPANIES.map(c => <th key={c.name} className="p-4 font-semibold text-center text-slate-600 dark:text-slate-300">{c.name}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {visibleIndicators.map(ind => (
                                    <tr key={ind.key} className="border-b border-slate-200 dark:border-slate-800">
                                        <td className="p-4 font-medium text-slate-800 dark:text-slate-200">{ind.name}</td>
                                        {COMPANIES.map(c => {
                                            const value = ind.calculate(c.data);
                                            return <td key={c.name} className="p-4 text-center font-mono">{value.toFixed(2)}{ind.unit}</td>
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Student Analysis */}
            <div className="mt-8">
                <label className="block text-base font-medium text-slate-600 dark:text-slate-300 mb-2">Sua Análise Comparativa</label>
                <textarea
                    value={studentAnalysis}
                    onChange={e => setStudentAnalysis(e.target.value)}
                    rows={5}
                    className="w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg p-3 text-slate-900 dark:text-white text-base"
                    placeholder="Compare os resultados. Qual empresa parece mais saudável em termos de liquidez? Qual é a mais rentável? E a mais endividada? Justifique sua análise com base nos dados da tabela."
                />
            </div>

            <div className="text-center mt-8">
                 <ActionButton onClick={() => onSubmit(1, studentAnalysis)} variant="primary" disabled={studentAnalysis.length < 50}>Enviar Análise</ActionButton>
            </div>
        </MissionContainer>
    );
};


// --- MISSION 2: Sala de Situação ---
const Mission2_SituationRoom = ({ onSubmit }: { onSubmit: (missionId: number, answer: string) => void }) => {
    const caseText = "A 'InovaTech Soluções', uma empresa de software em crescimento, dobrou sua receita no último ano. No entanto, o CEO está preocupado com o 'caos financeiro'. As contas a pagar estão se acumulando mais rápido que as contas a receber, e a equipe de vendas oferece prazos de pagamento muito longos para fechar novos contratos. O caixa parece sempre apertado, apesar do lucro reportado no DRE.";
    const [diagnosis, setDiagnosis] = useState('');
    const { detalhes } = INNOTECH_CASE.data;

    const bpData = {
        'Caixa': detalhes!.balanco.caixa,
        'Contas a Receber': detalhes!.balanco.contasAReceber,
        'Estoques': detalhes!.balanco.estoques,
        'Ativo Não Circulante': detalhes!.balanco.ativoNaoCirculante,
        'Total Ativo': INNOTECH_CASE.data.ativoTotal,
        '---': '---',
        'Contas a Pagar': detalhes!.balanco.contasAPagar,
        'Empréstimos CP': detalhes!.balanco.emprestimosCP,
        'Passivo Não Circulante': detalhes!.balanco.passivoNaoCirculante,
        'Patrimônio Líquido': INNOTECH_CASE.data.patrimonioLiquido,
        'Total Passivo + PL': INNOTECH_CASE.data.passivoTotal + INNOTECH_CASE.data.patrimonioLiquido,
    };
    
    const dreData = {
        'Receita Bruta': detalhes!.dre.receitaBruta,
        'Custos (CMV)': -detalhes!.dre.custos,
        'Lucro Bruto': detalhes!.dre.receitaBruta - detalhes!.dre.custos,
        'Despesas Operacionais': -detalhes!.dre.despesasOperacionais,
        'EBIT (Lucro Operacional)': detalhes!.dre.receitaBruta - detalhes!.dre.custos - detalhes!.dre.despesasOperacionais,
        'Despesas Financeiras': -detalhes!.dre.juros,
        'Lucro Antes Impostos': detalhes!.dre.receitaBruta - detalhes!.dre.custos - detalhes!.dre.despesasOperacionais - detalhes!.dre.juros,
        'Impostos': -detalhes!.dre.impostos,
        'Lucro Líquido': INNOTECH_CASE.data.lucroLiquido,
    }

    return (
        <MissionContainer title="Missão 2: Hospital Financeiro">
             <div className="bg-slate-100 dark:bg-slate-900/50 p-6 rounded-lg mb-6">
                <h3 className="font-bold text-xl text-slate-800 dark:text-brand-gold-300 mb-2">Estudo de Caso: InovaTech Soluções</h3>
                <p className="text-slate-600 dark:text-slate-300 text-base italic mb-6">"{caseText}"</p>
                <div className="grid md:grid-cols-2 gap-6">
                    <FinancialStatement title="Balanço Patrimonial (em R$ mil)" data={bpData} />
                    <FinancialStatement title="DRE (em R$ mil)" data={dreData} />
                </div>
            </div>
            <div>
                <label className="block text-base font-medium text-slate-600 dark:text-slate-300 mb-2">Seu Diagnóstico e Recomendações</label>
                <textarea
                    value={diagnosis}
                    onChange={e => setDiagnosis(e.target.value)}
                    rows={8}
                    className="w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg p-3 text-slate-900 dark:text-white text-base"
                    placeholder="Com base no caso e nas demonstrações, descreva o principal problema financeiro da InovaTech, quais indicadores-chave comprovam seu diagnóstico e sugira duas ações corretivas."
                />
            </div>

            <div className="text-center mt-8">
                 <ActionButton onClick={() => onSubmit(2, diagnosis)} variant="primary" disabled={diagnosis.length < 50}>Enviar Diagnóstico</ActionButton>
            </div>
        </MissionContainer>
    );
};


// --- MISSION 3: Mesa de Operações ---
const Mission3_TradingFloor = ({ onSubmit }: { onSubmit: (missionId: number, answer: string) => void }) => {
    const TOTAL_FUNDS = 1000000;
    const [allocations, setAllocations] = useState<Record<string, number>>({});
    const [rationale, setRationale] = useState('');

    const totalAllocated = Object.values(allocations).reduce((sum, val) => sum + val, 0);

    const handleAllocationChange = (companyName: string, value: string) => {
        const numericValue = parseInt(value, 10) || 0;
        const currentAllocation = allocations[companyName] || 0;
        const otherAllocations = totalAllocated - currentAllocation;
        const maxAllowed = TOTAL_FUNDS - otherAllocations;
        const newAllocation = Math.min(numericValue, maxAllowed);

        setAllocations(prev => ({
            ...prev,
            [companyName]: newAllocation,
        }));
    };

    const sectorAllocation = COMPANIES.reduce((acc, company) => {
        const amount = allocations[company.name] || 0;
        if (amount > 0) {
            acc[company.sector] = (acc[company.sector] || 0) + amount;
        }
        return acc;
    }, {} as Record<string, number>);

    const handleSubmit = () => {
        const allocationSummary = COMPANIES.map(c => `${c.name}: R$ ${(allocations[c.name] || 0).toLocaleString('pt-BR')}`).join('\n');
        const finalAnswer = `**Alocação do Portfólio:**\n${allocationSummary}\n\n**Justificativa Estratégica:**\n${rationale}`;
        onSubmit(3, finalAnswer);
    };

    return (
        <MissionContainer title="Missão 3: Mesa de Operações">
            <div className="bg-slate-100 dark:bg-slate-900/50 p-4 rounded-lg mb-8 text-center sticky top-24 z-10">
                <h3 className="font-bold text-xl text-slate-800 dark:text-brand-gold-300">Monte seu Portfólio</h3>
                <div className="flex justify-around mt-2 text-center">
                    <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Capital Total</p>
                        <p className="font-mono font-bold text-xl md:text-2xl text-slate-700 dark:text-slate-200">R$ {TOTAL_FUNDS.toLocaleString('pt-BR')}</p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Valor Alocado</p>
                        <p className={`font-mono font-bold text-xl md:text-2xl ${totalAllocated > TOTAL_FUNDS ? 'text-red-500' : 'text-green-600 dark:text-green-400'}`}>R$ {totalAllocated.toLocaleString('pt-BR')}</p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Saldo Remanescente</p>
                        <p className="font-mono font-bold text-xl md:text-2xl text-brand-amber-600 dark:text-brand-amber-400">R$ {(TOTAL_FUNDS - totalAllocated).toLocaleString('pt-BR')}</p>
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                {COMPANIES.map(c => {
                    const companyIndicators = [
                        INDICATORS.find(i => i.key === 'roe'),
                        INDICATORS.find(i => i.key === 'margemLiquida'),
                        INDICATORS.find(i => i.key === 'endividamentoGeral'),
                        INDICATORS.find(i => i.key === 'liquidezCorrente'),
                    ].filter(Boolean) as Indicator[];
                    const allocation = allocations[c.name] || 0;

                    return (
                        <div key={c.name} className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
                            <h4 className="font-bold text-xl text-slate-900 dark:text-white">{c.name} <span className="text-base font-normal text-slate-500 dark:text-slate-400">({c.sector})</span></h4>
                            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 mt-4">
                                <div>
                                    <h5 className="text-base font-semibold text-slate-600 dark:text-slate-300 mb-2">Dossiê do Analista</h5>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 italic bg-slate-100 dark:bg-slate-800/50 p-3 rounded-md">"{c.analystNote}"</p>
                                </div>
                                <table className="w-full text-sm">
                                    <tbody>
                                        {companyIndicators.map(ind => (
                                            <tr key={ind.key} className="border-b border-slate-200 dark:border-slate-800 last:border-0">
                                                <td className="py-1 text-slate-600 dark:text-slate-400">{ind.name}</td>
                                                <td className="py-1 text-right font-mono font-semibold text-slate-800 dark:text-slate-200">{ind.calculate(c.data).toFixed(1)}{ind.unit}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-4">
                                <label className="block text-base font-medium text-slate-600 dark:text-slate-300 mb-2">Alocação (R$)</label>
                                <div className="flex items-center space-x-4">
                                    <input
                                        type="range"
                                        min="0"
                                        max={TOTAL_FUNDS}
                                        step="10000"
                                        value={allocation}
                                        onChange={e => handleAllocationChange(c.name, e.target.value)}
                                        className="w-full"
                                    />
                                    <span className="font-mono text-base w-32 text-right bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded-md">
                                        {allocation.toLocaleString('pt-BR')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="font-bold text-xl text-slate-800 dark:text-brand-gold-300 mb-4">Resumo do Portfólio</h3>
                    <div className="bg-slate-100 dark:bg-slate-900/50 p-4 rounded-lg">
                        {Object.keys(sectorAllocation).length > 0 ? (
                            Object.entries(sectorAllocation).map(([sector, amount]) => (
                                <div key={sector} className="flex justify-between items-center text-base mb-2 last:mb-0">
                                    <span className="text-slate-600 dark:text-slate-300">{sector}</span>
                                    <span className="font-mono font-semibold text-slate-800 dark:text-slate-100">
                                        {((amount / totalAllocated) * 100).toFixed(0)}%
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="text-base text-slate-500 dark:text-slate-400">Nenhuma alocação realizada.</p>
                        )}
                    </div>
                </div>

                <div>
                    <h3 className="font-bold text-xl text-slate-800 dark:text-brand-gold-300 mb-4">Justificativa da Estratégia</h3>
                    <textarea
                        value={rationale}
                        onChange={e => setRationale(e.target.value)}
                        rows={5}
                        className="w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg p-3 text-slate-900 dark:text-white text-base"
                        placeholder="Justifique sua estratégia de alocação. Por que essa combinação de empresas e setores? Como você balanceou risco (endividamento, liquidez) e retorno (rentabilidade)?"
                    />
                </div>
            </div>

            <div className="text-center mt-8">
                <ActionButton onClick={handleSubmit} variant="primary" disabled={totalAllocated !== TOTAL_FUNDS || rationale.length < 50}>
                    {totalAllocated !== TOTAL_FUNDS ? `Alocar R$ ${TOTAL_FUNDS.toLocaleString('pt-BR')}`: 'Enviar Estratégia'}
                </ActionButton>
            </div>
        </MissionContainer>
    );
};


// --- MISSION 4: Sala da Diretoria ---
const Mission4_Boardroom = ({ onSubmit }: { onSubmit: (missionId: number, answer: string) => void }) => {
    const [narrative, setNarrative] = useState('');
    const caseText = "Você é o consultor financeiro da 'InovaTech Soluções' (da Missão 2). A diretoria está impressionada com seu diagnóstico inicial e agora solicita um plano estratégico. Prepare uma breve apresentação (em texto) para a diretoria. Sua apresentação deve: 1) Resumir o diagnóstico em uma frase impactante. 2) Apresentar suas duas recomendações principais com justificativas claras. 3) Concluir com o impacto esperado dessas ações nos indicadores financeiros em 6 meses.";

    const liquidezCorrente = INDICATORS.find(i=>i.key==='liquidezCorrente')?.calculate(INNOTECH_CASE.data);
    const contasAReceber = INNOTECH_CASE.data.detalhes?.balanco.contasAReceber || 0;
    const receitaLiquida = INNOTECH_CASE.data.receitaLiquida;
    const prazoRecebimento = (contasAReceber / receitaLiquida) * 365;


     return (
        <MissionContainer title="Missão 4: Sala da Diretoria">
             <div className="bg-slate-100 dark:bg-slate-900/50 p-6 rounded-lg mb-6">
                <h3 className="font-bold text-xl text-slate-800 dark:text-brand-gold-300 mb-2">Cenário: Apresentação para a Diretoria</h3>
                <p className="text-slate-600 dark:text-slate-300 text-base italic">"{caseText}"</p>
                 <div className="mt-4 border-t border-slate-300 dark:border-slate-700 pt-4 flex justify-around text-center">
                    <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Liquidez Corrente</p>
                        <p className="font-bold text-xl md:text-2xl text-red-500">{liquidezCorrente?.toFixed(2)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Prazo Médio Receb.</p>
                        <p className="font-bold text-xl md:text-2xl text-red-500">{prazoRecebimento?.toFixed(0)} dias</p>
                    </div>
                     <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Caixa</p>
                        <p className="font-bold text-xl md:text-2xl text-red-500">R$ {INNOTECH_CASE.data.detalhes?.balanco.caixa}k</p>
                    </div>
                </div>
            </div>
            <div>
                <label className="block text-base font-medium text-slate-600 dark:text-slate-300 mb-2">Sua Narrativa Estratégica (Financial Storytelling)</label>
                <textarea
                    value={narrative}
                    onChange={e => setNarrative(e.target.value)}
                    rows={10}
                    className="w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg p-3 text-slate-900 dark:text-white text-base"
                    placeholder="Com base nos indicadores-chave, estruture sua apresentação aqui..."
                />
            </div>
            <div className="text-center mt-8">
                <ActionButton onClick={() => onSubmit(4, narrative)} variant="primary" disabled={narrative.length < 100}>Enviar Apresentação</ActionButton>
            </div>
        </MissionContainer>
    );
}

const MISSION_COMPONENTS: { [key: number]: React.FC<{ onSubmit: (missionId: number, answer: string) => void }> } = {
    1: Mission1_DiagnosticLab,
    2: Mission2_SituationRoom,
    3: Mission3_TradingFloor,
    4: Mission4_Boardroom,
};

// --- UI SECTIONS ---

const Header = ({ theme, toggleTheme }: { theme: 'light' | 'dark', toggleTheme: () => void }) => (
    <header className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 dark:border-brand-gold-500/20 shadow-lg no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
            <div className="flex items-center">
                 <div className="w-12 h-12 bg-gradient-to-br from-brand-amber-400 to-brand-amber-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-2xl" role="img" aria-label="trophy">🏆</span>
                </div>
                <div>
                    <h1 className="font-display text-xl md:text-2xl font-bold text-slate-800 dark:text-brand-gold-300">Adm Academy 2025</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Programa de Análise Financeira</p>
                </div>
            </div>
             <button
                onClick={toggleTheme}
                className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-2xl transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand-amber-500"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
             >
                {theme === 'light' ? '🌙' : '☀️'}
            </button>
        </div>
    </header>
);

const WelcomeScreen = ({ onStart }: { onStart: () => void }) => (
     <section className="text-center py-16 px-4">
        <div className="max-w-3xl mx-auto bg-white/80 dark:bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-slate-200 dark:border-brand-gold-500/20 shadow-2xl dark:shadow-black/50 shadow-slate-300/60">
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-brand-gold-300 mb-4">Jornada do Analista Estratégico</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8 text-base md:text-lg">Bem-vindo à Adm Academy. Sua jornada para dominar a análise de demonstrações financeiras começa agora. Após cada missão, você poderá comparar sua análise com um gabarito de especialista para aprimorar seu raciocínio.</p>
            <ActionButton onClick={onStart}>🚀 Iniciar Programa</ActionButton>
        </div>
    </section>
);

const MissionCard = ({ mission, onSelect, status }: { mission: MissionData; onSelect: (id: number) => void; status: MissionStatus }) => {
    const isLocked = status === 'LOCKED';
    const isCompleted = status === 'COMPLETED';

    let borderColor = 'border-slate-300 dark:border-slate-700';
    if (isCompleted) borderColor = 'border-green-500/70';
    else if (!isLocked) borderColor = 'border-brand-amber-500/80 dark:animate-pulse-glow-border';

    return (
    <div
        onClick={() => !isLocked && onSelect(mission.id)}
        className={`bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/70 rounded-2xl p-6 transition-all duration-300 border-2 relative overflow-hidden group ${isLocked ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:-translate-y-2 hover:shadow-xl dark:hover:shadow-[0_0_25px_rgba(212,175,55,0.25)]'} ${borderColor}`}
    >
        {isCompleted && <div className="absolute top-3 right-3 text-2xl" title="Missão Concluída">✅</div>}
        {isLocked && <div className="absolute top-3 right-3 text-2xl" title="Bloqueada">🔒</div>}

        <div className="flex items-center mb-4">
            <div className="w-14 h-14 bg-brand-amber-400/10 text-brand-amber-400 dark:text-brand-amber-300 rounded-full flex items-center justify-center mr-4 text-3xl transition-transform duration-300 group-hover:scale-110">
                {mission.icon}
            </div>
            <h3 className="font-display text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100">{mission.title}</h3>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-base mb-4">{mission.description}</p>
        <div className="flex justify-between items-center">
            <span className="bg-brand-amber-100 dark:bg-brand-amber-900/50 text-brand-amber-700 dark:text-brand-amber-300 px-3 py-1 rounded-full text-sm font-semibold">{mission.level}</span>
        </div>
    </div>
    );
}

const Dashboard = ({ onSelectMission, completedMissions, onGenerateReport }: { onSelectMission: (id: number) => void; completedMissions: Set<number>, onGenerateReport: () => void }) => {
    const getMissionStatus = (mission: MissionData): MissionStatus => {
        if (completedMissions.has(mission.id)) return 'COMPLETED';
        if (!mission.prerequisite || completedMissions.has(mission.prerequisite)) return 'AVAILABLE';
        return 'LOCKED';
    };
    const allMissionsCompleted = completedMissions.size === MISSIONS_DATA.length;

    return (
        <section className="py-12">
            <h2 className="text-center font-display text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-brand-gold-300 mb-8">Painel de Missões</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {MISSIONS_DATA.map(mission => (
                    <MissionCard key={mission.id} mission={mission} onSelect={onSelectMission} status={getMissionStatus(mission)} />
                ))}
            </div>
             {allMissionsCompleted && (
                 <div className="mt-12 text-center">
                     <div className="p-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-lg">
                         <h2 className="text-3xl font-bold font-display text-white">🏆 Parabéns, Consultor!</h2>
                         <p className="mt-2 text-lg text-green-100 mb-6">Você concluiu o programa de Análise Financeira com sucesso!</p>
                         <ActionButton onClick={onGenerateReport} variant="secondary">Gerar Relatório de Desempenho</ActionButton>
                     </div>
                 </div>
            )}
        </section>
    );
};

const FeedbackView = ({ mission, studentAnswer, onContinue }: { mission: MissionData, studentAnswer: string, onContinue: () => void }) => (
    <MissionContainer title={`Feedback: ${mission.title}`}>
        <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-100 dark:bg-slate-900/50 p-6 rounded-lg">
                <h3 className="font-bold text-xl text-slate-800 dark:text-brand-gold-300 mb-3">Sua Resposta</h3>
                <p className="text-base text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">{studentAnswer}</p>
            </div>
             <div className="bg-blue-100 dark:bg-blue-900/30 border border-blue-400/50 p-6 rounded-lg">
                <h3 className="font-bold text-xl text-blue-800 dark:text-blue-300 mb-3">Gabarito do Especialista</h3>
                <p className="text-base text-blue-700 dark:text-blue-200 whitespace-pre-wrap leading-relaxed">{mission.modelAnswer}</p>
            </div>
        </div>
        <div className="text-center mt-10">
            <ActionButton onClick={onContinue} variant="secondary">Continuar Jornada</ActionButton>
        </div>
    </MissionContainer>
);

const ReportView = ({ studentAnswers, onBack }: { studentAnswers: Record<number, string>, onBack: () => void }) => (
    <section className="py-12">
         <div className="flex justify-between items-center mb-8 no-print">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-800 dark:text-brand-gold-300">Relatório de Desempenho</h2>
            <div>
                 <button onClick={onBack} className="mr-4 text-brand-amber-600 dark:text-brand-amber-400 hover:text-brand-amber-500 dark:hover:text-brand-amber-300 transition-colors font-semibold text-base">
                    &larr; Voltar ao Painel
                </button>
                <ActionButton onClick={() => window.print()} variant="primary">Imprimir / Salvar PDF</ActionButton>
            </div>
        </div>

        <div id="report-section" className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-lg shadow-lg">
             <h1 className="font-display text-4xl font-extrabold mb-2 text-center">Relatório Final - Adm Academy 2025</h1>
             <p className="text-center text-slate-500 dark:text-slate-400 mb-10 text-lg">Compilado de atividades e análises do programa de Análise Financeira.</p>

            {MISSIONS_DATA.map(mission => (
                <div key={mission.id} className="report-mission-block">
                    <h2 className="font-display text-2xl font-bold mb-4 border-b pb-2">{mission.icon} {mission.title}</h2>
                     <div className="report-feedback-grid grid md:grid-cols-2 gap-8">
                        <div className="report-answer-box">
                            <h3 className="font-bold text-xl mb-2">Sua Resposta</h3>
                            <p className="text-base whitespace-pre-wrap leading-relaxed">{studentAnswers[mission.id] || "Não respondida."}</p>
                        </div>
                         <div className="report-answer-box bg-slate-50">
                            <h3 className="font-bold text-xl mb-2">Gabarito do Especialista</h3>
                            <p className="text-base whitespace-pre-wrap leading-relaxed">{mission.modelAnswer}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </section>
);


// --- MAIN APP COMPONENT ---

function App() {
    const [view, setView] = useState<'welcome' | 'dashboard' | 'mission' | 'report'>('welcome');
    const [currentMissionId, setCurrentMissionId] = useState<number | null>(null);
    const [missionFeedbackId, setMissionFeedbackId] = useState<number | null>(null);
    const [completedMissions, setCompletedMissions] = useState<Set<number>>(new Set());
    const [studentAnswers, setStudentAnswers] = useState<Record<number, string>>({});

    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
         if (typeof window !== 'undefined' && localStorage.getItem('theme')) {
            return localStorage.getItem('theme') as 'light' | 'dark';
        }
        if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    });

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [theme]);


    useEffect(() => {
        try {
            const savedState = localStorage.getItem('admAcademy2025_progress');
            if (savedState) {
                const { completedMissions, studentAnswers, view } = JSON.parse(savedState);
                setCompletedMissions(new Set(completedMissions || []));
                setStudentAnswers(studentAnswers || {});
                 // Prevent being stuck on a mission/report page on reload
                const validInitialView = ['welcome', 'dashboard'].includes(view) ? view : 'dashboard';
                setView(completedMissions?.length > 0 ? validInitialView : 'welcome');
            }
        } catch (error) {
            console.error("Failed to parse saved state:", error);
            setView('welcome');
        }
    }, []);

    useEffect(() => {
        const stateToSave = {
            completedMissions: Array.from(completedMissions),
            studentAnswers,
            view,
        };
        localStorage.setItem('admAcademy2025_progress', JSON.stringify(stateToSave));
    }, [completedMissions, studentAnswers, view]);

    const handleStart = () => setView('dashboard');

    const handleSelectMission = (id: number) => {
        setCurrentMissionId(id);
        setView('mission');
    };

    const handleSubmitMission = (id: number, answer: string) => {
        setStudentAnswers(prev => ({ ...prev, [id]: answer }));
        setMissionFeedbackId(id); // Show feedback view
    };

    const handleContinueFromFeedback = () => {
        if (missionFeedbackId) {
            setCompletedMissions(prev => new Set(prev).add(missionFeedbackId));
        }
        setView('dashboard');
        setCurrentMissionId(null);
        setMissionFeedbackId(null);
    };

    const handleGoToDashboard = () => {
        setView('dashboard');
        setCurrentMissionId(null);
        setMissionFeedbackId(null);
    }
    
    const handleGenerateReport = () => setView('report');

    const handleReset = () => {
        localStorage.removeItem('admAcademy2025_progress');
        setView('welcome');
        setCurrentMissionId(null);
        setMissionFeedbackId(null);
        setCompletedMissions(new Set());
        setStudentAnswers({});
    };

    const renderView = () => {
        switch(view) {
            case 'welcome': 
                return <WelcomeScreen onStart={handleStart} />;
            case 'dashboard': 
                return <Dashboard onSelectMission={handleSelectMission} completedMissions={completedMissions} onGenerateReport={handleGenerateReport} />;
            case 'report':
                return <ReportView studentAnswers={studentAnswers} onBack={handleGoToDashboard} />;
            case 'mission':
                if (missionFeedbackId && currentMissionId === missionFeedbackId) {
                    const mission = MISSIONS_DATA.find(m => m.id === missionFeedbackId);
                    const studentAnswer = studentAnswers[missionFeedbackId] || '';
                    if (mission) {
                        return <FeedbackView mission={mission} studentAnswer={studentAnswer} onContinue={handleContinueFromFeedback} />;
                    }
                }
                
                const MissionComponent = MISSION_COMPONENTS[currentMissionId!];
                if (MissionComponent) {
                     return (
                        <section className="py-12">
                            <button onClick={handleGoToDashboard} className="mb-6 text-brand-amber-600 dark:text-brand-amber-400 hover:text-brand-amber-500 dark:hover:text-brand-amber-300 transition-colors font-semibold text-base no-print">
                                &larr; Voltar ao Painel de Missões
                            </button>
                           <MissionComponent onSubmit={handleSubmitMission} />
                        </section>
                    );
                }
                return <p>Erro: ID da missão não encontrado.</p>;

            default: 
                return <WelcomeScreen onStart={handleStart} />;
        }
    }

    return (
        <div className="min-h-screen">
            <Header theme={theme} toggleTheme={toggleTheme} />
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {renderView()}
            </main>
             <footer className="text-center py-8 mt-12 border-t border-slate-200 dark:border-slate-800 no-print">
                <p className="text-sm text-slate-500 dark:text-slate-400">Adm Academy 2025 - Análise de Demonstrações Financeiras</p>
                <button onClick={handleReset} className="mt-4 text-xs text-slate-500 hover:text-brand-amber-500 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-amber-500/50 rounded">Reiniciar Programa</button>
            </footer>
        </div>
    );
}

export default App;